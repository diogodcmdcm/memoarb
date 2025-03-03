import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Collection {
  'dateCreate' : bigint,
  'supply_cap' : [] | [bigint],
  'name' : string,
  'description' : [] | [string],
  'image' : [] | [string],
  'location' : string,
  'total_supply' : bigint,
  'symbol' : string,
}
export interface Main {
  'claimNFTCollection' : ActorMethod<[Principal, string, bigint], undefined>,
  'createTemplateNFtToMint' : ActorMethod<
    [string, string, string, string, bigint, bigint],
    undefined
  >,
  'criar_colecao' : ActorMethod<
    [string, string, string, boolean, string, bigint, string],
    undefined
  >,
  'getAllCollectionsPage' : ActorMethod<[bigint, bigint], Array<Collection>>,
  'getAllCollectionsPageUser' : ActorMethod<
    [bigint, bigint],
    Array<Collection>
  >,
  'getNft' : ActorMethod<[string, bigint], Array<[] | [Array<string>]>>,
  'getNftTemplate' : ActorMethod<[string, bigint], undefined>,
  'getTotalRegCollections' : ActorMethod<[], bigint>,
  'getTotalRegCollectionsUser' : ActorMethod<[], bigint>,
  'get_collection_by_symbol' : ActorMethod<[string], Collection>,
  'get_collection_by_symbol_user' : ActorMethod<[string], Collection>,
  'get_collection_claims_user' : ActorMethod<
    [string, bigint, bigint],
    Array<Nft_Memo>
  >,
  'get_collection_mints' : ActorMethod<[string], Array<Nft_Memo>>,
  'get_collection_nft_template' : ActorMethod<
    [string],
    Array<NftCollectionTemplate>
  >,
  'get_collection_user_claim' : ActorMethod<[], Array<[string, Array<string>]>>,
  'icrc7_total_supply' : ActorMethod<[], bigint>,
  'incrementTotalSupplyNFT' : ActorMethod<[string, bigint], undefined>,
  'loginAdmin' : ActorMethod<[string, string], boolean>,
  'mintAndClaimNFTTemplate' : ActorMethod<[string, bigint, string], bigint>,
  'mintNFTCollection' : ActorMethod<
    [string, string, string, string, string],
    bigint
  >,
  'retornar_todas_colecoes' : ActorMethod<[], Array<[string, Collection]>>,
  'retornar_todas_colecoes_usuario' : ActorMethod<[], Array<Collection>>,
  'validateMintAndClaimNFTDuplicate' : ActorMethod<[string, string], boolean>,
}
export interface NftCollectionTemplate {
  'id' : bigint,
  'repeatMint' : boolean,
  'memo' : Uint8Array | number[],
  'name' : string,
  'override' : boolean,
  'description' : string,
  'supplyCap' : bigint,
  'totalSupply' : bigint,
  'image' : string,
  'creationDateTemplateNFT' : bigint,
}
export interface Nft_Memo {
  'name' : string,
  'description' : string,
  'image' : string,
  'id_nft' : bigint,
}
export interface _SERVICE extends Main {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
