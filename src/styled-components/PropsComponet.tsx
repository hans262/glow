import styled from "styled-components";

const Div = styled.div`
  display: inline-block;
  border: 1px solid blue;
  padding: 3px 10px;
  border-radius: 4px;
  a{
    color: blue;
    font-weight: 700;
  }
  a:hover{
    color: yellowgreen;
  }
`

const Link: React.FC<{
  href: string
}> = ({ children, href }) => {

  return (
    <Div>
      <a href={href}>
        {children}
      </a>
    </Div>
  )
}

export default function Test() {
  return (
    <Link href="https://www.baidu.com">百度</Link>
  )
}
