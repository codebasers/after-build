const fs = require('fs');
const runFileWrites = true;																// Global switch to skip actual file writes
const runFileWritePreLoad = runFileWrites;												// switch to skip just the preload file write
const runFileWriteSitemap = runFileWrites;												// switch to skip just the sitemap file write

const shadyFG = {
	black: '\x1b[30m%s\x1b[0m',
	blue: '\x1b[34m%s\x1b[0m',
	cyan: '\x1b[96m%s\x1b[0m',
	green: '\x1b[32m%s\x1b[0m',
	red: '\x1b[91m%s\x1b[0m',
	white: '\x1b[97m%s\x1b[0m',
	yellow: '\x1b[33m%s\x1b[0m',
	magenta: '\x1b[95m%s\x1b[0m',
	grey: '\x1b[90m%s\x1b[0m',
};
const shadyBG = {
	black: '\x1b[40m%s\x1b[0m',
	blue: '\x1b[104m%s\x1b[0m',
	cyan: '\x1b[106m%s\x1b[0m',
	green: '\x1b[102m%s\x1b[0m',
	red: '\x1b[101m%s\x1b[0m',
	white: '\x1b[107m%s\x1b[0m',
	yellow: '\x1b[103m%s\x1b[0m',
	magenta: '\x1b[105m%s\x1b[0m',
	grey: '\x1b[100m%s\x1b[0m',
};





/*
		8888888b.  8888888b.  8888888888      888      .d88888b.        d8888 8888888b.   .d8888b.  
		888   Y88b 888   Y88b 888             888     d88P" "Y88b      d88888 888  "Y88b d88P  Y88b 
		888    888 888    888 888             888     888     888     d88P888 888    888 Y88b.      
		888   d88P 888   d88P 8888888         888     888     888    d88P 888 888    888  "Y888b.   
		8888888P"  8888888P"  888             888     888     888   d88P  888 888    888     "Y88b. 
		888        888 T88b   888      888888 888     888     888  d88P   888 888    888       "888 
		888        888  T88b  888             888     Y88b. .d88P d8888888888 888  .d88P Y88b  d88P 
		888        888   T88b 8888888888      88888888 "Y88888P" d88P     888 8888888P"   "Y8888P"  

		Updates the index.html file immediately after a build.
		It adds preload tags for essential assets (css & js) that exist in the build index.html.
		It also looks for desired media assets as dictated by the mediaRegExp. This is usually fonts.
		It will warn (but not prevent) pre-loading of more than the recommended 6 assets.

		IMPORTANT
		if you run after-build.js in testing a lot (as in directly using node ./src/tools/after-build.js without the build command) 
		this file size can explode as it will keep adding preload tags eery time.
		Simply call npm run build to reset it.
*/

// Read in index.html and look for js and css assets to preload
const pathToEntry = './build/index.html';
const bundlesRegExp = /\/static\/\w+\/[\w-]+\.[a-z0-9]+(\.[a-z0-9]+)*\.\w{2,3}/gim;		// regexr.com/6605e
const builtHTMLContent = fs.readFileSync(pathToEntry).toString();
const links = builtHTMLContent.match(bundlesRegExp);

console.log(`\n\nINJECTING PRELOADS FOR ${shadyBG['magenta']}`, `  \x1b[97m${pathToEntry}  `);

/* Read the media files and add filtered subset to link for preload
	<link rel="preload" as="font" href="/static/media/montserrat-v15-latin-300.00b3e893.woff2" type="font/woff2" crossorigin>
*/
const mediaAssetsPath = './build/static/media/';
const findMediaAssets = fs.readdirSync(mediaAssetsPath);
const mediaRegExp = /[\w-]+\.[a-z0-9]+(\.[a-z0-9]+)*\.(woff[2]*)/g;						// woff, woff2

findMediaAssets.forEach(file => {
	if (file.match(mediaRegExp)) {
		console.log(`${shadyBG['cyan']}`, '    /static/media/'+file); 
		links.push('/static/media/'+file);
	}
})

const linkAs = {
	css: 'style',
	js: 'script',
	woff: 'font',
	woff2: 'font',
	ttf: 'font'
}
const linkPreloads = links.map(link => {
	const fileExt = link.split('.').pop();
	const linkType = linkAs[fileExt];
	console.log(`${shadyFG['green']}`, `    File Extension: ${fileExt} - Link Type = ${linkType}`);
	return (
		`<link rel="preload" as="${linkType}" href="${link}" ${linkType === 'font' ? 'type="font/'+fileExt+'" crossorigin' : ''} >`
	)
}).join('');

const originalLength = builtHTMLContent.length;
console.log(`    Original Length ${originalLength}`);

const htmlWithPreload = builtHTMLContent.replace(
  '<meta charset="utf-8"/>',
  '<meta charset="utf-8"/><!-- Inject Preloads -->' + linkPreloads
)

const finalLength = htmlWithPreload.length;
console.log(`${shadyFG['cyan']}`, `    Final Length ${finalLength}`);

console.log(`    MATCHES FOUND: ${shadyFG['cyan']}`, `${links.length}`);
if(links.length > 6 ) {
	console.log(`${shadyBG['red']}`, '    WARNING: Exceeded recommended maximum of 6 preload links!'); 
}

if(runFileWritePreLoad) {
	fs.writeFileSync(pathToEntry, htmlWithPreload);
} else {
	console.log(`ALERT: ${shadyBG['magenta']}`, 'ACTUAL FILE WRITE SKIPPED for PRE-LOADS'); 
}






