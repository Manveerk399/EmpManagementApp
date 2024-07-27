import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import img from '../../assets/logo.png'

const avatars = [
img ,
 img ,
 img,
 img ,
];

const GroupedAvatars = () => {
    return (
      <View style={styles.container}>
        {avatars.slice(0, 3).map((avatar, index) => (
          <View key={index} style={[styles.avatarContainer, { marginRight: index -3 }]}>
            <Avatar.Image size={30} source={img} />
          </View>
        ))}
        {avatars.length > 3 && (
          <View style={[styles.avatarContainer, styles.moreContainer]}>
            <Avatar.Text
              size={30}
              label={`+${avatars.length - 3}`}
              style={{ backgroundColor: '#ccc' }}
            />
          </View>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarContainer: {
      marginRight: -20, // Adjust based on your avatar size and design
    },
    moreContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default GroupedAvatars;

