# After-Build

## Purpose

This repo demonstrates the inclusion of a script that is automatically run after build.
You can run any activity in the after-build.js script.
In this example we add preload tags to the built index.html and we also generate a sitemap.xml by reading the routes in the app.

## Getting Started

**Clone and run the repo** - This is a simple CRA app with react-router-dom and nothing else.

**Running the after-build script** - Simply run `npm run build` and it will run automatically after build. 
Check the build folder for index.html (and look in it for injected preload tags) and look for the sitemap.xml file also in the build folder.

**Run script directly** - You can also run `node ./src/tools/after-build.js` to run the script directly.

:imp: WARNING! - The Preload tool is designed to run on a cleanly built index.html. 
Running directly repeatedly will multiply injected tags in the index.html file. 
Clear the index.html file if it grows too big by running `npm run build` once in a while. 

**Script Output** - When the script runs it will output some simple processing data...

![after-build script output](/src/assets/after-build-script-output_V01.PNG)

## Implementing in Your Project

**after-build script** - Save the ./src/tools/after-build.js script to your preferred location in your app.

**Update package.json** - Add the following to the build command in your package.json file;
```javascript
// Add the following in the scripts section to the build command
' && node ./src/tools/after-build.js'

// so it looks like this..
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build && node ./src/tools/after-build.js",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```


## PreLoad
Injects preload tags into the index.html file built during the build process.

[MDN Web Docs: Link types: preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)

**pathToEntry** - This is the path to the freshly built (remembering this is run immediately after a `npm run build`) index.html file we will inject tags into.

**mediaAssetsPath** - Check this path matches the build structure you are creating or update it accordingly.

**linkAs Array** - Check this contains the file types you expect to be creating link tags for. It matches extensions found in the media assets to 'types' of rel links.
```HTML
<!-- reads the asset extension (in e.g. 'woff2') and marks it as a type of 'font' -->
<link rel="preload" as="font" href="/static/media/montserrat-v15-latin-300.00b3e893.woff2" type="font/woff2" crossorigin>
```

 

## Sitemap
Generates a sitemap by reading your route file and building a sitemap.cml file including file edit dates.

**domain** - Set this to the domain that will appear in the links within the sitemap.

**builtSitemapTargetPath** - This is the path and filename of the file to be built. For example:
```js
const builtSitemapTargetPath = './build/sitemap.xml';
```
**routesFile** - This is the file that contains your routes (using react-router-dom). For example:
```js
const routesFile = './src/App.js';	
```


## Check Your RegExps on RegExr

Reading the files relies on the accuracy of the RegExp.

:green_apple: TIP: fork the RegExps if you need to test them so you can have your own copy to return to.



### Find-HTML-Meta-Tags-Static

Find static content tags in built index.html.
```js
const bundlesRegExp = /\/static\/\w+\/[\w-]+\.[a-z0-9]+(\.[a-z0-9]+)*\.\w{2,3}/gim;
```
**Test your setup:**

Turn off the save of the built (tags injected) index.html by setting -
```js
const runFileWritePreLoad = false;
```
Then run `npm run build` to get a clean build of the index.html.

Open up [regexr.com/6605e](https://regexr.com/6605e).

Copy the contents of your index.html file and paste it into the Text Tests area and you should see something like this...

![Static Tags RegExp](/src/assets/after-build-static-meta-tags-V01.PNG)



### Find-React-Route-Paths

Looks for the path attribute in routes.
```js
const routesRegExp = /(?<=path=(?:'|"))([^'"]+)/gim;				// see https://regexr.com/65tsp
```
**Test your setup:**

Open up [regexr.com/65tsp](https://regexr.com/65tsp).

Copy the contents of your routes file (probably App.js) into the Text Tests area and you should see something like this...

![Static Tags RegExp](/src/assets/after-build-routes-paths-V01.PNG)



### React-Find-Route-Import-File

Looks for the path to actual Component code files.
```js
const importPathRegExp = `(?<=import\\s+${pathKey}\\s*from\\s'[\\.]+\\/pages\\/)([\\/A-Z]+)`; 	// regexr.com/65u02
```
**Test your setup:**

Open up [regexr.com/65u02](https://regexr.com/65u02).

Copy the contents of your routes file (probably App.js) into the Text Tests area.

Note the saved Expression in RegExr has a pipe delimited list of Component names.

Change the Expression in RegExr to marry with the Component names you are using. This is handled in the after-build script as it passes in the `${pathKey}` to the expression.

You should see something like this...

![Component File Paths RegExp](/src/assets/after-build-component-paths-V01.PNG)



### Find-React-Route-Components

Looks for the React Component used in each Route.
```js
const routeComponentRegExp = `(?<=path=('|")\\/${path}(\\/)?('|")\\s+(component={|.*\\sreturn\\s<))([^\\s}]+)`;		// regexr.com/65ttn
```
**Test your setup:**

Open up [regexr.com/65ttn](https://regexr.com/65ttn).

Copy the contents of your routes file (probably App.js) into the Text Tests area.

Note the saved Expression in RegExr has a pipe delimited list of path names.

Change the Expression in RegExr to marry with the path names you are using. This is handled in the after-build script as it passes in the `${path}` to the expression.

![Route Components RegExp](/src/assets/after-build-route-component-V01.PNG)



### Limitations

More complex route setups where they may be spread over multiple files would require customising the implementation.

The after-build.js script does not look for path arrays in route declarations. This may be added in future.
```js
<Route path={["/tertiary/", "/quaternary/"]} component={Secondary}/>
```
Untested on Next.js

Preload requirements have not been reviewed for some time so please use at your discretion.

#### Notes

We run this (concept) in production deployed on AWS via Amplify.
