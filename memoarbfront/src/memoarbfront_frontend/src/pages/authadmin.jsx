import { useState, useEffect } from 'react';
import { memoarbfront_backend } from 'declarations/memoarbfront_backend';
import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import Spinner from "../components/spinner";

import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

function authadmin() {

    useEffect( async () => {      
        await configBackEnd();            
    }, []);

    const { identity } = useAuth();
    const navigate = useNavigate();

    const [yourId, setYourId ] = useState("");
    const [password, setPassword ] = useState("");

    const [loading, setLoading] = useState(false);
    
    const loginAuth = async () => {   
        
        setLoading(true);
        await memoarbfront_backend.loginAdmin(yourId, password).then((result) => {
            if(result==true){                
                //navigate("/homeAdmin/"); 
                //window.location.href = /homeAdmin/;                
                window.location.href = /mycollectionsAdmin/;
            } else {
                alert('Incorrect Your ID or Password!');
            }
        });
        setLoading(false);
    }

    async function configBackEnd(){
    
        /* este codigo é provisorio devido problemas no AuthProvider */
        let authC = await AuthClient.create();    
        const authenticated = await authC.isAuthenticated();
        
        if (authenticated) {
          console.log("Usuário está logado");        
          const principal = authC.getIdentity().getPrincipal().toString();
          console.log("Principal do usuário:", principal);
    
          Actor.agentOf(memoarbfront_backend).replaceIdentity(
            authC.getIdentity()
          );          
    
        }
        
        /* este é o codigo correto 
        if (identity!=null) {
          console.log("Usuário está logado");      
          const principal = identity.getPrincipal().toString();
          console.log("Principal do usuário:", principal);
    
          Actor.agentOf(memoarbfront_backend).replaceIdentity(
            identity
          );
    
        } */
    }

    return (    
        <>      

        <body class="bg-[#fff9e6] min-h-screen">  
            <main>

            <div>
                {loading && <Spinner />}
            </div>
            
            <div class="relative w-full h-screen">
                <div 
                    id="authentication-modal" 
                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="relative">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Sign in to platform
                            </h3>                        
                        </div>
                        <div class="p-4 md:p-5">
                            <form class="space-y-4" action="#">
                                <div>
                                    <label for="yourId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your ID</label>
                                    <input 
                                        value={yourId} 
                                        onChange={(e) => { setYourId(e.target.value) }} 
                                        type="text" 
                                        name="yourId" 
                                        id="yourId" 
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <input 
                                        value={password} 
                                        onChange={(e) => { setPassword(e.target.value) }} 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                        required 
                                    />
                                </div>                                
                                <button 
                                    type="button" 
                                    onClick={loginAuth} 
                                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Login
                                </button>                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            </main>       
        </body>  
        </>          
    );
}

export default authadmin;