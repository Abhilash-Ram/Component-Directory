angular
	.module("component")
	.directive("headerComponent", headerComponent);

	function headerComponent($compile, transmitter){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				var header = scope.$eval(attrs.header);						
				var size = 'md';						
				var errorMsg = "";
				if(header.hasOwnProperty('title')){
					switch(header.size){
						case('lg')	: size = 2; break;
						case('md')	: size = 3; break;
						case('sm')	: size = 4; break;
						case('xs')	: size = 5; break;
						default : size = 3
					}
					var workarea = angular.element("<h"+size+"></h"+size+">");
					workarea.text(header.title)
					if(header.hasOwnProperty("classes")){
						workarea.addClass(header.classes);
					}	
				}else{
					errorMsg = "<h4>DEV : Provide heading title</h4>";
				}
				if(!angular.equals(errorMsg,"")){
					workarea = errorMsg;
				}
				element.append($compile(workarea)(scope))
			}
		}
	};
