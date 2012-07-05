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
paginate = function(step,disp,segs) {
    disp = disp || 0;
    segs = segs || 4;
    
    segment = $('.comic').height()/4;
    maxScroll = $('.comic').height()-$(window).height();
    curScroll = $(document).scrollTop();
    
    if ((curScroll >= maxScroll) && (step > 0)) {
        increment();
        $("html, body").animate({ scrollTop: 0 },10);
        return null;
    }
    if ((curScroll <= 0) && (step < 0)) {
        decrement();
        $("html, body").animate({ scrollTop: maxScroll },10);
        return null;
    }
    
    newScroll = (Math.floor((curScroll+1-disp)/segment+step)*segment+disp)
    newScroll = newScroll + "px"
    
    $("html, body").animate({ scrollTop: newScroll },100);
}

preload = new Image();

$('body').ready(function() {
    $('#number').attr('value',localStorage.number);
    update();
});
$('.back').mousedown(decrement);
$('.forward').mousedown(increment);
$('.pgup').mousedown(function() {paginate(-1);});
$('.pgdn').mousedown(function() {paginate(1);});
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
      paginate(1);
      return null;
    }
    // Up
    if (e.which == 38) { 
      paginate(-1);
      return null;
    }
});