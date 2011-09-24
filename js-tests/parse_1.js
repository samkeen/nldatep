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

function traverse_dom_tree(current_element, depth)
{
    if (current_element)
    {
        var jjjjjj;
        target_document += (get_element_name(current_element) + "\n")

        // Traverse the tree
        var i=0;
        var current_element_child=current_element.childNodes[i];
        var tag_name = current_element.tagName
        while (current_element_child)
        {
            // Formatting code (indent the tree so it looks nice on the screen)
            target_document += ("<br />\n");
            for (jjjjjj=0; jjjjjj<depth; jjjjjj++)
            {
                // &#166 is just a vertical line
                target_document += ("&nbsp;&nbsp;&#166");
            }
            target_document += ("<br />\n");
            for (jjjjjj=0; jjjjjj<depth; jjjjjj++)
            {
                target_document += ("&nbsp;&nbsp;&#166");
            }
            if (tag_name)
                target_document += ("--");

            // Recursively traverse the tree structure of the child node
            traverse_dom_tree(current_element_child, depth+1);
            i++;
            current_element_child=current_element.childNodes[i];
        }
        // The remaining code is mostly for formatting the tree
        target_document += ("<br />\n");
        for (jjjjjj=0; jjjjjj<depth-1; jjjjjj++)
        {
            target_document += ("&nbsp;&nbsp;&#166");
        }
        target_document += ("&nbsp;&nbsp;\n");
        if (tag_name)
        {
            target_document += ("&lt;/"+tag_name+"&gt;\n");
        }
    }
}

var target_document = "<code>";
var document_body = document.getElementsByTagName("body");
document_body = document_body.item(0);
traverse_dom_tree(document_body, 1);
document.getElementById("end").innerHTML = target_document + "</code>";