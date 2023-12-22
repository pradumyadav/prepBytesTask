
import React from "react";

const Uisecond = ({ completedTasks }) => {
  return (
    <div>
  
      <ul>
        {completedTasks && completedTasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Uisecond;
