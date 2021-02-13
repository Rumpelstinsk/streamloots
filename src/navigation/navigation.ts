import { createBrowserHistory, History } from 'history';

export enum Urls {
  Dashboard = '/Dashboard',
  CardDetail = '/CardEdit/:id'
}

export class Navigation {
  static history: History = createBrowserHistory();

  static toDashboard():void {
    this.history.push(Urls.Dashboard);
  }

  static toCardDetail(id:string):void {
    this.history.push(Urls.CardDetail.replace(':id', id));
  }
}