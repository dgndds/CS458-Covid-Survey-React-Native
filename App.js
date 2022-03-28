import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import {View, Button ,StyleSheet, Text, SafeAreaView, ScrollView,TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [openGender, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [genderItems, setGenderItems] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ]);

  const [openVaccine, setVaccineOpen] = useState(false);
  const [vaccineValue, setVaccineValue] = useState(null);
  const [vaccineItems, setVaccineItems] = useState([
    {label: 'BioNTech', value: 'biontech'},
    {label: 'Moderna', value: 'moderna'},
    {label: 'Johnson & Johnson’s Janssen', value: 'janssen'},
  ]);

  const [openSymptomps, setSymptompsOpen] = useState(false);
  const [symptompsValue, setSymptompsValue] = useState(null);
  const [symptompsItems, setSymptompsItems] = useState([
    {label: 'Yes', value: 'yes'},
    {label: 'No', value: 'no'},
  ]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  }; 
  
  return (
  <SafeAreaView style={styles.droidSafeArea}>
    <ScrollView>
      <Text style={styles.title}>Covid-19 Survey</Text>
      <View>
        <Text style={styles.header}>Name</Text>
        <TextInput
        style={styles.inputField}
        />
      </View>
      
      <View>
        <Text style={styles.header}>Surname</Text>
        <TextInput
        style={styles.inputField}
        />
      </View>
      
      <View>
        <Text style={styles.header}>Birthday</Text>
        <Text style={{color:"red",marginBottom:10}}>{date.toLocaleString()}</Text>
        <Button onPress={showDatepicker} title="Choose" />
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      </View>

      <View>
        <Text style={styles.header}>City</Text>
        <TextInput
        style={styles.inputField}
        />
      </View>

      <View style={{
          zIndex:999,
          height:openGender?170:90,
      }}>
        <Text style={styles.header}>Gender</Text>  
        <DropDownPicker
          open={openGender}
          value={genderValue}
          items={genderItems}
          setOpen={setGenderOpen}
          setValue={setGenderValue}
          setItems={setGenderItems}
          dropDownContainerStyle={{
            backgroundColor:"red",
          }}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
        />
      </View>

      <View style={{
          zIndex:999,
          height:openVaccine?210:90,
      }}>
        <Text style={styles.header}>Vaccine Type</Text>  
        <DropDownPicker
          open={openVaccine}
          value={vaccineValue}
          items={vaccineItems}
          setOpen={setVaccineOpen}
          setValue={setVaccineValue}
          setItems={setVaccineItems}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
          onOpen={() => setShowDropDown((prevState) => !prevState)}  
        />
      </View>
    
      <View>
        <Text style={styles.header}>Side Effects After Vaccination</Text>
        <TextInput
        style={styles.textField}
        multiline={true}
        />
      </View>

      <View style={{
          zIndex:999,
          height:openSymptomps?180:100
      }}>
        <Text style={styles.header}>Any</Text>  
        <DropDownPicker
          open={openSymptomps}
          value={symptompsValue}
          items={symptompsItems}
          setOpen={setSymptompsOpen}
          setValue={setSymptompsValue}
          setItems={setSymptompsItems}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
          dropDownDirection="BOTTOM"
        />
      </View>
      <Button title='Send'></Button>
      </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    backgroundColor: "white",
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingLeft: 10,
    paddingRight:10
  },
  inputField:{
    height: 40,
    // marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  textField:{
    height: 80,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
    zIndex:-1
  },
  title:{
    fontSize:50,
    fontWeight:"bold",
    color:"blue"
  },
  header:{
    color:"red",
    fontSize:15,
    marginBottom:5,
    marginTop:5
  }
});
