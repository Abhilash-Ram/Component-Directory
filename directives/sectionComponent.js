angular
	.module("component")
	.directive("sectionComponent", sectionComponent);

	function sectionComponent($compile, $log){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				var config = scope.$eval(attrs.config)
				var workarea = "";
				switch(config.format){
					case('panel'): workarea = "<header-component header='"+angular.toJson(config.header)+"'></header-component><loop-component items='"+angular.toJson(config.items)+"'></loop-component>";
									break;
					case('accordion'): workarea = "<accordion-component  config='"+angular.toJson(config)+"' items='"+angular.toJson(config.items)+"'></accordion-component>"; 
						break;
					case('tab'): break;
				}
				element.append($compile(workarea)(scope));
			}
		}
	};