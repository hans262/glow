import styled, { css, ThemeProvider } from "styled-components";


const Button = styled.button<{
  primary?: boolean
}>`
  border-radius: 3px;
  :hover {
    color: blue;
  }
  color: ${props => props.theme.color};
  ${props => props.primary && css`
    border-color: ${props.theme.color}
  `}
`;

export default function Test() {
  return (
    <ThemeProvider theme={{
      color: 'yellowgreen'
    }}>
      <Button primary>button</Button>
    </ThemeProvider>
  )
}