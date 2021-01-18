import React,{useState, useEffect} from 'react'
import { View, StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import {connect} from 'react-redux'

import HeaderBar from '../custom/HeaderBar'
import UserCard from './UserCard'
import db from '../utils/database'
import {setStaff} from '../redux/staff/staffActions'

import { StackActions, useNavigation } from '@react-navigation/native';


const {width, height} = Dimensions.get('window')

const Staff = ({allStaff,setStaff}) => {

    const navigator = useNavigation();

    const [members,setMembers] = useState([])
    const [searchField,setSearchField] = useState("")
    const [filterBy, setFilterBy] = useState("")
    const [items,setItems] = useState([
        
        {label: 'Name', value: 'name' },
        {label: 'Age', value: 'date_of_birth' },
        {label: 'Experience', value: 'experience' },
        {label: 'Qualification', value: 'qualification' },
        {label: 'Position', value: 'position' }

    ]);


    const fetchMembers = ()=>{
        db.transaction(tx=>{
            tx.executeSql('SELECT * FROM staff_members',null,
            (txObj,{rows:{_array}})=>setMembers(members.concat(_array))),
            (txObj, error)=>console.log('Error',error)
        })
    }

    setStaff(members)

    const del =(id)=>{
        setMembers(prev =>{
            return prev.filter(staff =>staff.id !=id)
        })
    }

    useEffect(()=>{
        fetchMembers()
        setStaff(members)
        
    },[])
    
    let controller;

    const handleSearch = (text)=>{
        setSearchField(text)
    }

    let filter = searchField.toString()
    const filteredUsers = members.length <1?null: members.filter(member =>  member.first_name.toLowerCase().includes(filter)||member.last_name.toLowerCase().includes(filter))
    return (
        <View style={styles.container}>
            <HeaderBar />
            
            <View style={styles.section}>

            <View style={styles.search}>
            <TextInput 
                style={styles.input}
                placeholder='Search'
                value={searchField}
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
                    onPress={()=>navigator.dispatch(StackActions.push('Addmember',{fetchMembers})) } 
                    style={styles.addbutton}
                    >
                         <Feather name="user-plus"size={24} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.details}>
                <FlatList 
                    data={filteredUsers}
                    renderItem={({item})=> <UserCard del={del} {...item}/>}
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
});

const mapStateToProps = ({ staff }) => ({
    allStaff: staff.staff
  });

  const mapDispatchToProps = dispatch => ({
    setStaff: members => dispatch(setStaff(members))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Staff)
