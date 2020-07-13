import 'core-js'
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
const textStyleFactory = (props) => (style) => {
	if (!style) {
		return ''
	}

	const { theme } = props
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
			const styleValue = theme[key][styleKey]
			const cssPropName = themeToCssMap[key]

			return styleValue ? `${cssPropName}: ${styleValue};\n` : ''
		})
		.join('')
}

/**
 * Injects custom CSS instructions into a component based on its `colormode` prop.
 * Primarily useful to adjust things like letter spacing, font weight or other
 * properties related to contrast rating and legibility to help you meet a11y
 * requirements with every background color you use in your app.
 * @param   {object} params A structure similar to the one used by `@xstyled/system`'s
 * `variant` utility, except that there is no `default` key. Keys must be the name
 * of a background color in your theme, and values must be `css` template literals.
 * @returns {Function}     An `@xstyled/system` `variant`.
 */
const colorMode = (params) => variant({ ...params, prop: 'restProps.colorMode', default: '__xstncm__', __xstncm__: '' })
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
const injectTheme = (ThemeExport) => (props) => {
	if (!ThemeExport) {
		return null
	}

	return ThemeExport.map((fun) =>
		fun({ colorMode, css, props, textStyle: textStyleFactory(props), th, theme: props.theme, variant })
	)
}

/**
 * A helper that runs all the margin-related @xstyled/system helpers: margin, m,
 * marginBottom, mb, marginTop, mt, marginLeft, ml, marginRight, mr, mx and my.
 * @type {Function}
 */
const margins = compose(scMargin, scMarginBottom, scMarginTop, scMarginLeft, scMarginRight, scMx, scMy)

export { colorMode, injectTheme, margins, textStyleFactory }
