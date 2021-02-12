import React, { FunctionComponent, Suspense, lazy } from 'react';
import { Router, Route, Switch } from 'react-router';
import History from './navigation/navigation';
import { Loading } from './components/Loading';

const CardListPage = lazy(() => import('./cards/ListPage'));

const App: FunctionComponent = (): JSX.Element => (
  <Router history={History.history}>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route>
          <CardListPage />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default App;