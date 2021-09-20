# After-Build

## Purpose

This repo demonstrates the inclusion of a script that is automatically run after build.
You can run any activity in the after-build.js script.
In this example we add preload tags to the build index.html and we also generate a sitemap.xml by reading the routes in the app.

## Getting Started

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

**Update Settings** - Change the following settings in the script to marry with your app.

## PreLoad
If you want to use the preload to inject tags into the built index.html, set or check the following settings;

**pathToEntry** - This is the path to the built index.html file we will inject tags into.

**mediaAssetsPath** - Check this path matches the build you are creating or update it accordingly.

**linkAs Array** - Check this contains the file types you expect to be creating link tags for.

## Sitemap
Generates a sitemap but reading your route file and building a sitemap.cml file including file edit dates.

**domain** - Set this to the domain that will appear in the links within the sitemap.

**routesFileTargetPath** - This is the path and filename of the file to be built. For example:
```javascript
const routesFileTargetPath = './build/sitemap.xml';
```
**routesFile** - This is the file that contains your routes (using react-router-dom). For example:
```javascript
const routesFile = './src/App.js';	
```



### `Limitations`

**Note: There may be more issues than listed here.**

The after-build.js script does not look for path arrays in route declarations. This may be added in future.
```js
<Route path={["/tertiary/", "/quaternary/"]} component={Secondary}/>
```

