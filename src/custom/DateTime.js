import React,{useState} from 'react'
import { View, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../custom/Button'


const DateTime = ({change, ...props}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

 

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      
       
        <DateTimePicker
          testID="dateTimePicker"
          mode='date'
          value={date}
          display="default"
          onChange={change}
          {...props}
        />
      
    </View>
  );
}

export default DateTime
