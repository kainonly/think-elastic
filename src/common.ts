import { Bar } from 'cli-progress';

const COS = require('cos-nodejs-sdk-v5');
const got = require('got');
const { env } = require('process');
const progress = require('cli-progress');

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
  return '/' + key.replace('%hash%', data.sha256);
};

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

const cosDelete = (key: string): Promise<any> => new Promise((resolve, reject) => {
  cos.deleteObject(params({
    Key: key,
  }), (err: any, response: any) => {
    if (err) {
      reject(err);
    } else {
      resolve(response);
    }
  });
});

const setBar = (title: string) => {
  return new progress.Bar({
    format: `${title} [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}`,
    fps: 1,
  });
};

const onBar = (bar: Bar, progress: any) => {
  if (progress.percent === 0) {
    bar.start(progress.total, 0);
  } else {
    bar.update(progress.transferred);
    if (progress.percent === 1) bar.stop();
  }
};

export {
  httpClient,
  cosGet,
  cosPut,
  cosDelete,
  providerPath,
  setBar,
  onBar,
};
