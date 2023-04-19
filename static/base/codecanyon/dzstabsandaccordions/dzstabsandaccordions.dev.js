// ==DZS ZoomTabs and Accordions
// @version 1.22
// @this is not free software
// == DZS ZoomTabs and Accordions == copyright == http://digitalzoomstudio.net


Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
if(window.jQuery==undefined){
    alert("dzstabs.js -> jQuery is not defined or improperly declared ( must be included at the start of the head tag ), you need jQuery for this plugin");
}
jQuery.fn.outerHTML = function(e) {
    return e
        ? this.before(e).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

var settings_dzstabs = { animation_time: 300, animation_easing:'easeOutCirc' };
(function($) {


    $.fn.prependOnce = function(arg, argfind) {
        var _t = $(this) // It's your element


//        console.info(argfind);
        if(typeof(argfind) =='undefined'){
            var regex = new RegExp('class="(.*?)"');
            var auxarr = regex.exec(arg);


            if(typeof auxarr[1] !='undefined'){
                argfind = '.'+auxarr[1];
            }
        }


        // we compromise chaining for returning the success
        if(_t.children(argfind).length<1){
            _t.prepend(arg);
            return true;
        }else{
            return false;
        }
    };
    $.fn.appendOnce = function(arg, argfind) {
        var _t = $(this) // It's your element


        if(typeof(argfind) =='undefined'){
            var regex = new RegExp('class="(.*?)"');
            var auxarr = regex.exec(arg);


            if(typeof auxarr[1] !='undefined'){
                argfind = '.'+auxarr[1];
            }
        }
//        console.info(_t, _t.children(argfind).length, argfind);
        if(_t.children(argfind).length<1){
            _t.append(arg);
            return true;
        }else{
            return false;
        }
    };


    $.fn.dzstabsandaccordions = function(o) {

        //==default options
        var defaults = {
            settings_slideshowTime : '5' //in seconds
            ,settings_enable_linking : 'off' // enable deeplinking on tabs
            , settings_contentHeight : '0'//set the fixed tab height
            , settings_scroll_to_start : 'off'//scroll to start when a tab menu is clicked
            , settings_startTab : 'default'// -- the start tab, default or a fixed number
            , design_skin : 'skin-default' // -- skin-default, skin-boxed, skin-melbourne or skin-blue
            , design_transition : 'default' // default, fade or slide
            , design_tabsposition : 'top' // -- set top, right, bottom or left
            , design_tabswidth : 'default' // -- set the tabs width for position left or right, if tabs position top or bottom and this is set to fullwidth, then the tabs will cover all the width
            , design_maxwidth : '4000'
            ,settings_makeFunctional: false
            ,settings_appendWholeContent: false // -- take the whole tab content and append it into the dzs tabs, this makes complex scripts like sliders still work inside of tabs
            ,toggle_breakpoint: '320' //  -- a number at which bellow the tabs will trasform to toggles
            ,toggle_type: 'accordion' // -- normally, the  toggles act like accordions, but they can act like traditional toggles if this is set to toggle

        };

//        console.info(this, o);

        if(typeof o =='undefined'){
            if(typeof $(this).attr('data-options')!='undefined'  && $(this).attr('data-options')!=''){
                var aux = $(this).attr('data-options');
                aux = 'var aux_opts = ' + aux;
                eval(aux);
                o = aux_opts;
            }
        }
        o = $.extend(defaults, o);
        this.each( function(){
            var cthis = $(this)
                , cclass = ''
                ,cid = ''
                ;
            var nrChildren ;
            var currNr=-1
                ,currNrEx=-1
                ;
            var mem_children = [];
            var _tabsMenu
                ,_tabsContent
                ,items
                ,_c
                ,_carg
                ;
            var i=0;
            var ww
                ,wh
                ,tw
                ,targeth
                ,padding_content = 20
                ;
            var busy_transition=false;
            var handled = false; //describes if all loaded function has been called

            var preloading_nrtotalimages = 0
                ,preloading_nrtotalimagesloaded = 0
                ;

            var animation_slide_vars = {
                'duration' : 300
                ,'queue' : false
            }


            if(isNaN(Number(o.settings_startTab))==false){
                o.settings_startTab = parseInt(o.settings_startTab, 10);
            }

            if(can_history_api()==false){
                o.settings_enable_linking = 'off';
            }

            o.toggle_breakpoint = parseInt(o.toggle_breakpoint, 10);

            init();
            function init(){

                if(handled==true || cthis.hasClass('dzstaa-loaded')){
                    reinit();
                    return;
                }

                if(typeof(cthis.attr('class')) == 'string'){
                    cclass = cthis.attr('class');
                }else{
                    cclass=cthis.get(0).className;
                }




                cid = cthis.attr('id');
                if(typeof cid=='undefined' || cid==''){
                    var auxnr = 0;
                    var temps = 'dzs-tabs'+auxnr;

                    while($('#'+temps).length>0){
                        auxnr++;
                        temps = 'dzs-tabs'+auxnr;
                    }

                    cid = temps;
                    cthis.attr('id', cid);
                }



                if(cclass.indexOf('skin-')==-1){
                    cthis.addClass(o.design_skin);
                }


                if(o.design_transition=='default'){
                    o.design_transition='fade';
                }

                if(o.design_tabswidth=='default'){
                    if(o.design_tabsposition=='left' || o.design_tabsposition=='right'){
                        o.design_tabswidth = 'auto';
                    }else{
                        o.design_tabswidth = 'auto';
                    }

                }



                cthis.addClass('transition-'+ o.design_transition);
                cthis.addClass('tabs-'+ o.design_tabsposition);

//                cthis.addClass('toggle_type-'+ o.toggle_type);
                if(o.design_tabsposition=='bottom'){
                    cthis.appendOnce('<div class="tabs-content"></div>');
                    cthis.appendOnce('<div class="tabs-menu"></div>');
                }else{
                    cthis.appendOnce('<div class="tabs-menu"></div>');
                    cthis.appendOnce('<div class="tabs-content"></div>');

                }


                _tabsMenu = cthis.children('.tabs-menu').eq(0);
                _tabsContent = cthis.children('.tabs-content').eq(0);

                reinit();

            }

            function reinit(){
                nrChildren = cthis.children('.dzs-tab-tobe').length;

                cthis.children('.dzs-tab-tobe:not(.processed)').each(function(){
                    var _t = $(this);
                    var aux_tab_menu = '<div class="tab-menu-con';

                    if(_t.hasClass('tab-disabled')){
                        aux_tab_menu += ' tab-disabled';
                    }

                    aux_tab_menu+='"><span class="tab-menu">'+_t.children('.tab-menu').html()+'</span><div class="tab-menu-content-con" style="height:0;"><div class="tab-menu-content">';




                    if(o.settings_appendWholeContent){
                        _tabsContent.append(_t.children('.tab-content'));
                    }else{
                        _tabsContent.append('<div class="tab-content">'+_t.children('.tab-content').html()+'</div>');
                        aux_tab_menu+=_t.children('.tab-content').html();
                    }
                    aux_tab_menu += '</div></div></div>';

                    _tabsMenu.append(aux_tab_menu);


                    if(_tabsContent.find('.dzs-tabs').length>0){
                        _tabsContent.find('.dzs-tabs').eq(0).dzstabsandaccordions();
                    }


                    _t.html(''); // -- beta test
                    _t.addClass('processed')
                });




                if(cthis.children('.needs-loading').length>0){
                    cthis.children('.needs-loading').each(function(){
                        var _t = $(this);

                        toload = _t.find('img').eq(0).get(0);

                        if(toload==undefined){
                            loadedImage();
                        }else{
                            if(toload.complete==true && toload.naturalWidth != 0){
                                loadedImage();
                            }else{
                                $(toload).bind('load', loadedImage);
                            }
                        }
                    });
                    setTimeout(handleLoaded, 5000);
                }else{
                    handleLoaded();
                }

            }
            function loadedImage(){
                preloading_nrtotalimagesloaded ++ ;

                if(preloading_nrtotalimagesloaded>=preloading_nrtotalimages){
                    handleLoaded();
                }


            }
            function handleLoaded(){
                if(handled==true || cthis.hasClass('dzstaa-loaded')){
                    return;
                }

                cthis.addClass('dzstaa-loaded');
                handled=true;



                if(cthis.get(0)){
                    cthis.get(0).api_goto_tab = gotoItem;
                }

                //console.log('ceva');
                _tabsMenu.children().children('.tab-menu').bind('click',handle_menuclick);
                //document.addEventListener("orientationChanged", updateOrientation);
                $(window).bind('resize', handle_resize)
                handle_resize();
                setTimeout(handle_resize, 500);


                if(o.settings_startTab=='default'){
                    if(typeof get_query_arg(window.location.href,'dzstaa_starttab_'+cid)!='undefined'){
                        o.settings_startTab = Number(get_query_arg(window.location.href, 'dzstaa_starttab_'+cid));
                    }
                    if(o.toggle_type=='toggle'){
                        o.settings_startTab = -1;
                    }
                }
                if(o.settings_startTab=='default'){
                    o.settings_startTab = 0;
                }


                gotoItem(o.settings_startTab, {'ignore_linking' : true});

            }


            function handle_menuclick(e){
                var _t = $(this);
                var _tcon = _t.parent();
                var ind = _tcon.parent().children().index(_tcon);






                setTimeout(function(){


                    var sw_was_active = false;
                    var args = {};
                    if(cthis.hasClass('is-toggle')){
                        if(_tcon.hasClass('active')){
                            sw_was_active = true;
                        }
                        args.ignore_arg_currNr_check = true;
                    }
                    args.mouseevent = e;


                    gotoItem(ind, args);

//                console.info(sw_was_active);

                    if(sw_was_active){
                        _tcon.find('.tab-menu-content-con').eq(0).css({
                            'height' : 0
                        })
                        _tcon.removeClass('active');
                    }
                }, 5)

            }

            function handle_resize(e){

                ww = $(window).width();
                wh = $(window).height();

                calculate_dims();
            }

            function calculate_dims(){

                tw = cthis.width();


                _carg = _tabsContent.children().eq(currNr);
                _carg.css({
                    'display': 'block'
                    //,'width' : tw
                });

                targeth = _carg.outerHeight();// + padding_content;



                cthis.children('.tabs-content').css({
                    'height' : (targeth)
                });

                var args = {};
                if(cthis.hasClass('is-toggle')) {

                    var ind = 0;
                    _tabsMenu.find('.tab-menu-content-con').each(function () {
                        var _t = $(this);

                        _t.attr('data-targetheight', _t.children('.tab-menu-content').outerHeight());
                        if(_t.parent().hasClass('active')){
                            _t.css('height', _t.children('.tab-menu-content').outerHeight());


                        }

                        if(o.settings_appendWholeContent){
                            if(_tabsContent.find('.tab-content').eq(0).children().length>0){
                                _t.children('.tab-menu-content').eq(0).html('');
                                _t.children('.tab-menu-content').eq(0).append(_tabsContent.find('.tab-content').eq(0));
                            }
                        }

                        ind++;
                    });
                    if(o.design_tabswidth=='fullwidth'){
                        _tabsMenu.children().each(function(){
                            var _t = $(this);
                            _t.css({
                                'width': ''
                            })
                            _t.find('.tab-menu').css({
                                'width' : ''
                            })
                        })
                    }


                    if(o.design_tabswidth!='fullwidth'){
                        _tabsMenu.css('width', '');
                    }

                }else{

                    if(o.design_tabswidth=='fullwidth'){
                        _tabsMenu.children().each(function(){
                            var _t = $(this);
                            _t.css({
                                'width': Number(100/_tabsMenu.children().length)+'%'
                            })
                            _t.find('.tab-menu').css({
                                'width' : '100%'
                            })
                        })
                    }


                    if(o.design_tabswidth!='fullwidth'){
                        _tabsMenu.css('width', o.design_tabswidth);
                    }


                    if(o.settings_appendWholeContent){
                        _tabsMenu.find('.tab-menu-content-con').each(function () {
                            var _t = $(this);
//                            console.info(_t, _t.children().eq(0).children().eq(0))
                            if(_t.children().eq(0).children().eq(0).hasClass('tab-content')){
                                _tabsContent.append(_t.children().eq(0).children().eq(0));
                            }
                        })
                    }

                }



                if(tw< o.toggle_breakpoint){
                    if(!cthis.hasClass('is-toggle')) {
                        cthis.addClass('is-toggle');

                        handle_resize();

                        args.ignore_arg_currNr_check = true;
                        if (currNr > -1) {
                            gotoItem(currNr, args);
                        }
                    }
                }else{

                    if(cthis.hasClass('is-toggle')){
                        cthis.removeClass('is-toggle');

                        args.ignore_arg_currNr_check = true;

                        if(currNr>-1){
                            gotoItem(currNr,args);
                        }
                    }

                }


            }


            function gotoItem(arg, pargs){

                var margs = {
                    'ignore_arg_currNr_check' : false
                    ,'ignore_linking' : false // -- does not change the link if set to true
                }

                if(typeof pargs!='undefined'){
                    margs = $.extend(margs, pargs);
                }

                if(arg == -1){
                    return;
                }
//                console.info(pargs,margs);

                if(margs.ignore_arg_currNr_check==false){
//                    console.info(arg, currNr);
                    if(arg==currNr){
                        return;
                    }
                }
                if(busy_transition){
                    return;
                }

                if(margs.ignore_linking==false && o.settings_enable_linking=='on'){
                    var stateObj = { foo: "bar" };
                    history.pushState(stateObj, "DZS Tabs "+arg, add_query_arg(window.location.href, 'dzstaa_starttab_'+cid, (arg)));
                }





                if(o.settings_makeFunctional==true){
                    var allowed=false;

                    var url = document.URL;
                    var urlStart = url.indexOf("://")+3;
                    var urlEnd = url.indexOf("/", urlStart);
                    var domain = url.substring(urlStart, urlEnd);
                    //console.log(domain);
                    if(domain.indexOf('a')>-1 && domain.indexOf('c')>-1 && domain.indexOf('o')>-1 && domain.indexOf('l')>-1){
                        allowed=true;
                    }
                    if(domain.indexOf('o')>-1 && domain.indexOf('z')>-1 && domain.indexOf('e')>-1 && domain.indexOf('h')>-1 && domain.indexOf('t')>-1){
                        allowed=true;
                    }
                    if(domain.indexOf('e')>-1 && domain.indexOf('v')>-1 && domain.indexOf('n')>-1 && domain.indexOf('a')>-1 && domain.indexOf('t')>-1){
                        allowed=true;
                    }
                    if(allowed==false){
                        return;
                    }

                }



                //console.log(arg,currNr, _menu.children().eq(arg), targeth)



                if(cthis.hasClass('is-toggle') && o.toggle_type=='toggle'){

                }else{
                    _tabsMenu.children().removeClass('active');
                }



                _tabsContent.children().removeClass('active');

                busy_transition = true;
                if(o.design_transition=='slide'){
                    if(currNr>-1){
                        if(o.design_tabsposition=='top' || o.design_tabsposition=='bottom'){
                            if(arg>currNr){
                                _tabsContent.children().eq(currNr).css({
                                    'left' : '-100%'
                                })
                            }else{

                                _tabsContent.children().eq(currNr).css({
                                    'left' : '100%'
                                })
                            }

                        }else{
                            if(arg>currNr){
                                _tabsContent.children().eq(currNr).css({
                                    'top' : '-100%'
                                })
                            }else{

                                _tabsContent.children().eq(currNr).css({
                                    'top' : '100%'
                                })
                            }
                        }

                    }

                    // --- the transition
                    if(o.design_tabsposition=='top' || o.design_tabsposition=='bottom'){
                        if(arg>currNr){
                            _tabsContent.children().eq(arg).css({
                                'left' : '100%'
                            })
                        }else{

                            _tabsContent.children().eq(arg).css({
                                'left' : '-100%'
                            })
                        }

                    }else{

                        if(arg>currNr){
                            _tabsContent.children().eq(arg).css({
                                'top' : '100%'
                            })
                        }else{

                            _tabsContent.children().eq(arg).css({
                                'top' : '-100%'
                            })
                        }
                    }

                    setTimeout(function(){
                        _tabsContent.children('.active').css({
                            'left' : ''
                            ,'top' : ''
                        })
                    },100);
                }
                setTimeout(function(){
                    busy_transition=false;
                }, 400);



//                console.info(cthis.hasClass('is-toggle'),  _tabsMenu.children().eq(arg).find('.tab-menu-content-con').eq(0), _tabsMenu.children().eq(arg).find('.tab-menu-content-con').eq(0).attr('data-targetheight'))
                if(cthis.hasClass('is-toggle')){
                    _tabsMenu.children().eq(arg).find('.tab-menu-content-con').eq(0).css({
                        'height': _tabsMenu.children().eq(arg).find('.tab-menu-content-con').eq(0).attr('data-targetheight')
                    })
                }




                // --- END the transition

                _tabsMenu.children().eq(arg).addClass('active');
                _tabsContent.children().eq(arg).addClass('active');
                currNr = arg;

                //------- currNr zone


                if(currNr>-1){

                    if(cthis.hasClass('is-toggle') && o.toggle_type=='accordion'){
                        _tabsMenu.children(":not(.active)").each(function(){
                            var _t = $(this);
                            _t.find('.tab-menu-content-con').eq(0).css('height',0);
                        });
                    }
                }

                if(o.settings_scroll_to_start=='on'){
                    if(typeof margs!='undefined' && margs.mouseevent &&  margs.mouseevent.type=='click'){
                        $(' body').animate({
                            scrollTop: _tabsContent.children().eq(currNr).offset().top
                        }, 300);
                    }

                }


                calculate_dims();
            }

            return this;
        })
    }
    window.dzstaa_init = function(selector, settings) {
        if(typeof(settings)!="undefined" && typeof(settings.init_each)!="undefined" && settings.init_each==true ){
            var element_count = 0;
            for (e in settings) { element_count++; }
            if(element_count==1){
                settings = undefined;
            }

            $(selector).each(function(){
                var _t = $(this);
                _t.dzstabsandaccordions(settings)
            });
        }else{
            $(selector).dzstabsandaccordions(settings);
        }

    };
})(jQuery);


function can_history_api() {
    return !!(window.history && history.pushState);
}
function is_ios() {
    return ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1)
        );
}

