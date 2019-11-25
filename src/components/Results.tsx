import { Table, Typography, Layout } from 'antd';
import React from 'react';
const { Title } = Typography;
const { Sider } = Layout;

export function Results({ columns, dataset }: any) {
  return (
    <Sider width={300} style={{ background: '#fff' }}>
      <Title level={3}>Resultados</Title>
      <Table
        showHeader={true}
        pagination={false}
        columns={columns}
        dataSource={dataset}
        size="middle"
      />
    </Sider>
  );
}
