import { config } from 'dotenv';
import { extend } from 'got';
import { parse } from 'path';
import { emptyDirSync, ensureDirSync, pathExistsSync, writeJSONSync } from 'fs-extra';
import { Bar } from 'cli-progress';

const finder = require('fs-finder');
const env = config().parsed;

const httpClient: any = extend({
  baseUrl: env.SOURCE,
  json: true,
  retry: 5,
});

const providerPath = (key: string, data: any) => key.replace('%hash%', data.sha256);
const packagePath = (key: string, data: any) => `p/${key}$${data.sha256}.json`;
const check = (key: string) => pathExistsSync('public/' + key);
const empty = (key: string) => {
  try {
    const { dir } = parse('public/' + key);
    if (dir) {
      ensureDirSync(dir);
      emptyDirSync(dir);
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
const add = (key: string, data: any) => {
  try {
    const { dir } = parse('public/' + key);
    if (dir) ensureDirSync(dir);
    writeJSONSync('public/' + key, data);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
const find = (path: string, mask: string) => {
  return finder.in('public/' + path).findFiles(mask);
};
const setBar = (title: string) => {
  return new Bar({
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
  providerPath,
  packagePath,
  check,
  empty,
  add,
  find,
  setBar,
  onBar,
};
