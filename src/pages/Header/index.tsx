import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navegacao } from './styles'

export const Header: React.FC = () => {
    return (
        <>
            <Navegacao>
                <ul>
                    <li><NavLink to="/">Dashboard</NavLink></li>
                    <li><NavLink to="/repository">Repositório</NavLink></li>
                </ul>
            </Navegacao>
        </>
    )
}
