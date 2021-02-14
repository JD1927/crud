import React, { useState } from "react";
import { isEmpty } from "lodash";
import { v4 as uuid } from "uuid";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    if (isEmpty(task)) {
      console.log('Task empty');
      return;
    }
    const newTask = {
      id: uuid(),
      name: task,
    };

    setTasks([...tasks, newTask]);
    setTask('');
    console.table(tasks);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h1>TO-DO</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h2 className="text-center">Tasks</h2>
          <ul className="list-group">
            {
              tasks.map((task) => (
                <li className="list-group-item" key={task?.id}>
                  <span className="lead">{task?.name}</span>
                  <button className="btn btn-sm btn-danger float-right ml-2 rounded-pill">
                    Delete
                  </button>
                  <button className="btn btn-sm btn-warning float-right rounded-pill">
                    Edit
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-4">
          <h2 className="text-center">Form</h2>
          <form onSubmit={addTask}>
            <input
              type="text"
              className="form-control mb-2"
              onChange={handleChange}
              placeholder="Add a task..."
              value={task}
            />
            <button
              type="submit"
              className="btn btn-dark btn-block rounded-pill"
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
