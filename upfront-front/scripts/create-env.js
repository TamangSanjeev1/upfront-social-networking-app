const fs = require('fs');

const envConfig = `
export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  wsUrl: '${process.env.WS_URL}',
  googleAuthUrl: '${process.env.GOOGLE_AUTH_URL}'
};
`;

fs.writeFileSync(
    './src/environments/environment.prod.ts',
    envConfig
);