import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomMultiSelect from "../../../../components/CustomSelect/CustomMultiSelect";


const empstatus=[
    {value:1,label:'Active'},
    {value:2,label:'Resigned'},
    {value:3,label:'Terminated'},
    {value:4,label:'Probation'},
    
  ]

const Filters = ({setFilters,dropdowns,filters, handleSave,clearFilters}) => {
    
    const { control, handleSubmit, setValue,reset, formState: { errors }, watch } = useForm({
        defaultValues:filters
    })


   

    const handleClear=()=>{
        reset( {
            branch:[],
            department:[],
            role:[],
            emptype:[],
            status:[],
        })

        clearFilters()
         
    }


    // console.log(watch('branch'))


  return (
    <View>
      <CustomMultiSelect name='branch' control={control} placeholder='Select branches' options={dropdowns.branchOptions} />

      <CustomMultiSelect name='department' control={control} placeholder='Select departments' options={dropdowns.departmentOptions} />

      <CustomMultiSelect name='role' control={control} placeholder='Select role' options={dropdowns.jobOptions} />

      <CustomMultiSelect name='emptype' control={control} placeholder='Select employment type' options={dropdowns.empTypeOpt} />

      <CustomMultiSelect name='status' control={control} placeholder='Select employment status' options={empstatus} />


     <View className='flex-row items-center justify-between'>
      <Pressable onPress={handleSubmit(handleSave)} className='p-2 px-3 rounded-xl bg-zinc-200'>
        <Text>Apply</Text>
      </Pressable>

      <Pressable onPress={handleClear} className='p-2 px-3 rounded-xl bg-zinc-200'>
        <Text>Clear</Text>
      </Pressable>


      </View>
    </View>

  )
}

export default Filters

const styles = StyleSheet.create({})
