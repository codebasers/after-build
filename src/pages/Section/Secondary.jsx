import { useLocation } from 'react-router-dom'


// function Menu({ ...rest}) {
function Charlie(props) {
	
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<main>
			<h1>Secondary Component</h1>
			<p>Path: {pathname}</p>
			<p>Simple route in its own component.</p>
			<p>File structure includes other pages in the same location.</p>
		</main>
	);
}

export default Charlie;