import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';

import '../../styles/auth.scss'
import toast from 'react-hot-toast';
import { NavBar } from '../../components/NavBar';
import { DropButton } from '../../components/DropDownButton';

export function NewRoom() {
  const history = useHistory();

  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateNewRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      toast.error('Preencha o nome da sala!');
      return;
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth" className='new-room'>

      <NavBar code="Nav" >
        <DropButton />
      </NavBar>

      <div className="content">
        <aside className="user-id">
          <img className="user-icon" src={user?.avatar} alt="Imagem do usuário" />
          <strong>{user?.name}</strong>
        </aside>
        {/* <main className={darkMode ? 'dark' : ''}> */}
        <main>
          <div className="main-content">
            <img src={logoImg} alt="LetMeAsk" />
            <h2>Criar uma nova sala</h2>
            <div className="separator">ou entre em uma sala</div>
            <form onSubmit={handleCreateNewRoom}>
              <input
                type="text"
                placeholder="Nome da sala"
                onChange={event => setNewRoom(event.target.value)}
                value={newRoom}
              />
              <Button type="submit">
                Criar sala
              </Button>
            </form>
            <p>
              Quer entrar em uma sala existente?
              <Link to="/">clique aqui</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}