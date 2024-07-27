
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity,StyleSheet,Pressable } from "react-native";


// const CustomButton = ({
//   title,
//   handlePress,
//   containerStyles,
//   textStyles,
//   isLoading,
// }) => {
//   return (
//     <TouchableOpacity
//       onPress={handlePress}
//       activeOpacity={0.7}
//       className={`bg-blue-400 rounded-full min-h-[62px] min-w-[70px] flex flex-row justify-center items-center ${containerStyles} ${
//         isLoading ? "opacity-50" : ""
//       }`}
//       disabled={isLoading}
//     >
//       <Text className={`text-primary font-pbold text-lg ${textStyles}`}>
//         {title}
//       </Text>

//       {isLoading && (
//         <ActivityIndicator
//           animating={isLoading}
//           color="#fff"
//           size="small"
//           className="ml-2"
//         />
//       )}
//     </TouchableOpacity>
//   );
// };

// export default CustomButton;

const CustomButton = ({onPress,text,type='PRIMARY',width='70%',isLoading=false,loadingText='loading...'}) => {
  return (
    <Pressable onPress={onPress}  style={[styles.container,styles[`container_${type}`],{width:width}]}>
      <Text style={[styles.text,styles[`text_${type}`]]}>{!isLoading? text : loadingText}</Text>
    </Pressable>
  )
}

const styles=StyleSheet.create({
    container:{
      padding:15,
      alignItems:'center',
      borderRadius:100,
      marginVertical:5
    },



    container_PRIMARY:{
        backgroundColor:'#66a3ff',
    },

    container_TERTIARY:{

    },
    text:{
        fontWeight:'bold',
        color:'white'

    },

    text_TERTIARY:{
        color:'white'

    }
})

export default CustomButton