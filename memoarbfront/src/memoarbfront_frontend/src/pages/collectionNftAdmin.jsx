import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { memoarbfront_backend } from 'declarations/memoarbfront_backend';
import QRCode from 'react-qr-code';
import moment from 'moment';

import HeaderAdmin from "../components/headerAdmin";
import Spinner from "../components/spinner";

import { useNavigate } from "react-router-dom";

import { AuthClient } from "@dfinity/auth-client";
import { Actor } from "@dfinity/agent";

import pt from "../locales/pt.json";

function collectionNftAdmin() {

  const navigate = useNavigate();

  const [translations,setTranslations] = useState(pt);

  const { idCollection } = useParams(); //constante utilizada para armazenar o id da coleção ao abrir a página.

  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [totalSupply, setTotalSupply] = useState(0);
  const [dateCreate, setDateCreate] = useState(null);
  const [location, setLocation] = useState("");  
  
  const [listaMints, setListaMints] = useState([]);  

  const [qrCodeValue, setQrCodeValue] = useState("");
  
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect( async () => {    
    await configBackEnd();
    getCollection(idCollection)
    getMints(idCollection);
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

  function addNFT(){
    window.location.href = "/mintNftCollection/"+symbol;
  }

  async function openClaimNft(id_token){        
      setQrCodeValue("https://memoprotocol.xyz/claimnftcollection/"+idCollection+"/"+id_token);
      setIsOpen(true);
  }

  async function getCollection(symbolCollection){    
    setLoading(true);
    await memoarbfront_backend.get_collection_by_symbol(symbolCollection).then((result) => {
      setSymbol(result.symbol);
      setName(result.name);
      setDescription(result.description);
      setLogo(result.image);            
      setTotalSupply(parseInt(result.total_supply));

      setDateCreate(Number(result.dateCreate));      
      setLocation(result.location);      
     

    });
    setLoading(false);
  }
  
  async function getMints(id){        

    setLoading(true);
    await memoarbfront_backend.get_collection_nft_template(id).then((result) => {

      let mints = [];
      for( let i = 0; i < result.length ; i++){                
        mints[i] = {id_token: parseInt(result[i].id), 
                    nome: result[i].name , 
                    descricao: result[i].description, 
                    imagem: result[i].image, 
                    supplyCap: parseInt(result[i].supplyCap),
                    totalSupply: parseInt(result[i].totalSupply) } ;        

      }      

      setListaMints(mints);

    });
    setLoading(false);
  }

  return (

    <body class="bg-[#fff9e6] min-h-screen">  

       <HeaderAdmin selectedMenu={"mycollectionsadmin"} />        
      
      <main class="bg-[#fff9e6]" >

        <div>
          {loading && <Spinner />}
        </div>

        <div
          className="h-[220px] p-5 bg-[#544ef3] rounded-[10px] gap-4 px-5 flex flex-col justify-end items-start overflow-hidden"
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
          
          <div className="w-full text-[#fff9e6] text-2xl font-bold font-['Arial'] line-clamp-1">
              {name} - {symbol} 
          </div>          
          <div className="w-full md:w-[500px] text-[#fff9e6] text-xs font-normal font-['Arial'] line-clamp-4 md:line-clamp-none">
              {String(description).trim().length > 342 ? String(description).trim().substring(0, 342) + " ..." : String(description).trim()}
          </div>
          <div className="justify-start items-start gap-6 inline-flex">
            <div className="justify-start items-start gap-1 flex">
              <div className="w-[11px] h-[11px] px-[1.38px] py-[0.92px] origin-top-left rotate-180 justify-center items-center flex">
                <div className="w-[8.25px] h-[9.17px] relative"></div>
              </div>
              <div className="flex items-center gap-1 text-[#fff9e6] text-[14px] font-bold font-['Arial'] uppercase">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Group">
                    <path id="Vector" d="M7.3335 0.916656V2.74999M3.66683 0.916656V2.74999" stroke="#DA80F2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path id="Vector_2" d="M2.29167 1.83331H8.70833C9.21459 1.83331 9.625 2.24372 9.625 2.74998V9.16665C9.625 9.67291 9.21459 10.0833 8.70833 10.0833H2.29167C1.78541 10.0833 1.375 9.67291 1.375 9.16665V2.74998C1.375 2.24372 1.78541 1.83331 2.29167 1.83331Z" stroke="#DA80F2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path id="Vector_3" d="M9.625 4.58331H1.375" stroke="#DA80F2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
                {dateCreate ? moment(dateCreate).format('DD/MM/YYYY') : '' }                
              </div>
            </div>
            <div className="justify-start items-start gap-1 flex">              
              <div className="flex items-center gap-1 text-[#fff9e6] text-[14px] font-bold font-['Arial'] uppercase">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="bx:map">
                    <path id="Vector" d="M5.49984 6.41667C6.51092 6.41667 7.33317 5.59442 7.33317 4.58333C7.33317 3.57225 6.51092 2.75 5.49984 2.75C4.48875 2.75 3.6665 3.57225 3.6665 4.58333C3.6665 5.59442 4.48875 6.41667 5.49984 6.41667ZM5.49984 3.66667C6.00538 3.66667 6.4165 4.07779 6.4165 4.58333C6.4165 5.08887 6.00538 5.5 5.49984 5.5C4.9943 5.5 4.58317 5.08887 4.58317 4.58333C4.58317 4.07779 4.9943 3.66667 5.49984 3.66667Z" fill="#DA80F2"/>
                    <path id="Vector_2" d="M5.23437 9.99807C5.31199 10.0533 5.40491 10.083 5.5002 10.083C5.59549 10.083 5.68841 10.0533 5.76604 9.99807C5.90537 9.89953 9.18016 7.53499 9.16687 4.58332C9.16687 2.56161 7.52191 0.916656 5.5002 0.916656C3.47849 0.916656 1.83354 2.56161 1.83354 4.58103C1.82024 7.53499 5.09504 9.89953 5.23437 9.99807ZM5.5002 1.83332C7.01683 1.83332 8.2502 3.0667 8.2502 4.58561C8.25983 6.6197 6.23904 8.44616 5.5002 9.0452C4.76183 8.4457 2.74058 6.61878 2.7502 4.58332C2.7502 3.0667 3.98358 1.83332 5.5002 1.83332Z" fill="#DA80F2"/>
                  </g>
                </svg>
                {location}
              </div>
            </div>
            <div className="justify-start items-start gap-1 flex">
              <div className="w-[11px] h-[11px] relative"></div>
              <div className="text-[#fff9e6] text-[14px] font-bold font-['Arial']">
                MINTS:  {totalSupply}
              </div>
            </div>            
          </div>
        </div>
        
        <br/>

        <a onClick={() => addNFT()} className="ml-[55px]">
          <div className="h-[37px] px-4 py-2.5 bg-[#da80f2] rounded-lg justify-center items-center gap-4 inline-flex overflow-hidden cursor-pointer">
            <div className="text-[#fff9e6] text-xs font-black font-['Arial'] whitespace-nowrap uppercase">{translations.createNFT}</div>  
          </div>
        </a>                           

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
                    Fechar
                  </button>
                </div>
              </div>
            </div>          
          )}    
        </div>      
          
        <br/>

          <div className="flex flex-wrap gap-4 px-10 ml-[14px] p-2 w-full">        
            {listaMints.map((m) => (
              <div
                key={m.id_token}                
                className="min-w-[265px] h-[265px] md:w-[255px] md:h-[255px] p-5 bg-[#544ef3] rounded-[10px] flex flex-col justify-end items-start gap-2 overflow-hidden bg-cover bg-center "
                style={{
                  backgroundImage: `url(${"https://tyk3i-wiaaa-aaaam-aec5q-cai.icp0.io"+m.imagem})`,
                }} >
                  <div className="flex flex-row gap-2 justify-center w-full">
                      <a href={`/memoadmin/${symbol}/${m.id_token}`}
                        className="h-[37px] w-[120px] px-4 py-2.5 bg-[#da80f2] rounded-lg justify-center items-center gap-4 inline-flex overflow-hidden cursor-pointer"                        
                      >
                        <div className="text-[#fff9e6] text-[10px] font-black font-['Arial']">
                            {translations.MEMO}
                        </div>                  
                      </a>                                      
                      <div className="text-[#fff9e6] text-[10px] font-black font-['Arial'] h-[37px] w-[120px] px-4 py-2.5 bg-[#da80f2] rounded-lg flex justify-center items-center">
                          {m.totalSupply} / {m.supplyCap}  
                      </div>
                  </div>
              </div>
            ))}  
                    
          </div>
          <br/>
     </main>
  </body>
  );
}

export default collectionNftAdmin;
