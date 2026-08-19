import { createHash, timingSafeEqual } from "node:crypto";
export type AccessArea="client"|"admin";
export function configuredCode(area:AccessArea){return area==="admin"?process.env.ADMIN_ACCESS_CODE:process.env.CLIENT_ACCESS_CODE}
export function accessToken(area:AccessArea,code:string){return createHash("sha256").update(`${area}:${code}:${process.env.ACCESS_SECRET||"configure-access-secret"}`).digest("hex")}
export function validToken(area:AccessArea,token?:string){const code=configuredCode(area);if(!code||!token)return false;const expected=accessToken(area,code);const a=Buffer.from(token);const b=Buffer.from(expected);return a.length===b.length&&timingSafeEqual(a,b)}
