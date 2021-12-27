import {
  BrowserRouter as Router, Redirect, Route,
  Switch
} from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import ChargesProvider from './context/ChargesContext';
import ClientsProvider from './context/ClientsContext';
import LoadingProvider from './context/LoadingContext';
import useAuth from './hooks/useAuth';
import './index.css';
import Charges from './pages/Charges';
import ClientDetails from './pages/ClientDetails';
import Clients from './pages/Clients';
import Home from './pages/Home';
import Signin from './pages/SignIn';
import Signup from './pages/Signup';


function Routes() {
  function ProtectRoute(prop) {
    const { token } = useAuth();

    return (
      <Route render={() => (token ? prop.children : <Redirect to="/" />)} />
    );
  }

  return (
    <div className="Routes">
      <Router>
        <AuthProvider>
          <Switch>
          <LoadingProvider>
            <Route path="/register" exact component={Signup} />
            <Route path="/" exact component={Signin} />
            <ProtectRoute>
              
              <ClientsProvider>
              <ChargesProvider>
              <Route path="/home" exact component={Home} />
              <Route path="/clients" exact component={Clients} />
              <Route path="/clients/details" exact component={ClientDetails}/>
              <Route path="/charges" exact component={Charges} />
              {/* <Route path="/charges" component={Charges} /> */}
              </ChargesProvider>
              </ClientsProvider>
            </ProtectRoute>
            {/* Trocar para sign in, quando a mesma estiver pronta */}
            </LoadingProvider>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default Routes;
