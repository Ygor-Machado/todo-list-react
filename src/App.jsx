import { useState } from "react";

import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";

import "./App.css";

function App() {

  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("ASC")
  const [search, setSearch] = useState("")
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Rever a final do mundial 2012 corinthians x chelsea",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ver o corinthians jogar",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    }
  ]);

  const addTodo = (text, category) => {

    const newTodos = [...todos, {
      id: Math.floor(Math.random() * 1000),
      text,
      category,
      isCompleted: false
    }]

    setTodos(newTodos)
  }

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter(todo => todo.id !== id ? todo : null)

    setTodos(filteredTodos)
  }

  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    setTodos(newTodos)
  }

  // const filteredTodos = todos.filter((todo) =>
  //   filter === "All"
  //     ? true
  //     : filter === "Completed"
  //     ? todo.isCompleted
  //     : !todo.isCompleted
  // );

  // const sortedTodos = filteredTodos.sort((a, b) =>
  //   sort === "ASC" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
  // );

  // const searchedTodos = sortedTodos.filter((todo) =>
  //   todo.text.toLowerCase().includes(search.toLowerCase())
  // );
  
  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch}/>
      <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>
      <div className="todo-list">
         {/* {searchedTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo} />
        ))} */}
        {todos
          .filter((todo) => filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)
          .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
          .sort((a, b) => sort === "ASC" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
          .map((todo) => (
            <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo}/>
        ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;