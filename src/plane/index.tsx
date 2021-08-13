import ViewGraphic from "./ViewGraphic"
import { Header } from './Header'
import './index.css'
import { OperPlat } from "./OperPlat"
import { useAppSelector } from "../store"

export default function Paperd() {
  const { styles } = useAppSelector(state => state.plane)
  return (
    <div className="plane">
      <Header height={50} style={{ borderBottom: `1px dashed ${styles.borderColor}` }} />
      <OperPlat height={80} style={{ borderBottom: `1px dashed ${styles.borderColor}` }} />
      <ViewGraphic height='calc(100% - 130px)' />
    </div>
  )
}