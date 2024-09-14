interface RefreshApiResponse {
    error_code?: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

import { fetch } from 'undici';

import { YTDL_OAuth2ClientData, YTDL_OAuth2Credentials } from '@/types/Options';

import { Logger } from '@/utils/Log';
import Url from '@/utils/Url';
import UserAgent from '@/utils/UserAgents';

import { Web } from './clients';
import { FileCache } from './Cache';

/* Reference: LuanRT/YouTube.js */
const REGEX = { tvScript: new RegExp('<script\\s+id="base-js"\\s+src="([^"]+)"[^>]*><\\/script>'), clientIdentity: new RegExp('clientId:"(?<client_id>[^"]+)",[^"]*?:"(?<client_secret>[^"]+)"') };

export class OAuth2 {
    public isEnabled: boolean = false;
    public accessToken: string = '';
    public refreshToken: string = '';
    public expiryDate: string = '';
    public clientId?: string;
    public clientSecret?: string;

    constructor(credentials?: YTDL_OAuth2Credentials) {
        if (!credentials) {
            return;
        }

        this.isEnabled = true;
        this.accessToken = credentials.accessToken;
        this.refreshToken = credentials.refreshToken;
        this.expiryDate = credentials.expiryDate;
        this.clientId = credentials.clientData?.clientId;
        this.clientSecret = credentials.clientData?.clientSecret;

        if (this.shouldRefreshToken()) {
            try {
                this.refreshAccessToken().finally(() => this.availableTokenCheck());
            } catch (err) {}
        } else {
            this.availableTokenCheck();
        }

        FileCache.set('oauth2', JSON.stringify(credentials));
    }

    private async availableTokenCheck() {
        try {
            Web.getPlayerResponse({
                videoId: 'dQw4w9WgXcQ',
                signatureTimestamp: parseInt(FileCache.get<{ signatureTimestamp: string }>('html5Player')?.signatureTimestamp || '0') || 0,
                options: {
                    oauth2: this,
                },
            }).then(() => Logger.debug('The specified OAuth2 token is successful.')).catch((err) => {
                if (err.error.message.includes('401')) {
                    this.error('Request using the specified token failed. (Web Client)');
                }
            });
        } catch (err: any) {
            if ((err.message || err.error.message).includes('401')) {
                this.error('Request using the specified token failed. (Web Client)');
            }
        }
    }

    private error(message: string) {
        Logger.error(message);
        Logger.info('OAuth2 is disabled due to an error.');
        this.isEnabled = false;
    }

    private async getClientData(): Promise<YTDL_OAuth2ClientData | null> {
        const OAUTH2_CACHE = FileCache.get<YTDL_OAuth2Credentials>('oauth2') || ({} as any);

        if (OAUTH2_CACHE.clientData?.clientId && OAUTH2_CACHE.clientData?.clientSecret) {
            return {
                clientId: OAUTH2_CACHE.clientData.clientId,
                clientSecret: OAUTH2_CACHE.clientData.clientSecret,
            };
        }

        const YT_TV_RESPONSE = await fetch(Url.getTvUrl(), {
            headers: {
                'User-Agent': UserAgent.tv,
                Referer: Url.getTvUrl(),
            },
        });

        if (!YT_TV_RESPONSE.ok) {
            this.error('Failed to get client data: ' + YT_TV_RESPONSE.status);
            return null;
        }

        const YT_TV_HTML = await YT_TV_RESPONSE.text(),
            SCRIPT_PATH = REGEX.tvScript.exec(YT_TV_HTML)?.[1];

        if (SCRIPT_PATH) {
            Logger.debug('Found YouTube TV script: ' + SCRIPT_PATH);

            const SCRIPT_RESPONSE = await fetch(Url.getBaseUrl() + SCRIPT_PATH);
            if (!SCRIPT_RESPONSE.ok) {
                this.error('TV script request failed with status code: ' + SCRIPT_RESPONSE.status);
                return null;
            }

            const SCRIPT_STRING = await SCRIPT_RESPONSE.text(),
                CLIENT_ID = REGEX.clientIdentity.exec(SCRIPT_STRING)?.groups?.client_id,
                CLIENT_SECRET = REGEX.clientIdentity.exec(SCRIPT_STRING)?.groups?.client_secret;

            if (!CLIENT_ID || !CLIENT_SECRET) {
                this.error("Could not obtain client ID. Please create an issue in the repository for possible specification changes on YouTube's side.");
                return null;
            }

            Logger.debug('Found client ID: ' + CLIENT_ID);
            Logger.debug('Found client secret: ' + CLIENT_SECRET);
            FileCache.set('oauth2', JSON.stringify({ ...OAUTH2_CACHE, clientData: { clientId: CLIENT_ID, clientSecret: CLIENT_SECRET } }));

            return { clientId: CLIENT_ID, clientSecret: CLIENT_SECRET };
        }

        this.error("Could not obtain script URL. Please create an issue in the repository for possible specification changes on YouTube's side.");
        return null;
    }

    shouldRefreshToken(): boolean {
        if (!this.isEnabled) {
            return false;
        }

        return Date.now() >= new Date(this.expiryDate).getTime();
    }

    async refreshAccessToken(): Promise<void> {
        if (!this.isEnabled) {
            return;
        }

        if (!this.clientId || !this.clientSecret) {
            const data = await this.getClientData();

            if (!data) {
                return;
            }

            this.clientId = data.clientId;
            this.clientSecret = data.clientSecret;
        }

        if (!this.refreshToken) {
            return this.error('Refresh token is missing, make sure it is specified.');
        }

        try {
            const PAYLOAD = {
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    refresh_token: this.refreshToken,
                    grant_type: 'refresh_token',
                },
                REFRESH_API_RESPONSE = await fetch(Url.getRefreshTokenApiUrl(), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(PAYLOAD),
                });

            if (!REFRESH_API_RESPONSE.ok) {
                return this.error(`Failed to refresh access token: ${REFRESH_API_RESPONSE.status}`);
            }

            const REFRESH_API_DATA = (await REFRESH_API_RESPONSE.json()) as RefreshApiResponse;

            if (REFRESH_API_DATA.error_code) {
                return this.error('Authorization server returned an error: ' + JSON.stringify(REFRESH_API_DATA));
            }

            this.expiryDate = new Date(Date.now() + REFRESH_API_DATA.expires_in * 1000).toISOString();
            this.accessToken = REFRESH_API_DATA.access_token;
        } catch (err: any | Error) {
            this.error(err.message);
        }
    }

    getAccessToken(): string {
        return this.accessToken;
    }
}
