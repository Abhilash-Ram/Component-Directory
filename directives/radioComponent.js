angular
	.module("component")
	.directive("radioComponent", radioComponent);

	function radioComponent($compile, transmitter){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				var config = scope.$eval(attrs.config);
				var workarea = angular.element("<input type='radio'/>");
				var errorMsg = "";
				var attributes = [];
				if(config.hasOwnProperty('model')){
					if(config.hasOwnProperty('data')){
						if( config.hasOwnProperty("idKey") && config.hasOwnProperty("labelKey") ){									
							for(var i = 0 ; i < config.data.length; i++){									
								attributes = [];
								attributes.push({
									key:"ng-model",
									value:config.model
								});
								attributes.push({
									key:"ng-value",
									value:config.data[i][config.idKey]
								});
								workarea = transmitter.addAttire( workarea, attributes);
								//workarea = workarea + config.data[i][config.labelKey]
								element.append(workarea);
							}
						}else if(config.hasOwnProperty('labelKey')){
							
						}else{
							$log.error("labelKey missing in "+angular.toJson(config)+" review it")
							errorMsg="<br><h5 style='color:red'>DEV : Please give idKey and labelKey for display purpose</h5>";
						}
					}else if(config.hasOwnProperty('method')){
						if( config.hasOwnProperty("idKey") && config.hasOwnProperty("labelKey") ){
							
						}else if(config.hasOwnProperty('labelKey')){
							
						}else{
							$log.error("labelKey missing in "+angular.toJson(config)+" review it")
							errorMsg="<br><h5 style='color:red'>DEV : Please give atleast labelKey for display purpose</h5>";
						}
					}
				}else{
					errorMsg = "<h5 style='color:red'>DEV : Provide model to radio button</h5>"
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