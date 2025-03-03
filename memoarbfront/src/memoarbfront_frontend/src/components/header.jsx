import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import en from "../locales/en.json";
import pt from "../locales/pt.json";
import es from "../locales/es.json";

function menu(selectedMenu) { 

  const navigate = useNavigate();

  function linkHome(){
    //navigate("/home/");     
    window.location.href = /home/;
  }   

  const linkAbout = () => {      
    //navigate("/about/",{ replace: true });     
    window.location.href = /about/;
  }   

  function linkMyMemos(){    
    //navigate('/mymemos/');   
    window.location.href = /mymemos/;
  }   

  function linkMycollections(){    
    //navigate("/mycollections/");   
    window.location.href = /mycollections/;
  }

  function linkCreatememo(){    
    //navigate("/creatememo/");   
    window.location.href = /creatememo/;
  }            
  
  const menuNCss = "block py-2 px-3 text-[#353535] text-base font-bold font-['Arial'] uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-gray-800 md:hover:text-blue-700 hover:bg-gray-200 hover:text-gray-800 md:hover:bg-transparent border-gray-700 cursor-pointer";
  const menuSCss = "block py-2 px-3 text-[#544ef3] text-base font-bold font-['Arial'] uppercase rounded md:p-0 md:dark:text-blue-700 dark:text-blue-700 cursor-pointer";
    
  // Formatar dados para React-Select
  const options = [{  value: 'us',
                      label: (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <img src={"https://goodies.icons8.com/web/common/header/flags/us.svg"}
                               style={{ width: "30px", height: "30px" }} />
                            English (US)
                        </div>
                      ),
                    },
                    { value: 'es',
                      label: (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <img src={"https://goodies.icons8.com/web/common/header/flags/es.svg"}
                               style={{ width: "30px", height: "30px" }} />
                            Español
                        </div>
                      ),
                    },
                    { value: 'pt',
                      label: (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <img src={"https://goodies.icons8.com/web/common/header/flags/br.svg"}
                               style={{ width: "30px", height: "30px" }} />
                            Português (BR)
                        </div>
                      ),
                    }]; 

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const [translations,setTranslations] = useState(pt);

  /*
  const selectLocale = (option) => {
    setSelectedOption(option);

    if(option.value==="pt"){
      setTranslations(pt);
    } else if (option.value==="es") {
      setTranslations(es);
    } else {
      setTranslations(en);
    }
     
  };*/


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    
    <nav className="bg-[#fff9e6]">
    
      {/* Botão de Menu (aparece apenas no mobile) */}
      <div className="flex justify-between items-center p-4 md:hidden ">
        <a onClick={linkHome} class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer" >
              <img src="/logo.png" class="h-20" alt="" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap text-white"></span>
        </a>      
        <button
          onClick={toggleMenu}          
          className="text-gray-800 text-2xl focus:outline-none" >
          &#9776; {/* Ícone de hambúrguer */}
        </button>
      </div>

      {/* Menu lateral (aparece apenas se isMenuOpen for true no mobile) */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-3/4 h-full bg-[#da80f2] text-[#fff9e6] font-bold text-base font-['Arial'] uppercase p-6 z-50 text-right">          
          <button
            onClick={toggleMenu}
            className="text-white text-3xl absolute top-4 right-4"
          >
            &times; {/* Ícone de fechar */}
          </button>
          <ul className="space-y-4 mt-10">
            <li>
              <a onClick={ () => { linkHome(); toggleMenu() } } // Fecha o menu ao clicar
                className="block hover:text-gray-300" >
                {translations.home}
              </a>
            </li>
            {/* 
            <li>
              <a onClick={ () => { linkMyMemos(); toggleMenu() } } className="block hover:text-gray-300" >
                My Memos
              </a>
            </li>
            */ } 
            <li>
              <a onClick={ () => { linkMycollections(); toggleMenu() } } className="block hover:text-gray-300" >
                {translations.myCollectionsUser}
              </a>
            </li>
            { /*     
            <li>
              <a onClick={ () => { linkCreatememo(); toggleMenu() } } className="block hover:text-gray-300" >
                Create Memo
              </a>
            </li>
              */ }             
            <li>
              <a onClick={ () => { linkAbout(); toggleMenu() } } className="block hover:text-gray-300" >
                  {translations.about}
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Menu Desktop (sempre visível em telas maiores que "md") */}      
      <div className="hidden md:flex justify-start items-center space-x-8 p-1 ">         
         <div className="max-w-screen-xl flex flex-wrap items-end justify-start p-4 pl-12 ">

          {/* Logo */}
          <a onClick={linkHome} class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer" >
              <img src="/logo.png" class="h-20" alt="" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
          </a>         
          
          {/* Dropdown - Idioma           
          <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse absolute right-7 hidden md:block" style={{ marginRight: '38px' }}>          
            <div style={{ width: "200px" }}>
              <Select options={options} value={selectedOption} onChange={selectLocale} />
            </div>
          </div> */}

          <div class="justify-start hidden w-full md:flex md:w-auto md:order-1 pl-10" id="navbar-user">            
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <li>
                <a onClick={linkHome} class={selectedMenu.selectedMenu==="home"?menuSCss:menuNCss} >
                  {translations.home}
                </a>
              </li>                            
              {/* 
              <li>
                <a onClick={linkMyMemos} class={selectedMenu.selectedMenu==="mymemos"?menuSCss:menuNCss} >
                  {translations.myMemos}
                </a>
              </li>
              */ }
              <li>
                <a onClick={linkMycollections} class={selectedMenu.selectedMenu==="mycollectionsuser"?menuSCss:menuNCss}>
                  {translations.myCollectionsUser}
                </a>
              </li>      
              { /*        
              <li>
                <a onClick={linkCreatememo} class={selectedMenu.selectedMenu==="creatememo"?menuSCss:menuNCss} >
                  {translations.createMemo}
                </a>
              </li>
                */ }
              <li>
                <a onClick={linkAbout} class={selectedMenu.selectedMenu==="about"?menuSCss:menuNCss} >
                  {translations.about}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </nav>

    
      
  );
}

export default menu;