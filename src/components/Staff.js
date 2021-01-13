import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import HeaderBar from '../custom/HeaderBar'
import UserCard from './UserCard'
import { StackActions, useNavigation } from '@react-navigation/native';


const {width, height} = Dimensions.get('window')

const Staff = () => {

    const navigation = useNavigation();

    const [members,setMembers] = useState([
        {fname:'Ronald',lname:'Tendo',age:61,id:1,qualification:'Diploma',position:'Developer',experience:2,image:require('../../assets/user.png')},
        {fname:'Steven',lname:'Edonga',age:25,id:2,qualification:'Bootcamp graduate',position:'Intern',experience:1,image:require('../../assets/user.png')},
        {fname:'Pascal',lname:'Sabitti',age:41,id:3,qualification:'Bachelors Degree',position:'Backend Engineer',experience:2,image:require('../../assets/user.png')},
        {fname:'Kenneth',lname:'Ocitti',age:54,id:4, qualification:'Diploma',position:'Developer',experience:2,image:require('../../assets/user.png')},
        {fname:'Enock',lname:'Kyazze',age:36,id:5,qualification:'Diploma',position:'Developer',experience:2,image:null},
        {fname:'Nakiganda',lname:'Aisha',age:23,id:6,qualification:'Certificate',position:'Developer',experience:2,image:require('../../assets/user.png')},
        {fname:'Frank',lname:'Buwembo',age:24,id:7,qualification:'Bachelors Degree',position:'Developer',experience:2,image:require('../../assets/user.png')},
        {fname:'Natabo',lname:'Hilda',age:26,id:8,qualification:'Diploma',position:'Developer',experience:2,image:require('../../assets/user.png')},
        {fname:'Isaac',lname:'Okoth',age:21,id:9,qualification:'Diploma',position:'Developer',experience:2,image:require('../../assets/user.png')}
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
                <View style={styles.button}>
                    <TouchableOpacity
                    onPress={()=>navigation.dispatch(StackActions.push('Addmember')) } 
                    style={styles.addbutton}
                    >
                         <Feather name="user-plus"size={24} color='white' />
                    </TouchableOpacity>
            
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
        width:'30%',
        paddingLeft:10
    },
    button:{
        width:'30%',
        paddingLeft:5,
        backgroundColor:'white',
    },
    addbutton:{
        width:width/3-30,
        fontSize:15,
        height:30,
        borderColor:'grey',
        borderRadius:55,
        borderWidth:1,
        backgroundColor:'green',
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        width:width/3-30,
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
        marginBottom:80
    }

     
})

export default Staff
