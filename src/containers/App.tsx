import React, { useContext } from 'react';
import { Layout, Typography } from 'antd';
import TeamsContainer from './TeamsContainer';
import BanksContainer from './BanksContainer';
import { Results } from '../components/Results';
import { MaterialsContext } from '../index';
import { createStore } from 'redux';
import { JCCMUNOApp } from '../reducers';
import { Provider } from 'react-redux';
import ComponentsContainer from './ComponentsContainer';
import { getMaterials } from '../config/materials';
import { GlobalWinnerTeam, IterationWinnerTeam } from '../actions';
import ResultsContainer from "./ResultsContainer";
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const { teams: Teams, materials } = useContext(MaterialsContext);

  const rootReducer = (
    state: any,
    action: any
  ) => {
    if (action.type === 'RELOAD') {
      const { teams: Teams, newMaterials: materials } = getMaterials();
      state = {
        Teams: Teams,
        BankComponentsToBeEvaluated: materials,
        Results: state.Results
      };
    }
    return JCCMUNOApp(state, action);
  };

  const store = createStore(rootReducer, {
    Teams: Teams,
    BankComponentsToBeEvaluated: materials
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
              {/*<HistoryContainer />*/}
            </Content>
           <ResultsContainer />
          </Layout>
        </Content>
        <Footer style={{ height: '220px', overflow: 'auto' }}>
          <ComponentsContainer />
        </Footer>
      </Layout>
    </Provider>
  );
};

export default App;
