
function NldpMatch(match, index_last_char, container_xpath, prev_sibling_xpath) {
    
    this.text = match;
    this.container_xpath = container_xpath;
    this.match_length = this.text.length;
    this.index_last_char = index_last_char;
    this.index_first_char = (this.index_last_char - this.match_length) +1;
    this.prev_sibling_xpath = prev_sibling_xpath;
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
        while(match = this.date_pattern.exec(doc_element.textContent))
        {
            var prev_sibling = doc_element.previousSibling;
            matches.push(
                new NldpMatch(
                    match[0],
                    (this.date_pattern.lastIndex - 1),
                    NldpUtil.get_xpath(doc_element.parentNode),
                    NldpUtil.get_xpath(prev_sibling)
                )
            );
        }
        return matches;
    }
}

var NldpUtil = {
    
    get_xpath: function(element)
    {
        var path = "";
        for (; element && element.nodeType==1; element=element.parentNode)
        {
            var idx=$(element.parentNode).children(element.tagName).index(element)+1;
            idx>1 ? (idx='['+idx+']') : (idx='');
            path='/'+element.tagName.toLowerCase()+idx+path;
        }
        return path==""?null:path;
    },
    log: function(message)
    {
        NLDP_LOGGING? console.debug(message):null;
    },
    highlight: function(matches)
    {
        $.each(matches, function(index, value) { 
            var result = document.evaluate(
                value.xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
            );
            // only expect one element
            var the_element = result.snapshotItem(0);
            /*
             * wrap the date matches in span tags with class for highligh use
             */
            NldpUtil.log(the_element);
            var a = $(the_element).text();
            NldpUtil.log(a);
        });
    },
    lsiblings: function(element)
    {
        lsiblings = [];
        while(sib = element.previousSibling)
        {
            lsiblings.push(sib);
        }
        return lsiblings;
    }
}

var NLDP_LOGGING = true;
var document_body = document.getElementsByTagName("body");
document_body = document_body.item(0);

var date_parser = new NLDP();

var match_sets = [];

$(document_body).contents ().each (function processNodes ()
{
    if (this.nodeType == 3)
    {
        var matched = date_parser.get_matched(this);
        if(matched.length>0)
        {
            match_sets.push(matched);
        } 
    }
    else
    {
//        NldpUtil.log("<"+this.nodeName+">");
        $(this).contents ().each (processNodes);
//        NldpUtil.log("</"+this.nodeName+">");
    }
});

NldpUtil.log(match_sets);
$.each(match_sets, function(index, value) { 
  NldpUtil.highlight(value);
});