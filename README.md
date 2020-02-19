Alfred Tools
===
[![npm version](https://img.shields.io/npm/v/alfred-tools.svg?style=flat)](https://www.npmjs.org/package/alfred-tools)
![](https://img.shields.io/bundlephobia/minzip/alfred-tools)

More elegant way to develop with Alfred Workflow

## Tools
- **AlfredResult**: Generate JSON output of Alfred Workflow
- **HistoryUtil**: Help to localize your history options easily

### AlfredResult
#### append(title: string, args?: string, subtitle?:string, params: IAlfredItem): AlfredResult
Append new alfred option item

#### info(items: string[]): AlfredResult
Append new alfred info option item

#### alert(items: string[]): AlfredResult
Append new alfred alert option item

#### clear(): AlfredResult
Clear all options

#### print(): void
Print to alfred options

### HistoryUtil\<T\>
#### (filepath: string, maxNum: number): HistoryUtil\<T\>
Construct a HistoryUtil instance, `filepath` should use history path, `maxNum` is max number of histories

#### readHistoryFile(max: number): T[]
Read histories from local file, you can specified a max limit

#### updateHistory(nextHistory: T): void {
Updating a new history item in to local file

## Example
### AlfredResult


AlfredResult can help you build standard Alfred Workflow outputs easily. Natural intelisense autocomplete with TypeScript, and no longer need to look at the official [Script Filter JSON Format](https://www.alfredapp.com/help/workflows/inputs/script-filter/json/) document all the time

```js
import { AlfredResult } from 'alfred-tools'

const result = new AlfredResult()
result
  .append('My first item', '', 'subtitle of first item', {
    valid: false,
    icon: {
      path: './icon.png'
    }
  })
  .append('Second item')
  .print()
```

### HistoryUtil
Storage your history options or just read common links from config.

HistoryUtil providers `readHistoryFile` and `updateHistory` interface to write and read.

```js
const { HistoryUtil } = require('alfred-tools');
const { detectURL } = require('./endpoint');

const pageHistory = new HistoryUtil('./.cache/history.json', 30);

pageHistory.getHistories = (num = 999) => {
  const histories = pageHistory.readHistoryFile(num);
  return histories.map(url => ({
    title: url,
    arg: url,
    subtitle: detectURL(url),
    icon: {
      path: './assets/ic_history.png',
    },
  }));
};

```

## License
MIT

