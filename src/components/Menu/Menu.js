import { Link } from 'react-router-dom'

function Menu({ ...rest}) {
	
	const menuArray = [
		{
			itemKey: 'home',
			path: '/'
		},
		{
			itemKey: 'about',
			path: '/About/'
		},
		{
			itemKey: 'primary',
			path: '/primary/'
		},
		{
			itemKey: 'secondary',
			path: '/secondary/'
		},
		{
			itemKey: 'tertiary',
			path: '/tertiary/'
		},
		{
			itemKey: 'quaternary',
			path: '/quaternary/'
		}
	];


	return (
		<>
			<ul>			
				{ menuArray.map((iter, index) => {					
					return (							
						<li key={index} >						
							<Link to={iter.path}>{iter.itemKey}</Link>
						</li>
					)								
				})}
			</ul>
		</>
	)
}

export default Menu;

