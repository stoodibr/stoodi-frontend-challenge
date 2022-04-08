import { shade } from 'polished'
import React, { useEffect, useState } from 'react'
import Switch from 'react-switch';
import styled from 'styled-components'
import './header.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
    toggleTheme(): void
    themeActive: string
}

export const Header = ({ toggleTheme, themeActive }: HeaderProps) => {

    return (
        <section id="header">
            <h4>Olá, Seja bem-vindo!</h4>

            <div id='right-settings-top'>
                <FontAwesomeIcon className={themeActive === 'light' ? 'iconLightActive' : 'iconLightInative'} icon={faSun} />
                <Switch
                    onChange={toggleTheme}
                    checked={themeActive === 'dark'}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    height={14}
                    width={40}
                    handleDiameter={20}
                    offColor={shade(0.4, '#084BFB')}
                    onColor={'#084BFB'}
                />
                <FontAwesomeIcon className={themeActive === 'dark' ? 'iconDarkActive' : 'iconDarkInative'} icon={faMoon} />
            </div>
        </section>
    )
}