import { combineReducers } from 'redux';
import { componentsToBeEvaluatedReducer } from './ComponentsToBeEvaluatedReducer';
import { evaluatedComponentsReducer } from './EvaluatedComponentsReducer';
import { historyReducer } from './HistoryReducer';
import { resultReducer } from './ResultsReducer';
import { teamsReducer } from './TeamsReducer';
import { Component, Team } from '../config/materials';
import {
  GlobalWinnerTeam,
  HistoryEvent,
  IterationWinnerTeam
} from '../actions';
export {
  componentsToBeEvaluatedReducer
} from './ComponentsToBeEvaluatedReducer';
export { evaluatedComponentsReducer } from './EvaluatedComponentsReducer';
export { historyReducer } from './HistoryReducer';
export { resultReducer } from './ResultsReducer';
export { teamComponentsReducer } from './TeamComponentsReducer';
export { teamReducer } from './TeamReducer';
export { teamsReducer } from './TeamsReducer';

export const JCCMUNOApp = combineReducers({
  BankComponentsToBeEvaluated: componentsToBeEvaluatedReducer,
  BankEvaluatedComponents: evaluatedComponentsReducer,
  History: historyReducer,
  Results: resultReducer,
  Teams: teamsReducer
});

export type JCCMUNOAppStore = ReturnType<typeof JCCMUNOApp>;

// const initialState = {
//   BankComponentsToBeEvaluated: [],
//   BankEvaluatedComponents: [],
//   History: [],
//   Results: [],
//   Teams: [
//     {
//       name: 'Equipo 1',
//       status: StatusTeam.WAITING,
//       components: [
//         {
//           name: '',
//           mod: null,
//           compound: false,
//           integrator: false,
//           type: {
//             text: null,
//             icon: null
//           },
//           help: '',
//           description: '',
//           score: 0
//         }
//       ]
//     }
//   ]
// };
