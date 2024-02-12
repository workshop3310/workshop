export const homeScreen = 'Home';
export const detailsScreen = 'Details';
export const commitsScreen = 'Details/Commits';
export const issuesScreen = 'Details/Issues';

export const linking = {
  prefixes: [],
  config: {
    screens: {
      [homeScreen]: 'home',
      [detailsScreen]: {
        path: 'details/:owner/:repo',
        screens: {
          [commitsScreen]: 'commits',
          [issuesScreen]: 'issues',
        },
      },
    },
  },
};

type RootStackParamList = {
  Home: undefined;
  Details: {
    owner: string;
    repo: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
