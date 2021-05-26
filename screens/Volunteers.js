import React, { useState, useEffect } from "react";
import { useStateValue } from "../components/State";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from "react-native";
import { PageTitle } from "../components/PageTitle";
import { getStyles, Theme, getContent } from "../utils";
import { ResponsiveImage } from "../components/ResponsiveImage";
import VolunteerModal from "../components/VolunteerModal";
import useFetchData from "../hooks/useFetchData";

const VolunteerCard = ({ item, updateModal }) => {
  const [{ dimensions }] = useStateValue();
  
  return (
    <View style={{ flex: 1 / dimensions.width < 600 ? 1 : 2, margin: 10 }} >
      <TouchableOpacity
        onPress={() => updateModal({data: item, open: true}) } >
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
    </View>
  )
}

function Page(props) {
  const [{ isWeb, dimensions }] = useStateValue();
  const [pageLoading, setPageLoading] = useState(props.content ? false : true);
  const [content, setContent] = useState(props.content || {});
  const [volunteers, loadingVolunteers, errorVolunteers] = useFetchData("volunteers", props.volunteers);

  const [modal, setModal] = useState({ open: false, data: {} });
  const updateModal = (data) => setModal(data);
  let numColumns = dimensions.width < 600 ? 1 : 2;
  let stats = {
    count: 200,
    hours: 10000,
    dollars: 700000
  };

  volunteers.forEach((volunteer) => {
    stats.count++;
    stats.dollars += volunteer.amount || 0;
    stats.hours += volunteer.amount ? volunteer.amount / 100 : 0;
  });

  let shuffledVolunteers = volunteers.sort(() => Math.random() - 0.5);

  if (!props.content) {
    useEffect(() => {
      getContent({ type: "content", uid: "volunteers" })
        .then((_content) => {
          setContent(_content.content);
          setPageLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);
  }

  const TextCounter = ({title, count}) => <View>
    <Text style={[styles.text_body, styles.statsCounter],{fontSize: dimensions.width < 980 ? 26 : 40, alignSelf: "center"}}>{count}+</Text>
    <Text style={[styles.text_body, { fontSize: dimensions.width < 980 ? 13 : 24 } ]}>{title}</Text>
 </View>

  return (
    <>
      {pageLoading ? (
        <View style={{ marginTop: 200, marginBottom: 200 }}>
          <ActivityIndicator color={Theme.green} size="large" />
        </View>
      ) : (
        <>
          <PageTitle navigation={props.navigation} title={content.page_title} button={{ title: "Get Involved", href: "/volunteer", nav: "Volunteer" }}/>
          {loadingVolunteers ? (
            <ActivityIndicator color={Theme.green} size="large" />
          ) : errorVolunteers ? (
            <Text>{errorVolunteers}</Text>
          ) : (
            <>
              <View style={[styles.section, { backgroundColor: "#F2F2F2" }]}>
                <View style={styles.statsContainer}>
                  <TextCounter title='Total volunteers' count={stats.count}/>
                  <TextCounter title='Hours donated' count={Math.round(stats.hours)}/>
                  <TextCounter title='In time volunteered' count={stats.dollars}/>
                </View>
              </View>

              <View style={[styles.section]} nativeID="volunteersLinks">
                <View style={styles.content}>
                  {
                    !isWeb 
                      ? shuffledVolunteers.map((item, index) => <VolunteerCard key={"volunteers" + index} item={item} updateModal={updateModal} />)
                      :  <FlatList
                          key={"cols" + numColumns}
                          data={shuffledVolunteers}
                          numColumns={numColumns}
                          renderItem={({ item, index }) => <VolunteerCard key={"volunteers" + index} item={item} updateModal={updateModal} />}
                          keyExtractor={(item, index) => "volunteers" + index}
                        /> 
                  }
                </View>
              </View>
              <VolunteerModal open={modal.open} data={modal.data} close={() => updateModal({open: false, data: {}})} />
            </>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  ...getStyles("text_header2, text_header3, text_header4, text_header5, section, content, text_body"),
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  statsCounter: {
    fontWeight: "bold",
    marginBottom: 10
  },
  statsContainer: { 
    width: '100%', 
    flexDirection: "row", 
    justifyContent: "space-evenly", 
    alignItems: "center", 
    textAlign: "center", 
    marginTop: 20
  }
});

export default Page;