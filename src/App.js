import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';

const KanbanBoard = () => {
  const initialTasks = JSON.parse(localStorage.getItem('kanbanTasks')) || [
    { id: uuid(), title: 'Task 1', description: 'This is Task 1', status: 'todo', deadline: '2024-06-30T12:00' },
    { id: uuid(), title: 'Task 2', description: 'This is Task 2', status: 'inprogress', deadline: '2024-07-01T14:00' },
    { id: uuid(), title: 'Task 3', description: 'This is Task 3', status: 'done', deadline: '2024-07-02T16:00' },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'todo', deadline: '' });
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    setTasks([...tasks, { ...newTask, id: uuid() }]);
    setNewTask({ title: '', description: '', status: 'todo', deadline: '' });
  };

  const handleMoveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editTask.id ? editTask : task
    );
    setTasks(updatedTasks);
    setEditTask(null);
  };

  return (
    <div className="kanban-board">
      <h1>JiraTask Planner</h1>
      <div className="board-container">
        <div className="column">
          <h2>Todo</h2>
          {tasks.map(
            (task) =>
              task.status === 'todo' && (
                <div key={task.id} className="card todo">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
                  <button onClick={() => handleMoveTask(task.id, 'inprogress')}>Move to In Progress</button>
                  <button onClick={() => handleEditTask(task)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              )
          )}
          <div className="card new-task">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
              type="datetime-local"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
        <div className="column">
          <h2>In Progress</h2>
          {tasks.map(
            (task) =>
              task.status === 'inprogress' && (
                <div key={task.id} className="card in-progress">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
                  <button onClick={() => handleMoveTask(task.id, 'done')}>Move to Done</button>
                  <button onClick={() => handleMoveTask(task.id, 'todo')}>Move to Todo</button>
                  <button onClick={() => handleEditTask(task)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              )
          )}
        </div>
        <div className="column">
          <h2>Done</h2>
          {tasks.map(
            (task) =>
              task.status === 'done' && (
                <div key={task.id} className="card done">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
                  <button onClick={() => handleMoveTask(task.id, 'inprogress')}>Move to In Progress</button>
                  <button onClick={() => handleEditTask(task)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              )
          )}
        </div>
      </div>
      {editTask && (
        <div className="edit-task-form">
          <h2>Edit Task</h2>
          <input
            type="text"
            placeholder="Task Title"
            value={editTask.title}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Task Description"
            value={editTask.description}
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
          />
          <input
            type="datetime-local"
            value={editTask.deadline}
            onChange={(e) => setEditTask({ ...editTask, deadline: e.target.value })}
          />
          <button onClick={handleUpdateTask}>Update Task</button>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
