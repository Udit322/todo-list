import React, { useState } from "react";
import "./App.css"; // Import the CSS file for styling

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingText, setEditingText] = useState("");

  // Function to add a new task
  const addTask = () => {
    if (!input.trim()) return; // Prevent empty tasks
    setTasks([...tasks, { id: Date.now(), text: input, isEditing: false }]);
    setInput(""); // Clear input after adding task
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to update the temporary text while editing a task
  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  // Function to save the edited task
  const saveEditTask = (id) => {
    if (!editingText.trim()) return; // Prevent saving empty edits
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText, isEditing: false } : task
      )
    );
    setEditingText(""); // Clear the temporary text after saving
  };

  // Function to toggle edit mode and set initial edit text
  const toggleEditTask = (id, currentText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
    setEditingText(currentText); // Set temporary text when entering edit mode
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>

      {/* Form for adding new tasks */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission behavior
          addTask(); // Call addTask function when form is submitted
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state on typing
          placeholder="Enter a new task"
        />
        <button type="submit" disabled={!input.trim()}>
          Add Task
        </button>
      </form>

      {/* Displaying the list of tasks */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.isEditing ? (
              <>
                <input
                  className={task.isEditing ? "editing" : ""} // Highlight input when editing
                  value={editingText}
                  onChange={handleEditChange}
                  onBlur={() => saveEditTask(task.id)} // Save task when focus is lost
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEditTask(task.id); // Save task on Enter key press
                  }}
                  autoFocus
                />
                <button onClick={() => toggleEditTask(task.id, task.text)}>
                  Cancel
                </button>{" "}
                {/* Cancel editing */}
              </>
            ) : (
              <span onDoubleClick={() => toggleEditTask(task.id, task.text)}>
                {task.text}
              </span>
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
