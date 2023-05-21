import React, { useEffect, useState } from 'react'
import { BiRefresh } from "react-icons/bi";

const Search = ({ pending, handleSearch, tasks, setPending }) => {
    const [busqueda, setBusqueda] = useState("")
    const [searchTasks, setSearchTasks] = useState([]);


    const handleSearchList = (e) => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    };

    const actualizar = () => {
        handleSearch()
        setPending(pending)
    }

    const filtrar = (search) => {
        let response = pending.filter((element) => {
            if (
                element.title
                    .toString()
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
            ) {
                return element;
            }
        });
        setPending(response);
    };

    return (
        <div className='w-full h-[400px] mt-24 mb-32'>
            <h2 className='text-gray-500'>Fast Search</h2>
            <small className='text-gray-500'>for more content review task list</small>
            <div className='flex justify-center items-center gap-2'>
                <input
                    type="text"
                    name="busqueda"
                    placeholder="Search task"
                    className={`w-full outline-none p-4 rounded-2xl`}
                    value={busqueda}
                    onChange={handleSearchList}
                />
                <button onClick={actualizar} className='w-[60px] h-[50px] p-1 bg-slate-400 rounded-full flex items-center justify-center text-3xl'><BiRefresh className='rounded-full' /></button>
            </div>
            <div className='flex flex-col gap-2 mt-2'>
            {pending.map((item, index) => {
                return (
                    <div className={'flex flex-col items-center'} key={index}>
                        <div className="text-black flex items-center justify-between cursor-pointer w-full rounded-2xl p-2 relative" style={item.completed ? {background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(100,100,100,1) 35%, rgba(255,255,255,1) 100%)'} : {background: 'linear-gradient(90deg, rgba(105,132,163,1) 0%, rgba(81,60,199,1) 35%, rgba(230,208,210,1) 100%)'} }>
                            <div className="flex flex-col">
                                <span className="text-white rounded-xl">{item.title}</span>
                                <small className="text-gray-800">
                                    {item.dueDate}- vencimiento
                                </small>
                            </div>
                        </div>
                    </div>
                     )
            })
          }
{/*           {searchTasks.map((item, index) => {
                return (
                    <div className={'flex flex-col items-center'} key={index}>
                        <div className="text-black flex items-center justify-between cursor-pointer w-full rounded-2xl p-2 relative" style={item.completed ? {background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(100,100,100,1) 35%, rgba(255,255,255,1) 100%)'} : {background: 'linear-gradient(90deg, rgba(105,132,163,1) 0%, rgba(81,60,199,1) 35%, rgba(230,208,210,1) 100%)'} }>
                            <div className="flex flex-col">
                                <span className="text-white rounded-xl">{item.title}</span>
                                <small className="text-gray-800">
                                    {item.dueDate}- vencimiento
                                </small>
                            </div>
                        </div>
                    </div>
                     )
            })
          } */}
       </div>      
    </div>
 )}
export default Search