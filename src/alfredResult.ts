import { IAlfredResult } from './types/alfred';

export default class AlfredResult {
  result: IAlfredResult = {
    items: [],
  }

  /**
   * Add a new option
   * @param title  item title
   * @param subtitle item subtitle
   * @param params other params of item
   */
  append(title: string, subtitle: string = '', params: Partial<IAlfredResult> = {}): AlfredResult {
    this.result.items.push({
      title,
      subtitle,
      ...params,
    });

    return this;
  }

  /**
   * Clear all options
   */
  clear(): AlfredResult {
    this.result.items = [];

    return this;
  }

  /**
   * Print result to Alfred Options
   */
  print(): void {
    console.log(JSON.stringify(this.result));
  }
}
