import React,{useState, useEffect} from 'react'
import { View,Text,Dimensions,TouchableOpacity,StyleSheet} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import {connect} from 'react-redux'
import {setDetails} from '../redux/showUserDetails/detailsActions'
import {setStaff} from '../redux/staff/staffActions'

import HeaderBar from '../custom/HeaderBar'
import UserCard from './UserCard'
import db from '../utils/database'
import ViewStaff from '../components/ViewStaff'

import { StackActions, useNavigation } from '@react-navigation/native';


const {width, height} = Dimensions.get('window')

const Staff = ({showDetails,staff,setStaff,setDetails}) => {

    const navigator = useNavigation();
 
    const [members,setMembers] = useState([])
    setStaff(members);
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
            (txObj,{rows:{_array}})=>setMembers(_array)),
            (txObj, error)=>console.log('Error',error)
        })
    }




    useEffect(()=>{
        fetchMembers()
        setMembers([])
        
    },[])
    
    let controller;

    const handleSearch = (text)=>{
        setSearchField(text)
    }
    
    let filter = searchField.toString().toLocaleLowerCase()
    const filteredUsers = staff.length <1?null: staff.filter(member =>  member.first_name.toLowerCase().includes(filter)||member.last_name.toLowerCase().includes(filter))
    return (
        <View style={styles.container}>
            <HeaderBar />
            
            {/* <View style={styles.section}>

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
        </View> */}
            <View style={{width:width,height:30,paddingLeft:15,paddingTop:10}}>
                <Text style={{fontSize:16}}>All staff members</Text>

            </View>
            
            <View style={styles.details}>
                <FlatList 
                    data={filteredUsers}
                    renderItem={({item})=> <UserCard {...item}/>}
                    keyExtractor={member =>member.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
             </View>
             
             {
                 showDetails&&(
                     <View
                     style={styles.popsection} 
                     >
                         <ViewStaff fetch ={fetchMembers}/>

                     </View>
                 )
                }
             <View style={{position:'absolute',marginLeft:'80%',width:50,height:50,borderRadius:150,marginTop:450}}>
                 <TouchableOpacity 
                    onPress={()=>navigator.dispatch(StackActions.push('Addmember',{fetchMembers}))}
                    style={{width:'100%',height:'100%',borderRadius:150,justifyContent:'center',alignItems:'center'}}>
                    <Feather name='plus-circle'color="#83C091" size={35} />
                 </TouchableOpacity>
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        height:'100%',
        backgroundColor:'white',
        position:'relative'
    },
    section:{
        flexDirection:'row',
        marginTop:20,
        position:'relative'
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
    },
    popsection:{
        width:'45%',
        height:'45%',
        position:'absolute',
        borderWidth:1,
        borderColor:'grey',
        marginTop:'30%',
        marginLeft:'50%',
        borderRadius:5
    }
});

const mapStateToProps = ({details,staff}) => ({
     showDetails:details.showDetails,
     staff:staff.staff 
  });

  const mapDispatchToProps = dispatch => ({
    setStaff: members => dispatch(setStaff(members)),
    setDetails: act =>dispatch(setDetails(act))
  });

export default connect(mapStateToProps,mapDispatchToProps)(Staff)
