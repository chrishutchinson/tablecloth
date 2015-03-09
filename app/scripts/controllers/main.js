'use strict';

/**
 * @ngdoc function
 * @name tableclothApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tableclothApp
 */
angular.module('tableclothApp')
  .controller('MainCtrl', function ($scope, DTInstances) {

    // Setup some default config options
    $scope.paging = false;
    $scope.recordsPerPage = 10;
    $scope.searching = false;
    $scope.ordering = false;

    var dtInstance;

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
        setOptions();
  		}
    }, true);

    var setOptions = function() {
      $scope.dataTableOptions = {
        displayLength: $scope.recordsPerPage,
        paging: $scope.paging,
        searching: $scope.searching,
        ordering: $scope.ordering,
      };
    };
    setOptions();

    var getDtInstance = function(cb) {
      if(typeof dtInstance === 'undefined') {
        DTInstances.getLast().then(function (instance) {
          dtInstance = instance;

          if(cb) {
            cb(dtInstance);
          }
        });
      } else {
        if(cb) {
          cb(dtInstance);
        }
      }
    };
    getDtInstance();

    var getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    var tableHTML = '',
        tableHeadHTML = '',
        tableBodyHTML = '';
    var setCode = function() {
      angular.forEach($scope.data, function(e, i){
        if(i === 0) {
          tableHeadHTML += '<thead>\n<tr>\n';
          angular.forEach(e, function(cell) {
            tableHeadHTML += '<th>' + cell + '</th>\n';
          });
          tableHeadHTML += '</tr>\n</thead>';
        } else {
          tableBodyHTML += '<tr>\n';
          angular.forEach(e, function(cell) {
            tableBodyHTML += '<td>' + cell + '</td>\n';
          });
          tableBodyHTML += '</tr>\n';
        }
      });

      tableHTML = tableHeadHTML + '<tbody>\n' + tableBodyHTML + '</tbody>\n';

      var rand = getRandomInt(1, 10000);
      $scope.html = '<table id="table-' + rand + '">\n' + tableHTML + '</table>'; 
      $scope.script = "<script type=\"text/javascript\">$(document).ready(function() { $('#table-" + rand + "').DataTable(); } );</script>";
    };

    var rerender = function(value, old) {
      if(value !== old) {
        getDtInstance(function(dtInstance) {
          setOptions();
          dtInstance.rerender();

          setCode();
        });
      }
    };

    $scope.$watch('paging', rerender);
    $scope.$watch('recordsPerPage', rerender);
    $scope.$watch('searching', rerender);
    $scope.$watch('ordering', rerender);
  });
