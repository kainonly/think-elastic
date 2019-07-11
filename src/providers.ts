import { add, check, empty, find, httpClient, onBar, packagePath, providerPath, setBar } from './common';
import { removeSync } from 'fs-extra';

const path = require('path');

export class Providers {
  private providersQueue: any[] = [];
  private packageQueue: any[] = [];

  constructor(
    private providerIncludes: any,
  ) {
    this.init();
  }

  private init() {
    /**
     * Clear Old Version Providers
     */
    if (check('p')) {
      const providers = find('p', '.json');
      for (const key of providers) {
        removeSync(path.normalize(key));
      }
    }

    /**
     * Set Provider Sync Queue
     */
    for (const key in this.providerIncludes) {
      if (!this.providerIncludes.hasOwnProperty(key)) continue;
      this.providersQueue.push(providerPath(key, this.providerIncludes[key]));
    }
  }

  /**
   * Provider Sync
   */
  async sync() {
    try {
      /**
       * Sync provider json
       */
      while (this.providersQueue.length !== 0) {
        const path = this.providersQueue[0];
        const bar = setBar('Download ' + path);
        const response = await httpClient(path).on('downloadProgress', (progress: any) =>
          onBar(bar, progress),
        );
        const data = response.body;
        const result = add(path, data);
        if (result) {
          /**
           * Set Provider Package Sync Queue
           */
          const providers = data['providers'];
          for (const key in providers) {
            if (!providers.hasOwnProperty(key)) continue;
            this.packageQueue.push(packagePath(key, providers[key]));
          }
          this.providersQueue.shift();
        }
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   *Sync package
   */
  async syncPackage() {
    try {
      while (this.packageQueue.length !== 0) {
        const path = this.packageQueue[0];
        const exists = check(path);
        if (exists) {
          this.packageQueue.shift();
        } else {
          /**
           * Start Provider Package Download
           */
          if (!empty(path)) {
            continue;
          }
          const bar = setBar('Download ' + path);
          const response = await httpClient(path).on('downloadProgress', (progress: any) =>
            onBar(bar, progress),
          );
          const data = response.body;
          const result = add(path, data);
          if (result) {
            this.packageQueue.shift();
          }
        }
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
