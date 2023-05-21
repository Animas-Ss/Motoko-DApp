import React, { useEffect, useRef, useState } from 'react';
//import ListaTask from './ListaTask';
/* import { Homework } from '../types/types'; */
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { BiChevronsDown } from 'react-icons/bi';
import { BsCheckAll } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import Spinner from './Spinner';
import FormEdit from './FormEdit';



const ListaAcordion = ({
  data,
  setData,
  showSearch,
  handleDelete,
  handleComplete,
  loading,
  handleUpdate
}) => {
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [editTask, setEditTask] = useState({});

  const contentEl = useRef(null); // no deduci el tipo pero de esta forma funciono revisar

  const select = (i) => {
    if (active === i) return setActive(null);
    setActive(i);
  };

  useEffect(() => {
    contentEl.current;
  }, []);





  const deleteTask = (id) => {
    const newTask = data.filter((item, i) => {
      if (i != id) {
        return item;
      }
    });
    //setSearchTask(newTask);
    handleDelete(id);
  };

  /*  const completeTask = (id: number) => {
    /* const newTask = searchTask.map((item, i) => {
      if(i === id){
        return {...item, completed: true};
      }else{
        return item
      }
    }) */
  /* setSearchTask(newTask); */
  /* handleComplete(id); } */

  const handleEdit = async (task, index) => {
    setShowEdit(true)
    setEditTask({task, index})
  }

  return (
    <article className="flex flex-col items-center justify-center w-full">
      { showEdit && <FormEdit editTask={editTask} setShowEdit={setShowEdit} setEditTask={setEditTask} handleUpdate={handleUpdate} loading={loading}/>}
      <div className="w-[350px] min-h-[400px] mt-20 mb-28 overflow-hidden xl:mt-28 flex flex-col gap-2">

        {data.map((item, index) => {
          return (
            <div className={'flex flex-col items-center'} key={index}>
              <div
                className="text-black flex items-center justify-between cursor-pointer w-full rounded-2xl p-2 relative"
                style={
                  item.completed
                    ? {
                        background:
                          'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(100,100,100,1) 35%, rgba(255,255,255,1) 100%)',
                      }
                    : {
                        background:
                          'linear-gradient(90deg, rgba(105,132,163,1) 0%, rgba(81,60,199,1) 35%, rgba(230,208,210,1) 100%)',
                      }
                }
                onClick={() => select(index)}
              >
                <div className="flex flex-col">
                  <span className="text-white rounded-xl">{item.title}</span>
                  <small className="text-gray-800">
                    {item.dueDate}- vencimiento
                  </small>
                </div>
                {item.completed ? (
                  <GiCheckMark className=" text-green-700 text-5xl absolute -top-4 left-[50%]" />
                ) : (
                  ''
                )}
                <span
                  className={`w-[30px] h-[30px] flex justify-center items-center rounded-full bg-transparent border-[1px] border-gray-500 text-gray-500 transition-all duration-500 ease-in-out ${
                    active === index ? 'rotate-180' : ''
                  }`}
                >
                  <BiChevronsDown />
                </span>
              </div>
              <div
                ref={contentEl}
                className={`overflow-auto w-[340px] rounded-ss-3xl rounded-ee-3xl ring-pink-200 border-white  ${
                  active === index
                    ? 'p-3 mt-2 border-[5px] ring-4'
                    : 'p-0 mt-0 border-0'
                }`}
                style={
                  active === index
                    ? {
                        height: '100%',
                        background:
                          'linear-gradient(90deg, rgba(80,87,96,1) 0%, rgba(207,205,223,1) 35%, rgba(252,252,252,1) 100%)',
                      }
                    : { height: '0px' }
                }
              >
                {loading ? <Spinner/> : <p>{item.description}</p>}
                <div className="flex justify-end gap-2 mt-3 border-gray-400 border-t-2 pt-3">
                  <button onClick={() => handleEdit(item, index)}>
                    <CiEdit />
                  </button>
                  <button onClick={() => deleteTask(index)}>
                    <MdDeleteOutline />
                  </button>
                  <button
                    className={`${item.completed ? ' text-yellow-400' : ''}`}
                    onClick={() => handleComplete(index)}
                  >
                    {<BsCheckAll />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default ListaAcordion;
