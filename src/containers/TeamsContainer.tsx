import { List } from 'antd';
import React from 'react';
import { TeamItem } from '../components/TeamItem';
import { connect } from 'react-redux';
import { JCCMUNOAppStore } from '../reducers';
import { Team } from '../config/materials';

function TeamsContainer({ teams }: { teams?: Team[] }) {
  console.log(teams);
  return (
    <List
      style={{ height: '500px', overflow: 'auto' }}
      itemLayout="horizontal"
      dataSource={teams}
      renderItem={team => <TeamItem team={team} />}
    />
  );
}

function mapStateToProps(state: JCCMUNOAppStore) {
  return { teams: state.Teams };
}

export default connect(mapStateToProps)(TeamsContainer);
