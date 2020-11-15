import React from 'react';
import { StyleSheet, Linking, View, Text } from 'react-native';
import { Container, Footer, Content, FooterTab, Button, Icon } from 'native-base';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Theme } from '../utils';

const CustomDrawer = (props) => {
  return (
    <Container>
      <Content style={{ backgroundColor: Theme.green }}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </Content>
      <Footer style={{ backgroundColor: Theme.green }}> 
        <FooterTab>
          <Button onPress={() => Linking.openURL("https://instagram.com/spicygreenbook")} >
            <Icon type="FontAwesome" style={styles.default} name="instagram" size={22} />
          </Button>

          <Button onPress={() => Linking.openURL("https://twitter.com/spicygreenbook")}>
            <Icon type="FontAwesome" style={styles.default} name="twitter" size={22} />
          </Button>

          <Button onPress={() => Linking.openURL("https://www.linkedin.com/company/spicy-green-book/")}>
            <Icon type="FontAwesome" style={styles.default} name="linkedin" size={22} />
          </Button>

          <Button onPress={() => Linking.openURL("https://www.facebook.com/SpicyGreenBook/")}>
            <Icon type="FontAwesome" style={styles.default} name="facebook" size={22} />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  default: { color: 'white', fontSize: 22, }
});

export default CustomDrawer;