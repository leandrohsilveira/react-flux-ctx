import './App.css';
import { Topbar, AuthContextProvider } from './user';
import { AuthEffects } from './user/auth/auth.effects';
import { AuthService, AuthServiceImpl } from './user/auth/auth.service';
import { createInjectionContext, InjectionContextProvider, StoreContextProvider } from './utils';

interface AvailableModules {

  authService: AuthService
  authEffects: AuthEffects

}

const AppInjectionContext = createInjectionContext<AvailableModules>()

const factories = {
  authService() { return new AuthServiceImpl() }
}

function App() {
  return (
    <div className='App'>
      <InjectionContextProvider context={AppInjectionContext} factories={factories}>
        <StoreContextProvider>
          <AuthContextProvider>
            <Topbar />
          </AuthContextProvider>
        </StoreContextProvider>
      </InjectionContextProvider>
    </div>
  );
}

export default App;
