import Modal from 'react-modal';

import { database } from '../../services/firebase';

import './styles.scss';
import cx from 'classnames';
import toast from 'react-hot-toast';

type DeleteModalProps = {
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  questionId: string;
  roomId: string;
  isDark?: boolean;
}

export function DeleteModal({ modalIsOpen, setModalIsOpen, questionId, roomId, isDark = false }: DeleteModalProps) {
  Modal.setAppElement('#root');

  function handleDeleteModal() {
    setModalIsOpen(!modalIsOpen);
  }

  async function handleDeleteQuestion() {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    setModalIsOpen(!modalIsOpen);
    toast.success('Pergunta removida com sucesso!');
  }

  return (
    <Modal
      className={cx("delete-modal", { dark: isDark })}
      overlayClassName="delete-overlay"
      isOpen={modalIsOpen}
      onRequestClose={handleDeleteModal}
      contentLabel="Modal para excluir pergunta"
    >
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 5.99988H5H21" stroke="#DC1C13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#DC1C13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <strong>Tem certeza que deseja remover essa pergunta?</strong>
      <button onClick={handleDeleteQuestion}>Remover pergunta</button>
    </Modal>
  );
}