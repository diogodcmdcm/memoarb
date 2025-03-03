import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";

function siteAdmin() {     

    const navigate = useNavigate();
      
    const [authClient, setAuthClient] = useState(null);
    const [popupSelAuth, setPopupSelAuth] = useState(false);
      
    async function init() {
      let authClientTemp = await AuthClient.create();
      setAuthClient(authClientTemp);
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
            onSuccess: handleSuccess,
            windowOpenerFeatures: `
              left=${window.screen.width / 2 - 525 / 2},
              top=${window.screen.height / 2 - 705 / 2},
              toolbar=0,location=0,menubar=0,width=525,height=705
            `,
          });  
    };
          
     
    
      function handleSuccess() {            
        navigate("/auth/"); // Redireciona para a página Home
    
      } 
  
      async function loginID() {
        
        if (!authClient) throw new Error("AuthClient not initialized");
  
        // Inicia o processo de login e aguarda até que ele termine
        await authClient.login({
          // Redireciona para o provedor de identidade da ICP (Internet Identity)
          identityProvider: "https://identity.ic0.app/#authorize",
          onSuccess: async () => {   
            // Caso entrar neste bloco significa que a autenticação ocorreu com sucesso!     
            navigate("/auth/"); // Redireciona para a página Home
  
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

    <section class="bg-[#fff9e6] min-h-screen">       
        
        <div class="px-1 mx-auto left-[20px] ml-10  py-28"> 
      
            <div class="w-[95px] h-[95px] relative">
              <div class="w-[56.14px] h-[63.61px] left-[0px] top-[2px] absolute "> 
                <svg width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="LOGO MEMO">
                  <path id="Vector" d="M87.652 0H7.34797C3.2898 0 0 3.2898 0 7.34797V87.652C0 91.7102 3.2898 95 7.34797 95H87.652C91.7102 95 95 91.7102 95 87.652V7.34797C95 3.2898 91.7102 0 87.652 0Z" fill="#544EF3"/>
                  <g id="Group">
                  <path id="Vector_2" d="M20.2659 43.2017V17.0263C20.2659 16.3761 20.7895 15.8525 21.4397 15.8525H27.9821C28.5115 15.8525 28.9776 16.2093 29.1157 16.7214L32.9191 31.0203C33.2298 32.1826 34.8813 32.1826 35.1862 31.0203L38.9437 16.7271C39.0818 16.2093 39.5421 15.8525 40.0772 15.8525H46.6369C47.2871 15.8525 47.8107 16.3761 47.8107 17.0263V43.2017C47.8107 43.8519 47.2871 44.3755 46.6369 44.3755H43.6332C42.983 44.3755 42.4594 43.8519 42.4594 43.2017V31.3713C42.4594 29.9903 40.4858 29.7429 40.152 31.0836L37.0218 43.4894C36.8894 44.013 36.4234 44.3755 35.8825 44.3755H32.1653C31.6302 44.3755 31.1584 44.0073 31.026 43.4894L27.9188 31.1181C27.5793 29.7774 25.6114 30.0248 25.6114 31.4058V43.2074C25.6114 43.8577 25.0878 44.3813 24.4376 44.3813H21.434C20.7838 44.3813 20.2601 43.8577 20.2601 43.2074L20.2659 43.2017Z" fill="#DA80F2"/>
                  <path id="Vector_3" d="M51.1423 43.2017V17.0263C51.1423 16.3761 51.666 15.8525 52.3162 15.8525H73.451C74.1012 15.8525 74.6248 16.3761 74.6248 17.0263V19.5064C74.6248 20.1566 74.1012 20.6802 73.451 20.6802H58.0703C57.4201 20.6802 56.8964 21.2038 56.8964 21.854V25.8301C56.8964 26.4803 57.4201 27.0039 58.0703 27.0039H72.3807C73.0309 27.0039 73.5545 27.5276 73.5545 28.1778V30.6405C73.5545 31.2907 73.0309 31.8144 72.3807 31.8144H58.0703C57.4201 31.8144 56.8964 32.338 56.8964 32.9882V38.4028C56.8964 39.053 57.4201 39.5766 58.0703 39.5766H73.9918C74.642 39.5766 75.1657 40.1002 75.1657 40.7504V43.2132C75.1657 43.8634 74.642 44.387 73.9918 44.387H52.3104C51.6602 44.387 51.1366 43.8634 51.1366 43.2132L51.1423 43.2017Z" fill="#DA80F2"/>
                  <path id="Vector_4" d="M20.2659 77.801V51.6257C20.2659 50.9755 20.7895 50.4518 21.4397 50.4518H27.9821C28.5115 50.4518 28.9776 50.8086 29.1157 51.3207L32.9191 65.6196C33.2298 66.7819 34.8813 66.7819 35.1862 65.6196L38.9437 51.3265C39.0818 50.8086 39.5421 50.4518 40.0772 50.4518H46.6369C47.2871 50.4518 47.8107 50.9755 47.8107 51.6257V77.801C47.8107 78.4512 47.2871 78.9749 46.6369 78.9749H43.6332C42.983 78.9749 42.4594 78.4512 42.4594 77.801V65.9706C42.4594 64.5896 40.4858 64.3422 40.152 65.6829L37.0218 78.0887C36.8894 78.6124 36.4234 78.9749 35.8825 78.9749H32.1653C31.6302 78.9749 31.1584 78.6066 31.026 78.0887L27.9188 65.7174C27.5793 64.3767 25.6114 64.6242 25.6114 66.0051V77.8068C25.6114 78.457 25.0878 78.9806 24.4376 78.9806H21.434C20.7838 78.9806 20.2601 78.457 20.2601 77.8068L20.2659 77.801Z" fill="white"/>
                  <path id="Vector_5" d="M49.9742 64.8888C49.9742 61.983 50.3885 59.5433 51.2171 57.5754C51.8386 56.1254 52.6844 54.8192 53.7547 53.6626C54.8249 52.506 55.9988 51.6544 57.2762 51.0963C58.9736 50.3425 60.93 49.9685 63.1511 49.9685C67.1675 49.9685 70.3782 51.2747 72.7892 53.8813C75.2002 56.4879 76.4028 60.113 76.4028 64.7565C76.4028 69.4 75.2059 72.9618 72.818 75.5627C70.4243 78.1635 67.2308 79.464 63.2259 79.464C59.2211 79.464 55.9527 78.1693 53.5648 75.5799C51.1711 72.9906 49.98 69.4288 49.98 64.8888H49.9742ZM55.9355 64.6932C55.9355 67.8004 56.6202 70.1538 57.9897 71.7535C59.3592 73.3589 61.0969 74.1587 63.2086 74.1587C65.3204 74.1587 67.0466 73.3646 68.3988 71.7707C69.751 70.1826 70.43 67.7947 70.43 64.6126C70.43 61.4306 69.7741 59.1232 68.4564 57.5812C67.1387 56.0333 65.3894 55.2623 63.2086 55.2623C61.0278 55.2623 59.2729 56.0448 57.9379 57.6099C56.603 59.175 55.9355 61.5342 55.9355 64.6932Z" fill="white"/>
                  </g>
                </g>
                </svg>
              </div>
            </div>            
            
            <br/>

            <div>
                  <img src="/info.png" class="w-[475px] h-[203px]" alt="" />
             </div>

            <br/>
            
            <div className="flex flex-col sm:flex-row sm:justify-start sm:space-y-0" >             

                <a onClick={ () => {setPopupSelAuth(true)} } class="w-[225px] px-4 py-2.5 left-[60px] top-[620px] bg-[#da80f2] rounded-lg justify-start gap-4 inline-flex overflow-hidden cursor-pointer">
                  <div class="">
                      <div class="text-[#fff9e6] text-2xl font-black font-['Arial'] uppercase">GET STARTED</div>
                  </div>
                </a>
                &nbsp;&nbsp;
                <a class="w-[225px] px-4 py-2.5 left-[303px] top-[620px] rounded-lg border-2 border-[#da80f2] justify-start gap-4 inline-flex overflow-hidden cursor-pointer">
                    <div class="text-[#da80f2] text-2xl font-black font-['Arial'] uppercase">LEARN MORE</div>                  
                </a>  
            </div>
        </div>
 
       <br/>

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
                <p class="text-gray-500 dark:text-gray-400 mb-4">Select authentication method:</p>
                <ul class="space-y-4 mb-4">
                  <li>
                    <input onClick={() => { selectMethAuth("ID"); }} type="radio" id="job-1" name="job" value="job-1" class="hidden peer" required />
                    <label for="job-1"
                      class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                      <div class="block">
                        <div class="w-full text-lg font-semibold">Internet Identity</div>
                        <div class="w-full text-gray-500 dark:text-gray-400">Use Internet Identity</div>
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
                        <div class="w-full text-gray-500 dark:text-gray-400">Use Google Account</div>
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

    </section>
    
  );
}

export default siteAdmin;