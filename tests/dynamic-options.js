var expect = window.chai.expect;
var Dominar = require('../src/dominar');

describe('dynamic validatorOptions tests', function() {

	it('should allow dynamic options', function() {

		var dominar = new Dominar($('<form><div class="form-group"><input name="a" value="test1"><input name="b" value="test2"></div></form>')[0], {
			a: {
				rules: 'required'
			},
			b: {
				rules: 'test',
				validatorOptions: function(options) {
					if (dominar.getField('a').getValue() == 'test1') {
						options.rules = 'required|min:3|' + options.rules.b;
					}
					return options;
				},
				customMessages: {
					min: 'Silly, this should be at least :min characters.'
				}
			}
		});

		expect(dominar.getField('b').getValidationOptions()).to.deep.equal({
			data: {
				b: 'test2'
			},
			rules: 'required|min:3|test',
			customMessages: {
				min: 'Silly, this should be at least :min characters.'
			},
			customAttributes: {}
		});

	});

});