/**
 * Created with JetBrains WebStorm.
 * User: Balakrishna
 * Date: 3/18/15
 * Time: 11:37 AM
 * To change this template use File | Settings | File Templates.
 */
var previd = '',flag = true;
var gv_nchartDataModel = {};
var gv_inputmappings = [], gv_rules = [],gv_rulenames=[];
var gv_outputmappings = [];
var gv_chartDataModel = {};
var mappedConOut = {};
var mappedConIn = {};
var unmappedConOut = {};
var unmappedConIn = {};
var heights = [], savedRange, isInFocus;
var prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0;
var mappinginfo = {},
    gv_html = '<div id="searchelements" style="width: 1024px;margin-left: 80px;background-color: red "><div  class="search-filter" style="background-color:#ffffff ;position:relative;height: 30px ;">  <input onkeyup=search(this) id="setext1" style="height:27px;width:367.7px;" type="text" ><img style=" top:33px;position: absolute;float: right ;right: 5px;" id="my1I" src="d3wet/images/search.jpg" > </div><div class="search-filter input-class" style="background-color:#ffffff ;position:relative;height: 30px ;">  <input   onkeyup=search(this) id="setext2" style="height:27px;width:367.7px;" type="text" >   <img  style="position: absolute;right:2px;float:right;top: 32px;" id="my1I" src="d3wet/images/search.jpg" > </div></div>'
    , gv_result = {},
    gv_omappeditems = [],
    gv_omappeditemswd = [],
    gv_imappeditems = [],
    gv_imappeditemswd = [],
    gv_posid = '',
    gv_osearcheditem = [], gv_isearcheditem = [], gv_setext1 = '', gv_setext2 = '';
var margin = {top: 57, right: 20, bottom: 30, left: 80},
    width = 1324 - margin.left - margin.right,
    barHeight = 28,
    barWidth = width * .3;
var i = 0,
    duration = 40,
    root;
var gv_allNodes = [];
var tree = d3.layout.tree()
    .nodeSize([0, 30]);
var diagonal = d3.svg.diagonal()
    .projection(function (d) {
        return [d.x, d.y];
    });
var gv_contextData=[];
gv_parsedstring = '';