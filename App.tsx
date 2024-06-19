import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MainRoutes, MainStack } from './src/routes/routes';
import Login from './src/module/login/Login';
import SignUp from './src/module/login/SingUp';
import Category from './src/module/category/Category';

const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName={MainRoutes.Login}>
        <>
          <MainStack.Screen
            name={MainRoutes.Category}
            component={Category}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.Login}
            component={Login}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.SignUp}
            component={SignUp}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
        </>
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
