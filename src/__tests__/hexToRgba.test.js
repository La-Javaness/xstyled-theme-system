const hexToRgba = require('../hexToRgba')

describe('color - hexToRgba', () => {
	it('transform the hex value to the rgba value - without alpha', () => {
		expect(hexToRgba('#fff')).toBe('rgba(255, 255, 255, 1)')
		expect(hexToRgba('#ffffff')).toBe('rgba(255, 255, 255, 1)')
		expect(hexToRgba('fff')).toBe('rgba(255, 255, 255, 1)')
		expect(hexToRgba('0xffffff')).toBe('rgba(255, 255, 255, 1)')
		expect(hexToRgba('#000')).toBe('rgba(0, 0, 0, 1)')
		expect(hexToRgba('#000000')).toBe('rgba(0, 0, 0, 1)')
		expect(hexToRgba('#d93025')).toBe('rgba(217, 48, 37, 1)')
	})

	it('transform the hex value to the rgba value - with alpha', () => {
		expect(hexToRgba('#fff', 0.5)).toBe('rgba(255, 255, 255, 0.5)')
		expect(hexToRgba('#ffffff', 0.2)).toBe('rgba(255, 255, 255, 0.2)')
		expect(hexToRgba('#000', 0.5)).toBe('rgba(0, 0, 0, 0.5)')
		expect(hexToRgba('#000000', 0.2)).toBe('rgba(0, 0, 0, 0.2)')
		expect(hexToRgba('#d93025', 0.3)).toBe('rgba(217, 48, 37, 0.3)')
	})

	it('returns null if hex value has an incorrect format - without alpha', () => {
		expect(hexToRgba('foo')).toBe(null)
		expect(hexToRgba('BAR')).toBe(null)
		expect(hexToRgba('#BAR')).toBe(null)
	})

	it('returns null if hex value has an incorrect format - with alpha', () => {
		expect(hexToRgba('BAR', 'foo')).toBe(null)
		expect(hexToRgba('BAR', '0.2')).toBe(null)
		expect(hexToRgba('BAR', '1')).toBe(null)
	})
})
