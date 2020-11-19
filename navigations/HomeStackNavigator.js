import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { WithScrollView } from './helper';
import Home from '../screens/Home'
import CustomHeader from './CustomHeader';
import Listing from '../screens/Listing';
import CityListing from '../screens/List';
import { Container, Content, Header, List, ListItem, Text, Icon } from 'native-base';
import { getStyles, Theme } from '../utils';
import { useStateValue } from "../components/State";
import { Link } from "../components/Link";
import { useRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

const CustomHeaderWrapper = ({navigation, children}) => {

  const { params : { city, stateName }} = useRoute();
  const [{ isWeb }] = useStateValue();
  const styles = StyleSheet.create(getStyles('text_header3, text_body', {isWeb}));

  return (
    <Container>
      <Header style={[{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}]}>
        <TouchableOpacity onPress={() => navigation.navigate("Home", {screen: stateName ? "CityListing" : "StateListing"})} style={{ width: 20, marginRight: 'auto', marginLeft: 10 }}>
          <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 24, color: Theme.green  }}/>
        </TouchableOpacity>
        <Text style={[styles.text_header3, { marginRight: 'auto', marginLeft: -30 }]}>{stateName || city}</Text>
      </Header>
      <Content>
        {children}
      </Content>
  </Container>
  )
}

const State = (props) => {
  
  const { params : { cities, abbr }} = useRoute();
  const [{ isWeb }] = useStateValue();
  const styles = StyleSheet.create(getStyles('text_body', {isWeb}));

  return (
    <CustomHeaderWrapper {...props}>
      <List>
        {cities.map(city => {
          const cityCapatalized = city[0].toUpperCase() + city.substring(1);

          return (
            <ListItem key={city} >
              <Link href={`/search?q=&near=${cityCapatalized}, ${abbr}`} to="CityListing" navigation={props.navigation} city={cityCapatalized} abbr={abbr} params={{city}}>
                <Text style={[styles.text_body,{ color: Theme.green, fontSize: 18, paddingTop: 5, paddingBottom: 5, textTransform: 'capitalize'}]}>{city}</Text>
              </Link> 
            </ListItem>
            ) 
          })
        }
      </List>
    </CustomHeaderWrapper>
  )
}

const HomeStack = (props) => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen name="Home" component={WithScrollView(() => <Home {...props} />)} options={{
      header: () => <CustomHeader dark {...props} />
    }} />

    <Stack.Screen name="Listing" component={WithScrollView(Listing)} options={{ headerShown: false }} />
    <Stack.Screen name="StateListing" component={State} options={{headerShown: false}} />
    <Stack.Screen name="CityListing" component={WithScrollView(() => 
      <CustomHeaderWrapper {...props}>
        <CityListing {...props} viewMode="Home" />
      </CustomHeaderWrapper>)} options={{
        headerShown: false,
      }} 
     />

  </Stack.Navigator>
)

export default HomeStack;