import React, { useState } from "react";
import Uifirst from "./Uifirst";
import Uisecond from "./Uisecond";

export default function Toggel({completedTasks}) {
  const [showUifirst, setShowUifirst] = useState(true);

  const handleTask = () => {
    setShowUifirst(true);
  };

  const handleCompletedTask = () => {
    setShowUifirst(false);
  };

  return (
    <div>
      <div>
        <button onClick={handleTask}>Task</button>
        <button onClick={handleCompletedTask}>Completed Task</button>
      </div>
      {showUifirst ? <Uifirst /> : <Uisecond completedTasks={completedTasks} />}

    </div>
  );
}
