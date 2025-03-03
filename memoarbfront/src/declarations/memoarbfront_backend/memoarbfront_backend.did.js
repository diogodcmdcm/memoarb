export const idlFactory = ({ IDL }) => {
  const Collection = IDL.Record({
    'dateCreate' : IDL.Nat,
    'supply_cap' : IDL.Opt(IDL.Nat),
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'image' : IDL.Opt(IDL.Text),
    'location' : IDL.Text,
    'total_supply' : IDL.Nat,
    'symbol' : IDL.Text,
  });
  const Nft_Memo = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
    'image' : IDL.Text,
    'id_nft' : IDL.Nat,
  });
  const NftCollectionTemplate = IDL.Record({
    'id' : IDL.Nat,
    'repeatMint' : IDL.Bool,
    'memo' : IDL.Vec(IDL.Nat8),
    'name' : IDL.Text,
    'override' : IDL.Bool,
    'description' : IDL.Text,
    'supplyCap' : IDL.Nat,
    'totalSupply' : IDL.Nat,
    'image' : IDL.Text,
    'creationDateTemplateNFT' : IDL.Nat,
  });
  const Main = IDL.Service({
    'claimNFTCollection' : IDL.Func([IDL.Principal, IDL.Text, IDL.Nat], [], []),
    'createTemplateNFtToMint' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Nat, IDL.Nat],
        [],
        [],
      ),
    'criar_colecao' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Bool, IDL.Text, IDL.Nat, IDL.Text],
        [],
        [],
      ),
    'getAllCollectionsPage' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(Collection)],
        [],
      ),
    'getAllCollectionsPageUser' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(Collection)],
        [],
      ),
    'getNft' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Vec(IDL.Opt(IDL.Vec(IDL.Text)))],
        [],
      ),
    'getNftTemplate' : IDL.Func([IDL.Text, IDL.Nat], [], []),
    'getTotalRegCollections' : IDL.Func([], [IDL.Nat], []),
    'getTotalRegCollectionsUser' : IDL.Func([], [IDL.Nat], []),
    'get_collection_by_symbol' : IDL.Func([IDL.Text], [Collection], []),
    'get_collection_by_symbol_user' : IDL.Func([IDL.Text], [Collection], []),
    'get_collection_claims_user' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Nat],
        [IDL.Vec(Nft_Memo)],
        [],
      ),
    'get_collection_mints' : IDL.Func([IDL.Text], [IDL.Vec(Nft_Memo)], []),
    'get_collection_nft_template' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(NftCollectionTemplate)],
        [],
      ),
    'get_collection_user_claim' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Text)))],
        [],
      ),
    'icrc7_total_supply' : IDL.Func([], [IDL.Nat], []),
    'incrementTotalSupplyNFT' : IDL.Func([IDL.Text, IDL.Nat], [], []),
    'loginAdmin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'mintAndClaimNFTTemplate' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'mintNFTCollection' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'retornar_todas_colecoes' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Collection))],
        [],
      ),
    'retornar_todas_colecoes_usuario' : IDL.Func([], [IDL.Vec(Collection)], []),
    'validateMintAndClaimNFTDuplicate' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
  });
  return Main;
};
export const init = ({ IDL }) => { return []; };
