 function runGetNextPage(){
   if(Browser.Window.scrollBarIsDown()){
    getNextPage();
   }
}
 
(function initPageScroll()
{
 attachEventListener(document, 'scroll', runGetNextPage, false);
})()

function showOnlyAvailable(){
  Browser.Window.getScrollPosition().top
  Browser.Window.size().height
}