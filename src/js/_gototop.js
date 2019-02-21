//----------------------------------------------------
// / Go to top
//----------------------------------------------------

$(function() {
  const gototop = $(".js-gototop")
  $(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
      gototop.addClass("is-active")
    } else {
      gototop.removeClass("is-active")
    }
  })
  gototop.click(function() {
    $("body,html").animate(
      {
        scrollTop: 0
      },
      300
    )
    return false
  })
})
