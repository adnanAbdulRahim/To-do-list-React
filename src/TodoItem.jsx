export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
    //IMPORTANT to pass a function to onClick  which calls deleteTodo(id) otherise it will keep deleting on loop.
    return (
      <li>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={e => toggleTodo(id, e.target.checked)}
          />
          {title}
        </label>
        <button onClick={() => deleteTodo(id)} className="btn btn-danger">
          Delete
        </button>
      </li>
    )
  }