'use strict';

angular.module('stampit', ['models.core', 'utils', 'errors'])

	.controller('MainController', function($scope, stampit, model, observer, error) {

		$scope.logs = [];

		var defaults = {
			hello: 'world',
			other: 'BAM!'
		};

		var observableModel = stampit.compose(defaults, model, observer);

		var modelInstance = observableModel({
			hello: 'other world'
		});

		modelInstance.registerUpdateListener('listener1', function() {
			console.log($scope.logs.length);
			$scope.logs.push('listener1');
		});

		$scope.updateModelListeners = function() {
			modelInstance.update();
		};

		$scope.addError = function() {
			modelInstance.addError(error({
				code: Math.ceil(Math.random() * 12),
				message: 'I\'m an error'
			}));

			$scope.errors = modelInstance.getErrors();
		};
	});