angular
	.module("component", [])
	.config(componentConfig)
	.service("transmitter", transmitter);

	function componentConfig( $logProvider){
		$logProvider.debugEnabled(true);
	}

	function transmitter($log){
		this.generateUID = function(){
			function generate() {
			  return Math.floor((1 + Math.random()) * 0x10000)
			    .toString(16)
			    .substring(1);
			}	
			function uid() {
			  return generate() + generate() + '-' + generate() + '-' + generate();
			}
			return uid()
		}
		this.addAttire = function( element, arr){
			for( var i = 0, length = arr.length; i < length; i++){
				element.attr(arr[i].key, arr[i].value);
			}					
			return element;
		}
	}