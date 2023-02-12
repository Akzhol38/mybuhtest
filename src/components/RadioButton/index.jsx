import React from 'react';
import styles from './RadioButton.module.scss';
const RadioButton = ({ selectedRadio, setSelectedRadio }) => {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.innerBox}>
          <input
            className={styles.rButton}
            type="radio"
            id="llc"
            value="option1"
            checked={selectedRadio === 'option1'}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          <label className={styles.label} htmlFor="llc">
            Юридические лица
          </label>
        </div>
        <div className={styles.innerBox}>
          <input
            className={styles.rButton}
            type="radio"
            id="ip"
            value="option2"
            checked={selectedRadio === 'option2'}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          <label className={styles.label} htmlFor="ip">
            Частная практика
          </label>
        </div>
        <div className={styles.innerBox}>
          <input
            className={styles.rButton}
            type="radio"
            id="ff"
            value="option3"
            checked={selectedRadio === 'option3'}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          <label className={styles.label} htmlFor="ff">
            Физические лица
          </label>
        </div>
      </div>
    </>
  );
};

export default RadioButton;
