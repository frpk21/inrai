(function($) {

    $.fn.dzstooltip = function(o) {

        var defaults = {
            settings_slideshowTime : '5' //in seconds
            , settings_autoHeight : 'on'
            , settings_skin : 'skin-default'
        }

        o = $.extend(defaults, o);
        this.each( function(){
            var cthis = $(this)
                ,cchildren = cthis.children()
            ,cclass = '';
            ;
            var aux,
                auxa
            ;
            var ww = 0 // -- window width
            ;

            var _tooltip = $(this).find('.dzstooltip').eq(0);
            var currNr=-1;
            
            console.info(cthis);

            cclass = _tooltip.attr('class');








            init();

            function init(){


                var reg_align = new RegExp('align-(?:\\w*)',"g");
                auxa = reg_align.exec(cclass);
                aux = '';


                if(auxa && auxa[1]){
                    aux = auxa[1]
                }else{
                    aux = 'align-left';
                }

                cthis.data('original-align', aux);
                _tooltip.data('original-align', aux);

                if(cthis.hasClass('for-click')){
                    cthis.bind('click', click_cthis);
                }

                $(window).bind('resize', handle_resize);
                handle_resize();
            }


            function calculate_dims(){

                if(_tooltip.hasClass('align-center')){

                    _tooltip.css('margin-left', -(_tooltip.outerWidth()/2) + ( cthis.outerWidth()/2))
                }

                _tooltip.removeClass('align-right');
                _tooltip.addClass(_tooltip.data('original-align'));
                if(_tooltip.data('original-align')=='align-left' || _tooltip.data('original-align')=='align-center'){
//                    console.info(cthis, _tooltip, _tooltip.offset().left, _tooltip.outerWidth(), ww)
                    if(_tooltip.offset().left + _tooltip.outerWidth() > ww - 50){
                        _tooltip.removeClass(_tooltip.data('original-align'));
                        _tooltip.addClass('align-right');
                    }else{
                        if(_tooltip.hasClass('align-right')){
                            _tooltip.removeClass('align-right');
                            _tooltip.addClass(_tooltip.data('original-align'));
                        }
                    }
                }
            }

            function handle_resize(e){
                ww=$(window).width();
                calculate_dims();
            }

            function click_cthis(e){

                var _c = cthis.find('.dzstooltip');
                if(_c.hasClass('active')){
                    _c.removeClass('active');



                }else{
                    _c.addClass('active');


                    if(parseInt(cthis.offset().left, 10) + _c.width() > parseInt($(window).width(), 10) - 50){
                        _c.addClass('align-right');
                    }else{
                        _c.removeClass('align-right');
                    }
                }

                //console.info(cthis.offset().left);




            }
            return this;
        })
    }
    window.dzstt_init = function(arg, optargs){
        $(arg).dzstooltip(optargs);
    }
})(jQuery);



if(typeof jQuery!='undefined'){
    jQuery(document).ready(function($){
        dzstt_init('.dzstooltip-con.js',{});
    })
}else{
    alert('dzstooltip.js - this plugin is based on jQuery -> please include jQuery')
}