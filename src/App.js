import React from 'react'
import "./styles.css";

export default function App() {
  
  const [todos, setTodos] = React.useState([
    { id: 1, text: "wash dishes", done: false, archived:false },
    { id: 2, text: "Do laundry", done: false, archived:false },
    { id: 3, text: "Take shower", done: false, archived:false },
  ]);
  
  return (
    <div className="App">
      <div className="todoList">
        <h1>Todo List</h1>
        <TodoList
          todos = {todos}
          setTodos = {setTodos}
        />
        <AddTodo
          todos = {todos}
          setTodos={setTodos}
        />
            </div>
      </div>
  );
}

function TodoList({ todos, setTodos }){
  
  function handleToggleTodo(todo){
    const updatedTodos = todos.map((t) => 
      t.id === todo.id
      ? {
        ...t, 
        done: !t.done
      }
      : t
    );
    setTodos(updatedTodos)
  }


  return (
    <ul>
      {todos.map(todo => (
        <li 
          key={todo.id}
          style = {{
            textDecoration: todo.done ? 'line-through' : "",
            display: todo.archived ? "none": "",
          }}
          onDoubleClick = {() => handleToggleTodo(todo)}
        >
          {todo.text}
          <DeleteTodo 
            todos = {todos}
            setTodos = {setTodos}
            todo = {todo} 
          />
        </li>
      ))}
    </ul>
  );
}

function AddTodo({todos, setTodos }) {
  const inputRef = React.useRef()

  function handleAddTodo(event) {
    event.preventDefault();
    
    let newId = 0;
    for (let i = 0; i < todos.length; i++){
      newId = todos[i]['id'] > newId ? todos[i]['id'] : newId;
    } 
    newId += 1

    // const text = event.target.elements.AddTodo.value;
    const todo = {
      id: newId,
      text: inputRef.current.value,
      done:false,
      archived:false,
    };
    
    setTodos(prevTodos => {
      return prevTodos.concat(todo)
    });
    inputRef.current.value = "";
  }

  return (
    <form
      onSubmit={handleAddTodo}
    >
      <input 
        name = "addTodo"
        placeholder="Add todo" 
        ref = {inputRef}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

function DeleteTodo({todo, todos, setTodos }) {
  
  function handleDeletetodo(todo) {
    const updatedTodos = todos.map((t) => 
      t.id === todo.id
      ? {
        ...t, 
        archived: !t.archived
      }
      : t
    );
    setTodos(updatedTodos)
  }


  return (
    <span
      onClick = {() => handleDeletetodo(todo)} 
      role = "button"
      style = {{
        color: "red",
        fontWeight: "bold",
        marginLeft: "10px",
        cursor: "pointer",
      }}
    >
      X
    </span>
  );
}