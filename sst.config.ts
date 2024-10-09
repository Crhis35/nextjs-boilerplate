/// <reference path="./.sst/platform/config.d.ts" />

const domain = 'concertplaza.tv';

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
      name: 'ctp-dxp-fe-investors',
      removal: 'retain',
      home: 'aws',
    };
  },
  async run() {
    new sst.aws.Nextjs('InvestorSite', {
      // warm: $app.stage === 'prod' ? 1 : 0,
      warm: 1,
      domain: {
        name: getDomain($app.stage, 'investors.'),
        aliases: [getDomain($app.stage, 'www.investors.')],
        dns: sst.aws.dns({
          zone: 'Z07436663RA555S22OI2I',
        }),
      },
    });
  },
});
