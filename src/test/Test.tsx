import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Link } from "../components/Link";

export default function Test() {
  return (
    <div className="px-8 pt-2 space-x-2">
      <Button>按钮</Button>
      <Link href="/rxjs">rxjs</Link>
      <Input placeholder="input" />
    </div>
  )
}