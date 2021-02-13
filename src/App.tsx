import React, { FunctionComponent, Suspense, lazy } from 'react';
import { Router, Route, Switch } from 'react-router';
import { Navigation, Urls } from './navigation';
import { Loading } from './components';

const CardListPage = lazy(() => import('./cards/ListPage'));
const EditCardPage = lazy(() => import('./cards/EditCardPage'));

const App: FunctionComponent = (): JSX.Element => (
  <Router history={Navigation.history}>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path={Urls.CardDetail}>
          <EditCardPage />
        </Route>
        <Route>
          <CardListPage />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default App;