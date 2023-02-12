import React from 'react';
import datacom from '../../data/tax-systems.json';
import RadioButton from '../RadioButton';
import SelectAndInput from '../SelectAndInput';
import styles from './Modal.module.scss';

const Modal = ({
  open,
  setOpen,
  setCompanies,
  selectedId,
  setSelectedId,
  selectedCompany,
  formId,
  dataOwn,
}) => {
  const [bin, setBin] = React.useState(selectedCompany.company_tin || '');
  const [name, setName] = React.useState(selectedCompany.company_name || '');
  const [selected, setSelected] = React.useState(selectedCompany.tax_id || '');
  const [tax, setTax] = React.useState(null);
  const [current, setCurrent] = React.useState(0);
  const data = ['ТОО', 'ИП', 'Прочие'];
  let accountType = '';

  dataOwn.forEach((item) => {
    if (item.id === formId) {
      accountType = item.account_type;
    }
  });

  const [selectedOption, setSelectedOption] = React.useState('');
  const [selectedRadio, setSelectedRadio] = React.useState('');

  console.log(selectedRadio);

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
            <SelectAndInput
              setTax={setTax}
              bin={bin}
              setBin={setBin}
              name={name}
              setName={setName}
              datacom={datacom}
              selected={selected}
              handleChange={handleChange}
              nameShort="ТОО"
            />
          </>
        )}
        {selectedOption === 'ip' && (
          <>
            <SelectAndInput
              setTax={setTax}
              bin={bin}
              setBin={setBin}
              name={name}
              setName={setName}
              datacom={datacom}
              selected={selected}
              handleChange={handleChange}
              nameShort="ИП"
            />
          </>
        )}
        {selectedOption === 'fiz' && (
          <RadioButton selectedRadio={selectedRadio} setSelectedRadio={setSelectedRadio} />
        )}
        {selectedRadio === 'option1' && (
          <>
            <div>
              <p>Выберите систему собственности</p>
              <select className={styles.select} name={selected}>
                {dataOwn.map((item) => (
                  <option
                    onClick={() =>
                      setSelectedRadio(item.account_type === 'too' ? 'option1' : 'option3')
                    }
                    key={item.id}
                    value={item.full}>
                    {item.full}
                  </option>
                ))}
              </select>
            </div>
            <SelectAndInput
              setTax={setTax}
              bin={bin}
              setBin={setBin}
              name={name}
              setName={setName}
              datacom={datacom}
              selected={selected}
              handleChange={handleChange}
              nameShort="ЮЛ"
            />
          </>
        )}
        {selectedRadio === 'option2' && (
          <>
            <SelectAndInput
              setTax={setTax}
              bin={bin}
              setBin={setBin}
              name={name}
              setName={setName}
              datacom={datacom}
              selected={selected}
              handleChange={handleChange}
              nameShort="ЮЛ"
            />
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
              <input className={styles.nameShort} placeholder="Фл" readOnly disabled />
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
