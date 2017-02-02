# [Dom Manipulator](https://www.npmjs.com/package/dom-manipulator)

[![npm version](https://badge.fury.io/js/dom-manipulator.svg)](https://badge.fury.io/js/dom-manipulator)

The Dom Manipulator allows you to manipulate HTML elements simply and objectively without unnecessary attributes. 

## Using Dom Manipulator you can:
  - Find elements using the class, id, tagname or attribute;
  - Set new class or remove a class;
  - Obtain a object using parse form function.

### Installation
#### Using like a library
```sh
$ git clone https://github.com/mpahenrique/dom-manipulator.git
```
```HTML
<body>
...
...
<script src="path/to/dom-manipulator/index.js"></script>
</body>
```

#### Using like a module
```sh
$ npm install dom-manipulator --save
```

### Usage (Getting Dom Manipulator method)
#### Using like a library
```js
  dm.somedmMethod('#my-element'); // When using like a library dm is global (window.dm)
```

### Usage
#### Using like a module
```js
var dm = require('dom-manipulator');
```

### Methods
```js
'use strict';

var _elm  = dm.getElm('#my-element')
// ==> Get the element {optional: ['all'(boolean: return all selectors), 'key'(integer: select the position), 'searchIn'(string: search the element inside a node)]}

dm.toggleClass(_elm,'classToggle')
// ==> This function, verify if 'classToToggle' existy, in true case, they remove the class, otherwise add the class

dm.hasClass(_elm,'verifyClass')
// ==> Return a boolean if the element has class

dm.addClass(_elm,'classRemove')
// ==> Add the class

dm.removeClass(_elm,'classRemove')
// ==> Remove the class

dm.parseForm('#form-element')
// ==> Return a object with name (as key) and the value of elements

dm.byAttr('tabindex')
// ==> Return elements with the atrribute. {optional: ['value'(string: search the attribute with the same value), 'elms(DOMObject: search elements with the attribute in a element father)']}

dm.bindElm(_elm, 'click', callback)
// ==> Binding a element with a event

dm.setStyleProp(_elm, 'border', '20px solid red')
// ==> Setting a style inline to element and you cam pass the style properties as a Object, like as: {'border': '2px solid yellow', 'margin-top': '20px', 'overflow':'auto'}. {optional: ['time'(integer: pass a time, in milliseconds, to call the callback), 'onFinish'(Function: A Callback)]}

dm.getUrlParam()
// ==> Get the url params and return as a Object {optional: ['url'(string: pass a url with params to get the Object return, by default they get window.location)]}

dm.remove(_elm) /* or */ dm.remove('.my-other-element');
// ==> Remove the elements {optional: ['start'(Integer: Pass the index to start the remove itens)]}

```