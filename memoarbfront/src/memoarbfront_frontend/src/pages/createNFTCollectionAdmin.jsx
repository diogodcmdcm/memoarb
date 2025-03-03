import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { memoarbfront_backend } from 'declarations/memoarbfront_backend';

import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

import HeaderAdmin from "../components/headerAdmin";
import Spinner from "../components/spinner";

import { useNavigate } from "react-router-dom";

// Imports necessários para utilizar o Canister de Asset
import {Ed25519KeyIdentity} from '@dfinity/identity';
import {HttpAgent} from '@dfinity/agent';
import {AssetManager} from '@dfinity/assets';
import { Principal } from '@dfinity/principal';

import pt from "../locales/pt.json";

/* TRATAMENTO DE IMAGENS */
import Compressor from 'compressorjs';
/* FIM TRATAMENTO DE IMAGENS */

const identity = Ed25519KeyIdentity.generate(new Uint8Array(Array.from({length: 32}).fill(0)));

const agent = new HttpAgent({
  host: 'https://icp0.io', identity,
});

// Canister id can be fetched from URL since frontend in this example is hosted in the same canister as file upload
const canisterId = "tyk3i-wiaaa-aaaam-aec5q-cai"; //new URLSearchParams(window.location.search).get('canisterId') ?? /(.*?)(?:\.raw)?\.icp0.io/.exec(window.location.host)?.[1] ?? /(.*)\.localhost/.exec(window.location.host)?.[1];

// Create asset manager instance for above asset canister
const assetManager = new AssetManager({canisterId, agent});

