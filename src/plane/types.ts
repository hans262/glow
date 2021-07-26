
export interface Item {
  id: number,
  className: string,
  visible: boolean,
  children?: Item[]
}