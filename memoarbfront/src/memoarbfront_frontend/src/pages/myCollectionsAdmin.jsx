import { useState, useEffect } from 'react';
import { memoarbfront_backend } from 'declarations/memoarbfront_backend';
import QRCode from 'react-qr-code';

import HeaderAdmin from "../components/headerAdmin";
import { useNavigate } from "react-router-dom";

import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

import Spinner from "../components/spinner";

import pt from "../locales/pt.json";

function myCollections() {

  const navigate = useNavigate();

  const [translations,setTranslations] = useState(pt);

  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");

  const [listCollections, setListCollections] = useState([]);  

  const [qrCodeValue, setQrCodeValue] = useState("");
  
  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  
  useEffect( async () => {
    await configBackEnd();
    consultarColecoes();
 
    consultarTotalPaginaColecoes();
  }, []);

  async function configBackEnd(){
  
    /* este codigo é provisorio devido problemas no AuthProvider */
    let authC = await AuthClient.create();    
    const authenticated = await authC.isAuthenticated();
    
    if (authenticated) {
           
      const principal = authC.getIdentity().getPrincipal().toString();
    

      Actor.agentOf(memoarbfront_backend).replaceIdentity(
        authC.getIdentity()
      );      

    }    
    
  }

  function collectionNft(s){
   
    window.location.href = "/collectionNftAdmin/"+s;
    
  }

  function createNFTCollection(){
   
    window.location.href = "/createNFTCollectionAdmin/";
  }

  async function consultarColecoes(){   
    
    setLoading(true);

    await memoarbfront_backend.getAllCollectionsPage(parseInt(pagAtual), parseInt(regPag)).then((result) => {            
      setListCollections(result);      
    });   

    setLoading(false);

  }

  async function consultarTotalPaginaColecoes(){   
    
    setLoading(true);

    await memoarbfront_backend.getTotalRegCollections().then((result) => {            
      
      if(result!=null){
        let p = parseInt(result) / parseInt(regPag);
        p = Math.ceil(p);
        setTotalPag(parseInt(p));
      }
      
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

      /*
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(base64String);*/

    // Converte o Uint8Array para um Blob
    const blob = new Blob([uint8Array], { type: 'image/jpeg' }); 

    // Gera uma URL a partir do Blob e atribui ao src da imagem
    const imageUrl = URL.createObjectURL(blob);

    console.log("imageUrl: " + imageUrl);
    return <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={"https://tyk3i-wiaaa-aaaam-aec5q-cai.icp0.io"+imageUrl} alt="" />;

  };

  const [pagAtual, setPagAtual] = useState(1);
  const [regPag, setRegPag] = useState(4);
  const [totalPag, setTotalPag] = useState(0);

  async function previousPage(){
    setLoading(true);
    if(pagAtual != 1){
      let p = pagAtual - 1;    
      setPagAtual(p);
      await memoarbfront_backend.getAllCollectionsPage(parseInt(p), parseInt(regPag)).then((result) => {
              
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
        await memoarbfront_backend.getAllCollectionsPage(parseInt(p), parseInt(regPag)).then((result) => {            
          setListCollections(result);      
        });   
        setLoading(false);
    }
  }     


  return (
     
    <body class="bg-[#fff9e6] min-h-screen">  

       <HeaderAdmin selectedMenu={"mycollectionsadmin"} />

      <main class="bg-[#fff9e6]" >

        <div>
          {loading && <Spinner />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 md:px-11">       
            <a onClick={() => createNFTCollection() } class="w-[225px] px-4 py-2.5 left-[40px] top-[620px] bg-[#da80f2] rounded-lg justify-start gap-4 inline-flex overflow-hidden cursor-pointer">
                <div class="w-[200px] px-4 py-2.5 bg-[#da80f2] rounded-lg justify-center items-center gap-4 inline-flex overflow-hidden">
                      <div class="text-[#fff9e6] text-xs font-black font-['Arial'] uppercase"> {translations.CREATECOLLECTION} </div> 
                </div>
            </a>
        </div>

        <br/>      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 md:px-11">
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

        <div class="max-w-full flex items-center justify-center">          

          {isOpen && (
          
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                {/* Cabeçalho do modal */}
                <div className="flex justify-between items-center border-b pb-4">
                  <h2 className="text-lg font-semibold">QR Code</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✖
                  </button>
                </div>

                {/* Corpo do modal */}
                <div className="my-6 flex justify-center">
                    <QRCode value={qrCodeValue} />
                </div>

                {/* Rodapé do modal */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {translations.close}
                  </button>
                </div>
              </div>
            </div>          
          )}    
        </div>                

     </main>

     <br/>   

     <div className="flex flex-col items-center">
        <nav aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px text-base h-10">
            <li>
              <a onClick={previousPage} class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{translations.previous}</a>
            </li>
            <li>
              <a class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{pagAtual}</a>  
            </li>            
            <li>
              <a onClick={nextPage} class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{translations.next}</a>
            </li>
          </ul>
        </nav>
        <div>
            {translations.page} {pagAtual} {translations.of} {totalPag}
        </div>
     </div>     
      <br/>
  </body>
  );
}

export default myCollections;
