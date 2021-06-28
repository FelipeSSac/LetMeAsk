import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useDetectClickOutside } from 'react-detect-click-outside';
import { firebase } from '../../services/firebase';

import { RoomCode } from '../RoomCode';

import ModeToggle from "react-dark-mode-toggle";
import { useDark } from '../../hooks/useDark';

import './styles.scss';

type DropButtonProps = {
  code?: string;
  isAdmin?: boolean;
  childrenFunction?: () => void;
}

export function DropButton({ code, isAdmin, childrenFunction }: DropButtonProps) {
  const ref = useDetectClickOutside({ onTriggered: handleMenuClose });

  const [isSelected, setIsSelected] = useState(false);
  const Theme = useDark();
  const history = useHistory();


  function handleMenuClose() {
    setIsSelected(false)
  }

  const handleCheck = useCallback(() => {
    Theme.setDarkMode(!Theme.darkMode)
  }, [Theme])

  function handleLogOut() {
    firebase.auth().signOut().then(() => history.push('/')).catch((error) => console.log(error)).finally(() => window.location.reload())
  }

  return (
    <div id="dropdown" ref={ref}>
      <button onClick={() => setIsSelected(!isSelected)}>
        Configurações
      </button>
      <ul className={isSelected ? ('select') : ('')}>
        {code && <RoomCode code={code} isMobile />}
        <div onClick={handleCheck} className={Theme.darkMode ? 'night' : 'day'}>
          <ModeToggle className='mode-toggle' size={70} checked={Theme.darkMode} />
          <div style={{ width: 100 }}>Mudar para {Theme.darkMode ? 'Dia' : 'Noite'}</div>
        </div>
        {isAdmin && <button className={`mobile ${Theme.darkMode ? 'night' : 'day'}`} >Encerrar sala</button>}
        <button onClick={handleLogOut} className={Theme.darkMode ? 'night' : 'day'} >Sair</button>
      </ul>
    </div >
  )
}