/**
 * Created with JetBrains WebStorm.
 * User: Balakrishna
 * Date: 12/9/14
 * Time: 4:58 PM
 * To change this template use File | Settings | File Templates.
 */
function designtree(source) {

    svg.selectAll("*").remove();
    $("foreignObject").remove();
    $("#editor").remove();
    svg.append("rect").attr('x', -1).attr('y', 0).attr("width", barWidth).attr("height", heights[0] + barHeight + 1).attr("stroke", "gray").attr("stroke-width", 2).style("fill", "#dddd").style("opacity", 0.2)
    svg.append("rect").attr('x', 600).attr('y', 0).attr("width", barWidth+1).attr("height", heights[1] + barHeight + 1).attr("stroke", "gray").attr("stroke-width", 2).style("fill", "#dddd").style("opacity", 0.2)

//    svg.append('svg').attr('x',400).attr('y',0).attr('id','svg1')
//        .attr("height",500)
//        .attr("width", barWidth)
//        .style("fill", 'red')
//        .append("text")
//        .attr("dy", 18.5)
//        .attr("dx",  10)
//        .text('sdfadsfadsf');


    d3.select("svg").append("foreignObject")
        .append("xhtml:div").attr("id", "foo")
        .html(gv_html);


    if (document.getElementById("setext1")) {
        document.getElementById("setext1").value = gv_setext1;
        document.getElementById("setext2").value = gv_setext2;
    }
    restoreSelection();

    var height = Math.max(window.innerHeight, Math.max(heights[0], heights[1]) + 100);
//     d3.select("svg").transition()
//        .duration(duration)
//        .attr("height", height);

    d3.select("svg").attr("height", height);
//        .call(d3.behavior.zoom().on("zoom", redraw));

    d3.select(self.frameElement).transition()
        .duration(duration)
        .style("height", height + "px");


    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(source);

    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .style("opacity", 1);

    // Enter any new nodesarea at the parent's previous position.
//    nodeEnter.append("input")
//        .attr("type", 'text')
//        .attr("height", barHeight)
//        .attr("width", barWidth);
    nodeEnter.append("rect")
        .attr("height", function (d) {
            if (d.children || d._children) {
                return barHeight;
            }
            else {
                return barHeight + 1;
            }
        })
        .attr("width", barWidth)
        .style("fill", color)
        .on("mouseup", mouseup)
        .on("mouseover", function (d) {
            if (d.description) {
                var data = "<b>Name</b> :" + d.name + '<br/>';

                data += "<b>Description</b>:" + d.description;
                var popup = '<div class="flowPopUp" >' + data + '</div>';

                $(popup).appendTo('body');
                $('div.flowPopUp').css({top: event.y, left: event.x});
            }
            var noconnections = 'path[id="' + d.name + "," + d.y + "," + d.x + '"]';
//               var cnoconnections = 'circle[connectorId="'+connector.data.name+node.data.id+'"]';


            if (jQuery.find(noconnections).length !== 0) {
                for (var i = 0; i < jQuery.find(noconnections).length; i++) {

                    jQuery.find(noconnections)[i].style.stroke = 'green';
//                       jQuery.find(cnoconnections)[i].style.stroke = 'green' ;

                }
            }
        })
        .on("mouseout", function () {
            $('div.flowPopUp').remove();
            for (var i = 0; i < $('path').length; i++) {

                if ($('path')[i].style.stroke != "rgb(255, 0, 0)") {
                    $('path')[i].style.stroke = '#245580';
                }
            }
        })
        .on("click", click)
        .on("mousedown", mousedown);

    nodeEnter.append("text")
        .attr("dy", 18.5)
        .attr("dx", function (d) {
            return d.depth * 20 + 15.5;
        })
        .style("stroke", textcolor)
        .style("font-size", fontsize)
        .text(function (d) {
            if (document.getElementById("infomodel").innerHTML.substring(3, 7) == 'Name') {
                return  d.name;
            }
            else {
                if (d.description) {
                    return (d.description).substring(0, 40);
                }
                else {
                    return d.name;
                }
            }
        })
        .attr("description", function (d) {
            return d.description;
        })
        .attr("name", function (d) {
            return d.name;
        });

//    nodeEnter.append("circle")
//        .attr("cy", 14.5)
//        .attr("cx", function (d) {
//            return d.depth * 20;
//        })
//        .style("fill", 'black')
//        .attr('r', function (d) {
//            if (!d.children && !d._children) {
//                return 2;
//            }
//        });


    nodeEnter.append("svg:image")
        .attr("y", 0)
        .attr("x", 25)
        .attr('id',function(d){
            if (d.depth == 2 && d.parent.parent.name == 'INPUT') {

                return d.name+"-"+d.parent.name;
            }
        })
        .attr('width', 25)
        .attr('height', 30).on("click", function(d){
               $(svg).addClass()
            if (d.depth == 2 && d.parent.parent.name == 'INPUT') {

                gv_contextData=[];
            var arr=[],idstype='', obj1={
                name: d.parent.name,description: d.parent.name+"-"+ d.parent.parent.name,
                children:[{name: d.name,description: d.description,type: d.type}]
            };

            gv_contextData.push(obj1)  ;
            a=this.id.split("-")  ;
            gv_inputmappings.forEach(function(d,i){
                if(d.name == a[0]&&d.section==a[1]){
               arr.push(gv_outputmappings[i])
            }}) ;
           arr = contexting(arr);
             for(var i=0;i<arr.length;i++){
                 gv_contextData.push(arr[i]);
             }

             if(this.id.length && arr.length)  {
            var data = $(this).data('rule');
            var dataHtml = $(this).data('ruleHtml');
            if(gv_rules.length !==0 && gv_rulenames.indexOf(this.id) !=-1){

                   data = gv_rules[gv_rulenames.indexOf(this.id)].children[0].rule;
                  dataHtml = gv_rules[gv_rulenames.indexOf(this.id)].children[1].ruleHtml;
            }

            if(dataHtml &&  dataHtml !== ''){
                $('.my-rule-editor').ruleEditor('setData',dataHtml);

            }else{
                $('.my-rule-editor').ruleEditor('setData','');
            }

            $(".ui-dialog-titlebar").hide();
            dialog.ruleEditor.dialog({draggable: false}).parent().draggable();

            $('.bs-editor-header').text('Rule for source mapped towards -->'+this.id)

             }

            dialog.ruleEditor.dialog("open").attr('source-id',this.id);
//                for ids
                for(var i=0;i<gv_contextData.length;i++){
                    for(var j=0;j<gv_contextData[i].children.length;j++){
                        idstype+=gv_contextData[i].children[j].type+'-';
                    }
                }


            dialog.ruleEditor.dialog("open").attr('source-type', idstype.slice(0,idstype.length-1));


            } })
        .attr("xlink:href", function (d) {
            if (d.depth == 2 && d.parent.parent.name == 'INPUT') {
                if(gv_rules.length !==0 && gv_rulenames.indexOf(this.id) !=-1){
                return "d3wet/images/withcondition.png";
                }
                else{
                    return "d3wet/images/nocondition.png";
                }
            }

        });

//        .on("mouseout",flownone);


    nodeEnter.append("svg:image")
        .attr("y", 5)
        .attr("x", function (d) {
            return d.depth * 20;
        })
        .attr('width', 20)
        .attr('height', 20).on("click", click)
        .attr("xlink:href", function (d) {
            if (d._children) {
                return "d3wet/images/right.png";
            }
            if (d.children) {
                return "d3wet/images/collapsed-down.png";
            }
        });

    // Transition nodes to their new position.
    nodeEnter.transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .style("opacity", 1);

    node.transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .style("opacity", 1)
        .select("rect")
        .style("fill", color);

    // Transition exiting nodes to the parent's new position.
    node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .style("opacity", 1e-6)
        .remove();

//    h = d3.select("svg")[0][0].width.animVal.value <  $('.modal-body').width() ?
//         $('.modal-body').width() - 20 :
//        d3.select("svg")[0][0].width.animVal.value * 1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width()) + 'px';
//    $('#myModal').css('width', h);
//    $('#toolbar').css('width', h);
    $('#setext2').css('width', barWidth * 1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width()))
    $('#setext1').css('width', barWidth * 1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width()))
    $('.input-class').css('left', 232 * (1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width())))
