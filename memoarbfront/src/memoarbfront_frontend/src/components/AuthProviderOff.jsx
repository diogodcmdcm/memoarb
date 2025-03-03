import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from "@dfinity/auth-client";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuth, setisAuth] = useState(false);
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    // Inicialização do AuthClient aqui
  }, []);

  const login = async () => {
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

  const logout = async () => {
    // Lógica de logout aqui
  };  

    async function init() {
        setAuthClient(await AuthClient.create());
    }
  
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

      window.location.href = "/home";
  
    }
    
    init();

  return (
    <AuthContext.Provider value={{ isAuth, identity, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//export const useAuth = () => useContext(AuthContext);
