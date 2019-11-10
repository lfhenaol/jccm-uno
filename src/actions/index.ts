import {AddGlobalWinnerTeamAction, AddIterationWinnerTeamAction} from "./ResultsActions";
import {AddComponentAction, DeliverComponentAction} from "./TeamComponentsActions";
import {AddToTeamsAction} from "./TeamsActions";

export * from './EvaluatedComponentsActions';
export * from './ComponentsToBeEvaluatedActions';
export * from './HistoryActions';
export * from './ResultsActions';
export * from './TeamComponentsActions';
export * from './TeamsActions';

export type ResultsActionTypesI =
    | AddIterationWinnerTeamAction
    | AddGlobalWinnerTeamAction;

export type TeamActionTypesI = AddComponentAction | DeliverComponentAction;

export type TeamsActionTypesI = AddToTeamsAction;
