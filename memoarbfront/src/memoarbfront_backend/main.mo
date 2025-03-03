import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import D "mo:base/Debug";
import RBTree "mo:base/RBTree";  
import Iter "mo:base/Iter";
import HashMap "mo:base/HashMap";

import T "types";

shared actor class Main() = this {

  stable var tokenId : Nat = 0;  
  stable var nftImgId : Nat = 0;  

  type Nft_Memo = {
    id_nft : Nat;
    name : Text;
    description : Text;
    image : Text;
  };

  
  let colecoes = RBTree.RBTree<Text, Collection>(Text.compare); 

  type Collection = {
    symbol: Text;
    name: Text;
    description: ?Text;
    image:  ?Text;
    total_supply: Nat; 
    supply_cap: ?Nat;
    dateCreate: Nat;
    location: Text;
  };

  public shared(msg) func criar_colecao(symbolCollection: Text, nameCollection: Text, descriptionCollection: Text, repeatMint: Bool, img: Text, dateCreate: Nat, location: Text) : async () {  //async ICRC7.ICRC7 {

    var col : Collection = {  symbol = symbolCollection;
                                name = nameCollection;
                                description = ?descriptionCollection;
                                image =  ?img;
                                total_supply = 1000; 
                                supply_cap = null;
                                dateCreate = dateCreate;
                                location = location;
                              };


    colecoes.put(symbolCollection, col);

  };
         
  public shared(msg) func retornar_todas_colecoes() : async [(Text, Collection)] {      
    return Iter.toArray(colecoes.entries());
  };

  public shared(msg) func getTotalRegCollections() : async Nat {  
      return Iter.toArray(colecoes.entries()).size();
  };

  public shared(msg) func getAllCollectionsPage(pagAtual: Nat, regPag: Nat) : async [Collection] {
      return [];
  };  

  public shared(msg) func get_collection_by_symbol(sym: Text) : async Collection {  

    let col : ?Collection = colecoes.get(sym);

    switch(col){
      case(null){
        let c : Collection = {symbol = ""; name = ""; description = ?""; image = ?""; total_supply = 0; supply_cap = ?0 ; dateCreate = 0 ; location = "" };        
        return c;
      };
      case(?colec){                
        return colec;
      };
    };

  };

  public shared(msg) func get_collection_by_symbol_user(sym: Text) : async Collection {  

    let col : ?Collection = colecoes.get(sym);
    //let account : Account = { owner = msg.caller ; subaccount = null };

    switch(col){
      case(null){
        let c : Collection = {symbol = ""; name = ""; description = ?""; image = ?""; total_supply = 0; supply_cap = ?0; dateCreate = 0; location = "" };        
        return c;
      };
      case(?colec){
          return colec;
      };
    };

  };  

  var templates = Buffer.Buffer<T.NftCollectionTemplate>(1);
  var idTemplate : Nat = 0;

  public shared(msg) func createTemplateNFtToMint(symbol: Text, name : Text, description : Text, imageData : Text, supplyCap: Nat, creationDateTemplateNFT: Nat) : async () {
    
    idTemplate += 1;
    var template : T.NftCollectionTemplate = {id = idTemplate;
                                                name = name; 
                                                description = description;
                                                image = imageData; 
                                                memo = Text.encodeUtf8("\00\01");
                                                override = false; 
                                                creationDateTemplateNFT = creationDateTemplateNFT;
                                                supplyCap = supplyCap; 
                                                totalSupply = 0;
                                                repeatMint = false};      
      
    templates.add(template);      

  };


  let userAdmin = "";
  let senhaAdmin = "";

  public shared(msg) func loginAdmin(user: Text, senha : Text) : async Bool {    
      if(user == userAdmin and senha == senhaAdmin){
        return true;
      };
      return false;
  };
 
  public shared(msg) func get_collection_nft_template(idTemplate : Nat) : async T.NftCollectionTemplate {


    let col : T.NftCollectionTemplate = templates.get(idTemplate);

    return col;
    
  };

  
  

  public func getNftTemplate(sym: Text, idT: Nat) : async T.NftCollectionTemplate {
  
    let col : T.NftCollectionTemplate = templates.get(idT);

    return col;


  };
 
  var collection_user_claim = HashMap.HashMap<Text, [Text]>(5, Text.equal, Text.hash);

//função criada apenas para testes. Excluir antes de colocar em produção
  public func get_collection_user_claim() : async [(Text,[Text])] {
      return Iter.toArray(collection_user_claim.entries());
  };

  public shared(msg) func getTotalRegCollectionsUser() : async Nat {  

      let principal_text = Principal.toText(msg.caller);
      let clu : ?[Text] = collection_user_claim.get(principal_text);

      switch(clu){
          case(null){
            return 0;
          };
          case(?syms){
            return syms.size();
          }                    
      };      
  };

};