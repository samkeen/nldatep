
var tl;
function onLoad() {
    var eventSource = new Timeline.DefaultEventSource(0);
    
    /*
     *
     */
    var theme = Timeline.ClassicTheme.create();
    theme.event.bubble.width = 320;
    theme.event.bubble.height = 220;
    theme.ether.backgroundColors[1] = theme.ether.backgroundColors[0];
    
    
    var start_view_at_date = Timeline.DateTime.parseGregorianDateTime("1920")
    var bandInfos = [
    Timeline.createBandInfo({
        width:          "15%", 
        intervalUnit:   Timeline.DateTime.DECADE, 
        intervalPixels: 200,
        date:           start_view_at_date,
        showEventText:  false,
        theme:          theme
    }),
    Timeline.createBandInfo({
        width:          "85%", 
        intervalUnit:   Timeline.DateTime.DECADE, 
        intervalPixels: 200,
        eventSource:    eventSource,
        date:           start_view_at_date,
        theme:          theme
    })
    ];
    
    /*
     * start a +/- timeline counter from the given point.
     * 
     * i.e.
     * -15    -10    -5    0    5    10    15
     *                    1925
     */
    bandInfos[0].etherPainter = new Timeline.YearCountEtherPainter({
        startDate:  "Jan 01 1925 00:00:00 GMT",
        multiple:   5,
        theme:      theme
    });
    
    /*
     * To make the two bands scroll in synchrony, and then to make the bottom 
     * band highlights the visible time span of the top band
     */
    bandInfos[0].syncWith = 1;
    bandInfos[0].highlight = true;
    
    /*
     * creates a labled band
     * i.e.
     * (birth)----------------------(death)
     * 1840                            1926
     */
//    bandInfos[0].decorators = [
//    new Timeline.SpanHighlightDecorator({
//        startDate:  "Nov 14 1840 00:00:00 GMT",
//        endDate:    "Dec 05 1926 00:00:00 GMT",
//        startLabel: "birth",
//        endLabel:   "death",
//        color:      "#FFC080",
//        opacity:    50,
//        theme:      theme
//    })
//    ];
            
    tl = Timeline.create(document.getElementById("my-timeline"), bandInfos, Timeline.HORIZONTAL);
    /*
     * load an XML src file
     */
//    tl.loadXML("monet.xml", function(xml, url) {
//        eventSource.loadXML(xml, url);
//    });
    /*
     * load a JSON src file 
     */
    tl.loadJSON("timeline-src.js?"+ (new Date().getTime()), function(json, url) {
        eventSource.loadJSON(json, url);
    });
}
var resizeTimerID = null;
function onResize() {
    if (resizeTimerID == null) {
        resizeTimerID = window.setTimeout(function() {
            resizeTimerID = null;
            tl.layout();
        }, 500);
    }
}