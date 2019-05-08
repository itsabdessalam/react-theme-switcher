import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        transition: background 0.2s cubic-bezier(.75,0,.08,1);
        &[data-theme='dark'] {
            color: ${props => props.darkTextColor};
            background: ${props => props.darkColor};
        }
        &[data-theme='light'] {
            color: ${props => props.lightTextColor};
            background: ${props => props.lightColor};
        }
    }
`;

const ThemeSwitcherWrapper = styled.div`
	display: inline-block;
	width: 45px;
	height: 20px;
	text-align: center;
	position: relative;
	cursor: pointer;

	label {
		position: relative;
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	input[type="checkbox"] {
		display: block;
		width: 100%;
		height: 100%;
		opacity: 0;
		margin: auto;
		pointer-events: all;
		cursor: pointer;
		&:checked ~ .button {
			left: 25px;
		}
	}
`;

const Button = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${props => props.buttonColor};
	box-shadow: 0 0.9px 1.8px rgba(0, 0, 0, 0.4);
	transition: all 0.2s cubic-bezier(0.75, 0, 0.08, 1);
	pointer-events: none;
`;
const Switch = styled.span`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 40px;
	height: 10px;
	border-radius: 5px;
	background-color: ${props => props.switchColor};
	transition: all 0.2s cubic-bezier(0.75, 0, 0.08, 1);
	pointer-events: none;
`;

class ThemeSwitcher extends Component {
	constructor(props) {
		super(props);
		const globalWindow = typeof window !== "undefined";
		this.state = {
			globalWindow,
			theme:
				localStorage.getItem("theme") !== null
					? localStorage.getItem("theme")
					: "light"
		};
	}
	componentDidMount = () => {
		const { theme } = this.state;
		const { cssSelector } = this.props;
		const seletor = document.querySelector(cssSelector);
		seletor.dataset.theme = theme;
	};

	switchTheme = () => {
		const { globalWindow, theme } = this.state;
		const { cssSelector } = this.props;
		const seletor = document.querySelector(cssSelector);
		const newTheme = theme === "light" ? "dark" : "light";

		if (seletor.getAttribute("data-theme")) {
			seletor.dataset.theme = newTheme;
		}
		if (globalWindow === true) {
			localStorage.setItem("theme", newTheme);
		}

		this.setState({
			theme: newTheme
		});
	};

	render() {
		const { theme } = this.state;
		const {
			darkColor,
			lightColor,
			darkTextColor,
			lightTextColor,
			buttonColor,
			switchColor
		} = this.props;
		return (
			<ThemeSwitcherWrapper>
				<GlobalStyle
					darkColor={darkColor}
					lightColor={lightColor}
					darkTextColor={darkTextColor}
					lightTextColor={lightTextColor}
				/>
				<label htmlFor="switcher">
					<input
						type="checkbox"
						onChange={this.switchTheme}
						defaultChecked={theme === "dark"}
						name="switch"
						value="switch"
						aria-describedby="switch"
					/>
					<Switch className="switch" switchColor={switchColor} />
					<Button className="button" buttonColor={buttonColor} />
				</label>
			</ThemeSwitcherWrapper>
		);
	}
}

ThemeSwitcher.defaultProps = {
	cssSelector: "body",
	darkColor: "#282c34",
	lightColor: "#ffffff",
	buttonColor: "#ffffff",
	switchColor: "#2775cc",
	lightTextColor: "#272b33",
	darkTextColor: "#ffffff"
};

export default ThemeSwitcher;
