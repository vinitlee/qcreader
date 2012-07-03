preload = new Image();

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
$('.back').click(decrement);
$('.forward').click(increment);
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