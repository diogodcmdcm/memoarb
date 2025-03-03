import { useState, useEffect } from 'react';
import { memoarbfront_backend } from 'declarations/memoarbfront_backend';
import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { useAuth } from "../components/AuthProvider";

import Menu from "../components/header";
import Spinner from "../components/spinner";

import pt from "../locales/pt.json";

function collectionNft() {

  const { identity } = useAuth();
  const navigate = useNavigate();
  const [translations,setTranslations] = useState(pt);

  const { idCollection } = useParams(); //constante utilizada para armazenar o id da coleção ao abrir a página.

  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");  
  const [totalSupply, setTotalSupply] = useState(0);
  const [location, setLocation] = useState("");  
  const [listClaims, setListClaims] = useState([]);  
  
  const [loading, setLoading] = useState(false);

  useEffect( async () => {
    await configBackEnd();    
    getCollection(idCollection);    
    getClaims(idCollection);
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

  async function getCollection(symbolCollection){    

    setLoading(true);
    await memoarbfront_backend.get_collection_by_symbol_user(symbolCollection).then((result) => {
      setSymbol(result.symbol);
      setName(result.name);
      setDescription(result.description);
      setLogo(result.image);      
      setLocation(result.location);      
      setTotalSupply(parseInt(result.total_supply));
      
      if(result.total_supply!=null){
        let p = parseInt(result.total_supply) / parseInt(regPag);
        p = Math.ceil(p);
        setTotalPag(parseInt(p));
      } else {
        setTotalPag(parseInt(0));
      }      

    });
    setLoading(false);

  }
  
  const [pagAtual, setPagAtual] = useState(1);
  const [regPag, setRegPag] = useState(5);
  const [totalPag, setTotalPag] = useState(0);

  async function getClaims(id){        

    setLoading(true);
    
    // antes de gerar colecoes dinamicamente -- await memoarbfront_backend.get_claims().then((result) => {
    await memoarbfront_backend.get_collection_claims_user(id, 
                                                     parseInt(pagAtual),
                                                     parseInt(regPag) 
                                                     ).then((result) => {                                                      
  

      let claims = [];
      for( let i = 0; i < result.length ; i++){                
        claims[i] = {id_token: parseInt(result[i].id_nft), nome: result[i].name , descricao: result[i].description, imagem: result[i].image } ;
      }      

      setListClaims(claims);

    });

    setLoading(false);
  }
   
  async function previousPage(){
    setLoading(true);
    if(pagAtual != 1){
      let p = pagAtual - 1;    
      setPagAtual(p);

      console.log("p");
      console.log(p);
      console.log("regPag");
      console.log(regPag);

      await memoarbfront_backend.get_collection_claims_user(idCollection, 
                                                       parseInt(p),
                                                       parseInt(regPag) 
                                                      ).then((result) => {
 
          let claims = [];
          for( let i = 0; i < result.length ; i++){                
            claims[i] = {id_token: parseInt(result[i].id_nft), nome: result[i].name , descricao: result[i].description, imagem: result[i].image } ;
          }      
    
          setListClaims(claims);
  
      });     
    }
    setLoading(false);
  } 
  
  async function getTotalPages(){
      let p = parseInt(totalSupply) / parseInt(regPag);
      p = Math.ceil(p);
      setTotalPag(parseInt(p));
      return p;
  }

  async function nextPage(){    
      if(pagAtual!=totalPag){
        setLoading(true);
        let p = pagAtual + 1;
        setPagAtual(p);

        await memoarbfront_backend.get_collection_claims_user(idCollection, 
                                                         parseInt(p),
                                                         parseInt(regPag) 
                                                        ).then((result) => {            

            let claims = [];
            for( let i = 0; i < result.length ; i++){                
                claims[i] = {id_token: parseInt(result[i].id_nft), nome: result[i].name , descricao: result[i].description, imagem: result[i].image } ;
            }      

            setListClaims(claims);
        });   
        setLoading(false);
    }
  }     

  return (

    <body class="bg-[#fff9e6] min-h-screen">  

      <Menu selectedMenu={"mycollectionsuser"} />

      <main>

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
          { /*
          <div className="w-full text-[#fff9e6] text-2xl font-bold font-['Arial'] line-clamp-1">
              {name} - {symbol}
          </div>
           */ }

          <div className="w-full text-[#fff9e6] text-2xl font-bold font-['Arial'] whitespace-normal md:whitespace-nowrap line-clamp-1">
            {name} - {symbol}
          </div>

          { /*
          <div className="w-full md:w-[500px] text-[#fff9e6] text-xs font-normal font-['Arial'] line-clamp-4 md:line-clamp-none">
              {String(description).trim().length > 342 ? String(description).trim().substring(0, 342) + " ..." : String(description).trim()}
          </div>
          */ }
          <div className="hidden md:block w-full md:w-[500px] text-[#fff9e6] text-xs font-normal font-['Arial'] line-clamp-4 md:line-clamp-none">
            {String(description).trim().length > 342 ? String(description).trim().substring(0, 342) + " ..." : String(description).trim()}
          </div>
          <div className="justify-start items-start gap-6 inline-flex">            
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
            { /*
            <div className="justify-start items-start gap-1 flex">
              <div className="w-[11px] h-[11px] relative"></div>
              <div className="text-[#fff9e6] text-[14px] font-bold font-['Arial']">
                PONTOS:  {totalSupply}
              </div>
            </div>            
              */ }

            <div className="text-[#fff9e6] text-[14px] font-black font-['Arial'] min-h-[37px] min-w-[120px] px-2 py-1.5 bg-[#da80f2] rounded-lg flex justify-center items-center">
                PONTOS:  {totalSupply}
            </div>

          </div>
        </div>        

        <br/>

        { /*
          <div class="max-w-full flex items-center justify-center mb-[10px] ">          
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listClaims.map((m) => (   
                  <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <a >                    
                          <img class="rounded-t-lg" src={m.imagem} alt="" />
                      </a>
                      <div class="p-5">
                          <a >
                              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ID Token: {m.id_token} - {m.nome}</h5>
                          </a>
                          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{m.descricao}</p>
                          <a class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              Read more
                              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                              </svg>
                          </a>
                      </div>
                  </div>
                ))} 
              </div>
          </div>
        */ }


        <div className="flex flex-wrap gap-4 px-10 ml-[14px] p-2 w-full">        

          {listClaims.map((m) => (
            <div
              key={m.id_token}              
              className="min-w-[265px] h-[265px] md:w-[255px] md:h-[255px] p-5 bg-[#544ef3] rounded-[10px] flex flex-col justify-end items-start gap-2 overflow-hidden bg-cover bg-center "
              style={{
                backgroundImage: `url(${"https://tyk3i-wiaaa-aaaam-aec5q-cai.icp0.io"+m.imagem})`,
              }}
            >
              <a
                href={`/memo/${symbol}/${m.id_token}`}
                className="h-[37px] w-[115px] px-4 py-2.5 bg-[#da80f2] rounded-lg justify-center items-center gap-4 inline-flex overflow-hidden cursor-pointer"
              >
                <div className="text-[#fff9e6] text-[10px] font-black font-['Arial']">
                    {translations.VIEWMEMO}
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
                  <a onClick={previousPage} class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700  ">{translations.previous}</a>
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

export default collectionNft;
