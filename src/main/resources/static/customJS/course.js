var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {

	$scope.SuccessMSG = '';
	$scope.ErrorMSG = '';

	$scope.loadTable = function() {
		$http({
			method : "GET",
			url : "/courses"
		}).then(function mySuccess(response) {
			$scope.allCourses = response.data;
		}, function myError(response) {
			$scope.ErrorMSG = response.headers('ErrorMSG');
			$scope.messageAlart();
		});
	};

	$scope.saveCourse = function() {
		var dataObj = {
			courseName : $scope.courseName,
			description : $scope.description
		}
		dataObj = JSON.stringify(dataObj);
		console.log(dataObj);
		$http({
			method : 'POST',
			url : '/courses',
			data : dataObj,
			headers : {
				'Content-Type' : 'application/json'
			}
		}).then(function(response) {
			$scope.SuccessMSG = response.headers('SuccessMSG');
			$scope.messageAlart();
			$scope.loadTable();
		}, function myError(response) {
			$scope.ErrorMSG = response.headers('ErrorMSG');
			$scope.messageAlart();
		});
	}

	$scope.courseId = '';
	$scope.EditRow = function(data) {
		$scope.rowData = data;
		if (data != null) {
			$scope.courseId = data.courseId;
			$scope.courseName = data.courseName;
			$scope.description = data.description;
		} else {
			$scope.clearform();
		}
	}

	$scope.updateCourse = function() {

		var dataObj = {
			courseId : $scope.courseId,
			courseName : $scope.courseName,
			description : $scope.description
		}
		dataObj = JSON.stringify(dataObj);
		console.log(dataObj);
		$http({
			method : 'PUT',
			url : '/courses/' + $scope.courseId,
			data : dataObj,
			headers : {
				'Content-Type' : 'application/json'
			}
		}).then(function(response) {
			$scope.SuccessMSG = response.headers('SuccessMSG');
			$scope.messageAlart();
			$scope.loadTable();
		}, function myError(response) {
			$scope.ErrorMSG = response.headers('ErrorMSG');
			$scope.messageAlart();
		});
	}

	$scope.DeleteRow = function(courseId) {
		if (confirm('Are you sure to delete this course ?')) {
			$http({
				method : 'DELETE',
				url : '/courses/' + courseId,
			}).then(function(response) {
				$scope.SuccessMSG = response.headers('SuccessMSG');
				$scope.messageAlart();
				$scope.loadTable();
			}, function myError(response) {
				$scope.ErrorMSG = response.headers('ErrorMSG');
				$scope.messageAlart();
			});
		}
	}

	$scope.clearform = function() {
		$scope.courseId = "";
		$scope.courseName = "";
		$scope.description = "";
	}

	$scope.messageAlart = function() {
		if ($scope.SuccessMSG != undefined) {
			$("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
				$("#success-alert").slideUp(500);
			});
		}
		if ($scope.ErrorMSG != undefined) {
			$("#error-alert").fadeTo(2000, 500).slideUp(500, function() {
				$("#error-alert").slideUp(500);
			});
		}
	}
});