import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MainRoutes, MainStack } from './src/routes/routes';
import Login from './src/screen/LoginScreen/Login';
import SignUp from './src/screen/LoginScreen/SignUp';
import Category from './src/screen/CategoryScreen/Category';
import { useAppSelector } from './src/hooks';
import { stringIsEmpty } from './src/helpers/function.helper';

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const data = useAppSelector(state => state.userReducer.loginData);
  React.useEffect(() => {
    if (!stringIsEmpty(data?.accessToken)) {
      setIsSignedIn(true)
    } else {
      setIsSignedIn(false)
    }
  }, [data]);
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName={MainRoutes.Login}>
        {isSignedIn ? (
          <>
            <MainStack.Screen
              name={MainRoutes.Category}
              component={Category}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />
          </>
        ) : (
          <>
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
        )}

      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
