
import { Switch, Route } from 'react-router-dom'


import Home			from './pages/Home/Home';
import About		from './pages/About/About';
import Primary		from './pages/Section/Primary';
import Secondary	from './pages/Section/Secondary';
import Menu			from './components/Menu/Menu';
import logo 		from './logo.svg';
import './App.css';

function App() {
	const someProp = 'passing-prop-from-App';
	return (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<Menu />
		</header>	
		<div>
			<Switch>
				<Route exact path="/" render={ routeProps => { return <Home {...routeProps} someProp={someProp} />; } } />
				<Route path='/about/' component={About}/>
				<Route path='/primary/' component={Primary}/>	
				<Route path='/secondary/' render={ routeProps => { return <Secondary {...routeProps} someProp={someProp} />; } } />
				{/* <Route path={["/tertiary/", "/quaternary/"]} component={Secondary}/> */}
				<Route path='/tertiary/' component={Secondary}/>	
				<Route path='/quaternary/' component={Secondary}/>	

						

			</Switch>
		</div>
	</div>
	);
}

export default App;
