import { Button, Card, Col, Icon, Modal, Row, Tooltip } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import React, { useState } from 'react';
import { Component, Modules, Team } from '../config/materials';

export function ComponentItem({
  component,
  teamId,
  onDeliverComponent,
  onCanDeliverComponent,
  nextTeam
}: {
  component: Component;
  teamId: string;
  onDeliverComponent: Function;
  onCanDeliverComponent: Function;
  nextTeam: Team;
}) {
  const [resolvePromise, setResolvePromise] = useState<
    (module: Modules) => void
  >(() => null);
  const [rejectPromise, setRejectPromise] = useState<() => void>(() => null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalOk = (module: Modules) => {
    debugger;
    setModalVisible(false);
    resolvePromise(module);
  };
  const handleModalCancel = () => {
    debugger;
    setModalVisible(false);
    rejectPromise();
  };
  const handleModalChooseModule = () => {
    return new Promise((resolve, reject) => {
      setResolvePromise(() => resolve);
      setRejectPromise(() => reject);
      setModalVisible(true);
    });
  };
  return (
    <Col style={{ marginBottom: 15 }} xs={4}>
      <Card
        style={{ height: 150 }}
        title={component.name}
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
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <div
          style={{
            display: onCanDeliverComponent() && isMouseOver ? 'none' : 'block'
          }}
        >
          {ReactHtmlParser(component.description)}
        </div>
        <Row
          style={{
            display: onCanDeliverComponent() && isMouseOver ? 'flex' : 'none'
          }}
          type="flex"
          justify="center"
        >
          <Col>
            <Button
              onClick={() =>
                onDeliverComponent(component, teamId, handleModalChooseModule, nextTeam)
              }
            >
              Entregar
            </Button>
          </Col>
        </Row>
      </Card>
      <Modal
        visible={modalVisible}
        title="Escoge el nuevo módulo al cual se deben realizar las siguientes entregas"
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" htmlType="button" onClick={handleModalCancel}>
            Cancelar
          </Button>
        ]}
      >
        <Button
          style={{ marginRight: 5 }}
          key="W"
          type="primary"
          htmlType="button"
          onClick={() => handleModalOk(Modules.W)}
        >
          Módulo W
        </Button>
        <Button
          style={{ marginRight: 5 }}
          key="X"
          type="primary"
          htmlType="button"
          onClick={() => handleModalOk(Modules.X)}
        >
          Módulo X
        </Button>
        <Button
          style={{ marginRight: 5 }}
          key="Y"
          type="primary"
          htmlType="button"
          onClick={() => handleModalOk(Modules.Y)}
        >
          Módulo Y
        </Button>
        <Button
          key="Z"
          type="primary"
          htmlType="button"
          onClick={() => handleModalOk(Modules.Z)}
        >
          Módulo Z
        </Button>
      </Modal>
    </Col>
  );
}
