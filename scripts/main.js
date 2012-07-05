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
paginate = function(step,panes,disp) {
    ch = $('.comic').height()
    wh = $(window).height()
    
    panes = panes || 4;
    disp = disp || 0;
    
    step = Math.floor(step * wh / (ch / panes)) || step;
    console.log(step);
    
    segment = ch/4;
    maxScroll = ch-wh;
    curScroll = $(document).scrollTop();
    
    if ((curScroll >= maxScroll) && (step > 0)) {
        increment();
        $("html, body").animate({ scrollTop: 0 },40);
        return null;
    }
    if ((curScroll <= 0) && (step < 0)) {
        decrement();
        $("html, body").scrollTop(maxScroll);
        $("html, body").animate({ scrollTop: maxScroll },40);
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
    if (localStorage.firstTime == undefined) {
        $('.helpbox').toggle();
        localStorage.firstTime = false;
    }
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

$('.helpbox, .help').mousedown(function() {
    $('.helpbox').toggle();
});