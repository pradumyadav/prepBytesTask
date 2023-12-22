import React from "react";
import { FaSearch, FaFire } from "react-icons/fa";

const Uisecond = ({ completedTasks }) => {
  return (
    <div>
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
        <ul className="ul">
          {completedTasks.map((task) => (
            <li key={task.id}>
              <FaFire /> {task.title} <FaFire />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Uisecond;
