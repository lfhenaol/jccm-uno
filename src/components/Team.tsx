import { List, Tag } from 'antd';
import React from 'react';
const { Meta } = List.Item;

export function Team({ item }: any) {
  return (
    <Meta
      title={
        <>
          <a href="https://ant.design">{item.title}</a>{' '}
          <Tag color="green"> Estimando </Tag>
        </>
      }
    />
  );
}
