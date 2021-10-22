# Style Log
*Brought to you by [ParsePixel](http://parsepixel.com)*

#### Adds color to the console.log output to help differentiate between messages for quicker debugging.

`console.style()` handles the formatting of the console.log %c syntax by adding the css styles and the nessisary additional parameter to add some color in Chrome and Firefox  DevTools console window.

This library allows for multiple ways of applying color and styles to your output to help visually indicate which logs are coming from a particular Class or instance. The simplest way is by choosing a color that is applied to the background and a contrasting font color is automatically applied.


## Installation
```javascript
npm install parsepixel/style-log
```


## Useage
1. **Syntax** Substitue using `console.log()` for `console.style()`.
2. Use as you normally would the log statement by passing a String, Object, Array, along with any number of arguments.
```javascript
console.log("user: "+user+" currently logged in: " + isLoggedIn() )
console.log("cart",this.cart)
```
Is the same as:
```javascript
console.style("user: "+user+" currently logged in: " + isLoggedIn() )
console.style("cart",this.cart)
```
![Same output](examples/img/docs_useage0.jpg?raw=true "Same output")


3. **Color Options** There are three different ways to apply a css style:
* `{red}` You can use any of the [140 colors](https://www.w3schools.com/colors/colors_names.asp) by name.
* `{#0000CD}` Use a color's [hex value](https://www.w3schools.com/colors/colors_hex.asp).
* `{class}` Choose from a collection of prefixed styles (`{att}`, `{box}`, `{warn}`, etc) that you can also add your own classes to.



4. **Adding Color** Add curly brackets `{}` where you want to startthe style. Then pick a color name, hex value, or shortcut term to go inside the bracket. Everything following will have the color applied until the end of the string.
```javascript
console.style("Oh on, something went wrong {red}ACHTUNG"); 
console.style("{CornflowerBlue}Can I get the icon in cornflower blue?"); 
```
![Substitue console.log](examples/img/docs_useage1.jpg?raw=true "Substitue console.log")




5. **Color Range** You can optionally color just a portion of the string by wrapping the section within a set of brackets. The closing bracket is designated by starting off with `\` followed by the same name or value of the starting bracket.
```javascript
console.style("This does not have css applied {#0000CD}while this is blue{/#0000CD} and this is not.");
```
![Closing bracket](examples/img/docs_useage2.jpg?raw=true "Closing bracket")



6. **Optional Arguments** Additional arguments passed through the function, behaves the same as [console.log()](https://developer.mozilla.org/en-US/docs/Web/API/console/log) arguments and can be any number of JavaScript Objects, Strings, or Arrays displayed in the output.
```javascript
console.style('{green}Cart Items',this.shoppingCart);
```
![Additional arguments](examples/img/docs_useage6.jpg?raw=true "Additional arguments")


## Options
1. Can apply multiple styles within a single log statment:
```javascript
console.style('Ranked {gold}1st{/gold} with {#FF1493}1940 pts{/#FF1493} more than anyone else.');
```
![Multiple colors](examples/img/docs_useage3.jpg?raw=true "Multiple colors")



2. **Color Shift** Easily adjust the **Tint** and **Shade** of a color by applying a multiplier. By simply adding `*` follow by a positive or negative number to multiple the value by, you can make the color bright or darker to help indicate a progression of steps.
```javascript
console.style('{blue}submit button clicked');
console.style('{blue*1}send POST request');
console.style('{blue*2}response.data');
console.style('{blue*3}success');
console.style('{blue*4}next');
```
![Color multipliers"](examples/img/docs_useage4.jpg?raw=true "Color multipliers")

*Tip*
The multiplier can be added dynamically to help keep track of iterations easier.
```javascript
console.style('{red*'+i'}loop{/red'+i+'}: '+i+' finished');
```
![Iterations](examples/img/docs_useage8.jpg?raw=true "Iterations")



3. **Classes** A small collection of classes ('box', 'att', 'warn', 'highlight', 'huge') comes prepackaged with the libray of more complex css that give some extra visual pop beyond just coloring the background.
![Term examples](examples/img/docs_useage7.jpg?raw=true "Term examples")

* Coming soon in 2.0 you will have the option to create your own classes in an external `json` file that will be optional to add, keeping the filesize down.
Not all css properties will work in these styles, but you can have log output stand out by adding a color stroke around the `border`, make a circle by roudning the corners with adjusting `border-radius`, even change the `font-size` and `font-family` to really make it stand out. A full list of accepted css properties can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output).
```javascript
console.style('Whoops {warn}request error');
```
![Warn class example](examples/img/docs_useage5.jpg?raw=true "Warn class example")





## Toggeling Output
1. At runtime the output can be disabled from showing up in the DevTools console window by calling the `enabled` getter/setter and setting it to `false`. You can do the opposite and enable the output during a particular time of your code.
```javascript
//check getting if enabled and toggle off
if(console.enabled){
    console.enabled = false;
}
```
```javascript
function onClick(){
    //turn on output
    console.enabled = true;
    console.style("{warn}!!User Interaction!!")
    ....
}
```

2. If you are using **Node.js** and working with environment variables in an `.env` file, you can set `STYLE_LOG_ENABLED` property to false in the production .env and all the `console.style()` outputs won't ever be displayed, regardless if enabled being set to `true` at runtime.


## How It Works
Style Log uses RegExp to find and repalce matching opening and closing `{}` brackets and using the console.log `%c` format specifier to apply CSS styles to the content of the log statement. By appending the `style` method to the `window.console` Prototype allows for a single point of control and removes the need to import the library to each file.


## Roadmap
2.0
* Move style classes to optional external json file to keep filesize down as well as allow to add user custom styles. 
* Fix `.env` process.env to toggle output in different environments.


## License
Code released under the [MIT licence](http://opensource.org/licenses/MIT).