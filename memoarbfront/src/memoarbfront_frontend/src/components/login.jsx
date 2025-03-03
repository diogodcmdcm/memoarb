import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";


const login = () => {

    const navigate = useNavigate();

  const { login, authState } = useAuth();

  const [authClient, setAuthClient] = useState(null);
  const [isAuth, setisAuth] = useState(false);
  const [identity, setIdentity] = useState(null);

  async function handleLogin  ()  {

    
    setAuthClient(await AuthClient.create());

    // Simula um login
    const userData = { id: 1, name: "João" }; // Substitua por dados reais
    login(userData);


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

    //window.location.href = "/home/";
    navigate("/home/"); // Redireciona para a página Home

  };

    
      /*
      async function checkarBackend(){        
        const principalBackEnd = await memo_v1_backend.getUserPrincipal();    
        alert(principalBackEnd);
        return false;
      };
      */
    
      function handleSuccess() {
        //const principalId = authClient.getIdentity().getPrincipal().toText();
        //console.log(`PrincipalId obtido diretamente no Frontend: ${principalId}`);  
  
        /*
        Actor.agentOf(memo_v1_backend).replaceIdentity(
          authClient.getIdentity()
        );
        */
        setIdentity(authClient.getIdentity());          
        navigate("/home/"); // Redireciona para a página Home
    
      }
      



  handleLogin();

  return (
    <div>
      {authState ? (
        <p>Bem-vindo, {authState.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default login;
