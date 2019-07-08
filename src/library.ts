const COS = require('cos-nodejs-sdk-v5');
const got = require('got');
const fs = require('fs');

export const library = (env: any) => {
    return new Promise(resolve => {
        try {
            const cos = new COS({
                SecretId: env.SecretId,
                SecretKey: env.SecretKey
            });

            const httpClient = got.extend({
                baseUrl: env.Source,
                stream: true,
            });

            httpClient('/packages.json').on('data', (data: any) => {
                // update packages
                fs.writeFileSync('cache/packages.json', data);
                // compare
                const packages = JSON.parse(data.toString());

            });
        } catch (e) {
            resolve(e);
        }
    });
};
