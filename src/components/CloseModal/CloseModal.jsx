import React from 'react';
import styles from './CloseModal.module.scss';
import close from '../../assets/icons/close.svg';

const CloseModal = ({ setOpenModal, handleConfirm }) => {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div onClick={() => setOpenModal(false)} className={styles.close}>
          <img src={close} alt="Close" />
        </div>
        <div>
          <span className={styles.title}>Удаление организации</span>
        </div>
        <div>
          <span className={styles.text}>Вы уверены, что хотите удалить организацию из списка?</span>
        </div>
        <div>
          <button className={styles.cancel} onClick={() => setOpenModal(false)}>
            Отменить
          </button>
          <button className={styles.delete} onClick={handleConfirm}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloseModal;
