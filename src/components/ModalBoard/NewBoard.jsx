import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBoard } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import sprite from '../../images/sprite.svg';
import css from '../Sidebar/Sidebar.module.css';
import ModalBoard from './ModalBoard';

const NewBoard = () => {
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const required = true;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const [icon, setIcon] = useState('icon-project');
  const [background, setBackground] = useState('null');

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      addBoard({
        title: event.target[0].value,
        icon,
        background,
      })
    ).then(() => {
      if (!isBoardsLoading) {
        toggleModal();
        setIcon('icon-project');
        setBackground('null');
      }
    });
  };

  const changeIcon = event => {
    setIcon(event.target.value);
  };
  const changeBg = event => {
    setBackground(event.target.value);
  };

  const modalProps = {
    isModalOpen,
    toggleModal,
    handleSubmit,
    changeBg,
    changeIcon,
    icon,
    background,
    required,
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className={css.sidebarBoardButton}
        type="button"
      >
        <svg className={css.sidebarBoardIcon}>
          <use href={sprite + '#icon-plus'}></use>
        </svg>
      </button>
      <ModalBoard
        {...modalProps}
        modalTitle="New Board"
        submitButtonText="Create"
      />
    </div>
  );
};

export default NewBoard;
