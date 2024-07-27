import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { View } from 'react-native';

export const settings=[
    {
        id:1,
        name:'Manage Accounts',
        icon:<View className='bg-sky-100 p-3 rounded-full'><MaterialIcons name="manage-accounts" size={22} color="black" /></View>,
        link:'manageaccounts',
        tabs:[
            {
                name:'Users',
                link:'users'
            },
            {
                name:'Company',
                link:'company'
            },
            {
                name:'User Access Control',
                link:'accesscontrol'
            }        
        ]
    },
    {
        id:2,
        name:'Shifts',
        icon:<View className='bg-red-300 p-3 rounded-full'><MaterialCommunityIcons name="calendar-clock-outline" size={22} color="black" /></View>,
        link:'shiftsetting',
        tabs:[
            {
                name:'Configuration',
                link:'shiftconfigs'
            },
                   
        ]
    },
    {
        id:3,
        name:'Attendance',
        icon:<View className='bg-blue-400 p-3 rounded-full'><MaterialCommunityIcons name="calendar-check" size={22} color="black" /></View>,
        link:'attendancesetting',
        tabs:[
            {
                name:'Configuration',
                link:'configuration'
            },
                  
        ]
    },
    {
        id:4,
        name:'Leave',
        icon:<View className='bg-orange-300 p-3 rounded-full'><MaterialCommunityIcons name="umbrella-beach" size={22} color="black" /></View>,
        link:'leavesetting',
        tabs:[
            {
                name:'Configuration',
                link:'leaveconfig'
            },
                   
        ]
    },
    // {
    //     id:5,
    //     name:'Payroll',
    //     icon:<View className='bg-green-300 p-3 rounded-full'><MaterialIcons name="payment" size={22} color="black" /></View>,
    //     link:'payrollsetting',
    //     tabs:[
    //         {
    //             name:'Users',
    //             link:'users'
    //         },
                    
    //     ]
    // },
]