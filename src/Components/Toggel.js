import React, { useState } from "react";
import Uifirst from "./Uifirst";
import Uisecond from "./Uisecond";

export default function Toggel() {
  const [showUifirst, setShowUifirst] = useState(true);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleCompletedTask = (completedTask) => {
    setCompletedTasks((prevCompletedTasks) => [
      ...prevCompletedTasks,
      completedTask,
    ]);
  };

  return (
    <div>
      <div className="toggel_Button">
       
        <button className="task_Button" onClick={() => setShowUifirst(true)}> All Task</button>
        <button className="Completed_Task" onClick={() => setShowUifirst(false)}>Completed Task</button>
     
        
      </div>
      {showUifirst ? <Uifirst onCompletedTask={handleCompletedTask} /> : <Uisecond completedTasks={completedTasks}/>}
    </div>
  );
}