//    $('#searchelements').css('width', Math.round(1024 * 1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width())))
////    console.log(d3.select("svg")[0][0].width.animVal.value/ $('.modal-body').width())
////    str = document.getElementById("selValue").innerHTML;
//
    a = document.getElementById('selValue').innerText;
    if (a != "Mapped Items") {
        $('svg').css('height', Math.max(800,Math.max(heights[0], heights[1]) + 300) * 1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width()))
    }
    svg.attr("transform",
        "translate(" + margin.left + "," + margin.top + ")"
            + " scale(" + 1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width()) + ")");
}
//
window.onresize = function () {

//    h = d3.select("svg")[0][0].width.animVal.value <  $('.modal-body').width()) ?  $('.modal-body').width()) - 20 : d3.select("svg")[0][0].width.animVal.value * 1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width())) + 'px';
//    $('body').css('width', h);
//    $('toolbar').css('width', h);
    $('#setext2').css('width', barWidth * 1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width()))
    $('#setext1').css('width', barWidth * 1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width()))
    $('.input-class').css('left', 232 * (1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width())))
//    $('#searchelements').css('width', Math.round(1024 * 1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width()))))
    a = document.getElementById('selValue').innerText
    if (a != "Mapped Items") {
        $('svg').css('height', (Math.max(window.innerHeight,heights[0], heights[1]) + 300) * 1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width()))
    }
    svg.attr("transform",
        "translate(" + margin.left + "," + margin.top + ")"
            + " scale(" + 1 / (d3.select("svg")[0][0].width.animVal.value /  $('.modal-body').width()) + ")");
}

