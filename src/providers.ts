import { cosGet, httpClient, packagePath, providerPath } from './common';

export class Providers {
  addProvider: any[] = [];
  deleteProvider: any[] = [];
  addPackage: any[] = [];
  deletePackage: any[] = [];

  private source: any;
  private sourceProviders: any = {};
  private cos: any;
  private cosProviders: any = {};

  constructor(
    source: any,
    cos: any,
  ) {
    this.source = source;
    this.cos = cos;
  }

  async loadProvider() {
    for (const key in this.source) {
      if (!this.source.hasOwnProperty(key)) continue;
      const provider = this.source[key];
      const path = providerPath(key, provider);
      const response = await httpClient(path);
      this.sourceProviders[key] = JSON.parse(response.body)['providers'];
      const cosProvider = this.cos[key];
      if (provider === cosProvider) continue;
      const cosPath = providerPath(key, cosProvider);
      const cosResponse = await cosGet(cosPath);
      if (!cosResponse) continue;
      this.cosProviders[key] = JSON.parse(cosResponse.Body.toString())['providers'];
      this.compare(this.sourceProviders[key], this.cosProviders[key]);
      this.addProvider.push(path);
      this.deleteProvider.push({
        Key: cosPath,
      });
    }
    return this;
  }

  private compare(source: any, cos: any) {
    for (const key in source) {
      if (!source.hasOwnProperty(key)) continue;
      if (!cos.hasOwnProperty(key)) {
        this.addPackage.push(packagePath(key, source[key]));
        continue;
      }
      const sourceSha256 = source[key].sha256;
      const cosSha256 = cos[key].sha256;
      if (sourceSha256 !== cosSha256) {
        this.deletePackage.push({
          Key: packagePath(key, cos[key]),
        });
        this.addPackage.push(packagePath(key, source[key]));
      }
    }
  }
}
