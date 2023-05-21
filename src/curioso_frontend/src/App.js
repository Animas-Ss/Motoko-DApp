import { useEffect, useState } from 'react';
import './index.css';
/* import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import reactLogo from './assets/react.svg'; */
import { curioso_backend } from "../../declarations/curioso_backend";

import { Navegation } from './components/Navegation';
import FormTask from './components/FormTask';
import ListaAcordion from './components/ListaAcordion';
import Spinner from './components/Spinner';
import Login from './components/Login/Login';


function App() {
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [pending, setPending] = useState([])


  // Get the current counter value
  const fetchCount = async () => {
    try {
      setLoading(true);
      console.log('render');
      const response = await curioso_backend.getAllHomework();
      setTasks(response); // Convert BigInt to number
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the count on page load
  useEffect(() => {
    if (!loading) {
      fetchCount();
      setLoading(false);
    }
  }, [loading]);

  //show elements
  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  const handleShowSearch = () => {
    setShowSearch(!showSearch);
    console.log(showSearch);
  };

  //done delete filtro y saco el id que no va
  const handleDelete = async (id) => {
    const newTasks = tasks.filter((item, i) => {
      if (i != id) {
        return item;
      }
    });
    console.log(newTasks);
    setTasks(newTasks);
    const idDelete = BigInt(id);
    await curioso_backend.deleteHomework(idDelete);
  };

  //buscar tarea pendientes
 const handleSearch = async () => {
    try {
      const res = await curioso_backend.getPendingHomework();
      setPending(res)
      console.log(pending)
    } catch (error) {
      console.log(error);
    }
  }; 

  const handleComplete = async (id) => {
    try {
      setLoading(true)
      console.log(id);
      const idComplete = BigInt(id);
      const respuesta = await curioso_backend.markAsCompleted(idComplete);
      console.log(respuesta)
      fetchCount();
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const handleUpdate = async (id, task) => {
    try {
      setLoading(true)
      const idUp = BigInt(id)
      await curioso_backend.updateHomework(idUp, task);
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  const handleShowHome = (valor) => {
    setShowHome(valor)
  }

  return (
    <div className="">
      <Navegation
        handleShowForm={handleShowForm}
        handleShowSearch={handleShowSearch}
        handleShowHome={handleShowHome}
        handleSearch={handleSearch}
      />
      {showHome ?       <>
      {showForm ? (
        <FormTask
          tasks={tasks}
          setTasks={setTasks}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      ) : (
        <ListaAcordion
          data={tasks}
          setData={setTasks}
          showSearch={showSearch}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
          loading={loading}
          handleUpdate={handleUpdate}
        />
      )}
      </>: <Login pending={pending} handleSearch={handleSearch} tasks={tasks} setPending={setPending}/>}

     
      {/* <ListaTask tasks={tasks}/> */}
    </div>
  );
}

export default App;