function createNFTCollectionAdmin() {
  
  const [translations,setTranslations] = useState(pt);
  const navigate = useNavigate();

  useEffect( async () => {
    await configBackEnd();
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
  
    
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFileImage, setSelectedFileImage] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState("");

  const [symbolCollection, setSymbolCollection] = useState("");
  const [nameCollection, setNameCollection] = useState("");
  const [descriptionCollection, setDescriptionCollection] = useState("");
  const [locationCollection, setLocationCollection] = useState("");
  const [repeatMint, setRepeatMint] = useState(false);  
  
  const [loading, setLoading] = useState(false);
  
  const [errorSymbolCollection, setErrorSymbolCollection] = useState(false);  
  const [errorNameCollection, setErrorNameCollection] = useState(false);  
  const [errorDescriptionCollection, setErrorDescriptionCollection] = useState(false);  
  const [errorLocationCollection, setErrorLocationCollection] = useState(false);  

  let keyImg = ""; //chave do endereço da imagem no Canister de Asset

  /* analisar necessidade destas constantes */
  const [uploads, setUploads] = useState([]);
  const [progress, setProgress] = useState(null);
  const [imagens, setImagens] = useState([]);
  let assets = null;


  function selectImg(event){

    const file = event.target.files[0];

    if (file) {     
      
      setSelectedFileType(file.type);     
      setSelectedFileImage(file);     
      const imageUrl = URL.createObjectURL(file); // url da imagem para exibir em tela (mesmo sem gravar o asset)      
      setSelectedImage(imageUrl);     
    }
  }

  let imgWidth = 0;
  let imgHeight = 0;

  async function uploadImg() {    
    //validar se uma imagem foi selecionada
    if (selectedFileImage) {      

      return new Promise((resolve, reject) => {
        // Comprimir a imagem usando Compressor.js
        new Compressor(selectedFileImage, {
          quality: 0.4, // Define a qualidade da imagem (range de 0.0 - 1.0)
          //maxWidth: 800,
          //maxHeight: 600,
          //convertSize: 500000, // Converte PNG para JPEG se maior que 500KB
          async success(result) {        
            await sendAsset(result);   
            resolve(true);       
          },
          error(err) {
            console.error("Error compressing image:", err.message);
            reject(err);
          },
        });
      });      

    } else {
      alert("No image selected!");      
    }
   
    return null;
  } 

  /*
     Envia a imagem para o Canister de Asset e cria a Coleção
  */
  async function sendAsset(file){

    const compressedImageUrl = URL.createObjectURL(file); // Cria uma URL temporária para o arquivo comprimido

    // Obter o nome do arquivo
    let fileName = selectedFileImage.name;

    if ( selectedFileType === "image/jpeg") {
      fileName = symbolCollection + ".jpeg";    
    } else if ( selectedFileType === "image/png"){
      fileName = symbolCollection + ".png";
    } else if ( selectedFileType === "image/heic") {
      fileName = symbolCollection + ".heic";
    }

    // Criar uma imagem para carregar o arquivo e obter as dimensões
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      imgWidth = width;
      imgHeight = height;  
      // Liberar o objeto URL
      URL.revokeObjectURL(compressedImageUrl);
    };

    img.onerror = () => {
      console.error("Não foi possível carregar a imagem.");
    };

    // Atribuir o arquivo como fonte da imagem
    img.src = compressedImageUrl;

    try {
      const batch = assetManager.batch();      
      keyImg = await batch.store(file, {path: '/uploads', fileName});

      //grava a imagem em um Canister de Assets      
      await batch.commit({onProgress: ({current, total}) => setProgress(current / total)});
     
    } catch (e) {          
        if (e.message.includes('Caller is not authorized')) {
            alert("Caller is not authorized");
        } else {
            throw e;
        }
    }
  }

  function validateFields(){
      let noError = true;    
      
      if(symbolCollection!=null && String(symbolCollection).trim()!=""){          
          setErrorSymbolCollection(false);
      } else {          
          setErrorSymbolCollection(true);
          noError = false;
      }

      if(nameCollection!=null && String(nameCollection).trim()!=""){          
          setErrorNameCollection(false);
      } else {          
          setErrorNameCollection(true);
          noError = false;
      }

      if(descriptionCollection!=null && String(descriptionCollection).trim()!=""){          
          setErrorDescriptionCollection(false);
      } else {          
          setErrorDescriptionCollection(true);
          noError = false;
      }      
  
      if(locationCollection!=null && String(locationCollection).trim()!=""){          
          setErrorLocationCollection(false);
      } else {          
          setErrorLocationCollection(true);
          noError = false;
      }

      return noError;
  }

  async function createCollection() {      
   
      setLoading(true);

      let val = validateFields();       
      if(val){
        const up = await uploadImg();
        
        if(up!=null){                        
          try {               
              const now = new Date(); // Cria um objeto com a data e hora atuais
              const timestamp = now.getTime(); // Obtém o timestamp (em milissegundos)          
    
              await memoarbfront_backend.criar_colecao(symbolCollection, nameCollection, descriptionCollection, Boolean(repeatMint), keyImg, timestamp, locationCollection).then(() => { });    
              //window.location.href = "/collectionNftAdmin/"+symbolCollection;
              
              //navigate("/collectionNftAdmin/"+symbolCollection); 
              window.location.href = "/collectionNftAdmin/"+symbolCollection;  
                      
          } catch (error) {
            console.log("Erro ao chamar a função");
          }          
        }  
     }
      
      setLoading(false);
 
    }

    const handleChangeSymbolCollection = (e) => {
      setSymbolCollection(e.target.value.toUpperCase());
    };

  return (
        
    <body class="bg-[#fff9e6] min-h-screen">  
      
      <HeaderAdmin selectedMenu={"mycollectionsadmin"} />       
      
      <main class="bg-[#fff9e6]" >

          <div>
            {loading && <Spinner />}
          </div>

          <div class="min-h-screen flex justify-center">
            <div class="min-h-[740px] p-5 rounded-[10px] border-2 border-[#353535] flex-col justify-start items-start gap-3.5 inline-flex overflow-hidden">
              <form class="w-full">
                  <div class="w-[348px] h-[180px] p-2.5 bg-[#544ef3] rounded-lg flex-col justify-center items-center gap-1.5 flex overflow-hidden">
                    {selectedFileImage== null && (                
                      <div class="flex w-[348px] md:w-[348px] items-center justify-center max-w-sm">              
                          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                  </svg>
                                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold"> {translations.clickUploadCollectionImage} </span></p>
                                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG OR JPG (MAX. 1200x400px)</p>
                              </div>
                              <input id="dropzone-file" type="file" class="hidden" onChange={selectImg} />
                          </label>
                      </div>              
                    )}            

                    {selectedFileImage!= null && (
                      <div className="flex w-[348px] md:w-[348px] items-center justify-center max-w-sm">              
                        <label htmlFor="dropzone-file1" className="cursor-pointer">
                          <img src={selectedImage} loading="lazy" className="h-auto max-w-full rounded-lg" alt="" />
                          <input id="dropzone-file1" type="file" className="hidden" onChange={selectImg} />
                        </label>
                      </div>
                    )}
                  </div>                                    
                  
                  <div class="w-[300px] h-[40px] text-[#353535] items-center text-sm flex font-normal font-['Arial']">{translations.collectionSymbol}*</div>
                  <input type="text" value={symbolCollection} onChange={handleChangeSymbolCollection} maxlength="5" id="symbolCollection" className={`w-[350px] p-2.5 rounded-lg border border-black justify-start items-center gap-4 inline-flex overflow-hidden ${errorSymbolCollection ? "border-red-500" : "border-gray-300"}`} placeholder="" required />                  
                  {errorSymbolCollection && <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>                    
                    <div>
                      <span class="font-medium">{translations.thisFieldRequired}</span>
                    </div>
                  </div> }
                   
                  <div class="w-[300px] h-[40px] text-[#353535] items-center text-sm flex font-normal font-['Arial']">{translations.collectionName}*</div>              
                  <input type="text" value={nameCollection} onChange={ (e) => { setNameCollection(e.target.value) } } id="nameCollection" maxlength="300" className={`w-[350px] p-2.5 rounded-lg border border-black justify-start items-center gap-4 inline-flex overflow-hidden ${errorNameCollection ? "border-red-500" : "border-gray-300"}`} placeholder="" required />
                  {errorNameCollection && <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>                    
                    <div>
                      <span class="font-medium">{translations.thisFieldRequired}</span>
                    </div>
                  </div> }

                  <div class="w-[300px] h-[40px] text-[#353535] items-center text-sm flex font-normal font-['Arial']">{translations.collectionDescription}*</div>              
                  <textarea value={descriptionCollection} onChange={ (e) => { setDescriptionCollection(e.target.value) } } id="descriptionCollection" required rows="8" className={`w-[350px] h-[120px] p-2.5 rounded-lg border border-black justify-start items-start gap-4 inline-flex overflow-hidden ${errorDescriptionCollection ? "border-red-500" : "border-gray-300"}`} placeholder=""></textarea>
                  {errorDescriptionCollection && <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>                    
                    <div>
                      <span class="font-medium">{translations.thisFieldRequired}</span>
                    </div>
                  </div> }
                                    
                  <div class="w-[300px] h-[40px] text-[#353535] items-center text-sm flex font-normal font-['Arial']">{translations.location}*</div>              
                  <input type="text" value={locationCollection} onChange={ (e) => { setLocationCollection(e.target.value) } } maxlength="300" id="locCollection" className={`w-[350px] p-2.5 rounded-lg border border-black justify-start items-center gap-4 inline-flex overflow-hidden ${errorLocationCollection ? "border-red-500" : "border-gray-300"}`} placeholder="" required />
                  {errorLocationCollection && <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>                    
                    <div>
                      <span class="font-medium">{translations.thisFieldRequired}</span>
                    </div>
                  </div> }

                  <div class="items-center gap-2 flex" >
                    <div class="items-center gap-2 inline-flex h-[60px]">                  
                        <input value={repeatMint} onChange={ (e) => { setRepeatMint(e.target.value) } } id="default-checkbox" type="checkbox" class="w-[19px] h-[19px] bg-[#fff9e6] rounded border border-black" />
                        <div class="w-[234px] text-[#353535] text-sm font-normal font-['Arial']">{translations.doNotAllowMintRepeat}</div>
                    </div>
                  </div>
                  
                  <a onClick={() => { createCollection() }} className="block">
                    <div class="px-4 py-3 bg-[#da80f2] rounded-lg justify-center items-center gap-4 inline-flex overflow-hidden cursor-pointer">
                      <div class="text-[#fff9e6] text-xs font-black font-['Arial'] uppercase">{translations.create}</div>
                    </div>
                  </a>
              </form>
            </div>          
          </div>

     </main>
  </body>
  );
}

export default createNFTCollectionAdmin;