//class is reservered in .jsx keyword so we use className.
//Can use Fragments (<></>) to return multiple components from a component.

import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

export default function App() {
  //localStorage.getItem() retrieves item from local storage so data isn't lost.
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  //useEffect event listener paired with localStorage.setItem() allows us to store information in local storage anytime [todo] array has a change.
  //make SURE to use hook at the top of the file to not run into errors eg:useEffect(), useState().
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  //pass in a function anytime you want to use 'CURRENT' value ootherwise just pass set value.
  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }
  //To toggle we are checking our current todo's so we use a function then mapping onto array to check each todo's id to toggle it
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  //To delete we are also taking our current todo's so we use a function and filter out the one with the matching id.
  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    //<NewTodoForm> is a compenent imported from another file at the top of the code, components start with Capital letter
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}