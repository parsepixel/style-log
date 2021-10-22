import Color from "@parsepixel/color";

(function(window){
    "use strict";

    /* console.style([attribute], [...attributes])
    */
    function StyleLog(){
        if(window.console.enabled && arguments){
            if(typeof arguments[0] === 'string'){
                let message = Array.prototype.shift.apply(arguments); //<-- removes first arg from arguments

                let _rx = new RegExp(`{(.*?)}`,'g');

                let result, _priorCopy, _open, _closed;
                let _sections = [];
                let _bracketSets = [];
                while((result = _rx.exec(message)) !== null) {
                    _bracketSets.push(result);
                }
                let _index = 0;
                if(_bracketSets.length > 0){

                    //Check if single bracket and colorize whole line
                    if(_bracketSets.length == 1){
                        _open = _bracketSets[0];
                        _priorCopy = message.slice(_index, _open.index);

                        _sections.push(['%c'+_priorCopy,'']);

                        let _remainingCopy = message.slice( _open.index +_open[0].length);
                        _sections.push(['%c'+_remainingCopy, getStyle(_open[1])]);

                    } else {
                        for(var i=0; i < _bracketSets.length; i+=2){
                            _open = _bracketSets[i];
                            _closed = _bracketSets[i+1];
                            if('/'+_open[1] == _closed[1]){
                                //Set has matching color value
                
                                //Grab string before bracket
                                _priorCopy = message.slice(_index, _open.index);
                                _sections.push(['%c'+_priorCopy,'']);
                
                                let _coloredCopy = message.slice(_open.index + _open[0].length, _closed.index);
                                
                                _sections.push(['%c'+_coloredCopy, getStyle(_open[1])]);
                
                                _index = _closed.index + _closed[0].length; //<- Move index to end of closing bracket
                            }
                        }
                        if(_index != message.length){
                            //Add any additional copy after styled section
                            _sections.push(['%c'+message.slice(_index, message.length),'']);
                        }
                    }
            
                    //Build output with %c styling
                    if(_sections.length > 0){
                        var _outputCopy = '', _outputStyle = '';
                        for(var i=0; i<_sections.length;i++){
                            _outputCopy += _sections[i][0];
                            _outputStyle += '"'+_sections[i][1]+'"';
                            if(i != _sections.length -1)  _outputStyle += ","; // adds comma except final output
                        }
                        if(arguments){
                            eval('console.log("'+_outputCopy+'",'+_outputStyle+',...arguments)');
                        } else {
                            // Old attempts for reference
                            // Function.prototype.apply.call(console.log, console, Array.prototype.slice.call( eval('["'+_outputCopy+'",'+_outputStyle+']') ));
                            // Function.prototype.apply.call(console.log, console, eval('["'+_outputCopy+'",'+_outputStyle+']') );
                            // Function.prototype.apply.call(console.log, console, Array.prototype.slice.call(arguments));
                            eval('console.log("'+_outputCopy+'",'+_outputStyle+')');
                        }
                    } else {
                        console.log(message, ...arguments);
                    }
                    
                } else {
                    console.log(message, ...arguments);
                }
            }
        }
    }

   

    function getStyle(type){
        let _style = '';

        let colorName = type;
        let multiplierIndex = type.indexOf('*');
        let modifier = 0;

        if(multiplierIndex !== -1){
            //color has * multiplier after the name
            colorName = type.slice(0,multiplierIndex);
            let value = parseInt(type.slice(multiplierIndex+1));
            //step up the increment so *1 actually is different than native color
            modifier = value < 0 ? (value - 1)/10 :  (value + 1)/10;
        }

        //check if string is actually a color
        let validColor = false;
        const s = new Option().style;
        s.color = colorName;
        if(s.color !== ''){
            validColor = true;
        }

        //TODO 2.0 Move style shortcuts. Add user custom styles to external script
        //TODO 2.0 With out/in also append to the start of the bracket those gliphs/acsii code?
        switch(colorName){
            case 'box':
                _style = 'border:2px solid orange; border-radius:3px; padding:1px;';
                break;
            case 'highlight':
                _style = 'background: #bada55; color: #000000; padding: 2px; border-radius:2px;';
                break;
            case 'huge':
                _style = 'font-size:20px;';
                break;
            case 'att':
                _style = 'background:#4d4d4d; padding: 3px; color: #feffb8; border-radius:4px; border:1px solid #8a8a8a;';
                break;
            case 'warn':
                _style = 'background:#d60b0b; padding: 3px; color: #fff; border-radius:4px; border:1px solid #fff;';
                break;
            case 'out':
                _style = '→';
                break;
            case 'in':
                _style = '←';
                break;
            default:
                if(validColor){
                    let displayColor = colorName;
                    if(modifier !== 0){
                        let _a = Color.normalizeRGB(colorName);
                        let _rgb = "rgb("+_a.r+","+_a.g+","+_a.b+")";
                        displayColor = Color.linearShade(_rgb, modifier);
                    }
                    _style = 'padding:1px; background:'+displayColor+'; color:'+Color.getContrastTone(typeof _a !== 'undefined'?_a:colorName)+';';
                } else {
                    _style = '';
                }
                break;
        }
        return _style;
    }

    //Getters and Setters
    window.console.getEnabled = function(){ return window.console._enabled; };
    window.console.setEnabled = function(b){ window.console._enabled = b; };
     
    try {
        Object.defineProperties(window.console, {
            enabled			    : { get: window.console.getEnabled,
                                    set: window.console.setEnabled }
        });
    } catch (e) {}

    //Sanitize environment vars to toggle displaying console.style 
    if(!!process.env.STYLE_LOG_ENABLED && isNaN(Number(process.env.STYLE_LOG_ENABLED))){
        window.console.enabled = process.env.STYLE_LOG_ENABLED.toString().toLowerCase() === 'true';
    } else if(!Number.isNaN(Number(process.env.STYLE_LOG_ENABLED))){
        window.console.enabled = Boolean(Number(process.env.STYLE_LOG_ENABLED));
    } else {
        window.console.enabled = true;
    }

    window.console.style = StyleLog;

})(window);