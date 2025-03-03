import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthClient } from "@dfinity/auth-client";

// Criação do contexto de autenticação
const AuthContext = createContext();

// Componente AuthProvider
export const AuthProvider = ({ children }) => {
  
  useEffect( async () => {

    const storedUser = sessionStorage.getItem("authUser");
    let authUser = storedUser === "true";
    if (authUser) {
      //console.log("recuperou o storedUser: " + storedUser)      
      //setAuthClient(JSON.parse(storedUser));
      //console.log("auth IsAuthenticated: " + authClient)
      setIsAuthenticated(authUser);

      //console.log("auth IsAuthenticated: " + isAuthenticated)

      let authC = await AuthClient.create();
      //console.log("authClient2: " + authC)
      //const authenticated = await authC.isAuthenticated();
      //console.log("authenticated: " + authenticated)

      if(authClient===null){
        setAuthClient(authC);
        setIdentity(authC.getIdentity());
      } 

    }
   
  }, []);

  const [identity, setIdentity] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Função para fazer login
  const login = (authData,ident) => {
    setAuthClient(authData); // Armazena os dados do usuário no estado
    setIdentity(ident);
    setIsAuthenticated(true);
    sessionStorage.setItem("authUser", "true"); 

  };

  // Função para fazer logout
  const logout = () => {
    setAuthClient(null); // Limpa os dados do usuário
    sessionStorage.removeItem("authUser"); // Remove do localStorage
  };

  /*
  const getAuthenticated = async () => {    

      let authC = await AuthClient.create();
      console.log("authClient3: " + authC);

      if(authC!=null){
        const authenticated = await authC.isAuthenticated();
        console.log("authenticated: " + authenticated);
      }
      
      setAuthClient(authC);
      if(authC===null){
        console.log("return: false ");
          return false;
      } else {
        console.log("return: true ");
          return true;
      }

  }*/
  

  // Objeto de valor compartilhado
  const value = {
    authClient,
    identity,
    login,
    logout,
    isAuthenticated, // Verifica se o usuário está autenticado
  }; //isAuthenticated: !!authClient

  /*
  async function init(){
      let authC = await AuthClient.create();
      const authenticated = await authC.isAuthenticated();
      console.log("dentro do init");
      if (authenticated && !authC.getIdentity().getPrincipal().isAnonymous() ) {
        console.log("setAuthClient(authC)");
        setAuthClient(authC);
        setIdentity(authC.getIdentity());
      } else {
        console.log("não recuperou o AuthClient.create() ");
      }
      
  }

  init();
  */

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para acessar o contexto
export const useAuth = () => useContext(AuthContext);
