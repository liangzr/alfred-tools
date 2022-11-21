
export interface AlfredOutputItem {
  /**
   * This is a unique identifier for the item which allows help Alfred to learn about
   * this item for subsequent sorting and ordering of the user's actioned results.
   */
  uid?: string

  /**
   * The title displayed in the result row. There are no options for this element and
   * it is essential that this element is populated.
   */
  title: string

  /**
   * The subtitle displayed in the result row. This element is optional
   */
  subtitle?: string

  /**
   * The argument which is passed through the workflow to the connected output action.
   */
  arg?: string

  /**
   * The icon displayed in the result row. Workflows are run from their workflow folder,
   * so you can reference icons stored in your workflow relatively.
   */
  icon?: {
    /**
     * By omitting the "type", Alfred will load the file path itself, for example a png.
     * By using "type": "fileicon", Alfred will get the icon for the specified path.
     * Finally, by using "type": "filetype", you can get the icon of a specific file,
     * for example "path": "public.png"
     */
    type?: 'fileicon',
    path: string
  }

  /**
   * If this item is valid or not. If an item is valid then Alfred will action this item
   * when the user presses return. If the item is not valid, Alfred will do nothing. This
   * allows you to intelligently prevent Alfred from actioning a result based on the current
   * {query} passed into your script.
   * @default true
   */
  valid?: boolean

  /**
   * From Alfred 3.5, the match field enables you to define what Alfred matches against when
   * the workflow is set to "Alfred Filters Results". If match is present, it fully replaces
   * matching on the title property.
   */
  match?: string

  /**
   * An optional but recommended string you can provide which is populated into Alfred's search
   * field if the user auto-complete's the selected result (⇥ by default).
   */
  autocomplete?: string

  /**
   * By specifying "type": "file", this makes Alfred treat your result as a file on your system.
   * This allows the user to perform actions on the file like they can with Alfred's standard file
   * filters.
   * @default 'default'
   */
  type?: 'default' | 'file' | 'file:skipcheck'

  /**
   * The mod element gives you control over how the modifier keys react. You can now define the
   * valid attribute to mark if the result is valid based on the modifier selection and set a
   * different arg to be passed out if actioned with the modifier.
   */
  mods?: ALfredMods

  /**
   * The text element defines the text the user will get when copying the selected result row with
   *  ⌘C or displaying large type with ⌘L.
   */
  text?: Record<'copy' | 'largetype', string>

  /**
   * A Quick Look URL which will be visible if the user uses the Quick Look feature within Alfred
   * (tapping shift, or cmd+y). Note that quicklookurl will also accept a file path, both absolute
   * and relative to home using ~/.
   */
  quicklookurl?: string

  /**
   * From Alfred 3.4.1, individual item objects can also have variables which are passed
   * out of the Script Filter object if the associated Result Item is selected in Alfred's
   * results list. variables set within an item will override any JSON session variables of
   * the same name.
   */
  variables?: Record<string, any>
}

export interface AlfredMod{
  valid?: boolean
  arg?: string
  subtitle?: string
}

export interface ALfredMods {
  alt?: AlfredMod
  cmd?: AlfredMod
  'cmd+alt'?: AlfredMod
}

export interface AlfredOutput {
  /**
   * Rerunning script filters automatically in seconds
   */
  rerun?: number

  /**
   * Variables can be passed out of the script filter within a variables object.
   * This is useful for two things. Firstly, these variables will be passed out of the script
   * filter's outputs when action a result. Secondly, any variables passed out of a script
   * will be passed back in as environment variables when the script is run within the same
   * session. This can be used for very simply managing state between runs as the user types
   * input or when the script is set to re-run after an interval.
   */
  variables?: Record<string, any>

  /**
   * A Script Filter is required to return an items array of zero or more items.
   * Each item describes a result row displayed in Alfred.
   */
  items: AlfredOutputItem[]
}

export type OptionalItemConfig = Partial<Omit<AlfredOutputItem, 'title' | 'arg' | 'subtitle'>>
