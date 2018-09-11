/*! Qranoko Starter Static v1.0.0 MIT by Qrac */

"use strict";

//----------------------------------------------------
// / Go to top
//----------------------------------------------------
$(function () {
  var gototop = $(".js-gototop");
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      gototop.addClass("is-active");
    } else {
      gototop.removeClass("is-active");
    }
  });
  gototop.click(function () {
    $("body,html").animate({
      scrollTop: 0
    }, 300);
    return false;
  });
}); //----------------------------------------------------
// Menu
//----------------------------------------------------

$(".js-menu-toggle").on("click", function () {
  $(".js-menu-toggle").toggleClass("is-active");
  $(".js-menu-content").toggleClass("is-active");
});
$(".js-menu-content a").on("click", function () {
  $(".js-menu-toggle").toggleClass("is-active");
  $(".js-menu-content").toggleClass("is-active");
}); //----------------------------------------------------
// Micromodal
//----------------------------------------------------
//MicroModal.init({
//  awaitCloseAnimation: true
//})
//----------------------------------------------------
// Smooth scroll
//----------------------------------------------------

$(function () {
  $('a[href^="#"]').on("click", function () {
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top;
    $("body,html").animate({
      scrollTop: position
    }, speed, "swing");
    return false;
  });
});