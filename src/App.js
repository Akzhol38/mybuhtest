import React from 'react';
import Organizations from './components/Organizations';
import styles from './app.module.scss';
import Modal from './components/Modal';
import CloseModal from './components/CloseModal/CloseModal';
import axios from 'axios';

function App() {
  const [companies, setCompanies] = React.useState([]);
  const [dataOwn, setDataOwn] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get('https://63e8be524f3c6aa6e7c235db.mockapi.io/companies');
      setCompanies(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://63e8bf17b120461c6be50a7e.mockapi.io/ownership`);
      setDataOwn(response.data);
    };
    fetchData();
  }, []);

  const [deletedId, setDeletedId] = React.useState('');
  const [selectedId, setSelectedId] = React.useState(null);
  const [formId, setFormId] = React.useState(null);

  const [selectedCompany, setSelectedCompany] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

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

    setOpen(true);
  };

  const handleFormId = (formId) => {
    setFormId(formId);
  };

  return (
    <div className="app">
      <div className={styles.title}>Мои организации</div>
      <div className={styles.components}>
        {isLoading ? (
          <h1>Загрузка Организация...</h1>
        ) : (
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
              dataOwn={dataOwn}
            />
          ))
        )}
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
            dataOwn={dataOwn}
          />
        )}
      </div>
      {openModal && <CloseModal setOpenModal={setOpenModal} handleConfirm={handleConfirm} />}
    </div>
  );
}

export default App;
