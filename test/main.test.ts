import ytdl from '../package/YtdlCore';
import { VIDEO_IDS } from './videoIds';
import { NORMAL_ACCESS_TOKEN, CLIENT_DATA_REQUIRED_ACCESS_TOKEN, PUBLISHERS_ACCESS_TOKEN } from './env';

jest.useRealTimers();
jest.setTimeout(30000);

const ALL_CLIENTS: any = ['web', 'mweb', 'web_creator', 'android', 'ios', 'tv', 'tv_embedded'];

describe('【@ybd-project/ytdl-core】機能テスト', () => {
    describe('GetInfo 関数テスト', () => {
        describe('通常', () => {
            const VIDEO_ID = VIDEO_IDS.normal;

            it(`通常（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });

            it(`OAuth2あり（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                    oauth2: new ytdl.OAuth2(NORMAL_ACCESS_TOKEN),
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });

            it(`独自OAuth2あり（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                    oauth2: new ytdl.OAuth2(CLIENT_DATA_REQUIRED_ACCESS_TOKEN),
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });
        });

        describe('非公開', () => {
            const VIDEO_ID = VIDEO_IDS.private;

            it(`通常（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });

            it(`OAuth2あり（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                    oauth2: new ytdl.OAuth2(NORMAL_ACCESS_TOKEN),
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });

            it(`独自OAuth2あり（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                    oauth2: new ytdl.OAuth2(CLIENT_DATA_REQUIRED_ACCESS_TOKEN),
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });

            it(`OAuth2（公開者のアカウント）あり（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                    oauth2: new ytdl.OAuth2(PUBLISHERS_ACCESS_TOKEN),
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });
        });

        describe('公開前（プレミア公開の前）', () => {
            const VIDEO_ID = VIDEO_IDS.beforePublication;

            it(`通常（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });
        });

        describe('限定公開', () => {
            const VIDEO_ID = VIDEO_IDS.limitedPublication;

            it(`通常（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });

            it(`OAuth2あり（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                    oauth2: new ytdl.OAuth2(NORMAL_ACCESS_TOKEN),
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });

            it(`独自OAuth2あり（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                    oauth2: new ytdl.OAuth2(CLIENT_DATA_REQUIRED_ACCESS_TOKEN),
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });
        });

        describe('子供向け', () => {
            const VIDEO_ID = VIDEO_IDS.forChildren;

            it(`通常（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });

            it(`OAuth2あり（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                    oauth2: new ytdl.OAuth2(NORMAL_ACCESS_TOKEN),
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });

            it(`独自OAuth2あり（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                    oauth2: new ytdl.OAuth2(CLIENT_DATA_REQUIRED_ACCESS_TOKEN),
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });
        });

        describe('年齢制限', () => {
            const VIDEO_ID = VIDEO_IDS.ageRestricted;

            it(`通常（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });

            it(`OAuth2あり（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                    oauth2: new ytdl.OAuth2(NORMAL_ACCESS_TOKEN),
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });

            it(`独自OAuth2あり（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                    oauth2: new ytdl.OAuth2(CLIENT_DATA_REQUIRED_ACCESS_TOKEN),
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });
        });

        describe('利用不可', () => {
            const VIDEO_ID = VIDEO_IDS.unavailable;

            it(`通常（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });
        });

        describe('無効な動画ID', () => {
            const VIDEO_ID = VIDEO_IDS.invalid;

            it(`通常（ID: ${VIDEO_ID}）`, async () => {
                const RESULTS = await ytdl.getFullInfo('https://www.youtube.com/watch?v=' + VIDEO_ID, {
                    poToken: 'MnQvoU39lB1OrS-ZFJP2UOjzocFXQIhGdoizjiS2YO0rxe6lKcCJoKif0byytPJIUVDVR-MpXQ3qECJzXcp2J-D32vzEG2xB7aiyv5TpwKN9LPPErgpBhos2MbeIBXUOrgP-w62LWEBUJdv91aDgzDubRI3J6w==',
                    visitorData: 'CgtFbmhuaDdZVkVhbyj6npK2BjIKCgJKUBIEGgAgYQ%3D%3D',
                    includesPlayerAPIResponse: true,
                    includesWatchPageInfo: true,
                    clients: ALL_CLIENTS,
                });
                expect(RESULTS.videoDetails.videoId).toBe(VIDEO_ID);
            });
        });
    });
});
