import { useLocation } from 'react-router-dom'


// function Menu({ ...rest}) {
function Charlie(props) {
	
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<main>
			<h1>Secondary Component</h1>
			<p className='loud'>Path: {pathname}</p>
			<p>Multi Path Route targeting one component.</p>
			<p>File structure includes other pages (components) in the same file location.</p>
			<p>This structure requires the after-build script to look up the path in the route file, then look up the 
			import so it can read the edit date on the component file.</p>
		</main>
	);
}

export default Charlie;