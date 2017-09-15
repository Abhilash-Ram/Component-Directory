angular
	.module("component")
	.directive("inputComponent", inputComponent);

	function inputComponent( $compile, transmitter, $log){				
				return {
					restrict:'E',
					replace:true,
					link:function(scope, element, attrs){
						var config = scope.$eval(attrs.config);
						var workarea = angular.element("<input class='form-control'/>");
						var errorMsg = "";
						var attributes = [];
						attributes.push({
							key:'id',
							value:transmitter.generateUID()
						});
						attributes.push({
							key:'type',
							value:config.type
						});
						if(config.hasOwnProperty("model")){
							attributes.push({
								key:'ng-model',
								value:config.model
							});	
							if(config.hasOwnProperty("placeholder")){
								attributes.push({
									key:'placeholder',
									value:(config.placeholder).toString()
								});	
							}
							if(config.hasOwnProperty("ngChange")){
								var params = "";
								for(var i = 0, length = config.ngChange.length; i < length; i++){
									if( i == length-1 ){
										params = params + config.ngChange[i]
									}else{
										params = params + config.ngChange[i]+";"
									}
								}
								attributes.push({
									key : 'ng-change',
									value: params
								});			
							}
						}else{
							errorMsg = angular.element("<br><h5 style='color:red'>DEV : Please give ngModel to use this component</h5>")
						}
						if(angular.equals( errorMsg, "")){
							workarea = transmitter.addAttire( workarea, attributes);		
						}else{
							workarea = errorMsg
						}
						element.append($compile(workarea)(scope));

						//keyup event to change the value of that input
						angular.element(element).on("keyup", function(e) {
							config["value"] = e.target.value;
						});
					}
				}
			};