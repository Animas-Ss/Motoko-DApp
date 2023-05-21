import { useEffect } from "react";
import './Login.css';
import mokotoLogo from '../../../assets/internet-computer.png'

import { ConnectDialog, ConnectButton } from "@connect2ic/react";
import Search from "../Search";

const Login = ({pending, handleSearch, tasks, setPending, permiso}) => {


  const letras = () => {
    let text = document.querySelector('.text-login p');
    text.innerHTML = text.innerText.split("").map((char, i) => `<b style="transform:rotate(${i * 4}deg">${char}</b>`).join(" ");
    }
    useEffect(() => {
      letras();
    }, []);


  return (
    <div className="flex items-center justify-center absolute gap-10 flex-wrap mt-28 md:mt-0 w-full h-full -z-10 mb-20">
      <div className="flex flex-col gap-[60px] -mt-10 md:mt-14">
      <div className='relative flex items-center justify-center'>
        <div className='text-login absolute w-[360px] h-[360px] rounded-full shadow-home' >
          <p>Desarrollador-W eb-Sebastian-Ricardo-Sosa-Paso a Paso- M otoko BootCamp 2023 - Anim a s</p>
        </div>
        <span className="relative w-[250px] h-[250px] bg-slate-100 border-[6px] border-slate-100 rounded-full overflow-hidden loader-span"><img src={mokotoLogo} className="absolute w-[100px] h-[100px] z-10 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"/><i></i></span>
      <ConnectDialog className="w-[100px] h-[100px] absolute -bottom-10 left-0 animate-bounce border-[6px] border-slate-700 px-4 py-2 bg-slate-400 flex flex-col justify-center items-center rounded-full z-20"/>
      </div>
      <div className="py-2 px-4 flex justify-center text-lg text-purple-700  items-center rounded-3xl border-[6px] border-slate-200 shadow-home hover:bg-slate-200">
      <ConnectButton style={{width: "100%"}}>Conectar</ConnectButton>
      </div>
      </div>
      {permiso ? (<div className="w-[340px] h-[400px] md:ml-16 flex flex-col overflow-y-auto pt-8 items-center justify-center">
      <Search pending={pending} handleSearch={handleSearch} tasks={tasks} setPending={setPending}/>
      </div>) : null}
    </div>
  );
};

export default Login;
