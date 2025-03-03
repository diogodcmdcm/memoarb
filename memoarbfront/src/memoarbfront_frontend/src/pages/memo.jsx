import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { memoarbfront_backend } from 'declarations/memoarbfront_backend';
import moment from 'moment';

import Header from "../components/header";
import Spinner from "../components/spinner";

import { useNavigate } from "react-router-dom";

import { AuthClient } from "@dfinity/auth-client";
import { Actor } from "@dfinity/agent";

import pt from "../locales/pt.json";

//"Content-Security-Policy": "default-src 'self' ; script-src 'self' 'unsafe-eval' 'unsafe-inline'; worker-src 'self' blob: ; connect-src 'self' http://localhost:* https://icp0.io https://*.icp0.io https://icp-api.io;img-src 'self' data: blob: * ;style-src * 'unsafe-inline';style-src-elem * 'unsafe-inline';font-src *;object-src 'none';base-uri 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;",

function memo() {

  const navigate = useNavigate();
  const [translations,setTranslations] = useState(pt);

  const { symbolCollection, idnft } = useParams(); //constante utilizada para armazenar o id da coleção ao abrir a página.

  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [location, setLocation] = useState("");  

  //const [icrc7_total_supplyy, setIcrc7_total_supplyy] = useState(0);
  //const [listaMints, setListaMints] = useState([]);  
  
  const [imagem, setImagem] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataMint, setDataMint] = useState(null);
  
  
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showModalMsgSucess, setShowModalMsgSucess] = useState(false);
  
  useEffect( async () => {    
    await configBackEnd();
    getCollection(symbolCollection);    
    getNft(symbolCollection, idnft);
  }, []);

  function hideModalMsgSucess(){             
    setShowModalMsgSucess(false);    
}  

  async function configBackEnd(){
  
    /* este codigo é provisorio devido problemas no AuthProvider */
    let authC = await AuthClient.create();    
    const authenticated = await authC.isAuthenticated();
    
    if (authenticated) {
     // console.log("Usuário está logado");        
      const principal = authC.getIdentity().getPrincipal().toString();
    //  console.log("Principal do usuário:", principal);

      Actor.agentOf(memoarbfront_backend).replaceIdentity(
        authC.getIdentity()
      );      

    }
 }

  async function getCollection(symbolCollection){    
    setLoading(true);
    await memoarbfront_backend.get_collection_by_symbol_user(symbolCollection).then((result) => {
      setSymbol(result.symbol);
      setName(result.name);
      setDescription(result.description);
      setLogo(result.image);      
      setLocation(result.location);      
    });
    setLoading(false);
  }
  
  async function getNft(sym, idT){        

    setLoading(true);      
    
    await memoarbfront_backend.getNft(sym, parseInt(idT)).then((result) => {
      
           setNome(result[0][0][0][1].Text);
      setDescricao(result[0][0][1][1].Text);
         setImagem(result[0][0][2][1].Text);

         let ts = Number(result[0][0][3][1].Text);          
          setDataMint(ts);
      
    });

    setLoading(false);
  }
    

  return (
     
    <body class="bg-[#fff9e6] min-h-screen">  

       <Header selectedMenu={"mycollections"} />        
             
      <main class="bg-[#fff9e6]" >

        <div>
          {loading && <Spinner />}
        </div>

        <div
          className="h-[220px] p-10 bg-[#544ef3] rounded-[10px] gap-4 px-5 flex flex-col justify-end items-start overflow-hidden"
          style={{
            marginLeft: "55px",
            marginRight: "55px",
            width: `calc(100% - 110px)`,            
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0.5, 1) 15%, rgba(0, 0, 0, 0) 60%), url(${"https://tyk3i-wiaaa-aaaam-aec5q-cai.icp0.io" + logo})`,
            backgroundSize: "cover", // Redimensiona a imagem para caber dentro do contêiner
            backgroundPosition: "right center", // Alinha a imagem à direita e centraliza verticalmente
            backgroundRepeat: "no-repeat", // Evita que a imagem se repita
          }}
        >
  
          <div className="w-full text-[#fff9e6] text-2xl font-bold font-['Arial'] whitespace-normal md:whitespace-nowrap line-clamp-1">
            {name} - {symbol}
          </div>

          <div className="hidden md:block w-full md:w-[500px] text-[#fff9e6] text-xs font-normal font-['Arial'] line-clamp-4 md:line-clamp-none">
            {String(description).trim().length > 342 ? String(description).trim().substring(0, 342) + " ..." : String(description).trim()}
          </div>

          <div className="justify-start items-start gap-6 inline-flex">            
            <div className="justify-start items-start gap-1 flex">              
              <div className="flex items-center gap-1 text-[#fff9e6] text-[10px] font-bold font-['Arial'] uppercase">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="bx:map">
                    <path id="Vector" d="M5.49984 6.41667C6.51092 6.41667 7.33317 5.59442 7.33317 4.58333C7.33317 3.57225 6.51092 2.75 5.49984 2.75C4.48875 2.75 3.6665 3.57225 3.6665 4.58333C3.6665 5.59442 4.48875 6.41667 5.49984 6.41667ZM5.49984 3.66667C6.00538 3.66667 6.4165 4.07779 6.4165 4.58333C6.4165 5.08887 6.00538 5.5 5.49984 5.5C4.9943 5.5 4.58317 5.08887 4.58317 4.58333C4.58317 4.07779 4.9943 3.66667 5.49984 3.66667Z" fill="#DA80F2"/>
                    <path id="Vector_2" d="M5.23437 9.99807C5.31199 10.0533 5.40491 10.083 5.5002 10.083C5.59549 10.083 5.68841 10.0533 5.76604 9.99807C5.90537 9.89953 9.18016 7.53499 9.16687 4.58332C9.16687 2.56161 7.52191 0.916656 5.5002 0.916656C3.47849 0.916656 1.83354 2.56161 1.83354 4.58103C1.82024 7.53499 5.09504 9.89953 5.23437 9.99807ZM5.5002 1.83332C7.01683 1.83332 8.2502 3.0667 8.2502 4.58561C8.25983 6.6197 6.23904 8.44616 5.5002 9.0452C4.76183 8.4457 2.74058 6.61878 2.7502 4.58332C2.7502 3.0667 3.98358 1.83332 5.5002 1.83332Z" fill="#DA80F2"/>
                  </g>
                </svg>
                {location}
              </div>
            </div>
          </div>
        </div>
                  
        <a onClick={()=> { setShowModalMsgSucess(true) }} class="ml-[60px] font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Saiba Mais</a>
        <br/>
        <br/>

        <div
            className="flex flex-col md:flex-row justify-between items-start gap-4 "
            style={{
              marginLeft: "55px", // Distância da borda esquerda
              marginRight: "55px", // Distância da borda direita
            }}
          >
            {/* Div da Imagem */}
            <div className="flex-1 h-auto md:h-[470px] rounded-[10px] overflow-hidden">
              <img
                src={"https://tyk3i-wiaaa-aaaam-aec5q-cai.icp0.io" + imagem}
                alt="Imagem"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>

            <div className="flex-1 w-full h-auto min-h-[470px] p-4 md:p-10 rounded-[10px] border border-[#353535] flex flex-col justify-start items-start gap-3.5 overflow-hidden">
              <div className="h-5 flex justify-start items-start gap-6">
                <div className="text-[#353535] text-[10px] font-bold font-['Arial'] uppercase">
                  ID TOKEN {idnft}
                </div>
                <div className="flex justify-start items-start gap-1">
                  <div className="w-[11px] h-[11px] px-[1.38px] py-[0.92px] origin-top-left rotate-180 flex justify-center items-center">
                    <div className="w-[8.25px] h-[9.17px] relative"></div>
                  </div>
                  <div className="text-[#353535] text-[10px] font-bold font-['Arial'] uppercase">
                    {dataMint ? moment(dataMint).format('DD/MM/YYYY HH:mm') : ''}
                  </div>
                </div>
              </div>
              <div className="min-w-[272px] text-[#353535] text-[28px] font-bold font-['Arial']">
                {nome}
              </div>                            
              
              <div className="w-full max-w-[599px] text-[#353535] text-base font-normal font-['Arial'] whitespace-pre-wrap">
                {descricao}
              </div>
            </div>
            
          </div>
          <br/>

          {showModalMsgSucess && (    
            <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div class="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 class="text-xl font-bold mb-4">Info Coleção</h2>
                <p class="mb-4">{description}</p>
                <button  onClick={() => hideModalMsgSucess() } class="px-4 py-2 bg-[#666666] text-white rounded  hover:bg-[#555555]" >
                  Ok
                </button>
              </div>
            </div>
            )}

     </main>
  </body>
  );
}

export default memo;
