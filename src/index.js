import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { hexToRgba } from "./utils/helpers";

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

const ThemeSwitcherWrapper = styled.div``;

const Button = styled.button`
	display: block;
	position: relative;
	width: 48px;
	height: 22px;
	margin-left: 8px;
	padding: 0;
	border: none;
	background: ${props => hexToRgba(props.switcherColor, 0.2)};
	border-radius: 30px;
	cursor: pointer;
	&::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 12px;
		width: 16px;
		height: 16px;
		background: ${props => props.switcherColor};
		-webkit-transform: translateZ(0) translate(-50%, -50%);
		transform: translateZ(0) translate(-50%, -50%);
		border-radius: 30px;
		transition: transform 0.2s cubic-bezier(0.75, 0, 0.08, 1) 0s,
			-webkit-transform 0.2s cubic-bezier(0.75, 0, 0.08, 1) 0s;
	}
	&.active::after {
		transform: translateX(24px) translate(-50%, -50%);
	}
`;

class ThemeSwitcher extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
		const { cssSelector } = this.props;
		const seletor = document.querySelector(cssSelector);

		this.setState(
			currentState => ({
				theme: currentState.theme === "light" ? "dark" : "light"
			}),
			() => {
				seletor.dataset.theme = this.state.theme;
				localStorage.setItem("theme", this.state.theme);
			}
		);
	};
	render() {
		const { theme } = this.state;
		const isActive = theme === "dark" ? "active" : "";
		const {
			switcherColor,
			darkColor,
			lightColor,
			darkTextColor,
			lightTextColor
		} = this.props;
		return (
			<ThemeSwitcherWrapper>
				<GlobalStyle
					darkColor={darkColor}
					lightColor={lightColor}
					darkTextColor={darkTextColor}
					lightTextColor={lightTextColor}
				/>
				<Button
					switcherColor={switcherColor}
					className={`${"button-switcher " + isActive}`}
					aria-label="switch theme button"
					onClick={this.switchTheme}
				/>
			</ThemeSwitcherWrapper>
		);
	}
}

ThemeSwitcher.defaultProps = {
	cssSelector: "body",
	switcherColor: "#2775cc",
	darkColor: "#1e2227",
	lightColor: "#ffffff",
	lightTextColor: "#272b33",
	darkTextColor: "#ffffff"
};

export default ThemeSwitcher;
