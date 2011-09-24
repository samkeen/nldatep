$(document).ready(function(){
    
    date_parser = new NLDP();
        
    date_matches = {};
    
    $('p').each(function(para_index){
        date_matches['para_'+para_index] = (date_parser.get_matched($(this).text()));
    });l4,
    console.debug(date_matches);
    
});

/**
 * Main parsing Object at this point.  Still tinkering so this will change
 * quite a bit.
 * 
 * At this point there is no 'NLP' in this parser.  Just figuring out the 
 * strategy and problem domain using a VERY simple regex first.
 */
function NLDP() {
    
    this.date_pattern = /\d{4}/mg;
    
    /**
     * 
     * @return array Array of NldpMatch objects (empty array if now match found)
     */
    this.get_matched = function(doc_element)
    {
        matches = [];
        match = null;
        while(match = this.date_pattern.exec(doc_element))
        {
            matches.push(new NldpMatch(match[0], (this.date_pattern.lastIndex - 1)));
        }
        return matches;
    }
    
}

function NldpMatch(match, index_last_char) {
    
    this.text = match;
    
    this.match_length = this.text.length;
    
    this.index_last_char = index_last_char;
    
    this.index_first_char = (this.index_last_char - this.match_length) +1;
 
}


/**
 * 
 * @src http://snippets.dzone.com/posts/show/4349
 * 
 * this xpath would be used if we start matching with context of the HTML
 * 
 * var children = $(this).children();
        $.each( children, function(){
            if(date_parser.is_date($(this).text()))
            {
                $(this).attr('style', 'color:red;');     
            }
            console.debug('TagName:' + this.tagName);
            console.debug('Xpath:' + NldpUtil.get_xpath(this));
            var x = this.childNodes.length;
            var y = $(this).children().length;
            console.debug('Text "' + $(this).text() + '"') 
        });
 * 
 * 
 */

var NldpUtil = {
    
    get_xpath: function(element)
    {
        var path = '';
        for (; element && element.nodeType==1; element=element.parentNode)
        {
            var idx=$(element.parentNode).children(element.tagName).index(element)+1;
            idx>1 ? (idx='['+idx+']') : (idx='');
            path='/'+element.tagName.toLowerCase()+idx+path;
        }
        return path;
    }
}
