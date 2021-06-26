import { useCallback, useContext, useState } from 'react';

import { useDetectClickOutside } from 'react-detect-click-outside';

import ModeToggle from "react-dark-mode-toggle";
import { AuthContext } from '../../contexts/AuthContext';


import './styles.scss';

export function DropButton() {
  const ref = useDetectClickOutside({ onTriggered: handleMenuClose });

  const [isSelected, setIsSelected] = useState(false);
  const [dark, setDark] = useState(false);

  const context = useContext(AuthContext);


  function handleMenuClose() {
    setIsSelected(false)
  }

  const handleCheck = useCallback(() => {
    // context.darkMode = dark;
    setDark(!dark)
    // console.log(context.darkMode)
  }, [dark])

  return (
    <div id="dropdown" ref={ref}>
      <button onClick={() => setIsSelected(!isSelected)}>
        Configurações
      </button>
      <ul className={isSelected ? ('select') : ('')}>
        <div onClick={handleCheck} className={dark ? 'night' : 'day'}>
          <ModeToggle className='mode-toggle' size={70} checked={dark} />
          <div style={{ width: 100 }}>Mudar para {dark ? 'Dia' : 'Noite'}</div>
        </div>
        <button className={dark ? 'night' : 'day'} >Sair</button>
      </ul>
    </div >
  )
}