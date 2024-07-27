import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import PersonalDetails from './PersonalDetails';
import WorkInfomation from './WorkInfomation';
import ContactDetails from './ContactDetails';
import EducationalDetails from './EducationalDetails';
import WorkExperience from './WorkExperience';


export const EmployeeFormTab = ({control,handleSetDate,index,setIndex,timeModalActions,mainFormFunction}) => {
    const layout = useWindowDimensions();


    
    const [routes] = React.useState([
      { key: 'personal', title: 'Person Details' },
      { key: 'contact', title: 'Contact Details' },
      { key: 'work-info', title: 'Work Info' },
      { key: 'education', title: 'Education' },
      { key: 'experience', title: 'Work Experience' },
    ]);

    
  
  return (
  
       <TabView
       
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        switch (route.key) {
          case 'personal':
            return <PersonalDetails control={control} handleSetDate={handleSetDate} timeModalActions={timeModalActions}/>
          case 'work-info':
            return <WorkInfomation control={control} timeModalActions={timeModalActions}/>

          case 'contact':
                return <ContactDetails control={control} timeModalActions={timeModalActions}/>
          
                case 'education':
                  return <EducationalDetails control={control} timeModalActions={timeModalActions} mainFormFunction={mainFormFunction} />

                  case 'experience':
                return <WorkExperience control={control} timeModalActions={timeModalActions} mainFormFunction={mainFormFunction}/>
          default:
            return null;
        }
      }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
        
          {...props}
          indicatorStyle={{height:0}} // Customize the indicator color and height
          labelStyle={{ fontSize: 10, fontWeight: 'bold',color:'black' }}
          style={{backgroundColor:'#d1d1e0',color:'black',borderRadius:20}}
          scrollEnabled={true}
          activeColor={'#00ace6'}
          inactiveColor='#b3b3cc'
         
        />
      )}
      
     
    />
    
  )
}

export default EmployeeFormTab

const styles = StyleSheet.create({})