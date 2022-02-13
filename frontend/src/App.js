import { CookiesProvider } from 'react-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Layout from './hocs/Layout';
import Home from './components/Home'
import MyAccount from './components/MyAccount';
import Signup from './components/Signup';
import Activate from './components/Activate';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Twitter from './components/Twitter';
import RequestList from './components/RequestList';
import RequestBox from './components/RequestBox';
import ResetPassword from './components/ResetPassword';
import ResetPasswordConfirm from './components/ResetPasswordConfirm';
function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Router>
          <Layout>
            <Switch>
            <Route exact path='/'component={Home}/>
            <Route exact path='/request-list' component={RequestList}/>
            <Route exact path='/request-box/:uid' component={RequestBox}/>
            {/* <Route exact path='/message/' component={Message}/> */}
            <PrivateRoute exact path='/myaccount' component={MyAccount}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/activate/:uid/:token' component={Activate}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/oauth/complete/twitter' component={Twitter}/>
            <Route exact path='/password-reset' component={ResetPassword} />
            <Route exact path='/password-reset-confirm/:uid/:token' component={ResetPasswordConfirm} />

            </Switch>
          </Layout>
        </Router>
      </CookiesProvider>
      
    </div>
  );
}

export default App;
