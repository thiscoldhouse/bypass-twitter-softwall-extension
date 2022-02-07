// platform agnostic shenanigans
if (typeof browser === "undefined") {
    var browser = chrome;
}


function getBackgroundColor(el){
  // A helper function for removeLockoutDiv. Returns an elements background-color.
  if (window.getComputedStyle){
    var y = document.defaultView.getComputedStyle(el, null).getPropertyValue(
      'background-color'
    );
  }
  else if (el.currentStyle){
    var y = el.currentStyle['background-color'];
  }
  return y;
}

function removeLockoutDiv() {
  // Looks through divs to match the background-color with twitter's
  // known lockout div's background color, then removes the div.
  let twitterLockoutDivColor = "rgba(91, 112, 131, 0.4)";

  let divs = document.getElementsByTagName('div');
  for (var i in divs){
    let el = divs[i];
    var color = null;
    try {
      color = getBackgroundColor(el);
    }
    catch {
      continue;
    }
    if (color == twitterLockoutDivColor){
      console.log('Extension Log: removing potential lockout div');
      el.style.display = "none";
    }
  }
}

function bypassSoftPaywall(){
  try {
    // add scroll back-in
    document.getElementsByTagName('html')[0].style.overflow = "scroll";
  }
  catch(e) {
    console.log('TwitterExtensionLog: Failed to add scroll back in with error:');
    console.log(e);
  }
  try {
    // remove modal
    let els = document.querySelectorAll('[data-testid=sheetDialog]');
    els[0].parentElement.parentElement.style.display = "none";
    els[0].style.display = "none"
  }
  catch(e) {
    console.log('TwitterExtensionLog: Failed to removel modal with error:');
    console.log(e);
  }

  try {
  // remove lockout gray div
    removeLockoutDiv();
  }
  catch(e) {
    console.log('TwitterExtensionLog: Failed to remove grayed out lockout div with error:');
    console.log(e);
  }
}

browser.runtime.onMessage.addListener(function(request){
  bypassSoftPaywall();
  return Promise.resolve({'success': true})
});
console.log('Extension content script loaded');
