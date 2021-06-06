import React from "react";
import { View } from "react-native";

import Hero from "./components/Hero";
import About from "./components/About";
import DownloadApp from "../../components/DownloadApp";
import VideoPlayer from "../../components/VideoPlayer";
import PressRecognition from "./components/PressRecognition";
import SGBRoadMap from "./components/SGBRoadMap";
import Shop from "./components/Shop";
import CallToAction from "./components/CallToAction";
import Testimonial from "./components/Testimonial";
import Updates from "./components/Updates";
import Follow from "./components/Follow";
import SubscribeSection from "./components/SubscribeSection";
import Quote from "./components/Quote";

function Page(props) {
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

			{/* Map and New Listing section, sine both depends on listings data  */}
			<SGBRoadMap list={props.listings} navigation={props.navigation} />

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
