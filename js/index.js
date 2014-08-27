function User() {
  // this class is for all the user interaction we might have.
  var $navBarLI = $(".navigation li");

  // jWorld doesn't manipulate <a> objects, so we have to insert the <a>
  // into an element which can move, like <div> or <span>.
  $navBarLI.each(function() {
    var $firstChild = $(this.firstChild);

    // wrap the <a> in a <div>. The wrap function returns the initial element
    // not what you get after the wrap.
    $firstChild = $firstChild.wrap("<div></div>");

    // remove the navigation__link class from the <li>
    $(this).removeClass("navigation__link");

    // add navigation__link class to <div>
    var $divWClassAttr = $firstChild.parent().addClass("navigation__link");

    // change style of <div> to inline-block
    $divWClassAttr.attr("display", "block");
  });

  $navBarLI.on("mouseenter", function(ev) {
    // the first child of the <li> is a <div>
    var $t = $(this.firstChild);
    $t.css("background", "#dfa");
    $t.world("page", {transition: "none", rotateY: -178});
    setTimeout(function() {
      $t.world("page", {transition: ".45s ease-out", rotateY: -10, z:40});
    }, 5);
  });

  $navBarLI.on("mouseleave", function(ev) {
    // the first child of the <li> is a <div>
    var $t = $(this.firstChild);
    $t.css("background", "#2BCDB7");
    $t.world("page", {});
  });

}
//End User


function ViewControl () {

  var $header = $('.navigation');
  var $links = $('.navigation .navigation__link');
  var $aside = $('.sidebar');
  var $buttons = $('.sidebar div');
  var currentActive = '#base';

  $('#base').on('click', initializeBase);
  $('#2-5').on('click', initializeTwoFive);
  $('#3-D').on('click', initializeThreeD);

  function changeActiveButton (button) {

    $(button)
      .addClass('sidebar__button--active')
      .removeClass('sidebar__button');
    $(currentActive)
      .addClass('sidebar__button')
      .removeClass('sidebar__button--active');

    currentActive = button;
  }

  function initializeBase () {

    $header.world('page', 'clearAll');
    $links.world('page', 'clearAll');
    $aside.world('page', 'clearAll');
    $buttons.world('page', 'clearAll');

    changeActiveButton('#base');
  }

  function initializeTwoFive () {

    $header.world('page', {transition:".5s ease-in-out", z: -5, rotateX: -5});
    $links.world('page', {transition:".5s ease-in-out", z: 5, rotateX: 5});

    $aside.world('page', {transition:".5s ease-in-out", z: -5, rotateY: 5});
    $buttons.world('page', {transition:".5s ease-in-out", z: 5, rotateY: -5});

    changeActiveButton('#2-5');
  }

  function initializeThreeD () {


  }
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
