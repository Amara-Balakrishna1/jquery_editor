/**
 * Created with JetBrains WebStorm.
 * User: Balakrishna
 * Date: 12/20/14
 * Time: 12:39 PM
 * To change this template use File | Settings | File Templates.
 */



function update() {
    //    d3.select("svg").attr("opacity","1") for hide
    heights = [];

    if (flag) {
        gv_setext1 = '';
        gv_setext2 = '';
    }
    if (typeof(this.innerHTML) != 'undefined') {

        a = this.innerHTML;
    }
    else {
        str = document.getElementById("selValue").innerHTML;
        a = str.substring(str.lastIndexOf("<b>") + 3, str.lastIndexOf("</b>"));
    }
    document.getElementById("selValue").innerHTML = '<b>' + a + '</b>' + '<span class="caret"></span>';
    d3.selectAll("svg").remove();
    mapConOut = []
    mapConIn = []
    gv_allNodes = [];
    if (a == "Mapped Items") {
        svg = d3.select('#modalbody').append("svg").attr("class", "svgclass")
            .style("background-color", "#bbb")
            .attr("width", 1300)
            .attr("pointer-events", "all")
            .append("g")
            .call(d3.behavior.zoom().on("zoom", redraw))
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        gv_omappeditems = gv_omappeditemswd;
        gv_imappeditems = gv_imappeditemswd;

        gv_result = gv_nchartDataModel = {
            name: "version1",
            children: [
                {
                    name: "OUTPUT",
                    children: divitems(gv_omappeditems)
                },
                {
                    name: "INPUT",
                    children: divitems(gv_imappeditems)
                } ,
                {
                    name: 'MAPPINGINFO',
                    children: [
                        {
                            "name": "OUTPUT",
                            "children": gv_outputmappings

                        },
                        {
                            "name": "INPUT",
                            "children": gv_inputmappings
                        }
                    ] }
            ]
        };
        gv_allNodes = [];
        for (var i = 0; i < 2; i++) {
            gv_nchartDataModel.x0 = 0;
            gv_nchartDataModel.y0 = 0;
            if (!(gv_setext1 || gv_setext2)) {
                gv_inputmappings = [];
                gv_outputmappings = [];
            }
            modify(gv_nchartDataModel.children[i], i);
        }

        designtree(gv_allNodes);
        mappinginfo = gv_nchartDataModel.children[2];
//        if( !(gv_setext1 ||  gv_setext2)){
//        gv_inputmappings=[];
//        gv_outputmappings=[];
//            gv_omappeditemswd=[];
//            gv_imappeditemswd=[];
//        }

        drawMappings(mappinginfo, gv_allNodes);

//        for (var i = 0; i < document.getElementsByTagName('path').length; i++) {
//
//            if (document.getElementsByTagName('path')[i].getAttribute("info")) {
//                lv_pathinfo = document.getElementsByTagName('path')[i].getAttribute("info");
//                gv_rules.forEach(function (rule) {
//                    if (rule.indexOf(lv_pathinfo) != -1) {
//                        document.getElementsByTagName('path')[i].setAttribute("info", rule)
//
//                    }
//
//                })
//            }
//        }
    }
    else if (a == "Unmapped") {
        svg = d3.select('#modalbody').append("svg").attr("class", "svgclass")
            .style("background-color", "#bbb")
            .attr("width", 1300)
            .attr("pointer-events", "all")
            .append("g")
            .call(d3.behavior.zoom().on("zoom", redraw))
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        gv_nchartDataModel = {};
        gv_omappeditems = gv_omappeditemswd;
        gv_imappeditems = gv_imappeditemswd;

        mapConOut = divitems(gv_omappeditems);
        mapConIn = divitems(gv_imappeditems);
        if (!gv_chartDataModel.children[0]._children) {
            unmappedConOut = getUnmappedItems(gv_chartDataModel.children[0].children, mapConOut);
            unmappedConIn = getUnmappedItems(gv_chartDataModel.children[1].children, mapConIn);
        }
        else {
            unmappedConOut = getUnmappedItems(gv_chartDataModel.children[0]._children, mapConOut);
            unmappedConIn = getUnmappedItems(gv_chartDataModel.children[1]._children, mapConIn);

        }
        gv_result = gv_nchartDataModel = {
            name: "version1",
            children: [
                {
                    name: "OUTPUT",
                    children: unmappedConOut
                },
                {
                    name: "INPUT",
                    children: unmappedConIn
                } ,
                {
                    name: 'MAPPINGINFO',
                    children: [
                        {
                            "name": "OUTPUT",
                            "children": []

                        },
                        {
                            "name": "INPUT",
                            "children": []
                        }
                    ] }
            ]
        };
        gv_allNodes = [];
        for (var i = 0; i < 2; i++) {
            gv_nchartDataModel.x0 = 0;
            gv_nchartDataModel.y0 = 0;

            modify(gv_nchartDataModel.children[i], i);
        }

        designtree(gv_allNodes);

    }
    else if (a == 'All') {
        svg = d3.select('#modalbody').append("svg").attr("class", "svgclass")
            .style("background-color", "#bbb")
            .attr("width", 1300)
            .attr("pointer-events", "all")
            .append("g")
            .call(d3.behavior.zoom().on("zoom", redraw))
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        d3.json("http://beetle.vistex.com:8000/sap/bc/abap/mappingeditor?sap-client=040&datamodel=ZSL1&version=V1&actiity=01", function (error, flare1) {
            flare = eval("(" + flare1.URL + ")");
            gv_chartDataModel = flare;
            for (var j = 0; j < 2; j++) {
                var source = flare.children[j];
                for (var i = 0; i < source.children.length; i++) {

                    source.children[i].children = sortedConnectorList(source.children[i].children);
                }
            }
            gv_result = gv_chartDataModel;
            gv_allNodes = [];
            for (var i = 0; i < 2; i++) {
                gv_chartDataModel.x0 = 0;
                gv_chartDataModel.y0 = 0;

                modify(gv_chartDataModel.children[i], i);
            }

            designtree(gv_allNodes);

            gv_chartDataModel.children[2].children[0].children = [];
            gv_chartDataModel.children[2].children[0].children = gv_outputmappings;
            gv_chartDataModel.children[2].children[1].children = [];
            gv_chartDataModel.children[2].children[1].children = gv_inputmappings;

            mappinginfo = gv_chartDataModel.children[2];

            gv_inputmappings = [];
            gv_outputmappings = [];

            gv_omappeditemswd = [];
            gv_imappeditemswd = [];

            drawMappings(mappinginfo, gv_allNodes);
//            for (var i = 0; i < document.getElementsByTagName('path').length; i++) {
//
//                if (document.getElementsByTagName('path')[i].getAttribute("info")) {
//                    lv_pathinfo = document.getElementsByTagName('path')[i].getAttribute("info");
//                    gv_rules.forEach(function (rule) {
//                        if (rule.indexOf(lv_pathinfo) != -1) {
//                            document.getElementsByTagName('path')[i].setAttribute("info", rule)
//
//                        }
//
//                    })
//                }
//            }
        });


    }
}