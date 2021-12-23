import { Button } from "antd"
import styled from "styled-components"

const AntdButton = styled(Button)`
  color: red;
  border-color: red;
  &.ant-btn:hover, &.ant-btn:focus{
    color: red;
    border-color: red;
  }
`

export default function Test() {
  return (
    <AntdButton>百度</AntdButton>
  )
}
