import React, { useState, useEffect } from "react";
import "./Todo.css"; // You can add styling here if needed

function Todo() {
  // State to manage the list of tasks and the current input
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null); // For editing tasks
  const [editText, setEditText] = useState(""); // The temporary text for editing

  // Add a new task
  const addTask = () => {
    if (input) {
      setTasks([...tasks, { id: Date.now(), text: input }]);
      setInput("");
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Start editing a task
  const startEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  // Save the edited task
  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: editText } : task))
    );
    setEditId(null);
    setEditText("");
  };

  // Cancel editing a task
  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      {/* Input for adding a new task */}
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask} disabled={!input}>
          Add Task
        </button>
      </div>

      {/* List of tasks */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {editId === task.id ? (
              <>
                {/* Input for editing the task */}
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(task.id)} disabled={!editText}>
                  Save
                </button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {/* Display the task */}
                <span>{task.text}</span>
                <button onClick={() => startEditing(task.id, task.text)}>
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
