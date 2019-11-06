import { List } from 'antd';
import React from 'react';
import { TeamItem } from '../components/TeamItem';

const data = [
  {
    title: 'Equipo 1'
  },
  {
    title: 'Equipo 2'
  },
  {
    title: 'Equipo 3'
  },
  {
    title: 'Equipo 4'
  },
  {
    title: 'Equipo 5'
  },
  {
    title: 'Equipo 6'
  },
  {
    title: 'Equipo 7'
  }
];

export function TeamsContainer() {
  return (
    <List
      style={{ height: '500px', overflow: 'auto' }}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => <TeamItem item={item} />}
    />
  );
}
