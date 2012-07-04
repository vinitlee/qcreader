update = function() {
    num = parseInt($('#number').attr('value'))
    $('.comic').attr('src','http://questionablecontent.net/comics/'+num+'.png');
    preload.src = 'http://questionablecontent.net/comics/'+(num+1)+'.png';
    $(window).scrollTop(0);
    localStorage.number = $('#number').attr('value');
}
increment = function() {
    comic = $('#number');
    comic.attr('value',parseInt(comic.attr('value'))+1);
    update();
}
decrement = function() {
    comic = $('#number');
    currentval = parseInt(comic.attr('value'));
    comic.attr('value',(currentval<=1)?1:currentval-1);
    update();
}
paginate = function() {
    segment = $('.comic').height()/4;
    maxScroll = $('.comic').height()-$(window).height();
    curScroll = $(document).scrollTop();
    if (curScroll >= maxScroll) {
        increment();
        return null;
    }
    $(document).scrollTop(Math.floor((curScroll+1)/segment+1)*segment);
}
depaginate = function() {
    segment = $('.comic').height()/4;
    curScroll = $(document).scrollTop();
    $(document).scrollTop(Math.floor((curScroll+1)/segment-1)*segment);
}

preload = new Image();

$('body').ready(function() {
    $('#number').attr('value',localStorage.number);
    update();
});
$('.back').click(decrement);
$('.forward').click(increment);
$('#number').blur(update);
$('#number').keypress(function(e){
    if (e.which==13) {
        this.blur();
        update();
    }
});
$('#number').keypress(function(e){
    if (e.which==13) {
        this.blur();
        update();
        return null;
    }
});

$(document).keydown(function(e){
    // Left
    if (e.which == 37) { 
      decrement();
      return null;
    }
    // Right
    if (e.which == 39) { 
      increment();
      return null;
    }
    // Down
    if (e.which == 40) { 
      paginate();
      return null;
    }
    // Up
    if (e.which == 38) { 
      depaginate();
      return null;
    }
});