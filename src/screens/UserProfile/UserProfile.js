import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { abbreviateFullName } from '../Dashboard/Welcome/Welcome'
import { FontAwesome5 } from '@expo/vector-icons';

const UserProfile = ({ navigation, route }) => {
  const { profile: currentUser } = useAuthContext()
  const { action, data } = route.params || { action: null, data: {} };

  const profile = action === 'view' ? data : currentUser

  console.log('user prof', profile)

  const sections = [
    {
      title: 'About',
      data: [
        { label: 'First Name', value: profile?.firstname },
        { label: 'Last Name', value: profile?.lastname },
        { label: 'Email Address', value: profile?.email },
        { label: 'Date of birth', value: profile?.dob },
        { label: 'Home Address', value: `${profile?.address1 || ''} ${profile?.address2 || ''} ${profile?.country || ''} ${profile?.city || ''} ${profile?.postalcode || ''}` },
        { label: 'Gender', value: profile?.gender?.label },
        { label: 'Marital Status', value: profile?.marital?.label },
      ],
    },
    {
      title: 'Work Information',
      data: [
        { label: 'Department', value: profile?.department?.label },
        { label: 'Branch', value: profile?.branch?.label },
        { label: 'Role', value: profile?.specificrole?.label },
        { label: 'Access Role', value: profile?.accessrole?.label },
        { label: 'Reporting Manager', value: profile?.reportingmanager?.label },
        { label: 'Employment Type', value: profile?.emptype?.label },
        { label: 'Employment Status', value: profile?.empstatus?.label },
        { label: 'Joined On', value: profile?.datejoining },
        { label: 'Left On', value: profile?.dateexiting },
      ],
    },
    {
      title: 'Contact Details',
      data: [
        { label: 'Work Mobile No.', value: profile?.workphonenum },
        { label: 'Personal Mobile No.', value: profile?.persophonenum },
      ],
    },
    {
      title: 'Education',
      data: profile?.education?.length ? profile.education : [{ label: 'No Education Data', value: '' }],
    },
    {
      title: 'Work Experience',
      data: profile?.workexperience?.length ? profile.workexperience : [{ label: 'No Work Experience Data', value: '' }],
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemLabel}>{item.label}</Text>
      <Text>{item.value}</Text>
    </View>
  );

  const renderEducationItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemLabel}>Degree</Text>
      <Text>{item.degree}</Text>
      <Text style={styles.itemLabel}>Institution</Text>
      <Text>{item.institutename}</Text>
      <Text style={styles.itemLabel}>Date of Completion</Text>
      <Text>{item.dateofcompletion}</Text>
    </View>
  );

  const renderWorkExperienceItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemLabel}>Company</Text>
      <Text>{item.company}</Text>
      <Text style={styles.itemLabel}>Title</Text>
      <Text>{item.title}</Text>
      <Text style={styles.itemLabel}>From</Text>
      <Text>{item.from}</Text>
      <Text style={styles.itemLabel}>To</Text>
      <Text>{item.to}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeader}>{title}</Text>
    </View>
  );

  return (
    <View className='flex-1'>
      <View className='p-10 bg-sky-100' style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}>
        <Pressable onPress={() => navigation.navigate('userform', { action: 'edit', data: profile })} className='self-end left-4'>
          <FontAwesome5 name="user-edit" size={18} color="gray" />
        </Pressable>
        <View className='self-center p-10 bg-white rounded-full'>
          <Text className='text-2xl font-bold'> {abbreviateFullName(profile?.fullname)}</Text>
        </View>
        <Text className='font-semibold pt-3 text-black text-lg self-center'>
          {profile?.fullname}
        </Text>
        <Text className='text-bold text-black text-md self-center'>
          {profile?.email}
        </Text>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.label + index}
        renderItem={({ item, section }) => {
          if (section.title === 'Education') {
            return renderEducationItem({ item });
          } else if (section.title === 'Work Experience') {
            return renderWorkExperienceItem({ item });
          } else {
            return renderItem({ item });
          }
        }}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{ paddingBottom: 30 }}
        stickySectionHeadersEnabled={true}
        style={{ backgroundColor: 'white' }}
      />
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemLabel: {
    fontWeight: '600',
    marginBottom: 2,
  },
})
