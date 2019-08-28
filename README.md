# React theme switcher component

> A react theme switcher component

## Installation

```bash
# using yarn
yarn add react-theme-switcher

# using npm
npm install react-theme-switcher
```

## Usage

By default theme switcher is applied to body and colors are already setted

```js
import React from "react";
import ThemeSwitcher from "react-theme-switcher";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<ThemeSwitcher />
				<h2>React theme switcher</h2>
			</header>
		</div>
	);
}

export default App;
```

Props you can pass to the component:

```js
<ThemeSwitcher
	cssSelector="body"
	switcherColor="#2775cc"
	darkColor="#282c34"
	lightColor="#ffffff"
	lightTextColor="#272b33"
	darkTextColor="#ffffff"
/>
```

## Demo

Preview it on CodeSandbox <https://codesandbox.io/s/6yr87ozmkk>

![demo](https://abdessalam-benharira.me/assets/images/projects/demo-react-theme-switcher.gif)

## Author

[Abdessalam BENHARIRA](https://github.com/Abdessalam98)
