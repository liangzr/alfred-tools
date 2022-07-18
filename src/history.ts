import RecentlyUsed from './RecentlyUsed'
import { AlfredOutputItem, OptionalItemConfig } from './types/alfred'

interface HistoryConfig {
  title: string
  arg: string
  subtitle: string
}

let store: RecentlyUsed<HistoryConfig>
const defaultConfig = {}

const history = Object.freeze({
  read(limit?: number): Partial<AlfredOutputItem>[] {
    return store.read(limit).map((item) => ({
      title: item.title,
      subtitle: item.subtitle,
      arg: item.arg,
      ...defaultConfig,
    }))
  },
  record: (data: HistoryConfig) => store.record(data),
  replace: (dataset: HistoryConfig[]) => store.replace(dataset),
  reset: () => store.reset(),
  config(params: OptionalItemConfig) {
    Object.assign(defaultConfig, params)
  },
})


export default new Proxy(history, {
  get(target, field) {
    if (!store) {
      store = RecentlyUsed.use<HistoryConfig>('history.json', 1000)
    }

    return target[field]
  },
})
