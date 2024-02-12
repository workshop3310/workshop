import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {human, iOSColors} from 'react-native-typography';
import EStyleSheet from 'react-native-extended-stylesheet';

import * as routes from './routes';
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/details/Details';

EStyleSheet.build({
  $rem: human.bodyObject.fontSize,
});

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: iOSColors.blue,
    background: iOSColors.white,
    card: iOSColors.white,
    text: iOSColors.black,
    border: iOSColors.midGray,
    notification: iOSColors.orange,
  },
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? iOSColors.black : iOSColors.white,
  };

  return (
    <NavigationContainer linking={routes.linking} theme={theme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
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
