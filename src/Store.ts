import * as fse from 'fs-extra'
import * as path from 'path'

class Store {
  filepath = ''

  private constructor(filename: string) {
    this.filepath = path.join('.cache', filename)

    fse.ensureFileSync(this.filepath)
  }

  /**
   * @param filename filename of the stored file
   */
  static use(filename: string) {
    return new Store(filename)
  }

  save(data: string) {
    try {
      fse.writeFileSync(this.filepath, data)
    } catch (err) {
      console.warn('Write data failed: ', err)
    }
  }

  read() {
    try {
      const buffer = fse.readFileSync(this.filepath)
      return buffer.toString()
    } catch (err) {
      console.warn('Read data failed: ', err)
      return ''
    }
  }
}

export default Store
