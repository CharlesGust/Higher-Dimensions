var view;
var lastMouseX = 0;
var lastMouseY = 0;

function mouseMoved(x, y) {
  if ((lastMouseY == y) && (lastMouseX ==x)) {
    return false;
  } else {
    lastMouseX = x;
    lastMouseY = y;
    return true;
  }
}

function User() {
  // this class is for all the user interaction we might have.
  var $navBarLI = $(".navigation li");
  var list = $(".navigation li");
  var $navLinks = $(".navigation__link");
  var $navTitle = $(".navigation__link--title");
  var mouseSemaphore = false;

  $(".navigation").world("page", { transition:".5s ease-in-out", rotateY: 0, z:25});

  $navLinks.world("page", { transition: ".45s ease-in-out" });

  $navBarLI.on("mouseenter", function(ev) {
    if (!mouseMoved(ev.clientX, ev.clientY)) return;
    var $t = $(this);
    $t.css("background", "#dfa");
    $t.world("page", {transition: "none", rotateY: -178});
    setTimeout(function() {
      $t.world("page", {transition: ".45s ease-out", rotateY: -10, z:40});
    }, 5);
  });

  $navBarLI.on("mouseleave", function(ev) {
    if (!mouseMoved(ev.clientX, ev.clientY)) return;
    var $t = $(this.firstChild);
    $(this).css("background", "#fff");
    $t.world("page", {});
  });

}

//
//
//
$(document).ready(function() {
  // $(".sidebar").world("page", { perspective: 400, z:200, rotateY:45});

  // what is our state coming in? We are going to assume 2D for the time
  // being, but it may be that we have to get this from SessionStorage
  // because we might be in 2D, 2.5D or 3D
  var user = new User();
});
