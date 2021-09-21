import RoutesSwitchCode from '../../assets/after-build-routes-switch-V01.PNG';

function Bravo(props) {
	return (
		<main>
			<h1>Home Component</h1>
			<div>
				<p>Simple route in its own path and component.</p>
				<p className="code">/pages/Home/Home.jsx</p>
				<p>This is called in using render props in App.js. This is done to demonstrate the passing in of 
					props to the component (more importantly that the regexp will figure out the component and file path).
					See line 21 below.
					</p>
				<p>Later versions of react-router will have different methods of achieving this. Check out this interesting piece on <a href='https://reacttraining.com/blog/react-router-v6-pre/' target='_blank'>React Router v6 Preview</a>.</p>
				<img src={RoutesSwitchCode} alt='Routes Switch Code from App.js' />
			</div>
		</main>
	);
}

export default Bravo;