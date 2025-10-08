export const addItemToServer = async (task, date) => {
  const response = await fetch('http://127.0.0.1:3000/api/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task, date }),
  });
  const item = await response.json();
  return mapServerToLocalItem(item);
};

export const getItemToServer = async () => {
  const response = await fetch('http://127.0.0.1:3000/api/todo');
  const items = await response.json();
  return items.map(mapServerToLocalItem);
};

export const markCompletedOnServer = async (id) => {
  const response = await fetch(
    `http://127.0.0.1:3000/api/todo/${id}/completed`,
    {
      method: 'PUT',
    }
  );
  const item = await response.json();
  return mapServerToLocalItem(item);
};

export const deleteItemOnServer = async (id) => {
  await fetch(`http://127.0.0.1:3000/api/todo/${id}`, {
    method: 'DELETE',
  });
  return id;
};

const mapServerToLocalItem = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.date,
    completed: serverItem.completed,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};
