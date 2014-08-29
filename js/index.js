var mode = 2;

function User() {
  // jWorld doesn't manipulate <a> objects, so we have to insert the <a>
  // into an element which can move, like <div> or <span>.
  /*
  function insertDiv(t, dispClass) {
    var $firstChild = $(t.firstChild);

    // wrap the <a> in a <div>. The wrap function returns the initial element
    // not what you get after the wrap, so get its parent to get to the <div>
    //var $divWPosition = $firstChild.wrap("<div></div>").parent();

    //$divWPosition.addClass(dispClass);
    //$(t).removeClass(dispClass);

    // move any positional css from the child to the parent <div>
    //var newposition = $(t).css("position");

    if ($(t).css("position")) {
      $divWPosition.css("position", $(t).css("position"));
      $(t).removeAttr("position");
    }
    if ($(t).css("top")) {
      $divWPosition.css("top", $(t).css("top"));
      $(t).removeAttr("top");
    }


    // remove the navigation__link class from the <li>
    //$(t).removeClass(dispClass);

    // add navigation__link class to <div>
    //var $divWClassAttr = $firstChild.parent().addClass(dispClass);
    //$divWClassAttr.attr("top", "0");
    //$(t).attr("top", 50);
    // change style of <div> to inline-block
    //$divWClassAttr.attr("display", "inline-block");
  }
  */

  function spinDiv(th) {
    // the first child of the <li> is a <div>
    var el = th.firstChild;

    while (el.nodeType!=1) {
      el = el.nextSibling;
    }

    var $t = $(el);
    if (mode >= 2)    $t.addClass("navigation__link--2D");
    if (mode >= 2.5)  $t.addClass("navigation__link--2_5D");
    /*
    $t.css("background-color", "#dfa");
    if (mode >= 2.5) {
      $t.world("page", {transition: "none", rotateY: -178});
      setTimeout(function() {
        $t.world("page", {transition: ".45s ease-out", rotateY: -10, z:40});
      }, 5);
    }
    */
  }

  function clearDiv(th) {
    // the first child of the <li> is a <div>
    var el = th.firstChild;

    while (el.nodeType!=1) {
      el = el.nextSibling;
    }

    var $t = $(el);
    $t.removeClass("navigation__link--2D");
    $t.removeClass("navigation__link--2_5D");
    /*
    if ($t.hasClass('sidebar__button--active')) {
      $t.css("background-color", "#11FEDD");
    }
    else {
      $t.css("background-color", "#2BCDB7");
    }
    if (mode >= 2.5) {
      $t.world("page", {});
    }
    */
  }

  // this class is for all the user interaction we might have.
  var $navBarTopDiv = $("nav>div");
  var $sideBarButton = $('.sidebar button');

/*
  // set up navBar effects
  $navBarLI.each(function() {
    insertDiv(this, "navigation__link");
  });
*/

  $navBarTopDiv.on("mouseenter click", function(ev) {
    spinDiv(this);
  });

  $navBarTopDiv.on("mouseleave", function(ev) {
    clearDiv(this);
  });
/*
  // set up sideBar effects
  $sideBarButton.each(function() {
    insertDiv(this, "");
  });
*/


  $sideBarButton.on("mouseenter click", function(ev) {
    spinDiv(this);
  });

  $sideBarButton.on("mouseleave", function(ev) {
    clearDiv(this);
  });
}
//End User

