angular
	.module("component")
	.directive("errorComponent", errorComponent);

	function errorComponent($log, $compile){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				var config = scope.$eval(attrs.config);
				element.append($compile("<h5>"+config.type+" component doesn't exists in directory</h5>")(scope));
			}
		}
	};