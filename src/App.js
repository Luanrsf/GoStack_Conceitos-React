import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([])
  async function handleAddRepository() {
     const response = await api.post('repositories',{  
      title:`Costa Florida Paradise ${Date.now()}`,
      url: "https://github.com/Luanrsf/CostaFloridaParadise", 
      techs: ["NodeJs"]
     })
     const repositorie = response.data;
     console.log(repositorie)
     setRepositories([...repositories,repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(repositorie=>repositorie.id!==id))
  }
  useEffect(()=>{
    api.get('repositories').then(res=>{
      setRepositories(res.data)
    })
  },[])

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repositorie=>{
              return <li key={repositorie.id}>
                  {repositorie.title}
                  <button onClick={() => handleRemoveRepository(repositorie.id)}>
                    Remover
                  </button>
                </li>  })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
