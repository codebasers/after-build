import { useLocation } from 'react-router-dom'
import RoutesSwitchCode from '../../assets/after-build-routes-switch-V01.PNG';
import ImportsCode from '../../assets/after-build-imports-V01.PNG';

function Secondary(props) {
	
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<main>
			<h1>Secondary Component</h1>
			<div>
				<p>Multi-path route (<i className="code">/tertiary/</i> & <i className="code">/quaternary/</i>) in a 
				shared path (<i className="code">Section</i>) targeting one component.</p>
				<p className="code">/pages/Section/Secondary.jsx</p>
				<p className='loud'>Path: {pathname}</p>
				<p>This is called in using render props in App.js for the <i className="code">/secondary/</i> route and directly using the component for other routes.
					See lines 24, 26 and 27 below.</p>
				<img src={RoutesSwitchCode} alt='Routes Switch Code from App.js' />
				<p>This structure requires the after-build script to look up the path in the route file to get the component, then look up the 
					component's import so it can read the edit date on the actual component file.</p>
				<img src={ImportsCode} alt='Imports Code from App.js' align="left" />
			</div>


			
		</main>
	);
}

export default Secondary;