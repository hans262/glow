import { Button } from "../components/Button";
import { Input } from "../components/Input";

export default function Test() {
  return (
    // <Loading/>
    <div className="px-8 py-3">

      <Button onClick={() => {
        
      }}>按钮</Button>
      <Input onChange={e => console.log(e.target.value)} />
    </div>
  )
}