import { useEffect, useState } from 'react'
import styled from 'styled-components'
import './App.scss'
import { Header } from './components/Header'
import { Question } from './components/Question'
import { SubHeader } from './components/subHeader'


export const App = () => {
  const [themeActive, setThemeActive] = useState('')

  useEffect(() => {
    if (localStorage.getItem('temaAtivo') === null || localStorage.getItem('temaAtivo') === undefined) {
      (document.getElementById('area-app') as HTMLDivElement).classList.add('light-mode')
      localStorage.setItem('temaAtivo', 'light')
      setThemeActive('light')
    } else if(localStorage.getItem('temaAtivo') === 'light'){
      (document.getElementById('area-app') as HTMLDivElement).classList.add('light-mode');
      (document.getElementById('area-app') as HTMLDivElement).classList.remove('dark-mode');
      setThemeActive('light')
    } else if(localStorage.getItem('temaAtivo') === 'dark'){  
      (document.getElementById('area-app') as HTMLDivElement).classList.remove('light-mode');
      (document.getElementById('area-app') as HTMLDivElement).classList.add('dark-mode');
      setThemeActive('dark')
    }
  }, [])

  const toggleTheme = () => {
    if (localStorage.getItem('temaAtivo') === 'light') {
      (document.getElementById('area-app') as HTMLDivElement).classList.remove('light-mode');
      (document.getElementById('area-app') as HTMLDivElement).classList.add('dark-mode')
      localStorage.setItem('temaAtivo', 'dark')
      setThemeActive('dark')
    } else if (localStorage.getItem('temaAtivo') === 'dark'){
      (document.getElementById('area-app') as HTMLDivElement).classList.remove('dark-mode');
      (document.getElementById('area-app') as HTMLDivElement).classList.add('light-mode')
      localStorage.setItem('temaAtivo', 'light')
      setThemeActive('light')
    }
  }

return (
  <div id="area-app" className='light-mode'>
    <Header toggleTheme={toggleTheme} themeActive={themeActive}/>
    <SubHeader />
    <Question />
  </div>
)
}
