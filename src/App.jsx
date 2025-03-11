import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./components/Button";
import InputField from "./components/InputField";
import TaskCard from "./components/TaskCard";
import './App.css';

const API_URL = "http://127.0.0.1:8000/api/tasks"; // Laravel API URL
// const API_URL = "http://127.0.0.1:9999/api/tasks"; // ❌ Wrong port to force failure

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch tasks from Laravel API when component mounts (Updated)
  useEffect(() => {
    setLoading(true);
    axios.get(API_URL)
      .then(response => {
        if (!response.data || response.status !== 200) {
          throw new Error("Invalid API response"); // ❗Force error if API behaves weirdly
        }
        setTasks(response.data);
        setError(null);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
        setTasks([]); // Clear tasks if API fails
        setError("Failed to load tasks. The server may be down.");
      })
      .finally(() => setLoading(false));
  }, []);
  
  

  // ✅ Add a new task
  const addTask = () => {
    if (taskName.trim() === "") return;
    setLoading(true);
    axios.post(API_URL, { name: taskName, completed: false })
      .then(response => {
        setTasks(prevTasks => [...prevTasks, response.data]);
        setTaskName("");
        setError(null);
      })
      .catch(error => {
        console.error("Error adding task:", error);
        alert("Failed to add task. The server may be down."); // ❗Alert user
        setError("Failed to add task. The server may be down.");
      })
      .finally(() => setLoading(false));
  };
  

  // ✅ Delete a task
  const deleteTask = (id) => {
    setLoading(true);
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        setError(null);
      })
      .catch(error => {
        console.error("Error deleting task:", error);
        alert("Failed to delete task. The server may be down."); // ❗Alert user
        setError("Failed to delete task. The server may be down.");
      })
      .finally(() => setLoading(false));
  };  

  // ✅ Toggle task completion
  const toggleTaskCompletion = (id) => {
    setLoading(true);
    axios.patch(`${API_URL}/${id}`)
      .then(response => {
        setTasks(prevTasks => prevTasks.map(task =>
          task.id === id ? response.data : task
        ));
        setError(null);
      })
      .catch(error => {
        console.error("Error toggling task:", error);
        alert("Failed to update task. Please try again.");
        setError("Failed to update task. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-4">🚀 GetSh*tDone</h1>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-yellow-400">Loading...</p>}

      <div className="flex gap-2">
        <InputField
          placeholder="Enter a task..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="bg-gray-700 text-white"
        />
        <Button text="Add Task" onClick={addTask} className="bg-blue-500 text-white" />
      </div>

      <div className="mt-5 w-full max-w-md space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => deleteTask(task.id)}
            onToggle={() => toggleTaskCompletion(task.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
