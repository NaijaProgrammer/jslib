<ul id="tabs-container" class="tabs" style="display:none;">
<li><a href="" onclick="tabSwitch('job-application-form-container', 3, 'tab_', 'applicant-bio-data-container',  1); return false;" id="tab_1" class="active">Bio-data</a></li>
<li><a href="" onclick="tabSwitch('job-application-form-container', 3, 'tab_', 'applicant-edu-data-container',  2); return false;" id="tab_2">Education</a></li>
<li><a href="" onclick="tabSwitch('job-application-form-container', 3, 'tab_', 'applicant-exp-data-container',  3); return false;" id="tab_3">Work</a></li>
<li><a href="" onclick="tabSwitch('job-application-form-container', 3, 'tab_', 'applicant-ref-data-container',  4); return false;" id="tab_4">Referee</a></li>
</ul>

function tabSwitch(contentsParentContainer, numOfTabs, tabPrefix, currentContent, activeTab){ 
   contentsParentContainer = document.getElementById(contentsParentContainer);
for(var i = 0; i < contentsParentContainer.childNodes.length; i++)
   {
     if(typeof contentsParentContainer.childNodes[i].style !== 'undefined'){
     contentsParentContainer.childNodes[i].style.display = 'none';
     }
   }
   for (var i=1; i < numOfTabs+1; i++){    
    document.getElementById(tabPrefix+i).className = '';  
   }
document.getElementById(currentContent).style.display = 'block';
document.getElementById(tabPrefix+activeTab).className = 'active';       
   }
window.onload = function()
{ 
document.getElementById('tabs-container').style.display = 'block'; 
tabSwitch('job-application-form-container', 3, 'tab_', 'applicant-bio-data-container',  1);
}