define(function() {
    //Polyfill for requestAnimationFrame. Falls back to setTimeout if none available.
    return  window.requestAnimationFrame     ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.msRequestAnimationFrame    ||
          window.oRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(function(){
	            callback(+new Date);
            }, 1000 / 60);
          };
});