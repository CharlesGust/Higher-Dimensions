var mode = 2;

/*
**  page.saveData and page.loadData based on versions provided by Rick Strahl
**  at weblog.west-wind.com
*/
saveData = function(id) {
  if (!sessionStorage) {
    return null;
  }

  var data = {
    id:           id,
    mode:         mode,
    position:     window.position,
    persist:      $("#persist").html()
    };
    sessionStorage.setItem("index_html", JSON.stringify(data));
  };


loadData = function() {
  // is sessionStorage API supported?
  if (!sessionStorage) {
    return null;
  }

  var data = sessionStorage.getItem("index_html");

  // was any storage for this page found?
  if (!data) {
    return null;
  } else {
    return JSON.parse(data);
  }
};

restoreData = function(data) {
  mode = data.mode;
  window.position = data.position;
  $("#persist").html(data.persist);
}


function buttonInterface() {

  function performButtonEffect(th) {
    var $t = $(th).children();
    if (mode >= 2)    $t.addClass("navigation__link--2D");
    if (mode >= 2.5)  $t.addClass("navigation__link--2_5D");
  }

  function removeButtonEffect(th) {
    var $t = $(th).children();
    $t.removeClass("navigation__link--2D");
    $t.removeClass("navigation__link--2_5D");
  }

  function createButtonListeners(elements) {
    var $jLoc = $(elements);

    $jLoc.on("mouseenter click", function(ev) {
      performButtonEffect(this);
    });

    $jLoc.on("mouseleave", function(ev) {
      removeButtonEffect(this);
    });
  }

  // this class is for all the user interaction we might have.
  createButtonListeners("nav>div");
  createButtonListeners(".sidebar button");
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

  function modeSet(n) {
    if (n == 2) {
      initializeBase();
    } else if (n == 2.5) {
      initializeTwoFive();
    } else if (n == 3) {
      initializeThreeD();
    }
    mode = n;
  }

  function modeChange () {

    if (mode == 2) {
      modeSet(2.5);
    }
    else if (mode == 2.5) {
      modeSet(3);
    }
    else if (mode == 3) {
      modeSet(2);
    }
    saveData(1);
  }
  //End modeChange function

  function initializeBase () {

    location.reload();
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
    else if ($('.sidebar__text--title').text() === 'Image'){

      var j = 0;

      for (var i = 1; i < 7; i+=2){
        $cam.world('addElements', $('#img' + i));
        $('#img' + i)
          .world('set', {rotateY:90, x:300, y:100, z:-500 + (-700 * j)})
          .css({'top':-375, 'left':-280})
          .width(960 * 0.50);

        $cam.world('addElements', $('#img' + (i + 1)));
        $('#img' + (i + 1))
          .world('set', {rotateY:270, x:-600, y:100, z:-500 + (-700 * j)})
          .css({'top':-375, 'left':-280})
          .width(960 * 0.50);

        j++;
      }

      $('.content').remove();
    }

    $('.sidebar__text').text(threeDText);
    $('.sidebar__button').text('Back to Flat');

    freeLook();

  }
  //End initializeThreeD

  function freeLook () {

    var lookPageX, lookPageY;
    var lookRotZ;

    $cam.on("mousedown", function (event) {
      lookPageX = event.pageX;
      lookPageY = event.pageY;
      lookRotZ = $cam.world("rotateZ");

      $(document).on("mousemove", mouse_move);
      $(document).on("mouseup", mouse_up);

      event.preventDefault();
    });

    $(window).on("keydown", function(ev) {
      switch (ev.keyCode) {
        case 27:/*esc*/
                          /*
                          **  It would be nicer to "fly" back, but it isn't
                          **  working, so teleport back to beginning
                          var xBack = -($cam.world("x"));
                          var yBack = -($cam.world("y"));
                          var zBack = -($cam.world("z") + 400);
                          var xRotBack = -($cam.world("rotateX"));
                          var yRotBack = -($cam.world("rotateY"));
                          var zRotBack = -($cam.world("rotateZ"));

                          $cam.world("moveX", xBack);
                          $cam.world("moveY", yBack);
                          $cam.world("moveZ", zBack);
                          $cam.world("rotateX", xRotBack);
                          $cam.world("rotateY", yRotBack);
                          $cam.world("rotateZ", zRotBack);
                          */

                          $cam.world("set", {x:0,y:0,z:-400});
                          $cam.world("set", {rotateX:0, rotateY:0, rotateZ:0});
                          break;
        case 37:/*left*/  $cam.world("moveX", -25);             break;
        case 38:/*up*/    $cam.world("moveZ", 25);              break;
        case 39:/*right*/ $cam.world("moveX", 25);              break;
        case 40:/*down*/  $cam.world("moveZ", -25);             break;
      }
    });

    function mouse_move (event) {
      // Rotate camera on local axis
      $cam.world("set", {
        localRotateX: event.pageY - lookPageY,
        localRotateY: event.pageX - lookPageX
      });

      // Reset Z rotation to zero
      $cam.world("set", {rotateZ:parseInt(lookRotZ)});

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

  var data = loadData();
  if ( data ) {
    restoreData(data);
  } else {
    var viewC = new ViewControl ();
    var buttonNavigation = new buttonInterface();
  }
});
