// Uifirst.js
import { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";
import Uisecond from "./Uisecond";

export default function Uifirst() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    if (input.trim() !== "") {
      const newTask = {
        userId: 1,
        id: data.length + 1,
        title: input,
        completed: false,
      };

      setData((prevData) => [...prevData, newTask]);
      setInput("");
    }
  };

  const handleEdit = (taskId) => {
    setEditableTaskId(taskId);
    const taskToEdit = data.find((item) => item.id === taskId);
    setInput(taskToEdit.title);
  };

  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
      item.id === editableTaskId ? { ...item, title: input } : item
    );

    setData(updatedData);
    setEditableTaskId(null);
    setInput("");
  };

  const handleCancelEdit = () => {
    setEditableTaskId(null);
    setInput("");
  };

  const handleDelete = (taskId) => {
    const updatedData = data.filter((item) => item.id !== taskId);
    setData(updatedData);
    setEditableTaskId(null);
    setInput("");
  };

  const handleComplete = (taskId) => {
    const taskToComplete = data.find((item) => item.id === taskId);
    const updatedData = data.map((item) =>
      item.id === taskId ? { ...item, completed: true } : item
    );

    setData(updatedData);
    setCompletedTasks((prevCompletedTasks) => [
      ...prevCompletedTasks,
      taskToComplete,
    ]);
  };

  return (
    <>
      <div>
        <input type="text" value={input} onChange={handleChange} required />
        <button onClick={editableTaskId ? handleSaveEdit : handleClick}>
          {editableTaskId ? "Save Edit" : "Add Task"}
        </button>
        {editableTaskId && (
          <button onClick={handleCancelEdit}>Cancel Edit</button>
        )}
      </div>
      <div className="first_Parent">
        {data &&
          data.map((item) => (
            <div className="first_child" key={item.id}>
              {editableTaskId === item.id ? (
                <input
                  type="text"
                  value={input}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div
                  style={{
                    color: item.completed ? "green" : "red",
                    cursor: "pointer",
                  }}
                  onClick={() => handleComplete(item.id)}
                >
                  {item.title}
                </div>
              )}
              <div>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
      <Uisecond completedTasks={completedTasks} />
    </>
  );
}
