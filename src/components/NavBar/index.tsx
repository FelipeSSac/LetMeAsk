import { ReactElement } from 'react';

import { useAuth } from '../../hooks/useAuth';

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
  const { darkMode } = useAuth();
  return (
    <header className={darkMode ? 'dark' : ''}>
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