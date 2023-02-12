import React from 'react';
import styles from './SelectAndInput.module.scss';
const SelectAndInput = ({
  setTax,
  bin,
  setBin,
  name,
  setName,
  datacom,
  selected,
  handleChange,
  nameShort,
}) => {
  return (
    <>
      <div>
        <p>Выберите систему налогообложения</p>
        <select className={styles.select} onChange={handleChange} name={selected} value={selected}>
          {datacom.map((item) => (
            <option key={item.id} value={item.full} onChange={() => setTax(item.id)}>
              {item.full}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div>
          <p className={styles.textTin}>Введите ИИН/БИН</p>
          <input
            className={styles.inputTin}
            value={bin}
            type="text"
            onChange={(e) => setBin(e.target.value)}
          />
        </div>
        <div>
          <p className={styles.textComp}>Введите название компании</p>
          <input className={styles.nameShort} placeholder={nameShort} readOnly disabled />
          <input
            className={styles.inputComp}
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default SelectAndInput;
