function _(sel, all, key, searchIn){
    searchIn = typeof searchIn == 'string' ? _(searchIn) : searchIn;
    searchIn = (!sel.match(/^#/) && searchIn) || document;
    if(sel.match(/^#/)){
        return searchIn.getElementById(sel.replace(/^#/, ''));
    } else if (sel.match(/^\./)){
        var el = searchIn.getElementsByClassName(sel.replace(/^\./, ''));
        return all ? el : el[key || 0];
    } else {
        var el = searchIn.getElementsByTagName(sel)
        return all ? el : el[key || 0];
    }
}

function _tC(elm, newC){
    var current = elm.className
    ,   filter = new RegExp('^'+newC+'$|^'+newC+' | '+newC+'$| '+newC+' ');
    elm.className = current.match(filter) ? current.replace(filter, '') : (current + ' ' + newC);
}

function _hC(elm, c){
    
    return $testString(c, elm.className);
}

function _rC(elms, c){
    elms = Array.isArray(elms) || $isNodeList(elms) ? elms : [elms];
    var filter = new RegExp('^'+c+'$|^'+c+' | '+c+'$| '+c+' ');
    for(var i = 0, lgt = elms.length; i < lgt; i++){
        elms[i].className = (elms[i].className || '').replace(filter, '');
    }
}

function _pF(elms){
    elms = (typeof elms == 'string') ? _(elms) : elms;
    var data = {}
    ,   inputs = $htmlColToArray(_('input', true, false, elms))
    ,   selects = $htmlColToArray(_('select', true, false, elms))    
    ,   textareas = $htmlColToArray(_('textarea', true, false, elms))
    ,   all = inputs.concat(selects.concat(textareas));
    
    for (var i = 0, lgt = all.length; i < lgt; i++){
        var elm = all[i];
        if(!elm.name) continue;
        if(data[elm.name]){
            if(!elm.checked) continue;
            if(typeof data[elm.name] == 'string'){
                data[elm.name] = [data[elm.name], elm.value];
            } else {
                data[elm.name].push(elm.value);
            }
            continue;
        }
        if((elm.type == 'checkbox' || elm.type == 'radio') && !elm.checked) continue;
        data[elm.name] = elm.value;
    }
    return data;
}

function _bA(attr, value, elms){
    elms = elms || document;
    var search = elms.getElementsByTagName('*')
    ,   found = [];

    for (var i = 0, lgt = search.length, cur = search[i]; i < lgt; i++, cur = search[i]) {
        if(!cur.attributes[attr]) continue;
        if(value && cur.attributes[attr].value != value) continue;
        found.push(cur);
    }

    return found.length == 1 ? found[0] : found;
}

function _bE(elms, evt, callback){
    if(typeof elms == 'string') elms = _(elms);
    evt = evt.split(' ');
    elms = Array.isArray(elms) || $isNodeList(elms) ? elms : [elms];
    for(var i = 0, lgt = elms.length; i < lgt; i++){
        for(var j = 0, jlgt = evt.length; j < jlgt; j++){
            elms[i].addEventListener(evt[j], callback);
        }
    }
}

function _tBAR(elms, attr, min, max, options){
    options = options || {
        property     : 'transform',
        show         : 'scale(1)',
        hide         : 'scale(0)'
    }
    
    var visibles = [];    
    min = Number(min);
    max = Number(max);

    for(var i = 0, lgt = elms.length, elm = elms[0]; i < lgt; i++, elm = elms[i]){
        var attrVal = Number(elm.getAttribute(attr).replace(/[\.\ ]+/g, '').replace(/\,/, '.').replace('.00', ''));
        if( !(attrVal >= min && attrVal <= max) ){
            _sSP(elm, 'display', 'none', function(elm){
                elm.style[options.property] = options.hide;
            }, 500);              
            continue;
        }
        visibles.push(elm);
        _sSP(elm, 'display', 'block', function(elm){
            elm.style[options.property] = options.show;
        }, 500);
    }
    return visibles;
}

function _tBAV(elms, attr, values, options){
    var visibles = [],
        showAll  = false;
    if(!values || !values[0]) showAll = true;
    
    options = options || {}
    values = Array.isArray(values) ? values : [values];

    for(var i = 0, lgt = elms.length, elm = elms[0]; i < lgt; i++, elm = elms[i]){
        var attrVal = elm.getAttribute(attr);
        for(var j = 0, lgt2 = values.length, value = values[0]; j < lgt2; j++, value = values[j]){
            if(showAll || attrVal == value) {
                if(!options.justHide) {
                    _sSP(elm, 'display', 'block', function(elm){
                        elm.style.transform = 'scale(1)';
                    }, 500);
                }
                visibles.push(elm);
                break;
            }
        }
        _sSP(elm, 'display', 'none', function(elm){
            elm.style.transform = 'scale(0)';
        }, 500);
    }
        
    return visibles;
}

function _sSP(elm, property, value, onFinish, time, isToInitial){
    elm.style[property] = value;
    elm.className += ' animation-happening'
    onFinish && setTimeout(function(){
        onFinish(elm);
    }, time);
}

function _gpu(url){
    url = (url.split('?').length == 1) ? url.split('?')[0] : url.split('?')[1];
    var param  = {}
    ,   params = url.split('&');

    for (var i = 0, lgt = params.length; i < lgt; i++) {
        splitParam = params[i].split('=');
        if (typeof param[splitParam[0]] == 'string') {
            param[splitParam[0]] = (param[splitParam[0]] == '') ? (splitParam[1] || '') : ((!splitParam[1]) ? param[splitParam[0]] + '' : param[splitParam[0]] + ',' + splitParam[1]);
        } else {
            param[splitParam[0]] = (splitParam.length == 1) ? '' : splitParam[1];
        }
    }
    return param;
}

function $testString(filter, string){
    return (new RegExp('^'+filter+'$|^'+filter+' | '+filter+'$| '+filter+' ')).test(string)
}

function $isNodeList(nodes) {
    var stringRepr = Object.prototype.toString.call(nodes);

    return typeof nodes === 'object' &&
        /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
        (typeof nodes.length === 'number') &&
        (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
}

function $htmlColToArray(collection){
    if(collection && collection.length == 0) return [];
    if(collection && !collection.length) return [collection];
    var elms = [];
    for(var i = 0, lgt = collection.length; i < lgt; i++){
        elms.push(collection[i]);
    }
    return elms;
}

var dmIe8 = window.isIe8 && require('./dom-manipulator-ie8');


module.exports = {
    _                  : _,
    _toggleClass       : _tC,
    _removeClass       : _rC,
    _hasClass          : _hC,
    _parseForm         : _pF,
    _byAttr            : !window.isIe8 ? _bA : dmIe8._bA,
    _bindElm           : !window.isIe8 ? _bE : dmIe8._bE,
    _toggleByAttrRange : _tBAR,
    _toggleByAttrValue : _tBAV,
    _setStyleProp      : _sSP,
    _getUrlParam       : _gpu
}