import { Row, Timeline } from 'antd';
import React from 'react';

export function HistoryContainer() {
  return (
    <Row className="mt-5">
      <Timeline
        mode="alternate"
        style={{ height: 150, overflow: 'hidden', paddingTop: 1 }}
        reverse={true}
      >
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        <Timeline.Item>Equipo 1 en proceso de estimación</Timeline.Item>
        <Timeline.Item>
          Equipo 1 entrega componente con métrica JCCM 0 del módulo W
        </Timeline.Item>
        <Timeline.Item>Equipo 2 en proceso de estimación</Timeline.Item>
        <Timeline.Item>
          Equipo 2 entrega componente integrador establecer nuevo módulo
        </Timeline.Item>
      </Timeline>
    </Row>
  );
}
