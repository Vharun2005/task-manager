

import {  useState } from 'react';
import TodoList from './TodoList';

function App() {
  const [Search,Setsearch] = useState('')
  const[tasksarr,setTaskarr] = useState([])
      
  
  return (
   <div>
    <TodoList tasksarr={tasksarr.filter((item) => (item.task.toLowerCase()).includes(Search.toLowerCase()))} setTaskarr={setTaskarr} Search={Search} Setsearch={Setsearch} />
   </div>
  );
}

export default App;
