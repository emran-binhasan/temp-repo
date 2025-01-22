import { useEffect } from "react";

const useTitle = (title) => {
	useEffect(() => {
		document.title = `Akkhan Securities | ${title}`;
	}, [title]);
};

export default useTitle;
