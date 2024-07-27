import { StyleSheet, Text, View,SectionList, Pressable, TextInput ,TouchableOpacity, Animated, Dimensions, Alert} from 'react-native'
import React,{useEffect, useRef, useState} from 'react'
import { Entypo } from '@expo/vector-icons';
import EmployeeCard from '../../../Teams/EmployeeCard';
import useFirestoreCollection from '../../../../firebase/useFirestoreCollection';
import { FontAwesome } from '@expo/vector-icons';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useSlot } from 'expo-router/build/views/Navigator';
import ActionSheet from 'react-native-actionsheet';
import { AntDesign } from '@expo/vector-icons';
import { useFetchDropdowns } from '../../../Teams/forms/EmployeeForm/useFetchDropdowns';
import Filters from './Filters';
import { deleteDoc } from 'firebase/firestore';
import { deleteFilterDocumentData } from '../../../../firebase/firebaseActions';


const { width } = Dimensions.get('window');

const Users = ({navigation,route}) => {
  const { data: employees, loading, error } = useFirestoreCollection('users', 'fullname');
  const { data: dropdowns } = useFetchDropdowns();
  const { deptfilter } = route.params || {deptfilter:null};
  const [searchText, setSearchText] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [noMatch, setNoMatch] = useState(false);
  const actionSheetRef = useRef();
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const [filters, setFilters] = useState({
    branch: [],
    department: [],
    role: [],
    emptype: [],
    status: [],
  });

  // console.log('filter',filters)

  const toggleFilterView = () => {
    if (isFilterVisible) {
      // Hide filter view
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsFilterVisible(false));
    } else {
      // Show filter view
      setIsFilterVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleSave = (data) => {
    setFilters(data);
    toggleFilterView();
  };

  const clearFilters = () => {
    setFilters({
      branch: [],
      department: [],
      role: [],
      emptype: [],
      status: [],
    });
    toggleFilterView();
  };

  useEffect(() => {
    filterEmployees();
  }, [employees, searchText, filters]);

  useEffect(()=>{

    setFilters(prev => ({
      ...prev,
      department:deptfilter ? [deptfilter] :[]
    }))

  },[deptfilter])

  const filterEmployees = () => {
    let filteredEmps = employees;

    if (searchText) {
      filteredEmps = filteredEmps.filter(employee =>
        employee.fullname.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filters.branch.length > 0) {
      filteredEmps = filteredEmps.filter(employee => filters.branch.includes(employee.branch?.value));
    }

    if (filters.department.length > 0) {
      filteredEmps = filteredEmps.filter(employee => filters.department.includes(employee.department?.value));
    }

    if (filters.role.length > 0) {
      filteredEmps = filteredEmps.filter(employee => filters.role.includes(employee.specificrole?.value));
    }

    if (filters.emptype.length > 0) {
      filteredEmps = filteredEmps.filter(employee => filters.emptype.includes(employee.emptype?.value));
    }

    if (filters.status.length > 0) {
      filteredEmps = filteredEmps.filter(employee => filters.status.includes(employee.empstatus?.value));
    }

    setNoMatch(filteredEmps.length === 0);
    setFilteredEmployees(filteredEmps);
  };

  const onChange = (e) => {
    if (e === '') {
      setFilteredEmployees([]);
      setNoMatch(false);
    }
    setSearchText(e);
  };

  // Group employees by the first letter of their first name
  const groupedEmployees = filteredEmployees.reduce((acc, employee) => {
    const firstLetter = employee.fullname[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(employee);
    return acc;
  }, {});

  // Convert the groupedEmployees object into an array of sections for SectionList
  const sections = Object.entries(groupedEmployees).map(([letter, employees]) => ({
    title: letter,
    data: employees,
  }));

  const renderItem = ({ item }) => {
    return <EmployeeCard info={item} onLongPress={showActionSheet} />;
  };

  const showActionSheet = (info) => {
    actionSheetRef.current.show();
    setSelectedCard(info);
  };

 

  const showDeleteConfirmation = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>deleteFilterDocumentData('users',selectedCard.id) }
      ]
    );
  };

  const handlePress = (index) => {
    switch (index) {
      case 0:
        navigation.navigate('profile', { action: 'view', data: selectedCard });
        break;
      case 1:
        navigation.navigate('userform', { action: 'edit', data: selectedCard });
        break;
      case 2:
      showDeleteConfirmation()
        break;
      case 3:
        console.log('Option 4 pressed');
        break;
      default:
        break;
    }
  };



  if (loading) {

    return <View className='flex-1 items-center justify-center'><ActivityIndicator animating={true} color={MD2Colors.blue400} size={40}/></View>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }


  return (
    <View className='flex-1 p-4 bg-zinc-100 relative'>
     {Object.keys(dropdowns).length>0 && <Pressable  onPress={toggleFilterView} className='self-end mb-3 p-2 rounded-md bg-white'>
    <AntDesign name="filter" size={20} color="gray" />
    </Pressable>}
    <View className='flex-row items-center justify-end mr-2 mb-2 gap-2'>
      <View className='flex-1 bg-white rounded-3xl justify-center p-3'>
        <TextInput placeholder='search employee' placeholderTextColor='gray' onChangeText={onChange} value={searchText}/>
      </View>
    <Pressable onPress={filterEmployees}>
    <FontAwesome name="search" size={16} color="gray" />
    </Pressable>
    

    </View>
    {
    noMatch ? <View className='flex-1 items-center jusrify-center mt-5'>

      <Text className='font-bold text-gray'>No Match Found</Text>
    </View>
    
    
    
    
    :<SectionList
    sections={sections}
    keyExtractor={(item, index) => item.id}
    renderItem={renderItem}
    renderSectionHeader={({ section: { title } }) => (
      <View style={{padding: 10 }}>
        <Text className='text-zinc-400 font-bold'>{title}</Text>
      </View>
    )}
    showsVerticalScrollIndicator={false}

    ItemSeparatorComponent={()=><View className='h-4'/>}
  />}


      <TouchableOpacity onPress={()=>navigation.navigate('userform')} className='p-2 bg-sky-200 absolute rounded-full bottom-20 right-5'>
      <Entypo name="plus" size={26} color="black" />
      </TouchableOpacity>

      <ActionSheet
        ref={actionSheetRef}
        title={'Choose an option'}
        options={['View Details','Update Details', 'Delete User','Cancel']}
        cancelButtonIndex={3}
        destructiveButtonIndex={3}
        onPress={(index) => handlePress(index)}
      />

{isFilterVisible && (
        <Animated.ScrollView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: width * 0.8,
            backgroundColor: 'white',
            transform: [{ translateX: slideAnim }],
            padding: 20,
          }}
          contentContainerStyle={{paddingBottom:100}}
        >
          <View className='flex-row items-center justify-between'>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Filters</Text>
          <Pressable onPress={toggleFilterView} className='px-3 mb-2'>
            <Text style={{ color: 'blue' }}>Close Filters</Text>
          </Pressable>
          </View>
          {/* Add your filter options here */}
          <Filters dropdowns={dropdowns} setFilters={setFilters} filters={filters} handleSave={handleSave} clearFilters={clearFilters}/>
         
        </Animated.ScrollView>
      )}
    </View>
  )
}

export default Users