import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './app/screens/List';
import MovieDetails from './app/screens/MovieDetails';
import Tabs from './app/nav/Tabs';
import Info from './app/screens/Info';
import { NativeBaseProvider, extendTheme } from 'native-base';

const theme = extendTheme({
  primary: {
    600: '#5260ff'
  }
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary[600]
  }
}

const RootStack = createNativeStackNavigator()

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer theme={MyTheme}>
        <RootStack.Navigator initialRouteName='Tabs'>
          <RootStack.Screen name='Tabs' component={Tabs} />
          <RootStack.Screen name='Info' component={Info} />
        </RootStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    
  );
}

