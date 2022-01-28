
export function classNames(...s: (string | undefined)[]) {
  let temp = s.filter(v => !!v)
  return temp.join(' ')
}