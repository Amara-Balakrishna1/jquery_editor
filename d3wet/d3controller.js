/**
 * Created with JetBrains WebStorm.
 * User: Balakrishna
 * Date: 12/4/14
 * Time: 7:15 PM
 * To change this template use File | Settings | File Templates.
 */


function sortedConnectorList(ilist) {

    var outList = [];
    var cand = [];
    for (var idx in ilist) {

        if (ilist[idx].key == 'X') {
            outList.push(ilist[idx]);
        } else {
            cand.push(ilist[idx]);
        }
    }


    for (var i = 0; i < cand.length; i++) {
        for (var j = i + 1; j < cand.length; j++) {
            if (cand[i]['name'] > cand[j]['name']) {
                var temp = cand[j];
                cand[j] = cand[i];
                cand[i] = temp;
            }
        }
    }

    ilist = outList.concat(cand);

    return ilist;
}
function getData() {
    var lv_dummy = {input: sformat(gv_inputmappings), output: sformat(gv_outputmappings)}
    var marray = lv_dummy;
    var rules=[];

    for(var i=0;i<gv_rules.length;i++){
        var obj={
            rulename:gv_rules[i].name,
            rule:gv_rules[i].children[0].rule
        };

        rules.push(obj)
    }

    var lv_data = JSON.stringify({"DATA": marray, "Rules": rules});
    alert(lv_data);
    var url = 'http://beetle.vistex.com:8000/sap/bc/abap/mappingeditor?sap-client=040';
    $.ajax({
        url: url,
        type: "POST",
        data: lv_data,
        contentType: "application/json/xhtml; charset=utf-8;",
        dataType: "json",
        xhrFields: {
            withCredentials: false

        },
//        crossDomain: true,
        success: function (result) {
        },
        error: function () {
            console.log('error while reading');
        }


    });
}
function delSel() {

    if ($("#delete").length != 0) {
        var iarray = [], oarray = [];
        var k = 0;
        var la_info = ($("#delete")[0].attributes.info.value).split("=>");
        gv_inputmappings.map(function (d, i) {
            if (d.name == la_info[2] && d.section == la_info[3]) {
                iarray.push(i);
            }
        })
        gv_outputmappings.map(function (d, i) {
            if (d.name == la_info[0] && d.section == la_info[1]) {
                oarray.push(i);
            }
        })
        if (iarray.length != oarray.length) {

            for (var i = 0; i < Math.max(iarray.length, oarray.length) - Math.min(iarray.length, oarray.length); i++) {
                if (iarray.length > oarray.length) {
                    oarray.push('a')
                }
                if (iarray.length < oarray.length) {
                    iarray.push('a')
                }
            }
        }
        for (var i = 0; i < iarray.length; i++) {
            if (oarray[i] == iarray[i]) {
                k = oarray[i];
                $('#delete').remove();
                a='#'+gv_inputmappings[k].name+'-'+gv_inputmappings[k].section
                $(a).data='';
                $(a).attr('href','d3wet/images/nocondition.png') ;
                gv_rules.forEach(function(d,num){
                    if(d.name ==a){
                        gv_rules.splice(num,1)
                    }

                })
                gv_inputmappings.splice(k, 1);
                gv_outputmappings.splice(k, 1);
                gv_omappeditemswd.splice(k, 1);
                gv_imappeditemswd.splice(k, 1);
            }

        }

    }

}
function divitems(array) {
    var lv_obj = {};
    var items = [];
    var tempArray = [], mappedItems = {};
    var visitedNode = "~";
    tempArray = array;
    for (var ta = 0; ta < tempArray.length; ta++) {
        if (visitedNode.search('~' + tempArray[ta].nodeID + '~') == -1) {
            mappedItems[tempArray[ta].nodeID] = [];
            for (var om = 0; om < array.length; om++) {
                if (array[om].nodeID == tempArray[ta].nodeID) {

                    mappedItems[tempArray[ta].nodeID].push(array[om].children);
                }

            }
            visitedNode += tempArray[ta].nodeID + '~';
        }
    }
    for (var i = 0; i < Object.keys(mappedItems).length; i++) {

        lv_obj = { name: Object.keys(mappedItems)[i],
            children: merge(sortedConnectorList(mappedItems[Object.keys(mappedItems)[i]]))
        }

        items.push(lv_obj);
    }
    return items;
}

