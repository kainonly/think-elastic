import * as fs from 'fs-extra';
import * as path from 'path';
import * as got from 'got';
import { config } from 'dotenv';

const env = config().parsed;

const httpClient = got.extend({
  baseUrl: env.SOURCE,
  json: true,
  retry: 5,
});

const providerPath = (key: string, data: any) => key.replace('%hash%', data.sha256);
const packagePath = (key: string, data: any) => `p/${key}$${data.sha256}.json`;
const check = (key: string) => fs.pathExistsSync('cache/' + key);
const remove = (key: string) => fs.removeSync('cache/' + key);
const get = (key: string) => {
  if (!check(key)) return false;
  fs.readJSONSync('cache/' + key);
};
const add = (key: string, data: any) => {
  const { dir } = path.parse('cache/' + key);
  if (dir) {
    fs.ensureFileSync(dir);
  }
  return fs.writeJSONSync(key, data);
};

export {
  httpClient,
  providerPath,
  packagePath,
  check,
  get,
  add,
  remove,
};
