import { cosGet, httpClient } from './common';

export class Mirros {
  providers: any;

  private cos: boolean;
  private data: any;

  constructor(cos: boolean = false) {
    this.cos = cos;
  }

  async loadPackages() {
    if (!this.cos) {
      const response = await httpClient('/packages.json');
      this.data = response.body;
    } else {
      const response = await cosGet('/packages.json');
      const body = response.Body.toString();
      this.data = JSON.parse(body);
    }
    this.providers = this.data['provider-includes'];
    return this;
  }
}
