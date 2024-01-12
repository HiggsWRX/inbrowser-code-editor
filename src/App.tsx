// import AddCell from "./components/AddCell";
import { useEffect, useState } from "react";
import SectionList from "./components/SectionList";
import Header from "./components/Header";
import useApplicationStore from "./state/application.state";
import Section from "./components/Section";
import { Flipped, Flipper } from "react-flip-toolkit";
import AddSection from "./components/AddSection";

const App = () => {
	const REACT_TYPES_DEF_URL =
		"https://cdn.jsdelivr.net/npm/@types/react@18.2.0/index.d.ts";

	const updateReactDefinitions = useApplicationStore(
		(state) => state.updateReactDefinitions,
	);
	const sections = useApplicationStore((state) => state.sections);

	useEffect(() => {
		fetch(REACT_TYPES_DEF_URL)
			.then((response) => response.text())
			.then((responseText) => updateReactDefinitions(responseText));
	}, [updateReactDefinitions]);

	return (
		<div className="p-4 text-white">
			<Header className="mb-4" />
			<Flipper flipKey={""}>
				<SectionList>
					{sections.map((section, index) => (
						<Flipped key={section.id} flipId={section.id}>
							<Section index={index} data={section} key={section.id} />
						</Flipped>
					))}
					<AddSection />
				</SectionList>
			</Flipper>
		</div>
	);
};

export default App;
