import { Card, Empty, Icon, Tooltip } from 'antd';
import React from 'react';
import { Component } from '../config/materials';
import ReactHtmlParser from 'react-html-parser';
const { Meta } = Card;

export function BankEvaluatedComponents({
  evaluatedComponents
}: {
  evaluatedComponents?: Component[];
}) {
  // @ts-ignore
  const lastComponent = evaluatedComponents[evaluatedComponents.length - 1];
  const elemLastComponent = (component: Component) => (
    <Card
      title={component.name}
      style={{ height: 170 }}
      extra={
        <>
          <span>
            {component.type.text ? (
              component.type.text
            ) : (
              <Icon type={component.type.icon} />
            )}{' '}
          </span>
          <Tooltip title={component.help}>
            <Icon type="question-circle-o" />
          </Tooltip>
        </>
      }
      hoverable={true}
    >
      {ReactHtmlParser(component.description)}
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
        description="Banco de componentes evaluados"
        className="text-center"
      />
    </Card>
  );
}
