var MO = MO || {};
MO.namespace = function(name)
{
	var parts   = name.split('.');
	var current = MO;
	for (var i in parts)
	{
		if (!current[parts[i]])
		{
			current[parts[i]] = {};
		}
		current = current[parts[i]];
	}
}

/*
* @Credits: http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml
* @date; July 13, 2011; 14:24
* @modified by: Michael Orji
*/
var filesadded="" //list of files already added

/*
* Determines if file already exists in the page
*/
function fileExists(filename, filetype)
{
	if (filesadded.indexOf( "[" + filename + "@" + filetype + "]" ) == -1)
	{
		filesadded += "[" + filename + "@" + filetype + "]," //List of files added in the form "[filename1@js],[filename2@css],etc" I -- (Michael O.) -- added the @ symbol and the comma(,) incase a situation arises where I need to split() the string into an array
		return false;
	}
	return true;
}

/*
* removes a file from the page
* Arguments:
*   String name of file
*   String type of file
* @credits: http://www.javascriptkit.com/javatutors/loadjavascriptcss2.shtml
* @date: Feb 28, 2012
* @modified by: Michael Orji
*/
function removeFile(filename, filetype){
 var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
 var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
 var allsuspects=document.getElementsByTagName(targetelement)
   for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
      if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1){
       allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
      }
   }
}

/*
* Dynamically loads a server-side (php) script into the current page, script must return valid javascript 
* Arguments: 
*    Array files to add, 
*    boolean specifying whether to overwrite the file if it already exists in the page
* Not to be called directly, as it is used by the $_JS function internally
* @date: March 13, 2012
*/
function $PHP_JS(JSPHPFilesArray, overWrite){

   var str = ''; 
 
   for(var i in JSPHPFilesArray){ 
      
      if(overWrite){
         if(fileExists(JSPHPFilesArray[i], "php") ){ 
          removeFile(JSPHPFilesArray[i], "php");
         }
         if(JSPHPFilesArray[i].indexOf('.php') == -1){
            JSFilesArray[i] += '.php';
          } 
      }

      if( !fileExists(JSPHPFilesArray[i], "php") ){ //call the fileExists function to include the current 'js' file in the 'filesadded' string
          if(JSPHPFilesArray[i].indexOf('.php') == -1){
            JSPHPFilesArray[i] += '.php';
          } 
      } 

     var JSLink = document.createElement("script");
     JSLink.setAttribute("type", "text/javascript");
     JSLink.setAttribute("src", JSPHPFilesArray[i]);

      if(typeof JSLink != "undefined"){
       document.getElementsByTagName("head")[0].appendChild(JSLink);
      } 
   }
}

/*
* Dynamically loads a javascript file into the current page,
* Arguments: 
*   array  files to add, 
*   boolean specifying whether to overwrite the file if it already exists in the page, 
*   boolean specifying if the file is a serverside (php) script
* @author: michael orji
* @date: Oct 2, 2010
* @modified: Feb 28, 2012
*/
function $JS(JSFilesArray, overWrite, isPHPFile){

   if(isPHPFile){
    $PHP(JSFilesArray, overWrite);
    return;
   }

 var str = ''; 
 
   for(var i in JSFilesArray){ 
      
      /*
      * if the file already exists (in the 'filesadded' string) and we're overwriting the file in the document tree, 
      * we pull it out from the document tree,  
      * then re-insert it into the tree, this way, we remain consistent in the 'filesadded' string since we don't alter (i.e remove it from)
      * the string when we remove the file from the document tree,
      */
      if(overWrite){
         if(fileExists(JSFilesArray[i], "js") ){ 
          removeFile(JSFilesArray[i], "js");
         }
         if(JSFilesArray[i].indexOf('.js') == -1){
            JSFilesArray[i] += '.js';
          } 
      }

      if( !fileExists(JSFilesArray[i], "js") ){ //call the fileExists function to include the current 'js' file in the 'filesadded' string
          if(JSFilesArray[i].indexOf('.js') == -1){
            JSFilesArray[i] += '.js';
          } 
      } 

     var JSLink = document.createElement("script");
     JSLink.setAttribute("type", "text/javascript");
     JSLink.setAttribute("src", JSFilesArray[i]);

      if(typeof JSLink != "undefined"){
       document.getElementsByTagName("head")[0].appendChild(JSLink);
      } 
   }
}