function drawMappings(maps, source) {

    var a = {}, b = {}, a1, b1;
    if (typeof(maps) != 'undefined') {
        for (var i = 0; i < maps.children[0].children.length; i++) {


            source.forEach(function (d) {
                if (d._children && d.name == 'OUTPUT') {
                    a = d;
                    a1 = i;
                    return false;
                }
                else if (d._children && d.name == maps.children[0].children[i].section && maps.children[0].name == d.parent.name) {
                    a = d;
                    a1 = i;
                    return false;

                }
                else if (maps.children[0].children[i].name == d.name && maps.children[0].children[i].section == d.parent.name && maps.children[0].name == d.parent.parent.name) {
                    a = d;
                    a1 = i;
                    return false;
                }


            });

            source.forEach(function (d) {
                if (d._children && d.name == 'INPUT') {
                    b = d;
                    b1 = i;
                    return false;
                }
                else if (d._children && d.name == maps.children[1].children[i].section && maps.children[1].name == d.parent.name) {
                    b = d;
                    b1 = i;
                    return false;
                }
                else if (maps.children[1].children[i].name == d.name && maps.children[1].children[i].section == d.parent.name && maps.children[1].name == d.parent.parent.name) {
                    b = d;
                    b1 = i;
                    return false;
                }

            });

            if (((typeof(a.parent) != 'undefined' && typeof(b.parent) != 'undefined') || (a._children || b._children)) && a1 == b1) {

                draw(a.x, a.y, b.x, b.y, a, b)
            }

        }
    }
}

function changefill() {
    var a = '';
    var b = this.innerHTML;
    document.getElementById("infomodel").innerHTML = '<b>' + this.innerHTML + '</b>' + '<span class="caret"></span>';
    d3.selectAll("text")[0].forEach(function (record) {
        if (b == "Description") {
            if (typeof(record.attributes.description) != 'undefined') {
                a = record.attributes.description.value;
                record.innerHTML = a.substring(0, 50);
            }
        }
        else if (b == "Name") {
            a = record.attributes.name.value;
            record.innerHTML = a;
        }

    })
}


function getUnmappedItems(connectorData, mappedData) {

    var lv_dummy = 0;
    var copyConnectorData = [];
    copyConnectorData = connectorData;
    var lv_mappeddata = {}, deleteIndex = [];
    lv_mappeddata = mappedData;

    for (var i in mappedData) {
        deleteIndex = [];

        for (var k = 0; k < mappedData[i].children.length; k++) {
            if (connectorData[i].children) {
                for (var j = 0; j < connectorData[i].children.length; j++) {
                    if (mappedData[i].children[k].name == connectorData[i].children[j].name) {

                        deleteIndex.push(j);
                    }
                }
            }
            else if (connectorData[i]._children) {
                for (var j = 0; j < connectorData[i]._children.length; j++) {
                    if (mappedData[i].children[k].name == connectorData[i]._children[j].name) {

                        deleteIndex.push(j);
                    }
                }
            }

        }
        deleteIndex = deleteIndex.sort(function (a, b) {
            return a - b;
        })
        if (connectorData[i].children) {
            for (var d = deleteIndex.length - 1; d >= 0; d--) {

                copyConnectorData[i].children.splice(parseInt(deleteIndex[d]) - lv_dummy, 1);
            }
        }
        else if (connectorData[i]._children) {
            copyConnectorData[i]._children.splice(parseInt(deleteIndex[d]) - lv_dummy, 1);
        }
    }

    return copyConnectorData;

}

function remove_duplicates(arr) {

// delete all duplicates from the array
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i].name == arr[i + 1].name) {
            delete arr[i];
        }
    }

// remove the "undefined entries"
    arr = arr.filter(function (el) {
        return (typeof el !== "undefined");
    });

    return arr;
}

function contexting(arr) {
    var temp_array = [];
    var obj;
    objname = [];
    arr.forEach(function (d) {
        objname.push(d.section)
    })
    objname = jQuery.unique(objname)
    for (var i = 0; i < objname.length; i++) {
        obj = {
            name: objname[i], description: objname[i] + "-" + "Output",
            children: [ ]
        }
        temp_array.push(obj)
    }
    for (var i = 0; i < temp_array.length; i++) {
        for (var j = 0; j < arr.length; j++) {

            if (temp_array[i].name == arr[j].section) {
                temp_array[i].children.push({name: arr[j].name, description: arr[j].description,type:arr[j].type})
            }
        }
    }
    return temp_array;
}

function merge(arr) {

    for(var o = {}, i; i=arr.shift(); o[i.name] = i.description+"--"+ i.key+"--"+ i.type );
    for(i in o) arr.push({name:i, key:o[i].split('--')[1],description:o[i].split('--')[0],type:o[i].split('--')[2]});

    return arr;
}
function sformat(arr){
    var temp_arr=[],obj={};
    arr.forEach(function(d){
             obj={
                 section: d.section,
                 name: d.name
             };
        temp_arr.push(obj)
    })
      return temp_arr;
}