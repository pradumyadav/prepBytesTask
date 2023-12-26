import React from "react";
import { FaSearch} from "react-icons/fa";

const Uisecond = ({ completedTasks }) => {
  return (
    <div className="second_Parent">
      {completedTasks && completedTasks.length === 0 ? (
        <div className="empty-state">
          <div>
            <h3>No completed tasks found</h3>
          </div>
          <div className="search-animation">
            <FaSearch />
          </div>
        </div>
      ) : (
        <ul  type="none" className="ul">
          {completedTasks.map((task) => (
            <li key={task.id}>
               {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Uisecond;
