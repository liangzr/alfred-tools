Alfred Tools
===
[![npm version](https://img.shields.io/npm/v/alfred-tools.svg?style=flat)](https://www.npmjs.org/package/alfred-tools)
![](https://img.shields.io/bundlephobia/minzip/alfred-tools)

More elegant way to develop with Alfred Workflow

TOC
  - [API](#api)
    - [class: AlfredResult](#class-alfredresult)
      - [result.append(title, arg, subtitle, params)](#resultappendtitle-arg-subtitle-params)
      - [result.append(items)](#resultappenditems)
      - [result.tips(title, subtitle, icon)](#resulttipstitle-subtitle-icon)
      - [result.info(title, subtitle)](#resultinfotitle-subtitle)
      - [result.alert(title, subtitle)](#resultalerttitle-subtitle)
      - [result.clear()](#resultclear)
      - [result.print()](#resultprint)
    - [class: HistoryUtil](#class-historyutil)
      - [constructor(filepath, maxNum)](#constructorfilepath-maxnum)
      - [history.readHistoryFile(max)](#historyreadhistoryfilemax)
      - [history.updateHistory(nextHistory) {](#historyupdatehistorynexthistory)
  - [License](#license)

## API

### class: AlfredResult

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

#### result.append(title, arg, subtitle, params)
- `title`: <[string]> option title
- `arg`: <[string]> option arg, pass to next node as an argument
- `subtitle`: <[string]> option subtitle
- `params`: <[AlfredResultItem]> other config of alfred result option

Append a single option

```js
result
  .append('first option', 'A', 'choose this one will get A')
  .print()
```

#### result.append(items)
- `items`: <[AlfredResultItem]> array of alfred result option

Shortcut for `result.append().append()`

#### result.tips(title, subtitle, icon)
- `title`: <[string]> option title
- `subtitle`: <[string]> option subtitle
- `icon`: <[string]> absolute path of icon for option

Append a static option more easily

```js
result.tips('No support', 'Please install dependencies first', path.resolve(__dirname, './icon.png'))
```

#### result.info(title, subtitle)
- `title`: <[string]> option title
- `subtitle`: <[string]> option subtitle

Shortcut for [result.tips()](#tipstitle-subtitle-icon), built-in icon for information

#### result.alert(title, subtitle)
- `title`: <[string]> option title
- `subtitle`: <[string]> option subtitle

Shortcut for [result.tips()](#tipstitle-subtitle-icon), built-in icon for alarm

#### result.clear()

Clear all exists options

#### result.print()

Show result with alfred options



### class: HistoryUtil

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

#### constructor(filepath, maxNum)
- `filepath`: <[string]> history file path
- `maxNum`: <[number]> max number of histories
- `icon`: <[string]> absolute path of icon for option

Construct an instance of HistoryUtil

#### history.readHistoryFile(max)
- `max`: <[number]> count limit when read

Read histories from local file, you can specified a max limit

#### history.updateHistory(nextHistory) {
- `nextHistory`: <[object]> object to be store

Updating a new history item in to local file

## License
MIT


[AlfredResultItem]: https://www.alfredapp.com/help/workflows/inputs/script-filter/json "AlfredResultItem"
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[ChildProcess]: https://nodejs.org/api/child_process.html "ChildProcess"
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
[Error]: https://nodejs.org/api/errors.html#errors_class_error "Error"
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String"