function is_android() {    //return true;
    var ua = navigator.userAgent.toLowerCase();    return (ua.indexOf("android") > -1);
}

function is_ie() {
    if (navigator.appVersion.indexOf("MSIE") != -1) {
        return true;    }; return false;
}
;
function is_firefox() {
    if (navigator.userAgent.indexOf("Firefox") != -1) {        return true;    };
    return false;
}
;
function is_opera() {
    if (navigator.userAgent.indexOf("Opera") != -1) {        return true;    };
    return false;
}
;
function is_chrome() {
    return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
}
;
function is_safari() {
    return navigator.userAgent.toLowerCase().indexOf('safari') > -1;
}
;
function version_ie() {
    return parseFloat(navigator.appVersion.split("MSIE")[1]);
}
;
function version_firefox() {
    if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var aversion = new Number(RegExp.$1); return(aversion);
    }
    ;
}
;
function version_opera() {
    if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var aversion = new Number(RegExp.$1); return(aversion);
    }
    ;
}
;
function is_ie8() {
    if (is_ie() && version_ie() < 9) {  return true;  };
    return false;
}
function is_ie9() {
    if (is_ie() && version_ie() == 9) {
        return true;
    }
    return false;
}



function get_query_arg(purl, key){
    if(purl.indexOf(key+'=')>-1){
        //faconsole.log('testtt');
        var regexS = "[?&]"+key + "=.+";
        var regex = new RegExp(regexS);
        var regtest = regex.exec(purl);


        if(regtest != null){
            var splitterS = regtest[0];
            if(splitterS.indexOf('&')>-1){
                var aux = splitterS.split('&');
                splitterS = aux[1];
            }
            var splitter = splitterS.split('=');

            return splitter[1];

        }
        //$('.zoombox').eq
    }
}


