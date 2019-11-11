import { Card, Empty, Typography } from 'antd';
import React from 'react';
import { Component } from '../config/materials';
const { Meta } = Card;
const { Title } = Typography;

export function BankComponentsToBeEvaluated({
  componentsToBeEvaluated,
  onTakeComponent,
  teamId
}: {
  componentsToBeEvaluated?: Component[];
  onTakeComponent?: Function;
  teamId?: string;
}) {
  const lastComponent =
    // @ts-ignore
    componentsToBeEvaluated[componentsToBeEvaluated.length - 1];
  const elemLastComponent = (component: Component) => (
    <Card
      style={{ height: 170 }}
      hoverable={true}
      // @ts-ignore
      onClick={() => onTakeComponent(component, teamId)}
    >
      <Title level={3} className="text-center">
        Tomar componente
      </Title>
    </Card>
  );
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        lastComponent ? (
          elemLastComponent(lastComponent)
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Sin componentes"
            style={{ height: 107 }}
          />
        )
      }
    >
      <Meta
        description="Banco de componentes por evaluar"
        className="text-center"
      />
    </Card>
  );
}
