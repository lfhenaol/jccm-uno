import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import './app.less';
import { Team, teams } from './config/materials';

export const TeamsContext = createContext<Team[]>([]);

ReactDOM.render(
  <TeamsContext.Provider value={teams}>
    <App />
  </TeamsContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
