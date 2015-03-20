/**
 * Created by ramarao.manthri on 4/15/14.
 **/

/********* Business Script Editor ************/
(function ($) {
    var evtRef,selkeyword,
        evt,
        input,
        output,
        tokenType = {
            keyword: 'keyword',
            lOperand: 'left-operand',
            operator: 'operator',
            rOperand: 'right-operand',
            connector: 'connector',
            midToken: 'mid-token',
            input: 'input'
        }
    var config = {
        keyword: [
            {name: 'IF', VALUE: 'If'},
//            {name: 'DO', VALUE: 'Loop At times'},
            {name: 'MATH', VALUE: 'Math Operations',
                CHILDREN: [
                    {name: 'ABS_VALUE', VALUE: 'Absolute Value'},
                    {name: 'Mod||', VALUE: 'Modulus Value'},
                    {name: 'SIGN', VALUE: 'SIGN_Value'},
                    {name: 'DIVISION', VALUE: 'DIVISION_Value'},
                    {name: 'EXPONENT', VALUE: 'EXPONENT_Value'}


//                    {name: 'EVAL', VALUE: 'Evaluate'},
//                    {name: 'FLOOR', VALUE: 'Nearest Upper Intezer'},
//                    {name: 'CEIL', VALUE: 'Nearest Down Intezer'},
//                    {name: 'SIN', VALUE: 'Sine of a number'},
//                    {name: 'COS', VALUE: 'cosine of a number'},
//                    {name: 'TAN', VALUE: 'tangent of a number'},
//                    {name: 'LOG', VALUE: 'Natural Logarithm of number'},
//                    {name: 'MIN', VALUE: 'Smallest of numbers'},
//                    {name: 'MAX', VALUE: 'Largest of numbers'},
//                    {name: 'POW', VALUE: 'Base exponent Power'},
//                    {name: 'SQRT', VALUE: 'Root of a number'}
                ]},
            {name: 'STRING', VALUE: 'String Operations',
                CHILDREN: [
//                    {name: 'SUBSTRING', VALUE: 'Get'},
//                    {name: 'LASTINDEX', VALUE: 'Position'}
                    {name: 'CONCAT', VALUE: 'Add two Strings'},
                    {name: 'REPLACE', VALUE: 'Replace All'},
                    {name: 'Condense', VALUE: 'Delete redundant spaces'},
                    {name: 'Condense No Gaps', VALUE: 'Delete redundant spaces and gaps'},
                    {name: 'TOUPPERCASE', VALUE: 'All chars to uppercase'},
                    {name: 'TOLOWERCASE', VALUE: 'All chars to lowercase'},
                    {name: 'SUBSTRING', VALUE: 'Get'},
                    {name: 'Shift Left', VALUE: 'Shift left '},
                    {name: 'Shift Right', VALUE: 'Shift right'},
                    {name: 'Left Trim', VALUE: 'Trim left by 1 place'},
                    {name: 'Right Trim', VALUE: 'Trim right by 1 place'}
//                    {name: 'LASTINDEX', VALUE: 'Position'},
//                    {name: 'SPLIT', VALUE: 'Split at Delimiter'},
//                    {name: 'SEARCH', VALUE: 'Test for match string'},
//                    {name: 'CHARCODEAT', VALUE: 'Unicode value of char at position'}
                ]},
            {name: 'NUMERAL', VALUE: 'Numeral Operations',
                CHILDREN: [
                    {name: 'Date Conversion', VALUE: 'To date'},
                    {name: 'Date Difference', VALUE: 'Difference in date'},
                    {name: 'Add Days to Date', VALUE: 'Add Days To date'},
                    {name: 'FMWHMD', VALUE: 'Find which Month Has More Days'},
                    {name: 'DateWeek', VALUE: 'Find week of date'},
                    {name: 'DateWeekday', VALUE: 'Find weekday of date'}
//                    {name: 'Daysiny', VALUE: 'No.of working days in a year'},
//                    {name: 'FORMAT', VALUE: 'Format'},
//                    {name: 'UNFORMAT', VALUE: 'Unformat'},
//                    {name: 'PERCENTAGES', VALUE: '%'}
                ]},
            {name: 'MOMENT', VALUE: 'Moment Operations',
                CHILDREN: [
                    {name: 'STARTOF', VALUE: 'start of day/hour'},
                    {name: 'ENDOF', VALUE: 'end of day/hour'},
                    {name: 'MSUBTRACT', VALUE: 'substract time'}
                ]}


        /******Table ******/
//            {name: 'TABLE', VALUE: 'Table',
//                CHILDREN: [
//                    {name: 'READ TABLE', VALUE: 'Get Row'},
//                    {name: 'MODIFY TABLE', VALUE: 'Modify Table'},
//                    {name: 'REMOVE TABLE', VALUE: 'Remove Table'},
//                    {name: 'AGGREGATE', VALUE: 'Aggregate',
//                        CHILDREN: [
//                            {name: 'AGGR MAX', VALUE: 'Maximum'},
//                            {name: 'AGGR MIN', VALUE: 'Minimum'},
//                            {name: 'AGGR SUM', VALUE: 'Sum'},
//                            {name: 'AGGR CNT', VALUE: 'Count'}
//                        ]
//                    }
//                ]
//            },
//            {name: 'MESSAGE', VALUE: 'Message'},
//            {name: 'SET VALUE', VALUE: 'Set Value'},
//            {name: 'Others', VALUE: 'Others',
//                CHILDREN: [
//                    {name: 'CONTINUE', VALUE: 'Continue'},
//                    {name: 'EXIT', VALUE: 'Exit'},
//                    {name: 'REFRESH', VALUE: 'Clear'}
//                ]
//            }
        ],
        operator: [
            {name: 'EQ', VALUE: 'Equals To'},
            {name: 'NE', VALUE: 'Not Equals To'},
            {name: 'LT', VALUE: 'Less Than'},
            {name: 'GT', VALUE: 'Greater Than'},
            {name: 'LE', VALUE: 'Less Than or Equals To'},
            {name: 'GE', VALUE: 'Greater Than or Equals To'}
// ,
//            {name: '+', VALUE: 'Plus'},
//            {name: '-', VALUE: 'Minus'},
//            {name: '/', VALUE: 'Division'},
//            {name: '*', VALUE: 'Multiplication'},
//            {name: '$', VALUE: 'Dollar'}
// ,
//            {name: 'GE', VALUE: 'Greater Than or Equals To'},
//            {name: 'GE', VALUE: 'Greater Than or Equals To'},
//            {name: 'GE', VALUE: 'Greater Than or Equals To'},
//            {name: 'GE', VALUE: 'Greater Than or Equals To'}
        ],
        connector: [
            {name: 'AND', VALUE: 'And'},
            {name: 'OR', VALUE: 'Or'}
        ],
        action: [
            {name: 'MESSAGE', VALUE: 'Message'}
        ]
    };
    var contextData = [
        { name: '/NGV/S_BAGHDR', description: 'Agreement Header',
            children: [
                {name: 'AGRMT', description: 'Agreement' },
                {name: 'AGRTP', description: 'Agreement Type' },
                {name: 'EXDES', description: 'External Description' },
                {name: 'VLDFR', description: 'Valid From Date' },
                {name: 'VLDTO', description: 'Valid To Date' }
            ]
        },
        { name: '/NGV/S_BAGPTR', description: 'Agreement Partners',
            children: [
                {name: 'AGRMT', description: 'Agreement' },
                {name: 'PTRRL', description: 'Partner Role' },
                {name: 'PTRNR', description: 'Partner Number' },
                {name: 'ADRNR', description: 'Address' },
                {name: 'PTRCT', description: 'Partner Category' }
            ]
        },
        { name: '/NGV/S_BAGPA', description: 'Agreement Participation',
            children: [
                {name: 'DRSET', description: 'Driver Set' },
                {name: 'STDAT', description: 'Start Date' },
                {name: 'ENDAT', description: 'End Date' }
            ]
        }
    ];

    $.widget("bs.ruleEditor",{
        options: {
            title: 'Rule Editor'
        },
        _create: function () {

            var me = this,
                el = me.getElement();
            me.errorExist = false;
            el.ed = $('<div class="bs-editor"/>').appendTo(el);

            el.ed.hdr = $('<div class="bs-editor-header"/>').appendTo(el.ed);
            el.ed.tb = $('<div class="bs-editor-toolbar"/>').appendTo(el.ed);
            el.ed.bodyWrapper = $('<div class="bs-editor-body-wrapper"/>').appendTo(el.ed);
            el.ed.body = $('<div class="bs-editor-body"/>').appendTo(el.ed.bodyWrapper);
            el.ed.gut = $('<div class="bs-editor-gutter"/>').appendTo(el.ed.body);
            el.ed.rule = $('<div class="bs-rule"/>').appendTo(el.ed.body);
            el.ed.ftr = $('<div class="bs-editor-footer"/>').appendTo(el.ed);
            me.prepareConfigData();
//            me.prepareContextData();
            me.prepareOptions();
            me.prepareToolbar();
            me.registerUniCalledEvents()
            me.registerEvents();
            me._adjustBodyMeasures();
        },
        _adjustBodyMeasures: function () {
            var me = this,
                el = me.getElement(),
                hdr = me.getHeader(),
                bodyWrapper = me.getBodyWrapper(),
                tb = me.getToolbar(),
                ftr = me.getFooter();

            var h = el.outerHeight();
            if (hdr) h -= hdr.outerHeight();
            if (tb)  h -= tb.outerHeight();
            if (ftr) h -= ftr.outerHeight();
            bodyWrapper.css({height: h - 10});
        },
        closeTokenHelper: function () {
            var el = this.getElement();
            el.popups.keyword.popup().hide();
            el.popups.operator.popup().hide();
            el.popups.connector.hide();
            el.popups.addConnector.hide();
        },
        setValueToToken: function (ref) {
            var el = this.getElement();
            var parent = ref.closest('div[role="value"]');
            var val = parent.find('input').val();
            if (isNaN(val)) {
                val = "'" + val + "'"
            }
            ;

            el.selectedToken.html(val);
            el.selectedToken.attr('val',"'"+ val+"'");
            el.windows.ctxData.hide();
        },
        openContextData: function () {
            var el = this.getElement();
            selkeyword=$(event.toElement.parentElement).find('span[role=keyword]').attr("val");
            if(selkeyword !=="IF"){
                    contextData=gv_contextData;
                }
                else{
                  var  a=[];
                    for (var j = 0; j < 2; j++) {
                        var source = gv_all.children[j];
                        for (var i = 0; i < source.children.length; i++) {
                            a.push(source.children[i])
                        }
                    }
                                contextData=a;
                  }

                $('.my-rule-editor').ruleEditor('prepareContextData')

            el.windows.ctxData.show();
        },
        openTokenHelper: function () {
            var me = this,
                el = me.getElement(),
                cls = "bs-token-helper",
                coords = me.getEventXY();

            var type = evtRef.attr('role');
            el.popups.keyword.popup().hide();
            el.popups.keyword4CC.popup().hide();
            el.popups.operator.popup().hide();
            el.popups.addConnector.hide();
            el.popups.connector.hide();
            el.popups.input.hide();
            el.popups.midTokenWhere.hide();

            switch (type) {
                case tokenType.keyword:
//                    el.popups.keyword.popup({title:'',left:coords.x,top:coords.y,cls:cls});
                    break;
                case tokenType.operator:
                    el.popups.operator.popup({left: coords.x, top: coords.y, cls: cls});
                    break;
                case tokenType.connector:
                    el.popups.connector.show();
                    el.popups.connector.popup('setXY', coords.x, coords.y);
                    break;
                case tokenType.input:
                    el.popups.input.show();
                    var val = el.selectedTokenOnHover.attr('val');
                    var input = el.popups.input.find('input.value-holder');
                    if (val) {
                        input.val(val);
                    }
                    input.focus();
                    el.popups.input.popup('setXY', coords.x, coords.y);
                    break;
                case tokenType.midToken:
                    var val = evtRef.attr('val');
                    switch (val) {
                        case 'WITH KEY':
                        case 'INDEX':
                            el.popups.midTokenWhere.show();
                            el.popups.midTokenWhere.popup('setXY', coords.x, coords.y);
                            break;
                    }
            }
        },
        changeKeyword: function () {
            var el = this.getElement();
//            var keyword = el.selectedCondition.find('.bs-token[role="keyword"]');
            el.selectedTokenOnHover.text(evtRef.text()).attr('val', evtRef.attr('val'));
        },
        changeOperator: function () {
            var el = this.getElement();
//          var operator = el.selectedCondition.find('.bs-token[role="operator"]');
            el.selectedTokenOnHover.text(evtRef.text()).attr('val', evtRef.attr('val'));
        },
        changeConnector: function () {
            var el = this.getElement();
            el.selectedTokenOnHover.text(evtRef.text()).attr('val', evtRef.attr('val'));
        },
        changeContextFld: function () {
            var el = this.getElement();
            if (el.selectedToken.attr('role') == "table") return false;
            var fldNam = evtRef.attr('val'),
                fldDescr = evtRef.text();
            var tabNam = evtRef.closest('li.parent').attr('val'),
                tabDescr = evtRef.closest('li.parent').find('> span').text(),
                name = tabNam + '-' + fldNam;
//              descr = tabDescr + ' - ' + fldDescr;
            descr = fldDescr;

            el.selectedToken.html(descr);
            el.selectedToken.attr('val', name);
            el.windows.ctxData.hide();
            evt.stopPropagation();
        },
        changeContextTab: function () {
            var el = this.getElement();
            if (el.selectedToken.attr('role') != "table") return false;
            evtRef = evtRef.closest('li[role="tabnam"]');
            var tabNam = evtRef.attr('val'),
                tabDescr = evtRef.find('> span').text();

            el.selectedToken.html(tabDescr);
            el.selectedToken.attr('val', tabNam);
            el.windows.ctxData.hide();
        },
        changeMidToken: function () {
            var el = this.getElement();
            el.selectedTokenGroup = el.selectedTokenOnHover.closest('.bs-token-group');
            var val = evtRef.attr('val');
            var str = this.createTokenGroup({key: val, noClose: true});
            $(str).insertBefore(el.selectedTokenGroup);
            el.selectedTokenGroup.remove();

//           var tokens = el.selectedTokenGroup.find('>.bs-token');//
//           tokens.each(function(){
//               $(this).remove;
//           });

        },
        addCondition: function (d) {
            var me = this,
                rule,
                data = {};
            if (d) data = d;
            if (data.target) {
                rule = data.target;
            } else {
                rule = me.getRule();
            }
            var iconError = me.createIcon({iconCls: 'fa-exclamation-circle'});
            var iconAdd = me.createIcon({iconCls: 'fa-plus'});
            var iconDel = me.createIcon({iconCls: 'fa-minus'});
            var iconExpnd = me.createIcon({iconCls: 'fa-plus-square'});
            var iconColps = me.createIcon({iconCls: 'fa-minus-square-o'});

            var str = '<div class="bs-condition-wrapper">' +
                '<span class="bs-icon icon-invalid-rule"></span>' +
                '<span class="bs-icon icon-expnd-rule" title="Expand">' + iconExpnd + '</span>' +
                '<span class="bs-icon icon-colps-rule" title="Collapse">' + iconColps + '</span>' +
                '<span class="bs-icon icon-add-rule">' + iconAdd + '</span>' +
                '<span class="bs-icon icon-delete-rule bs-hidden" title="Delete Rule">' + iconDel + '</span>' +
                '<span class="bs-condition"></span></div>'
            if (data.returnString) {
                return str;
            } else {
                rule.append(str);
                me.registerEvents();
            }
        },
        addConnector: function () {
            var me = this,
                el = me.getElement(),
                str;
            var iconDelete = me.createIcon({cls: 'bs-icon', iconCls: 'fa-times-circle', attrs: [
                {title: 'Delete', role: 'delete-connector'}
            ]});
            switch (el.selectedConnector) {
                case 'AND':
                    str = me.createTokenGroup({key: 'AND'});
                    break;
                case 'OR':
                    str = me.createTokenGroup({key: 'OR'});
                    break;
                case 'COND':// Create a sub condition
                    me.addCondition({target: evtRef.closest('li')});
                    break;
            }
            switch (el.selectedConnector) {
                case 'AND':
                case 'OR':
                    $(str).insertBefore(evtRef);
                    break;
            }
        },
        openKeywords: function () {
            var coords = this.getEventXY({considerHeight: false});

//            customize
            var a=[],c=[];
            b=config.keyword;
            d=config.operator;
            c = this.element.parent().attr("source-type").split("-")
            c = jQuery.unique(c);
//            keywords prepare...

            b.forEach(function(d,j){if((d.name) == 'IF' || (d.name) == 'DO'){
                a.push(b[j])
            }})
                for(var i=0;i< c.length;i++){
             if(c[i] =='C' || c[i] =='X' || c[i] =='S'){
                b.forEach(function(d,j){if((d.name) == 'STRING'){
                    a.push(b[j])
                }})
            }
          if(c[i] =='D' || c[i] =='T'){
                b.forEach(function(d,j){if((d.name) == 'NUMERAL'){
                    a.push(b[j])
                }})

            }
          if(c[i] =='F' || c[i] =='I'|| c[i] =='P'){
                b.forEach(function(d,j){if((d.name) == 'MATH'){
                    a.push(b[j])
                }})

            }
                }
            var str = '<ul>';
            for (var i in a) {
                var hasMore = a[i].CHILDREN ? true : false;

                str += '<li val="' + a[i].name + '" class="';
                if (hasMore) str += ' more ';
                str += '"><span>' + a[i].VALUE + '</span>';
                if (hasMore) {
                    str += this.prepareChildList(a[i].CHILDREN);
                }
                str += '</li>';
            }
            str += '</ul>';

            this.element.popups.keyword4CC = $('<div class="bs-keywords bs-config-data bs-hidden" role="create">' + str + ' </div>').appendTo('body');
            this.element.popups.keyword = $('<div class="bs-keywords bs-config-data bs-hidden"  role="change">' + str + ' </div>').appendTo('body');




//            customize
            this.element.popups.keyword4CC.popup({title: 'Keywords', left: coords.x, top: coords.y + 15});
        },
        prepareToolbar: function () {
            var me = this,
                el = me.getElement(),
                tb = me.getToolbar();

            me.createButton({text: 'Add Rule', cls: 'add-rule', iconCls: 'fa-plus'}, tb);
            me.createButton({text: '', cls: 'upload-rule', iconCls: 'fa-upload', iconAlign: 'none'}, tb);
        },
        createConnectorBtn: function () {
            return '<span class="bs-icon icon-add-connector" title="Add Connector">' + this.createIcon({iconCls: 'fa-plus-circle'}) + '</i></span>'
        },
        createButton: function (data, src) {
            var me = this,
                el = me.getElement(),
                tb = me.getToolbar();

            var str = '<span class="bs-btn ' + data.cls + '" tabindex="0">';
            str += me.createIcon(data);
            str += data.text;
            str += '</span>';
            if (src)  src.append(str);
            else return str;
        },
        createIcon: function (data) {
            if (!data.iconAlign) data.iconAlign = 'left';

            var icon = '<i class="fa ' + data.iconAlign + ' ' + data.cls + ' ' + data.iconCls + '"';
            icon += this.setAttrs(data.attrs);
            icon += ' >' + '</i>';
            return icon;
        },
        registerUniCalledEvents: function () {
            var me = this,
                el = me.getElement();

            /*******Trigger click event on enter event*******/
            $(document).on('keydown', 'span[tabindex=0]', function (e) {
                if (e.which == 13)
                    $(this).trigger('click');
            });

            /*******Trigger mouseover event on focus event*******/
            $(document).on('focus', 'span[tabindex=0]', function (e) {
                $(this).trigger('mouseover');
            });

            /*******Disable default context menu*******/
            $(document).on('contextmenu', '.bs-editor', function (e) {
                return false;
            });

            /*****Add Rule icon(plus)****/
            $(document).on('click', '.icon-delete-rule > i', function (e) {
                evtRef = $(this).closest('.icon-delete-rule');
                evt = event;
                el.selectedConditionWrapper = evtRef.closest('.bs-condition-wrapper');
                el.selectedCondition = el.selectedConditionWrapper.find('.bs-condition');
                event.stopPropagation();
                me.deleteRule();
            });

            /*******Add Keyword *******/
            $(document).on('click', '.bs-keywords[role="create"] ul li:not(.more)', function (e) {
                evtRef = $(this);
                evt = e;
                el.selectedKeyword = evtRef.attr('val');

                me.addKeyword();
                el.popups.keyword.hide();
            });
            $(document).on('click', '.bs-keywords[role="create"] ul li.more > span', function (e) {

                e.stopPropagation();
                $(this).closest('li.more').find('>ul').toggle();
            });
//            $(document).on('click','.bs-keywords[role="create"] ul li.more',function(e){
//                e.stopPropagation();
//                $(this).find('>span').trigger('click');
//            });

            /******Open Token Helper********/
            $(document).on('mouseover', '.bs-token:not(.bs-token-group)', function () {
//                $(this.parentElement).html().slice(a+5,a+7)
                evtRef = $(this);
                evt = event;
                el.selectedTokenOnHover = evtRef;
                el.selectedConditionWrapper = evtRef.closest('.bs-condition-wrapper');
                el.selectedCondition = el.selectedConditionWrapper.find('.bs-condition');
                me.openTokenHelper();
                event.stopPropagation();
            });

            $(document).on('mouseout', '.bs-token,.bs-token-helper', function (e) {
                evtRef = $(this);
                evt = e;
                event.stopPropagation();
            });

            /********Open Context Data Window**********/
            $(document).on('click', '.bs-token[role="left-operand"],.bs-token[role="right-operand"],.bs-token[role="table"]', function (e) {
                evtRef = $(this);
                evt = e;
                el.selectedToken = evtRef;
                me.openContextData();
            });
            /*******Switch from Context to Value vice-versa******/
            $(document).on('click', '.bs-context-data div[role="selection"] input[name="contextType"]', function (e) {
                var context = $(this).val() == 'context' ? true : false;
                var parent = $(this).closest('.bs-context-data'),
                    contextDivision = parent.find('div[role="context"]'),
                    valueDivision = parent.find('div[role="value"]');
                if (context) {
                    valueDivision.hide();
                    contextDivision.show();
                } else {
                    contextDivision.hide();
                    valueDivision.show();
//                    var val = el.selectedToken.html();
                    valueDivision.find('input').focus();
                }
            });

            /***********Set Value ****************/
            $(document).on('click', '.bs-context-data div[role="value"] .bs-btn.set-value', function (e) {
                me.setValueToToken($(this));
            });
            $(document).on('keydown', '.bs-context-data div[role="value"] .bs-btn.set-value, .bs-context-data div[role="value"] input', function (e) {
                if (e.which == 13) me.setValueToToken($(this));
            });

//            /******Change Keyword******/
//            $(document).on('click','.bs-keywords[role="change"] ul li',function(e){
//                evtRef = $(this); evt = e;
//                el.selectedKeyword = evtRef.attr('val');
//                me.changeKeyword();
//            });
//
//            /******Change Operator ******/
//            $(document).on('click','.bs-operators ul li',function(e){
//                evtRef = $(this); evt = e;
//                el.selectedOperator = evtRef.attr('val');
//                me.changeOperator();
//            });
//            /******Change Connector ******/
//            $(document).on('click','.bs-connectors ul li',function(e){
//                evtRef = $(this); evt = e;
//                el.selectedConnector = evtRef.attr('val');
//                me.changeConnector();
//            });
            /*******Change Data ***********/
            $(document).on('click', '.bs-keywords[role="change"] ul li,  ' +
                '.bs-operators ul li, ' +
                '.bs-connectors ul li, ' +
                '.bs-mid-token-where ul li', function (e) {
                evtRef = $(this);
                evt = e;
                var popup = evtRef.closest('.bs-config-data');
                if (popup.hasClass('bs-keywords')) {
                    el.selectedKeyword = evtRef.attr('val');
                    me.changeKeyword();
                } else if (popup.hasClass('bs-operators')) {
                    el.selectedOperator = evtRef.attr('val');
                    me.changeOperator();
                } else if (popup.hasClass('bs-connectors')) {
                    el.selectedConnector = evtRef.attr('val');
                    me.changeConnector();
                } else if (popup.hasClass('bs-mid-token-where')) {
                    me.changeMidToken();
                }
                me.validateRule();
            });

            /********Change Context Field data**********/
            $(document).on('click', '.bs-context-data li[role="fldnam"]', function (e) {
                evtRef = $(this);
                evt = e;
                me.changeContextFld();
                me.validateRule();
            });
            /********search Context Field data**********/
            $(document).on('keyup', '.contextsearch', function (e) {
                var str='',b=gv_chartDataModel,a=[],c=[];
                if(selkeyword!=="IF"){
                    a=gv_contextData;
                }
                else{
                    for (var j = 0; j < 2; j++) {
                        var source = b.children[j];
                        for (var i = 0; i < source.children.length; i++) {
                            a.push(source.children[i])
                        }
                    }

                }
                  var val = this.value;
                for(var i=0;i<a.length;i++){
                    var temp_array=[]
                     a[i].children.forEach(function(d){

                        if(d.description.toLowerCase().indexOf(val) !==-1){
                              temp_array.push(d);

                        }
                    })
                     var obj ={};
                    if(a[i].description){
                          obj={
                              name:a[i].description,children:temp_array
                          }
                    }  else{

                        obj={
                            name:a[i].name+"-"+a[i].parent.name,children:temp_array
                        }
                    }

                    c.push(obj)
                }

                    for (var i in c) {
                    str += '<li class="parent" role="tabnam" val="' + c[i].name + '"><span role="tab-descr">' + c[i].name + '</span><ul>';
                    for (var j in c[i].children) {
                        str += '<li role="fldnam" val="' + c[i].children[j].name + '"><span role="fld-descr">' + c[i].children[j].description + '</span></li>';
                    }
                    str += '</ul></li>';
                }

                $('div[role=context] ul').html(str)
            });
            /********Change Context Field data ************/
            $(document).on('click', '.bs-context-data li[role="tabnam"] span[role="tab-descr"]', function (e) {
                evtRef = $(this);
                evt = e;
                me.changeContextTab();
                me.validateRule();
            });
            $(document).on('click', '.icon-add-connector', function (event) {
//                a= $(this.parentElement).find("> .bs-token").attr('val')
//               if(a=='min' ||a=='max' ||a=='min'){
//                condition+me.createContext('[value]')+ me.createConnectorBtn() ;
//               }
//                debugger;
                evtRef = $(this);
                evt = event;
                el.selectedConditionWrapper = evtRef.closest('.bs-condition-wrapper');
                el.selectedCondition = el.selectedConditionWrapper.find('.bs-condition');

                var coords = me.getEventXY();
                el.popups.addConnector.show();
                el.popups.addConnector.popup('setXY', coords.x, coords.y);
                event.stopPropagation();
            });
            /*******Add Connector or  condition(sub) ********/
            $(document).on('click', '.bs-add-connector ul li', function (event) {
//                 debugger;
                el.selectedConnector = $(this).attr('val');
                me.addConnector();
                me.validateRule();
            });
            /********** Delete Connector **********/
            $(document).on('click', '.bs-token-group>i[role="delete-connector"]', function () {
                var el = me.getElement();
                el.selectedTokenGroup = $(this).closest('.bs-token-group');
                el.selectedTokenGroup.remove();
            });

            /******** Expand or Collapse Rule ********/
            $(document).on('mouseover', '.icon-colps-rule', function (e) {
                var conditionWrapper = $(this).closest('.bs-condition-wrapper');
                conditionWrapper.removeClass('line-helper').addClass('line-helper');
            });
            $(document).on('mouseout', '.icon-colps-rule', function (e) {
                var conditionWrapper = $(this).closest('.bs-condition-wrapper');
                conditionWrapper.removeClass('line-helper');
            });
            /*** Collapse ***/
            $(document).on('click', '.icon-colps-rule', function (e) {
                var conditionWrapper = $(this).closest('.bs-condition-wrapper');
                var condition = conditionWrapper.find('>.bs-condition');
                /****** Here we do hide end token and the condition which is children of this condition ***/
                condition.find('>ul > li').each(function (idx) {
                    if (idx != 0) {
                        $(this).hide();
                    }
                    $(this).find('> .bs-condition-wrapper').hide();

                });
                conditionWrapper.find('> .icon-expnd-rule').show();
                $(this).hide();
            });

            /*** Expand ***/
            $(document).on('click', '.icon-expnd-rule', function (e) {
                var conditionWrapper = $(this).closest('.bs-condition-wrapper');
                var condition = conditionWrapper.find('>.bs-condition');
                /****** Show the elements that are hidden in collapse event ***/
                condition.find('> ul > li').each(function (idx) {
                    if (idx != 0) {
                        $(this).show();
                    }
                    $(this).find('> .bs-condition-wrapper').show();
                });
                conditionWrapper.find('> .icon-colps-rule').show();
                $(this).hide();
            });
//            /************Change Input value ************/
//            $(document).on('click','.bs-input-value',function(e){
//                e.stopPropagation();
//            });
//            $(document).on('keydown','.bs-input-value input',function(e){
//                if(e.which==13){
//                    var val = $(this).val();
//                    if(val){
//                        el.selectedTokenOnHover.attr('val',val).text(val);
//                    }
//                    el.popups.input.hide();
//                }
//                e.stopPropagation();
//            });
        },
        registerEvents: function () {
            var me = this,
                el = me.getElement(),
                tb = me.getToolbar(),
                body = me.getBody();
            var addRuleBtn = tb.find('.add-rule');
            tb.find('.add-rule').unbind().on('click', function (e) {
                me.addCondition();
            });
            tb.find('.upload-rule').unbind().on('click', function (e) {
                me.getData();
            });
            /*****Add Rule icon(plus)****/
            body.find('.icon-add-rule').unbind().on('click', function (event) {
                evtRef = $(this);
                evt = event;
                el.selectedConditionWrapper = evtRef.closest('.bs-condition-wrapper');
                el.selectedCondition = el.selectedConditionWrapper.find('.bs-condition');
                event.stopPropagation();
                me.openKeywords();
            });

            /******* Open Connector or Sub condition popup **********/
//            body.find('.icon-add-connector').unbind().on('click',function(event){
//                debugger;
//                evtRef = $(this); evt = event;
//                var coords = me.getEventXY({considerHeight:false});
//                el.popups.addConnector.show();
//                el.popups.addConnector.popup('setXY',coords.x,coords.y);
//                event.stopPropagation();
//            });

            /*********Add KeyWord **********/
//            el.popups.keyword.find('ul li').on('click',function(){
//            $('.bs-keywords ul li').unbind('click');
//            el.popups.keyword.find('ul li').unbind('click').on('click',function(){
//               console.log($(this));
//               evtRef = $(this); evt = event;
//               el.selectedKeyword = evtRef.attr('val');
//               me.addKeyword();
//            });
        },
        addKeyword: function () {
            var me = this,
                el = me.getElement(),
                isExpandable = false,
                condition = '';

            var lv_value = gv_contextData[0].children[0].description;
            switch (el.selectedKeyword) {
                case 'IF':
                    condition += "<li>" + me.createKeyWord('If', [
                        {val: 'IF'}
                    ])
                        + me.createContext('[context]')
                        + me.createOperator('[operator]')
                        + me.createValue('[value]')
                        + me.createConnectorBtn()
                        + me.addCondition({returnString: true})
                        + '</li>'
                        + '<li>' + me.createKeyWord('Else', [
                        {val: 'ELSE'}
                    ])
                        + me.addCondition({returnString: true})
                        + '</li>'
                        + '<li role="end-token">' + me.createEndToken('End If', [
                        {val: 'ENDIF.'}
                    ]) + '</li>'
                    isExpandable = true;
                    break;

                case 'DO':
                    condition += '<li>' + me.createKeyWord('Loop', [
                        {val: 'DO'}
                    ]) + me.createValue('[value]') + me.createMidToken('times')
                        + me.addCondition({returnString: true})
                        + '</li>'
                        + '<li role="end-token">' + me.createEndToken('End Loop', [
                        {val: 'ENDDO'}
                    ]) + '</li>';
                    isExpandable = true;
                    break;
                case 'REFRESH':
                    condition += '<li>' + me.createKeyWord('Clear', [
                        {val: 'REFRESH'}
                    ]) + '</li>';
                    break;

                case 'EXIT':
                    condition += '<li>' + me.createKeyWord('Exit', [
                        {val: 'EXIT'}
                    ]) + '</li>';
                    break;

                case 'CONTINUE':
                    condition += '<li>' + me.createKeyWord('Continue', [
                        {val: 'CONTINUE'}
                    ]) + '</li>';
                    break;

//                   case 'CASE':
//                      condition += '<li>'+ me.createKeyWord('Case',[{val:'CASE'}]) + me.createContext('[context]') +'</li>'
//                                + '<li role="mid-token">'+ me.createMidToken('When',[{val:'WHEN'}]) + me.createValue('[value]')
//                                + me.addCondition({returnString:true})
//                                + '</li>'
//                                + '<li role="end-token">'+  me.createEndToken('End Case',[{val:'ENDCASE'}]) +'</li>'
//                       isExpandable = true;
//                       break;
                case 'EVAL':
                    condition += '<li>' + me.createKeyWord('Caluclate', [
                        {val: 'Evaluate'}
                    ])
                        + me.createContext('[value]')
                        + me.createOperator('[operator]')
                        + me.createValue('[value]')
                        + me.createConnectorBtn()
                        + me.addCondition({returnString: true}) + '</li>';
                    break;
                case 'FLOOR':
                    condition += '<li>' + me.createKeyWord('Floor', [
                        {val: 'FLOOR'}
                    ])
                        + me.createContext('[value]') + '</li>';
                    break;
                case 'SIN':
                    condition += '<li>' + me.createKeyWord('SIN', [
                        {val: 'sin'}
                    ])
                        + me.createContext('[value]') + '</li>';
                    break;
                case 'COS':
                    condition += '<li>' + me.createKeyWord('COS', [
                        {val: 'cos'}
                    ])
                        + me.createContext('[value]') + '</li>';
                    break;
                case 'TAN':
                    condition += '<li>' + me.createKeyWord('Tan', [
                        {val: 'Tan'}
                    ])
                        + me.createContext('[value]') + '</li>';
                    break;
                case 'LOG':
                    condition += '<li>' + me.createKeyWord('log', [
                        {val: 'log'}
                    ])
                        + me.createContext('[value]') + '</li>';
                    break;
                case 'MIN':
                    condition += '<li>' + me.createKeyWord('min', [
                        {val: 'min'}
                    ])
                        + me.createContext('[value]') + me.createConnectorBtn() + '</li>';
                    break;
                case 'MAX':
                    condition += '<li>' + me.createKeyWord('max', [
                        {val: 'max'}
                    ])
                        + me.createContext('[value]') + me.createConnectorBtn() + '</li>';
                    break;
                case 'POW':
                    condition += '<li>' + me.createKeyWord('pow', [
                        {val: 'pow'}
                    ])
                        + me.createContext('[value]') + me.createContext('[value]') + '</li>';
                    break;
                case 'SQRT':
                    condition += '<li>' + me.createKeyWord('sqrt', [
                        {val: 'sqrt'}
                    ])
                        + me.createContext('[value]') + '</li>';
                    break;

                case 'ABS_VALUE':
                condition += '<li>' + me.createKeyWord('Move Absolute Value of', [
                    {val: 'CALL ABS_VALUE'}
                ])
                    + me.createContext('[value]') +me.createText('to') + me.createContext('[value]') + '</li>';
                    break;
                case 'Mod||':
                    condition += '<li>' + me.createKeyWord('Move Modulus of', [
                    {val: 'CALL MOD'}
                ])
                    + me.createContext('[value]') +  me.createContext('[value]') + me.createText('to') + me.createContext('[value]') + '</li>';
                    break;
                case 'SIGN':
                    condition += '<li>' + me.createKeyWord('Move SIGN of', [
                        {val: 'CALL SIGN_'}
                    ])
                        + me.createContext('[value]') +  me.createText('to') + me.createContext('[value]') + '</li>';
                    break;
                case 'DIVISION':
                    condition += '<li>' + me.createKeyWord('Move Division of', [
                        {val: 'CALL DIV'}
                    ])
                        + me.createContext('[value]')+ me.createContext('[value]') +  me.createText('to') + me.createContext('[value]') + '</li>';
                    break;
                case 'EXPONENT':
                    condition += '<li>' + me.createKeyWord('Move Exponent of', [
                        {val: 'CALL EXPONENT'}
                    ])
                        + me.createContext('[value]') +  me.createText('to') + me.createContext('[value]') + '</li>';
                    break;
                case 'CEIL':
                    condition += '<li>' + me.createKeyWord('Ceil', [
                        {val: 'ceil'}
                    ])
                        + me.createContext('[value]') + '</li>';
                    break;
                case 'CONCAT':
                    condition += '<li>' + me.createKeyWord('ADD STRINGS', [{val: 'CALL CONCATENATE'}])
                        + me.createContext('[value]')
                        + me.createContext('[value]')
                        + me.createText('to')
                        + me.createContext('[value]')
                        + '</li>';
                    break;
                case 'REPLACE':
                    condition += '<li>' + me.createKeyWord('Replace', [
                        {val: 'CALL REPLACE_ALL'}
                    ])
                        + me.createContext('[value]') + "with" + me.createContext('[value]') + me.createText('to') + me.createContext('[value]') + '</li>';
                    break;
                case 'Condense':
                    condition += '<li>' + me.createKeyWord('Delete redundant spaces', [{val: 'CALL Condense'}])
                        + me.createContext('[value]') + me.createText('to')
                        + me.createContext('[value]') + '</li>';
                    break;
                case 'Condense No Gaps':
                    condition += '<li>' + me.createKeyWord('Delete redundant spaces and gaps', [{val: 'CALL Condense_No_Gaps'}])
                        + me.createContext('[value]')  +me.createText('to')
                        + me.createContext('[value]') + '</li>';
                    break;
                case 'SUBSTRING':
                    condition += '<li>' + me.createKeyWord('Extract the characters between Indices', [
                        {val: 'CALL SUBSTRING'}
                    ]) + me.createContext('[value]') + me.createContext('[value]') + me.createText("IN") + me.createContext(lv_value)+me.createText('to')+ me.createContext('[value]')+'</li>';
                    break;
                case 'LASTINDEX':
                    condition += '<li>' +me.createContext('[value]')+me.createText("=") + me.createKeyWord('Position of', [
                        {val: 'Index'}
                    ]) + me.createContext('[value]') + me.createText("IN") + me.createContext(lv_value) + '</li>';
                    break;
                case 'TOUPPERCASE':
                    condition += '<li>' + me.createContext(lv_value) + me.createKeyWord('UPPERCASE', [
                        {val: 'CALL TOUPPERCASE'}
                    ])+me.createText('to')
                        +  me.createContext('[value]')+'</li>';
                    break;
                case 'TOLOWERCASE':
                    condition += '<li>'+ me.createContext(lv_value) + me.createKeyWord('LOWERCASE', [
                        {val: 'CALL TOLOWERCASE'}
                    ]) +me.createText('to')  + me.createContext('[value]')
                        + '</li>';
                    break;
                case 'Shift Left':
                    condition += '<li>'+ me.createKeyWord('Shift Left', [
                        {val: 'CALL Shift_Left'}])+ me.createContext(lv_value)
                     +me.createText('to')  + me.createContext('[value]')
                        + '</li>';
                    break;
                case 'Shift Right':
                    condition += '<li>' + me.createKeyWord('Shift Right', [
                        {val: 'CALL Shift_Right'}
                    ]) + me.createContext(lv_value)+me.createText('to')  + me.createContext('[value]')
                        + '</li>';
                    break;
                case 'Right Trim':
                    condition += '<li>'+ me.createKeyWord('Right Trim', [
                        {val: 'CALL Right_Trim'}
                    ]) + me.createContext(lv_value) +me.createText('to')  + me.createContext('[value]')
                        + '</li>';
                    break;
                case 'Left Trim':
                    condition += '<li>'+ me.createKeyWord('Left Trim', [
                        {val: 'CALL Left_Trim'}
                    ]) + me.createContext(lv_value) +me.createText('to')  + me.createContext('[value]')
                        + '</li>';
                    break;

                case 'SPLIT':
                    condition += '<li>'+ me.createContext('[value]')+me.createText('=')+ me.createKeyWord('SPLIT', [
                        {val: 'SPLIT'}
                    ])
                        + me.createContext(lv_value) +"At"+ me.createContext('[DELIMITER]') + '</li>';
                    break;

                case 'SEARCH':
                    condition += '<li>'+ me.createContext('[value]')+me.createText('=')+ me.createKeyWord('SEARCH', [
                        {val: 'SEARCH'}
                    ])
                        + me.createContext('[value]') +"IN"+ me.createContext(lv_value) + '</li>';
                    break;

                case 'CHARCODEAT':
                    condition += '<li>'+ me.createContext('[value]')+me.createText('=') + me.createKeyWord('UNICODEVALUE', [
                        {val: 'UCL'}
                    ])
                       +"OF" + me.createContext(lv_value)+"AT POSITION" + me.createContext('[value]') + '</li>';
                    break;

                case 'Date Conversion':
                    condition += '<li>' + me.createKeyWord('Create Date Using', [
                        {val: 'CALL DATECONV'}
                    ])+ me.createContext('[Days]') + me.createContext('[Months]') + me.createContext('[Year]') +me.createText('to')
                        +  me.createContext('[value]')+'</li>';
                    break;
                case 'Date Difference':
                    condition += '<li>' + me.createKeyWord('Difference of dates', [
                        {val: 'CALL DATE_DIFF'}
                    ])+ me.createContext('[Date]') + me.createContext('[Date]') +me.createText('to')
                        +  me.createContext('[value]')+'</li>';
                    break;
                case 'Add Days to Date':
                    condition += '<li>' + me.createKeyWord('Add days Date', [
                        {val: 'CALL Add_to_Date'}
                    ])+ me.createContext('[Date]') + me.createContext('[Days]')   +me.createText('to')
                        +  me.createContext('[value]')+'</li>';
                    break;
                case 'FMWHMD':
                    condition += '<li>' + me.createKeyWord('Month with Max Days', [
                        {val: 'CALL GREATER_OF_TWO_MONTH'}
                    ])+ me.createContext('[MM]') + me.createContext('[MM]')   +me.createText('to')
                        +  me.createContext('[value]')+  me.createContext('[value]')+'</li>';
                    break;
                case 'DateWeek':
                    condition += '<li>' + me.createKeyWord('Find week of Date', [
                        {val: 'CALL DATE_WEEK'}
                    ])+ me.createContext('[DD]')+me.createText('to') +  me.createContext('[value]')+'</li>';
                    break;
                case 'DateWeekday':
                    condition += '<li>' + me.createKeyWord('Find weekday of Date', [
                        {val: 'CALL DATE_WEEKDAY'}
                    ])+ me.createContext('[DD]')+me.createText('to') +  me.createContext('[value]')+'</li>';
                    break;
                case 'FORMAT':
                    condition += '<li>' + me.createKeyWord('String to date', [
                        {val: 'numeral'}
                    ]) + me.createContext(lv_value)+   me.createKeyWord('to Format', [
                        {val: '.format'}
                    ]) + me.createContext('[value]') + '</li>';
                    break;
                case 'UNFORMAT':
                    condition += '<li>' +  me.createKeyWord('Numeral', [
                        {val: 'numeral()'}
                    ])+   me.createKeyWord('Unformat', [
                        {val: '.unformat'}]) + me.createContext('[value]') + '</li>';
                    break;

                case 'PERCENTAGES':
                    condition += '<li>' +  me.createKeyWord('Numeral', [
                        {val: 'numeral()'}
                    ])+    me.createKeyWord('Percentage', [
                        {val: '.percentage'}])+   me.createContext('[value]') + '</li>';
                    break;


                case 'STARTOF':
                    condition += '<li>' + me.createKeyWord('Moment', [
                        {val: 'moment()'}
                    ]) +   me.createKeyWord('Startof', [
                        {val: '.startof'}
                    ]) + me.createContext('[value]')+ me.createKeyWord('FromNow', [
                        {val: 'fromNow()'}
                    ]) + '</li>';
                    break;
                case 'ENDOF':
                    condition += '<li>' + me.createKeyWord('Moment', [
                        {val: 'moment()'}
                    ]) +   me.createKeyWord('Endof', [
                        {val: '.endof'}
                    ]) + me.createContext('[value]')+ me.createKeyWord('FromNow', [
                        {val: 'fromNow()'}
                    ]) + '</li>';
                    break;

                case 'MSUBTRACT':
                    condition += '<li>'+ me.createKeyWord('Moment', [
                        {val: 'moment()'}]) +  me.createKeyWord('Subtract', [
                        {val: '.subtract'}])+   me.createContext('[value]')+me.createKeyWord('Calender', [
                        {val: '.Calender()'}]) + '</li>';
                    break;
                case 'READ TABLE':
                    condition += '<li>' + me.createKeyWord('Get row of', [
                        {val: 'READ'}
                    ]) + me.createTable('[table]')
                        + me.createTokenGroup({key: 'WITH KEY', noClose: true})
                        + '</li>';
                    break;
                case 'ADD ROW':
                    condition += '<li>' + me.createKeyWord('Add row', [
                        {val: 'ADD TO TABLE '}
                    ]) + me.createTable('[table]')
                        + me.createMidToken('from', [
                        {val: 'FROM'}
                    ]) + me.createTable('[table]')
                        + '</li>';
                    break;
                case 'MODIFY TABLE':
                    condition += '<li>' + me.createKeyWord('Modify', [
                        {val: 'MODIFY TABLE'}
                    ]) + me.createTable('[table]')
                        + me.createMidToken('from', [
                        {val: 'FROM'}
                    ])
                        + me.createTable('[table]')
                        + '</li>';
                    break;
                case 'REMOVE TABLE':
                    condition += '<li>' + me.createKeyWord('Remove', [
                        {val: 'REMOVE'}
                    ]) + me.createTable('[table]')
                        + me.createTokenGroup({key: 'WITH KEY', noClose: true})
                        + '</li>';
                    break;
                case 'AGGR MAX':
                    condition += '<li>' + me.createKeyWord('Maximum', [
                        {val: 'MAX'}
                    ]) + me.createContext('[context]')
                        + me.createTable('[table]')
                        + '</li>'
                    break;
                case 'AGGR MIN':

                    break;
                case 'AGGR SUM':

                    break;
                case 'AGGR CNT':

                    break;
                case 'SET VALUE':
                    condition += '<li>' + me.createKeyWord('Set Value', [
                        {val: 'SET VALUE'}
                    ]) + me.createContext('[context]')
                        + me.createMidToken('from', [
                        {val: 'FROM'}
                    ]) + me.createValue('[value]')
                        + '</li>';
                    break;
                case 'MESSAGE':
                    condition += '<li>' + me.createKeyWord('Message', [
                        {val: 'MESSAGE'}
                    ])
                        + me.createMessage('[Message]')
                        + '</li>';
                    break;
            }
            if (condition == '') return false;
            condition = '<ul>' + condition + '</ul>';

            el.selectedCondition.html(condition);
//            switch (el.selectedKeyword){
//                case 'READ TABLE':
//                case 'SET VALUE':
            el.selectedConditionWrapper.after(me.addCondition({returnString: true}));
//                  break;
//            }
            if (isExpandable) {
                el.selectedConditionWrapper.find('> span.icon-colps-rule').show();
            }
            me.changeAddToDelete();
            me.registerEvents();
            me.validateRule();
        },
        deleteRule: function () {
            var me = this,
                el = me.getElement();

            el.selectedConditionWrapper.find('> span.icon-expnd-rule').hide();
            el.selectedConditionWrapper.find('> span.icon-colps-rule').hide();
            el.selectedConditionWrapper.find('> span.icon-invalid-rule').hide();

            el.selectedConditionWrapper.find('> span.icon-add-rule').show();
            el.selectedConditionWrapper.find('> span.icon-delete-rule').addClass('bs-hidden');
            el.selectedConditionWrapper.find('.bs-condition').html('');
        },
        changeAddToDelete: function () {
            var me = this,
                el = me.getElement();
            el.selectedConditionWrapper.find('> span.icon-add-rule').hide();
            el.selectedConditionWrapper.find('> span.icon-delete-rule').removeClass('bs-hidden');
        },
        createKeyWord: function (val, attrs) {
            var str;
            str = '<span  class="bs-token" role="keyword"';
            str += this.setAttrs(attrs);
            str += '>' + val + '</span>';
            return str;
        },
        createContext: function (val) {
            return '<span class="bs-token" role="left-operand" tabindex="0">' + val + '</span>';
        },
        createText: function (val) {
            return '<span class="bs-token-text" role="text" tabindex="0">' + val + '</span>';
        },
        createOperator: function (val) {
            return '<span class="bs-token" role="operator" tabindex="0">' + val + '</span>';
        },
        createValue: function (val) {
            return '<span class="bs-token" role="right-operand" tabindex="0">' + val + '</span>';
        },
        createTokenGroup: function (data) {
            if (!data.key) return '';
            if (!data.noClose) {
                data.noClose = false;
            }
            var me = this,
                str = '',
                iconDelete = me.createIcon({cls: 'bs-icon', iconCls: 'fa-times-circle', attrs: [
                    {title: 'Delete', role: 'delete-connector'}
                ]});
            str += '<span class="bs-token bs-token-group ';
            if (data.noClose) {
                str += ' no-close '
            }
            str += '">' + iconDelete;
            switch (data.key) {
                case 'AND':
                    str += me.createConnector('And', [
                        {val: 'AND'}
                    ]);
                    str += me.createContext('[context]');
                    str += me.createOperator('[operator]');
                    str += me.createValue('[value]');
                    break;
                case 'OR':
                    str += me.createConnector('Or', [
                        {val: 'OR'}
                    ]);
                    str += me.createContext('[context]');
                    str += me.createOperator('[operator]');
                    str += me.createValue('[value]');
                    break;
                case 'WITH KEY':
                    str += me.createMidToken('Where', [
                        {val: 'WITH KEY'}
                    ]) + me.createContext('[context]');
                    str += me.createOperator('[operator]') + me.createValue('[value]');
                    break;
                case 'INDEX':
                    str += me.createMidToken('Index', [
                        {val: 'INDEX'}
                    ]);
                    str += me.createValue('0', [
                        {val: '0'}
                    ]);
                    break;
                case 'OTHER':
                    str += me.createValue('0', [
                        {val: '0'}
                    ]);
                    break;
            }
            str += '</span>';
            return str;
        },
        createEndToken: function (val, attrs) {
            var str;
            str = '<span  class="bs-token" role="end-token"';
            str += this.setAttrs(attrs);
            str += '>' + val + '</span>';
            return str;
        },
        createMidToken: function (val, attrs) {
            var str;
            str = '<span  class="bs-token" role="mid-token"';
            str += this.setAttrs(attrs);
            str += '>' + val + '</span>';
            return str;
        },
//        createInputToken:function(val,attrs){
//            var str;
//            str = '<span  class="bs-token" role="input"';
//            str += this.setAttrs(attrs);
//            str += '>'+val+'</span>';
//            return str;
//        },
        createMessage: function (val) {
            return '<span class="bs-token" role="message" tabindex="0">' + val + '</span>';
        },
        setAttrs: function (attrs) {
            if (!attrs) return '';
            var str = '';
            for (var i in attrs) {
                for (var key in attrs[i]) {
                    str += ' ' + key + '="' + attrs[i][key] + '"';
                }
            }
            return str;
        },
        createTable: function (val) {
            return '<span class="bs-token" role="table" tabindex="0">' + val + '</span>';
        },
        createConnector: function (val, attrs) {
            var str;
            str = '<span  class="bs-token" role="connector" tabindex="0"';
            str += this.setAttrs(attrs);
            str += '>' + val + '</span>';
            return str;
        },
        validateRule: function () {
            var me = this;
            var rule = $('.bs-rule');
            var conditionWrs = rule.find('> .bs-condition-wrapper');
            conditionWrs.each(function () {
                me.checkCondition({wrapper: $(this)});
            });
        },
        checkCondition: function (data) {
            var me = this;
            me.errorExist = false;
            var condition = data.wrapper.find('>.bs-condition');
            var iconInvalidRule = data.wrapper.find('>.icon-invalid-rule');
            var tokens = condition.find('>ul > li> span.bs-token');
            me.checkTokens(tokens);
            if (me.errorExist) {
                iconInvalidRule.show();
            }
            else {
                iconInvalidRule.hide();
            }
            var childWrs = condition.find('>ul >li:not([role="end-token"]) > .bs-condition-wrapper');
            childWrs.each(function () {
                me.checkCondition({wrapper: $(this)});
            });
            return me.errorExist;
        },
        checkTokens: function (tokens) {
            var me = this;
            tokens.each(function () {
                var token = $(this);
//                console.log(token);
                if (me.isTokenGroup({token: token})) {
                    var groupTokens = token.find('span.bs-token');
                    me.checkTokens(groupTokens);
                } else {
                    if (me.isDataToken({token: token})) {
                        if (!me.isValueKept({token: token})) {
                            me.errorExist = true;
                            return false;
                        }
                    }
                }
            });
        },
        isTokenGroup: function (data) {
            if (data.token.hasClass('bs-token-group')) return true;
            else return false;
        },
        isDataToken: function (data) {
            var role = data.token.attr('role');
            if (role && (role == 'left-operand' || role == 'operator' || role == 'right-operand' || role == 'table' || role == 'connector'))
                return true;
            else return false;
        },
        isValueKept: function (data) {
            var val = data.token.attr('val');
            if (val && val != "") return true;
            else return false;
        },
        getData: function () {
            var me = this;
            output = [],bscript='',lv_a=[];
            var rule = this.element.find('.bs-rule');
            var conditionWrs = rule.find('> .bs-condition-wrapper');
            conditionWrs.each(function () {
                me.parseCondition({wrapper: $(this)});

            });

            output.forEach(function (a, i) {
                a.split('.').forEach(function (d) {

                    if (d !==' ') {
                        if (d.indexOf('CALL') == -1) {
                            bscript += d + '.';
                        } else {
                            d = d.split(' ');
                            bscript += me.formCondition(d);
                        }
                    }
                })
            })
              debugger;

            var sourceEle = $('#' + this.element.closest('#popup-rule-editor').attr('source-id'));
//
            if (sourceEle) {
                var ruleHtml = rule.html();
                sourceEle.data('rule', bscript);
                sourceEle.data('ruleHtml', ruleHtml);
            }
            if(output[0] && output[0].length !==0){
            var obj={
                name:this.element.parent().attr("source-id"),
                children:[{rule:bscript},
                          {ruleHtml:ruleHtml}]
            }
            if(gv_rules.length==0 || gv_rulenames.indexOf(obj.name)==-1){
                   gv_rules.push(obj)
                   gv_rulenames.push(obj.name)  }
            else{
                gv_rules[gv_rulenames.indexOf(obj.name)]=obj;

            }

                $(sourceEle).attr("href","d3wet/images/withcondition.png");
            }
            dialog.ruleEditor.dialog('close');
        },

        formCondition: function (data) {
            str1 = '', str2 = ''
            for (var i = 0; i < data.length && data[i]; i++) {
                if (i < 2) {
                    str1 += data[i] + ' ';
                }
                else {
                    str2 += data[i] + ',';
                }
            }
            return str1.slice(0,str1.length-1) + '(' + str2.slice(0,str2.length-1) + ').';

        },
        parseCondition: function (data) {
            var me = this,
                str,
                condition = data.wrapper.find('> .bs-condition');
            a='',
            condition.find('span[class=bs-token]').each(function(d,i){
               role = $(this).attr('role')

                if (role !== 'keyword' && role  !== 'end-token' || d==0) {
                        a+=$(i).attr('val');
                    }
                    else if (role  === 'keyword' || role  === 'end-token') {
                        a +="." + $(i).attr('val');
                    }
                a+=' ';
            })

            a.length && output.push(a);

//            var lines = condition.find('>ul >li:not([role="end-token"])');
//            lines.each(function () {
//                str = '';
//                var tokens = $(this).find('> .bs-token ');
//                str = me.getTokensValue(tokens);
//                if (str && str != '') {
//                    str += '.';
//                    output.push(str);
//                }
//            });
//
//            var childWrs = condition.find('> ul >li:not([role="end-token"]) > .bs-condition-wrapper');
//            childWrs.each(function () {
//                me.parseCondition({wrapper: $(this)});
//            });
//
//            /******* Set End Token *****/
//            var endToken = condition.find('> ul> li[role="end-token"]> .bs-token');
//            if (endToken.length > 0) {
//                str = me.getTokenValue(endToken) + '.';
//                if (str && str != '') {
//                    output.push(str);
//                }
//            }
        },
        getTokensValue: function (tokens) {
            var me = this,
                str = '';
            tokens.each(function () {
                var token = $(this);
                if (me.isTokenGroup({token: token})) {
                    var groupTokens = token.find('>span.bs-token');
                    str += me.getTokensValue(groupTokens);
                } else {
                    str += me.getTokenValue($(this)) + '  ';
                }
            });
            return str;
        },
        getTokenValue: function (token) {
            return token.attr('val');
        },
        setData: function (html, data) {
            var rule = this.element.find('.bs-rule');
            if (html != undefined) {
                rule.html(html);

            }
        },
        prepareOptions: function () {
            var me = this,
                opts = this.options;
            if (opts.width) me.setWidth(opts.width);
            if (opts.height) me.setHeight(opts.height);
            if (opts.title) me.setTitle(opts.title);
        },
        prepareConfigData: function () {
            var me = this,
                el = me.element;
            el.popups = {};
            var str2;

            /*****Keywords ******/
            var str = '<ul>';
            for (var i in config.keyword) {
                var hasMore = config.keyword[i].CHILDREN ? true : false;

                str += '<li val="' + config.keyword[i].name + '" class="';
                if (hasMore) str += ' more ';
                str += '"><span>' + config.keyword[i].VALUE + '</span>';
                if (hasMore) {
                    str += me.prepareChildList(config.keyword[i].CHILDREN);
                }
                str += '</li>';
            }
            str += '</ul>';

            el.popups.keyword4CC = $('<div class="bs-keywords bs-config-data bs-hidden" role="create">' + str + ' </div>').appendTo('body');
            el.popups.keyword = $('<div class="bs-keywords bs-config-data bs-hidden"  role="change">' + str + ' </div>').appendTo('body');


            /***** Operators ******/
            str = '<ul>';
            for (var i in config.operator) {
                str += '<li val="' + config.operator[i].name + '">' + config.operator[i].VALUE + '</li>';
            }
            str += '</ul>';

            el.popups.operator = $('<div class="bs-operators bs-config-data bs-hidden">' + str + ' </div>').appendTo('body');

            /***** Connectors ******/
            str = '<ul>';
            for (var i in config.connector) {
                str += '<li val="' + config.connector[i].name + '">' + config.connector[i].VALUE + '</li>';
            }
            str += '</ul>';

            el.popups.connector = $('<div class="bs-connectors bs-config-data">' + str + ' </div>').appendTo('body').popup();
            el.popups.connector.hide();

            var ref = $('<div class="bs-add-connector bs-config-data">' + str + ' </div>').appendTo('body');
            el.popups.addConnector = ref.popup();
            el.popups.addConnector.hide();

            /*******Where or Index ******/
            str = '<ul>';
            str += '<li val="INDEX">Index</li>';
            str += '<li val="WITH KEY">Where</li>';
            str += '</ul>';
            el.popups.midTokenWhere = $('<div class="bs-mid-token-where bs-config-data">' + str + ' </div>').appendTo('body').popup();
            el.popups.midTokenWhere.hide();

            /***** Actions ******/
            str = '<ul>';
            for (var i in config.action) {
                str += '<li val="' + config.action[i].name + '">' + config.action[i].VALUE + '</li>';
            }
            str += '</ul>';
            el.popups.action = $('<div class="bs-actions bs-config-data ">' + str + ' </div>').appendTo('body').popup();
            el.popups.action.hide();

            /**************Input value ***********/
            str = '<div class="bs-input-value"><input class="value-holder"/></div>';
            el.popups.input = $(str).appendTo('body').popup();
            el.popups.input.hide();
        },
        prepareChildList: function (children) {
            var str = '<ul>';
            for (var i in children) {
                var hasMore = children[i].CHILDREN ? true : false;

                str += '<li val="' + children[i].name + '" class="';
                if (hasMore) str += ' more ';
                str += '"><span>' + children[i].VALUE + '</span>';
                if (hasMore) {
                    str += this.prepareChildList(children[i].CHILDREN);
                }
                str += '</li>';
            }
            str += '</ul>';
            return str;
        },
        prepareContextData: function () {
            var me = this,
                el = me.getElement();
            el.windows = {};
            var str = '<div class="bs-context-data">';
//            keyword='+ el.selectedKeyword+'
            /********Selection *****/
            str += '<div role="selection">';
            str += '<span><input type="radio" name="contextType" value="context" checked>Context</span>' +
                '<span><input type="radio" name="contextType" value="value">Value</span>';
            str += '</div>';

            /****Value***/
            str += '<div role="value" class="bs-hidden">';
            str += '<span><input type="text"/></span>';
            str += me.createButton({text: 'Set', cls: 'set-value'});
            str += '</div>'

            /****Context Data***/


            str += '<div role="context">'
            str += ''+'<span id="radio" style="margin-left: 40px"><b>Search:</b><input class="contextsearch" type="text"></span><ul>';
            for (var i in contextData) {
                if(typeof(contextData[i].parent)!=='undefined'){
                str += '<li class="parent" role="tabnam" val="' + contextData[i].name + '"><span role="tab-descr">' + contextData[i].name+"-"+contextData[i].parent.name + '</span><ul>';

                }
                else{
                str += '<li class="parent" role="tabnam" val="' + contextData[i].name + '"><span role="tab-descr">' + contextData[i].description + '</span><ul>';
                }for (var j in contextData[i].children) {
                    str += '<li role="fldnam" val="' + contextData[i].children[j].name + '"><span role="fld-descr">' + contextData[i].children[j].description + '</span></li>';
                }
                str += '</ul></li>';
            }
            str += '</ul></div>';
            str += '</div>';
            var ctxWindow = $(str).appendTo('body');
            el.windows.ctxData = ctxWindow.window({title: 'Context Data', draggable: true}).hide();
        },
        setTitle: function (title) {
            this.getHeader().text(title);
        },
        setWidth: function (value) {
            this.getElement().css({width: value});
            this.getEditor().css({width: value});
        },
        setHeight: function (value) {
            this.getElement().css({height: value});
            this.getEditor().css({height: value});
        },
        getEventXY: function (orgData) {
            var data = {};
            if (orgData) data = orgData;
            if (data.considerHeight == undefined) data.considerHeight = true;
            if (data.considerWidth == undefined) data.considerWidth = false;
            if (!data.relativeTo) data.relativeTo = 'document';
            var coords = { };

            if (data.relativeTo == "parent") {
                coords.x = evtRef.position().left;
                coords.y = evtRef.position().top;
            } else if (data.relativeTo == "document") {
                coords.x = evtRef.offset().left;
                coords.y = evtRef.offset().top;
            }
            if (data.considerWidth) {
                coords.x += evtRef.outerWidth();
            }
            if (data.considerHeight) {
                coords.y += evtRef.outerHeight();
            }
            return coords;
        },
        getElement: function () {
            return this.element;
        },
        getEditor: function () {
            return this.element.ed;
        },
        getHeader: function () {
            return this.element.ed.hdr;
        },
        getToolbar: function () {
            return this.element.ed.tb;
        },
        getBodyWrapper: function () {
            return this.element.ed.bodyWrapper;
        },
        getBody: function () {
            return this.element.ed.body;
        },
        getRule: function () {
            return this.element.ed.rule;
        },
        getFooter: function () {
            return this.element.ed.ftr;
        }
    });
}(jQuery));

