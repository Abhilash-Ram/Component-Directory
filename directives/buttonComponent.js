angular
	.module("component")
	.directive("buttonComponent", buttonComponent);

	function buttonComponent( $compile, transmitter, $log){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				var config = scope.$eval(attrs.action);
				var workarea = angular.element("<button></button>");
				var errorMsg = "";
				var attributes = [];
				if(config.hasOwnProperty('title')){
					workarea.text(config.title);
					workarea.addClass(config.classes);
					if(config.hasOwnProperty("ngClick")){
						attributes.push({
							key:"ng-click",
							value:config.ngClick
						})
					}
				}else{
					errorMsg = "<h5 style='color:red'>DEV : Provide button title</h5>"
				}
				if(angular.equals(errorMsg , "")){
					workarea = transmitter.addAttire( workarea, attributes);
				}else{
					workarea = errorMsg;
				}
				element.append($compile(workarea)(scope))
			}
		}
	};