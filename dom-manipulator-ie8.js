HTMLDocument.prototype.getElementsByClassName = function(sel){
    return this.querySelectorAll('.'+sel);
}

function _(sel, all, key, searchIn){
    // searchIn = typeof searchIn == 'string' ? _(searchIn) : searchIn;
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

!window.addEventListener && (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
    WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
        var target = this;

        registry.unshift([target, type, listener, function (event) {
            event.currentTarget = target;
            event.preventDefault = function () { event.returnValue = false };
            event.stopPropagation = function () { event.cancelBubble = true };
            event.target = event.srcElement || target;

            listener.call(target, event);
        }]);

        this.attachEvent("on" + type, registry[0][3]);
    };

    WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
        for (var index = 0, register; register = registry[index]; ++index) {
            if (register[0] == this && register[1] == type && register[2] == listener) {
                return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
            }
        }
    };

    WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
        return this.fireEvent("on" + eventObject.type, eventObject);
    };
})(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);

function _bA(attr, value, elms){
    elms = elms || document;
    var search = elms.getElementsByTagName('*')
    ,   found = [];

    for (var i = 0, lgt = search.length, cur = search[i]; i < lgt; i++, cur = search[i]) {
        if(cur.attributes && !cur.attributes[attr]) continue;
        if(value && cur.attributes[attr].value != value) continue;
        found.push(cur);
    }

    return found.length == 1 ? found[0] : found;
}

function _bE(elms, evt, callback){
    if(typeof elms == 'string') elms = _(elms);
    evt = evt.split(' ');
    elms = Array.isArray(elms) || $isNodeList(elms) ? elms : [elms];
    for(var i = 0, lgt = (elms.tagName === 'SELECT') ? 1 : elms.length; i < lgt; i++){
        for(var j = 0, jlgt = evt.length; j < jlgt; j++){
            if (elms.tagName === 'SELECT') {
                elms.addEventListener(evt[j], callback);
            } else {
                elms[i].addEventListener(evt[j], callback);
            }
        }
    }
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

module.exports = {
    _bA : _bA,
    _bE : _bE
}