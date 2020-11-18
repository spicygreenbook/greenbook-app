import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { WithScrollView } from './helper';
import Home from '../screens/Home'
import CustomHeader from './CustomHeader';
import Listing from '../screens/Listing';
import { Container, Content, Header, List, ListItem, Text, Icon } from 'native-base';
import { getStyles, Theme } from '../utils';
import { useStateValue } from "../components/State";

const Stack = createStackNavigator();

export const State = (props) => {
  const { cities, stateName } = props.route.params;
  const [{ isWeb }] = useStateValue();
  const styles = StyleSheet.create(getStyles('text_header3, text_body', {isWeb}));

  return (
    <Container>
      <Header style={[{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}]}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: 20, marginRight: 'auto', marginLeft: 10 }}>
          <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 24, color: Theme.green  }}/>
        </TouchableOpacity>
        <Text style={[styles.text_header3, { marginRight: 'auto', marginLeft: -30 }]}>{stateName}</Text>
      </Header>
      <Content>
        <List>
          {cities.map(city => (
            <TouchableOpacity key={city} >
              <ListItem button={true} onPress={() => alert(city)}>
                <Text style={[styles.text_body,{ color: Theme.green, fontSize: 18, fontWeight: '600', paddingTop: 10, paddingBottom: 10, textTransform: 'capitalize'}]}>{city}</Text>
              </ListItem>
            </TouchableOpacity>
            ))
          }
        </List>
      </Content>
  </Container>
  )
}

const HomeStack = (props) => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen name="Home" component={WithScrollView(() => <Home {...props} />)} options={{
      header: () => <CustomHeader dark {...props} />
    }} />

    <Stack.Screen name="Listing" component={WithScrollView(Listing)} options={{
      headerShown: false,
    }} />

    <Stack.Screen name="State" component={State} options={(state) => {
      return ({
        headerShown: false,
        title: state.route.params.stateName
    })
  }
  } />
  </Stack.Navigator>
)

export default HomeStack;