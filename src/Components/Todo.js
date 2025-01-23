import React from "react";
import "./Todo.css";
import { useState } from "react";
import { MdDoneAll } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  //handle form submittion
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // for addind a new value 
  const addTodo = () => {
    if (todo !== ''){
      setTodos([...todos, {list: todo , id: Date.now() , status: false}]);
    setTodo("");
    }
    if(editId){
      const editTodo = todos.find((to)=>to.id === editId)
      const updateTodo = todos.map(
        (to)=>to.id === editTodo.id 
        ? (to = {id:to.id , list : todo})
        : (to= {id:to.id , list : to.list })
      )
      setTodos(updateTodo);
      setEditId(0);
      setTodo("");
    }
  };

  // for delete a value
  const onDelete = (id) =>{
    setTodos(todos.filter((to)=> to.id !==id))
  }

  //for give tick mark
  const onComplete = (id) =>{
    let complete = todos.map((to)=>{
      if(to.id === id){
        return({...to, status: !to.status})
      }
      return to
    })
    setTodos(complete)
  }

  //for edit a value
  const onEdit = (id)=>{
    const editTodo = todos.find((to)=>to.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  }

  return (
    <div className="container">
      <h2>To-do App</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          placeholder="To-dos.."
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}>{editId ? 'Edit' : 'Add'}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((to) => (
            <li className="list-items">
              <div className="list-item-list" id={to.status ? 'list-item' : ''}>{to.list}</div>
              <span>
                <MdDoneAll className="list-item-icon" id="complete" onClick={()=>onComplete(to.id)}/>
                <FaRegEdit className="list-item-icon" id="edit" onClick={()=>onEdit(to.id)}/>
                <MdDelete className="list-item-icon" id="delete" onClick={()=>onDelete(to.id)}/>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
