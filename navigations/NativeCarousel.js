import React from "react";
import { View, Image } from 'react-native';
import { useStateValue } from "../components/State";
import Carousel from 'react-native-snap-carousel';

const ModalScreen = ({ route }) => {

  const { images } = route.params;
  const [{ dimensions }] = useStateValue();

  const renderItem = ({ item }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', 
        shadowColor: "white",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.28,
        shadowRadius: 10.78,
        elevation: 1,
      }}>
       
      <Image style={{width: dimensions.width, aspectRatio: 1.1 }} source={{ uri: item.url }} />
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <Carousel
        layout="default"
        data={images}
        sliderWidth={dimensions.width}
        itemWidth={dimensions.width}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ModalScreen;