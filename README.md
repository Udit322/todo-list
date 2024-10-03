## Day 1

### **1. Functional Component Syntax**

```jsx
function App() {
  // component logic and return statement here
}
```

- **`function App()`**: As before, this defines a **functional component** in React. We use hooks like `useState` inside this component to manage states such as the list of tasks, the input field, and the temporary text being edited.

---

### **2. useState Hook Syntax**

```jsx
const [tasks, setTasks] = useState([]);
const [input, setInput] = useState("");
const [editingText, setEditingText] = useState("");
```

- **`const [tasks, setTasks] = useState([])`**: Initializes `tasks` as an empty array and `setTasks` as the function to update it. It holds the list of tasks.

- **`const [input, setInput] = useState('')`**: This holds the text that the user types into the input field to add a new task.

- **`const [editingText, setEditingText] = useState('')`**: This new piece of state stores the text temporarily while the user is editing a task. It allows users to type and modify the task text without immediately updating the `tasks` state.

---

### **3. addTask Function**

```jsx
const addTask = () => {
  if (input) {
    setTasks([...tasks, { id: Date.now(), text: input, isEditing: false }]);
    setInput("");
  }
};
```

- **`if (input)`**: Ensures that a task is added only if the input field isn’t empty.

- **`setTasks([...tasks, { id: Date.now(), text: input, isEditing: false }])`**: Uses the spread operator (`...tasks`) to copy the current tasks and adds a new task object with an ID, the task text (`input`), and `isEditing` set to `false`.

- **`setInput('')`**: After adding the task, the input field is cleared.

---

### **4. deleteTask Function**

```jsx
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id));
};
```

- **`setTasks(tasks.filter((task) => task.id !== id))`**: The `filter()` method creates a new array that excludes the task with the matching `id`, effectively deleting it.

---

### **5. handleEditChange Function**

```jsx
const handleEditChange = (e) => {
  setEditingText(e.target.value); // Update temporary text while typing
};
```

- **`setEditingText(e.target.value)`**: Updates the `editingText` state as the user types in the input field while editing a task. This is what enables real-time typing without saving changes to the task immediately.

---

### **6. saveEditTask Function**

```jsx
const saveEditTask = (id) => {
  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, text: editingText, isEditing: false } : task
    )
  );
  setEditingText(""); // Clear the temporary text after saving
};
```

- **`tasks.map((task) => task.id === id ? { ...task, text: editingText, isEditing: false } : task)`**:

  - The `map()` function iterates over the `tasks` array and returns a new array.
  - For the task that matches the `id`, we update its `text` to the value in `editingText` and set `isEditing` to `false` to end the edit mode.
  - For other tasks, the task object remains unchanged.

- **`setEditingText('')`**: Resets the temporary `editingText` after the task is saved.

---

### **7. toggleEditTask Function**

```jsx
const toggleEditTask = (id, currentText) => {
  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, isEditing: !task.isEditing } : task
    )
  );
  setEditingText(currentText); // Set temporary text when entering edit mode
};
```

- **`tasks.map()`**: The `map()` function returns a new array where the task with the matching `id` has its `isEditing` property toggled (i.e., switches between `true` and `false`).
- **`setEditingText(currentText)`**: When the user enters the edit mode (double-clicking the task), we set the `editingText` to the task’s current text so the input field can display it for editing.

---

### **8. JSX (JavaScript XML) Syntax**

```jsx
return (
  <div>
    <h1>To-Do List</h1>
    <input value={input} onChange={(e) => setInput(e.target.value)} />
    <button onClick={addTask}>Add Task</button>
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.isEditing ? (
            <input
              value={editingText} // Binds input field to temporary editing text
              onChange={handleEditChange} // Update text while typing
              onBlur={() => saveEditTask(task.id)} // Save when focus is lost
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEditTask(task.id); // Save when "Enter" is pressed
              }}
              autoFocus
            />
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
```

#### Key Changes:

- **`value={editingText}`**: The input field’s value is bound to the `editingText` state, which holds the temporary text for the task being edited.

- **`onChange={handleEditChange}`**: This updates the `editingText` as the user types, but it doesn’t affect the main `tasks` state immediately.

- **`onBlur={() => saveEditTask(task.id)}`**: When the input field loses focus (e.g., the user clicks elsewhere), the task is saved by calling `saveEditTask`.

- **`onKeyDown={(e) => { if (e.key === 'Enter') saveEditTask(task.id); }}`**: This listens for the "Enter" key press. If the user presses "Enter", the task is saved immediately.

- **`onDoubleClick={() => toggleEditTask(task.id, task.text)}`**: When the user double-clicks a task, the `toggleEditTask` function is called to switch the task to edit mode and set the temporary text (`editingText`) to the task’s current text.

---
