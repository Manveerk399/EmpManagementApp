import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../src/screens/StartScreen/StartScreen';
import LogInScreen from '../src/screens/LogInScreen';
import ForgotPasswordScreen from '../src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../src/screens/ResetPasswordScreen';
import Dashboard from '../src/screens/Dashboard';
import ScreenHeaderButton from '../src/components/Header/ScreenHeaderButton';
import { icons } from '../src/constants';
import AttendanceList from '../src/screens/Attendance/AttendanceList';
import Leave from '../src/screens/Leave/Leave';
import LeaveForm from '../src/screens/Leave/components/form/LeaveForm';
import Tasks from '../src/screens/Tasks/Tasks';
import Teams from '../src/screens/Teams/Teams';
import EmployeeForm from '../src/screens/Teams/forms/EmployeeForm/EmployeeForm';
import Landing from '../src/screens/Landing/Landing';
import SignUp from '../src/screens/SignUp/SignUp';
import CreateCompany from '../src/screens/CreateCompany/CreateCompany';
import ManageAccount from '../src/screens/AdminPage/ManageAccount/ManageAccount';
import LeaveSettings from '../src/screens/AdminPage/LeaveSettings/LeaveSettings';
import AttendanceSettings from '../src/screens/AdminPage/AttendanceSettings/AttendanceSettings';
import ShiftSettings from '../src/screens/AdminPage/ShiftSettings/ShiftSettings';
import PayrollSettings from '../src/screens/AdminPage/PayrollSettings/PayrollSettings';
import AdminPage from '../src/screens/AdminPage/AdminPage';
import { useAuthContext } from '../src/context/AuthContext';
import Users from '../src/screens/AdminPage/ManageAccount/Users/Users';
import Company from '../src/screens/AdminPage/ManageAccount/Company/Company';
import AccessControl from '../src/screens/AdminPage/ManageAccount/AccessControl/AccessControl';
import General from '../src/screens/AdminPage/ShiftSettings/General/General';
import ShiftControl from '../src/screens/AdminPage/ShiftSettings/ShiftsControl/ShiftControl';
import ShiftForm from '../src/screens/AdminPage/ShiftSettings/ShiftsControl/ShiftForm';
import Shifts from '../src/screens/Shifts/Shifts';
import AssignShifts from '../src/screens/Shifts/AssignShifts';
import AddUserForm from '../src/screens/AdminPage/ManageAccount/Users/AddUserForm';
import Department from '../src/screens/AdminPage/ManageAccount/Company/Department/Department';
import DepartmentForm from '../src/screens/AdminPage/ManageAccount/Company/Department/DepartmentForm';
import Branches from '../src/screens/AdminPage/ManageAccount/Company/Branches/Branches';
import BranchForm from '../src/screens/AdminPage/ManageAccount/Company/Branches/BranchForm';
import JobTitles from '../src/screens/AdminPage/ManageAccount/Company/JobTitles/JobTitles';
import JobTitleForm from '../src/screens/AdminPage/ManageAccount/Company/JobTitles/JobTitleForm';
import CompanyPolicy from '../src/screens/AdminPage/ManageAccount/Company/CompanyPolicy/CompanyPolicy';
import CompanyPolicyForm from '../src/screens/AdminPage/ManageAccount/Company/CompanyPolicy/CompanyPolicyForm';
import EmployementType from '../src/screens/AdminPage/ManageAccount/Company/EmpType/EmployementType';
import EmpTypeForm from '../src/screens/AdminPage/ManageAccount/Company/EmpType/EmpTypeForm';
import CompanyDetails from '../src/screens/AdminPage/ManageAccount/Company/CompanyDetails';
import { ShiftSetting } from '../src/screens/Shifts/Shifts';
import ShiftAttendanceSettings from '../src/screens/AdminPage/ShiftSettings/ShiftsControl/ShiftAttendanceSettings';
import UserProfile from '../src/screens/UserProfile/UserProfile';

const Stack = createStackNavigator();

