import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers/oauth';

export const ShikimoriProvider = (
  options: OAuthUserConfig<any>,
): OAuthConfig<any> => {
  return {
    ...options,
    type: 'oauth',
    id: 'shikimori',
    name: 'shikimori',
    clientId: options.clientId || process.env.SHIKIMORI_ID,
    clientSecret: options.clientSecret || process.env.SHIKIMORI_SECRET,
    token: 'https://shikimori.one/oauth/token',
    authorization: {
      url: 'https://shikimori.one/oauth/authorize',
      params: {
        scope: 'user_rates comments topics',
        client_id: options.clientId || process.env.SHIKIMORI_ID,
        redirect_uri: 'http://localhost:3000/api/auth/callback/shikimori',
        response_type: 'code',
      },
    },
    profileUrl: 'https://shikimori.one/api/users/whoami',
    userinfo: {
      url: 'https://shikimori.one/api/users/whoami',
    },
    // 'https://shikimori.one/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code&scope=user_rates+comments+topics',
    profile(profile) {
      console.log('profile ', profile);
      return {
        id: profile.id,
        name: profile?.name || profile.nickname,
        email: profile.email || profile.nickname,
      };
    },
  };
};
