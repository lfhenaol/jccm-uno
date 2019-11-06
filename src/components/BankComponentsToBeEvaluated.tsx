import { Card, Typography } from 'antd';
import React from 'react';
const { Meta } = Card;
const { Title } = Typography;

export function BankComponentsToBeEvaluated() {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <Card style={{ height: 170 }} hoverable={true}>
          <Title level={3} className="text-center">
            Tomar componente
          </Title>
        </Card>
      }
    >
      <Meta
        description="Banco de componentes por evaluar"
        className="text-center"
      />
    </Card>
  );
}
