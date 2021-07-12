import './App.css';
import { Topbar, AuthContextProvider } from './user';
import { StoreContextProvider } from './utils';

function App() {
  return (
    <div className='App'>
      <StoreContextProvider>
        <AuthContextProvider>
          <Topbar />
        </AuthContextProvider>
      </StoreContextProvider>
    </div>
  );
}

export default App;
