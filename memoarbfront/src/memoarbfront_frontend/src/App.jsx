import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Site from './pages/site';
import Home from './pages/home';
import About from './pages/about';
import MyMemos from './pages/mymemos';
import MyCollections from './pages/myCollections';
import CollectionNft from './pages/collectionNft';
import MintNftCollection from './pages/mintNftCollection';
import Claimnftcollection from './pages/claimnftcollection';
import MintSuccess from './pages/mintSuccess';
import CreateMemo from './pages/creatememo';
import MemoAdmin from './pages/memoAdmin';
import Memo from './pages/memo';

import SiteAdmin from './pages/siteAdmin';
import HomeAdmin from './pages/homeAdmin';
import MyCollectionsAdmin from './pages/myCollectionsAdmin';
import CollectionNftAdmin from './pages/collectionNftAdmin';
import CreateNFTCollectionAdmin from './pages/createNFTCollectionAdmin';

import AuthAdmin from './pages/authadmin';

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/login";

function App(){

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Site/>} />
        <Route path="/auth/" element={<AuthAdmin/>} />
        <Route path="/login/" element={<Login/>} />
        <Route path="/home/" element={<Home/>} />
        <Route path="/homeAdmin/" element={<HomeAdmin/>} />
        <Route path="/about/" element={<About/>} />
        <Route path="/mymemos/" element={<MyMemos/>} /> 
        <Route path="/mycollections/" element={<MyCollections/>} />
        <Route path="/mycollectionsAdmin/" element={<MyCollectionsAdmin/>} />
        <Route path="/collectionNft/:idCollection" element={<CollectionNft/>} />
        <Route path="/collectionNftAdmin/:idCollection" element={<CollectionNftAdmin/>} />
        <Route path="/mintNftCollection/:idCollection" element={<MintNftCollection/>} />        
        <Route path="/claimnftcollection/:idCollection/:idToken" element={<Claimnftcollection/>} />                
        <Route path="/mintSuccess/" element={<MintSuccess/>} />
        <Route path="/creatememo/" element={<CreateMemo/>} />         
        <Route path="/createNFTCollectionAdmin/" element={<CreateNFTCollectionAdmin/>} />
        <Route path="/admin/" element={<SiteAdmin/>} />     
        <Route path="/memoadmin/:symbolCollection/:idTemplate" element={<MemoAdmin/>} />
        <Route path="/memo/:symbolCollection/:idnft" element={<Memo/>} />           
      </Routes>
    </Router>

  );

}

export default App;
