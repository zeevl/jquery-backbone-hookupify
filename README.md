# jquery-backbone-hookupify

Small browserify transform to hook up Backbone with jQuery.

## The problem

When building a module using Browserify that has dependencies on both Backbone and jQuery,
you would require them just as you would any other module:

```
$ = require('jquery');
Backbone = require('backbone')
```

Unforutnately, you also have to tell Backbone in every module how to find jQuery:

```
Backbone.$ = $
```

This line gets repeated in every module that references jQuery and backbone, which 
in most projects is every module.   

Not very DRY. 

## The solution 

Include `jquery-backbone-hookupify` in your browserify transforms!

```
npm install --save-dev jquery-backbone-hookupify
```

Then pass `-t jquery-backbone-hookupify` to browserify 

```
browserify -t coffeeify foo.coffee > bundle.js
````

Any files that require jquery and require backbone will have `Backbone.$ = $` 
inserted immediately after you require backbone.

(note: you should include jQuery before requiring backbone!)

Works with both coffeescript and native js. 

