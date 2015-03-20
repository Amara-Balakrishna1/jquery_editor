/**
 * Created with JetBrains WebStorm.
 * User: Balakrishna
 * Date: 12/20/14
 * Time: 12:38 PM
 * To change this template use File | Settings | File Templates.
 */



function search(param1) {

    gv_posid = param1.id;
    var lv_data1 = [], lv_data2 = [];
    var lv_isearcheditem = {};
    var lv_osearcheditem = {};

    var lv_setext1 = document.getElementById('setext1').value.toLowerCase();
    var lv_setext2 = document.getElementById('setext2').value.toLowerCase();
    gv_setext1 = lv_setext1;
    gv_setext2 = lv_setext2;
    gv_allNodes = [];
    str = document.getElementById("selValue").innerHTML;
    a = str.substring(str.lastIndexOf("<b>") + 3, str.lastIndexOf("</b>"));

    flag = false;
    if (a != 'All') {
        update();
    }
    else {
        for (var i = 0; i < 2; i++) {
            gv_chartDataModel.x0 = 0;
            gv_chartDataModel.y0 = 0;

            modify(gv_chartDataModel.children[i], i);
        }
    }
    heights = [];
    gv_isearcheditem = [];
    gv_osearcheditem = [];

    gv_allNodes.filter(function (d, i) {
        if (d.name) {
            b = d.name.toLowerCase();
            if (b.indexOf(lv_setext2) != -1) {
                lv_data2.push(d);
            }
        }
    });
    lv_data2.forEach(function (d) {

        if (d.depth == 2 && d.parent.parent.name == 'INPUT') {
            lv_isearcheditem = {
                nodeID: d.parent.name,
                children: {
                    name: d.name,
                    key: d.key,
                    description: d.description

                }
            }
            gv_isearcheditem.push(lv_isearcheditem);
        }
    });


    gv_allNodes.filter(function (d, i) {

        str1 = document.getElementById("infomodel").innerHTML;
        aa = str1.substring(str1.lastIndexOf("<b>") + 3, str1.lastIndexOf("</b>"));
        if (d.name && aa == 'Name') {
            b = d.name.toLowerCase();
            if (b.indexOf(lv_setext1) != -1) {
                lv_data1.push(d);
            }
        }
        else if (d.description) {
            b = d.description.toLowerCase();
            if (b.indexOf(lv_setext1) != -1) {
                lv_data1.push(d);
            }
        }

    });
    lv_data1.forEach(function (d) {
        if (d.depth == 2 && d.parent.parent.name == 'OUTPUT') {
            lv_osearcheditem = {
                nodeID: d.parent.name,
                children: {
                    name: d.name,
                    key: d.key,
                    description: d.description

                }
            }
            gv_osearcheditem.push(lv_osearcheditem);
        }
    });
    d3.selectAll("svg").remove();
    svg = d3.select('#modalbody').append("svg").attr("class", "svgclass")
        .style("background-color", "#bbb")
        .attr("width", 1300)
        .attr("pointer-events", "all")
        .append("g")
        .call(d3.behavior.zoom().on("zoom", redraw))
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    gv_result = gv_schartDataModel = {
        name: "version1",
        children: [
            {
                name: "OUTPUT",
                children: divitems(gv_osearcheditem)
            },
            {
                name: "INPUT",
                children: divitems(gv_isearcheditem)
            }
        ]
    };

    gv_allNodes = [];
    for (var i = 0; i < 2; i++) {
        gv_schartDataModel.x0 = 0;
        gv_schartDataModel.y0 = 0;

        modify(gv_schartDataModel.children[i], i);
    }

    designtree(gv_allNodes);
    gv_result.children.push(gv_chartDataModel.children[2])
    gv_schartDataModel.children.push(gv_chartDataModel.children[2])
    maps = gv_chartDataModel.children[2];
    source = gv_allNodes;


    drawMappings(maps, source)


    if (lv_setext1 == '' && lv_setext2 == '') {
        flag = true;
        update();
    }

    flag = true;

}