$(window).on('load',function(){
    waterfall();
        var dataInt={"data":[{"src":'20.jpg'},{"src":'21.jpg'},{"src":'22.jpg'},{"src":'23.jpg'},{"src":'24.jpg'},{"src":'25.jpg'},{"src":'26.jpg'},{"src":'27.jpg'},{"src":'28.jpg'},{"src":'29.jpg'},{"src":'30.jpg'},{"src":'31.jpg'},{"src":'32.jpg'},{"src":'33.jpg'},{"src":'34.jpg'},{"src":'35.jpg'},{"src":'36.jpg'},{"src":'37.jpg'},{"src":'38.jpg'},{"src":'39.jpg'},{"src":'40.jpg'},{"src":'41.jpg'},{"src":'42.jpg'},{"src":'43.jpg'},{"src":'44.jpg'},{"src":'45.jpg'},{"src":'46.jpg'},{"src":'47.jpg'},{"src":'48.jpg'},{"src":'49.jpg'},{"src":'50.jpg'}]}
    $(window).on('scroll',function(){
        if(checkScrollSlide()){
            $.each(dataInt.data,function(key,value){
                var oBox=$('<div>').addClass('box').appendTo('#main');
                var oPic=$('<div>').addClass('pic').appendTo($(oBox));
                $('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(oPic));
            })
            waterfall();
        }
    })
})

function waterfall(){
    var $boxs=$('#main>div');
    var w=$boxs.eq(0).outerWidth();
    var cols=Math.floor($(window).width()/w);
    $('main').width(w*cols).css('margin','0 auto');
    var hArr=[];
    $boxs.each(function(index,value){/*遍历boxs
*/
        var h=$boxs.eq(index).outerHeight();
        if(index<cols){
            hArr[index]=h;
        }
        else{
            var minH=Math.min.apply(null, hArr);
            var minHIndex=$.inArray(minH,hArr);
            $(value).css({
                'position':'absolute',
                'top':minH+'px',
                'left':minHIndex*w+'px'
            })
            hArr[minHIndex]+=$boxs.eq(index).outerHeight();
        }
    })
}

function checkScrollSlide(){
    var $lastBox=$('#main>div').last();
    var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
    var scrollTop=$(window).scrollTop();
    var documentH=$(window).height();
    return (lastBoxDis<scrollTop+documentH)?true:false;
}