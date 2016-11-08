$(window).load(function(){
  $('.effect').each(function(){
    $(this).addClass('active');
  })
  $('.fade').addClass('active');
})

$(document).ready(function(){
  
  $('.cta').click(function(){
    $('html, body').animate({
      scrollTop: $("#anchor").offset().top
    }, 1000);
  });
  
  $('.first').bind('mousewheel', function(e){
    return false;
  });

});