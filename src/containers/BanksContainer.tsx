import { Col, Row } from 'antd';
import React from 'react';
import { BankComponentsToBeEvaluated } from '../components/BankComponentsToBeEvaluated';
import { BankEvaluatedComponents } from '../components/BankEvaluatedComponents';

export function BanksContainer() {
  return (
    <Row>
      <Col sm={12} className="d-flex justify-content-center">
        <BankComponentsToBeEvaluated />
      </Col>
      <Col sm={12} className="d-flex justify-content-center">
        <BankEvaluatedComponents />
      </Col>
    </Row>
  );
}
