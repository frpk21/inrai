<?php
include_once(dirname(__FILE__).'/class-portal.php');

$dzsap_portal = new DZSAP_Portal();

//print_r($dzsap_portal);
$page = $dzsap_portal->currPage;
?><!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta http-equiv="X-UA-COMPATIBLE" content="IE=EDGE">
        <title>Audio Player Preview</title>
        <script src="../js/jquery.js"></script>
        <link href="../bootstrap/bootstrap.css" rel="stylesheet">
        <link href="../bootstrap/bootstrap-responsive.css" rel="stylesheet">
        <link rel='stylesheet' type="text/css" href="../style/style.css"/>
        <link rel='stylesheet' type="text/css" href="../audioplayer/audioplayer.css"/>
        <script src="../audioplayer/audioplayer.js" type="text/javascript"></script>
        <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
        <?php if ($page == 'upload' || $page == 'usersettings' || isset($_GET['media'])) { ?>
            <link rel="stylesheet" href="../dzstabsandaccordions/dzstabsandaccordions.css">
            <script src="../dzstabsandaccordions/dzstabsandaccordions.js" type="text/javascript"></script>
            <link rel="stylesheet" href="../dzsuploader/upload.css">
            <script src="../dzsuploader/upload.js" type="text/javascript"></script>
        <?php } ?>
        <script>
            var dzsap_settings = {
                thepath: "<?php echo $dzsap_portal->url_base; ?>"
                , waveformgenerator_multiplier: "1"
                , color_waveformbg: "111111"
                , color_waveformprog: "ef6b13"
                , settings_wavestyle: "reflect"<?php
                echo ',settings_php_handler: "publisher.php"';
                if(isset($_GET['media'])){
                    echo ',mediaid:"'.$_GET['media'].'"';
                }
            ?>};</script>
    </head>
    <body class="page-<?php echo $page; ?>">
        <div class="content-wrapper">

            <section class="mcon-mainmenu" style="position: absolute; top:0; z-index: 5; width:100%;">

                <!--
                -->
                <div class="container">
                    <div class="row">
                        <div class="logo-con col-md-3"> logo
                        </div>
                        <div class="header--right col-md-9"><?php
