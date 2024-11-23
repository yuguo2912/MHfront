import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Message from './component/Message';
import PostMessage from './component/PostMessage';
import UsersList from './component/UsersList';


const options = [
  {
    label: "Hugo",
    value: "hugo",

  },
  {
    label: "Matthieu",
    value: "matthieu",
  },

]

function App() {
  return (
    <div className="App">
      <h1>Welcome to React</h1>
      <Message/>
      <PostMessage/>
      <UsersList/>
    </div>
  );
}

export default App;