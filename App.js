import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import {View, Button ,StyleSheet, Text, SafeAreaView, ScrollView,TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
  const[isInputValid,setIsInputValid] = useState(false)
  const[submitMessage,setSubmitMessage] = useState("")

  const[name,setName] = useState(null);
  const[surname,setSurname] = useState(null);
  const[birthday,setBirthday] = useState(null);
  const[city,setCity] = useState(null);
  const[side,setSide] = useState(null);

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
    setBirthday(currentDate)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  }; 

  const submit = () => {
    (name && surname && birthday && city && genderValue && vaccineValue && side && symptompsValue)?setSubmitMessage("Submitted!"):setSubmitMessage("Please fill the form correctly!")
  }
  
  return (
  <SafeAreaView style={styles.droidSafeArea}>
    <ScrollView>
      <Text style={styles.title}>Covid-19 Survey</Text>
      <View>
        <Text style={styles.header}>Name</Text>
        <TextInput
        id="nameInput"
        style={styles.inputField}
        onChangeText={(text)=> setName(text)}
        />
        
      </View>
      
      <View>
        <Text style={styles.header}>Surname</Text>
        <TextInput
        id="surnameInput"
        style={styles.inputField}
        onChangeText={(text)=> setSurname(text)}
        />
      </View>
      
      <View>
        <Text style={styles.header}>Birthday</Text>
        {birthday && (<Text style={{color:"red",marginBottom:10}}>{birthday.getDate() + '-' + parseInt(birthday.getMonth() + 1) + '-' + birthday.getFullYear()}</Text>)}
        <Button onPress={showDatepicker} title="Choose" />
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          id="birthdayInput"
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
        id="cityInput"
        onChangeText={(text)=> setCity(text)}
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
          id="genderInput"
          setOpen={setGenderOpen}
          setValue={setGenderValue}
          setItems={setGenderItems}
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
          id="vaccineInput"
          setOpen={setVaccineOpen}
          setValue={setVaccineValue}
          setItems={setVaccineItems}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
        />
      </View>
    
      <View>
        <Text style={styles.header}>Side Effects After Vaccination</Text>
        <TextInput
        style={styles.textField}
        id="sideInput"
        multiline={true}
        onChangeText={(text)=> setSide(text)}
        />
      </View>

      <View style={{
          zIndex:999,
          height:openSymptomps?180:110
      }}>
        <Text style={styles.header}>Any PCR positive cases and Covid-19 symptoms after 3rd vaccination</Text>  
        <DropDownPicker
          open={openSymptomps}
          value={symptompsValue}
          items={symptompsItems}
          setOpen={setSymptompsOpen}
          setValue={setSymptompsValue}
          setItems={setSymptompsItems}
          listMode="SCROLLVIEW"
          id="caseInput"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
          dropDownDirection="BOTTOM"
        />
      </View>
      {(name && surname && birthday && city && genderValue && vaccineValue && side && symptompsValue) ? <Button title='Send' id="sendButton" onPress={submit}></Button>:null}
      
      <Text id="successMessage">{submitMessage}</Text>
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
    color:"black",
    fontSize:15,
    marginBottom:5,
    marginTop:5
  }
});
