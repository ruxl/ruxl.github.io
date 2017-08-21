$(document).ready(function(){
  $('#fullpage').fullpage({
    onLeave: function(index, nextIndex, direction){
      if(index == 4 && direction == "down"){
        $('.scroll').animate({
          'opacity': '0'
        }, 100);
      }
      else{
        $('.scroll').animate({
          'opacity': '0'
          }, 100).delay(500).animate({
          'opacity': '1'
        })
      }
      
    }
  });
  $('.scroll').on('click', function(){
    $.fn.fullpage.moveSectionDown();
  })
})