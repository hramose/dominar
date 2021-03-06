var expect = window.chai.expect;
var Dominar = require('../src/dominar');

describe('message tests', function() {

	it('should show error required error message', function() {
		
		var dominar = new Dominar($('<form><div class="form-group"><input name="username"></div></form>')[0], {
			username: {
				rules: 'required',
				feedback: false,
				message: true
			}
		});

		dominar.validateAll();

		expect($(dominar.form).html()).to.contain([
			'<input name="username">',
			'<span class="help-block">The username field is required.</span>',
		].join(''));
	});

});

describe('custom messages tests', function() {

	it('should allow custom error message', function() {

		var dominar = new Dominar($('<form><div class="form-group"><input name="username"/></div></form></form>')[0], {
			username: {
				rules: 'required',
				feedback: false,
				customMessages: {
					'required': ':attribute field is required you silly billy!'
				}
			}
		});

		dominar.validate('username');
		expect($(dominar.form).html()).to.equal([
			'<div class="form-group has-error">',
				'<input name="username">',
				'<span class="help-block">username field is required you silly billy!</span>',
			'</div>'
		].join(''));

	});


	it('should use existing message element if found', function() {

		var dominar = new Dominar($('<form><div class="form-group"><span class="help-block test"></span><input name="username"/></div></form>')[0], {
			username: {
				rules: 'required|min:1',
				message: true,
				feedback: false
			}
		});

		dominar.validate('username');
		expect($(dominar.form).html()).to.equal([
			'<div class="form-group has-error">',
				'<span class="help-block test">The username field is required.</span>',
				'<input name="username">',
			'</div>'
		].join(''));

	});

});

