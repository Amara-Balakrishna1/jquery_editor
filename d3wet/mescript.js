/**
 * Created with JetBrains WebStorm.
 * User: Balakrishna
 * Date: 3/18/15
 * Time: 12:00 PM
 * To change this template use File | Settings | File Templates.
 */

var dialog = {},gv_all={};
$(document).ready(function(){

    dialog.ruleEditor = $('#popup-rule-editor');

    dialog.ruleEditor.dialog({
    autoOpen:false,
    resizable:false,
    width:509
    });
});
$('.my-rule-editor').ruleEditor({
    width: '500px',
    height: '400px'
    });

var svg = d3.select("#modalbody").append("svg")
.attr("class", "svgclass")
.style("background-color", "#bbb")
.attr("width", width + margin.left + margin.right)
.attr("pointer-events", "all")
.append("g")
.call(d3.behavior.zoom().on("zoom", redraw))
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.json("http://beetle.vistex.com:8000/sap/bc/abap/mappingeditor?sap-client=040&datamodel=ZSL1&version=V1&actiity=01", function (error, flare1) {
    gv_all  =  flare = eval("(" + flare1.URL + ")");

    gv_result =gv_chartDataModel = flare;

    for (var j = 0; j < 2; j++) {
    var source = flare.children[j];
    for (var i = 0; i < source.children.length; i++) {

    source.children[i].children = sortedConnectorList(source.children[i].children);
    }
}

for (var i = 0; i < 2; i++) {
    flare.x0 = 0;
    flare.y0 = 0;

    modify(flare.children[i], i);
    }
designtree(root = gv_allNodes);

heights = [];
mappinginfo = flare.children[2];
gv_inputmappings = [];
gv_outputmappings = [];

gv_omappeditemswd = [];
gv_imappeditemswd = [];
drawMappings(mappinginfo, gv_allNodes);

})



//    $('#body').lionbars();

    function redraw() {
//       if(d3.event.scale>1 && d3.event.scale <3){

//           $('#setext2').css('width',barWidth*d3.event.scale)
//           $('#setext1').css('width',barWidth*d3.event.scale)
//           $('.input-class').css('left',(600-barWidth)*d3.event.scale)
//           $('#searchelements').css('width', $('#searchelements').width()*d3.event.scale)
//        svg.attr("transform",
//                "translate(" + margin.left + "," + margin.top + ")"
//                        + " scale(" + d3.event.scale + ")");

//        d3.select("svg").attr("height",d3.event.scale*$('svg').height())
//        d3.select("svg").attr("height",Math.min(d3.event.scale*$('svg').width()))
//
//           if($('svg').width()>2000){
//
//               $('svg').css('width',1000);
//           }
//     }
    }
    function modify(source, position) {


        var lv_position = position;

        // Compute the flattened node list. TODO use d3.layout.hierarchy.
        var nodes = tree.nodes(source);

        var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);
        d3.select("svg").attr("height", height)
        nodes.map(function (record, i) {

            record.x = lv_position * 600;
            record.y = record.y + ((i - record.depth) * barHeight - 1) + 1;

            gv_allNodes.push(record);
            if (i == nodes.length - 1) {
                heights.push(record.y);
            }
        })

        // Compute the "layout".

    }

    var lis = document.getElementById("top4list").getElementsByTagName('li');

    for (var i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', update, false);
    }

    lis = document.getElementById("toplist").getElementsByTagName('li');

    for (var i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', changefill, false);
    }
