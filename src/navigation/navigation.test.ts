import { createBrowserHistory } from 'history';
import Navigation, { Urls } from './navigation';

describe('Navigation', () => {
  beforeEach(() => {
    Navigation.history = createBrowserHistory();
    Navigation.history.push('/unkown-route');
  });

  it('navigates to dashboard', () => {
    Navigation.toDashboard();

    expect(Navigation.history.location.pathname).toEqual(Urls.Dashboard);
  });

  it('navigates to card detail', () => {
    const anId = 'an-id;';
    
    Navigation.toCardDetail(anId);

    expect(Navigation.history.location.pathname).toEqual(Urls.CardDetail + anId);
  });
});