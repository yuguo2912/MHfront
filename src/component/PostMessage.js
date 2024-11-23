
import React, { useEffect, useState } from 'react';

function PostMessage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [messageObject, setMessageObject] = useState('');
  const [messageId, setMessageId] = useState(''); // Champ pour l'objet du message

  // Fonction pour charger les messages lors du premier rendu du composant
  useEffect(() => {
    fetch('/api/messages')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  // Fonction pour gérer l'envoi du message
  const handleSendMessage = () => {
    const messageData = {
      message_object: messageObject,
      message_body: newMessage,
      id_sender: 1,  // Remplacez par une valeur appropriée si nécessaire
      id_recever: 2  // Remplacez par une valeur appropriée si nécessaire
    };

    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    })
    .then(response => response.json())
    .then(data => {
      // Remplace la liste des messages avec seulement le nouveau message
      setMessages([data]);
      setNewMessage(''); // Réinitialise le champ de message
      setMessageObject('');// Réinitialise le champ d'objet du message
      setMessageId(''); //Récuperer l'addresse ID du message
    })
    .catch(error => console.error('Erreur lors de l\'envoi du message:', error));
  };

  return (
    <div>
      <h2>PostMessage</h2>
     
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Envoyer un message</h5>

          {/* Champ d'input pour l'objet du message */}
          <input 
            type="text" 
            placeholder="Objet du message" 
            value={messageObject} 
            onChange={(e) => setMessageObject(e.target.value)}
            className="form-control mb-2" 
          />

          {/* Champ d'input pour le corps du message */}
          <input 
            type="text" 
            placeholder="Saisir un message" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)}
            className="form-control mb-2" 
          />


          <button onClick={handleSendMessage} className="btn btn-primary mb-3">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostMessage;
