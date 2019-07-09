import { setBar, onBar, cosGet, httpClient } from './common';

export class Mirros {
  providers: any;
  raw: string;

  private cos: boolean;
  private data: any;

  constructor(cos: boolean = false) {
    this.cos = cos;
  }

  async loadPackages() {
    if (!this.cos) {
      const bar = setBar('Download /packages.json');
      const response = await httpClient('/packages.json').on('downloadProgress', (progress: any) =>
        onBar(bar, progress),
      );
      this.raw = response.body;
    } else {
      const response = await cosGet('/packages.json');
      this.raw = response.Body.toString();
    }
    this.data = JSON.parse(this.raw);
    this.providers = this.data['provider-includes'];
    return this;
  }
}