const AccessStack=()=> {

  
  
  return (
    <Stack.Navigator>

   <Stack.Screen name="landing" component={Landing} options={{
         headerTitle:"",
         headerShown:false,
      }}/>
       <Stack.Screen name="SignUp" component={SignUp} options={{
        headerTitle:"",
        headerShown:false,
      }}/>
      <Stack.Screen name="Login" component={LogInScreen} options={{
        headerTitle:"",
        headerShown:false
      }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="RegisterComp" component={CreateCompany} options={{
        headerTitle:"",
        headerShown:false
      }}/>
    </Stack.Navigator>
  );
}

export default AccessStack


export const HomeStack=()=>{
  
  return <Stack.Navigator>
  
  
  <Stack.Screen name="Dashboard" component={Dashboard}  
      
      options={{
        headerShown:false,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        // headerTitle:"",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )

        
      }}

      


      

    
      />
      

<Stack.Screen name='Shifts' component={Shifts}
 options={{
      
        
  // headerStyle:{backgroundColor:'#3385ff'},
  // headerShadowVisible:false,
  // headerTitle:"",
  // headerLeft:()=>(
  //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
  // ),
  // headerRight:()=>(
  //   <ShiftSetting/>
  //   )

  
}}
/>

<Stack.Screen name='AssignShift' component={AssignShifts} options={{
        headerShown:false,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        // headerTitle:"Users",
        
    
        
      }}/>
     
       <Stack.Screen name="Attendance" component={AttendanceList} 
      
      options={{
      
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        // headerTitle:"",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )

        
      }}/>

       

      {/*<Stack.Screen name='Leave' component={Leave}/>
      <Stack.Screen name = 'LeaveForm' component={LeaveForm}/>
      <Stack.Screen name='Tasks' component={Tasks}/>
      <Stack.Screen name='Teams' component={Teams}/>
       <Stack.Screen name='CreateEmp' component={EmployeeForm}  options={{
        headerShown:false
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        // headerTitle:"",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )

        
      }}/> */

      
      }
        <Stack.Screen name='Admin' component={AdminPage} options={
      {headerShown:true,headerTitle:'Admin'}} />
    <Stack.Screen name="manageaccounts" component={ManageAccount}  
      
      options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Manage Account",
        
    
        
      }}
      />
      <Stack.Screen name='users' component={Users}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Users",
        
    
        
      }}/>
       <Stack.Screen name='accesscontrol' component={AccessControl}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Users",
        
    
        
      }}/>

<Stack.Screen name='userform' component={AddUserForm}  options={{
        headerShown:false,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        // headerTitle:"Users",
        
    
        
      }}/>

      



       <Stack.Screen name='company' component={Company}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Company Setup",
        
    
        
      }}/>

<Stack.Screen name='companydetails' component={CompanyDetails}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Company Details",
        
    
        
      }}/>
       <Stack.Screen name='department' component={Department}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Departments",
        
    
        
      }}/>

<Stack.Screen name='departmentform' component={DepartmentForm}  options={{
        headerShown:false,
        
        
        
    
        
      }}/>

<Stack.Screen name='branch' component={Branches}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Branches",
        
    
        
      }}/>


<Stack.Screen name='jobtitles' component={JobTitles}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Job Titles",

      }}/>

<Stack.Screen name='branchform' component={BranchForm}  options={{
        headerShown:false,
      }}/>



<Stack.Screen name='jobtitleform' component={JobTitleForm}  options={{
        headerShown:false,
      }}/>


<Stack.Screen name='emptypes' component={EmployementType}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Employment Types",

      }}/>

<Stack.Screen name='emptypeform' component={EmpTypeForm}  options={{
        headerShown:false,
      }}/>

      <Stack.Screen name="leaveconfig" component={LeaveSettings}  
      
      options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"Leave Settings",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>

<Stack.Screen name='companypolicy' component={CompanyPolicy}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Company Policy",

      }}/>

