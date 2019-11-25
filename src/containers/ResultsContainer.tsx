import React from 'react';
import { connect } from 'react-redux';
import { JCCMUNOAppStore } from '../reducers';
import { Results } from '../components/Results';
import { GlobalWinnerTeam, IterationWinnerTeam } from '../actions';

const columns = [
  {
    title: 'Equipo',
    dataIndex: 'team'
  },
  {
    title: 'JCCM',
    dataIndex: 'score'
  },
  {
    title: 'Iteración',
    dataIndex: 'iteration'
  }
];

function ResultsContainer({
  results
}: {
  results?: Array<IterationWinnerTeam | GlobalWinnerTeam>;
}) {
  return <Results dataset={results} columns={columns} />;
}

function mapStateToProps(state: JCCMUNOAppStore) {
  return { results: state.Results };
}

export default connect(mapStateToProps)(ResultsContainer);
