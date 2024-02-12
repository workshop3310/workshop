import {useMemo} from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {DetailsParamsProvider} from './ParamsContext';
import Info from './Info/Info';
import Issues from './Issues/Issues';
import Commits from './Commits/Commits';

interface TIconProps {
  focused: boolean;
  size: number;
  color: string;
}

const Tab = createBottomTabNavigator();

function getIconProp(name: string) {
  return {
    tabBarIcon({color, size}: TIconProps) {
      return <Icon name={name} color={color} size={size} />;
    },
  };
}

function DetailsScreen() {
  const route = useRoute<RouteProp<ReactNavigation.RootParamList, 'Details'>>();
  const {repo, owner} = route.params;

  const options = useMemo(
    () => ({
      navigator: {
        header: () => null,
      },
      info: getIconProp('information-outline'),
      issues: getIconProp('disc-outline'),
      commits: getIconProp('git-commit-outline'),
    }),
    [],
  );

  return (
    <DetailsParamsProvider owner={owner} repo={repo}>
      <Tab.Navigator screenOptions={options.navigator}>
        <Tab.Screen name="Info" component={Info} options={options.info} />
        <Tab.Screen name="Issues" component={Issues} options={options.issues} />
        <Tab.Screen
          name="Commits"
          component={Commits}
          options={options.commits}
        />
      </Tab.Navigator>
    </DetailsParamsProvider>
  );
}

export default DetailsScreen;
