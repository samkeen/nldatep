function get_element_name(currentElement)
{
    var element_name = "[unknown tag]";
    if(currentElement.nodeName=='#text')
    {
        element_name = ("Text: "+currentElement.nodeValue);
    }
    else
    {
        // Prints the node tagName, such as <A>, <IMG>, etc
        if (currentElement.tagName)
        {
            element_name = ("&lt;"+currentElement.tagName+"&gt;");
        }
    }
    return element_name;
}
/**
 * Formatting code. This tree is drawn in 2 line segments
 * 
 * i.e.
 * 
 *   ¦  ¦  ¦        <--- line (A)
 *   ¦  ¦  ¦--      <--- line (B)
 *   
 */
function draw_next_tree_section(current_depth, tag_name)
{
    NldpUtil.log("draw_OPEN:"+tag_name);
    var counter;
    var next_tree_section = '';
    /*
     * Draw line (A)
     */
    next_tree_section += ("<br />\n");
    for (counter=0; counter < current_depth; counter++)
    {
        // &#166 is just a vertical line
        next_tree_section += ("&nbsp;&nbsp;&#166");
    }
    /*
     * Draw line (B)
     */
    next_tree_section += ("<br />\n");
    for (counter=0; counter < current_depth; counter++)
    {
        next_tree_section += ("&nbsp;&nbsp;&#166");
    }
    /*
     * If there ia a Tag, draw a little branch to connect to it
     */
    if (tag_name)
    {
        next_tree_section += ("--");
    }
    return next_tree_section;
}
/**
 * Formatting code. This tree is drawn in 2 line segments
 * 
 * i.e.
 * 
 *  ¦  ¦--<A>
 *  ¦  ¦  ¦
 *  ¦  ¦  ¦--Text: Martin Van Buren
 *  ¦  ¦  ¦  
 *  ¦  ¦   </A>  <---- drawing this line
 *   
 */
function draw_closing_tag_tree_section(current_depth, tag_name)
{
    NldpUtil.log("draw_CLOSE:"+tag_name);
    var closing_tag_tree_section = '';
    closing_tag_tree_section += ("<br />\n");
    for (depth_counter=0; depth_counter < current_depth-1; depth_counter++)
    {
        closing_tag_tree_section += ("&nbsp;&nbsp;&#166");
    }
    closing_tag_tree_section += ("&nbsp;&nbsp;\n");
    if (tag_name)
    {
        closing_tag_tree_section += ("&lt;/"+tag_name+"&gt;\n");
    }
    return closing_tag_tree_section;
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

function traverse_dom_tree(current_element, current_depth)
{
    NldpUtil.log("traverse_dom_tree:"+current_element.tagName);
    if (current_element)
    {
        parsed_document += (
            get_element_name(current_element) 
            + " [" + NldpUtil.get_xpath(current_element) + "]\n"    
            + "\n"
        );

        // Traverse the tree
        var child_node_index=0;
        var current_element_child = current_element.childNodes[child_node_index];
        var tag_name = current_element.tagName
        while (current_element_child)
        {
            parsed_document += draw_next_tree_section(current_depth, tag_name);
            traverse_dom_tree(current_element_child, current_depth+1);
            child_node_index++;
            current_element_child=current_element.childNodes[child_node_index];
        }
        parsed_document += draw_closing_tag_tree_section(current_depth, tag_name);
    }
}

var NLDP_LOGGING = false;

var parsed_document = "<code>";
var document_body = document.getElementsByTagName("body");
document_body = document_body.item(0);
traverse_dom_tree(document_body, 1);
document.getElementById("end").innerHTML = parsed_document + "</code>";