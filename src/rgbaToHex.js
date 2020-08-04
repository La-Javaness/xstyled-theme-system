// TODO: Import this function from @lajavaness/utils once it's open sourced.
/**
 * Transforms a rgba color to an hexadecimal code with alpha values.
 * @param   {string} rgba The rgba value to transform, or an hex code which will
 * be returned as an 8-character hex.
 * @returns {string}      The hex code for the color, including alpha.
 */
module.exports = (rgba) => {
	const isAlreadyHex = /^(#|0x)([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/.test(rgba)
	if (isAlreadyHex) {
		const r = rgba.substr(rgba.startsWith('#') ? 1 : 2).toLowerCase()
		switch (r.length) {
			case 3:
				return `#${r[0]}${r[0]}${r[1]}${r[1]}${r[2]}${r[2]}ff`
			case 4:
				return `#${r[0]}${r[0]}${r[1]}${r[1]}${r[2]}${r[2]}${r[3]}${r[3]}`
			case 6:
				return `#${r}ff`
			case 8:
			default:
				return `#${r}`
		}
	}

	const values = rgba
		.replace(/rgba?\(/, '')
		.replace(')', '')
		.split(',')
		.map((val) => val.trim())
		.map((val) => Number(val))

	if (values.includes(NaN)) {
		return null
	}

	if (rgba.startsWith('rgb(')) {
		values.push(255)
	} else {
		values[3] = Math.round(values[3] * 255)
	}

	if (values.length !== 4) {
		return null
	}

	return `#${values
		.map((val) => val.toString(16).toLowerCase())
		.map((val) => (val.length === 2 ? val : `0${val}`))
		.join('')}`
}
