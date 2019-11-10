import { List } from 'antd';
import React from 'react';
import { TeamMeta } from './TeamMeta';
import { Team } from '../config/materials';
const { Item } = List;

export function TeamItem({ team }: { team: Team }) {
  return (
    <Item>
      <TeamMeta nameTeam={team.name} status={team.status} />
    </Item>
  );
}
