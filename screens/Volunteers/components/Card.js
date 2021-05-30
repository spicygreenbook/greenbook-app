import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useStateValue } from "../../../components/State";
import { getStyles} from "../../../utils";
import { ResponsiveImage } from "../../../components/ResponsiveImage";
import VolunteerModal from "./VolunteerModal";

const Card = ({ item, openOnWeb, numColumns }) => {
  const [{ dimensions, isWeb }] = useStateValue();
  
  // We create this for Native, so it does not rerender when clicking on VolunteerCard
  const [modalVisible, setModalVisible] = useState(false);

  console.log('Rerender inside VolunteerCard')
  return (
    <View style={{ flex: dimensions.width < 600 ? 1 : 1 / numColumns, margin: 10 }} >
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true)
          if(isWeb) openOnWeb();
        }}>

        <View style={{ flexDirection: "row", minHeight: 115 }} >
          <View style={{ flex: 1 }}>
            { item.image && item.image.url && (
              <ResponsiveImage style={{ width: item.image.width, height: item.image.height }} source={{ uri: item.image.url + "&w=600" }} />
            )}
          </View>
          <View style={{ flex: 2, paddingLeft: 20 }}>
              <Text style={styles.text_header4}>{item.name}</Text>
              <Text style={[styles.text_header4, {fontSize: 18, paddingBottom: 4, paddingTop: 4}]} >{item.role || ""}</Text>
              <View style={{ maxHeight: 50, overflow: "hidden" }}>
                <Text>{item.description || ""}...</Text>
              </View>
          </View>
        </View>
      </TouchableOpacity>
       {!isWeb && <VolunteerModal open={modalVisible} data={item} onClose={() => setModalVisible(false) } /> }
    </View>
  )
};

const styles = StyleSheet.create({ ...getStyles("text_header4")});

export default Card;