/*********Window Widget**********/
(function ($) {
    $.widget("bs.window", {
        options: {
            top: '20%',
            left: '20%'
        },
        _create: function () {
            var me = this;
            me.element.addClass('bs-window');
            me.element.html('<div class="bs-window-header">' +
                '<div role="title">' + me.options.title + '</div>' +
                '<div class="bs-window-close"><i class="fa fa-times"></i></div>' +
                '</div>' +
                '<div class="bs-window-body">' + me.element.html() + '</div>');
            me.element.css({
                top: me.options.top,
                left: me.options.left
            });

            me.element.header = me.element.find('.bs-window-header');
            me.element.close = me.element.header.find('.bs-window-close');

            /***Body styles***/
            me.element.body = me.element.find('.bs-window-body');
            me.element.body.css({
                width: me.options.width,
                height: me.options.height
            });
            if (me.options.draggable) {
                me.element.draggable({
                    containment: "document",
                    cancel: ".bs-window-body"
                });
                me.element.header.css({
                    cursor: 'move'
                });
            }
            if (me.options.resizable) {
                me.element.resizable();
            }
            me.element.close.bind('click', function () {
                me.hide();
            });
        },
        _init: function () {
//           debugger;
        },
        show: function () {
            var me = this;
            me.element.show();
        },
        hide: function () {
            var me = this;
            me.element.hide();
        },
        setXY: function (x, y) {
            var me = this,
                el = me.getElement(),
                opts = me.options;
            if (x && y) {
                el.css({'left': x, top: y});
            } else {
//                var confine = evtRef.closest(opts.containment);
            }
        },
        // Use the _setOption method to respond to changes to options
        _setOption: function (key, value) {
            // In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
            $.Widget.prototype._setOption.apply(this, arguments);
            // In jQuery UI 1.9 and above, you use the _super method instead
            this._super("_setOption", key, value);
        },
        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        }
    });
}(jQuery));