<Stack.Screen name='companyPolicyForm' component={CompanyPolicyForm}  options={{
        headerShown:false,
      }}/>
       <Stack.Screen name="configuration" component={AttendanceSettings}  
      
      options={{
        headerShown:true,
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"Attendance",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>
       <Stack.Screen name="shiftconfigs" component={ShiftSettings}  
      
      options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"Shift",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>

      <Stack.Screen name="shiftgeneral" component={General}  
      
      options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"General",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>

     <Stack.Screen name="shiftscontrol" component={ShiftControl}  
      
      options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"Shift",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>

     <Stack.Screen name="shiftform" component={ShiftForm}  
      
      options={{
        headerShown:false,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        // headerTitle:"Shift",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>


<Stack.Screen name="shiftSettingsform" component={ShiftAttendanceSettings}  
      
      options={{
        headerShown:false,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        // headerTitle:"Shift",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>


       <Stack.Screen name="payrollsetting" component={PayrollSettings}  
      
      options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"Payroll",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/> 
      </Stack.Navigator>
      
      
    }



export const AdminPageStack=()=>{



  return  <Stack.Navigator>
    <Stack.Screen name='Admin' component={AdminPage} options={
      {headerShown:true,headerTitle:'Admin'}} />
    <Stack.Screen name="manageaccounts" component={ManageAccount}  
      
      options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Manage Account",
        
    
        
      }}
      />
      <Stack.Screen name='users' component={Users}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Users",
        
    
        
      }}/>
       <Stack.Screen name='accesscontrol' component={AccessControl}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Users",
        
    
        
      }}/>

<Stack.Screen name='userform' component={AddUserForm}  options={{
        headerShown:false,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        // headerTitle:"Users",
        
    
        
      }}/>

<Stack.Screen name='profile' component={UserProfile}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"",
        
    
        
      }}/>

      



       <Stack.Screen name='company' component={Company}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Company Setup",
        
    
        
      }}/>

<Stack.Screen name='companydetails' component={CompanyDetails}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Company Details",
        
    
        
      }}/>
       <Stack.Screen name='department' component={Department}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Departments",
        
    
        
      }}/>

<Stack.Screen name='departmentform' component={DepartmentForm}  options={{
        headerShown:false,
        
        
        
    
        
      }}/>

<Stack.Screen name='branch' component={Branches}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Branches",
        
    
        
      }}/>


<Stack.Screen name='jobtitles' component={JobTitles}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Job Titles",

      }}/>

<Stack.Screen name='branchform' component={BranchForm}  options={{
        headerShown:false,
      }}/>



<Stack.Screen name='jobtitleform' component={JobTitleForm}  options={{
        headerShown:false,
      }}/>


<Stack.Screen name='emptypes' component={EmployementType}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Employment Types",

      }}/>

<Stack.Screen name='emptypeform' component={EmpTypeForm}  options={{
        headerShown:false,
      }}/>

      <Stack.Screen name="leaveconfig" component={LeaveSettings}  
      
      options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"Leave Settings",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>

<Stack.Screen name='companypolicy' component={CompanyPolicy}  options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        headerShadowVisible:false,
        headerTitle:"Company Policy",

      }}/>

<Stack.Screen name='companyPolicyForm' component={CompanyPolicyForm}  options={{
        headerShown:false,
      }}/>
       <Stack.Screen name="configuration" component={AttendanceSettings}  
      
      options={{
        headerShown:true,
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"Attendance",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>
       <Stack.Screen name="shiftconfigs" component={ShiftSettings}  
      
      options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"Shift",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>

      <Stack.Screen name="shiftgeneral" component={General}  
      
      options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"General",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>

     <Stack.Screen name="shiftscontrol" component={ShiftControl}  
      
      options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"Shift",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>

     <Stack.Screen name="shiftform" component={ShiftForm}  
      
      options={{
        headerShown:false,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        // headerTitle:"Shift",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>


<Stack.Screen name="shiftSettingsform" component={ShiftAttendanceSettings}  
      
      options={{
        headerShown:false,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        // headerTitle:"Shift",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>


       <Stack.Screen name="payrollsetting" component={PayrollSettings}  
      
      options={{
        headerShown:true,
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        headerTitle:"Payroll",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )
    
        
      }}/>
  </Stack.Navigator>
}