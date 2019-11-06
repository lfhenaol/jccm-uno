import { Card, Col, Icon, Row, Tooltip } from 'antd';
import React from 'react';

export function ComponentsContainer() {
  return (
    <Row gutter={16}>
      <Col xs={4}>
        <Card
          style={{ height: 150 }}
          title="C-MW"
          extra={
            <>
              <span>JCCM 0 </span>
              <Tooltip title="Componente con medida JCCM 0 ">
                <Icon type="question-circle-o" />
              </Tooltip>
            </>
          }
          hoverable={true}
        >
            Componente del <strong>módulo W</strong>.
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{ height: 150 }}
          title="CC-MW"
          extra={
            <>
              <span>+2C </span>
              <Tooltip title="Estimación de la calidad de dos componentes nuevos">
                <Icon type="question-circle-o" />
              </Tooltip>
            </>
          }
          hoverable={true}
        >
          Componente compuesto del <strong>módulo W</strong>.
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{ height: 150 }}
          title="CC-MW"
          extra={
            <>
              <span>
                <Icon type="sync" />{' '}
              </span>
              <Tooltip title="Cambia sentido en el proceso de entrega de las estimaciones">
                <Icon type="question-circle-o" />
              </Tooltip>
            </>
          }
          hoverable={true}
        >
          Componente compuesto del <strong>módulo W</strong>.
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{ height: 150 }}
          title="CC-MW"
          extra={
            <>
              <span>
                <Icon type="stop" />{' '}
              </span>
              <Tooltip title="Impide entrega de estimación del siguiente equipo">
                <Icon type="question-circle-o" />
              </Tooltip>
            </>
          }
          hoverable={true}
        >
          Componente compuesto del <strong>módulo W</strong>.
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{ height: 150 }}
          title="CI"
          extra={
            <>
              <span>
                <Icon type="appstore" />{' '}
              </span>
              <Tooltip title="Establece un núevo módulo al cual el siguiente equipo deberá realizar la entrega">
                <Icon type="question-circle-o" />
              </Tooltip>
            </>
          }
          hoverable={true}
        >
          Componente integrador.
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{ height: 150 }}
          title="CI"
          extra={
            <>
              <span>+4C </span>
              <Tooltip title="Estimación de la calidad de cuatro componentes nuevos">
                <Icon type="question-circle-o" />
              </Tooltip>
            </>
          }
          hoverable={true}
        >
          Componente integrador.
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{ height: 150 }}
          title="C-MW"
          extra={
            <>
              <span>JCCM 0 </span>
              <Tooltip title="Componente con medida JCCM 0 ">
                <Icon type="question-circle-o" />
              </Tooltip>
            </>
          }
          hoverable={true}
        >
          Componente del <strong>módulo W</strong>.
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{ height: 150 }}
          title="CC-MW"
          extra={
            <>
              <span>+2C </span>
              <Tooltip title="Estimación de la calidad de dos componentes nuevos">
                <Icon type="question-circle-o" />
              </Tooltip>
            </>
          }
          hoverable={true}
        >
          Componente compuesto del <strong>módulo W</strong>.
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{ height: 150 }}
          title="CC-MW"
          extra={
            <>
              <span>
                <Icon type="sync" />{' '}
              </span>
              <Tooltip title="Cambia sentido en el proceso de entrega de las estimaciones">
                <Icon type="question-circle-o" />
              </Tooltip>
            </>
          }
          hoverable={true}
        >
          Componente compuesto del <strong>módulo W</strong>.
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{ height: 150 }}
          title="CC-MW"
          extra={
            <>
              <span>
                <Icon type="stop" />{' '}
              </span>
              <Tooltip title="Impide entrega de estimación del siguiente equipo">
                <Icon type="question-circle-o" />
              </Tooltip>
            </>
          }
          hoverable={true}
        >
          Componente compuesto del <strong>módulo W</strong>.
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{ height: 150 }}
          title="CI"
          extra={
            <>
              <span>
                <Icon type="appstore" />{' '}
              </span>
              <Tooltip title="Establece un núevo módulo al cual el siguiente equipo deberá realizar la entrega">
                <Icon type="question-circle-o" />
              </Tooltip>
            </>
          }
          hoverable={true}
        >
          Componente integrador.
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{ height: 150 }}
          title="CI"
          extra={
            <>
              <span>+4C </span>
              <Tooltip title="Estimación de la calidad de cuatro componentes nuevos">
                <Icon type="question-circle-o" />
              </Tooltip>
            </>
          }
          hoverable={true}
        >
          Componente integrador.
        </Card>
      </Col>
    </Row>
  );
}
