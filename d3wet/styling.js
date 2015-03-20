/**
 * Created with JetBrains WebStorm.
 * User: Balakrishna
 * Date: 12/20/14
 * Time: 12:36 PM
 * To change this template use File | Settings | File Templates.
 */

//curosr position
function saveSelection(a){

    if(window.getSelection)//non IE Browsers
    {
    savedRange = window.getSelection().getRangeAt(0);
    }
     else if(document.selection)//IE
    {
        savedRange = document.selection.createRange();
        }
}

function restoreSelection(){
    isInFocus = true;
    if(document.getElementById("setext1")){
    if (gv_posid == 'setext2') {
    document.getElementById("setext2").focus();
    }
    else{
        document.getElementById("setext1").focus();
    }}
    if (savedRange != null) {
    if (window.getSelection)//non IE and there is already a selection
    {
    var s = window.getSelection();
    if (s.rangeCount > 0)
    s.removeAllRanges();
    s.addRange(savedRange);
    }
else if (document.createRange)//non IE and no selection
        {
            window.getSelection().addRange(savedRange);
            }
else if (document.selection)//IE
        {
            savedRange.select();
            }
}
}

//
function color(d) {
    return d._children ? "#fff" : d.children ? "#fff" : "#ffffff";
}
function textcolor(d){
    if(d.children){
        return "#0ac6fa"
    }
    else{
        if(d.key!=''){
            return 'black';
        }
        else{
            return '#666666';
        }

    }

}
function fontsize(d){
    if(d.children){
        return 14;
    }
    else{
        return 14;


    }

}