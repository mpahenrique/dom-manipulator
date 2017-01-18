function getElm(sel, all, key, searchIn){
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

function toggleClass(elm, newC){
    var current = elm.className
    ,   filter = new RegExp('^'+newC+'$|^'+newC+' | '+newC+'$| '+newC+' ');
    elm.className = current.match(filter) ? current.replace(filter, '') : (current + ' ' + newC);
}

function hasClass(elm, c){
    
    return $testString(c, elm.className);
}

function removeClass(elms, c){
    elms = Array.isArray(elms) || $isNodeList(elms) ? elms : [elms];
    var filter = new RegExp('^'+c+'$|^'+c+' | '+c+'$| '+c+' ');
    for(var i = 0, lgt = elms.length; i < lgt; i++){
        elms[i].className = (elms[i].className || '').replace(filter, '');
    }
}

function parseForm(elms){
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

function byAttr(attr, value, elms){
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

function bindElm(elms, evt, callback){
    if(typeof elms == 'string') elms = getElm(elms);
    evt = evt.split(' ');
    elms = Array.isArray(elms) || $isNodeList(elms) ? elms : [elms];
    for(var i = 0, lgt = elms.length; i < lgt; i++){
        for(var j = 0, jlgt = evt.length; j < jlgt; j++){
            elms[i].addEventListener(evt[j], callback);
        }
    }
}

function setStyleProp(elm, property, value, onFinish, time, isToInitial){
    elm.style[property] = value;
    elm.className += ' animation-happening'
    onFinish && setTimeout(function(){
        onFinish(elm);
    }, time);
}

function getUrlParam(url){
    url = url || window.location.href;
    
    if(typeof url !== 'string') throw new Error('Url must be a string!');    

    var spl = url.split('?');

    url = (spl.length === 1) ? spl[0] : spl[1];
    var param  = {}
    ,   params = url.split('&');

    for (var i = 0, lgt = params.length; i < lgt; i++) {
        var splitParam = params[i].split('=')
        ,   curKey   = splitParam[0]
        ,   curValue = splitParam[1];
    
        if(!curKey) continue;

        if (param[curKey]) {
            if (!Array.isArray(param[curKey])){
                param[curKey] = [ param[curKey] ];
            }
            param[curKey].push(curValue || '');
            continue;
        }
        param[curKey] = curValue || '';
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

var domManipulator = {
    _                  : getElm,
    _toggleClass       : toggleClass,
    _removeClass       : removeClass,
    _hasClass          : hasClass,
    _parseForm         : parseForm,
    _byAttr            : byAttr,
    _bindElm           : bindElm,
    _setStyleProp      : setStyleProp,
    _getUrlParam       : getUrlParam
}

try {
    module.exports = domManipulator;
} catch(err){
    // using like a library
    window._ = domManipulator;
}