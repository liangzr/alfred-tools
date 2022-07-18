Alfred Tools
===
[![npm version](https://img.shields.io/npm/v/alfred-tools.svg?style=flat)](https://www.npmjs.org/package/alfred-tools)
![](https://img.shields.io/bundlephobia/minzip/alfred-tools)

A more elegant way to develop with Alfred Workflow


TOC
- [Alfred Tools](#alfred-tools)
  - [API](#api)
    - [class: AlfredOutputBuilder](#class-alfredoutputbuilder)
      - [constructor()](#constructor)
      - [output.append(title, arg, subtitle, params)](#outputappendtitle-arg-subtitle-params)
      - [output.append(items)](#outputappenditems)
      - [output.tips(title, subtitle, icon)](#outputtipstitle-subtitle-icon)
      - [output.info(title, subtitle)](#outputinfotitle-subtitle)
      - [output.alert(title, subtitle)](#outputalerttitle-subtitle)
      - [output.clear()](#outputclear)
      - [output.print()](#outputprint)
    - [class: RecentlyUsed](#class-recentlyused)
      - [use(filename, maxNum)](#usefilename-maxnum)
      - [recently.read(limit)](#recentlyreadlimit)
      - [recently.record(nextRecord) {](#recentlyrecordnextrecord-)
      - [recently.replace(data) {](#recentlyreplacedata-)
      - [recently.reset() {](#recentlyreset-)
    - [const: history](#const-history)
      - [history.read(limit)](#historyreadlimit)
      - [history.record(data) {](#historyrecorddata-)
      - [history.config(params) {](#historyconfigparams-)
      - [history.reset() {](#historyreset-)
  - [License](#license)

## API

### class: AlfredOutputBuilder

AlfredOutputBuilder can help you build a standard Alfred Workflow output easily. Natural IntelliSense auto-complete with TypeScript and no longer need to look at the official [Script Filter JSON Format](https://www.alfredapp.com/help/workflows/inputs/script-filter/json/) document all the time

```js
import { AlfredOutputBuilder } from 'alfred-tools'

const output = new AlfredOutputBuilder()
output
  .append('My first item', 'https://google.com', 'subtitle of first item', {
    valid: false,
    icon: {
      path: './icon.png'
    }
  })
  .append('Second item')
  .print()
```

#### constructor()
- `params`: <[AlfredOutputItem]> optional Alfred output option config
- returns: <[AlfredOutput]>

#### output.append(title, arg, subtitle, params)
- `title`: <[string]> option title
- `arg`: <[string]> option arg, pass to next node as an argument
- `subtitle`: <[string]> option subtitle
- `params`: <[AlfredOutputItem]> optional alfred output option config

Append a single option

```js
output
  .append('first option', 'A', 'choose this one will get A')
  .print()
```

#### output.append(items)
- `items`: <[AlfredOutputItem]\[\]> array of alfred output option

Shortcut for `output.append().append()`

#### output.tips(title, subtitle, icon)
- `title`: <[string]> option title
- `subtitle`: <[string]> option subtitle
- `icon`: <[string]> absolute path of icon for option

Append a static option more easily

```js
output.tips('Not support', 'Please install dependencies first', path.resolve(__dirname, './icon.png'))
```

#### output.info(title, subtitle)
- `title`: <[string]> option title
- `subtitle`: <[string]> option subtitle

Shortcut for [output.tips()](#tipstitle-subtitle-icon), built-in icon for information

#### output.alert(title, subtitle)
- `title`: <[string]> option title
- `subtitle`: <[string]> option subtitle

Shortcut for [output.tips()](#tipstitle-subtitle-icon), built-in icon for alarm

#### output.clear()
Clear all existing options

#### output.print()

Show output with Alfred options



### class: RecentlyUsed

Storage your history options or just read common links from config.

```js
const { RecentlyUsed, AlfredOutputBuilder } = require('alfred-tools');
const { detectURL } = require('./endpoint');

const pageHistory = RecentlyUsed.use('history.json', 10);
const output = new AlfredOutputBuilder()

output.append('First Row')

const histories = pageHistory.read().map(url => ({
  title: url,
  arg: url,
  subtitle: detectURL(url),
  icon: {
    path: './assets/ic_history.png',
  },
}));

output.append(histories)
```

#### use(filename, maxNum)
- `filename`: <[string]> history file path
- `maxNum`: <[number]> max number of histories

Returns an instance of RecentlyUsed

#### recently.read(limit)
- `limit`: <[number]> maximum limit of the records
- returns: <[object]\[]>

Read the recently used list from the local file, you can specify a maximum limit

#### recently.record(nextRecord) {
- `nextRecord`: <[object]> object to be store

Updating a new record item into the local file

#### recently.replace(data) {
- `data`: <[object]\[]> the whole data to replace

Overwrite all of the data

#### recently.reset() {

Clean up all of the data
### const: history

Provide a constant history to read, record, and replace the operation history, defaults save at `.cache/history.json`

```js
const { history } = require('alfred-tools');

const output = new AlfredOutputBuilder()

output.append('First Row')
output.append(history.read())
```

#### history.read(limit)
- `limit`: <[number]> maximum limit of the records
- returns: <[AlfredOutputItem]\[]>

Read the history list from the local file, you can specify a maximum limit

#### history.record(data) {
- `data`: \<HistoryConfig> object to be store

Updating a new record item into the local file

#### history.config(params) {
- `params`: <[AlfredOutputItem]> optional Alfred output option config

Setup the default configuration of the history options

#### history.reset() {

Clean up all of the histories

## License
MIT


[AlfredOutputItem]: https://www.alfredapp.com/help/workflows/inputs/script-filter/json "AlfredOutputItem"
[AlfredOutput]: https://www.alfredapp.com/help/workflows/inputs/script-filter/json "AlfredOutput"
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