import https from "node:https";

const apiHost = "cdpj.partners.bancointer.com.br";

function credentials() {
  const clientId = process.env.INTER_CLIENT_ID;
  const clientSecret = process.env.INTER_CLIENT_SECRET;
  const cert = process.env.INTER_CERTIFICATE?.replace(/\\n/g, "\n");
  const key = process.env.INTER_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const pixKey = process.env.INTER_PIX_KEY;
  if (!clientId || !clientSecret || !cert || !key || !pixKey) throw new Error("Inter ainda não foi configurado.");
  return { clientId, clientSecret, cert, key, pixKey };
}

function request<T>(path: string, method: string, body: string | undefined, token?: string, contentType = "application/json") {
  const { cert, key } = credentials();
  return new Promise<T>((resolve, reject) => {
    const req = https.request({ hostname:apiHost, path, method, cert, key, headers:{ Accept:"application/json", "Content-Type":contentType, ...(token ? { Authorization:`Bearer ${token}` } : {}), ...(body ? { "Content-Length":Buffer.byteLength(body) } : {}) } }, response => {
      let raw = ""; response.setEncoding("utf8"); response.on("data", chunk => raw += chunk); response.on("end", () => {
        const data = raw ? JSON.parse(raw) : {};
        if ((response.statusCode || 500) >= 400) reject(new Error(data?.detail || data?.title || "Falha na comunicação com o Inter.")); else resolve(data as T);
      });
    });
    req.on("error", reject); if (body) req.write(body); req.end();
  });
}

async function accessToken() {
  const { clientId, clientSecret } = credentials();
  const body = new URLSearchParams({ client_id:clientId, client_secret:clientSecret, scope:"cob.write cob.read pix.read", grant_type:"client_credentials" }).toString();
  const data = await request<{access_token:string}>("/oauth/v2/token", "POST", body, undefined, "application/x-www-form-urlencoded");
  return data.access_token;
}

export async function createInterPixCharge(input: { txid:string; amountCents:number; description:string }) {
  const { pixKey } = credentials();
  const token = await accessToken();
  return request<{txid:string;status:string;pixCopiaECola:string;calendario?:{expiracao?:number}}>(`/pix/v2/cob/${input.txid}`, "PUT", JSON.stringify({ calendario:{ expiracao:86400 }, valor:{ original:(input.amountCents/100).toFixed(2) }, chave:pixKey, solicitacaoPagador:input.description.slice(0,140) }), token);
}

export async function getInterPixCharge(txid:string) {
  const token = await accessToken();
  return request<{txid:string;status:string;pix?:unknown[]}>(`/pix/v2/cob/${encodeURIComponent(txid)}`, "GET", undefined, token);
}

export function isInterConfigured() {
  return Boolean(process.env.INTER_CLIENT_ID && process.env.INTER_CLIENT_SECRET && process.env.INTER_CERTIFICATE && process.env.INTER_PRIVATE_KEY && process.env.INTER_PIX_KEY);
}
