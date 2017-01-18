# Dom Manipulator
The Dom Manipulator allows you to manipulate HTML elements simply and objectively without unnecessary attributes. 

Using Dom Manipulator you can:
  - Find elements using the class, id, tagname or attribute;
  - Set new class or remove a class
  - Obtain a object by a parsing a form element.

### Installation
```sh
$ git clone https://github.com/mpahenrique/dom-manipulator.git
$ cd dom-manipulator
$ npm install
```

### Starting
```js
'use strict';

var domManipulator = require('recursivejs');

var _elm  = _._('theElement') ==> Get the element
,   _form = _._('form');

  - domManipulator._toggleClass(_elm,'classToggle') ==> This function, verify if 'classToToggle' existy, in true case, they remove the class, otherwise add the class
  - domManipulator._removeClass(_elm,'classRemove') ==> Remove the class
  - domManipulator._hasClass(_elm,'verifyClass') ==> Return a boolean if the element has class
  - domManipulator._parseForm(_form) ==> Return a object with name (as key) and the value of elements
  - domManipulator._byAttr('tabindex') ==> Return elements with the atrribute. You can pass a value and a father element to filter your search
  - domManipulator._bindElm(_elm, 'click', function(){console.log('click')}) ==> Binding a element with a event
  - domManipulator._setStyleProp(_elm, 'border', '20px solid red') ==> Setting a style inline to element
  - domManipulator._getUrlParam() ==> Get the url params and return as a Object
```

