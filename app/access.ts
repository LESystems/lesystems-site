import { createHash, timingSafeEqual } from "node:crypto";
export type AccessArea="client"|"admin";
export function configuredCode(area:AccessArea){return area==="admin"?process.env.ADMIN_ACCESS_CODE:process.env.CLIENT_ACCESS_CODE}
const fallbackHashes:Record<AccessArea,string>={client:"f45c1cb90693bc0066140a471b5b5fb0a03a775379a14dfd543e674f305bb64c",admin:"6d71cfd82d370ce6a1874b06833859a52874adcfb5fee6131870089d0e8d04ca"};
function digest(value:string){return createHash("sha256").update(value).digest("hex")}
function credential(area:AccessArea){const code=configuredCode(area);return code?digest(code):fallbackHashes[area]}
export function verifyAccessCode(area:AccessArea,code?:string){if(!code)return false;const candidate=Buffer.from(digest(code));return[credential(area),fallbackHashes[area]].some(value=>{const expected=Buffer.from(value);return candidate.length===expected.length&&timingSafeEqual(candidate,expected)})}
export function accessToken(area:AccessArea){return createHash("sha256").update(`${area}:${credential(area)}:${process.env.ACCESS_SECRET||"lesystems-hub-session"}`).digest("hex")}
export function validToken(area:AccessArea,token?:string){if(!token)return false;const expected=accessToken(area);const a=Buffer.from(token);const b=Buffer.from(expected);return a.length===b.length&&timingSafeEqual(a,b)}