/*
* dynamically loads css stylesheets
* @argument - array of css files to load
* @author: michael orji
* @date: sept 29, 2010
* based on ajax_im's ajax_im.js
*/
function $CSS(cssFilesArray){
   
   for(var i in cssFilesArray){
      if( !fileExists(cssFilesArray[i], "css") ){
       var CSSLink = document.createElement("link");
       CSSLink.setAttribute("rel", "stylesheet");
       CSSLink.setAttribute("type", "text/css");

         if(cssFilesArray[i].indexOf('.css') == -1){
          cssFilesArray[i] += '.css';
         }
   
       CSSLink.setAttribute("href", cssFilesArray[i]);
     
         if(typeof CSSLink != "undefined"){
          document.getElementsByTagName("head")[0].appendChild(CSSLink);
         }
      }
   }
}


/*
* Wrapper function for document.getElementsByTagName
* Argument: HTML element tag name
*/
function $Tag(tagName)
{
	var that = (this == window) ? document : this;
	return ( (tagName) ? that.getElementsByTagName(tagName) : that.getElementsByTagName('*') );
}

/*
* Wrapper function for document.getElementById
* Argument: HTML element id or DOM object reference
*/
function $O(elem)
{
	var obj = null;
	
	if(isObject(elem))
	{
		obj = elem;
	}
	
	else if($ID(elem))
	{
		obj = $ID(elem);
	}
	
	else
	{
		obj =  $ID(String(elem));
	}

	function $ID(elemId)
	{
		return document.getElementById(elemId);
		//return typeof elemId=='string'?document.getElementById(elemId):elemId;
	}
   
	return obj;
}

/*
* returns the style property of supplied element
* Argument: HTML element id or reference
*/
function $Style(elem)
{
	return $O(elem).style;
}

/* 
* gets (and optionally sets) the innerHTML value of element
* Argument[s]
*    HTML element id or reference
*    String value : optional 
* if the optional value is supplied, the element's inner HTML value is set to the supplied value and then returned
* otherwise, the current innerHTML value is returned
*/
function $Html(id, value)
{
	if (typeof value != 'undefined')
	{
		$O(id).innerHTML = value
	}
	
	return $O(id).innerHTML
}

function append(id, value)
{
	if ( typeof value != 'undefined' )
	{
  		$O(id).innerHTML += value
	}
}

/* gets or sets the innerText / textContent value of element
* Argument[s]
*    HTML element id or reference
*    String value : optional 
* if the optional value is supplied, the element's innerText value is set to the supplied value and then returned
* otherwise, the current innerText value is returned
*/
function $Text(elem, val)
{ 
	elem = $O(elem);
	var tc = '';

	if(typeof elem.textContent !== 'undefined')
	{
		if(typeof val === 'string')
		{
			elem.textContent = val;
		}
		tc = elem.textContent;
	}
	
	else
	{
		if(typeof val === 'string')
		{
			elem.innerText = val;
		}
		tc = elem.innerText;
	} 
	return tc;
}

/*
* returns a collection of every element with the supplied css class name
* Arguments:
*    String css class name
*    boolean 
*/ 
function $Class(cssClassName, strict)
{
	var arr = [];
	var that = (this == window) ? document : this;
	var candidates = that.getElementsByTagName('*');
	var len = candidates.length;
	
	for(var i = 0; i < len; i++)
	{
		if(strict)
		{
			if(candidates[i].className == cssClassName)
			{
				arr.push(candidates[i]);
			}
		}
		
		else
		{
			if( (candidates[i].className.indexOf(cssClassName) != -1) || (candidates[i].className == cssClassName) )
			{
				arr.push(candidates[i]);
			}
		}
	}
	
	return arr;
}

/*
* returns style properties of an element
* cf: slider.js for example usage
* @date: October 7, 2012
*
* Nov. 21, 2015: TO DO: augment to return more than just style properties
*/
function $properties(element)
{
	element                   = $O(element);
	element.displayType       = getDisplayType(element); 
	element.displayValue      = getStyleValue(element, element.displayType);
	element.visibilityValue   = (element.displayType == 'visibility') ? 'visible' : 'block';
	element.invisibilityValue = (element.displayType == 'visibility') ? 'hidden'  : 'none';
	element.isHidden          = (element.displayValue == element.invisibilityValue)  ? true : false;
  
	return element;
}

