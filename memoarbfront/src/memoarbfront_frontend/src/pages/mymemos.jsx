import { useState } from 'react';
import { memoarbfront_backend } from 'declarations/memoarbfront_backend';
import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";

import pt from "../locales/pt.json";

function mymemos() {
 
  const navigate = useNavigate();
  const [translations,setTranslations] = useState(pt);
    
  return (
        
    <>

      <body class="bg-[#fff9e6] min-h-screen">  
        <Header selectedMenu={"mymemos"} />

        <main>

          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-20">
            
            <div class="max-w-screen-xl text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 flex-wrap items-center justify-between mx-auto p-20" role="alert">
              <span class="font-medium">{translations.underConstruction}</span>
            </div>
            
          </div>

        </main>       
      </body>
    </>          
  );
}

export default mymemos;