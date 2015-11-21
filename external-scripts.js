/*
* @credits: Wrox professional javascript for web developers, pg 197
*/
if (typeof Node == "undefined") {
 var Node = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12
 }
}

/*
* @credits: Accelerated DOM Scripting with Ajax, API's and Libraries by  Jonathan Snook (pg 72, PDF version)
* @modified: Michael Orji
*/
function changeLinksToNewWindow()
{
 /* 
 * grab the url and match up to the first "/" after the "http://"
 * grab the first (and only) match
 */
 var currentDomain = window.location.href.match(/^http:\/\/[^\/]+/)[0];
 var elements      = document.getElementsByTagName('a');
   for(var i=0;i<elements.length;i++)
   {
      // if the currentDomain is in the href, it'll return a value of 0 or more.
      if(elements[i].href.lastIndexOf(currentDomain) >= 0)
      {
       addListener(elements[i], 'click', openWin);
      }
   }

   function openWin(evt)
   {
    evt = evt||window.event;
    window.open(this.href);
      if(evt.preventDefault)
      {
       evt.preventDefault();
      }else{
      evt.returnValue=false;
      }
   }
}