import { Page } from '../models/page.model';

interface Pages {
  [key: string]: Page;
}

export const PAGES: Pages = {
  game: {
    icon: 'body',
    menu: true,
    title: 'Game',
    url: 'game',
    position: 0
  },
  login: {
    icon: 'exit',
    title: 'Leave',
    url: 'login',
    position: 2
  },
  ranking: {
    icon: 'ribbon',
    menu: true,
    title: 'Top 10',
    url: 'ranking',
    position: 1
  }
};
