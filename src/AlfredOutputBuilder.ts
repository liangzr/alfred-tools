/* eslint-disable no-dupe-class-members */
import * as path from 'path'
import { AlfredOutput, AlfredOutputItem, OptionalItemConfig } from './types/alfred'

export default class AlfredOutputBuilder {
  output: AlfredOutput = {
    items: [],
  }


  /**
   * Append an array of alfred output option
   */
  append(params: AlfredOutputItem[]): this

  /**
   * Append one alfred output option
   * @param title option title
   * @param arg option arg, pass to next node as an argument
   * @param subtitle option subtitle
   * @param params optional alfred output option config
   */
  append(title: string, arg?: string, subtitle?: string, params?: OptionalItemConfig): this

  append(title: string | AlfredOutputItem[], arg = '', subtitle = '', params: OptionalItemConfig = {}): this {
    if (Array.isArray(title)) {
      this.output.items = this.output.items.concat(title)
    } else {
      this.append([{
        title,
        arg,
        subtitle,
        ...params,
      }])
    }

    return this
  }

  /**
     * Append a static option more easily
     * @param icon absolute path of icon for option
     */
  tips(title: string, subtitle = '', icon: string) {
    this.append([{
      title,
      subtitle,
      valid: false,
      icon: {
        path: icon,
      },
    }])

    return this
  }

  /**
   * Shortcut for `output.tips()`, built-in icon for information
   */
  info(title: string, subtitle = '') {
    this.tips(title, subtitle, path.resolve(__dirname, '../assets/ic_bulb.png'))

    return this
  }

  /**
   * Shortcut for `output.tips()`, built-in icon for information
   */
  alert(title: string, subtitle = '') {
    this.tips(title, subtitle, path.resolve(__dirname, '.../assets/ic_bulb.png'))

    return this
  }

  /**
   * Clear all existing options
   */
  clear() {
    this.output.items = []

    return this
  }

  /**
   * Show output with Alfred options
   */
  print() {
    console.log(JSON.stringify(this.output))
  }
}
