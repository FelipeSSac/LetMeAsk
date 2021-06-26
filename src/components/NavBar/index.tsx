import { ReactElement } from 'react';

import { RoomCode } from '../RoomCode';
import { Button } from '../Button';
import { DropButton } from '../DropDownButton';

import './styles.scss';
import logoImg from '../../assets/images/logo.svg';

type NavBarProps = {
  code: string;
  isAdmin?: boolean;
  children?: ReactElement;
  childrenFunction?: () => void;
}

export function NavBar({ code, isAdmin, childrenFunction, children }: NavBarProps) {
  return (
    // <header className={darkMode ? 'dark' : ''}>
    <header>
      <div className="content">
        <img src={logoImg} alt="LetMeAsk" />
        {code === 'Nav' ? (
          <DropButton />
        ) : (
          <div>
            <RoomCode code={code} />
            {isAdmin && <Button onClick={childrenFunction} isOutlined >Encerrar sala</Button>}
          </div>
        )}
      </div>
    </ header >
  )
}