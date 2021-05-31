import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import Styled from 'styled-components/native';

import {Calendar} from 'react-native-calendars';
import moment from 'moment';

const Container = Styled.View`
  flex: 1;
`;

const CalendarContainer = Styled.View`
    padding-top: 50px;
`;

const Calendars = () => {
  const [markedDates, setMarkedDates] = useState({
});

  const handleDayPress = (day) => {
    setMarkedDates({
      [day.dateString]: {
        startingDay: true,color: 'green'
      },
      [moment(day.dateString).add(1, 'days').format('YYYY-MM-DD')]: {
        color: 'green'
      },
      [moment(day.dateString).add(2, 'days').format('YYYY-MM-DD')]: {
        color: 'green'
      },
      [moment(day.dateString).add(3, 'days').format('YYYY-MM-DD')]: {
        endingDay: true,color: 'green'
      }
    })
  }


  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <CalendarContainer>
        <Calendar
          onDayPress={handleDayPress}
          hideExtraDays
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: 'green',
            todayTextColor: 'green',
            arrowColor: 'green',
          }}
        />
      </CalendarContainer>
    </Container>
  );
};

export default Calendars;