/*
* centers an element on the page
* @author: Michael Orji
* @date: August 25, 2012
*/
function $Center(elem)
{
	elem = $O(elem);

	var elemDimensions = size(elem);
	var elemWidth      =  parseInt(elemDimensions.width)  || parseInt(getStyleValue(elem, 'width')); 
	var elemHeight     =  parseInt(elemDimensions.height) || parseInt(getStyleValue(elem, 'height'));
	var bDimensions    = Browser.Window.size();
	var bWidth         = parseInt(bDimensions.width);
	var bHeight        = parseInt(bDimensions.height);
	var xPos           = (bWidth - elemWidth)   * 0.5;
	var yPos           = (bHeight - elemHeight) * 0.5;

	var parent = elem.parentNode ? elem.parentNode : document.body;
	var removed = parent.removeChild(elem); //remove the child, so that when we later position it absolutely, it won't be in reference to the parent element which may have a relative positioning
 
	$Style(removed).position = 'fixed';
	$Style(removed).left     = xPos + 'px';
	$Style(removed).top      = yPos + 'px';

	document.body.appendChild(removed);
}

$Opacity = function(elemId, opacityLevel)
{
	var elem = $O(elemId);
	if(opacityLevel > .99) opacityLevel = .99;
	if(opacityLevel < 0) opacityLevel = 0;

   if(typeof elem.style.opacity != 'undefined') elem.style.opacity = opacityLevel;
   else if(typeof elem.style.MozOpacity != 'undefined') elem.style.MozOpacity = opacityLevel;
   else if(typeof elem.style.KhtmlOpacity != 'undefined') elem.style.KhtmlOpacity = opacityLevel;
   else elem.style.filter = "alpha(opacity=" + opacityLevel * 100 + ")";
}

/* 
*removes leading and trailing spaces from string 
*/
function trim(s)
{
	return ( (typeof s == 'string') ? s.replace(/(^\s+)|(\s+$)/g, "") : s );
}

/* 
* remove leading and trailing spaces from string
* @credits: by joshua gross (popup.html of ajax_im )
*/
function trim2(text)
{
	return (text != null) ? text.replace(/^[ \t]+|[ \t]+$/g, "") : null;
}

/*
* @credits: Stoyan Stefanov "Object Oriented Javascript"
*/
function extendByValue(Child, Parent)
{
	var p = Parent.prototype;
	var c = Child.prototype;
	
	for (var i in p)
	{
		c[i] = p[i];
	}
	c.uber = p;
}

function extend(Child, Parent)
{
	extendByValue(Child, Parent);
}

/*
* @author: Michael Orji
* @date: 21, August, 2013
* Creates a new child object from parent 
* or 
* Copies only reference members (objects, functions, arrays) by reference from parent into child
* it has the advantage that the child does not inherit the parent's non-reference properties, and hence cannot modify them
* thereby inheriting only reference properties which are meant to be re-used
*
* USE EXAMPLES:
* 1. var childObject = referenceExtend(parentObject); //create a brand new Child Object with no properties except parent's reference members
* 2. var childObject = { 'prop':'value', 'method':methodDefinition }
*    referenceExtend(parentObject, childObject); //augment already existing childObject with parent's reference members
*
*/
function referenceExtend(Parent, Child) 
{
	Child = Child || {};

   	for(var i in Parent)
   	{
		if ( (typeof Parent[i] === 'object') || (typeof Parent[i] === 'function') || (typeof Parent[i] === 'array') ) 
		{
			if ( (typeof Parent[i] === 'object') || (typeof Parent[i] === 'array') )
			{
				Child[i] = (Parent[i].constructor === Array) ? [] : {};
				//customExtend(Parent[i], Child[i]);
				referenceExtend(Parent[i], Child[i]);
			}
			else 
			{
				Child[i] = Parent[i];
			}
		} 
	}
	
	return Child;
}

/*
* @date: Oct. 10, 2012, 20:37
*/
function logToConsole(msg)
{
	if(typeof console != 'undefined' && typeof console.log == 'function')
	{
		return console.log(msg);
	}
}

/*
* Splits a string on the first occurence of multiple substrings
* @credits: http://stackoverflow.com/questions/7527374/how-to-split-a-string-on-the-first-occurence-of-multiple-substrings-in-j
* @date: 27 Oct, 2012
* idea is, replace the first occurence with a special (invisible) string, and then split against this string
*/
function splitOnFirstOccurenceOfMultipleSubstrings(strToSplit, substr, invisibleXter)
{
	invisibleXter = invisibleXter || "\x034";
	return strToSplit.replace(new RegExp(substr), invisibleXter).split(invisibleXter); 
}

function getLastChar(str)
{
	return trim(str.substring(str.length - 1));
}

