import React,{useState, useEffect} from 'react'
import { View,Text,Dimensions,TouchableOpacity,StyleSheet} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import {connect} from 'react-redux'
import {setDetails} from '../redux/showUserDetails/detailsActions'
import {setStaff} from '../redux/staff/staffActions'
import { FAB } from 'react-native-paper'

import HeaderBar from '../custom/HeaderBar'
import UserCard from './UserCard'
import ViewStaff from '../components/ViewStaff'

import { StackActions, useNavigation } from '@react-navigation/native';


const {width, height} = Dimensions.get('window')

const Staff = ({showDetails,staff,setStaf,setDetails}) => {

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

    let controller;

    const handleSearch = (text)=>{
        setSearchField(text)
    }
    
    // let filteredUsers = staff;

    let filter = searchField.toString().toLocaleLowerCase()
    const filteredUsers = staff.length <1?null: staff.filter(member =>  member.first_name.toLowerCase().includes(filter)||member.last_name.toLowerCase().includes(filter))
    return (
        <View style={styles.container}>
            <HeaderBar />
            
            {/* <View style={styles.section}> */}

            {/* <View style={styles.search}>
                <TextInput 
                    style={styles.input}
                    placeholder='Search'
                    value={searchField}
                    onChangeText={handleSearch}
                    /> 
                </View>
                <View style={{width:'45%'}}> */}
{/*                 
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
            </View> */}
            
        {/* </View> */}
            <View style={{width:width,height:40,backgroundColor:'#eee',padding:10,paddingLeft:15,paddingTop:10}}>
                <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'center',color:'darkblue'}}>All staff members</Text>

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
                         <ViewStaff />

                     </View>
                 )
                }
                    
                <FAB
                    style={{position:'absolute',margin:16,margin:0,bottom:25,right:15}}
                    small
                    icon="plus"

                    onPress={()=>{
                        showDetails ?setDetails(!showDetails):null
                        navigator.dispatch(StackActions.push('Addmember'))}
                    }
                />
             
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
        width:'50%',
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
        width:width/3+30,
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
        height:'50%',
        position:'absolute',
        borderWidth:1,
        borderColor:'grey',
        marginTop:'30%',
        marginLeft:'50%',
        borderRadius:5
    }
});

const mapStateToProps = ({details,user,staff}) => ({
     showDetails:details.showDetails,
     roles:user.actions,
     staff:staff.staff ,
  });

  const mapDispatchToProps = dispatch => ({
    setStaf: members => dispatch(setStaff(members)),
    setDetails: act =>dispatch(setDetails(act))
  });

export default connect(mapStateToProps,mapDispatchToProps)(Staff)
