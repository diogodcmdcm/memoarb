import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Bool "mo:base/Bool";


module {

    public type NftCollectionTemplate = {
        id: Nat;
        name: Text;
        description: Text;
        image: Text;
        memo: Blob;
        override: Bool;
        creationDateTemplateNFT: Nat; // mudar para o tipo certo. Por enquanto não está sendo utilizado.
        supplyCap: Nat;
        totalSupply: Nat;
        repeatMint: Bool;  // true não deverá permitir o mint da mesma NFT, se false permite mint da mesma NFT mais de uma vez
    }


}