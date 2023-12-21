import { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";

export default function Uifirst() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [editableTaskId, setEditableTaskId] = useState(null);

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
    // Set the taskId to make it editable
    setEditableTaskId(taskId);

    // Find the task with the specified ID and set its title as the current input
    const taskToEdit = data.find((item) => item.id === taskId);
    setInput(taskToEdit.title);
  };

  const handleSaveEdit = () => {
    // Find the task with the editableTaskId and update its title
    const updatedData = data.map((item) =>
      item.id === editableTaskId ? { ...item, title: input } : item
    );

    setData(updatedData);
    setEditableTaskId(null);
    setInput("");
  };

  const handleCancelEdit = () => {
    // Cancel the edit mode
    setEditableTaskId(null);
    setInput("");
  };

  const handleDelete = (taskId) => {
    // Filter out the task with the specified ID
    const updatedData = data.filter((item) => item.id !== taskId);
    setData(updatedData);
    setEditableTaskId(null);
    setInput("");
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
                <div>{item.title}</div>
              )}
              <div>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
