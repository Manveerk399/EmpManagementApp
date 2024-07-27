import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { useAuthContext } from '../../../../context/AuthContext';
import { useLeaveAction } from '../../useLeaveActions';

const Status = ({status,id}) => {
  const [visible, setVisible] = React.useState(false);
  const {updateLeaveStatus} = useLeaveAction()

  const{profile} = useAuthContext()

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleStatusChange =async (status) => {
    console.log(`${status} by ${profile.fullname}: ${status}`);

    try {
        await updateLeaveStatus(id, status,profile.fullname);
        console.log(`Status changed to: ${status}`);
        
      } catch (error) {
        console.error('Error changing status: ', error);
      }
    closeMenu();
  };

  return (
    <View>
        <Menu
         contentStyle={{backgroundColor:'white',color:'black'}}
         
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Pressable onPress={openMenu}>
          <View className='p-2 bg-zinc-200 rounded-xl bg-green-100'>
          <Text className='text-xs font-semibold'>{status}</Text>
          </View>
          </Pressable>
          
          
          
          }>
          <Menu.Item titleStyle={{color:'black',fontSize:15}} onPress={() => handleStatusChange('Approved')}  title="Approve" />
          <Menu.Item  titleStyle={{color:'black',fontSize:15}} onPress={() => handleStatusChange('Rejected')}  title="Reject" />
          <Menu.Item  titleStyle={{color:'black',fontSize:15}} onPress={() => handleStatusChange('Cancelled')}  title="Cancel" />
        </Menu>
      </View>
  )
}

export default Status

const styles = StyleSheet.create({})