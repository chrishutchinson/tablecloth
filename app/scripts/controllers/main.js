'use strict';

/**
 * @ngdoc function
 * @name tableclothApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tableclothApp
 */
angular.module('tableclothApp')
  .controller('MainCtrl', function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {
  	var columns = [
  		'',
  		'',
  		'',
  		'',
  		''
  	];
    $scope.data = [
    	columns,
    	['','','','','']
    ];

    $scope.dataSet = false;

    $scope.$watch('data', function(value, old) {
		if(value !== old) {
			var dataSet = value;
			$scope.dataSet = dataSet;
		}
    }, true);
  });
