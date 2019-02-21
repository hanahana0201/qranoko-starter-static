//----------------------------------------------------
// Menu
//----------------------------------------------------

$(".js-menu-toggle").on("click", function() {
  $(".js-menu-toggle").toggleClass("is-active")
  $(".js-menu-content").toggleClass("is-active")
})

$(".js-menu-content a").on("click", function() {
  $(".js-menu-toggle").toggleClass("is-active")
  $(".js-menu-content").toggleClass("is-active")
})
