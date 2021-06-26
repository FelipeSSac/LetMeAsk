import copyImg from '../../assets/images/copy.svg';

import { useDark } from '../../hooks/useDark';

import './styles.scss';
import cx from 'classnames';
import toast from 'react-hot-toast';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const Theme = useDark();

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
    toast.success("Código copiado.")
  }

  return (
    <button className={cx('room-code', { dark: Theme.darkMode })} onClick={copyRoomCodeToClipboard} aria-label="Copiar código da sala">
      <div>
        <img src={copyImg} alt='Copiar código da sala' />
      </div>
      <span >Sala #{props.code}</span>
    </button>
  )
}