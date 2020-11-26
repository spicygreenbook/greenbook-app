import React, {useState} from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Svg, { G, Path, Use } from 'react-native-svg';
import { useStateValue } from "../components/State";
import { Link } from "../components/Link";
import { getStyles, Theme, states, getListingsByState, statesObj, statesObjRev } from '../utils';
import { EvilIcons } from '@expo/vector-icons';


function SGBMap(props) {

    const [{ view, isWeb, theme, dimensions, searchConfig }, dispatch] = useStateValue();
    const { listings, loadingListings } = props;
    const [ curState, setCurState ] = useState('');

    const styles = StyleSheet.create(getStyles('text_body', {isWeb, theme}));

    const listingsByState = getListingsByState(listings);


    return (
			<View style={[{flex: 1, width: '100%', position: 'relative'}, props.style || {}]}>
				{!!curState && 
					<ScrollView style={{position: 'absolute', left: dimensions.width > 400 ? (((dimensions.width > 1024 ? 1024 : dimensions.width) - 420) * 0.5) : '4%', top: '40%', width: 400, height: 200, maxWidth: '92%', backgroundColor: Theme.green, borderWidth: 2, borderColor: '#fff', padding: 20}}>
							<View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-start'}}>
									<View>
											<Text style={[styles.text_body, {color: '#fff', textTransform: 'capitalize', marginTop: 6}]}>
													{statesObj[statesObjRev[curState._state]]} ({curState._count})
											</Text>
									</View>
									<View>
											<TouchableOpacity onPress={e => {
													setCurState('');
											}}>
													<EvilIcons name="close" size={48} color="#fff" style={{cursor: 'pointer'}}/>
											</TouchableOpacity>
									</View>
							</View>
							<View>
									{Object.keys(curState).filter(key => {return key.indexOf('_') !== 0}).map((state, s) => {
											return <Link key={'link' + s } href={`/search?q=&near=${curState[state]._name}, ${statesObjRev[curState._state].toUpperCase()}`}><Text style={[styles.text_body, {color: '#fff', fontSize: 16, textTransform: 'capitalize'}]}>{curState[state]._name}</Text></Link>
									})}
							</View>
				  </ScrollView>}
					<Svg viewBox="0 0 679.37 521.8" height={dimensions.width ? dimensions.width * 0.76806 : '100%'} width={'100%'} style={{width: '100%'}}>
						{states.map((state,s) => {
							let _state = state.id.toLowerCase().replace(/[^a-z]/g, '');
							let mappedState = listingsByState[_state];

							if (mappedState) {
								//console.log('mapped state', _state, mappedState)
							} else {
								//console.log('could not map state', state.id, _state, mappedState)
							}

							return (
								<G key={state.id + 'fill'} onPress={e => {
									if (mappedState) {
										if(!isWeb) {
											props.navigation.navigate('StateListing', { 
												stateName: state.id, 
												cities: 
													Object.keys(mappedState)
													.filter(key => {return key.indexOf('_') !== 0})
													.sort(),
												abbr: statesObjRev[mappedState._state].toUpperCase(),
											 });
											return;
										}
	
										// console.log('mapped state', mappedState)
										setCurState(mappedState);
									} else {
											setCurState('');
									}
									}}>
										<Path d={state.d[0]} transform={state.translate === false ? '' : 'translate(-74 -52.49)'} fill={mappedState ? '#006233' : '#000'}/>
										<Path d={state.d[0]} transform={state.translate === false ? '' : 'translate(-74 -52.49)'} stroke="#efefef" strokeWidth="0.5" fill="none" />
									</G>											
							 )
						})}
					</Svg>
			</View>
    )
}

export default SGBMap;