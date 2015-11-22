function removeBgImg(elem)
{
	elem = $O(elem);
	elem.style.backgroundImage = 'none';
}

function addBgImg(elem, imgName)
{
	elem = $O(elem);
	elem.style.backgroundImage = "url(" + imgName + ")";
}

function toggleBgImg(elem, imgName)
{
	elem = $O(elem);

	if(elem.value.length > 0)
	{
		removeBgImg(elem)   
	}

	else
	{
		addBgImg(elem, imgName);
	}
}

/* 
 rename this to changeBgColor ||
 merge it with add/removeBgImg to
 create a general-purpose changeBgElement script
*/ 
changeBg = function(oldElem, newElem)
{
	oldElem = $O(oldElem);
	newElem = $O(newElem);
	oldElem.style.backgroundColor = newElem.style.backgroundColor;
}

function changeBgColor(elem, color)
{
	elem = $O(elem);
	elem.style.backgroundColor = color;
}

function changeImageSrc(oldImg, newImg, newImgPath)
{
	oldImg = $O(oldImg);
	var newImgSrc = newImgPath + newImg;
	oldImg.src = newImgSrc;
}

swapContent = function(oldElem, newElem)
{
	oldElem = $O(oldElem);
	newElem = $O(newElem);
	if(oldElem && newElem)
	{
		oldElem.innerHTML = newElem.innerHTML;
	}
}

function isDisplayed(elem)
{
	elem = $O(elem);
	return (elem.style.display != 'none');
}

function toggleElementVisibility(elem)
{
	elem = $O(elem);
	
	if(!isVisible(elem))
	{
		StyleManager.showElement(elem);
	}
	
	else
	{
		StyleManager.hideElement(elem);
	}
}

function setWindowStatusMsg(msg)
{
	window.status = msg;
	return true;
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
		}
		else
		{
			evt.returnValue=false;
		}
	}
}