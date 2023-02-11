import React from 'react';
import datacom from '../../data/tax-systems.json';
import styles from './Modal.module.scss';
import dataown from '../../data/ownerships.json';

const Modal = ({
  open,
  setOpen,
  setCompanies,
  selectedId,
  setSelectedId,
  selectedCompany,
  formId,
}) => {
  const [bin, setBin] = React.useState(selectedCompany.company_tin || '');
  const [name, setName] = React.useState(selectedCompany.company_name || '');
  const [tax, setTax] = React.useState(null);
  const [selected, setSelected] = React.useState(selectedCompany.tax_id || '');
  const data = ['ТОО', 'ИП', 'Прочие'];
  const [current, setCurrent] = React.useState(0);
  let accountType = '';

  dataown.forEach((item) => {
    if (item.id === formId) {
      accountType = item.account_type;
    }
  });
  console.log('selectedId', selectedId);
  console.log('FromID', formId);
  console.log(accountType);

  const [selectedOption, setSelectedOption] = React.useState('');
  const [selectedRadio, setSelectedRadio] = React.useState(null);

  const handleClickCategory = (item, index) => {
    setCurrent(index);
    setSelectedRadio(null);
    switch (item) {
      case 'ТОО':
        setSelectedOption(accountType);
        break;
      case 'ИП':
        setSelectedOption(accountType);
        break;
      case 'Прочие':
        setSelectedOption(accountType);
        break;
      default:
        setSelectedOption('');
        break;
    }
    console.log(selectedOption);
  };

  const handleClickOutside = (event) => {
    if (open && !event.target.closest(`.${styles.inner}`)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    setSelected(
      selectedCompany.tax_id ? datacom.find((item) => item.id === selectedCompany.tax_id).full : '',
    );
  }, [selectedCompany, datacom]);

  const handleSubmit = () => {
    setCompanies((prevState) => {
      const idx = prevState.findIndex((company) => company.company_id === selectedId);

      console.log(idx);
      const oldItem = prevState[idx];

      const newItem = {
        ...oldItem,
        company_name: name,
        company_tin: bin,
        tax_id: tax === null ? selectedCompany.tax_id : tax,
      };
      console.log('newData:', newItem);
      return [...prevState.slice(0, idx), newItem, ...prevState.slice(idx + 1)];
    });
    setOpen(false);
    setSelectedId(null);
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
    setTax(datacom.find((item) => item.full === e.target.value).id);
  };

  return (
    <div onClick={handleClickOutside} className={styles.root}>
      <div className={styles.inner}>
        <span className={styles.title}>Редактировать данные организации</span>
        <div className={styles.buttons}>
          {data.map((item, i) => (
            <button
              key={item}
              onClick={() => handleClickCategory(item, i)}
              className={current === i ? styles.active : styles.button}>
              {item}
            </button>
          ))}
        </div>
        {selectedOption === 'too' && (
          <>
            <div>
              <p>Выберите систему налогообложения</p>
              <select
                className={styles.select}
                onChange={handleChange}
                name={selected}
                value={selected}>
                {datacom.map((item) => (
                  <option key={item.id} value={item.full} onChange={() => setTax(item.id)}>
                    {item.full}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Введите ИИН/БИН</p>
              <input
                className={styles.inputTin}
                value={bin}
                type="text"
                onChange={(e) => setBin(e.target.value)}
                readOnly
                disabled
              />
            </div>
            <div>
              <p>Введите название компании</p>
              <input className={styles.nameShort} placeholder="ТОО" readOnly disabled />
              <input
                className={styles.inputName}
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                readOnly
                disabled
              />
            </div>
          </>
        )}
        {selectedOption === 'ip' && (
          <>
            <div>
              <p>Выберите систему налогообложения</p>
              <select
                className={styles.select}
                onChange={handleChange}
                name={selected}
                value={selected}>
                {datacom.map((item) => (
                  <option key={item.id} value={item.full} onChange={() => setTax(item.id)}>
                    {item.full}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Введите ИИН/БИН</p>
              <input
                className={styles.inputTin}
                value={bin}
                type="text"
                onChange={(e) => setBin(e.target.value)}
                readOnly
                disabled
              />
            </div>
            <div>
              <p>Введите название компании</p>
              <input className={styles.nameShort} placeholder="ИП" readOnly disabled />
              <input
                className={styles.inputName}
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                readOnly
                disabled
              />
            </div>
          </>
        )}
        {selectedOption === 'fiz' && (
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
        )}
        {selectedRadio === 'option1' && (
          <>
            <div>
              <p>Выберите систему собственоссти</p>
              <select className={styles.select} onChange={handleChange} name={selected}>
                {dataown.map((item) => (
                  <option key={item.id} value={item.full}>
                    {item.full}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Выберите систему налогообложения</p>
              <select
                className={styles.select}
                onChange={handleChange}
                name={selected}
                value={selected}>
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
                <input className={styles.nameShort} placeholder="ЮЛ" readOnly disabled />
                <input
                  className={styles.inputComp}
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </>
        )}
        {selectedRadio === 'option2' && (
          <>
            <div>
              <p>Выберите систему собственоссти</p>
              <select className={styles.select} onChange={handleChange} name={selected}>
                {dataown.map((item) => (
                  <option key={item.id} value={item.full}>
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
                <input className={styles.nameShort} placeholder="ЮЛ" readOnly disabled />
                <input
                  className={styles.inputComp}
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </>
        )}
        {selectedRadio === 'option3' && (
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
              <input className={styles.nameShort} placeholder="ФЛ" readOnly disabled />
              <input
                className={styles.inputComp}
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        )}

        <button className={styles.buttonconfirm} onClick={handleSubmit}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default Modal;
