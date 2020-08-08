import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Home from './Home';
import Details from './Details';

export default () => {
  const Stack = createSharedElementStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerShown: false,
            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
          sharedElements={(route) => {
            const {movie} = route.params;
            return [
              {
                id: `item.${movie.title}.photo`,
                animation: 'fade',
                resize: 'auto',
              },
            ];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