//                echo $dzsap_portal->currUserId;
                            if ($dzsap_portal->currUserId === '0') {
                                echo '<a class="login-login" href="'.$dzsap_portal->url_portalphp.'?page=login">Log In</a> or <a  class="login-signup" href="'.$dzsap_portal->url_portalphp.'?page=register">Sign Up</a>';
                            } else {
                                echo '<a style="display:inline-block; vertical-align:middle;" class="anchor-page-upload" href="'.$dzsap_portal->url_portalphp.'?page=upload">Upload</a>&nbsp;&nbsp;&nbsp;'
                                .'<span class="user-menu-con">'
                                .'<span class="user-avatar" style="background-image: url('.$dzsap_portal->get_avatar($dzsap_portal->currUserId).'"></span>'
                                .'<ul class="user-menu--options">'
                                .'<li><a href="'.$dzsap_portal->url_portalphp.'?page=usersettings"><i class="fa fa-gear"></i> &nbsp;Settings</a></li>'
                                .'<li><a href="'.$dzsap_portal->url_portalphp.'?page=uservideos&id_user='.$dzsap_portal->currUserId.'"><i class="fa fa-video-camera"></i> &nbsp;Videos</a></li>'
                                .'<li><a href="'.$dzsap_portal->url_portalphp.'?page=userplaylists"><i class="fa fa-reorder"></i> &nbsp;Playlists</a></li>'
                                .'<li><form style="display:block;"  class="logout-form" method="post"><button name="action" value="logout" class="btn-nostyling"><i class="fa fa-plug"></i> &nbsp;Log Out</button></form></li>'
                                .'</ul>'
                                .'</span>';
                            }
                            ?></div>
                    </div>
                </div>
            </section>

            <div class="header--padder"></div>
            <?php if ($page == 'register') { ?>
                <section class="mcon-registerbox">
                    <ul class="notices-box"><?php echo $dzsap_portal->notices_html; ?></ul>
                    <div class="facebook-box">Sign in with Facebook</div>
                    <div class="table-separator">
                        <span class="table-cell"><span class="the-line"></span></span>
                        <span class="table-center">or</span>
                        <span class="table-cell"><span class="the-line"></span></span>

                    </div>
                    <h5 class="input-label">Sign up with email</h5>

                    <form class="register-form" method="POST">
                        <input type="hidden" name="action" value="register"/>
                        <input type="email" class="fullwidth simple-input-field" name="email"/>
                        <div class="dzspb_lay_con">
                            <div class="dzspb_layb_one_half">

                                <h5 class="input-label">Password</h5>
                                <input type="password" class="fullwidth simple-input-field" name="pass"/>
                            </div>
                            <div class="dzspb_layb_one_half">

                                <h5 class="input-label">Confirm Password</h5>
                                <input type="password" class="fullwidth simple-input-field" name="pass_confirm"/>
                            </div>
                        </div>
                        <br>
                        <button class="btn-primary register-btn">Register</button>
                    </form>
                </section>
            <?php } ?>

            <?php if ($page == 'login') { ?>
                <section class="mcon-registerbox">
                    <ul class="notices-box"><?php echo $dzsap_portal->notices_html; ?></ul>
                    <div class="facebook-box">Sign in with Facebook</div>
                    <div class="table-separator">
                        <span class="table-cell"><span class="the-line"></span></span>
                        <span class="table-center">or</span>
                        <span class="table-cell"><span class="the-line"></span></span>

                    </div>
                    <h5 class="input-label">Sign in with email</h5>

                    <form class="login-form" method="POST">
                        <input type="hidden" name="action" value="login"/>
                        <input type="email" class="fullwidth simple-input-field" name="email"/>
                        <h5 class="input-label">Password</h5>
                        <input type="password" class="fullwidth simple-input-field" name="pass"/>
                        <br>
                        <br>
                        <button class="btn-primary register-btn">Login</button>
                    </form>
                </section>
            <?php } ?>

            <?php if ($page == 'upload') { ?>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>Track Upload</h2>
                            <?php
                            if ($dzsap_portal->currUserId === '0') {
                                ?>
                                <div class="error">You are not logged in therefore no access to this page.</div>
                            <?php } else { ?>
                                <ul class="notices-box"><?php echo $dzsap_portal->notices_html; ?></ul>
                                <form class="form-addtrack" method="POST">
                                    <input type="hidden" name="action" value="addtrack"/>
                                    <style id="dzstabs_accordio_styling">
                                        #upload-tabs{color: #111; padding: 0;} #upload-tabs.skin-blue .tabs-menu .tab-menu-con.active .tab-menu{ background-color: #db4343;  } #upload-tabs.skin-blue .tabs-menu .tab-menu-con .tab-menu{ background-color: #777; color: #eee; } #upload-tabs .tab-menu-con{ border-left: 1px solid rgba(0,0,0,0.1); border-bottom: 1px solid rgba(0,0,0,0.1); border-right: 1px solid rgba(0,0,0,0.1);}
                                    </style>
                                    <div id="upload-tabs" class="dzs-tabs auto-init skin-blue tab-menu-content-con---no-padding" data-options="{ 'design_tabsposition' : 'top'
                                         ,design_transition: 'fade'
                                         ,design_tabswidth: 'default'
                                         ,toggle_breakpoint : '4000'
                                         ,design_tabswidth: 'fullwidth'
                                         ,settings_appendWholeContent: true
                                         ,toggle_type: 'accordion'}">

                                        <div class="dzs-tab-tobe">
                                            <div class="tab-menu ">
                                                Step 01
                                            </div>
                                            <div class="tab-content">
                                                <div style="padding: 10px; text-align: center;">
                                                    <h5 class="input-label">Upload the .mp3</h5>
                                                    <div class="dzs-upload-con">
                                                        <input type="text" class="simple-input-field target-field id-upload-mp3" name="source"/>
                                                        <span class="dzs-single-upload">
                                                            <input class="" name="file_field" type="file" accept=".mp3">
                                                        </span>
                                                        <div class="table-separator">
                                                            <span class="table-cell"><span class="the-line"></span></span>
                                                            <span class="table-center">or</span>
                                                            <span class="table-cell"><span class="the-line"></span></span>

                                                        </div>
                                                        <div class="dzs-single-upload drag-drop">
                                                            <div class="dzs-single-upload--areadrop">
                                                                <input class="" name="file_field" type="file">
                                                                <div class="instructions">drag &amp; drop the file</div>
                                                            </div>
                                                        </div>
                                                        <div class="feedback"></div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                        <div class="dzs-tab-tobe tab-disabled">
                                            <div class="tab-menu ">
                                                Step 02
                                            </div>
                                            <div class="tab-content">
                                                <div style="padding: 10px; text-align: left;">

                                                    <h5 class="input-label">Title</h5>
                                                    <input type="text" class="simple-input-field" name="title"/>
                                                    <h5 class="input-label">Description</h5>
                                                    <input type="text" class="simple-input-field" name="desc"/>
                                                    <h5 class="input-label">Waveform Static</h5>
                                                    <div class="dzs-upload-con">
                                                        <input type="text" class="simple-input-field upload-prev" name="waveform_bg"/> <span class="aux-wave-generator"> <button class="btn-autogenerate-waveform-bg button-secondary">Auto Generate</button></span><span class="dzs-single-upload">
                                                            <input class="" name="file_field" type="file">
                                                        </span>
                                                    </div>                
                                                    <h5 class="input-label">Waveform Progress</h5>
                                                    <div class="dzs-upload-con">
                                                        <input type="text" class="simple-input-field upload-prev" name="waveform_prog"/> <span class="aux-wave-generator"> <button class="btn-autogenerate-waveform-prog button-secondary">Auto Generate</button></span><span class="dzs-single-upload">
                                                            <input class="" name="file_field" type="file">
                                                        </span>
                                                    </div>
                                                    <h5 class="input-label">Thumbnail</h5>
                                                    <div class="dzs-upload-con">
                                                        <input type="text" class="simple-input-field" name="thumb"/> <span class="dzs-single-upload">
                                                            <input class="" name="file_field" type="file">
                                                        </span>
                                                    </div>
                                                    <h5 class="input-label">Backup OGG</h5>
                                                    <div class="dzs-upload-con">
                                                        <input type="text" class="simple-input-field" name="source_ogg"/> <span class="dzs-single-upload">
                                                            <input class="" name="file_field" type="file">
                                                        </span>
                                                    </div>
                                                    <br><br>
                                                    <button class="btn-primary upload-btn">Upload</button>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </form>
                            <?php } ?>
                        </div>
                    </div>
                </div>
                <div class="dzs-upload--progress__full">
                    <div class="dzs-upload--progress--bar">
                        <div class="dzs-upload--progress--barbg"></div>
                        <div class="dzs-upload--progress--barprog"></div>
                    </div>

                </div>

                <script>
                    jQuery(document).ready(function($) {
                        window.dzs_phpfile_path = "upload.php";
                        window.dzs_upload_path = "<?php echo $dzsap_portal->url_base; ?>upload/";
                        //        window.dzs_phpfile_path = "http://192.168.0.107/html5uploader/source/upload.php";
                    })
                </script>
            <?php } ?>

            <?php if ($page == 'usersettings') { ?>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>User Settings</h2>
                            <?php
                            if ($dzsap_portal->currUserId === '0') {
                                ?>
                                <div class="error">You are not logged in therefore no access to this page.</div>
                            <?php } else { ?>

                                <form class="form-usersettings" method="POST">
                                    <h5 class="input-label">Avatar</h5>
                                    <div class="dzs-upload-con">
                                        <input type="text" class="simple-input-field" name="thumb"/> <span class="dzs-single-upload">
                                            <input class="" name="file_field" type="file">
                                        </span>
                                        <div class="feedback"></div>
                                    </div>
                                    <br>
                                    <button class="button-primary upload-btn">Save Changes</button>
                                </form>
                            <?php } ?>
                        </div>
                    </div>
                </div>
                <script>
                    jQuery(document).ready(function($) {
                        window.dzs_phpfile_path = "upload.php";
                        window.dzs_upload_path = "<?php echo $dzsap_portal->url_base; ?>upload/";
                        //        window.dzs_phpfile_path = "http://192.168.0.107/html5uploader/source/upload.php";
                    })
                </script>
            <?php } ?>


            <?php
            if ($page == 'uservideos') {
                $videos_user_id = 0;

                if ($dzsap_portal->currUserId !== '0') {
                    $videos_user_id = $dzsap_portal->currUserId;
                }
                if (isset($_GET['id_user'])) {
                    $videos_user_id = $_GET['id_user'];
                }
                ?>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>User Videos</h2>
                            <?php
                            if ($videos_user_id === 0) {
                                ?>
                                <div class="error">You are not logged in therefore no access to this page.</div>
                            <?php } else { ?>
                                <?php echo $dzsap_portal->get_user_videos($videos_user_id); ?>
    <?php } ?>
                        </div>
                    </div>
                </div>
            <?php } ?>

            <?php
            if ($page == 'userplaylists') {
                $videos_user_id = 0;

                if ($dzsap_portal->currUserId !== '0') {
                    $videos_user_id = $dzsap_portal->currUserId;
                }
                if (isset($_GET['id_playlist'])) {
                    $videos_user_id = $_GET['id_playlist'];
                }
                ?>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <?php
                            if ($videos_user_id === 0) {
                                ?>
                                <div class="error">You are not logged in therefore no access to this page.</div>
                            <?php } else { ?>
                            <h2>Playlist by <?php echo $dzsap_portal->get_user_field($videos_user_id, 'email'); ?></h2>
                                <?php
                                foreach ($dzsap_portal->get_playlists_array($videos_user_id) as $playlistid) {
                                    $str_videos = '';
                                    
                                    
                                    echo '<a href="'.$dzsap_portal->url_portalphp.'?playlist='.$playlistid.'">';
                                    
                                    $playlistvideos = $dzsap_portal->get_playlist_videos_array($playlistid);
                                    
                                    for($i=0;$i<count($playlistvideos);++$i){

                                        $videoid = $playlistvideos[$i];
                                        
                                        if($i>0){
                                            $str_videos.=', ';
                                        }
                                        $str_videos.=$dzsap_portal->get_track_field($videoid, 'title');
                                        
                                        
                                    }
                                    
                                    
                                    echo '<h3>'.$dzsap_portal->get_playlist_field($playlistid, 'title').'</h3>';
                                    
                                    echo $str_videos;

                                    

                                    echo '</a>';
                                }
                                ?>
    <?php } ?>
                            <form class="form-addplaylist" method="POST">

                                <input type="hidden" name="action" value="addplaylist"/>
                                <hr><br>
                                <h5 class="input-label">Add Playlist</h5>
                                <input type="text" class="simple-input-field" name="title"/>
                                <br><br> <button class="button-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
<?php } ?>
                        <?php if ($page == 'normal') { ?>

                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
    <?php if (isset($_GET['media'])) { ?>
                                <h2><?php echo $dzsap_portal->get_track_field($_GET['media'],'title') ?></h2>
        <?php echo $dzsap_portal->get_player($_GET['media']); ?>
                                <div class="dzs-tabs auto-init" data-options="{ 'design_tabsposition' : 'top'
                                     ,design_transition: 'slide'
                                     ,design_tabswidth: 'default'
                                     ,toggle_breakpoint : '400'
                                     ,toggle_type: 'accordion'}">

                                    <div class="dzs-tab-tobe">
                                        <div class="tab-menu with-tooltip">
                                            About
                                        </div>
                                        <div class="tab-content">
        <?php echo $dzsap_portal->get_track_field($_GET['media'],'desc') ?>
                                        </div>
                                    </div>

                                    <div class="dzs-tab-tobe">
                                        <div class="tab-menu with-tooltip">
                                            Share
                                        </div>
                                        <div class="tab-content">
                                            <?php
                                            $aux_cont = $dzsap_config['dzsap_tab_share_content'];
                                            $aux_cont = str_replace('{{currurl}}',urlencode(dzs_curr_url()),$aux_cont);


                                            $auxembed = '<iframe src="'.$dzsap_portal->url_base.'bridge.php?action=view&media='.$_GET['media'].'" style="width:100%; height:300px; overflow:hidden;" scrolling="no" frameborder="0"></iframe>';

                                            $aux_cont = str_replace('{{embedcode}}',htmlentities($auxembed),$aux_cont);



                                            echo $aux_cont;
                                            ?>
                                        </div>
                                    </div>

                                    <div class="dzs-tab-tobe">
                                        <div class="tab-menu with-tooltip">
                                            Add To
                                        </div>
                                        <div class="tab-content">
                                            <ul class="playlists-con playlists-add-list">
        <?php
        $playlistsa = $dzsap_portal->get_playlists_array($dzsap_portal->currUserId);
        foreach($playlistsa as $playlistid){
            echo '<li data-id="'.$playlistid.'" class="playlist-btn';
            
            
            if($dzsap_portal->mysql_check_if_playlist_has_track($playlistid, $_GET['media'])===true){
                echo ' active';
            }
            echo '">';
            echo '<fig class="the-status-con"><fig class="the-status"></fig></fig>';
            echo '<span>'.$dzsap_portal->get_playlist_field($playlistid, 'title').'</span>';
            echo '</li>';
        }
        //$fout.='<fig class="the-status-con"><fig class="the-status"></fig></fig>';
        ?>
                                                </ul>
                                        </div>
                                    </div>

                                </div>

    <?php } ?>
    <?php if (isset($_GET['playlist'])) { ?>
                                <h2><?php echo $dzsap_portal->get_playlist_field($_GET['playlist'],'title') ?></h2>
                               <?php
//                               print_r($dzsap_portal->get_playlist_videos_array($_GET['playlist']));
                               $playlistvideos = $dzsap_portal->get_playlist_videos_array($_GET['playlist']);
                               
                               foreach($playlistvideos as $videoid){
                                   
                                    echo $dzsap_portal->get_player($videoid);
                               }
                               
                               ?>
    <?php } ?> 
                        </div>
                    </div>
                </div>

<?php } ?>


        </div>
        <link rel="stylesheet" href="../fontawesome/font-awesome.min.css">
        <script src="../js/main.js"></script>
    </body>
</html>
