import React from "react";
import { View } from "react-native";
import useFetchData from "../../hooks/useFetchData";

import Hero from "./components/Hero";
import About from "./components/About";
import DownloadApp from "../../components/DownloadApp";
import VideoPlayer from "../../components/VideoPlayer";
import PressRecognition from "./components/PressRecognition";
import NewListings from "./components/NewListings";
import SGBRoadMap from "./components/SGBRoadMap";
import Shop from "./components/Shop";
import CallToAction from "./components/CallToAction";
import Testimonial from "./components/Testimonial";
import Updates from "./components/Updates";
import Follow from "./components/Follow";
import SubscribeSection from "./components/SubscribeSection";
import Quote from "./components/Quote";

function Page(props) {
	const [Listings, loadingListings, errorListings] = useFetchData("listing", props.listings);

	return (
		<>
			{/* Hero Section */}
			<Hero />

			{/* Download App for Web Section */}
			<DownloadApp />

			{/* VideoPlayer section */}
			<VideoPlayer source="https://spicygreenbook.org/intro.mp4" posterSource={require("../../public/images/home_page_video_thumbnail.jpg")} />

			{/* About section */}
			<About navigation={props.navigation} />

			{/* Press Recognition section */}
			<PressRecognition list={props.press} />

			{/* Divider */}
			<View style={{ height: 5, backgroundColor: "#000" }} />

			{/* New Listing */}
			<NewListings Listings={Listings} loadingListings={loadingListings} errorListings={errorListings} navigation={props.navigation} />

			{/* Map */}
			<SGBRoadMap Listings={Listings} loadingListings={loadingListings} />

			{/* Shop */}
			<Shop />

			{/* Call to Action Section: "BECOME A ..." */}
			<CallToAction />

			{/* Testimonials */}
			<Testimonial list={props.testimonials} />

			{/* Updates */}
			<Updates list={props.updates} />

			{/* Follow */}
			<Follow />

			{/* Subscribe to Newsletter section */}
			<SubscribeSection />

			{/* Quote section */}
			<Quote />
		</>
	);
}

export default Page;
