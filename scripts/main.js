update = function() {
    $('.comic').attr('src','http://questionablecontent.net/comics/'+$('#number').attr('value')+'.png');
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
$('.back').click(decrement);
$('.forward').click(increment);
//$('.back').bind('touchend',decrement);
//$('.forward').bind('touchend',increment);
$('#number').blur(update);
$('#number').keypress(function(e){
    if (e.which==13) {
        this.blur();
        update();
    }
});
$('body').ready(function() {
    $('#number').attr('value',localStorage.number);
    update();
});