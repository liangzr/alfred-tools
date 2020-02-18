import { IAlfredResult } from './types';

export class AlfredResult {
  result: IAlfredResult = {
    items: [],
  }

  add(title: string, subtitle: string = '', params: Partial<IAlfredResult> = {}) {
    this.result.items.push({
      title,
      subtitle,
      ...params,
    });

    return this;
  }

  only(title: string, subtitle: string = '', params: Partial<IAlfredResult> = {}) {
    this.result.items = [{
      title,
      subtitle,
      ...params,
    }];

    return this;
  }

  print() {
    console.log(JSON.stringify(this.result));
  }
}
