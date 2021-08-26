import React, { useState, useEffect, useRef } from 'react';
import { useStateValue } from '../components/State';
import {
	StyleSheet,
	Platform,
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Button,
	InteractionManager,
} from 'react-native';
import { Link } from '../components/Link';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { getStyles, Theme } from '../utils';
import { FontAwesome } from '@expo/vector-icons';
const ios = Platform.OS === 'ios';
import Constants from 'expo-constants';
import { Video } from 'expo-av';

function Page(props) {
	const [{ view, isWeb, dimensions }, dispatch] = useStateValue();

	const styles = StyleSheet.create(
		getStyles(
			'button_green, button_white, button_white_text, button_link_text, button_green_text, text_header, text_header2, text_header3, text_header4, text_body, text_quote, section, content, footer',
			{ isWeb }
		)
	);

	// THESE PROPS ARE COMING FROM pages/sponsors.js
	// THESE CAN BE USED TO SHOW ACTUAL NUMBERS ON THIS PAGE
	// console.log(props.listingsCount);
	console.log(`WE HAVE ${props.listingsCount} business listed!`);
	// console.log(props.volunteersCount);
	// console.log(`WE HAVE ${props.volunteersCount} volunteers!`);
	// console.log(props.sponsors);
	// console.log(`WE HAVE ${props.sponsorsCount} sponsors!`);

	const topPage = useRef();
	const whySponsor = useRef();
	const sponsorBenefit = useRef();
	const sponsorLevel = useRef();
	const ourSponsors = useRef();

	const scrollViewRef = useRef();

	const handleScroll = (index) => {
		if (index === 0) {
			// Temp topPage ref fix because fixed nav covers heading when jumping up
			topPage.current.scrollIntoView({
				behavior: 'smooth',
				block: !isWeb ? 'center' : 'start',
			});
		}
		if (index === 1) {
			sponsorBenefit.current.scrollIntoView({
				behavior: 'smooth',
				block: !isWeb ? 'nearest' : 'nearest',
			});
		}
		if (index === 2) {
			sponsorLevel.current.scrollIntoView({
				behavior: 'smooth',
				block: !isWeb ? 'center' : 'nearest',
			});
		}
		if (index === 3) {
			ourSponsors.current.scrollIntoView({
				behavior: 'smooth',
				block: !isWeb ? 'center' : 'nearest',
			});
		}
	};

	const scrollToView = (index) => {
		console.log('attempt scroll', index);
		scrollViewRef.current.scrollTo({ x: 20, y: 400, animated: true });
		// window.scrollTo(0, 400)
	};

	const [layout, setLayout] = useState(null);

	const headerLinks =
		isWeb && dimensions.width > 800
			? [
					{ href: 'why_sponsor', title: 'Why Sponsor?' },
					{ href: 'sponsor_benefits', title: 'Sponsorship Benefits' },
					{ href: 'sponsor_levels', title: 'Sponsorship Levels' },
					// { href: "our_sponsors", title: "Our Sponsors" },
					{ href: 'become_sponsor', title: 'BECOME A SPONSOR' },
			  ]
			: [];
	// [ { href: "become_sponsor", title: "BECOME A SPONSOR" } ];

	const sponsorLevels = [
		{ title: 'Seed', amount: '500' },
		{ title: 'Earth', amount: '1K' },
		{ title: 'Water', amount: '2K' },
		{ title: 'Light', amount: '3K' },
		{ title: 'Sprout', amount: '4K' },
		{ title: 'Ramekin', amount: '5K' },
		{ title: 'Rolling Pin', amount: '10K' },
		{ title: 'Spatula', amount: '15K' },
		{ title: 'Martini Glass', amount: '20K' },
		{ title: 'Ladle', amount: '25K+' },
	];

	return (
		<SafeAreaView style={{ marginTop: Constants.statusBarHeight }}>
			<ScrollView
				ref={scrollViewRef}
				scrollToOverflowEnabled={true}
				style={isWeb && dimensions.width > 800 ? { transform: 'none' } : {}}>
				<View ref={topPage}>
					<View
						style={
							isWeb && dimensions.width > 800
								? {
										height: 200,
										flexDirection: 'row',
										backgroundColor: Theme.green_bg,
										alignItems: 'center',
										justifyContent: 'space-around',
										paddingTop: 25,
										position: 'fixed',
										top: 0,
										left: 0,
										right: 0,
										zIndex: 10,
								  }
								: {
										backgroundColor: Theme.green_bg,
										paddingTop: 30,
										justifyContent: 'center',
										alignItems: 'center',
										paddingBottom: 20,
								  }
						}>
						{isWeb
							? headerLinks.map((header, index) => (
									<View
										style={
											dimensions.width < 800 && header.title === 'Why Sponsor?'
												? { marginTop: 120 }
												: { marginTop: 50 }
										}
										key={index}>
										<View
											style={
												dimensions.width < 800
													? {
															display: 'flex',
															flexDirection: 'row',
															justifyContent: 'center',
															flexWrap: 'wrap',
													  }
													: header.title !== 'BECOME A SPONSOR'
													? { marginTop: 40 }
													: {
															backgroundColor: 'black',
															padding: 10,
															marginTop: 40,
															minHeight: 58,
															justifyContent: 'center',
													  }
											}>
											{header.title === 'BECOME A SPONSOR' ? (
												<TouchableOpacity
													style={
														isWeb && dimensions.width > 830
															? [
																	styles.button_black,
																	{
																		// marginLeft: 10,
																		flexBasis: '30%',
																	},
															  ]
															: isWeb && dimensions.width < 830
															? [
																	styles.button_black,
																	moreStyles.becomeSponsorWebLarge,
															  ]
															: [
																	styles.button_black,
																	moreStyles.becomeSponsorWebSmall,
															  ]
													}>
													<Link href='mailto:d.batson@spicygreenbook.org'>
														<Text
															style={
																dimensions.width < 800
																	? moreStyles.webHeader2Small
																	: moreStyles.webHeader2Large
															}>
															BECOME A SPONSOR
														</Text>
													</Link>
												</TouchableOpacity>
											) : (
												<TouchableOpacity>
													<Text
														onClick={() => handleScroll(index)}
														style={
															dimensions.width < 800
																? moreStyles.webHeaderSmall
																: moreStyles.webHeaderLarge
														}>
														{header.title}
													</Text>
												</TouchableOpacity>
											)}
										</View>
									</View>
							  ))
							: headerLinks.map((header, index) => (
									<View key={index}>
										<View
											style={
												dimensions.width < 800 &&
												header.title === 'BECOME A SPONSOR'
													? moreStyles.btnHeader2Container
													: { marginTop: 40, alignItems: 'center' }
											}>
											{header.title === 'BECOME A SPONSOR' ? (
												<Link href='mailto:d.batson@spicygreenbook.org'>
													<Text
														style={[moreStyles.btnHeader2, { color: 'white' }]}>
														BECOME A SPONSOR
													</Text>
												</Link>
											) : (
												<Button
													onPress={() => scrollToView(index)}
													color={ios ? '#fff' : '#006233'}
													style={
														dimensions.width < 800 &&
														header.title === 'BECOME A SPONSOR'
															? moreStyles.btnHeader2
															: {
																	fontFamily: 'ApercuMedium',
																	fontWeight: 'bold',
															  }
													}
													title={header.title}
												/>
											)}
										</View>
									</View>
							  ))}
					</View>

					<View
						ref={whySponsor}
						style={
							isWeb && dimensions.width > 800
								? [styles.section, moreStyles.whySponsorSection]
								: [styles.section, { fontSize: 24, paddingTop: 40 }]
						}>
						<View style={styles.content}>
							<View
								style={
									dimensions.width < 800 ? {} : moreStyles.whySponsorContainer
								}>
								<View style={{ flex: 1 }}>
									<View
										style={
											dimensions.width < 800 ? {} : moreStyles.whySponsorDiv
										}>
										<View
											style={
												dimensions.width < 800
													? { paddingTop: 40, alignItems: 'center' }
													: { flex: 2, paddingLeft: 20 }
											}>
											<Text
												accessibilityRole='header'
												aria-level='3'
												style={[styles.text_header3, { marginBottom: 20 }]}>
												WHY SPONSOR?
											</Text>
											<Text style={[styles.text_body, { color: '#000' }]}>
												Spicy Green Book’s stories are rich in cultural
												identity—taking you on a fascinating, delicious journey.
												We can’t tell these stories without your help! Now is
												your chance to join our exciting movement by supporting
												our growth. Together, we can empower more Black-owned
												businesses, diversify the world’s business landscape,
												and bring amazing food, culture, and experiences to all!
											</Text>
										</View>
									</View>
								</View>
							</View>
						</View>
					</View>

					<View style={[styles.section, { paddingTop: 10, paddingBottom: 20 }]}>
						<View style={styles.content}>
							<View
								style={
									dimensions.width < 800
										? moreStyles.oppGapContainerSmall
										: moreStyles.oppGapContainerLarge
								}>
								<View
									style={
										dimensions.width < 800 ? {} : { flex: 2, paddingRight: 40 }
									}>
									<ResponsiveImage
										style={{
											width: 800,
											resizeMode: 'contain',
											aspectRatio: 1.1,
										}}
										alt='Opportunity Gap'
										source={
											isWeb
												? { uri: '/images/opportunity_gap.jpg' }
												: require('../public/images/opportunity_gap.jpg')
										}
									/>
								</View>
								<View
									style={
										dimensions.width < 800
											? { paddingTop: 40 }
											: { flex: 2, paddingRight: 20 }
									}>
									<Text
										style={
											dimensions.width < 800
												? [styles.text_body, moreStyles.oppGapSmall]
												: [styles.text_body, moreStyles.oppGapLarge]
										}>
										Due to systemic racism and societal injustices, Black-owned
										businesses often have insufficient access to funding,
										marketing support, and other services.
									</Text>
									<Text
										style={
											dimensions.width < 800
												? [styles.text_body, moreStyles.oppGapSmall]
												: [
														styles.text_body,
														moreStyles.oppGapLarge,
														{ paddingTop: 10 },
												  ]
										}>
										Did you know that 87% of C-Level decision-makers in this
										nation are white men, while white men make up only 20% of
										the overall population?
									</Text>
									<Text
										style={
											dimensions.width < 800
												? [styles.text_body, moreStyles.oppGapSmall]
												: [
														styles.text_body,
														moreStyles.oppGapLarge,
														{ paddingTop: 10 },
												  ]
										}>
										This statistic alone shines a bright light on what we are
										trying to change. Your conscientious contribution goes
										toward helping us level these disparities.
									</Text>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.section}>
						<View style={styles.content}>
							<View
								style={
									dimensions.width < 800
										? { alignItems: 'center', marginTop: 40 }
										: moreStyles.quoteLarge
								}>
								<View
									style={
										dimensions.width < 800
											? { paddingTop: 20, paddingBottom: 20, width: 100 }
											: { flex: 2 }
									}>
									<ResponsiveImage
										style={{
											width: 100,
											resizeMode: 'contain',
											aspectRatio: 1,
										}}
										alt='danilo'
										source={
											isWeb
												? { uri: '/images/danilo.png' }
												: require('../public/images/danilo.png')
										}
									/>
								</View>
								<View
									style={
										dimensions.width < 800
											? { paddingTop: 40 }
											: { flex: 14, paddingLeft: 20 }
									}>
									<Text style={[styles.text_body, { fontWeight: 'bold' }]}>
										“A lot of time, effort, and collaboration went into building
										the systemic problems that have arisen in our history and
										are still present today. We need an equivalent amount of
										effort to alter that system for the better.” —Danilo Batson,
										Founder of SGB.
									</Text>
								</View>
							</View>
						</View>
					</View>

					<View
						style={[
							styles.section,
							{ paddingTop: isWeb ? 20 : 60, paddingBottom: 0 },
						]}>
						<View style={styles.content}>
							<View style={{ position: 'relative', marginBottom: 0 }}>
								<View style={{ paddingTop: (1920 / 1920) * 100 + '%' }} />
								<View
									style={{
										position: 'absolute',
										left: 0,
										top: 0,
										bottom: 0,
										right: 0,
									}}>
									{isWeb ? (
										<video
											src={'/sponsors.mp4'}
											style={{ width: '100%', height: '65%' }}
											controls
										/>
									) : (
										<>
											<Video
												shouldPlay={false /*isMobileHomePageVideoPlaying*/}
												posterSource={require('../public/images/eatwithintention.png')}
												posterStyle={{ width: '100%', height: '100%' }}
												source={{
													uri: 'https://www.spicygreenbook.org/sponsors.mp4',
												}}
												useNativeControls
												resizeMode='contain'
												isLooping
												style={{ flex: 1 }}
											/>
										</>
									)}
								</View>
							</View>
						</View>
					</View>
					<View
						onLayout={(event) => setLayout(event.nativeEvent.layout)}
						ref={sponsorBenefit}
						style={[styles.section, { paddingTop: 20, paddingBottom: 20 }]}>
						<View style={styles.content}>
							<View style={{ alignSelf: 'flex-start' }}>
								<Text
									accessibilityRole='header'
									aria-level='3'
									style={[
										styles.text_header3,
										dimensions.width < 800
											? { marginBottom: 20, marginLeft: 50 }
											: { marginBottom: 20 },
									]}>
									SPONSORSHIP BENEFITS
								</Text>
							</View>
							<View
								style={
									dimensions.width < 800 ? {} : moreStyles.imgTxtContainer2
								}>
								<View
									style={
										dimensions.width < 800
											? moreStyles.broadVisContainerSmall
											: moreStyles.broadVisContainerLarge
									}>
									<Text style={moreStyles.listTitle}>
										Broaden your visibility:
									</Text>

									<View style={moreStyles.textList}>
										<FontAwesome
											name='check'
											size={25}
											style={moreStyles.checkMark}
										/>
										<Text style={moreStyles.checkedText}>
											Reach {props.listingsCount} participating businesses,
											thousands of customers, and our large volunteer network
											with over 1000 applications from across the globe
										</Text>
									</View>
									<View style={moreStyles.textList}>
										<FontAwesome
											name='check'
											size={25}
											style={moreStyles.checkMark}
										/>
										<Text style={moreStyles.checkedText}>
											Appear on the SGB website and app
										</Text>
									</View>
									<View style={moreStyles.textList}>
										<FontAwesome
											name='check'
											size={25}
											style={moreStyles.checkMark}
										/>
										<Text style={moreStyles.checkedText}>
											Engage with SGB's Instagram, Facebook, and Twitter
											communities
										</Text>
									</View>
									<View style={moreStyles.textList}>
										<FontAwesome
											name='check'
											size={25}
											style={moreStyles.checkMark}
										/>
										<Text style={moreStyles.checkedText}>
											Meet like-minded sponsors, donors, and partners
										</Text>
									</View>
								</View>

								<View
									style={
										dimensions.width < 800 ? { paddingTop: 40 } : { flex: 1.1 }
									}>
									<ResponsiveImage
										style={{
											width: 700,
											resizeMode: 'contain',
											aspectRatio: 1.2,
											objectFit: 'cover',
										}}
										alt='Mayas Cookies'
										source={
											isWeb
												? { uri: '/images/mayascookies.png' }
												: require('../public/images/mayascookies.png')
										}
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={[styles.section, { paddingTop: 20, paddingBottom: 20 }]}>
						<View style={styles.content}>
							<View
								style={
									dimensions.width < 800 ? {} : moreStyles.imgTxtContainer2
								}>
								<View
									style={
										dimensions.width < 800 ? { paddingTop: 40 } : { flex: 1.2 }
									}>
									<ResponsiveImage
										style={{
											width: 700,
											resizeMode: 'contain',
											aspectRatio: 1.2,
											objectFit: 'cover',
										}}
										alt='plate of crab'
										source={
											isWeb
												? { uri: '/images/plateofcrab.png' }
												: require('../public/images/plateofcrab.png')
										}
									/>
								</View>

								<View
									style={
										dimensions.width < 800
											? moreStyles.buildRepContainerSmall
											: moreStyles.buildRepContainerLarge
									}>
									<Text style={moreStyles.listTitle}>
										Build your reputation:
									</Text>

									<View style={moreStyles.textList}>
										<FontAwesome
											name='check'
											size={25}
											style={moreStyles.checkMark}
										/>
										<Text style={moreStyles.checkedText}>
											Support diversity and eliminating marginalization
										</Text>
									</View>
									<View style={moreStyles.textList}>
										<FontAwesome
											name='check'
											size={25}
											style={moreStyles.checkMark}
										/>
										<Text style={moreStyles.checkedText}>
											Gain valuable partnerships with SGB and the many
											Black-owned businesses we support
										</Text>
									</View>
									<View style={moreStyles.textList}>
										<FontAwesome
											name='check'
											size={25}
											style={moreStyles.checkMark}
										/>
										<Text style={moreStyles.checkedText}>
											Be recognized in your community as a fair, equitable
											business
										</Text>
									</View>
									<View style={moreStyles.textList}>
										<FontAwesome
											name='check'
											size={25}
											style={moreStyles.checkMark}
										/>
										<Text style={moreStyles.checkedText}>
											Work with our dedicated PR team actively booking
											interviews, television appearances, and connecting with
											influencers
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>

					<View ref={sponsorLevel} id='sponsor_levels' style={styles.section}>
						<View style={styles.content}>
							<View
								style={
									dimensions.width < 800
										? { alignItems: 'center', paddingBottom: 30 }
										: { alignSelf: 'flex-start', paddingBottom: 30 }
								}>
								<Text
									accessibilityRole='header'
									aria-level='3'
									style={[styles.text_header3, { marginBottom: 20 }]}>
									SPONSORSHIP LEVELS
								</Text>
								<Text style={styles.text_body}>
									Each Sponsorship contribution level has its own benefits. Tap
									to learn more or download our{' '}
									<Text style={{ color: '#246e43' }}>Sponsorship Packet.</Text>
								</Text>
							</View>
							<View
								style={{
									flexDirection: 'row',
									flexWrap: 'wrap',
									alignContent: 'center',
									justifyContent: 'space-around',
								}}>
								{sponsorLevels &&
									sponsorLevels.map((level) => (
										<View style={{ paddingBottom: 40 }} key={level.title}>
											<View
												style={
													dimensions.width < 800
														? [
																moreStyles.levels,
																{
																	justifyContent: 'flex-start',
																	alignItems: 'center',
																},
														  ]
														: [
																moreStyles.levels,
																{
																	justifyContent: 'center',
																	flexDirection: 'row',
																},
														  ]
												}>
												<Text
													style={
														dimensions.width < 800
															? [
																	moreStyles.amount,
																	{ lineHeight: 65, marginTop: 60 },
															  ]
															: [styles.button_white_text, moreStyles.amount]
													}>
													<FontAwesome name='dollar' size={60} color='white' />
													{level.amount}
												</Text>
											</View>

											<Text
												style={
													dimensions.width < 800
														? [styles.text_header4, moreStyles.levelTitleSmall]
														: [styles.text_header4, moreStyles.levelTitleLarge]
												}>
												{level.title}
											</Text>
										</View>
									))}
							</View>
						</View>

						<View
							style={[
								styles.section,
								{ paddingTop: isWeb ? 20 : 60, paddingBottom: 40 },
							]}>
							<View style={styles.content}>
								<View style={{ position: 'relative', marginBottom: 0 }}>
									<View style={{ paddingTop: (1920 / 1920) * 100 + '%' }} />
									<View
										style={{
											position: 'absolute',
											left: 0,
											top: 0,
											bottom: 0,
											right: 0,
										}}>
										{isWeb ? (
											<video
												src={'/about.mp4'}
												style={{ width: '100%', height: '100%' }}
												controls
											/>
										) : (
											<>
												<Video
													shouldPlay={false /*isMobileHomePageVideoPlaying*/}
													//posterSource={require("../public/images/home_page_video_thumbnail.jpg")}
													posterStyle={{ width: '100%', height: '100%' }}
													source={{
														uri: 'https://spicygreenbook.org/about.mp4',
													}}
													useNativeControls
													resizeMode='contain'
													isLooping
													style={{ flex: 1 }}
												/>
											</>
										)}
									</View>
								</View>
							</View>
						</View>

						<View style={styles.section}>
							<View style={(styles.content, moreStyles.sponsorLogoContent)}>
								<View
									style={
										dimensions.width < 800
											? { alignItems: 'center', paddingBottom: 30 }
											: { alignSelf: 'flex-start', paddingBottom: 30 }
									}>
									<Text
										accessibilityRole='header'
										aria-level='3'
										style={[
											styles.text_header3,
											{ marginTop: 40, marginRight: 40, marginBottom: 5 },
										]}>
										SPONSORS
									</Text>
								</View>
								<View style={moreStyles.sponsorLogos}>
									<View
										style={{ flexBasis: '30%', marginLeft: 15, marginTop: 0 }}>
										<ResponsiveImage
											style={{
												width: 250,
												resizeMode: 'contain',
												aspectRatio: 0.5,
											}}
											alt='verizon'
											source={
												isWeb
													? { uri: '/images/sponsors/verizon.png' }
													: require('../public/images/sponsors/verizon.png')
											}
										/>
									</View>
									<View style={{ flexBasis: '30%', margin: 15 }}>
										<ResponsiveImage
											style={{
												width: 250,
												resizeMode: 'contain',
												aspectRatio: 0.5,
											}}
											alt='kinecta'
											source={
												isWeb
													? { uri: '/images/sponsors/kinecta.jpeg' }
													: require('../public/images/sponsors/kinecta.jpeg')
											}
										/>
									</View>
								</View>

								{/* Section below is hidden due to issue#233, but left it for easy re-activation once Sponsorship info packet becomes available */}
								{/* <View ref={ourSponsors} style={styles.section}>
            <View style={styles.content}>
              <View
                style={
                  dimensions.width < 800
                    ? { alignItems: "center", paddingBottom: 30 }
                    : { alignSelf: "flex-start", paddingBottom: 30 }
                }
              >
                <Text
                  accessibilityRole="header"
                  aria-level="3"
                  style={[styles.text_header3, { marginBottom: 20 }]}
                >
                  OUR SPONSORS
                </Text>
                <Text style={styles.text_body}>
                  Call for Sponsors! Become one of the first to contribute to
                  our cause. To learn more, download our{" "}
                  <Link href="#" style={{ color: "#246e43" }}>
                    <Text style={styles.text_body}>Sponsorship Packet.</Text>
                  </Link>
                </Text>
                <Text
                  style={
                    dimensions.width < 800
                      ? [styles.text_body, { marginTop: 20 }]
                      : styles.text_body
                  }
                >
                  To express your interest in sponsorship, please email us:{" "}
                  <Link href="mailto:d.batson@spicygreenbook.org">
                    <Text style={{ color: "#246e43" }}>
                      d.batson@spicygreenbook.org
                    </Text>
                  </Link>

                </Text>
              </View>
              <View
                style={
                  isWeb && dimensions.width < 830
                    ? [
                        moreStyles.ourSponsorsBtnSmall,
                        {
                          alignSelf: "stretch",
                          justifyContent: "center",
                          flexDirection: "column"
                        }
                      ]
                    : [
                        moreStyles.ourSponsorsBtnLarge,
                        {
                          justifyContent: "flex-start"
                        }
                      ]
                }
              >
                <TouchableOpacity
                  style={
                    isWeb && dimensions.width > 830
                      ? [
                          styles.button_white,
                          { marginLeft: 50, flexBasis: "30%" }
                        ]
                      : isWeb && dimensions.width < 830
                      ? [
                          styles.button_white,
                          // moreStyles.sponsorPacketBtn,
                          { alignSelf: "stretch", justifyContent: "center" }
                        ]
                      : [
                          styles.button_white
                          // moreStyles.sponsorPacketBtn
                        ]
                  }
                >
                  <Text style={styles.button_white_text}>
                    DOWNLOAD SPONSORSHIP PACKET
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    isWeb && dimensions.width > 830
                      ? [
                          styles.button_green,
                          { marginLeft: 50, flexBasis: "30%" }
                        ]
                      : isWeb && dimensions.width < 830
                      ? [
                          styles.button_green,
                          moreStyles.becomeSponsorWebLarge,
                          { alignSelf: "stretch", justifyContent: "center" }
                        ]
                      : [styles.button_green, moreStyles.becomeSponsorWebSmall]
                  }
                >
                  <Link href="mailto:d.batson@spicygreenbook.org">
                    <Text
                      style={
                        dimensions.width < 830
                          ? styles.button_green_text
                          : [
                              styles.button_green_text,
                              { textAlign: "center", paddingLeft: 50 }
                            ]
                      }
                    >
                      BECOME A SPONSOR
                    </Text>
                  </Link>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          */}

								<View style={styles.section}>
									<View style={(styles.content, moreStyles.sponsorLogoContent)}>
										<View
											style={
												dimensions.width < 800
													? { alignItems: 'center', paddingBottom: 30 }
													: { alignSelf: 'flex-start', paddingBottom: 30 }
											}>
											<Text
												accessibilityRole='header'
												aria-level='3'
												style={[
													styles.text_header3,
													{ marginTop: 20, marginBottom: 20 },
												]}>
												IN KIND SUPPORT
											</Text>
											<Text style={styles.text_body}>
												Want to contribute another way? We will happily accept
												your in kind support!{' '}
												<Link href='mailto:d.batson@spicygreenbook.org'>
													<Text style={{ color: '#246e43' }}>Contact Us</Text>
												</Link>{' '}
												to share your product/service.
											</Text>
											<Text style={styles.text_body}>
												Thank you to our following supporters for helping us
												reduce our operational expenses:
											</Text>
											<View style={{ margin: 30 }}></View>
										</View>
										<View style={moreStyles.sponsorLogos}>
											<View style={{ flexBasis: '30%', marginBottom: 0 }}>
												<ResponsiveImage
													style={{
														width: 150,
														resizeMode: 'contain',
														aspectRatio: 0.5,
													}}
													alt='konnect'
													source={
														isWeb
															? { uri: '/images/sponsors/konnect.jpg' }
															: require('../public/images/sponsors/konnect.jpg')
													}
												/>
											</View>
											<View style={{ flexBasis: '30%' }}>
												<ResponsiveImage
													style={{
														width: 150,
														resizeMode: 'contain',
														aspectRatio: 0.7,
													}}
													alt='vercel'
													source={
														isWeb
															? { uri: '/images/sponsors/vercel.png' }
															: require('../public/images/sponsors/vercel.png')
													}
												/>
											</View>
											<View style={{ flexBasis: '30%' }}>
												<ResponsiveImage
													style={{
														width: 150,
														resizeMode: 'contain',
														aspectRatio: 0.35,
													}}
													alt='re-store'
													source={
														isWeb
															? { uri: '/images/sponsors/re-store.png' }
															: require('../public/images/sponsors/re-store.png')
													}
												/>
											</View>
										</View>
										<View style={moreStyles.sponsorLogos}></View>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const moreStyles = StyleSheet.create({
	levels: {
		backgroundColor: 'black',
		borderRadius: 100,
		height: 180,
		width: 180,
		display: 'flex',
	},
	amount: { fontWeight: 'bold', fontSize: 60, marginTop: 80, color: '#fff' },
	sponsorLogos: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		flexWrap: 'wrap',
	},
	sponsorLogoContent: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	textList: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		paddingBottom: 15,
	},
	checkMark: { color: 'white', marginRight: 10 },
	buildRepContainerSmall: {
		backgroundColor: Theme.green_bg,
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 30,
		marginTop: 30,
		marginBottom: 40,
	},
	buildRepContainerLarge: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: Theme.green_bg,
		paddingLeft: 60,
		paddingRight: 60,
		paddingTop: 18,
		paddingBottom: 20,
	},
	listTitle: {
		fontSize: 24,
		paddingTop: 20,
		paddingBottom: 20,
		color: '#ffffff',
		marginTop: 40,
	},
	imgTxtContainer2: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
	broadVisContainerSmall: {
		backgroundColor: Theme.green_bg,
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 30,
	},
	broadVisContainerLarge: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: Theme.green_bg,
		paddingLeft: 60,
		paddingRight: 60,
		paddingTop: 20,
		paddingBottom: 20,
	},
	checkedText: {
		fontSize: 24,
		alignSelf: 'flex-end',
		color: '#ffffff',
		flex: 1,
		lineHeight: 35,
	},
	quoteLarge: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	oppGapSmall: {
		color: 'white',
		paddingTop: 10,
		fontWeight: 'bold',
		fontSize: 20,
		lineHeight: 24,
	},
	oppGapLarge: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 22,
		lineHeight: 35,
	},
	oppGapContainerSmall: {
		backgroundColor: Theme.green_bg,
		padding: 10,
		paddingBottom: 40,
	},
	oppGapContainerLarge: {
		backgroundColor: Theme.green_bg,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 40,
		paddingBottom: 40,
	},
	whySponsorDiv: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	whySponsorSection: { fontSize: 24, paddingTop: 40, marginTop: 200 },
	whySponsorContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 50,
	},
	btnHeader2: { fontFamily: 'ApercuMedium', padding: 5, fontWeight: 'bold' },
	btnHeader2Container: {
		marginTop: 30,
		backgroundColor: 'black',
		padding: 10,
		width: 210,
		alignItems: 'center',
		marginHorizontal: 90,
	},
	webHeaderSmall: {
		fontSize: 24,
		lineHeight: 1,
		fontFamily: 'ApercuMedium',
		color: 'white',
		fontWeight: 'bold',
		marginTop: 5,
	},
	webHeaderLarge: {
		fontFamily: 'ApercuMedium',
		fontSize: 18,
		lineHeight: 16,
		color: 'white',
		fontWeight: 'bold',
	},
	webHeader2Small: {
		fontSize: 24,
		lineHeight: 1,
		fontFamily: 'ApercuMedium',
		backgroundColor: 'black',
		padding: 10,
		color: 'white',
		fontWeight: 'bold',
		marginTop: 5,
	},
	webHeader2Large: {
		backgroundColor: 'black',
		fontFamily: 'ApercuMedium',
		fontSize: 18,
		lineHeight: 16,
		color: 'white',
		fontWeight: 'bold',
	},
	levelTitleSmall: {
		alignSelf: 'center',
		marginTop: 15,
		fontSize: 30,
		lineHeight: 30,
	},
	levelTitleLarge: { alignSelf: 'center', marginTop: 15, fontSize: 30 },
	becomeSponsorWebLarge: { alignSelf: 'center' },
	becomeSponsorWebSmall: {
		marginLeft: 12,
		marginRight: 20,
		alignSelf: 'stretch',
	},
	ourSponsorsBtnSmall: {
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
	},
	ourSponsorsBtnLarge: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
	},
	// sponsorPacketBtn: {
	//   backgroundColor: "white",
	//   // marginRight: 10,
	//   marginBottom: 10
	// },
	// sponsorPacketBtnText: {
	//   color: "#246e43",
	//   fontSize: 16,
	//   lineHeight: 15,
	//   fontFamily: "ApercuMedium",
	//   textAlign: "center"
	// }
});

export default Page;