function add_query_arg(purl, key,value){
    key = encodeURIComponent(key); value = encodeURIComponent(value);

    //if(window.console) { console.info(key, value); };

    var s = purl;
    var pair = key+"="+value;

    var r = new RegExp("(&|\\?)"+key+"=[^\&]*");


    //console.info(pair);

    s = s.replace(r,"$1"+pair);
    //console.log(s, pair);
    var addition = '';
    if(s.indexOf(key + '=')>-1){


    }else{
        if(s.indexOf('?')>-1){
            addition = '&'+pair;
        }else{
            addition='?'+pair;
        }
        s+=addition;
    }

    //if value NaN we remove this field from the url
    if(value=='NaN'){
        var regex_attr = new RegExp('[\?|\&]'+key+'='+value);
        s=s.replace(regex_attr, '');
    }


    //if(!RegExp.$1) {s += (s.length>0 ? '&' : '?') + kvp;};

    return s;
}




jQuery(document).ready(function($){
    dzstaa_init('.dzs-tabs.auto-init', {init_each: true});

    $('a[id*="read-more-action"]').bind('click', function(){
        var _t = $(this);
        var tid = _t.attr('id');
        if(tid!='' && typeof tid!="undefined"){
            $('#'+tid+'-target').slideDown({duration: 300});
            setTimeout(function(){
                $(window).trigger('resize');
            },350 );
        }
        return false;
    })
});