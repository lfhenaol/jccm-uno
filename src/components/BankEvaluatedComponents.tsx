import { Card, Empty } from 'antd';
import React from 'react';
const { Meta } = Card;

export function BankEvaluatedComponents() {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        /* <Card
                          title="CC-MW"
                          style={{height: 170}}
                          extra={
                              <>
                                  <span><Icon type="sync"/> </span>
                                  <Tooltip title="Cambia sentido en el proceso de entrega de las estimaciones">
                                      <Icon type="question-circle-o" />
                                  </Tooltip>
                              </>
                          }
                          hoverable={true}
                      >
                          Componente compuesto del <strong>módulo W</strong>.
                      </Card>*/
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Sin componentes"
          style={{ height: 107 }}
        />
      }
    >
      <Meta
        description="Banco de componentes evaluados"
        className="text-center"
      />
    </Card>
  );
}
