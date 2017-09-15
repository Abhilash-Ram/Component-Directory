angular
	.module("component")
	.directive("dropdownComponent", dropdownComponent);

	function dropdownComponent($compile, transmitter, $log){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				var config = scope.$eval(attrs.config);
				var workarea = angular.element("<select class='form-control'></select>")
				var errorMsg = "";
				if(config.hasOwnProperty("classes")){
					workarea.addClass(config.classes);		
				}
				if(config.hasOwnProperty("placeholder")){
					workarea.append(
						$compile("<option value='' hidden selected>"+config.placeholder+"</option>")(scope))
				}	
				var attributes = [];
				
				attributes.push({
					key:'id',
					value:transmitter.generateUID()
				})

				if(config.hasOwnProperty('model')){
					attributes.push({
								key : 'ng-model',
								value	: ("vm.data."+config.model).toString()
							});
					if(config.hasOwnProperty('data')){
						if( config.hasOwnProperty("idKey") && config.hasOwnProperty("labelKey") ){
							attributes.push({
								key : 'ng-options',
								value:"row."+config.idKey+" as row."+config.labelKey+" for row in "+config.data
							});
						}else if(config.hasOwnProperty('labelKey')){
							attributes.push({
								key : 'ng-options',
								value:"row as row."+config.labelKey+" for row in "+config.data
							});
						}else{
							$log.error("labelKey missing in "+angular.toJson(config)+" review it")
							errorMsg="<br><h5 style='color:red'>DEV : Please give idKey and labelKey for display purpose</h5>";
						}
					}else if(config.hasOwnProperty('method')){
						if( config.hasOwnProperty("idKey") && config.hasOwnProperty("labelKey") ){
							attributes.push({
								key : 'ng-options',
								value:"row."+config.idKey+" as row."+config.labelKey+" for row in "+config.method
							});
						}else if(config.hasOwnProperty('labelKey')){
							attributes.push({
								key : 'ng-options',
								value:"row as row."+config.labelKey+" for row in "+config.method
							});
						}else{
							$log.error("labelKey missing in "+angular.toJson(config)+" review it")
							errorMsg="<br><h5 style='color:red'>DEV : Please give atleast labelKey for display purpose</h5>";
						}
					}else{
						$log.error("error parsing this json config "+angular.toJson(config)+" review it")
						errorMsg="<br><h5 style='color:red'>DEV : please assign data or method to the configuration</h5>";
					}
					if(config.hasOwnProperty("parent")){
						attributes.push({
								key : 'ng-disabled',
								value: ("!vm.data."+config.parent).toString()
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
					$log.error("model missing in "+angular.toJson(config)+" review it")
					errorMsg="<br><h5 style='color:red'>DEV : Please give ng-model to the configuration</h5>";
				}						
				if(angular.equals( errorMsg, "")){
					workarea = transmitter.addAttire( workarea, attributes)
					element.append($compile(workarea)(scope));
				}else{
					element.append($compile(errorMsg)(scope));
				}
			}
		}
	};