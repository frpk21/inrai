jQuery(document).ready(function($){


//    console.info($('.dzs-single-upload'));
    if(window.dzsuploader_single_init){
        window.dzsuploader_single_init('.dzs-single-upload', {});
    }

    $('body.page-register .register-btn').bind('click', handle_mouse);

    $(document).delegate('.btn-autogenerate-waveform-bg', 'click', click_btn_autogenerate_waveform_bg);
    $(document).delegate('.btn-autogenerate-waveform-prog', 'click', click_btn_autogenerate_waveform_prog);

    $('.id-upload-mp3').each(function(){

        var _t = $(this);

        _t.get(0).api_finished_upload = function(arg,args){
//            console.info(arg,args);

            if(arg.indexOf('.mp3')>-1){
                $('#upload-tabs').find('.tab-disabled').removeClass('tab-disabled');
                $('#upload-tabs').get(0).api_goto_tab(1);
            }else{
                $('.notices-box').append('<li class="notice notice-mp3notmatch">file should be an mp3</li>');

                setTimeout(function(){
                    $('.notice-mp3notmatch').eq(0).fadeOut(1000);
                    setTimeout(function(){

                        $('.notice-mp3notmatch').eq(0).remove();
                    }, 1000)
                },1000)
                return false;
            }


        }

    });


//    console.info($('.playlists-con .playlist-btn'));
    $('.playlists-con .playlist-btn').bind('click',handle_mouse);

//    $('#upload-mp3').get(0).ceva='alceva';


    function handle_mouse(e){
        var _t = $(this);

        if(e.type=='click'){
            if(_t.hasClass('register-btn')){
                console.info(_t);

                if($('input[name=pass]').val() != $('input[name=pass_confirm]').val()){

                    $('.notices-box').append('<li class="notice notice-passmatch">password and confirm password do not match</li>');

                    setTimeout(function(){
                        $('.notice-passmatch').eq(0).fadeOut(1000);
                        setTimeout(function(){

                            $('.notice-passmatch').eq(0).remove();
                        }, 1000)
                    },1000)
                    return false;
                }
            }
            if(_t.hasClass('playlist-btn')){

//                console.info(_t);



                if(_t.hasClass('active')){


                    var data = {
                        action: 'dzsap_retract_playlist_entry',
                        playlistid: _t.attr('data-id'),
                        mediaid: dzsap_settings.mediaid
                    };


                    $.ajax({
                        type: "POST",
                        url: dzsap_settings.settings_php_handler,
                        data: data,
                        success: function(response) {
                            if(typeof window.console != "undefined" ){ console.log('Got this from the server: ' + response); }

                            _t.removeClass('active');
                        },
                        error:function(arg){
                            if(typeof window.console != "undefined" ){ console.log('Got this from the server: ' + arg, arg); };

                        }
                    });


                }else{


                    var data = {
                        action: 'dzsap_submit_playlist_entry',
                        playlistid: _t.attr('data-id'),
                        mediaid: dzsap_settings.mediaid
                    };


                    $.ajax({
                        type: "POST",
                        url: dzsap_settings.settings_php_handler,
                        data: data,
                        success: function(response) {
                            if(typeof window.console != "undefined" ){ console.log('Got this from the server: ' + response); }

                            _t.addClass('active');
                        },
                        error:function(arg){
                            if(typeof window.console != "undefined" ){ console.log('Got this from the server: ' + arg, arg); };

                        }
                    });

                }
            }
        }
    }


    function click_btn_autogenerate_waveform_bg(e){
        var _t = $(this);
        var _themedia = '';


        _themedia = $('.id-upload-mp3').eq(0).val();



        if(typeof dzsap_settings!='undefined'){

            //console.info(_themedia);

            var s_filename_arr = _themedia.split('/');

            //console.info(s_filename_arr);
            var s_filename = s_filename_arr[s_filename_arr.length-1];

            s_filename = encodeURIComponent(s_filename);
            s_filename = s_filename.replace('.', '');
            s_filename = s_filename.replace(/ /g, '');



            window.waves_filename = '{{dirname}}waves/scrubbg_'+s_filename+'.png';
            ///console.info(s_filename);

            var aux='<object type="application/x-shockwave-flash" data="'+dzsap_settings.thepath+'wavegenerator.swf" width="230" height="30" id="flashcontent" style="visibility: visible;"><param name="movie" value="'+dzsap_settings.thepath+'wavegenerator.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="settings_multiplier='+dzsap_settings.waveformgenerator_multiplier+'&media='+_themedia+'&savetophp_loc='+dzsap_settings.thepath+'savepng.php&savetophp_pngloc='+window.waves_filename+'&savetophp_pngprogloc=waves/scrubprog.png&color_wavesbg='+dzsap_settings.color_waveformbg+'&color_wavesprog='+dzsap_settings.color_waveformprog+'&settings_wavestyle='+dzsap_settings.settings_wavestyle+'&settings_onlyautowavebg=on&settings_enablejscallback=on"></object>';


            _t.parent().append(aux);
            if(_t.parent().prev().hasClass('upload-prev')){
                window.waves_fieldtaget = _t.parent().prev();
            }else{
                window.waves_fieldtaget = _t.parent().prev().prev();
            }


            _t.hide();
        }


        return false;
    }


    function click_btn_autogenerate_waveform_prog(e){
        var _t = $(this);
        var _themedia = '';

        _themedia = $('.id-upload-mp3').eq(0).val();



        if(typeof dzsap_settings!='undefined'){

            //console.info(_themedia);

            var s_filename_arr = _themedia.split('/');

            //console.info(s_filename_arr);
            var s_filename = s_filename_arr[s_filename_arr.length-1];

            s_filename = encodeURIComponent(s_filename);
            s_filename = s_filename.replace('.', '');



            window.waves_filename = '{{dirname}}waves/scrubprog_'+s_filename+'.png';
            ///console.info(s_filename);

            var aux='<object type="application/x-shockwave-flash" data="'+dzsap_settings.thepath+'wavegenerator.swf" width="230" height="30" id="flashcontent" style="visibility: visible;"><param name="movie" value="'+dzsap_settings.thepath+'wavegenerator.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="settings_multiplier='+dzsap_settings.waveformgenerator_multiplier+'&media='+_themedia+'&savetophp_loc='+dzsap_settings.thepath+'savepng.php&savetophp_pngloc='+window.waves_filename+'&savetophp_pngprogloc='+window.waves_filename+'&color_wavesbg='+dzsap_settings.color_waveformbg+'&color_wavesprog='+dzsap_settings.color_waveformprog+'&settings_wavestyle='+dzsap_settings.settings_wavestyle+'&settings_onlyautowaveprog=on&settings_enablejscallback=on"></object>';


            _t.parent().append(aux);
            if(_t.parent().prev().hasClass('upload-prev')){
                window.waves_fieldtaget = _t.parent().prev();
            }else{
                window.waves_fieldtaget = _t.parent().prev().prev();
            }


            _t.hide();
        }


        return false;
    }
});



window.waves_fieldtaget = null;
window.waves_filename = null;


window.api_wavesentfromflash = function(arg){
    //console.info(window.waves_fieldtaget);
    if(window.waves_fieldtaget){
        window.waves_filename = window.waves_filename.replace('{{dirname}}', dzsap_settings.thepath);
        window.waves_fieldtaget.val(window.waves_filename);
        window.waves_fieldtaget.trigger('change');
        if(window.waves_fieldtaget.next().hasClass('aux-wave-generator')){

            window.waves_fieldtaget.next().find('button').show();
            window.waves_fieldtaget.next().find('object').remove();
        }else{

            window.waves_fieldtaget.next().next().find('button').show();
            window.waves_fieldtaget.next().next().find('object').remove();
        }
    }
    if(window.console) { console.info( arg); };
}