import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import * as routes from './routes';
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/details/Details';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<ReactNavigation.RootParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator initialRouteName={routes.homeScreen}>
          <Stack.Screen
            name={routes.homeScreen}
            component={HomeScreen}
            options={{title: 'Overview'}}
          />
          <Stack.Screen
            name={routes.detailsScreen}
            component={DetailsScreen}
            options={({route}) => ({
              title: `${route.params.owner}/${route.params.repo}`,
            })}
          />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
