import { Button } from "../elements";
import useApplicationStore from "../state/application.state";

const AddSection = () => {
	const addSection = useApplicationStore((state) => state.addSection);

	return (
		<div className="py-1 text-center text-2xl">
			<Button onClick={addSection} unstylled className="bg-sky">
				New Text Section
			</Button>
			<Button onClick={addSection} unstylled className="bg-sky">
				New Code Section
			</Button>
		</div>
	);
};

export default AddSection;
