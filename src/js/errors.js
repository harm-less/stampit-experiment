'use strict';

angular.module('errors', ['utils'])

	.factory('error', function (stampit) {

		return stampit.methods({
			getCode: function getCode() {
				return this.code;
			},
			getMessage: function getMessage() {
				return this.message;
			}
		}).refs({
			code: '',
			message: ''
		});
	});