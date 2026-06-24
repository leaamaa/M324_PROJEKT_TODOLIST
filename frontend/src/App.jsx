import { useEffect, useState } from 'react'
import logo from './assets/react.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [taskdescription, setTaskdescription] = useState("");
  const [groups, setGroups] = useState(["Allgemein"]);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Allgemein");

  const handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:8080/api/v1/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskdescription: taskdescription })
    })
    .then(() => {
      setTaskdescription("");
      fetchTodos();
    })
    .catch(error => console.log(error))
  }

  const handleChange = event => setTaskdescription(event.target.value);

  const fetchTodos = () => {
    fetch("http://localhost:8080/api/v1/").then(r => r.json()).then(data => setTodos(data));
  }

  useEffect(() => { fetchTodos(); }, []);

  const handleDelete = (event, taskdescription) => {
    fetch("http://localhost:8080/api/v1/delete", {
      method: "POST",
      body: JSON.stringify({ taskdescription }),
      headers: { "Content-Type": "application/json" }
    })
    .then(() => fetchTodos())
    .catch(error => console.log(error))
  }

  const toggleTodo = (taskdescription) => {
    fetch("http://localhost:8080/api/v1/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskdescription })
    })
    .then(() => fetchTodos())
    .catch(error => console.log(error));
  }

  const handleAddGroup = () => {
    if (newGroupName.trim() && !groups.includes(newGroupName.trim())) {
      setGroups([...groups, newGroupName.trim()]);
      setNewGroupName("");
    }
  }

  const handleDeleteGroup = (groupName) => {
    if (groupName === "Allgemein") return;
    setGroups(groups.filter(g => g !== groupName));
    if (selectedGroup === groupName) setSelectedGroup("Allgemein");
  }

  // todos filtered by selected group (stored locally as group property)
  const [todoGroups, setTodoGroups] = useState({});

  const assignGroup = (taskdescription, group) => {
    setTodoGroups(prev => ({ ...prev, [taskdescription]: group }));
  }

  const getTodoGroup = (taskdescription) => todoGroups[taskdescription] || "Allgemein";

  const filteredTodos = selectedGroup === "Alle"
    ? todos
    : todos.filter(todo => getTodoGroup(todo.taskdescription) === selectedGroup);

  const renderTasks = (todos) => (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li key={todo.taskdescription}>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {"Task " + (index + 1) + ": " + todo.taskdescription}
          </span>
          <select
            value={getTodoGroup(todo.taskdescription)}
            onChange={e => assignGroup(todo.taskdescription, e.target.value)}
            className="group-select"
          >
            {groups.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <button onClick={() => toggleTodo(todo.taskdescription)}>
            {todo.completed ? "✅" : "⬜"}
          </button>
          <button onClick={(event) => handleDelete(event, todo.taskdescription)}>🗑️</button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>ToDo Liste</h1>

        <form onSubmit={handleSubmit} className="todo-form">
          <label>Neues Todo anlegen:</label>
          <input type="text" value={taskdescription} onChange={handleChange} />
          <button type="submit">Absenden</button>
        </form>

        <div className="group-section">
          <h2>Gruppen</h2>
          <div className="group-input">
            <input
              type="text"
              placeholder="Neue Gruppe..."
              value={newGroupName}
              onChange={e => setNewGroupName(e.target.value)}
            />
            <button onClick={handleAddGroup}>+ Gruppe</button>
          </div>
          <div className="group-tabs">
            <button
              className={selectedGroup === "Alle" ? "tab active" : "tab"}
              onClick={() => setSelectedGroup("Alle")}
            >Alle</button>
            {groups.map(g => (
              <div key={g} className="tab-wrapper">
                <button
                  className={selectedGroup === g ? "tab active" : "tab"}
                  onClick={() => setSelectedGroup(g)}
                >{g}</button>
                {g !== "Allgemein" && (
                  <button className="tab-delete" onClick={() => handleDeleteGroup(g)}>✕</button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>{renderTasks(filteredTodos)}</div>
      </header>
    </div>
  );
}

export default App