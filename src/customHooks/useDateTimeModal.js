import react,{useState} from "react";
import { convertToDateFormat } from "../utility/getDate";


export const useDateTimeModal=(setValue)=>{

    const [isTimePickerVisible, setTimePickerVisibility] = useState({show:false});

    const showTimePicker = (name) => {
        setTimePickerVisibility({show:true,name:name});
      };
    
      const hideTimePicker = () => {
        setTimePickerVisibility({show:false});
      };

      const handleConfirm = (date) => {
        console.log('date',date)
      
        setValue(isTimePickerVisible.name,convertToDateFormat(date))
        
        hideTimePicker();
      };



      return {isTimePickerVisible,handleConfirm,showTimePicker,hideTimePicker}

}