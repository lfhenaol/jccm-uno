import {
  AddGlobalWinnerTeamAction,
  AddIterationWinnerTeamAction
} from './ResultsActions';
import {
  AddComponentAction,
  DeliverComponentAction,
  UpdateDescriptionIntegratorComponentAction,
  UpdateModuleIntegratorComponentAction
} from './TeamComponentsActions';
import { AddToTeamsAction } from './TeamsActions';
import {
  ChangeStatusAction,
  NoSkipTurnAction,
  SkipTurnAction
} from './TeamActions';

export * from './EvaluatedComponentsActions';
export * from './ComponentsToBeEvaluatedActions';
export * from './HistoryActions';
export * from './ResultsActions';
export * from './TeamComponentsActions';
export * from './TeamsActions';

export type ResultsActionTypesI =
  | AddIterationWinnerTeamAction
  | AddGlobalWinnerTeamAction;

export type TeamComponentActionTypesI =
  | AddComponentAction
  | DeliverComponentAction
  | UpdateDescriptionIntegratorComponentAction
  | UpdateModuleIntegratorComponentAction;

export type TeamsActionTypesI = AddToTeamsAction;

export type TeamActionTypesI =
  | NoSkipTurnAction
  | SkipTurnAction
  | ChangeStatusAction;
