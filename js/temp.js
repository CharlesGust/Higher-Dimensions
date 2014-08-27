$(document).ready(function() {

  function viewControl () {

    var $header = $('.navigation');
    var $links = $('.navigation .navigation__link');
    var $aside = $('.sidebar');
    var $buttons = $('.sidebar div');
    var currentActive = '#base';

    $('#base').on('click', initializeBase);
    $('#2-5').on('click', initializeTwoFive);
    $('#3-D').on('click', initializeThreeD);

    function changeActiveButton (button) {

      $(button).addClass('sidebar__button--active').removeClass('sidebar__button');
      $(currentActive).addClass('sidebar__button').removeClass('sidebar__button--active');

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

  var viewC = new viewControl ();
});
