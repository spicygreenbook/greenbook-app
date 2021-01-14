import React, {useState, useEffect, useRef} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import { getStyles, Theme, getData } from '../utils';
import ListItem from "../components/ListItem";
import Map from "../components/Map";
import Search from "../components/Search";
import { findListings, fixSearch, searchSeries } from '../utils/helper';
import Spinner from '../components/Spinner';

function Page({ listings, viewMode, city, state }) {
    
/*
json output to console to convert to a table to act as an export for people that ask for all listing data
    console.log(listings.map(row => {
        Object.keys(row).forEach(key => {
            if (key.substr(0,1) === '_') {
                delete row[key]
            }
        })
        delete row.images;
        return row;
    }))
*/    const [{ isWeb, dimensions, searchConfig, isLoading }, dispatch] = useStateValue();

    let staticCityState = '';
    if (city && state) {
        staticCityState = city + ', ' + state;
    }

    const [data, setData] = useState(listings || []); // This data is for all platforms to search to. In native listings is null
    const [filteredList, setFilteredList] = useState(listings || []);
    const [geoCoords, setGeoCoords] = useState();
    const [sortOption, setSortingOption] = useState("distance");

    const updateData = async () => {
        let toSearch = searchSeries(fixSearch(searchConfig.q));
        let newListings = null;

        if(searchConfig.near) { 
            try {
                // Must be full path for this to work on Native Platforms
                const geoUrl = isWeb ? '/api/geocode?query=' : 'https://spicygreenbook.org/api/geocode?query=';
                const res = await fetch(geoUrl + searchConfig.near);
                const geo = await res.json();
                setGeoCoords(geo.coords);
                newListings = findListings(data, geo.coords, toSearch, sortOption);
            } catch (err) {
                console.error(err)
            }
        } else {
            newListings = findListings(data, false, toSearch, sortOption);
        }  

        setFilteredList(newListings);
        dispatch({ type: 'loading', value: false });
    };

    //Handler for Search component select option
    const handleSortChange = (sort) => {
        dispatch({type: 'loading', value: true});
        setSortingOption(sort);
    };

    // Check and initialized data for native platforms
    useEffect(() => {
        if(data.length === 0) {
            getData({type: 'listing'}).then(_data => {
                setData(_data);

                if(!searchConfig.q && !searchConfig.near) {
                    setFilteredList(_data);
                    dispatch({ type: 'loading', value: false });
                } 
            }).catch(err => {
                console.error(err);
            });
        }

        // Since listing has data in web
        if(isWeb) dispatch({ type: 'loading', value: false });
    }, [])

    useEffect(() => {
        if(data.length > 0 && (searchConfig.q || searchConfig.near)) {
            updateData();
        }
    }, [data]);
    
    // Search
    useEffect(() => {
        if(!data.length) return;
        if(!searchConfig.q && !searchConfig.near) return;
       
        updateData();
    }, [searchConfig]);

    const isMount = useRef(true);
    //When sort option is changed
    useEffect(() => {
        //Skip first render
        if(isMount.current) {
            isMount.current = false;
            return;
        }
        let sortedListings = null;
        let toSearch = searchSeries(fixSearch(searchConfig.q));
        sortedListings = findListings(data, geoCoords, toSearch, sortOption);
        setFilteredList(sortedListings);
        dispatch({type: 'loading', value: false});
    }, [sortOption]);
        

    const HeaderList = () => (
        <View style={{ padding: 20, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <Text style={[styles.text_header3, {marginBottom: 20}]}>
                {filteredList.length === 1 ? '1 Black-Owned Business' : filteredList.length + ' Black-Owned Businesses'}
            </Text>
            {!viewMode && <Search mode="results" city={city} state={state} sortOption={sortOption} handleSortChange={handleSortChange}/> }
         </View>
    )

    const NativeList = () => (
        <FlatList
            showsHorizontalScrollIndicator={true}
            data={filteredList}
            initialNumToRender={6}
            windowSize={3}
            renderItem={({ item, index }) => (<ListItem listing={item} last={index===filteredList.length-1} />)}
            keyExtractor={(_, index) => 'listing' + index}
            ListHeaderComponent={<HeaderList />}
        />
    )

    const WebList = () => (
        <ScrollView style={{paddingTop: 120 }}>
            <View style={[dimensions.width >= 800 ? {flexDirection: 'row'} : {}, isWeb && {borderTopWidth: 2, borderColor: Theme.green}]}>
                <View style={dimensions.width >= 800 ? {flex: 1, borderRightWidth: 2, borderColor: Theme.green, minHeight: 'calc(100vh - 234px)'} : {}}>
                    <HeaderList />
                    {filteredList.map((listing, n, ar) => <ListItem key={n} listing={listing} last={n===ar.length-1} />)}
                </View>
                {dimensions.width >= 800 &&
                    <View style={{flex: 1}}>  
                        <View style={[{position: 'fixed', zIndex: 1, top: 122, right: 0}, {width: 'calc(50% - 1px)', height: 'calc(100vh - 120px)'}]}>
                            <Map list={filteredList} mode="d" />
                        </View> 
                    </View>
                }
            </View>
            </ScrollView>
    )
 
    return isLoading
        ? <Spinner /> 
            : isWeb 
                ? <WebList /> 
                : <NativeList />
}

const styles = StyleSheet.create(getStyles('text_header3, section, content'));

export default Page;