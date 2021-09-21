import RoutesSwitchCode from '../../assets/after-build-routes-switch-V01.PNG';

function About(props) {
	return (
		<main>
			<h1>About Component</h1>
			<div>
				<p>Simple route in its own path and component.</p>
				<p className="code">/pages/About/About.jsx</p>
				<p>This is called in using the simple component in route.
					See line 22 below.
					</p>
				<img src={RoutesSwitchCode} alt='Routes Switch Code from App.js' />
			</div>
		</main>
	);
}

export default About;