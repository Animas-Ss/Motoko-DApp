import { useState } from 'react'
import formBack from '../../assets/fondo-form.jpg';
import Spinner from './Spinner';

import {AiOutlineCheck, AiOutlineClose} from 'react-icons/ai';


const FormEdit = ({ editTask, setShowEdit, loading, handleUpdate }) => {
  const { task, index } = editTask;
  const [update, setUpdate] = useState(task);

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await handleUpdate(index, update)
    setShowEdit(false)
  };

  const handleChangeEdit = (e) => {
    setUpdate((old) => ({ ...old, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  };

  return (
    <>
      <div className="w-[350px] h-[400px] xl:w-[350px] xl:h-[400px] overflow-hidden absolute rounded-xl shadow-2xl z-10">
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
          <>
            <h1 className="text-3xl font-bold">Tarea</h1>
            {
              loading ? <Spinner /> : <>
                <form
                  action=""
                  onSubmit={handleSubmitEdit}
                  className="flex flex-col gap-3 xl:gap-2"
                >
                  <div className="">
                    <span>Titulo</span>
                    <input
                      type="text"
                      name="title"
                      value={update.title}
                      onChange={handleChangeEdit}
                      className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                    <i></i>
                  </div>
                  <div className="">
                    <span>Descripcion</span>
                    <textarea
                      name="description"
                      value={update.description}
                      onChange={handleChangeEdit}
                      className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  resize-none"
                    />
                    <i></i>
                  </div>
                  <div className="">
                    <span>Vencimiento</span>
                    <input
                      type="date"
                      name="dueDate"
                      value={update.dueDate}
                      onChange={handleChangeEdit}
                      className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className='absolute right-4 top-2'>
                    <input type='checkbox' name='completed' checked={update.completed} onChange={handleChangeEdit}/>
                    <small></small>
                  </div>
                  <div className="mt-2 mb-10 w-full flex justify-end gap-4">
                    <button
                      type="submit"
                      className={`bg-blue-600 border-1 w-[40px] h-[40px] flex items-center justify-center ring-4 ring-white border-black shadow-xl  rounded-full`}
                    >
                     <AiOutlineCheck/>
                    </button>
                    <button
                      type="submit"
                      className={`bg-red-600 border-1 w-[40px] h-[40px] flex items-center justify-center ring-4 ring-white border-black shadow-xl  rounded-full`}
                      onClick={() => setShowEdit(false)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                </form>
              </>
            }

          </>
        </div>
      </div>
    </>
  )
}

export default FormEdit