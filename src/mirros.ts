import { httpClient, get, add } from './common';

export class Mirros {
  providers: any;
  data: any;

  private local: boolean;

  constructor(local: boolean = false) {
    this.local = local;
  }

  async loadPackages() {
    if (!this.local) {
      const response = await httpClient('packages.json');
      this.data = response.body;
    } else {
      this.data = get('packages.json');
    }
    this.providers = this.data['provider-includes'];
    return this;
  }

  sync() {
    return add('packages.json', this.data);
  }
}
