'use strict';

angular.module('models.core', ['utils'])

	.factory('model', function (stampit, _) {
		return stampit.init(function() {
			var errors = [];

			this.data = function () {

			};

			this.validate = function () {
				return errors.length === 0;
			};

			this.addError = function (error) {
				console.log(error.getCode());
				errors.push(error);
				return this;
			};

			this.removeError = function (errorCode) {
				errors = _.reject(this.errors, function (error) {
					return error.errorCode === errorCode;
				});
				return this;
			};

			this.getErrors = function() {
				return errors;
			};

			this.clearErrors = function () {
				errors = [];
				return this;
			};
		});
	})

	.factory('observer', function (stampit, $timeout, _) {

		return stampit.init(function () {

			var listeners = [];

			var listerTimeOutHandler;

			this.update = function () {
				if (listeners.length > 0) {
					if (listerTimeOutHandler) {
						$timeout.cancel(listerTimeOutHandler);
					}

					listerTimeOutHandler = $timeout(function () {
						angular.forEach(listeners, function (listener) {
							(listener.callback || angular.noop)();
						});
					}, 500);
				}
			};

			this.registerUpdateListener = function (name, listener) {
				listeners.push({name: name, callback: listener});
			};

		});
	})

	.factory('CoreModelCollector', function (Class, vuCoreModelObserver, _) {

		return vuCoreModelObserver.extend(function() {

			var collection = [];

			this.constructor = function () {
				this.super();
			};

			this.add = function (item) {
				collection.push(item);
				this.update();
			};

			this.remove = function (removeItem, comparator) {

				collection = _.filter(collection, function (item) {
					return comparator ? !comparator(item, removeItem) : JSON.stringify(item) !== JSON.stringify(removeItem);
				});
				this.update();
			};

			this.removeByIndex = function (index) {
				collection.splice(index, 1);
				this.update();
			};

			this.addArray = function (items) {

				items.forEach(function (item) {
					collection.push(item);
				});
				this.update();

			};

			this.removeArray = function (items, comparator) {

				items.forEach(function (item, comparator) {
					this.remove(item, comparator);
				});
				this.update();

			};

			this.getCollection = function () {
				return collection;
			};

			this.validate = function () {

				var validation = true;

				angular.forEach(this.getCollection(), function (collectionItem) {

					validation = validation && collectionItem.validate();
				});

				return validation;
			};

			this.clearErrors = function () {

				angular.forEach(collection, function (collectionItem) {
					collectionItem.clearErrors();
				});
			};

			this.clearCollection = function () {

				collection = [];
			};
		});
	});