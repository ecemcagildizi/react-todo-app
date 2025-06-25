import { useState } from 'react';

function App(){
  const[showInput, setShowInput] = useState(false);
  const[title, setTitle] = useState('');
  const[description, setDescription] = useState('');
  const[tasks, setTasks] = useState([]);
  const[editingIndex, setEditingIndex] = useState(null);
  const[selectedTask, setSelectedTask] = useState(null);

  const addOrUpdateTask = () => {
    if(!title.trim() || !description.trim()) return;

    const newTask = {
      title,
      description,
      done : false
    };

    if (editingIndex !== null){
      updateTask(editingIndex, {...tasks[editingIndex], ...newTask});
      setEditingIndex(null);
    }else{
      setTasks([...tasks, newTask]);
    }

    setTitle('');
    setDescription('');
    setShowInput(false);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i)=> i !== index));
  };

  const editTask = (index) => {
    setDescription(tasks[index].description);
    setTitle(tasks[index].title);
    setEditingIndex(index);
    setShowInput(true);
  };

  const updateTask = (index, newTask) => {
    setTasks(tasks.map((task, i) => {
      if (i === index) {
        return { ...task, ...newTask };
      }
      return task;
    }));
  };


  return (
    <div style={{
      backgroundColor: '#2e2e3e',
      padding : "30px",
      borderRadius : "12px",
      width : "100%",
      maxWidth : "600px",
      boxShadow : "0 0 20px rgba(0,0,0,0.4)"
    }}>
      <button onClick={() => {
        setShowInput(true);
        setEditingIndex(null);
        setTitle('');
        setDescription('');
      }}>
        Create New Task
      </button>
  
      {showInput && (
        <div>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginBottom: '10px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginBottom: '10px',
              fontSize: '16px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
          <button onClick={addOrUpdateTask}>
            {editingIndex !== null ? 'Update Task' : 'Save Task'}
          </button>
        </div>
      )}

      <table style={{
        width : "100%",
        borderCollapse : "collapse",
        marginTop : "20px",
        backgroundColor : "#3a3a4a",
        borderRadius : "8px",
        overflow : "hidden"
      }}>
        <thead style={{ backgroundColor: "#444", color: "#fff" }}>
        <tr>
          <th style={{ padding: "10px" }}>Done</th>
          <th style={{ padding: "10px" }}>Title</th>
          <th style={{ padding: "10px" }}>Description</th>
          <th style={{ padding: "10px" }}>Actions</th>
        </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr
              key={i}
              onClick={() => {
                if (selectedTask === task) {
                  setSelectedTask(null); 
                } else {
                  setSelectedTask(task);
                }
              }}
              style={{ cursor: 'pointer', backgroundColor: selectedTask === task ? '#444' : 'black' }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={task.done}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => {
                    const updated = [...tasks];
                    updated[i].done = !updated[i].done;
                    setTasks(updated);
                  }}
                />
              </td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <button onClick={(e) => {
                  e.stopPropagation();
                  editTask(i);
                }}>Update</button>
                <button onClick={(e) => {
                  e.stopPropagation();
                  removeTask(i);
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTask && (
          <div style={{
            marginTop: '20px',
            backgroundColor: '#2e2e3e',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <p><strong>Title:</strong> {selectedTask.title}</p>
            <p><strong>Description:</strong> {selectedTask.description}</p>
          </div>
        )}
    </div>
  );
}

export default App;
