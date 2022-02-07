export interface Page {
  icon: string;
  title: string;
  url: string;
  position: number;
}

interface Pages {
  [key: string]: Page;
}

export const PAGES: Pages = {
  game: {
    icon: 'body',
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
    title: 'Ranking',
    url: 'ranking',
    position: 1
  }
};
