import HeaderAdmin from "../components/headerAdmin";

function homeAdmin() {
     
  return (
        
    <>

      <body class="bg-[#fff9e6] min-h-screen">  
        <HeaderAdmin selectedMenu={"home"} />
        <main class="bg-[#fff9e6]" >

        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-20">
            
            <div class="max-w-screen-xl text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 flex-wrap items-center justify-between mx-auto p-20" role="alert">
              <span class="font-medium">Administrator area!</span>
            </div>
            
          </div>

        </main>       
      </body>
    </>          
  );
}

export default homeAdmin;