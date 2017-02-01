# Dom Manipulator
The Dom Manipulator allows you to manipulate HTML elements simply and objectively without unnecessary attributes. 

## Using Dom Manipulator you can:
  - Find elements using the class, id, tagname or attribute;
  - Set new class or remove a class
  - Obtain a object by a parsing a form element.

### Installation
```sh
$ git clone https://github.com/mpahenrique/dom-manipulator.git
$ cd dom-manipulator
$ npm install
```

### Usage
```js
'use strict';

var domManipulator = require('dom-manipulator');

var _elm  = domManipulator._('theElement')
> ==> Get the element {optional: ['all'(boolean: return all selectors), 'key'(integer: select the position), 'searchIn'(string: search the element inside a node)]}

var _form = domManipulator._('form');

domManipulator._toggleClass(_elm,'classToggle')
// ==> This function, verify if 'classToToggle' existy, in true case, they remove the class, otherwise add the class

domManipulator._hasClass(_elm,'verifyClass')
// ==> Return a boolean if the element has class

domManipulator._addClass(_elm,'classRemove')
// ==> Add the class

domManipulator._removeClass(_elm,'classRemove')
// ==> Remove the class

domManipulator._parseForm(_form)
// ==> Return a object with name (as key) and the value of elements

domManipulator._byAttr('tabindex')
// ==> Return elements with the atrribute. {optional: ['value'(string: search the attribute with the same value), 'elms(DOMObject: search elements with the attribute in a element father)']}

domManipulator._bindElm(_elm, 'click', function(){console.log('click')})
// ==> Binding a element with a event

domManipulator._setStyleProp(_elm, 'border', '20px solid red')
// ==> Setting a style inline to element and you cam pass the style properties as a Object, like as: {'border': '2px solid yellow', 'margin-top': '20px', 'overflow':'auto'}. {optional: ['time'(integer: pass a time, in milliseconds, to call the callback), 'onFinish'(Function: A Callback)]}

domManipulator._getUrlParam()
// ==> Get the url params and return as a Object {optional: ['url'(string: pass a url with params to get the Object return, by default they get window.location)]}

domManipulator.remove(_._('theElement'))
// ==> Remove the elements {optional: ['start'(Integer: Pass the index to start the remove itens)]}

```

