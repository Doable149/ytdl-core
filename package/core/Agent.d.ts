import { ProxyAgent } from 'undici';
import { CookieJar } from 'tough-cookie';
import { CookieAgent } from 'http-cookie-agent/undici';
import { YTDL_Agent } from '../types/Agent';
import { YTDL_Cookies } from '../types/Cookie';
declare function addCookies(jar: CookieJar, cookies: YTDL_Cookies): void;
declare function addCookiesFromString(jar: CookieJar, cookies: string): void;
type CookieAgentOptions = CookieAgent.Options;
declare function createAgent(cookies?: YTDL_Cookies, opts?: CookieAgentOptions): YTDL_Agent;
declare function createProxyAgent(options: ProxyAgent.Options | string, cookies?: YTDL_Cookies): YTDL_Agent;
declare const defaultAgent: YTDL_Agent;
export { defaultAgent, createAgent, createProxyAgent, addCookies, addCookiesFromString };
declare const _default: {
    defaultAgent: YTDL_Agent;
    createAgent: typeof createAgent;
    createProxyAgent: typeof createProxyAgent;
    addCookies: typeof addCookies;
    addCookiesFromString: typeof addCookiesFromString;
};
export default _default;
