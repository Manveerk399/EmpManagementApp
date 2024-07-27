import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import Employee from './Employee';
import Department from './Department';




const renderScene = SceneMap({
  emp: Employee,
  dept: Department,
});

export default function TabViewExample({navigation}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'emp', title: 'Employees' },
    { key: 'dept', title: 'Department' },
  ]);

  return (
    <TabView
     
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        switch (route.key) {
          case 'emp':
            return <Employee navigation={navigation}/>;
          case 'dept':
            return <Department />;
          default:
            return null;
        }
      }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'white', height: 3 }} // Customize the indicator color and height
          labelStyle={{ fontSize: 13, fontWeight: 'bold' }}
          className='bg-blue-400'
        />
      )}
      
     
    />
  );
}