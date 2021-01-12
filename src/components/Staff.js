import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList, TextInput } from 'react-native-gesture-handler';

import HeaderBar from '../custom/HeaderBar'
import UserCard from './UserCard'


const {width, height} = Dimensions.get('window')

const Staff = ({navigation}) => {

    const [members,setMembers] = useState([
        {fname:'Ronald',lname:'Tendo',age:61,id:1,qualification:'Diploma',position:'Developer',experience:2,},
        {fname:'Steven',lname:'Edonga',age:25,id:2,qualification:'Bootcamp graduate',position:'Intern',experience:1},
        {fname:'Pascal',lname:'Sabitti',age:41,id:3,qualification:'Bachelors Degree',position:'Backend Engineer',experience:2},
        {fname:'Kenneth',lname:'Ocitti',age:54,id:4, qualification:'Diploma',position:'Developer',experience:2},
        {fname:'Enock',lname:'Kyazze',age:36,id:5,qualification:'Diploma',position:'Developer',experience:2},
        {fname:'Nakiganda',lname:'Aisha',age:23,id:6,qualification:'Certificate',position:'Developer',experience:2},
        {fname:'Frank',lname:'Buwembo',age:24,id:7,qualification:'Bachelors Degree',position:'Developer',experience:2},
        {fname:'Natabo',lname:'Hilda',age:26,id:8,qualification:'Diploma',position:'Developer',experience:2},
        {fname:'Isaac',lname:'Okoth',age:21,id:9,qualification:'Diploma',position:'Developer',experience:2}
    ])
    const [searchField,setSearchField] = useState("")
    const [filterBy, setFilterBy] = useState("name")
    const [items,setItems] = useState([
        
        {label: 'Name', value: 'name' },
        {label: 'Age', value: 'date_of_birth' },
        {label: 'Experience', value: 'experience' },
        {label: 'Qualification', value: 'qualification' },
        {label: 'Position', value: 'position' }

    ])

    useEffect(()=>{
        // fetch('http://192.168.137.1:8000/staff')
        // .then((res) => res.json())
        // .then(user =>setMembers(user))
        // .catch(err=>console.warn(err))
    },[])
    
    let controller;

    const handleSearch = (text)=>{
        setSearchField(text)
    }

    const filteredUsers = members.filter(member => member.fname.includes(searchField))

    return (
        <View style={styles.container}>
            <HeaderBar />
            
            <View style={styles.section}>

            <View style={styles.search}>
            <TextInput 
                style={styles.input}
                placeholder='Search'
                onChangeText={handleSearch}
            /> 

            </View>
                <View style={{width:'42%'}}>
                <DropDownPicker
                    items={items}
                    containerStyle={{height:30}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    labelStyle={{color:'teal',fontWeight:'bold',fontSize:14}}
                    controller={instance => controller = instance}
                    onChangeList={(items, callback) => {
                        new Promise((resolve, reject) => resolve(setItems(items)))
                            .then(() => callback())
                            .catch(() => {});
                    }}

                    defaultValue={filterBy}
                    onChangeItem={item => setFilterBy(item.value)}
            />
                </View>
                 
                
            </View>
            <View style={styles.details}>
                
                <FlatList 
                    data={filteredUsers}
                    renderItem={({item})=> <UserCard {...item}/>}
                    keyExtractor={member =>member.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
                 
             </View>

             

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },
    section:{
        flexDirection:'row',
        marginTop:20
    },
    search:{
        width:'55%',
        paddingLeft:10
    },
    input:{
        width:width/3+50,
        fontSize:15,
        borderColor:'grey',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:15
    },
    details:{
        width:'95%',
        marginTop:10,
        alignSelf:'center',
    }

     
})

export default Staff
