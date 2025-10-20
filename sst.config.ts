// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

const domain = 'olilienthal.com';

const getDomain = (env: string, prefix = '') => {
  switch (env) {
    case 'prod':
      return `${prefix}${domain}`;
    default:
      return `${prefix}${env}.${domain}`;
  }
};

export default $config({
  app(input) {
    return {
      name: 'dashboard',
      removal: 'retain',
      home: 'aws',
    };
  },
  async run() {
    new sst.aws.Nextjs('fe-dashboard', {
      warm: 1,
      domain: {
        name: getDomain($app.stage, 'dashboard.'),
        aliases: [getDomain($app.stage, 'www.dashboard.')],
      },
      environment: {
        NEXT_PUBLIC_CSP_XSS: $app.stage === 'prod' ? 'true' : 'false',
        NEXT_PUBLIC_IS_LIVE: $app.stage === 'prod' ? 'true' : 'false',
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? '',
      },
    });
  },
});
