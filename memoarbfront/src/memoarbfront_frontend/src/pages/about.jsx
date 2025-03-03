import { useState } from 'react';
import { memoarbfront_backend } from 'declarations/memoarbfront_backend';
import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import Header from "../components/header";

import { useNavigate } from "react-router-dom";

import pt from "../locales/pt.json";

function about() {
 
  const navigate = useNavigate();
  const [translations,setTranslations] = useState(pt);
      
  return (
        
    <>
      <body class="bg-[#fff9e6] min-h-screen">  
        <Header selectedMenu={"about"} />

        <main>

          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-20">
            
            <div class="h-auto flex flex-col justify-center items-center w-full mt-[15px] mb-[60px] px-4">
            <div class="w-full max-w-[800px] text-center text-[#564df7] text-4xl font-bold font-['Arial']">
              O que é o Memo Protocol?
            </div>
            <div class="w-full max-w-[676px] text-center text-[#353535] text-lg font-normal font-['Arial'] leading-[21px] mt-4">
              O <span class="text-[#564df7] font-bold">Memo Protocol</span> é um protocolo de NFTs construído na <span class="font-bold">Internet Computer Protocol (ICP)</span> para registrar e celebrar sua participação em eventos – <span class="font-bold">seja online ou presencialmente.</span> Com o Memo, você transforma cada momento importante em um registro digital único.<br/><br/>
              Seja em um <span class="text-[#564df7]">Spaces no X (Twitter)</span>, uma <span class="text-[#564df7]">AMA com sua comunidade</span>, um <span class="text-[#564df7]">Hackathon intenso</span> ou um <span class="text-[#564df7]">Bootcamp imersivo</span>, o Memo permite que você <span class="font-bold">comprove sua presença e colecione memórias digitais de cada experiência.</span>
            </div>          
        </div>
            
          </div>

        </main>       
      </body>
    </>          
  );
}

export default about;