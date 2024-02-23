export const homeScreen = 'Home';
export const detailsScreen = 'Details';

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
