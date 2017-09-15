angular
	.module("component")
	.directive("checkboxComponent", checkboxComponent);

	function checkboxComponent($compile, transmitter){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				var config = scope.$eval(attrs.config);
				var workarea = angular.element("<input type='checkbox'/>");
				var errorMsg = "";
				var attributes = [];
				if(config.hasOwnProperty('model')){
					attributes.push({
							key:"ng-model",
							value:config.model
						})					
					if(config.hasOwnProperty("ngChange")){
						attributes.push({
							key:"ng-change",
							value:config.ngChange
						})
					}
				}else{
					errorMsg = "<h5 style='color:red'>DEV : Provide model to checkbox</h5>"
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