import { List, Tag } from 'antd';
import React from 'react';
import { StatusTeam } from '../actions';

const { Meta } = List.Item;

export function TeamMeta({
  nameTeam,
  status,
  numberComponents
}: {
  nameTeam: string;
  status: StatusTeam;
  numberComponents: number;
}) {
  return (
    <Meta
      title={
        <>
          <a href="https://ant.design">{nameTeam}</a>{' '}
          <Tag color={status === StatusTeam.ESTIMATING ? 'green' : ''}>
            {' '}
            {status}{' '}
          </Tag>
          <Tag color="blue">{numberComponents} Componentes</Tag>
        </>
      }
    />
  );
}