//This controls the transitions between the different
//modes using the buttons in the sidebar
function ViewControl () {

  //variables to hold the necessary elements for
  //transition to different modes
  var $cam = $("#view_container");
  var $header = $('.navigation');
  var $links = $('.navigation .navigation__link');
  var $aside = $('.sidebar');
  var $buttons = $('.sidebar div');
  var $content = $('.content');

  var currentActive = '#base';
  var baseText = 'This webpage is currently being displayed in regular HTML. Press the button below to see what is possible with the Third Dimension.';
  var twoFiveText = 'This webpage is currently being displayed in 2.5-D HTML. It retains the general look of a regular website, but the possibilities have expanded.';
  var threeDText = 'This webpage is currently being displayed in 3-D HTML. There is now a whole new dimension of possibilities. Left click and drag to check it out.';


  $('#mode-change').on('click', modeChange);


  //Function used in the process to change between modes
  function changeActiveButton (button) {

    $(button)
      .addClass('sidebar__button--active')
      .removeClass('sidebar__button');
    $(currentActive)
      .addClass('sidebar__button')
      .removeClass('sidebar__button--active');

    currentActive = button;
  }
  //End changeActiveButton


  function modeChange () {

    if (mode == 2) {
      initializeTwoFive();
    }
    else if (mode == 2.5) {
      initializeThreeD();
    }
    else if (mode == 3) {
      initializeBase();
    }

  }
  //End modeChange function

  function initializeBase () {

    location.reload();
    /*mode = 2;


    if(currentActive === '#3-D') {
      $cam.world('set', 'clearAll');

    }
    else{
      $header.world('page', 'clearAll');
      $links.world('page', 'clearAll');
      $aside.world('page', 'clearAll');
      $buttons.world('page', 'clearAll');
    }


    $('.sidebar__text').text(baseText);

    changeActiveButton('#base');*/
  }
  //End initializeBase

  function initializeTwoFive () {
    mode =2.5;

    $('.sidebar__text').text(twoFiveText);

    /*changeActiveButton('#2-5');*/
  }
  //End initializeTwoFive

  function initializeThreeD () {
    mode = 3;

    $cam.world({fov:70, x:0,y:0,z:-400});
    $cam.height(680);

    $cam.world('addElements', $header);
    $header
      .world('set', {x:25,y:225,z:20})
      .width(960 * 0.979166667);

    $cam.world('addElements', $aside);
    $aside
      .css({'top':-160, 'left':-450})
      .width(960 * 0.145833333);

    //Checks which page we are currently on so it can
    //properly render the content of that page
    if ($('.sidebar__text--title').text() === 'Home') {

      $cam.world('addElements', $content);
      $content
        //.world('set', {rotateY:180, x:300, y:-100, z:-800})
        .css({'top':-320, 'left':-280})
        .width(960 * 0.75);

      addMatrix();

    }
    else if ($('.sidebar__text--title').text() === 'Article'){

      $cam.world('addElements', $('#art1'));
      $('#art1')
        .world('set', {rotateY:90, x:300, z:-500})
        .css({'top':-375, 'left':-280})
        .width(960 * 0.75);

      $cam.world('addElements', $('#art2'));
      $('#art2')
        .world('set', {rotateY:180, x:-300, y:120, z:-800})
        .css({'top':-375, 'left':-280})
        .width(960 * 0.75);

      $cam.world('addElements', $('#art3'));
      $('#art3')
        .world('set', {rotateY:270, x:-600, y:-100, z:-300})
        .css({'top':-375, 'left':-280})
        .width(960 * 0.75);
    }

    $('.sidebar__text').text(threeDText);

    freeLook();

    $('.sidebar__button').text('Back to Flat');

    /*changeActiveButton('#3-D');*/
  }
  //End initializeThreeD

  function freeLook () {

    var lookPageX, lookPageY;

    $cam.on("mousedown", function (event) {
      lookPageX = event.pageX;
      lookPageY = event.pageY;

      $(document).on("mousemove", mouse_move);
      $(document).on("mouseup", mouse_up);

      event.preventDefault();
    });

    function mouse_move (event) {
      // Rotate camera on local axis
      $cam.world("set", {
        localRotateX: event.pageY - lookPageY,
        localRotateY: event.pageX - lookPageX
      });

      // Reset Z rotation to zero
      $cam.world("set", {rotateZ:0});

      lookPageX = event.pageX;
      lookPageY = event.pageY;
    }

    function mouse_up (event) {
      $(document).off("mousemove", mouse_move);
      $(document).off("mouseup", mouse_up);
    }
  }
  //End freeLook

  function addMatrix () {

    var j = 0;

    /*var newEl;

    for (var i = 0; i < 13; i++) {

      newEl = document.createElement('img');

      newEl.setAttribute('src', 'img/matrix.gif');
      newEl.setAttribute('id', 'img' + i);

      newEl.className = 'view__image';

      $cam.before(newEl);
    }*/

    for (var i = 0; i < 13; i+=3) {

      $cam.world('addElements', $('#img' + i));
        $('#img' + i)
          .world('set', {rotateY:90, x:310, y:-650 + (j * 400), z:-400})
          .css({'top':-375, 'left':-280, 'display':'initial'});

        $cam.world('addElements', $('#img' + (i + 1)));
        $('#img' + (i + 1))
          .world('set', {rotateY:180, x:50, y:-650 + (j * 400), z:-600})
          .css({'top':-375, 'left':-280, 'display':'initial'});

        $cam.world('addElements', $('#img' + (i + 2)));
        $('#img' + (i + 2))
          .world('set', {rotateY:270, x:-190, y:-650 + (j * 400), z:-400})
          .css({'top':-375, 'left':-280, 'display':'initial'});

      j++;
    }
  }
  //End addMatrix

}
//End ViewControl





//
//
//
$(document).ready(function() {
  // $(".sidebar").world("page", { perspective: 400, z:200, rotateY:45});

  // what is our state coming in? We are going to assume 2D for the time
  // being, but it may be that we have to get this from SessionStorage
  // because we might be in 2D, 2.5D or 3D

  var viewC = new ViewControl ();

  var user = new User();
});
