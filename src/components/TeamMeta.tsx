import {List, Tag} from 'antd';
import React from 'react';
import {StatusTeam} from '../actions';

const { Meta } = List.Item;

export function TeamMeta({
  nameTeam,
  status
}: {
  nameTeam: string;
  status: StatusTeam;
}) {
  return (
    <Meta
      title={
        <>
          <a href="https://ant.design">{nameTeam}</a>{' '}
          <Tag color={status === StatusTeam.ESTIMING ? 'green': ''}> {status} </Tag>
        </>
      }
    />
  );
}
