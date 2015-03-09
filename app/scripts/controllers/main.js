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

    var tableHTML = '',
        tableHeadHTML = '',
        tableBodyHTML = '';

    var setCode = function() {
      var dataNoHeaders = angular.copy($scope.dataSet);
      if(typeof dataNoHeaders[0] !== 'undefined') {
        var headers = angular.copy(dataNoHeaders[0]);
        delete dataNoHeaders[0];

        var headersData = [];
        angular.forEach(headers, function(e, i) {
          headersData.push({
            title: e
          });
        });
      }

      var rand = Math.floor(Math.random() * (10000 - 1)) + 1;
      $scope.resources = '<link rel="stylesheet" href="//cdn.datatables.net/1.10.5/css/jquery.dataTables.min.css" />\n<script src="//cdn.datatables.net/1.10.5/js/jquery.dataTables.min.js" type="text/javascript"></script>'; 
      $scope.html = '<table id="table-' + rand + '"></table>'; 
      $scope.script = '<script type="text/javascript">\n' + 
                        '  $(document).ready(function() {\n' + 
                          '    $(\'#table-' + rand + '\').dataTable({\n' +
                            '      ordering: ' + $scope.ordering + ',\n' + 
                            '      searching: ' + $scope.searching + ',\n' + 
                            '      paging: ' + $scope.paging + ',\n' + 
                            '      displayLength: ' + $scope.recordsPerPage + ',\n' + 
                            '      columns: ' + JSON.stringify(headersData) + ',\n' +
                            '      data: ' + returnJSONString(dataNoHeaders) + ',\n' +
                          '    });\n' + 
                        '  });\n' + 
                      '</script>';

    };

    var returnJSONString = function(data) {
      var returnData = [];
      angular.forEach(data, function(e, i) {
        if(e !== null && typeof e !== 'undefined') {
          returnData.push(e);
        }
      });

      return JSON.stringify(returnData);
    };

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

    $scope.$watch('data', function(value, old) {
      if(value !== old) {
        var dataSet = value;
        $scope.dataSet = dataSet;
        setOptions();
        setCode();
      }
    }, true);
  });
