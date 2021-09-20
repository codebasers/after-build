# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Purpose

This repo demonstrates the inclusion of a script that is automatically run after build.
You can run any activity in the after-build.js script.
In this example we add preload tags to the build index.html and we also generate a sitemap.xml by reading the routes in teh app.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Limitations`

**Note: There may be more issues than listed here.**

The after-build.js script does not look for path arrays in route declarations. This may be added in future.
```js
<Route path={["/tertiary/", "/quaternary/"]} component={Secondary}/>
```

