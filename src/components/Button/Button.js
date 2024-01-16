import React from 'react'
import styled from 'styled-components'

function Button({name, icon, onClick, bg, bPad, color, bRad,size,width,height}) {
    return (
        <ButtonStyled style={{
            background: bg,
            padding: bPad,
            borderRadius: bRad,
            color: color,
            fontSize: size,
            width: width, 
            height: width,

        }} onClick={onClick}
        >
            {icon && <Icon style={{ fontSize: size }}>{icon}</Icon>}
            {name}
        </ButtonStyled>
    )
}

const Icon = styled.span`

`;

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
`;


export default Button