angular
	.module("component")
	.directive("loopComponent", loopComponent);

	function loopComponent($compile, $log){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				var items = scope.$eval(attrs.items);
				for( var i = 0 ; i < items.length ;i++ ){
					if(attrs.hasOwnProperty("columns")){
						console.log("yes i have parent")
						element.append($compile("<div class='col-md-"+scope.$eval(attrs.columns)+"'><component-directory config='"+angular.toJson(items[i])+"'></component-directory></div>")(scope));	
					}else{
						element.append($compile("<component-directory config='"+angular.toJson(items[i])+"'></component-directory>")(scope));	
					}
				}
			}
		}
	};