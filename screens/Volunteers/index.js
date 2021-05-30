import React, { useState, useEffect } from "react";
import { useStateValue } from "../../components/State";
import {View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { PageTitle } from "../../components/PageTitle";
import { getStyles, Theme, getContent } from "../../utils";
import useFetchData from "../../hooks/useFetchData";
import VolunteerModal from "./components/VolunteerModal";
import Card from './components/Card';

function Page(props) {
  const [{ isWeb, dimensions }] = useStateValue();
  const [pageLoading, setPageLoading] = useState(props.content ? false : true);
  const [content, setContent] = useState(props.content || {});
  const [volunteers, loadingVolunteers, errorVolunteers] = useFetchData("volunteers", props.volunteers);

  const [modalData, setModalData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const StatsCounter = ({title, count}) => <View>
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
                  <StatsCounter title='Total Volunteers' count={stats.count}/>
                  <StatsCounter title='Hours Donated' count={Math.round(stats.hours)}/>
                  <StatsCounter title='In Time Volunteered' count={`$${Math.round(stats.dollars / 1000)}K`}/>
                </View>
              </View>

              <View style={[styles.section]} nativeID="volunteersLinks">
                <View style={styles.content}>
                  <FlatList
                    key={"cols" + numColumns} 
                    data={shuffledVolunteers}
                    initialNumToRender={isWeb ? 10 : 5}
                    showsVerticalScrollIndicator={false}
                    windowSize={1}
                    numColumns={numColumns}
                    renderItem={({ item }) => <Card numColumns={numColumns} key={"volunteers" + item.id} item={item} openOnWeb={() => { 
                      setModalVisible(true);
                      setModalData(item);
                    }}/> }
                    keyExtractor={(item) => "volunteers" + item.id}
                  /> 
                </View>
              </View>
              {/* A single modal for web */}
              {isWeb && modalData && <VolunteerModal key={'modal' + modalData.id} open={modalVisible} data={modalData}  onClose={() => setModalVisible(false) } /> }
            </>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  ...getStyles("section, content, text_body"),
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