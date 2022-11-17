import { useState } from "react";
import Plus from "./assets/plus.png";

import "./App.css";

function App() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const [check, setCheck] = useState(false);
  const [fix, setFix] = useState(false);
  const [value, setValue] = useState("");
  const [todoList, setTodoList] = useState(todos);

  const onAdd = (todo) => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos?.push({title:todo, check:false ,fix:false });
    setTodoList(todos)
    localStorage.setItem("todos", JSON.stringify(todos));
    setValue("");
  };

  const onDelete = (index) => {
    const newTodoList = todoList.filter((item, id) => index !== id);
    setTodoList(newTodoList);
    localStorage.setItem("todos", JSON.stringify(newTodoList));
  };
  const onCheck = (index) => {
    const newTodoList = [...todoList]
    newTodoList[index].check  =      !newTodoList[index].check 
    setTodoList(newTodoList);
    localStorage.setItem("todos", JSON.stringify(newTodoList));
  };
  const onChangeTodo = (e,index) =>{
    const newTodoList = [...todoList]
    newTodoList[index].title = e.target.value
    setTodoList(newTodoList);
    localStorage.setItem("todos", JSON.stringify(newTodoList));
  }

  const onModify = (index) =>{
    const newTodoList = [...todoList]
    newTodoList[index].fix  =      !newTodoList[index].fix
    setTodoList(newTodoList);
    localStorage.setItem("todos", JSON.stringify(newTodoList));

  }
  return (
    <div
      className="min-h-[100vh] border flex items-center border-black flex-col gap-9 
    bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 "
    >
      <div className="relative mt-[5rem] flex w-[40%]">
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="w-full p-3 border border-black rounded"
        />
        <div className="absolute top-0  left-[99%] w-14 ml-3">
          <img
            className="cursor-pointer"
            onClick={() => onAdd(value)}
            src={Plus}
          />
        </div>
      </div>
      {todoList.map((item, index) => (
        <div className="w-[30%] border border-black">
          <div className="flex bg-white border rounded border-black">
            <input 
            value={item.title} 
            disabled={item.check || !item.fix }
          onChange= {(e )=> onChangeTodo(e,index)}
            
            
            className="w-full"/>
            <div
              className={`flex items-center cursor-pointer border border-black ${
                item.check ? "bg-green-600" : "bg-transparent"
              }`}
              onClick={() => onCheck(index)}
            >
              <i
                className={`material-icons-round text-[1.5rem] 
                lg:text-[1.125rem] ${item.check ? "text-white" : "text-black"}`}
             
             >
                done
              </i>
            </div>

            <div
              className={`flex items-center cursor-pointer border border-black ${
                item.fix ? "bg-blue-600" : "bg-transparent"
              }`}
              onClick={() => onModify(index)}
            >
              <i
                className={`material-icons-round text-[1.5rem] 
                lg:text-[1.125rem] ${item.fix  ? "text-white" : "text-black"}`}
              >
                build
              </i>
            </div>
            <div
              className={`flex items-center cursor-pointer border border-black bg-red-600`}
              onClick={() => onDelete(index)}
            >
              <i
                className={`material-icons-round text-[1.5rem] 
                lg:text-[1.125rem] text-white`}
              >
                delete_forever
              </i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
