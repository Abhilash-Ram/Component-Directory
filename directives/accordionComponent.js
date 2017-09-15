angular
	.module("component")
	.directive("accordionComponent", accordionComponent);

	function accordionComponent($compile, transmitter){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				var config = scope.$eval(attrs.config);
				var header = config.header;
				var state = ""
				var items = scope.$eval(attrs.items);
				var UID = transmitter.generateUID();
				var string = "<div class='panel-group' id='accordion'><div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#"+UID+"'>$HEADING</a></h4></div><div id='"+UID+"' class='panel-collapse collapse in'><div class='panel-body'>$CONTENT</div></div></div>";
				string = string.replace("$HEADING", header.title);
				string = string.replace("$CONTENT", "<loop-component items='"+angular.toJson(items)+"'></loop-component>");
				element.append($compile(string)(scope));
			}
		}
	};