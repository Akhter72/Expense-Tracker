import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ManageExpense from './src/screens/ManageExpenses';
import RecentExpenses from './src/screens/RecentExpenses';
import AllExpenses from './src/screens/AllExpenses';

import { GlobalStyles } from './src/constants/styles';

import {Ionicons} from '@expo/vector-icons';
import IconButton from './src/components/UI/IconButton';
import ExpensesContextProvider from './src/store/expenses-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return <BottomTabs.Navigator screenOptions={({navigation}) => ({
    headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
    headerTintColor: 'white',
    tabBarInactiveTintColor: 'white',
    tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight:(tintColor) =>  {
      return (
                <IconButton icon="add" size={30} color='white' onPress={() => {navigation.navigate("ManageExpense")}} />
      )
    }
  })}> 
          <BottomTabs.Screen 
            name="RecentExpenses" 
            component={RecentExpenses}
            options={{
              title: "Recent Expenses",
              tabBarLabel: "Recent",
              tabBarIcon: ({color, size}) => (
                <Ionicons name="hourglass" size={size} color='white' />
              )
            }}
          />
          <BottomTabs.Screen 
            name="AllExpenses" 
            component={AllExpenses}
            options={{
              title: "All Expenses",
              tabBarLabel: "All Expenses",
              tabBarIcon: ({color, size}) => (
                <Ionicons name="calendar" size={size} color='white' />
              )
            }}
          />
         </BottomTabs.Navigator>
}
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store} >
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white',
          }}
        >
          <Stack.Screen 
            name="ExpensesOverview" 
            component={ExpensesOverview}  
            options={{headerShown: false}}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} 
            options={{
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
      </Provider>
    </>
  );
}


