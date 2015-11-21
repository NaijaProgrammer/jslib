//FROM THE JAVASCRIPT ANTHOLOGY
function getElemPosition(theElement)
{
 var positionLeft = 0;
 var positionTop = 0;
   while (theElement != null){
    positionLeft += theElement.offsetLeft;
    positionTop  += theElement.offsetTop;
    theElement    = theElement.offsetParent;
   }
 return {'left': positionLeft, 'top': positionTop};
}

/*
* original code source: http://www.quirksmode.org/js/findpos.html 
* access date: July 9, 2011, 10:42 am;
*/
function getElemPos(obj)
{
 var curleft = curtop = 0;
   if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop  += obj.offsetTop;
      } while (obj = obj.offsetParent);
    return {'left': curleft, 'top': curtop};
   }
}


//Opening Off-site Links in a New Window
openExtLinks = function(e)
{
var target = e ? e.target : window.event.srcElement;

   while (target && !/^(a|body)$/i.test(target.nodeName)){
    target = target.parentNode;
   }

   if (target && target.getAttribute('rel') && target.rel == 'external'){
    var external = window.open(target.href);
    return external.closed;
   }

}

/*
USAGE : 
all external links should have the rel="external" attribute
1. SITE: <a href="http://www.google.com/" rel="external">Google (offsite)</a>
2. document.onclick = openExtLinks;
*/

//FROM OTHER SOURCES


/*
* from facebook, based on prototype.js
*/
$=function(a){return typeof a=='string'?document.getElementById(a):a;}


// THE FOLLOWING ARE BY MICHAEL ORJI

handleEvent = function(e, ada, aep){
 
//ada = allow default action
//aep = allow event propagation

   if(!ada){
    EventManager.cancelDefaultAction(e);
   }

   if(!aep){
    EventManager.stopEventPropagation(e);
   }
}

function removeBgImg(elem){
 elem = $O(elem);
 elem.style.backgroundImage = 'none';
}


function addBgImg(elem, imgName){
 elem = $O(elem);
 elem.style.backgroundImage = "url(" + imgName + ")";
}

function toggleBgImg(elem, imgName){

 elem = $O(elem);

   if(elem.value.length > 0){
    removeBgImg(elem)   
   }

   else{
   addBgImg(elem, imgName);
   }
}

/* 
 rename this to changeBgColor ||
 merge it with add/removeBgImg to
 create a general-purpose changeBgElement script
*/ 
changeBg = function(oldElem, newElem){
 oldElem = $O(oldElem);
 newElem = $O(newElem);
 oldElem.style.backgroundColor = newElem.style.backgroundColor;
}

keyCodeIs = function(codeNum, e){

e = e || window.event;

   if( isNaN(parseInt(codeNum)) ){
    return false;
   }

//var code = (e.charCode) ? e.charCode : ((e.keyCode) ? e.keyCode : ((e.which) ? e.which : 0));
//var code = (e.keyCode) ? e.keyCode : ((e.charCode) ? e.charCode : ((e.which) ? e.which : 0));
var code = (e.keyCode) ? e.keyCode : ((e.which) ? e.which : ((e.charCode) ? e.charCode : 0));

return (code == codeNum);

}


handleKeyAction = function(keyState, codeNum, callback, event)
{
keyAction = (keyState.indexOf("key") == -1) ? ("key" + keyState) : keyState;
   
   if(EventManager.eventTypeIs(keyAction, event)){
   
      if(keyCodeIs(codeNum, event)){
       callback();
      }
   }
}

/*
* returns the scrollTop property of a document as rendered
* by any particular browser
*/
function scrollTop(){
 var scrollTop = (document.body.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
 return scrollTop;
}

/*
* returns the scrollLeft property of a document as rendered
* by any particular browser
*/
function scrollLeft(){
 var scrollLeft = (document.body.scrollLeft) ? document.body.scrollLeft : document.documentElement.scrollLeft;
 return scrollLeft;
}   

/*
* checks if the scrollbar of a scrollable element is down
* returns true if the scrollbar is down, false otherwise
* @author: michael orji
* @date oct 5, 2010, 03:16
*/
function isScrollDown(elem){
 elem = $O(elem);
   if(elem){
    return (elem.scrollHeight - elem.scrollTop <= elem.offsetHeight);
   }
}


function scrollToBottom(elem){
 elem = $O(elem);
 elem.scrollTop = elem.scrollHeight - elem.offsetHeight;
}


function changeBgColor(elem, color){
 elem = $O(elem);
 elem.style.backgroundColor = color;
}

function changeImageSrc(oldImg, newImg, newImgPath){
 oldImg = $O(oldImg);
 var newImgSrc = newImgPath + newImg;
 oldImg.src = newImgSrc;
}

swapContent = function(oldElem, newElem){
 oldElem = $O(oldElem);
 newElem = $O(newElem);
   if(oldElem && newElem){
    oldElem.innerHTML = newElem.innerHTML;
   }
}

function isDisplayed(elem){
 elem = $O(elem);
 return (elem.style.display != 'none');
}

function toggleElementVisibility(elem){
 elem = $O(elem);
   if(!isVisible(elem)){
    StyleManager.showElement(elem);
   }
   else{
    StyleManager.hideElement(elem);
   }
}



function setElemSize(elem, w, h) {
 elem = $O(elem);
 elem.style.width = w + 'px';
 elem.style.height = h + 'px';
}

function setWindowStatusMsg(msg){
 window.status = msg;
 return true;
}



//useful for strings and arrays at the moment
//TO DO: extend to apply to every possible object and data-type (except boolean)
//@date: 29 Apr, 2012
function isEmpty(obj){
 return obj.length == 0;
}


