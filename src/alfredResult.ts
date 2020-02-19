/* eslint-disable no-dupe-class-members */
import * as path from 'path';
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
   * Show informations
   * @param items infomations
   */
  info(items: string[]): this {
    if (Array.isArray(items)) {
      items.forEach((title: string) => {
        this.append([{
          title,
          valid: false,
          icon: {
            path: path.resolve(__dirname, '../assets/ic_bulb.png'),
          },
        }]);
      });
    }

    return this;
  }

  /**
   * Show alert messages
   * @param items error informations
   */
  alert(items: string[]): this {
    if (Array.isArray(items)) {
      items.forEach((title: string) => {
        this.append([{
          title,
          valid: false,
          icon: {
            path: path.resolve(__dirname, '../assets/ic_alert.png'),
          },
        }]);
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
