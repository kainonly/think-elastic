const COS = require('cos-nodejs-sdk-v5');
const got = require('got');

export const library = async (env: any) => {
    try {
        const cos = new COS({
            SecretId: env.SECRETID,
            SecretKey: env.SECRETKEY
        });

        const client = got.extend({
            baseUrl: env.SOURCE,
            json: true,
        });

        const packages = await client('/packages.json');
        const providers = packages['provider-includes'];
        cos.getObject({
            Bucket: env.BUCKET,
            Region: env.REGION,
            Key: 'packages.json',
        }, (err: any, data: any) => {
            if (err) return;
            const cosPackages = JSON.parse(data.Body.toString());
            const cosProviders = cosPackages['provider-includes'];

        });
        // httpClient('/packages.json').on('data', (data: any) => {
        //     // update packages
        //     fs.writeFileSync('cache/packages.json', data);
        //     // compare
        //     const packages = JSON.parse(data.toString());
        //
        // });
    } catch (e) {
    }
};
