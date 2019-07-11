import { httpClient, add, setBar, onBar } from './common';

export class Mirros {
  providerIncludes: any;
  private data: any;

  async loadPackages() {
    const bar = setBar('Download /packages.json');
    const response = await httpClient('packages.json').on('downloadProgress', (progress: any) =>
      onBar(bar, progress),
    );
    this.data = response.body;
    this.providerIncludes = this.data['provider-includes'];
    return this;
  }

  sync() {
    return add('packages.json', this.data);
  }
}
