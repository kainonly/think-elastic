import { httpClient } from './library';

export class Packages {
  public raw: string;
  public data: any;
  private origin: boolean;
  private providerIncludes: any;
  private providers: any[] = [];

  constructor(origin: boolean) {
    this.origin = origin;
  }

  async loadPackages() {
    if (this.data || this.raw) return;
    if (this.origin) {
      const response = await httpClient('/packages.json');
      this.data = response.body;
      this.raw = JSON.stringify(response.body);
    } else {

    }
    this.providerIncludes = this.data['provider-includes'];
    return this;
  }

  getProviders() {
    if (this.providers.length !== 0) return this.providers;
    for (const key in this.providerIncludes) {
      if (this.providerIncludes.hasOwnProperty(key)) {
        this.providers.push(key.replace('%hash%', this.providerIncludes[key].sha256));
      }
    }
    return this.providers;
  }

}
