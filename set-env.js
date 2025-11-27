const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';

const envFileContent = `
export const environment = {
  production: true,
  apiKey: '${process.env.NG_APP_API_KEY}'
};
`;
fs.writeFileSync(targetPath, envFileContent);
