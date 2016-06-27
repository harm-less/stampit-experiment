'use strict';

angular.module('utils', [])

	.service('_', function() {
		return window._;
	})

	.service('stampit', function() {
		return window.stampit;
	});