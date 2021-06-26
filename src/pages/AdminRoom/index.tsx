import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import { useRoom } from '../../hooks/useRoom';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import { NavBar } from '../../components/NavBar';
import { Question } from '../../components/Question';
import { DeleteModal } from '../../components/DeleteModal';

import '../../styles/room.scss';
import toast from 'react-hot-toast';
import { useState } from 'react';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { darkMode } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalQuestion, setModalQuestion] = useState('');

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })
    toast.success('Sala encerrada com sucesso!')
    history.push('/')
  }

  async function handleCheckQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  function handleDeleteModal(questionId: string) {
    setModalIsOpen(!modalIsOpen);
    setModalQuestion(questionId)
  }

  return (
    <div id="page-room" className={darkMode ? 'dark' : ''}>

      <DeleteModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        questionId={modalQuestion}
        roomId={roomId}
      />

      <NavBar
        code={roomId}
        childrenFunction={handleEndRoom}
        isAdmin
      />

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestion(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteModal(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
}