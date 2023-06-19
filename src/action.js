// actions.js
export const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: task,
  });
  
  export const deleteTask = (taskId) => ({
    type: 'DELETE_TASK',
    payload: taskId,
  });
  
  export const editTask = (taskId, updatedTask) => ({
    type: 'EDIT_TASK',
    payload: { taskId, updatedTask },
  });
  
  export const completeTask = (taskId) => ({
    type: 'COMPLETE_TASK',
    payload: taskId,
  });
  