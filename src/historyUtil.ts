import * as fs from 'fs';
import * as fse from 'fs-extra';
import { IHistoryConfig } from './types/history';

class HistoryUtil<T =any> {
  maxNum = 10

  filepath = ''

  /**
   *
   * @param filepath File path of history file
   * @param maxNum Max number of history
   */
  constructor(filepath: string, maxNum: number) {
    this.filepath = filepath;
    this.maxNum = maxNum;

    fse.ensureFileSync(filepath);
  }

  /**
   * Write history to local file
   * @param serializedHistoryList history data
   */
  writeHistoryFile(serializedHistoryList: string) {
    try {
      fs.writeFileSync(this.filepath, serializedHistoryList);
    } catch (err) {
      console.warn('Write history failed: ', err);
    }
  }

  /**
   * Read history from local file
   * @param max count
   */
  readHistoryFile(max = 999): T[] {
    try {
      const str = fs.readFileSync(this.filepath);
      const histories = JSON.parse(str.toString());

      return histories.slice(0, max);
    } catch (err) {
      console.warn('Read history failed: ', err);
      return [];
    }
  }


  /**
   * Update history
   * @param nextHistory history data
   */
  updateHistory(nextHistory: T): void {
    const historyList = this.readHistoryFile() || [];
    const index = historyList.findIndex((x) => x === nextHistory);
    if (index > -1) {
      historyList.splice(index, 1);
    }

    historyList.unshift(nextHistory);
    if (historyList.length > this.maxNum) {
      historyList.splice(
        this.maxNum,
        historyList.length - this.maxNum,
      );
    }

    this.writeHistoryFile(JSON.stringify(historyList, null, 2));
  }
}

export default HistoryUtil;
