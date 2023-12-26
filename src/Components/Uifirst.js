import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";

export default function Uifirst({ onCompletedTask }) {
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
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );

    setData(updatedData);
    onCompletedTask(taskToComplete);
  };

  return (
    <>
    <div className="parent">
      <div className="input_Parent">
        <input
          className="Add_Task_Input"
          type="text"
          value={input}
          placeholder="Add   Task"
          onChange={handleChange}
          required
        />
        <button
          className="Add_Task_Button"
          onClick={editableTaskId ? handleSaveEdit : handleClick}
        >
          {editableTaskId ? "Save Edit" : "Add Task"}
        </button>

        {editableTaskId && (
          <button
            className="Add_Task_Button"
            onClick={handleCancelEdit}
          >
            Cancel Edit
          </button>
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
                  className={`main_Title ${item.completed ? "completed" : ""}`}
                  onClick={() => handleComplete(item.id)}
                >
                  {item.title}
                
                </div>
                
              )}
              <div className="edit_Delete_Button">
                <button
                  className="button"
                  onClick={() => handleEdit(item.id)}
                >
                  <LiaEditSolid className="edit_Button" />
                </button>
                <button
                  className="button"
                  onClick={() => handleDelete(item.id)}
                >
                  <MdDelete className="delete_Button" />
                </button>
               
              </div>
               <hr/>
            </div>
            
          ))}
      </div>
      </div>
    </>
  );
}
