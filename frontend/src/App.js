import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos when page loads
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // 👉 THIS is the function you asked about
  const addTodo = async () => {
    const res = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: "New Todo from UI",
        priority: "medium"
      })
    });

    const data = await res.json();
    setTodos([...todos, data]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      {/* Button to trigger addTodo */}
      <button onClick={addTodo}>Add Todo</button>

      {/* Display todos */}
      {todos.map(todo => (
        <div key={todo._id}>
          {todo.title} - {todo.priority}
        </div>
      ))}
    </div>
  );
}

export default App;