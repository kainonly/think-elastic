const COS = require('cos-nodejs-sdk-v5');
const got = require('got');
const { env } = require('process');

const httpClient = got.extend({
  baseUrl: env.SOURCE,
  retry: 5,
});

const cos = new COS({
  SecretId: env.SECRETID,
  SecretKey: env.SECRETKEY,
});

const params = (args: any) => {
  return Object.assign({
    Bucket: env.BUCKET,
    Region: env.REGION,
  }, args);
};

const providerPath = (key: string, data: any) => {
  return key.replace('%hash%', data.sha256);
};

const packagePath = (key: string, data: any) => {
  return `p/${key}$${data.sha256}.json`;
};

const cosHead = (key: string): Promise<any> => new Promise((resolve) => {
  cos.headObject(params({
    Key: key,
  }), (err: any, response: any) => {
    if (err) {
      resolve(false);
    } else {
      resolve(response);
    }
  });
});

const cosGet = (key: string): Promise<any> => new Promise((resolve) => {
  cos.getObject(params({
    Key: key,
  }), (err: any, response: any) => {
    if (err) {
      resolve(false);
    } else {
      resolve(response);
    }
  });
});

const cosPut = (key: string, data: any): Promise<any> => new Promise((resolve, reject) => {
  cos.putObject(params({
    Key: key,
    Body: Buffer.from(data),
  }), (err: any, response: any) => {
    if (err) {
      reject(err);
    } else {
      resolve(response);
    }
  });
});

const cosDelete = (keys: any[]): Promise<any> => new Promise((resolve, reject) => {
  cos.deleteMultipleObject(params({
    Objects: keys,
  }), (err: any, response: any) => {
    if (err) {
      reject(err);
    } else {
      resolve(response);
    }
  });
});

export {
  httpClient,
  cosHead,
  cosGet,
  cosPut,
  cosDelete,
  providerPath,
  packagePath,
};