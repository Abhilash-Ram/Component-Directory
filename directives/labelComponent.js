angular
	.module("component")
	.directive("labelComponent", labelComponent)

	function labelComponent($compile, transmitter, $log){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				var config = scope.$eval(attrs.config);
				var workarea = angular.element("<label>"+config.title+"</label>");
				var attributes = []
				if(!angular.equals( [], attributes)){
					workarea = transmitter.addAttire( workarea, attributes);
				}
				element.append($compile(workarea)(scope));
			}
		}
	};