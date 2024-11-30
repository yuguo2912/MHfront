import React, { useEffect, useState } from "react";

const options = [
  { label: "Hugo", value: "1" },
  { label: "Matthieu", value: "2" },
  { label: "Juju", value: "3"},
];

function Message() {
  const [messages, setMessages] = useState([]); // Liste des messages
  const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement
  const [selectedUser, setSelectedUser] = useState("1"); // Utilisateur sélectionné

  // Fonction pour supprimer un message
  const removeMessage = (id) => {
    const newMessages = messages.filter((message) => message.id !== id); // Utiliser `filter`
    setMessages(newMessages); // Mettre à jour les messages
  };

  // Fonction pour gérer le changement d'utilisateur sélectionné
  const handleChange = (e) => {
    console.log("User Selected!!");
    setSelectedUser(e.target.value); // Utiliser `setSelectedUser` pour les composants fonctionnels
  };

  // Fonction pour récupérer les messages depuis une API
  const fetchMessages = () => {
    setIsLoading(true); // Indiquer que nous sommes en train de charger
    fetch("/api/messages/filter?id="+selectedUser) // Assurez-vous que l'URL de l'API est correcte
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des messages");
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data); // Mettre à jour les messages
        setIsLoading(false); // Fin du chargement
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des messages:", error);
        setIsLoading(false); // Fin du chargement même en cas d'erreur
      });
  };

  // Utiliser `useEffect` pour appeler l'API régulièrement
  useEffect(() => {
    fetchMessages(); // Appeler immédiatement au chargement

    // Démarrer un intervalle pour mettre à jour les messages
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000); // Toutes les 5 secondes

    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors de la désinstallation du composant
  }, []);

  return (
    <div id="App">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Liste des messages</h5>

          {/* Liste déroulante pour sélectionner un utilisateur */}
          <button onClick={fetchMessages} className="btn btn-primary mb-3">
            Charger les messages
          </button>
          <select value={selectedUser} onChange={handleChange}>

            {options.map((option) => (
              <option value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Chargement des messages */}
          {
            <ul>
            {messages.map((message) => (
              <li key={message.idRecever}>
                {message.message_body}{" "}
              </li>
            ))}
            </ul> 
        }
        </div>
      </div>
    </div>
  );
}
{/*
    return (
    <div>
      <h2>Messages</h2>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Liste des messages</h5>
          <select>
          {options.map((options) => (
              <options value= {options.value}>{options.label}</options>
          ))}
          </select>
          {Bouton pour récupérer les messages }
          <button onClick={fetchMessages} className="btn btn-primary mb-3">
            Charger les messages
          </button>

          Affichage du statut de chargement
          {isLoading && <p>Chargement des messages...</p>}

          <h5>Messages :</h5>
          <ul>
            {messages.length > 0 ? (
              messages.map(msg => (
                <li key={msg.id_message}>
                  <strong>{msg.message_object} :</strong> {msg.message_body}
                </li>
              ))
            ) : (
              <p>Aucun message à afficher.</p>
            )}
            <button onClick={removeMessage} className='btn btn-primary mb-3'>Filtrer</button>
          </ul>
        </div>
      </div>
    </div>
  );
}}
*/}
export default Message;
