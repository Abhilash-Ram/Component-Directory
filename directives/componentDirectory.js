angular
	.module("component")
	.directive("componentDirectory", componentDirectory)

	function componentDirectory($compile, $parse, transmitter, $log){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				var source = "";
				var config = scope.$eval(attrs.config);
				if(attrs.hasOwnProperty('config')){
					if(!angular.equals(config, undefined)){
						switch(config.type){
							case('email'):
							case('number'):
							case('text'):source = "<input-component config='"+angular.toJson(config)+"'></input-component>";
											break;
							case('dropdown'):source = "<dropdown-component config='"+angular.toJson(config)+"'></						dropdown-component>";
											break;
							case('textarea'):source = "<textarea-component config='"+angular.toJson(config)+"'></						textarea-component>";
											break;
							case('form'): 	source = "<form-component config='"+angular.toJson(config)+"'></form-component>";
											break;
							case('accordion'):source = "<accordion-component config='"+angular.toJson(config)+"'></accordion-component>";
											break;
							case('tab'):source = "<tab-component config='"+angular.toJson(config)+"'></tab-component>";
											break;
							case('button'): source = "<button-component action='"+angular.toJson(config)+"'></button-component>";
											break;
							case('section'): source="<section-component config='"+angular.toJson(config)+"'></section-component>";
											break;
							case('layout'): source="<layout-component config='"+angular.toJson(config)+"'></layout-component>";
											break;
							case('checkbox'): source="<checkbox-component config='"+angular.toJson(config)+"'></checkbox-component>";
											break;
							case('radio'): source="<radio-component config='"+angular.toJson(config)+"'></radio-component>";
											break;
							default	: source = "<error-component config='"+angular.toJson(config)+"'></error-component>";
											break;
						}
						if(!angular.equals(source,"")){
							var workarea = ""
							if(config.hasOwnProperty("title") && !angular.equals(config.type, "button") && !angular.equals(config.type, "button")){
								workarea = angular.element("<div class='form-group'></div>");
								var attributes = [];
								if(config.hasOwnProperty("showmode")){
									attributes.push({
										key : 'ng-show',
										value: config.showmode
									});	
								}
								transmitter.addAttire( workarea, attributes);
								workarea.append(angular.element("<label-component config='"+angular.toJson(config)+"'></label-component>"));
							}
							if(angular.equals( workarea, "")){
								workarea = source;
							}else{
								workarea.append(source);	
							}
							element.append($compile(workarea)(scope));	
						}	
					}else{
						var errorMsg = "<h5 style='color:red'>DEV : Please define the configuration.</h5>"
						element.append($compile(errorMsg)(scope));	
					}
				}else{
					var errorMsg = "<h5 style='color:red'>DEV : Please define the config to the component.</h5>"
					element.append($compile(errorMsg)(scope));	
				}
				
			}
		}
	};