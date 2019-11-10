import React, { useContext } from 'react';
import { Layout, Typography } from 'antd';
import TeamsContainer from './TeamsContainer';
import { BanksContainer } from './BanksContainer';
import { HistoryContainer } from './HistoryContainer';
import { Results } from '../components/Results';
import { ComponentsContainer } from './ComponentsContainer';
import { TeamsContext } from '../index';
import { createStore } from 'redux';
import { JCCMUNOApp } from '../reducers';
import { Provider } from 'react-redux';
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  }
];
const dataset = [
  {
    key: '1',
    name: 'Iteración 1',
    age: 32,
    address: 'Equipo 1'
  },
  {
    key: '2',
    name: 'Iteración 2',
    age: 42,
    address: 'Equipo 4'
  },
  {
    key: '3',
    name: 'Iteración 3',
    age: 32,
    address: 'Equipo 4'
  },
  {
    key: '4',
    name: 'Iteración 4',
    age: 32,
    address: 'Equipo 4'
  },
  {
    key: '5',
    name: 'Iteración 5',
    age: 32,
    address: 'Equipo 4'
  },
  {
    key: '6',
    name: 'Asegurador',
    age: 32,
    address: 'Equipo 4'
  }
];

const App: React.FC = () => {
  const Teams = useContext(TeamsContext);
  const store = createStore(JCCMUNOApp, {
    Teams
  });

  return (
    <Provider store={store}>
      <Layout className="h-100">
        <Header>
          {' '}
          <Title className="text-center">JCCM UNO</Title>{' '}
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={300} style={{ background: '#fff' }}>
              <Title level={3}>Equipos</Title>
              <TeamsContainer />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <BanksContainer />
              <HistoryContainer />
            </Content>
            <Results dataset={dataset} columns={columns} />
          </Layout>
        </Content>
        <Footer style={{ height: '200px', overflow: 'auto' }}>
          <ComponentsContainer />
        </Footer>
      </Layout>
    </Provider>
  );
};

export default App;
