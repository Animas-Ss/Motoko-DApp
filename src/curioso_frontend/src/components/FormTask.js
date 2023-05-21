import React, { useState } from 'react';
import { curioso_backend } from "../../../declarations/curioso_backend";
import formBack from '../../assets/fondo-form.jpg';
import Spinner from './Spinner';


const INITIAL_FORM = {
  title: '',
  description: '',
  dueDate: '',
  completed: false,
};

const FormTask = ({ tasks, setTasks, showForm, setShowForm }) => {
  const [tarea, setTarea] = useState(INITIAL_FORM);
  const [loadingForm, setLoadingForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingForm(true);
      const resTitle = await curioso_backend.searchHomework(tarea.title);
      if (resTitle.length != 0) {
        return alert(
          'Una tarea con ese nombre ya existe , se recomienda editar la existente',
        );
      } else {
        const resDescription = await curioso_backend.searchHomework(tarea.description);
        if (resDescription.length != 0) {
          return alert(
            'Una tarea con esta descripcion ya existe se recomeinda editarla',
          );
        }
        setTasks((prev) => [...prev, tarea]);
        await curioso_backend.addHomework(tarea);
        setTarea(INITIAL_FORM);
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForm(false);
    }
  };

  const handleChange = (
    e
  ) => {
    setTarea((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div
        className={`w-screen h-screen flex justify-center px-2 py-10 xl:items-center`}
      >
        <div className="w-[350px] h-[400px] xl:w-[350px] xl:h-[400px] overflow-hidden relative rounded-xl shadow-2xl">
          <div
            className="w-[350px] h-[400px] xl:w-[350px] xl:h-[400px] absolute flex items-center"
            style={{
              backgroundImage: `url(${formBack})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          ></div>
          <div
            className="w-[350px] h-[400px] xl:w-full xl:h-[420px] border shadow-2xl rounded-xl flex flex-col items-center xl:justify-between p-4 xl:py-5 px-8 bg-transparent"
            style={{ backdropFilter: 'blur(0px)' }}
          >
            {loadingForm ? (
              <Spinner />
            ) : (
              <>
                <h1 className="text-3xl font-bold">Tarea</h1>
                <form
                  action=""
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 xl:gap-2"
                >
                  <div className="">
                    <span>Titulo</span>
                    <input
                      type="text"
                      name="title"
                      value={tarea.title}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                    <i></i>
                  </div>
                  <div className="">
                    <span>Descripcion</span>
                    <textarea
                      name="description"
                      value={tarea.description}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  resize-none"
                    />
                    <i></i>
                  </div>
                  <div className="">
                    <span>Vencimiento</span>
                    <input
                      type="date"
                      name="dueDate"
                      value={tarea.dueDate}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <i></i>
                  </div>
                  <div className="mt-10 mb-10 w-full">
                    <button
                      type="submit"
                      className={`bg-blue-400 border-1 w-full border-black py-2 px-4 shadow-xl  rounded-2xl ${
                        loadingForm ? 'bg-slate-400' : ''
                      }`}
                    >
                      {loadingForm ? 'Loading ..' : 'Guardar'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormTask;