/*
			 .d8888b. 8888888 88888888888 8888888888 888b     d888        d8888 8888888b.  
			d88P  Y88b  888       888     888        8888b   d8888       d88888 888   Y88b 
			Y88b.       888       888     888        88888b.d88888      d88P888 888    888  
			 "Y888b.    888       888     8888888    888Y88888P888     d88P 888 888   d88P 
			    "Y88b.  888       888     888        888 Y888P 888    d88P  888 8888888P"  
				  "888  888       888     888        888  Y8P  888   d88P   888 888        
			Y88b  d88P  888       888     888        888   "   888  d8888888888 888        
			 "Y8888P" 8888888     888     8888888888 888       888 d88P     888 888        
																		   
 */
const domain = 'https://your-domain.com.au';
const builtSitemapTargetPath = './build/sitemap.xml';										// full path of file to be created
const routesFile = './src/App.js';														// js file containing the route switch
const readRoutesFile = fs.readFileSync(routesFile).toString();							// read the contents of the route file
const routesRegExp = /(?<=path=(?:'|"))([^'"]+)/gim;									// see https://regexr.com/65tsp
const routesArray = readRoutesFile.match(routesRegExp);									// extract the paths from the route file contents

console.log(`\n\nBUILDING SITEMAP FOR ${shadyBG['magenta']}`, `  \x1b[97m${domain}  `);

// console.log('Routes Array');
// console.log(routesArray);


const getFileUpdatedDate = (pathKey) => {
	const startPath = './src/pages/';
	// use the pathKey to find the import statement so we can get the directory structure to find the actual file to then get its edit date.  :|
	const importPathRegExp = `(?<=import\\s+${pathKey}\\s*from\\s'[\\.]+\\/pages\\/)([\\/A-Z]+)`; 	// regexr.com/65u02
	const pathKeyImportRegExp = new RegExp(importPathRegExp,"gim");
	const importPathArray = readRoutesFile.match(pathKeyImportRegExp);					// extract the path from the route file contents. e.g. GraphicDesign/DeConsult

	if(!importPathArray) {
		console.log(`${shadyBG['red']}`, `importPathArray was not returned: ${importPathArray} for ${pathKeyImportRegExp}`);
		return;
	}
	if( importPathArray.length !== 1) {
		console.log(`${shadyBG['red']}`, `Path Array did not have only one element. Returned ${importPathArray}`);
		return;
	}
	const path = `${startPath}${importPathArray[0]}`;									// add the start to the path to get (e.g.) ./src/pages/Section/Secondary
	//console.log(path);

	let extFound = null;
	if (fs.existsSync(path + '.js')) {
		extFound = 'js';
	}
	if (fs.existsSync(path + '.ts')) {
		extFound = 'ts';
	}
	if (fs.existsSync(path + '.tsx')) {
		extFound = 'tsx';
	}
	if (fs.existsSync(path + '.jsx')) {
		extFound = 'jsx';
	}
	if (fs.existsSync(startPath + pathKey + '/index.js')) {
		extFound = 'index.js';
	}
	if(extFound) {			
		const stats = fs.statSync(path+'.'+extFound);
		console.log(`  File Extension: ${shadyFG['green']}`, 	`${extFound}`);
		console.log(`  File Updated:   ${shadyFG['magenta']}`, 	stats.mtime);
		return stats.mtime
	} else {
		console.log(`${shadyBG['red']}`, `No Extension found for ${pathKey}`);
	}
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${routesArray
		.map((aRoute) => {
			const path = aRoute
				.replace('*', '/404/')													// swap * to /404/
				.replace(/[/]?/g, '');													// remove all forward slashes


			console.log(`\n  Path:           ${shadyFG['cyan']}`, `${path}`);

			const routeComponentRegExp = `(?<=path=('|")\\/${path}(\\/)?('|")\\s+(component={|.*\\sreturn\\s<))([^\\s}]+)`;		// regexr.com/65ttn		- Gets Components for each route
			const componentRegEx = new RegExp(routeComponentRegExp, "gim");
			let thisComponent = readRoutesFile.match(componentRegEx);					// extract the components used for each path from the route file contents
			let pagePriority = '0.5';

			console.log(`  Component:      ${shadyFG['yellow']}`, `${thisComponent}`);

			const importantPaths = [ '', 'contact', 'about' ];							// MANUALLY SET Priority - could eventually automate this but time is short.
			if((importantPaths.indexOf(path) > -1)) { 									// if path is in list of important paths
				pagePriority = '1.0';
			}
			console.log(`  pagePriority:   ${shadyFG['grey']}`, `${pagePriority}`);

			const ignorePaths = [ '404', 'four-zero-four' ];
			if((ignorePaths.indexOf(path) > -1)) { 										// if path is in list of paths to ignore
				return '';																// do not return anything for a 404 as Google Search Console will complain
			}

			const fileUpdated = `<lastmod>${getFileUpdatedDate(thisComponent).toISOString()}</lastmod>`;

			const endPath = path.length ? `/${path}/` : '/';							// add BOTH slashes back to all but ONLY TRAILING to the root

			return `	<url>
				<loc>${`${domain}${endPath}`}</loc>
				<changefreq>monthly</changefreq>
				<priority>${pagePriority}</priority>
				${fileUpdated}
			</url>
		`;}).join('')}</urlset>	`;


if(runFileWriteSitemap) {
	fs.writeFileSync(builtSitemapTargetPath, sitemap);
} else {
	console.log(`ALERT: ${shadyBG['magenta']}`, 'ACTUAL FILE WRITE SKIPPED for ROUTES');
}