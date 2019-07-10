import { cosGet, httpClient, providerPath } from './common';

export class Providers {
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
      this.sourceProviders[key] = response.body;
      const cosProvider = this.cos[key];
      const cosPath = providerPath(key, cosProvider);
      const cosResponse = await cosGet(cosPath);
      if (cosResponse) {
        this.cosProviders[key] = cosResponse.Body.toString();
      }
    }
    return this;
  }
}
