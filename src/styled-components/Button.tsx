import styled from "styled-components";

export const Button = styled.button<{
  hoverColor?: string
}>`
  cursor: pointer;
  :hover {
    color: ${props => props.hoverColor ? props.hoverColor : 'white'};
    background: #444;
  }
  border: none;
  margin-right: 5px;
`