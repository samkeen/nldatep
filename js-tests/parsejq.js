$(document).ready(function(){

    $('p').each(function(){
    	var children = $(this).children();
        $.each( children, function(){
        	console.debug('TagName:'+this.tagName);
        	var x = this.childNodes.length;
        	var y = $(this).children().length;
        	console.debug('Text "' + $(this).text() + '"') 
        });
    });
});
