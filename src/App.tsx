import './App.css';
import { Auth, AuthContextProvider } from './user';
import { StoreContextProvider } from './utils';

function App() {
  return (
    <div className="App">
      <StoreContextProvider>
        <AuthContextProvider>
          <Auth />
        </AuthContextProvider>
      </StoreContextProvider>
    </div>
  );
}

export default App;
