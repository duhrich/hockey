import styled from 'styled-components'


export const colorForSkill = (type) => {
    if (type === "Checking")
        return 'blue'
    if (type === "Shooting")
        return 'red'
    if (type === "Skating")
        return 'green'
    return 'gray';

}


export const Bar = styled.div`
    margin:1px;
    
    background-color:${({ type }) => {
        return colorForSkill(type)
    }};
    opacity: ${({ value }) => {
        return value / 10
    }};
    width: 20px;
    margin-top:${({ value }) => {
        return 25 - Math.floor(value * 2.5)
    }}px;
    height: ${({ value }) => {
        return Math.floor(value * 2.5)
    }}px;
`
