import React from 'react';
import styles from './Organizations.module.scss';
import svg from '../../assets/apartment.svg';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';

const Organizations = ({
  name,
  tin,
  image,
  handleDelete,
  id,
  handleEdit,
  formId,
  handleFormId,
  dataOwn,
}) => {
  const handleEditClick = () => {
    handleEdit(id);
    handleFormId(formId);
  };
  let shortValue = '';

  dataOwn.forEach((item) => {
    if (item.id === formId) {
      shortValue = item.short;
    }
  });

  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={image === null ? svg : image} alt="Logo" width={50} height={50} />
      </div>
      <div className={styles.center}>
        <span className={styles.text}>
          {shortValue} {name}
        </span>
        <span className={styles.subtext}>ИНН/БИН {tin}</span>
      </div>
      <div className={styles.left}>
        <div onClick={handleEditClick} className={styles.icons}>
          <img src={editIcon} alt="Edit" />
        </div>

        <div onClick={() => handleDelete(id)} className={styles.icons}>
          <img src={deleteIcon} alt="Delete" />
        </div>
      </div>
    </div>
  );
};

export default Organizations;
