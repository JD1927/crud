import React, { useState, useEffect } from 'react';
import { isEmpty, size } from 'lodash';
import { addDocument, collections, deleteDocumentByID, getCollection, updateDocumentByID } from './actions';

function App() {
  // Use State Hook
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState('');
  const [error, setError] = useState(undefined);

  // Use Effect Hook
  useEffect(() => {
    (async () => {
      const result = await getCollection(collections?.TASKS);

      if (result?.status) {
        setTasks([...result?.data]);
      }

    })();
  }, []);


  const hasValidForm = () => {
    let isValid = true;
    setError(undefined);
    if (isEmpty(task)) {
      setError('You must enter a value.');
      isValid = false;
    }
    return isValid;
  }

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!hasValidForm(task)) { return; }

    const result = await addDocument(
      { 
        collection: collections?.TASKS,
        data: { name: task },
      }
    );

    if (!result.status) {
      setError(result.error);
      return;
    }
    const { id } = result?.data;
    setTasks([...tasks, { id, name: task }]);
    setTask('');
  };

  const handleInputChange = (e) => setTask(e.target.value);

  const handleDeleteTask = async (id) => {
    const result = await deleteDocumentByID({ collection: collections?.TASKS, id });

    if (!result?.status) {
      setError(result?.error);
      return;
    }
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks([...newTasks]);
  };

  const handleEditTask = (item) => {
    setTask(item?.name);
    setEditMode(true);
    setError(undefined);
    setId(item?.id);
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (!hasValidForm(task)) { return; }

    const result = await updateDocumentByID({
      collection: collections?.TASKS,
      id,
      data: { name: task },
    });

    if (!result?.status) {
      setError(result?.error);
      return;
    }

    const editedTasks = tasks.map((item) => item.id === id ? { id, name: task } : item);

    setEditMode(false);
    setTasks([...editedTasks]);
    setTask('');
    setId('');
  }

  return (
    <div className='container mt-5'>
      <h1>TO-DO</h1>
      <hr />
      <div className='row'>
        <div className='col-8'>
          <h2 className='text-center'>Tasks</h2>
          {size(tasks) > 0 ? (
            <ul className='list-group'>
              {tasks.map((item) => (
                <li className='list-group-item' key={item?.id}>
                  <span className='lead'>{item?.name}</span>
                  <button
                    onClick={() => handleDeleteTask(item?.id)}
                    className='btn btn-sm btn-danger float-right ml-2 rounded-pill'
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditTask(item)}
                    className='btn btn-sm btn-warning float-right rounded-pill'
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className='jumbotron'>
              <h3 className='display-4 text-center'>No scheduled tasks!</h3>
            </div>
          )}
        </div>
        <div className='col-4'>
          <h2 className='text-center'>{editMode ? 'Edit Task' : 'Add Task'}</h2>
          <form onSubmit={ editMode ? handleSaveTask : handleAddTask}>
            <input
              type='text'
              className='form-control mb-2'
              onChange={handleInputChange}
              placeholder='Add a task...'
              value={task}
            />
            {
              error && 
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            }
            <button
              type='submit'
              className={editMode ? 'btn btn-warning btn-block rounded-pill':'btn btn-dark btn-block rounded-pill'}
            >
              {editMode ? 'Save' : 'Agregar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