/********* Popup Widget**************/
(function ($) {
    $.widget('bs.popup', {
        options: {
//            containment: '.bs-editor-body',
            hideOnClick: '.bs-editor-body',
            showTimeDelay: 0
        },
        _create: function () {
            var me = this,
                el = me.element,
                opts = me.options;

            el.addClass('bs-popup');
            el.html($('<div class="bs-popup-body">' + el.html() + '</div>'));
            el.body = el.find('.bs-popup-body');

            me._refresh();
            if (opts.draggable) {
                el.draggable({containment: 'document', cancel: '.bs-popup-body'});
                el.unbind().bind('click', function (event) {
                    event.stopPropagation();
                });
            }
            $(document).on('click', 'body', function () {
                me.hide();
            });
            me.show();
        },
        _init: function () {
            this.show();
            this._refresh();
        },
        _refresh: function () {
            var me = this,
                el = me.element,
                opts = me.options;
            el.find('.bs-popup-header').remove();
            if (opts.title && opts.title != '') {
                el.prepend('<div class="bs-popup-header"></div>');
                el.hdr = el.find('.bs-popup-header');
                me.setTitle(opts.title);
                el.body.css({'border-top-left-radius': 0, 'border-top-right-radius': 0})
            } else {
                el.body.css({'border-radius': el.body.css('border-bottom-left-radius')})
            }
            if (opts.width)me.setWidth(opts.width);
            if (opts.height)me.setHeight(opts.height);
            if (opts.left && opts.top) me.setXY(opts.left, opts.top);
            if (opts.cls) el.addClass(opts.cls);
        },
        show: function () {
            this.hide();
            this.element.show(this.options.showTimeDelay);
        },
        hide: function () {
            this.element.hide();
            this._destroy();
        },
        setTitle: function (title) {
            this.getHeader().text(title);
        },
        setXY: function (x, y) {
            var me = this,
                el = me.getElement(),
                opts = me.options;
            if (x && y) {
                el.css({'left': x, top: y});
            } else {
//                var confine = evtRef.closest(opts.containment);
            }
        },
        setWidth: function (value) {
            this.getBody().css({width: value});
        },
        setHeight: function (value) {
            this.getBody().css({height: value});
        },
        getElement: function () {
            return this.element;
        },
        getHeader: function () {
            return this.element.hdr;
        },
        getBody: function () {
            return this.element.body;
        },
        _destroy: function () {
//          $.Widget.prototype.destroy.call(this);
        }
    });
}(jQuery));
// a=[];$('.bs-rule').find('span[role=keyword]').parent().find('span[class=bs-token]').map(function(d,i){console.log($(this).attr('role'),d);a.push($(this).attr('role'));})
