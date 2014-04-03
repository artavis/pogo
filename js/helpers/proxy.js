define(["jquery"], function($) {
    
    var _objects = {}
    
    function Proxy() {
	    return _objects;
    }
    
    Proxy.addObject = function(prop,val) {
    	_objects[prop] = val;
    }
    return Proxy;
    
    
});