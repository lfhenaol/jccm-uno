import { Button, Card, Col, Empty, Row } from 'antd';
import React from 'react';
import { Component, Team } from '../config/materials';
const { Meta } = Card;

export function BankComponentsToBeEvaluated({
  onTakeComponent,
  currentTeamEstimating,
  lastComponentToBeEvaluated,
  onCanTakeComponent,
  nextTeam,
  lastEvaluatedComponent,
  onNextTeam
}: {
  onTakeComponent: Function;
  currentTeamEstimating: Team;
  lastComponentToBeEvaluated: Component;
  onCanTakeComponent: Function;
  nextTeam: Team;
  lastEvaluatedComponent: Component;
  onNextTeam: Function;
}) {
  console.log('DISABLE TAKE COMPONENT', !onCanTakeComponent());
  const handleTakeComponent = (component: Component) => {
    return onCanTakeComponent()
      ? onTakeComponent({
          component,
          teamId: currentTeamEstimating.id,
          lastEvaluatedComponent,
          nextTeam
        })
      : null;
  };

  const elemLastComponent = (component: Component) => (
    <Card style={{ height: 170 }} hoverable={true}>
      <Row type="flex" justify="center" align="middle" style={{ height: 115 }}>
        <Col>
          <Button
            // @ts-ignore
            onClick={() => handleTakeComponent(component)}
            disabled={!onCanTakeComponent()}
            htmlType="button"
            type="primary"
          >
            Tomar componente
          </Button>
        </Col>
      </Row>
    </Card>
  );
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        !lastComponentToBeEvaluated ? (
          elemLastComponent(lastComponentToBeEvaluated)
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Sin componentes"
            style={{ height: 107 }}
          >
            <Button
              // @ts-ignore
              onClick={() =>
                onNextTeam({ nextTeam, teamId: currentTeamEstimating.id })
              }
              htmlType="button"
              type="danger"
            >
              Pasar entrega
            </Button>
          </Empty>
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
