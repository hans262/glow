import { Button } from "../components/Button";
// import { TestFoldBox } from "../components/FoldBox";
import { Input } from "../components/Input";
import { Link } from "../components/Link";
// import styles from './styles.module.scss'

export default function Test() {
  return (
    <div className="px-8 pt-3">
      <Button>按钮</Button>
      <Link href="/rxjs">rxjs</Link>
      <Input placeholder="input" />
      {/* <TestFoldBox/> */}

    </div>
  )
}


