const COS = require('cos-nodejs-sdk-v5');
const got = require('got');
const {config} = require('dotenv');
const env = config().parsed;
const httpClient = got.extend({
    baseUrl: 'https://packagist.org',
    stream: true,
});


var cos = new COS({
    SecretId: env.SecretId,
    SecretKey: env.SecretKey
});

export const library = async () => {
    try {
        httpClient('/packages.json').on('data', (chunk: any) => {
            cos.putObject({
                Bucket: env.Bucket,
                Region: env.Region,
                Key: 'packages.json',
                Body: chunk,
                onProgress(progressData: any) {
                    console.log(progressData);
                },
            }, (err: any, data: any) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        });
    } catch (e) {

    }
};
