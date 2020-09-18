import {
	compose,
	margin as scMargin,
	marginBottom as scMarginBottom,
	marginLeft as scMarginLeft,
	marginRight as scMarginRight,
	marginTop as scMarginTop,
	mx as scMx,
	my as scMy,
	th,
	variant,
} from '@xstyled/system'
import { css } from '@xstyled/styled-components'

import rgbaToHex from './rgbaToHex'

/**
 * Generates the `textStyle` system helper, a function that computes the CSS
 * properties for a given text style name, based on what's defined in the theme.
 * @param   {object}   props       A component's props.
 * @param   {object}   props.theme The theme provided in the props by styled-components.
 * @returns {Function}             A function that takes a text style name as a
 * parameter, and returns all CSS instructions needed to instantiate this style
 * in a component, or an empty string if no instructions are available or the
 * style name is incorrect.
 */
export const textStyleFactory = (props) => (style) => {
	if (!style) {
		return ''
	}

	const { theme } = props

	if (!theme) {
		if (process.env.XSTYLED_THEME_DEBUG) {
			console.error(`Error: the xstyled-theme theme is missing. Are you sure you've added a ThemeProvider to your DOM?`)
		}
		return ''
	}

	const styleKey = `${style}Style`
	const themeToCssMap = {
		colors: 'color',
		fonts: 'font-family',
		fontWeights: 'font-weight',
		fontSizes: 'font-size',
		lineHeights: 'line-height',
		letterSpacings: 'letter-spacing',
		textDecorations: 'text-decoration',
		textTransforms: 'text-transform',
	}

	return Object.keys(themeToCssMap)
		.map((key) => {
			try {
				if (!theme[key]) {
					if (process.env.XSTYLED_THEME_DEBUG) {
						console.error(
							`Error: your current xstyled-theme theme is incomplete and missing the '${key}' section, or you forgot to wrap an xstyled-theme component with a ThemeProvider.`
						)
					}
					return ''
				}

				const styleValue = theme[key][styleKey]
				const cssPropName = themeToCssMap[key]

				return styleValue ? `${cssPropName}: ${styleValue};\n` : ''
			} catch (e) {
				if (process.env.XSTYLED_THEME_DEBUG) {
					console.error(`Error: Failed to generate CSS instructions for text style '${style}' and key '${key}'`)
				}
				throw e
			}
		})
		.join('')
}

/**
 * Generates the `colorMode` system helper, a function that injects custom CSS
 * instructions into a component based on its `colorMode` prop.
 *
 * Primarily useful to adjust things like letter spacing, font weight or other
 * properties related to contrast rating and legibility to help you meet a11y
 * requirements with every background color you use in your app.
 *
 * The `colorMode` helper takes a unique parameter, an object where each key is
 * the name of a background color in your theme, and each value is a `css` template
 * literal or a string with valid CSS instructions.
 *
 * @param   {object}   props       A component's props.
 * @param   {object}   props.theme The theme provided in the props by styled-components.
 * @returns {Function}     				 The `colorMode` helper that applies variants
 * for your component based on your theme's background colors and its colorMode prop.
 */
export const colorModeFactory = (props) => (params) => {
	const variants = {
		...params,
		__xstncm__: '',
	}

	Object.keys(props.theme.colors)
		.filter((color) => color.startsWith('bg-'))
		.map((color) => color.substr(3))
		.filter((color) => !(color in variants))
		.forEach((color) => {
			variants[color] = ''
		})

	return variant({
		prop: 'colorMode',
		default: '__xstncm__',
		variants,
	})
}
// xstncm -> xstyled-theme no color mode

/**
 * Injects the style blocks defined in a @xstyled-theme theme into the current
 * style block. For instance, if your component defines a Root element, and an
 * external theme supports that component by exporting a Root style block, you
 * can call this function in your component's Root style definition to inject
 * the theme's style.
 *
 * @example
 * const Root = styled.button`
 *   display: flex;
 *   align-items: center;
 *   justify-content: center;
 *
 *   ${injectTheme(ThemeStyle.Root)}
 * `
 * @param   {Function[]} ThemeExport The exported style block from the theme,
 * which is an array of functions that call @xstyled template literal functions
 * like css or variant.
 * @returns {string[]}               An array of strings containing CSS
 * instructions for the element being styled.
 */
export const injectTheme = (ThemeExport) => (props) => {
	if (!ThemeExport) {
		return null
	}

	return ThemeExport.map((fun) =>
		fun({
			colorMode: colorModeFactory(props),
			css,
			props,
			textStyle: textStyleFactory(props),
			th,
			theme: props.theme,
			variant,
		})
	)
}

/**
 * A helper that runs all the margin-related @xstyled/system helpers: margin, m,
 * marginBottom, mb, marginTop, mt, marginLeft, ml, marginRight, mr, mx and my.
 * @type {Function}
 */
export const margins = compose(scMargin, scMarginBottom, scMarginTop, scMarginLeft, scMarginRight, scMx, scMy)

/**
 * Returns the 'src' property to use to display an icon for a given icon name
 * and color. Both name and color must be in the theme. Foreground colors are
 * supported and will be adjusted to the color matching the current background.
 * @param {object} theme		 The theme, which must be retrieved with useContext.
 * @param {string} name      The icon name, taken from the theme.
 * @param {string} color     The icon color, taken from the theme.
 * @param {string} iconsPath The path where the `dist/icons` folder of the
 * theme is deployed on the server.
 * @returns {string}           The string to use as an `src` attribute on an
 * `img` tag to display this icon, or null if an error occured.
 */
export const useIconSrc = (theme, name, color, iconsPath) => {
	const colorValue = theme.colors[color]
	if (!colorValue) {
		return null
	}

	return `${iconsPath}/view/sprite-${rgbaToHex(colorValue).substr(1)}.svg#${name}`
}

export default { textStyleFactory, colorModeFactory, injectTheme, margins, rgbaToHex, useIconSrc }
