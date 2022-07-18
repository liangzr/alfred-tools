import Store from './Store'

export default class RecentlyUsed<DataType = any> {
  maxNum = 10

  store: Store

  constructor(filename: string, maxNum: number) {
    this.maxNum = maxNum
    this.store = Store.use(filename)
  }

  /**
   * @param filename filename of the stored file
   * @param maxNum Maximum number of the record records
   */
  static use<Data>(filename: string, maxNum = 10) {
    return new RecentlyUsed<Data>(filename, maxNum)
  }


  /**
   * Read record from local file
   * @param limit maximum limit of the records
   */
  read(limit?: number): DataType[] {
    try {
      const buffer = this.store.read()
      const histories: unknown = JSON.parse(buffer.toString())

      if (Array.isArray(histories)) {
        return histories.slice?.(0, limit)
      }

      throw new Error(`Bad data: ${buffer}`)
    } catch (err) {
      console.warn('Read record failed: ', err)
      return []
    }
  }

  /**
   * Overwrite all of the data
   */
  replace(dataset: DataType[]) {
    this.store.save(JSON.stringify(dataset, null, 2))
  }

  /**
   * Clean up all of the data
   */
  reset() {
    this.store.save(JSON.stringify([], null, 2))
  }


  /**
   * Updating a new record item into the local file
   * @param data fresh record
   */
  record(data: DataType): void {
    const records = this.read()
    const index = records.findIndex((x) => x === data)
    if (index > -1) {
      records.splice(index, 1)
    }

    records.unshift(data)

    this.store.save(JSON.stringify(records.slice(0, this.maxNum), null, 2))
  }
}
