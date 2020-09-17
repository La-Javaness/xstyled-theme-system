// TODO: Import this function from @lajavaness/utils once it's open sourced.
/**
 * Transform an hexadecimal code to a RGBA string.
 * @param   {string}  hex   The hex value to transform.
 * @param   {number=} alpha The alpha value to apply.
 * @returns {number}        The matching RGBA string.
 */
module.exports = (hex, alpha = 1) => {
	const isValid = /^(#|0x)?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/i.test(hex)

	if (isValid) {
		const h = hex.replace(/^(#|0x)/i, '')

		const r = parseInt(h.length === 3 ? h.slice(0, 1).repeat(2) : h.slice(0, 2), 16)
		const g = parseInt(h.length === 3 ? h.slice(1, 2).repeat(2) : h.slice(2, 4), 16)
		const b = parseInt(h.length === 3 ? h.slice(2, 3).repeat(2) : h.slice(4, 6), 16)

		return `rgba(${r}, ${g}, ${b}, ${alpha >= 0 && alpha <= 1 ? alpha : 1})`
	}

	return null
}
