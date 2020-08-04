const rgbaToHex = require('../rgbaToHex')

describe('color - rgbaToHex', () => {
	it('transforms an rgba value to the corresponding hex code', () => {
		expect(rgbaToHex('rgba(255, 255, 255, 1)')).toBe('#ffffffff')
		expect(rgbaToHex('rgba(255,255,255,1)')).toBe('#ffffffff')
		expect(rgbaToHex('rgba(255, 255,255, 1)')).toBe('#ffffffff')
		expect(rgbaToHex('rgba( 255,255, 255,1 )')).toBe('#ffffffff')
		expect(rgbaToHex('rgba(0,0,0,0)')).toBe('#00000000')
		expect(rgbaToHex('rgba(0,0,0,1)')).toBe('#000000ff')
		expect(rgbaToHex('rgba(0,0,0,0.5)')).toBe('#00000080')
		expect(rgbaToHex('rgba(0,0,0,0.2)')).toBe('#00000033')
		expect(rgbaToHex('rgba(0,0,0,0.7)')).toBe('#000000b3')
	})

	it('transforms an rgb value to the corresponding hex code', () => {
		expect(rgbaToHex('rgb(0,0,0)')).toBe('#000000ff')
		expect(rgbaToHex('rgb(255,255,255)')).toBe('#ffffffff')
	})

	it('transforms an hex code into an 8-char hex code with alpha', () => {
		expect(rgbaToHex('#fff')).toBe('#ffffffff')
		expect(rgbaToHex('#fffc')).toBe('#ffffffcc')
		expect(rgbaToHex('#ffffff')).toBe('#ffffffff')
		expect(rgbaToHex('#ffffffcc')).toBe('#ffffffcc')
		expect(rgbaToHex('#ffffffff')).toBe('#ffffffff')
		expect(rgbaToHex('#1234')).toBe('#11223344')
		expect(rgbaToHex('0xffffff')).toBe('#ffffffff')
		expect(rgbaToHex('0xffffffff')).toBe('#ffffffff')
		expect(rgbaToHex('0x1234')).toBe('#11223344')
	})

	it('returns null if the input is invalid', () => {
		expect(rgbaToHex('foo')).toBe(null)
		expect(rgbaToHex('BAR')).toBe(null)
		expect(rgbaToHex('#BAR')).toBe(null)
	})
})
