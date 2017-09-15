angular
	.module("component")
	.directive("formComponent", formComponent);

	function formComponent($compile, transmitter, $log){
		return {
			restrict:'E',
			replace:true,					
			link:function(scope, element, attrs){
				var config = scope.$eval(attrs.config);
				var workarea = angular.element("<form role='form'></form>");
				var attributes = [];
				attributes.push({
					key : 'id',
					value: transmitter.generateUID()
				});
				if(config.hasOwnProperty('name')){
					attributes.push({
						key : 'name',
						value: config.name
					});
				}
				if(config.hasOwnProperty("header")){
					element.append($compile("<header-component header='"+angular.toJson(config.header)+"'></header-component>")(scope))
				}						
				if(config.hasOwnProperty("items")){
					element.append($compile("<loop-component items='"+angular.toJson(config.items)+"'></loop-component>")(scope));
				}
				if(config.hasOwnProperty("action")){
					element.append($compile("<loop-component items='"+angular.toJson(config.action)+"'></loop-component>")(scope));
				}
			}
		}
	};