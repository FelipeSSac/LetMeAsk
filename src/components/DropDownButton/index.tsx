import { useCallback, useState } from 'react';

import { useDetectClickOutside } from 'react-detect-click-outside';

import ModeToggle from "react-dark-mode-toggle";
import { useDark } from '../../hooks/useDark';

import './styles.scss';

export function DropButton() {
  const ref = useDetectClickOutside({ onTriggered: handleMenuClose });

  const [isSelected, setIsSelected] = useState(false);
  const Theme = useDark();


  function handleMenuClose() {
    setIsSelected(false)
  }

  const handleCheck = useCallback(() => {
    Theme.setDarkMode(!Theme.darkMode)
  }, [Theme])

  return (
    <div id="dropdown" ref={ref}>
      <button onClick={() => setIsSelected(!isSelected)}>
        Configurações
      </button>
      <ul className={isSelected ? ('select') : ('')}>
        <div onClick={handleCheck} className={Theme.darkMode ? 'night' : 'day'}>
          <ModeToggle className='mode-toggle' size={70} checked={Theme.darkMode} />
          <div style={{ width: 100 }}>Mudar para {Theme.darkMode ? 'Dia' : 'Noite'}</div>
        </div>
        <button className={Theme.darkMode ? 'night' : 'day'} >Sair</button>
      </ul>
    </div >
  )
}