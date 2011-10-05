
function NldpMatch(match, index_last_char, xpath) {
    
    this.text = match;
    
    this.xpath = xpath;
    
    this.match_length = this.text.length;
    
    this.index_last_char = index_last_char;
    
    this.index_first_char = (this.index_last_char - this.match_length) +1;
 
}

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
    },
    log: function(message)
    {
        NLDP_LOGGING? console.debug(message):null;
    }
}

var NLDP_LOGGING = true;

$(document).contents ().each (function processNodes ()
{
    if (this.nodeType == 3)
    {
        NldpUtil.log(this);
    }
    else
    {
        NldpUtil.log("<"+this.nodeName+">");
        NldpUtil.log("xpath:"+NldpUtil.get_xpath(this));
        $(this).contents ().each (processNodes);
        NldpUtil.log("</"+this.nodeName+">");
    }
});
