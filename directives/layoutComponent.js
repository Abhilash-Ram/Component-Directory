angular
	.module("component")
	.directive("layoutComponent", layoutComponent);

	function layoutComponent( $compile, transmitter){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				var config = scope.$eval(attrs.config);
				var size = Math.ceil(12/config.columns);
				element.append($compile("<div class='row'><loop-component columns='"+angular.toJson(size)+"' items='"+angular.toJson(config.items)+"'></loop-component></div>")(scope));
			}
		}
	}