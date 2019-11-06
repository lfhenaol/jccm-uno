import { List } from 'antd';
import React from 'react';
import { Team } from './Team';
const { Item } = List;

export function TeamItem({ item }: any) {
  return (
    <Item>
      <Team item={item} />
    </Item>
  );
}
