import { StyleSheet, Text, View,Switch} from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form'

export const CustomSwitch = ({control,name,toggleSwitch}) => {
    return (
      <View>
         <Controller 
            control={control}
            name={name}
            render={({field:{onBlur,onChange,value},fieldState:{error}}) => 
            <>
            <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={value ? "#fffff" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(e)=>toggleSwitch(e,name)}
        value={value}
        style={{
            transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] // Adjust scale to make the switch smaller
          }}
      />
              {error &&
              <Text style={{color:'red',alignSelf:'stretch'}}>{error.message || 'Error'}</Text>}
              </>
            }
            />
      </View>
    )
  }

const styles = StyleSheet.create({})

