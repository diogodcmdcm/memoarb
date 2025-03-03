import { useState, useEffect } from 'react';
import { memoarbfront_backend } from 'declarations/memoarbfront_backend';
import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

import Header from "../components/header";
import Spinner from "../components/spinner";

import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

import pt from "../locales/pt.json";

//"Content-Security-Policy": "default-src 'self' ; script-src 'self' 'unsafe-eval' 'unsafe-inline'; worker-src 'self' blob: ; connect-src 'self' http://localhost:* https://icp0.io https://*.icp0.io https://icp-api.io;img-src 'self' data: blob: * ;style-src * 'unsafe-inline';style-src-elem * 'unsafe-inline';font-src *;object-src 'none';base-uri 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;",

/*

IMPORTANTE

FALTA VERIFICAR SE É IMAGEM JPGE PNG, HEIC OU SVG


*/
function myCollections() {

  const { identity } = useAuth();
  const navigate = useNavigate();

  const [translations,setTranslations] = useState(pt);

  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");

  const [listCollections, setListCollections] = useState([]); 
  
  const [loading, setLoading] = useState(false);
  
  useEffect( async () => {
    //await checkLoginStatus();
    await configBackEnd();    
    consultarTotalPaginaColecoes();
    consultarColecoes();            
  }, []);
  
  async function configBackEnd(){

    /* este codigo é provisorio devido problemas no AuthProvider */
    let authC = await AuthClient.create();    
    const authenticated = await authC.isAuthenticated();
    
    if (authenticated) {
      //console.log("Usuário está logado");        
      const principal = authC.getIdentity().getPrincipal().toString();
      //console.log("Principal do usuário:", principal);

      Actor.agentOf(memoarbfront_backend).replaceIdentity(
        authC.getIdentity()
      );      

    }
    
  }

  function collectionNft(s){
      window.location.href = "/collectionNft/"+s;
  }

  async function consultarColecoes(){    

    setLoading(true);
    await memoarbfront_backend.getAllCollectionsPageUser(parseInt(pagAtual), parseInt(regPag)).then((result) => {
      setListCollections(result);      

    });

    setLoading(false);  

  }
  
  const renderImageFromUint8Array = (base64String) => {

    // Converte a string base64 para um Uint8Array

    // Este bloco de comandos estava sendo usado quando a imagem era convertida em texto antes de enviar para o servidor
    const binaryString = atob(base64String);
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    } 

    // Converte o Uint8Array para um Blob
    const blob = new Blob([uint8Array], { type: 'image/jpeg' }); 

    // Gera uma URL a partir do Blob e atribui ao src da imagem
    const imageUrl = URL.createObjectURL(blob);

    return <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={"https://tyk3i-wiaaa-aaaam-aec5q-cai.icp0.io"+imageUrl} alt="" />;

  };

  async function consultarTotalPaginaColecoes(){   
    
    setLoading(true);

    await memoarbfront_backend.getTotalRegCollectionsUser().then((result) => {            
      
      if(result!=null){
        let p = parseInt(result) / parseInt(regPag);
       
        p = Math.ceil(p);
        setTotalPag(parseInt(p));
      }
      
    });   

    setLoading(false);

  }

  const [pagAtual, setPagAtual] = useState(1);
  const [regPag, setRegPag] = useState(4);
  const [totalPag, setTotalPag] = useState(0);

  async function previousPage(){
    setLoading(true);
    if(pagAtual != 1){
      let p = pagAtual - 1;    
      setPagAtual(p);
      await memoarbfront_backend.getAllCollectionsPageUser(parseInt(p), parseInt(regPag)).then((result) => {
              
        setListCollections(result);      
  
      });     
    }
    setLoading(false);
  } 
  
  async function nextPage(){    
    if(pagAtual!=totalPag){
        setLoading(true);
        let p = pagAtual + 1;
        setPagAtual(p);
        await memoarbfront_backend.getAllCollectionsPageUser(parseInt(p), parseInt(regPag)).then((result) => {            
          setListCollections(result);      
        });   
        setLoading(false);
    }
  }     

  return (
     

    <body class="bg-[#fff9e6] min-h-screen">  

      <Header selectedMenu={"mycollectionsuser"} />
      
      <main class="bg-[#fff9e6]" >

      <div>
        {loading && <Spinner />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 md:px-20 p-3">
        {listCollections.map((linha) => (          
            <div
            key={linha.symbol}
            className="h-[50vh] p-5 bg-cover bg-center rounded-[10px] flex flex-col justify-end items-start gap-3 overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(${"https://tyk3i-wiaaa-aaaam-aec5q-cai.icp0.io"+linha.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="w-full text-[#fff9e6] text-2xl font-bold font-['Arial'] truncate">
                {linha.name} - {linha.symbol}  
            </div>
            <div className="w-full text-[#fff9e6] text-xs font-normal font-['Arial'] line-clamp-6">
              {linha.description}
            </div>
            <a
              onClick={() => collectionNft(linha.symbol)}
              className="w-[225px] px-4 py-2.5 bg-[#da80f2] rounded-lg flex justify-start gap-4 overflow-hidden cursor-pointer"
            >
              <div className="w-[200px] px-4 py-2.5 bg-[#da80f2] rounded-lg flex justify-center items-center gap-4 overflow-hidden">
                <div className="text-[#fff9e6] text-xs font-black font-['Arial'] uppercase">
                    {translations.viewCollection}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      <br/>
      <div className="flex flex-col items-center">
        <nav aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px text-base h-10">
            <li>
              <a onClick={previousPage} class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ">{translations.previous}</a>
            </li>
            <li>
              <a class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">{pagAtual}</a>  
            </li>            
            <li>
              <a onClick={nextPage} class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ">{translations.next}</a>
            </li>
          </ul>
        </nav>
        <div>
          {translations.page} {pagAtual} {translations.of} {totalPag}
        </div>
     </div>     
     <br/>

     </main>
  </body>
  );
}

export default myCollections;
