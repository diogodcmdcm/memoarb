import { useState } from 'react';
import Select from "react-select";

import en from "../locales/en.json";
import pt from "../locales/pt.json";
import es from "../locales/es.json";

function headerAdmin(selectedMenu) {
 
  
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

  const selectLocale = (option) => {
    setSelectedOption(option);

    if(option.value==="pt"){
      setTranslations(pt);
    } else if (option.value==="es") {
      setTranslations(es);
    } else {
      setTranslations(en);
    }
     
  };

  return (

      <nav className="bg-[#fff9e6]">

        <div class="max-w-screen-xl flex flex-wrap items-end justify-start p-4 pl-12 ">
          {/* Logo */}
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">          
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
                <a href="/homeAdmin/" class={selectedMenu.selectedMenu==="home"?menuSCss:menuNCss} >
                  {translations.home}
                </a>
              </li>             
              <li>
                <a href="/mycollectionsAdmin/" class={selectedMenu.selectedMenu==="mycollectionsadmin"?menuSCss:menuNCss}>
                  {translations.myCollectionsAdmin}
                </a>
              </li>              
            </ul>
          </div>
        </div>
      </nav>       

  );
}

export default headerAdmin;