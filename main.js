function getBackgroundColor(el){
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
      el.style.display = "none";
    }
  }
}


function bypassSoftPaywall(){
  // add scroll
  document.getElementsByTagName('html')[0].style.overflow = "scroll";

  // remove modal
  let els = document.querySelectorAll('[data-testid=sheetDialog]');
  els[0].style.display = "none";

  // remove lockout gray div
  let twitterLockoutDivColor = "rgba(91, 112, 131, 0.4)";
  removeLockoutDiv();
}


browser.browserAction.onClicked.addListener(bypassSoftPaywall);
