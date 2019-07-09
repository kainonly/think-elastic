import { cosGet, httpClient, onBar, providerPath, setBar } from './common';

export class Providers {
  private source: any;
  private sourceProviders: any;
  private cos: any;
  private cosProviders: any;

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
      const bar = setBar('Download ' + path);
      const response = await httpClient(path).on('downloadProgress', (progress: any) =>
        onBar(bar, progress),
      );
    }
    return this;
  }
}