/*
* Gets the absolute path to specified file or folder 
* @author: Michael Orji
* @date: Nov. 11, 2012
*/
function getPath(targetName)
{
	var scripts     = $Tag('script');
	var targetPath  = '';
	
	for(i = 0; i < scripts.length; i++)
	{
		var scriptPath           = scripts[i].src.replace(/%20/g, ' ');  
		var targetPathStartIndex = scriptPath.lastIndexOf('/' + targetName) + 1; //
		var scriptName           = scriptPath.substring(targetPathStartIndex, targetPathStartIndex + targetName.lastIndexOf(getLastChar(targetName)) + 1 );
		if(trim(scriptName) == trim(targetName))
		{ 
			targetPath = trim( scriptPath.substring(0, targetPathStartIndex) ); 
			return targetPath; //return targetPath + '/';
		}
	}
	
	return targetPath;
}

/*
* credit: http://james.padolsey.com/javascript/get-document-height-cross-browser/
*/
function docHeight()
{
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}

function size(elem)
{
	elem = $O(elem);
	if(!elem) return;
	
	var w = typeof elem.style != 'undefined' ? elem.style.width  : elem.offsetWidth;
	var h = typeof elem.style != 'undefined' ? elem.style.height : elem.offsetHeight;
	return {width: parseInt(elem.offsetWidth), height: parseInt(elem.offsetHeight)}
}

/*
* gets the css style value of an element
*/
getStyleValue =  function (element, CSSProperty)
{
	element = $O(element);
	if(!element) return;
	var styleValue = (typeof element.currentStyle != "undefined") ? element.currentStyle : document.defaultView.getComputedStyle(element, null);   
	return styleValue[CSSProperty];
}

function getDisplayType(element)
{
	element = $O(element);
	if(!element){ return; }
	return (element.style.visibility) ? 'visibility' : 'display';
}

function isObject(elem, strict)
{
	if(strict)
	{
		return (typeof elem === 'object');
	}
	return (typeof elem == 'object' || typeof elem == 'array' || typeof elem == 'function');
}

/*
* resolves the lexical scope of calling functions
* on a loop
*
* e.g
* for(var k = 0; k < thumbs.length; k++){
*  attachEventListener(thumbs[k], "click", function(event){selectImg(mediaIds[k]); handleEvent(event);}, false);
* }:
* would return only the last media id, the last loop value
* of K due to the lexical scoping of functions in javascript
* since the anonymous function only gets the final value of 'k'
*
* using resolveScope however, we could write the above as follows:
* for(var k = 0; k < thumbs.length; k++){
*  attachEventListener(thumbs[k], "click", resolveScope(selectImg, mediaIds[k]), false);
* }
* and get the desired result
*/
//function resolveScope(callback, x, allowDefaultAction, allowEventPropagation)
function resolveScope(callback, x)
{
	var func = callback; 

	return function(event)
	{
		if(typeof x === 'array' || typeof x === 'object')
		{ 
			arrayWalk(x, func);
		}

		else
		{
			func(x); 
		}
    
		//handleEvent(event, allowDefaultAction, allowEventPropagation);
	}
}

function execute()
{
	var callback = arguments[0], 
	    args     = [];

	for(var i = 1; i < arguments.length; i++)
	{
		args.push(arguments[i]); 
	}
   
	return function()
	{
		callback.apply(callback, args);  
	}
}

/* @author: michael Orji
*  @date  : 15 sept, 2012
*/
function exec(callback)
{
	var args = [];
	for(var i = 1; i < arguments.length; i++)
	{
		args.push(arguments[i]);
	}
	
	return function()
	{
		return callback(args);
	}
}

function delay(callback, delayTime)
{
	var t = setTimeout(callback, delayTime);
	return t;
}

function hide()
{
	if(arguments.length > 0)
	{
		for(var i = 0; i < arguments.length; i++)
		{
			$Style(arguments[i]).visibility = 'hidden';
		}
	}
}

function show()
{
	var len = arguments.length;
	
	if(len > 0)
	{
		for(var i = 0; i < len; i++)
		{
			$Style(arguments[i]).visibility = 'visible';
		}
	}
}

function display(elems, displayVal)
{
	elems = (typeof elems == 'string') ? elems.split(elems, ',') : elems;
	displayVal = displayVal || 'block';

	if(elems.length > 0)
	{
		for(var i = 0; i < elems.length; i++)
		{
			if($O(trim(elems[i])))
			{
				$Style(trim(elems[i])).display = displayVal;
			}
		}
	}
}

function undisplay()
{
	if(arguments.length > 0)
	{
		for(var i = 0; i < arguments.length; i++)
		{
			if($O(arguments[i]))
			{
				$Style(arguments[i]).display = 'none';
			}
		}
	}
}

function toggleDisplay(elem, currDisplay)
{
	if( !(elem = $O(elem)) )
	{ 
		return; 
	}
	
	currDisplay = currDisplay || $Style(elem).display || 'none';
	$Style(elem).display =  ( ($Style(elem).display  != 'none') ? 'none' : 'block' );
	return elem;
}

