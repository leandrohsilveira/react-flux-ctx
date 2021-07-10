import './App.css';
import { AuthContextProvider, Login, Logout } from './user';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Login />
        <Logout />
      </AuthContextProvider>
    </div>
  );
}

export default App;
