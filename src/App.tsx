import { IonApp, setupIonicReact } from '@ionic/react';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
//import '@ionic/react/css/text-transformation.css';
//import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
//import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/typography.css';
import { Provider as StoreProvider } from 'react-redux';
import AppNavigation from './navigation/AppNavigation';
import store from './store';
/* Packit up style */
import './style/flex-utils.css';
/* Theme variables */
import './style/theme/variables.css';
import AuthGuard from './user/AuthGuard';


setupIonicReact();

const App: React.FC = () => {
  return (
      <StoreProvider store={store}>
        <IonApp>
          <AuthGuard>
            <AppNavigation></AppNavigation>
          </AuthGuard>
        </IonApp>
      </StoreProvider>
  );
};

export default App;
