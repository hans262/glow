
export function classNames(...s: (string | undefined | false)[]) {
  let temp = s.filter(v => !!v)
  return temp.join(' ')
}