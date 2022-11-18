import { useState } from "react";
import Plus from "./assets/plus.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";


function App() {
  const addNotify = (value) => toast.success(`เพิ่มข้อมูล${value}แล้วครับ`,{ autoClose: 1500 },{
    icon: "🚀"});
  const deleteNotify = (value) => toast.error(`ลบข้อมูล${value}แล้วครับ`,{ autoClose: 1500 })

  
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const [check, setCheck] = useState(false);
  const [fix, setFix] = useState(false);
  const [value, setValue] = useState("");
  const [todoList, setTodoList] = useState(todos);

  const onAdd = (todo) => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos?.push({title:todo, check:false ,fix:false });
    setTodoList(todos)    
    addNotify(value) 
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
      className="min-h-[100vh] border flex items-center border-black flex-col gap-1 
    bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 "
    ><label className="  p-10 rounded-sm mt-8 text-7xl  bg-clip-text text-transparent bg-gradient-to-r from-purple-500  to-pink-400">Todolist</label>
       <div>
        <ToastContainer />
      </div>
      <div className="relative   flex w-[40%]">
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="w-full p-3 border border-gray-400 rounded text-blue-900 hover:border-blue-300   "
        />
        <div className="absolute -top-1  left-[99%] w-14 ml-3">
    
           <img
            className="cursor-pointer"
            onClick={() => {
              onAdd(value)
            }}
            src={Plus}
          />
        </div>
      </div>
      {todoList.map((item, index) => (
        <div className="p-4 w-[40%] gap-3">
          <div className="flex gap-[2px] h-[2.5rem] bg-white border rounded border-gray-300 ">
            <input 
            value={item.title} 
            disabled={item.check || !item.fix }
            onChange= {(e )=> onChangeTodo(e,index)
                
            }
            className="w-full pl-3  text-blue-500"/>
            <div
              className={`flex items-center cursor-pointer  ${
                item.check ? "bg-green-400" : "bg-transparent"
              }`}
              onClick={() => {
                onCheck(index) 
               
              }
            }
            >
              <i
                className={`p-2 material-icons-round text-[1.5rem] 
                lg:text-[1.125rem] ${item.check ? "text-white" : "text-black"}`}
             
             >
                done
              </i>
            </div>

            <div
              className={`flex items-center cursor-pointer ${
                item.fix ? "bg-blue-500" : "bg-transparent"
              }`}
              onClick={() => onModify(index)}
            >
              <i
                className={`p-2  material-icons-round text-[1.5rem] 
                lg:text-[1.125rem] ${item.fix  ? "text-white" : "text-black"}`}
              >
                build
              </i>
            </div>
            <div
              className={`p-2  flex items-center cursor-pointer bg-red-500`}
              onClick={() => {onDelete(index)
                deleteNotify(item.title)}
                }
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
