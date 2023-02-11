import React from 'react';
import Organizations from './components/Organizations';
import styles from './app.module.scss';
import data from './data/companies.json';
import Modal from './components/Modal';
import CloseModal from './components/CloseModal/CloseModal';

function App() {
  const [companies, setCompanies] = React.useState(data);

  const [deletedId, setDeletedId] = React.useState('');
  const [selectedId, setSelectedId] = React.useState(null);
  const [formId, setFormId] = React.useState(null);

  const [selectedCompany, setSelectedCompany] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const [accountType, setAccountType] = React.useState('');

  const handleAccountType = (type) => {
    setAccountType(type);
  };

  const handleDelete = (id) => {
    setDeletedId(id);
    setOpenModal(true);
    console.log(id);
  };

  const handleConfirm = () => {
    setCompanies((prevState) => {
      const newArray = [...prevState];
      return newArray.filter((company) => company.company_id !== deletedId);
    });
    setOpenModal(false);
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setSelectedCompany(companies.find((company) => company.company_id === id));
    setAccountType(companies.find((company) => company.company_id === id).account_type);
    setOpen(true);
  };

  const handleFormId = (formId) => {
    setFormId(formId);
  };

  return (
    <div className="app">
      <div className={styles.title}>Мои организации</div>
      <div className={styles.components}>
        {companies &&
          companies.map((company) => (
            <Organizations
              key={company.company_id}
              name={company.company_name}
              tin={company.company_tin}
              image={company.logo}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleFormId={handleFormId}
              id={company.company_id}
              setOpen={setOpen}
              formId={company.form_id}
            />
          ))}
        {open && (
          <Modal
            open={open}
            setOpen={setOpen}
            setCompanies={setCompanies}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            formId={formId}
          />
        )}
      </div>
      {openModal && <CloseModal setOpenModal={setOpenModal} handleConfirm={handleConfirm} />}
    </div>
  );
}

export default App;
