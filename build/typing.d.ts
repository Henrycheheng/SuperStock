declare module '*.json' {
  const src: any
  export default src
}

// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
declare type Recordable = Record<string, any>
