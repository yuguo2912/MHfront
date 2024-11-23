/*Nouvelle api get http/ message 1 ou 2 c'est le destinataire du message 
Api avec un filtre */

import React, { useEffect, useState } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [userId , setUserId] = useState([]);
  
  useEffect(() => {
    fetch('/api/user')
      .then(response => response.json())
      .then(data => setUserId(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  const handleSendUser = () => {
    const messageData = {
      newUser : users,
    };
  }

  return (
    <div>
      <h2>Users</h2>
      <ul>
      <input
          type = "number"
          placeholder='Id de l utilisateur'
          value = {userId}
          onChange = {(e) => setUserId(e.target.value)}
          className = "form-control mb-2"
      />
      </ul>
      <button onClick={handleSendUser}>Add</button>
    </div>
  );
}

export default UsersList;