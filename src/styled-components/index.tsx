import styled, { ThemeProvider } from 'styled-components'

const Input = styled.input<{
  inputColor: string
}>`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export default function Test() {
  return (
    <ThemeProvider theme={{
      color: 'yellowgreen'
    }}>
      <Input inputColor={'red'} />
    </ThemeProvider>
  )
}