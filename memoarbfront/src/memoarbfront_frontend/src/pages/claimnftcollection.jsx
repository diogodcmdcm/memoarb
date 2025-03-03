import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { memoarbfront_backend } from 'declarations/memoarbfront_backend';
import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

import { useState } from 'react';
import { memoarbfront_backend } from 'declarations/memoarbfront_backend';


import { ethers } from "ethers";
import { BrowserProvider, Contract } from "ethers";

import Spinner from "../components/spinner";

import { useNavigate } from "react-router-dom";

import pt from "../locales/pt.json";

function claimnftcollection() {

  const navigate = useNavigate();

  const [translations,setTranslations] = useState(pt);
  
  const { idToken, idCollection } = useParams(); //constante utilizada para armazenar o id da coleção ao abrir a página.
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [repeatMint, setRepeatMint] = useState(false);  

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [popupSelAuth, setPopupSelAuth] = useState(false);
   
  const [showModalLimit, setShowModalLimit] = useState(false);

  const [showModalMsgSucess, setShowModalMsgSucess] = useState(false);
  
  function hideModal(){
      setShowModal(false);
      redirectCollection();
  }

  function hideModalLimit(){
      setShowModalLimit(false);    
  }

  function hideModalMsgSucess(){
      redirectCollection();             
      setShowModalMsgSucess(false);    
  }  

  function redirectCollection(){
    window.location.href = "/collectionNft/"+idCollection;
  }
  
  useEffect( async () => {   
    getNft(idCollection, idToken);    
  }, []);  

  async function getNft(idC, idT) {      

      await memoarbfront_backend.getNftTemplate(idC, parseInt(idT)).then((result) => {                    
        setName(result.name);
        setDescription(result.description);
        setLogo(result.image);
        setRepeatMint(result.repeatMint);        
    });      

  }      

  const claim_nft = async () => {

    if (!window.ethereum) {
      console.error("Metamask não encontrada!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    await window.ethereum.request({ method: "eth_requestAccounts" }); // Solicita conexão à MetaMask
    // Obtém o signer (quem está assinando a transação)
    const signer = await provider.getSigner();
    // Obtém o endereço da carteira conectada
    const userAddress = await signer.getAddress();

    const contractAddress = "0x2bc1E9c1Cd52355fD6723047e45A265958510E63";
    const contractABI = [        
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ERC721IncorrectOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC721InsufficientApproval",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidOperator",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC721NonexistentToken",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_fromTokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_toTokenId",
          "type": "uint256"
        }
      ],
      "name": "BatchMetadataUpdate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "MetadataUpdate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "tokenURI",
          "type": "string"
        }
      ],
      "name": "mintNFT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }

    ]; // ABI do contrato
  
    setLoading(true);
    const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await nftContract.mintNFT(userAddress, logo);    
    await tx.wait();
    setShowModalMsgSucess(true);
    setLoading(false);
    
  };
  
  let authClient = null;

  async function init() {
    authClient = await AuthClient.create();
  }
      
  function configBackEnd() {
      sessionStorage.setItem("authUser", "true"); 
      Actor.agentOf(memoarbfront_backend).replaceIdentity(authClient.getIdentity());
      setPopupSelAuth(false);
      claim_nft();
  }    

  function selectMethAuth(mt){
    if(mt === "ID" ){
        loginID();
    } else if (mt === "NFID" ){
        handleLoginNFID();
    }
  }

  const handleLoginNFID = async () =>  {  
  
      if (!authClient) throw new Error("AuthClient not initialized");
    
        const APP_NAME = "NFID Connect";
        const APP_LOGO = "https://nfid.one/icons/favicon-96x96.png";
        const CONFIG_QUERY = `?applicationName=${APP_NAME}&applicationLogo=${APP_LOGO}`;
    
        const identityProvider = `https://nfid.one/authenticate${CONFIG_QUERY}`;
    
        authClient.login({
          identityProvider,
        
          onSuccess: configBackEnd,
          windowOpenerFeatures: `
            left=${window.screen.width / 2 - 525 / 2},
            top=${window.screen.height / 2 - 705 / 2},
            toolbar=0,location=0,menubar=0,width=525,height=705
          `,
        });  
  };   

    async function loginID() {
      
      if (!authClient) throw new Error("AuthClient not initialized");

      // Inicia o processo de login e aguarda até que ele termine
      await authClient.login({
        // Redireciona para o provedor de identidade da ICP (Internet Identity)
        identityProvider: "https://identity.ic0.app/#authorize",
       
        onSuccess: async () => {   
          // Caso entrar neste bloco significa que a autenticação ocorreu com sucesso!
          configBackEnd();

        },
        
        windowOpenerFeatures: `
                                left=${window.screen.width / 2 - 525 / 2},
                                top=${window.screen.height / 2 - 705 / 2},
                                toolbar=0,location=0,menubar=0,width=525,height=705
                              `,
      })
      
      return false;
      
  };

  init();

  return (

      <main class="max-w-screen-2xl bg-[#fff9e6] ">

        <div>
          {loading && <Spinner />}
        </div>        

        <div class="max-w-screen-2xl min-h-screen flex flex-col justify-center items-center mx-auto p-4">
          
        <div class="flex justify-center items-center h-32 w-full">
          <a href="/" class="flex flex-col justify-center items-center">
            <img src="/logo.png" class="h-[60px]" alt="" />
            <span class="text-2xl font-semibold dark:text-white"></span>
          </a>
        </div>

        <br/>

        <div class="max-w-sm border border-gray-200 rounded-lg shadow flex flex-col items-center">
          <img class="object-contain w-full h-96 md:h-auto md:w-48 rounded-lg" src={"https://tyk3i-wiaaa-aaaam-aec5q-cai.icp0.io" + logo}  alt="" />
          <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600">{name}</h5>                       
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 whitespace-pre-wrap ">{description}</p>                  
          </div>
        </div>

          <br/>                    

          <div>                
            <a onClick={() => { setPopupSelAuth(true); }} className="block">
              <div class="px-4 py-3 bg-[#da80f2] rounded-lg justify-center items-center gap-4 inline-flex overflow-hidden cursor-pointer">
                <div class="text-[#fff9e6] text-xs font-black font-['Arial'] uppercase">CLAIM</div>
              </div>
            </a>
          </div>   

        </div>

        { /* Aparência do modal */  } 
      {showModal && (
      <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 class="text-xl font-bold mb-4">Opppsss!</h2>
          <p class="mb-4">{translations.youAlreadyOwnThisNFT}</p>   
          <button  onClick={() => hideModal() } class="px-4 py-2 bg-[#666666] text-white rounded  hover:bg-[#555555]" >
            Ok
          </button>
        </div>
      </div>
      )}

      {showModalLimit && (
      <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 class="text-xl font-bold mb-4">Opppsss!</h2>
          <p class="mb-4">{translations.maximumLimitOfNFTs}</p>
          <button  onClick={() => hideModalLimit() } class="px-4 py-2 bg-[#666666] text-white rounded  hover:bg-[#555555]" >
            Ok
          </button>
        </div>
      </div>
      )}

      {showModalMsgSucess && (    
      <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 class="text-xl font-bold mb-4">Sucesso!</h2>
          <p class="mb-4">{translations.claimsucess}</p>
          <button  onClick={() => hideModalMsgSucess() } class="px-4 py-2 bg-[#666666] text-white rounded  hover:bg-[#555555]" >
            Ok
          </button>
        </div>
      </div>
      )}

      {popupSelAuth && (<div id="select-modal" tabindex="-1" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div class="relative p-4 w-full max-w-md">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Login</h3>
                <button onClick={() => { setPopupSelAuth(false); }}
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="select-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close</span>
                </button>
              </div>
              <div class="p-4 md:p-5">
                <p class="text-gray-500 dark:text-gray-400 mb-4">{translations.selectAuthenticationMethod}:</p>
                <ul class="space-y-4 mb-4">
                  <li>
                    <input onClick={() => { selectMethAuth("ID"); }} type="radio" id="job-1" name="job" value="job-1" class="hidden peer" required />
                    <label for="job-1"
                      class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                      <div class="block">
                        <div class="w-full text-lg font-semibold">Internet Identity</div>
                        <div class="w-full text-gray-500 dark:text-gray-400">{translations.useInternetIdentity}</div>
                      </div>
                      <svg class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </label>
                  </li>
                  <li>
                    <input onClick={() => { selectMethAuth("NFID"); }} type="radio" id="job-2" name="job" value="job-2" class="hidden peer" />
                    <label for="job-2"
                      class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                      <div class="block">
                        <div class="w-full text-lg font-semibold">NFID</div>
                        <div class="w-full text-gray-500 dark:text-gray-400">{translations.useGoogleAccount}</div>
                      </div>
                      <svg class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        ) }
      <br/>
      </main>    
    
  );
}

export default claimnftcollection;