//function alert1(){
//    alert('');
//}
// Toggle children on click.

function click(d) {

    if (d.depth != 2) {
        gv_allNodes = [];
        heights = [];
        if (d.children) {
            d._children = d.children;
            if (typeof(d.parent) != 'undefined') {
                d._pname = d.parent.name
            }
            d.children = null;
        } else if (d._children) {
            d.children = d._children;
            d._children = null;
        }


        for (var i = 0; i < 2; i++) {
            gv_result.x0 = 0;
            gv_result.y0 = 0;

            modify(gv_result.children[i], i);
        }
        designtree(gv_allNodes);
        mappinginfo = gv_result.children[2];
//    gv_inputmappings=[];
//    gv_outputmappings=[];
//
//    gv_omappeditemswd=[];
//    gv_imappeditemswd=[];
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
//    else {
//
//        if (gv_setext1 == '' && gv_setext2 == '') {
//            var lv_string = '', paramarray = [], num = 0;
//
//
//            $('#editor').empty();
//
//            gv_outputmappings.forEach(function (f, i) {
//                if (f.name == d.name && f.section == d.parent.name) {
//                    num++;
////        lv_String =f.name+"=>"+ f.section+"->"+ gv_inputmappings[i].name+"=>"+ gv_inputmappings[i].section;
//
//                    lv_String = document.getElementsByTagName('path')[i].getAttribute("info");
//                    param1 = gv_inputmappings[i].name + f.name;
//                    param2 = '#' + gv_inputmappings[i].name + f.name;
//                    param3 = 'Association Info' + num;
//                    param4 = 'Anchorid' + num;
//                    paramarray.push(param1)
//                    content1 = '<a href="' + param2 + '" class="list-group-item list-group-item-default" data-toggle="collapse" data-parent="#MainMenu">' + param3 + '</a>'
//                    content2 = '<div  title="' + param3 + '" class="collapse" id="' + param1 + '">';
//
//                    if (lv_String.indexOf("---->Rule:") == -1) {
//                        content3 = '<p   id=' + 'p' + param1 + ' mapinfo=' + i + '>' + lv_String + "---->Rule:" + '</p></div>';
//                    } else {
//                        content3 = '<p   id=' + 'p' + param1 + ' mapinfo=' + i + '>' + lv_String + '</p></div>';
//                    }
////        content3='<textarea placeholder="'+ lv_String +'"></textarea></div>';
//
//                    lv_string += content1 + content2 + content3;
//
//                }
////        demo3 "#demo3"    Item3     href->id=#demo3
//            })
//
//            $('#editor').append('Source info<br><div class="list-group panel">' + lv_string + '</div>');
//
//
//            paramarray.forEach(function (d) {
//                document.getElementById(d).addEventListener('click', function () {
//                    id = '#' + d;
//                    $(id).dialog({
//                        buttons: {
//                            Ok: function () {
//                                var a = '', b = '';
//                                a = '#p' + this.id;
////                        b='#textarea'+this.title.slice(16,this.title.length);
////                        b=$(b).val();
//                                b = gv_parsedstring;
//                                $(a).empty()
//                                $(a).append(b);
//                                document.getElementsByTagName('path')[$(a).attr("mapinfo")].setAttribute("info", b)
//
////                        c = b.substring(0, b.lastIndexOf('---->'))
//
//                                if (gv_rules.length == 0) {
//                                    gv_rules.push(b);
//                                } else {
//                                    gv_rules.forEach(function (rule, i) {
//                                        if (1) {
////                            if(rule.indexOf(c) == -1){
//                                            gv_rules.push(b)
//
//                                        }
//                                        else {
//                                            gv_rules[i] = b;
//                                        }
//
//                                    });
//                                }
//                                options = {};
//                                lv_k = "#dialog" + this.attributes.id.value;
//                                $(lv_k).hide('clip', options, 1000, callback);
////                        $( this ).dialog( "close" );
//
//
////                        lv_k = 'div[id="'+this.attributes.id.value+']'
//                            }
//                        }
//                    });
//
//
//                })
//
//            })
//        }
//        else {
//            var lv_string = '', paramarray = [], num = 0;
//
//
//            $('#editor').empty();
//
//            gv_outputmappings.forEach(function (f, i) {
//                if (f.name == d.name && f.section == d.parent.name) {
//                    num++;
//                    lv_String = f.name + "=>" + f.section + "=>" + gv_inputmappings[i].name + "=>" + gv_inputmappings[i].section;
//
//                    for (var i = 0; i < $('path').length; i++) {
//                        if ($('path')[i].getAttribute("info").indexOf(lv_String) != -1) {
//                            lv_String = document.getElementsByTagName('path')[i].getAttribute("info");
//                        }
//                    }
//                    param1 = gv_inputmappings[i].name + f.name;
//                    param2 = '#' + gv_inputmappings[i].name + f.name;
//                    param3 = 'Association Info' + num;
//                    param4 = 'Anchorid' + num;
//                    paramarray.push(param1)
//                    content1 = '<a href="' + param2 + '" class="list-group-item list-group-item-default" data-toggle="collapse" data-parent="#MainMenu">' + param3 + '</a>'
//                    content2 = '<div  title="' + param3 + '" class="collapse" id="' + param1 + '">';
//
//                    if (lv_String.indexOf("---->Rule:") == -1) {
//                        content3 = '<p   id=' + 'p' + param1 + ' mapinfo=' + i + '>' + lv_String + "---->Rule:" + '</p></div>';
//                    } else {
//                        content3 = '<p   id=' + 'p' + param1 + ' mapinfo=' + i + '>' + lv_String + '</p></div>';
//                    }
////        content3='<textarea placeholder="'+ lv_String +'"></textarea></div>';
//
//                    lv_string += content1 + content2 + content3;
//
//                }
////        demo3 "#demo3"    Item3     href->id=#demo3
//            })
//
//            $('#editor').append('Source info<br><div class="list-group panel">' + lv_string + '</div>');
//
//
//            paramarray.forEach(function (d) {
//                document.getElementById(d).addEventListener('click', function () {
//                    id = '#' + d;
//                    $(id).dialog({
//                        modal: true,
//                        buttons: {
//                            Ok: function () {
//                                var a = '', b = '';
//                                a = '#p' + this.id;
//                                b = '#textarea' + this.title.slice(16, this.title.length);
//                                b = $(b).val();
//                                $(a).empty()
//                                $(a).append(b);
//                                for (var i = 0; i < $('path').length; i++) {
//                                    if ($('path')[i].getAttribute("info").indexOf(lv_String) != -1) {
//                                        document.getElementsByTagName('path')[i].setAttribute("info", b)
//
//                                    }
//                                }
//
//                                c = b.substring(0, b.lastIndexOf('---->'))
//
//                                if (gv_rules.length == 0) {
//                                    gv_rules.push(b);
//                                }
//                                else {
//                                    gv_rules.forEach(function (rule, i) {
//                                        if (rule.indexOf(c) == -1) {
//                                            gv_rules.push(b)
//
//                                        }
//                                        else {
//                                            gv_rules[i] = b;
//                                        }
//
//                                    });
//                                }
//
//                                $(this).dialog("close");
//
////                       document.getElementsByTagName('path')[11] .getAttribute("info")
//                            }
//                        }
//                    });
//
//
//                })
//            })
//        }
//    }
//    gv_parsedstring='';
}
function callback() {
}

function mouseup(d) {

    if (typeof(d.children) == 'undefined') {
        findxy('up', d);
    }
}
function mousedown(d) {
    if (typeof(d.children) == 'undefined') {
        findxy('down', d);
    }
}

function findxy(res, e) {

    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.x;
        currY = e.y;
        lv_oc = e;
    }
    if (res == 'up') {
        prevX = currX;
        prevY = currY;
        currX = e.x;
        currY = e.y;
        lv_ic = e;

//        if(typeof(lv_ic) == 'string' ){
//            draw(prevX,prevY,event.x,event.y,lv_oc,lv_ic);
//        }

        if (typeof(lv_oc) != 'undefined' && typeof(lv_ic) != 'undefined' && prevX != currX && !(lv_oc._children || lv_ic._children) && !(lv_oc.children || lv_ic.children)) {
            draw(prevX, prevY, currX, currY, lv_oc, lv_ic);
        }

    }
    if (res == 'move') {
    }
}
function draw(a, b, c, d, e, f) {

    var iflag = 0;
    var oflag = 1;
    var lv_omconn = {}, lv_imconn = {};
     var lv_om={},lv_im={};
    if (gv_setext1 || gv_setext2) {
        var line = d3.svg.diagonal()
            .source({x: barWidth, y: b + barHeight / 2})
            .target({x: c, y: d + barHeight / 2});
        lv_a = e, lv_b = f;
        svg.append("path")
            .attr("d", line)
            .attr("id", e.name + "," + e.y + "," + e.x)
            .attr("info", lv_a.name + "=>" + lv_a.parent.name + "=>" + lv_b.name + "=>" + lv_b.parent.name)
            .style("stroke-width", 2)
            .style("stroke", "#245580")
            .style("fill", "none").on("click", function (e) {
                if ($('#delete').length == 0 && lv_a.depth == 2 && lv_b.depth == 2) {

                    previd = this.id;
                    this.id = 'delete';
                    this.style.stroke = 'red';
                    window['lineClicked'] = true;
                }
            });
        $('svg').unbind('click').bind('click', function (e) {

            if (!window.lineClicked) {
                if ($('#delete').length) {
                    $('#delete')[0].style.stroke = '#245580';
                    $('#delete')[0].id = previd;

                }
            }
            else {
                window['lineClicked'] = false;
            }
        });

    }
    else if (e.depth == 2 && f.depth == 2 && e.parent.parent.name == 'OUTPUT' && f.parent.parent.name == 'INPUT') {

         lv_om = {section: e.parent.name, name: e.name,type:e.type,description: e.description};
        lv_im = {section: f.parent.name, name: f.name,type:f.type,description: f.description};
        lv_omconn = {
            nodeID: e.parent.name,
            children: {
                name: e.name,
                key: e.key,
                description: e.description,
                type: e.type

            }
        };
        lv_imconn = {
            nodeID: f.parent.name,
            children: {
                name: f.name,
                key: f.key,
                description: f.description,
                type: f.type

            }
        };
        var line = d3.svg.diagonal()
            .source({x: barWidth, y: b + barHeight / 2})
            .target({x: c, y: d + barHeight / 2});

        svg.append("path")
            .attr("id", e.name + "," + e.y + "," + e.x)
            .attr("d", line)
            .attr("info", lv_om.name + "=>" + lv_om.section + "=>" + lv_im.name + "=>" + lv_im.section)
            .style("stroke-width", 1.5)
            .style("stroke", "#245580")
            .style("fill", "none")
            .on("click", function (e) {
                if ($('#delete').length == 0) {
                    previd = this.id;
                    this.id = 'delete';
                    this.style.stroke = 'red';
                    window['lineClicked'] = true;
                }
            });
        $('svg').unbind('click').bind('click', function (e) {

            if (!window.lineClicked) {
                if ($('#delete').length) {
                    $('#delete')[0].style.stroke = '#245580';
                    $('#delete')[0].id = previd;

                }
            }
            else {
                window['lineClicked'] = false;
            }
        });


        gv_inputmappings.map(function (d, i) {
            if (d.name == lv_im.name && d.section == lv_im.section) {
                iflag = i;
            }
        })
        gv_outputmappings.map(function (d, i) {
            if (d.name == lv_om.name && d.section == lv_om.section) {
                oflag = i;
            }
        })

        if (oflag != iflag) {
            gv_inputmappings.push(lv_im);
            gv_outputmappings.push(lv_om);
            gv_omappeditemswd.push(lv_omconn);
            gv_imappeditemswd.push(lv_imconn);
        }

    }
    else if (e._children || f._children) {
        var line = d3.svg.diagonal()
            .source({x: barWidth, y: b + barHeight / 2})
            .target({x: c, y: d + barHeight / 2});

        svg.append("path")
            .attr("d", line)
            .attr("id", e.name + "," + e.y + "," + e.x)
            .style("stroke-width", 2)
            .style("stroke", "#245580")
            .style("fill", "none");
    }

//    else{
//        var line='';
//        console.log(event.offsetX+','+event.offsetY)
//        if(e.parent.parent == 'INPUT'){
//            line = d3.svg.diagonal()
//                .source({x: a, y:b+barHeight/2})
//                .target({x:event.offsetX-100, y:event.offsetY-65});
//
//        }
//        else{
//            line = d3.svg.diagonal()
//            .source({x:barWidth, y:b+barHeight/2})
//            .target({x:event.offsetX-100, y:event.offsetY-65});
//        }
//        svg.append("path")
//            .attr("d", line)
//            .attr("id", e.name+","+e.y+","+ e.x)
//            .style("stroke-width", 2)
//            .style("stroke", "#9ecae1")
//            .style("fill", "none") ;
//    }
}

