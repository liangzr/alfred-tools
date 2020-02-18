/* eslint-disable no-dupe-class-members */
import { IAlfredResult, IAlfredItem } from './types/alfred';

export default class AlfredResult {
  result: IAlfredResult = {
    items: [],
  }

  /**
   * Add some options
   * @param params Entire params
   */
  append(params: IAlfredItem[]): this

  /**
   * Add a new option
   * @param title  item title
   * @param subtitle item subtitle
   * @param params other params of item
   */
  append(title: string | IAlfredItem[], arg: string = '', subtitle: string = '', params: Partial<IAlfredItem> = {}): this {
    if (Array.isArray(title)) {
      this.result.items = this.result.items.concat(title);
    } else {
      this.result.items.push({
        title,
        arg,
        subtitle,
        ...params,
      });
    }

    return this;
  }

  /**
   * Clear all options
   */
  clear(): this {
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