function setStatus(elem, statusIndicator)
{
	$Html(elem, statusIndicator);
}

function clearStatus(elem)
{
	$Html(elem, '');
}

function resetForm(theform)
{
	$O(theform).reset();
}

function submitForm(theform)
{
	theform.submit();
}

function isVisible(elem)
{
	return ( ($Style(elem).visibility != 'hidden') && ($Style(elem).display != 'none') );
}

fadeIn = function (elemId, maxOpacity, speed)
{
	Effects.fadeIn(elemId, maxOpacity, speed);
}

fadeOut = function (elemId, minOpacity, speed)
{
	Effects.fadeOut(elemId, minOpacity, speed)
}

/*
* javascript equivalent of the php array_walk funcion
* works for both arrays and objects, 
* @return type void;
* @date: 04, sept, 2010;
*/
function arrayWalk(arr, func)
{
    for(var x in arr)
	{
		func(arr[x]);
    }
}

/* 
* keeps a draggable element from being dragged outside of
* the parent's boundary size or browser window boundary
* @author: Michael Orji
* @date: 2nd october, 2010
*/
function maintainBoundary(elem, parentElem)
{
	if(parentElem == null || parentElem == '')
	{
		parentElem   = Browser;
		parentWidth  = Browser.Size.width();
		parentHeight = getDocHeight(); //Browser.Size.height();
	}

	else
	{
		parentWidth = parseInt(getStyleValue(parentElem, 'width'));
		parentHeight = parseInt(getStyleValue(parentElem, 'height'));
	}

	var elemWidth  = parseInt(getStyleValue(elem, 'width'));
	var elemHeight = parseInt(getStyleValue(elem, 'height'));
	var elemLeft   = parseInt(elem.style.left);
	var elemRight  = parentWidth - (elemLeft + elemWidth);
	var elemTop    = parseInt(elem.style.top);
	var elemBottom = parentHeight - (elemTop + elemHeight);

	if((elemLeft + elemWidth) >= parentWidth)
	{
		elem.style.left = parentWidth - elemWidth + 'px';
	}
	if((elemRight + elemWidth) >= parentWidth)
	{
		elem.style.left = '0px';
	}
	if( (elemTop + elemHeight) >= parentHeight)
	{
		elem.style.top = parentHeight - elemHeight + 'px';
	}
	if( (elemBottom + elemHeight) >= parentHeight)
	{
		elem.style.top = '0px';
	}
}

function bindToParentAction(child, parentAction)
{
	if(child.hasChildNodes)
	{
		for(var i = 0; i < child.childNodes.length; i++)
		{
			bindToParentAction(child.childNodes[i], parentAction);
		}
	}
	
	if(typeof parentAction === 'object')
	{
		for(var x in parentAction)
		{
			if(typeof parentAction[x] === 'function')
			{
				child[x] = parentAction[x];
			}
		}
	}
	
	else
	{
		parentAction.call(child);
	}
}

function pageName()
{
	var fullPageUrl     = document.location.href;
	var indxOfPath      = fullPageUrl.lastIndexOf('/');
	var loosePageName   = fullPageUrl.substring(indxOfPath + 1, fullPageUrl.length);
	var queryStringIndx = loosePageName.indexOf('?');
	var strictPageName  = loosePageName.substring(loosePageName, queryStringIndx);
	return strictPageName;
}

/*
* @ author: Michael Orji
* @ date: Sept 20, 2012
*/
function setDisplayStringLength(str, maxLength, padXter)
{
	padXter = padXter || '...'
	return ( str.substring(0, maxLength) + (str.length > maxLength ?  padXter : '') );
}

function getLastChild(parent, excludeNodeType)
{
	excludeNodeType = excludeNodeType || 3;
	var lastBorn = parent.lastChild;

	while(lastBorn.nodeType == excludeNodeType)
	{
		lastBorn = lastBorn.previousSibling;
	}
	
	return lastBorn;
}

function changeLocation(url)
{
	location.href = url;
}

function createMenuItem (value, label)
{
	var newOpt       = document.createElement("option");
	newOpt.value     = value;
	newOpt.innerHTML = label || value;
	return newOpt;
}

/*
* @author: michael orji
* @date: dec 26, 2011
*/
function createImage(obj)
{
	obj           = obj || {}

	var img       = document.createElement('img');
	img.src       = obj.src;
	img.id        = obj.id          || new Date().getSeconds()
	img.className = obj.className   || '';
	img.alt       = obj.alt         || '';
	img.title     = obj.title       || '';
 
	return img;
} 