import { cosGet } from './common';

export class Providers {
  private source: any;
  private cos: any;

  constructor(
    source: any,
    cos: any,
  ) {
    this.source = source;
    this.cos = cos;
  }

  async loadProvider() {
    return this;
  }
}
