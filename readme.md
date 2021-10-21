# Style Log
*Brought to you by [ParsePixel](http://parsepixel.com)*

#### Adds color to the console.log output to help differentiate between messages for quicker debugging.

`console.style()` handles the formatting of the console.log syntax by adding the css styles and the nessisary additional parameter to add some color in the DevTools console window.

There are multiple ways of applying color to your output to help visually indicate which logs are coming from a particular Class or instance. The simplest way is to choose a background color behind the content and a contrasting font color is automatically applied.

## Useage
There are three different ways to apply css styles:
* `{red}` You can use any of the [140 colors](https://www.w3schools.com/colors/colors_names.asp) by name.
* `{#0000CD}` Use a color's [hex value](https://www.w3schools.com/colors/colors_hex.asp).
* `{term}` Choose from the collection of prefixed style shortcuts `{att}`, `{box}`, `{warn}`, etc.
    * Coming soon the option to create your own styles in an external `json` file.


Substitue `console.log()` with `console.style()` and add the color, hex value, or shortcut term between `{}` brackets before the text you want to style.
```javascript
console.style("Oh on, something went wrong {red}ACHTUNG"); 
console.style("{CornflowerBlue}Can I get the icon in cornflower blue?"); 
```
![Alt text](examples/img/docs_usage1.jpg?raw=true "Substitue console.log")


You can optionally to wrap a section of the string by adding the matching closing bracket of the same name.
```javascript
console.style("This does not have css applied {#0000CD}while this is blue{/#0000CD} and this is not.");
```
![Alt text](examples/img/docs_usage2.jpg?raw=true "Closing bracket")


Can do multiple styles within a single log statment:
```javascript
console.style('Ranked {gold}1st{/gold} with {#FF1493}1940 pts{/#FF1493} more than anyone else.');
```
![Alt text](examples/img/docs_usage3.jpg?raw=true "Multiple colors")


Easily adjust the **Tint** and **Shade** of a color by applying a multiplier. By simply adding `*` follow by a positive or negative number to multiple the value by, you can make the color bright or darker to help indicate a progression of steps.
```javascript
console.style('{blue}submit button clicked');
console.style('{blue*1}send POST request');
console.style('{blue*2}response.data');
console.style('{blue*3}success');
console.style('{blue*4}next');
```
![Alt text](examples/img/docs_usage4.jpg?raw=true "Color multipliers")


More complex css styles are gathered in a small collection of shortcuts that can be used to add some extra pop beyond just coloring the background. Have logs stand out by adding a color stroke around the border, round the end with border-radius, even change the font-size and family to really make it stand out. You can find additional shortcuts exmples and documentation [here](https://github.com/parsepixel/style-log/examples).
'box', 'highlight', 'warn', 'huge', 'att'
```javascript
console.style('Whoops {warn}request error{/warn}');
```
![Alt text](examples/img/docs_usage5.jpg?raw=true "Shortcut terms")
![Alt text](examples/img/docs_usage7.jpg?raw=true "Shortcut examples")


Additional optional arguments passed through the function behaves the same as [console.log()](https://developer.mozilla.org/en-US/docs/Web/API/console/log) arguments and can be any number of JavaScript Objects, Strings, or Arrays displayed in the output.
```javascript
console.style('{green}Cart Items',this.shoppingCart);
```
![Alt text](examples/img/docs_usage6.jpg?raw=true "Additional arguments")


## Installation
```javascript
npm install parsepixel/style-log
```

If you are using **Node.js** and working with environment variables, you can set `STYLE_LOG_ENABLED` to false in Production .env and all the `console.style()` outputs won't be displayed in the DevTools.

Style Log uses RegExp to find and repalce matching opening and closing `{}` brackets and using the console.log `%c` format specifier to apply CSS styles to the content of the log statement. By appending the `style` method to the `window.console` Prototype allows for a single point of control and removes the need to import the library to each file.


## Roadmap
//TODO Move style shortcuts to external script



## License
Code released under the [MIT licence](http://opensource.org/licenses/MIT).