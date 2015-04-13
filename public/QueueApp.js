'use strict';

(function () {

    angular.module('qudini.QueueApp', [])
        .controller('QueueCtrl', QueueCtrl);

    /**
     * Bonus points - manipulating the without waiting for the
     * server request
     */
    function QueueCtrl($scope, $http) {

        $scope.customers = [];
        $scope.customersServed = [];
        _getCustomers();
        _getServedCustomers();

        //bonus manipulating it without been waiting for the server request
        $scope.onCustomerAdded = function(customer){
            $scope.customers.push(customer);
            setTimeout(function(){
                _getCustomers();
            }.bind(this), 1000);
        };

        $scope.onCustomerRemoved = function(){
            _getCustomers();
        };

        $scope.onCustomerServed = function(){
            _getCustomers();
            _getServedCustomers()
        };

        function _getServedCustomers(){
            return $http.get('/api/customers/served').then(function(res){
                $scope.customersServed = res.data;
            })
        }

        function _getCustomers(){
            return $http.get('/api/customers').then(function(res){
                $scope.customers = res.data;
            })
        }
    }


})();

