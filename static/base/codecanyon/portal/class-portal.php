<?php

require_once(dirname(dirname(__FILE__)).'/dzs_functions.php');
require_once(dirname(dirname(__FILE__)).'/dzsap-config.php');

class DZSAP_Portal {

    public $url_portalphp = '';
    public $currPage = 'normal';
    public $currUserId = '0';
    private $dblink = null;
    private $userAvatar = '';
    public $notices_html = '';
    private $path_base = '';
    public $url_base = '';
    
    private $mainoptions;

    function __construct() {
        global $dzsap_config;


        $this->mainoptions = $dzsap_config;

        $this->path_base = dirname(__FILE__).'/';

        $this->url_portalphp = $this->mainoptions['url_portalphp'];


        $loca = explode("?",dzs_curr_url());
        $loc = $loca[0];

//        echo $loc;

        $loc = substr(dzs_curr_url(),0,strlen($loc) - 10);
        $basepath_location = $this->path_base."db/location.txt";
        $aux = '';

        $this->url_base = $loc;

//        echo $this->url_base;



        if (isset($_GET['page'])) {
            $this->currPage = $_GET['page'];
        }

//        print_r($_COOKIE);
        if (isset($_COOKIE['username'])) {
            $this->currUserId = $_COOKIE['username'];
            setcookie("username",$this->currUserId,time() + 3600);
        }

//        echo $this->currUserId;

        $this->connect_database();



        $this->check_post();
    }

    function check_post() {
        if (isset($_POST['action'])) {
            if ($_POST['action'] == 'register') {

                $aux = $this->mysql_create_user($_POST['email'],$_POST['pass']);
                if ($aux === true) {

                    setcookie("username",$this->currUserId,time() + 3600);
                    header('Location: portal.php');
                    ;
                } else {
                    $this->notices_html.='<li class="notice notice-user-error">'.$aux.'</li>';
                }
            }
            if ($_POST['action'] == 'login') {

                $aux = $this->mysql_login_user($_POST['email'],$_POST['pass']);

//                echo $aux;
                if ($aux === true) {

                    setcookie("username",$this->currUserId,time() + 3600);
                    header('Location: portal.php');
                    ;
                } else {
                    $this->notices_html.='<li class="notice notice-user-error">'.$aux.'</li>';
                }
            }
            if ($_POST['action'] == 'logout') {

                setcookie("username",$this->currUserId,time() - 3600);
                header('Location: portal.php');
            }
            if ($_POST['action'] == 'addtrack') {
//                print_r($_POST);
                $this->mysql_add_track($_POST['source'],$_POST['source_ogg'],$_POST['title'],$_POST['desc'],$_POST['thumb'],$_POST['waveform_bg'],$_POST['waveform_prog']);

                //$source, $source_ogg, $title, $desc, $thumbnail, $waveform_bg, $waveform_prog
            }
            if ($_POST['action'] == 'addplaylist') {
//                print_r($_POST);
                $this->mysql_add_playlist($this->currUserId, $_POST['title']);

                //$source, $source_ogg, $title, $desc, $thumbnail, $waveform_bg, $waveform_prog
            }
        }
    }
    function mysql_get_track_plays($track_id){
        
        $query = "SELECT COUNT(*) FROM `views` WHERE `track_id` = '$track_id'";
        
        
        $aux = $this->dblink->query($query);
        
        
        if($aux){
                while($aux2 = mysqli_fetch_row($aux)) {
                    
                    return $aux2[0];
                }
        }
        return 0;
    }
    function mysql_get_track_likes($track_id){
        
        $query = "SELECT COUNT(*) FROM `likes` WHERE `track_id` = '$track_id'";
        
        
        $aux = $this->dblink->query($query);
        
        
        if($aux){
                while($aux2 = mysqli_fetch_row($aux)) {
                    
                    return $aux2[0];
                }
        }
        return 0;
    }
    function mysql_get_track_ratings_count($track_id){
        
        $query = "SELECT COUNT(*) FROM `ratings` WHERE `track_id` = '$track_id'";
        
        
        $aux = $this->dblink->query($query);
        
        
        if($aux){
                while($aux2 = mysqli_fetch_row($aux)) {
                    
                    return $aux2[0];
                }
        }
        return 0;
    }
    function check_if_user_played_track($track_id){
        
        if($this->currUserId!=='0'){
            //--- if user logged in
            return $this->mysql_check_if_user_played_track($this->currUserId, $track_id);
        }else{
            if (isset($_COOKIE['viewsubmitted-' . $track_id])) {
                return true;
            }
            return false;
        }
    }
    function check_if_user_rated_track($track_id){
        
        if($this->currUserId!=='0'){
            //--- if user logged in
            return $this->mysql_check_if_user_rated_track($this->currUserId, $track_id);
        }else{
            if (isset($_COOKIE['ratesubmitted-' . $track_id])) {
                return $_COOKIE['ratesubmitted-' . $track_id];
            }
            return false;
        }
    }
    function check_if_user_liked_track($track_id){
        
        if($this->currUserId!=='0'){
            //--- if user logged in
            return $this->mysql_check_if_user_liked_track($this->currUserId, $track_id);
        }else{
            if (isset($_COOKIE['likesubmitted-' . $track_id])) {
                return true;
            }
            return false;
        }
    }
    
    public function mysql_check_if_playlist_has_track($id_playlist, $track_id){
        
        
        $query = "SELECT `id` FROM `playlist_entries` WHERE `id_playlist` = '$id_playlist' AND `track_id`='$track_id'";
        
        
        $aux = $this->dblink->query($query);
        
        if($aux){
            
            if($aux->num_rows==0){
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
        
    }
    
    function mysql_check_if_user_played_track($id_user, $track_id){
        
        
        $query = "SELECT `id` FROM `views` WHERE `id_user` = '$id_user' AND `track_id`='$track_id'";
        
        
        $aux = $this->dblink->query($query);
        
        if($aux){
            
            if($aux->num_rows==0){
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
        
    }
    function mysql_check_if_user_liked_track($id_user, $track_id){
        
        
        $query = "SELECT `id` FROM `likes` WHERE `id_user` = '$id_user' AND `track_id`='$track_id'";
        
        
//        echo $query;
        $aux = $this->dblink->query($query);
//        print_r($aux);
        
        if($aux){
            
            if($aux->num_rows==0){
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
        
    }
    
    function mysql_get_rates_average($track_id){
        
        
        $query = "SELECT `rating` FROM `ratings` WHERE `track_id`='$track_id'";
        
        
//        echo $query;
        $aux = $this->dblink->query($query);
//        print_r($aux);
        
        $sum = 0;
        $nri = 0;
        if($aux){
            
            while ($aux2 = mysqli_fetch_row($aux)) {
//                    print_r($aux2);
                $sum+=(double)$aux2[0];
                $nri++;
            }
        }
        $aux->close();
        
        if($sum==0 || $nri==0){
            return '';
        }else{
            return $sum/$nri;
        }
        
        
        
        
        
        
    }
    
    function mysql_check_if_user_rated_track($id_user, $track_id){
        
        
        $query = "SELECT `rating` FROM `ratings` WHERE `id_user` = '$id_user' AND `track_id`='$track_id'";
        
        
//        echo $query;
        $aux = $this->dblink->query($query);
//        print_r($aux);
        
        if($aux){
            
            if($aux->num_rows==0){
                return false;
            }else{
                
                while ($aux2 = mysqli_fetch_row($aux)) {
//                    print_r($aux2);
                    return $aux2[0];
                }
            }
        }else{
            return false;
        }
        
    }
    
    function submit_view(){
        
        $fout = '';
        $track_id = $_POST['playerid'];
        $currip = $_POST['currip'];


        if($this->check_if_user_played_track($track_id)===false){

            $query3 = "INSERT INTO `views` (`id_user`, `ip`, `track_id`) VALUES ('$this->currUserId', '$currip','$track_id')";


            $aux3 = $this->dblink->query($query3);
            
            setcookie("viewsubmitted-" . $track_id, '1', time() + 36000);

//            print_r($aux3);
        }
        
        
        
        
        
        
        return '';
    }
    
    function submit_like(){
        
        $fout = '';
        $track_id = $_POST['playerid'];

        $date = date("Y-m-d H:i:s");

        if($this->check_if_user_liked_track($track_id)===false){
//            echo 'hmm';

            $query3 = "INSERT INTO `likes` (`id_user`, `track_id`, `date`) VALUES ('$this->currUserId', '$track_id','$date')";


//            echo $query3;
            $aux3 = $this->dblink->query($query3);
            
            setcookie("likesubmitted-" . $track_id, '1', time() + 36000);

//            print_r($aux3);
        }
        
        
        
        
        
        
        return '';
    }
    function retract_playlist_entry($id_playlist, $track_id){
        
        $query = "DELETE FROM `playlist_entries` WHERE `id_playlist`='$id_playlist' AND `track_id`='$track_id'";
        $aux = $this->dblink->query($query);
        
        
    }
    
    function submit_playlist_entry($id_playlist, $track_id){
        
        $query = "INSERT INTO `playlist_entries` (`id_playlist`, `track_id`) VALUES ('$id_playlist','$track_id')";
        $aux = $this->dblink->query($query);
        
        
    }
    
    function submit_rating(){
        
        $fout = '';
        $track_id = $_POST['playerid'];

        $rating = $_POST['postdata'];

        if($this->check_if_user_rated_track($track_id)===false){
//            echo 'hmm';

            $query3 = "INSERT INTO `ratings` (`id_user`, `track_id`, `rating`) VALUES ('$this->currUserId', '$track_id','$rating')";


            $aux3 = $this->dblink->query($query3);
            
            setcookie("ratesubmitted-" . $track_id, $rating, time() + 36000);
            
            $aux3->close();

//            print_r($aux3);
        }
    }
        
        
        
    function submit_comment(){
        
        $fout = '';
        $track_id = $_POST['playerid'];

        $comment = $_POST['postdata'];

            $query3 = "INSERT INTO `comments` (`id_user`, `track_id`, `comment`) VALUES ('$this->currUserId', '$track_id','$comment')";


            $aux3 = $this->dblink->query($query3);
            
        
        
        
        return '';
    }
    
    function retract_like(){
        
        $fout = '';
        $track_id = $_POST['playerid'];

        $query3 = "DELETE FROM `likes` WHERE `id_user`='$this->currUserId' AND `track_id`='$track_id' LIMIT 1";


//            echo $query3;
        $aux3 = $this->dblink->query($query3);

        setcookie("likesubmitted-" . $track_id, '1', time() - 36000);

        
        
        
        
        
        
        return '';
    }

    function connect_database() {


        $this->dblink = mysqli_connect($this->mainoptions['mysql_server'],$this->mainoptions['mysql_user'],$this->mainoptions['mysql_password']);
        if (!$this->dblink) {
            die('Could not connect: '.mysql_error());
        }
        $this->dblink->select_db($this->mainoptions['mysql_table']);
    }

    public function get_avatar($id) {


        if ($this->mysql_get_avatar($id) == '') {
            return 'http://www.gravatar.com/avatar/'.($this->mysql_get_email($id)).'.png';
//            return 
//            http://www.gravatar.com/avatar/6ea2ca38539018f3ad1557aaf4e1eb0e.png
        }else{
            return $this->mysql_get_avatar($id);
        }
    }
    
    function get_user_field($id_user, $field){
        
        $query = "SELECT `$field` FROM `users` WHERE `id` = '$id_user'";
        
        
//        echo $query;
        $aux = $this->dblink->query($query);
        if ($aux && $aux->num_rows > 0) {
            $aux2 = mysqli_fetch_row($aux);
            return $aux2[0];
        }
    }
    function get_track_field($track_id, $field){
        
        $query = "SELECT `$field` FROM `tracks` WHERE `id` = '$track_id'";
        
        
//        echo $query;
        $aux = $this->dblink->query($query);
        if ($aux && $aux->num_rows > 0) {
            $aux2 = mysqli_fetch_row($aux);
            return $aux2[0];
        }
    }

    public function get_playlists_array($id_user) {

        $fout = '';
        $query = "SELECT `id` FROM `playlists` WHERE `id_user` = '$id_user'";


        $aux = $this->dblink->query($query);
        
        $aout = array();

        while ($aux2 = mysqli_fetch_row($aux)) {
            array_push($aout, $aux2[0]);
        }

        return $aout;
        
    }

    public function get_comments_array($track_id) {

        $fout = '';
        $query = "SELECT `comment` FROM `comments` WHERE `track_id` = '$track_id'";

//        echo $query;

        $aux = $this->dblink->query($query);
        
        $aout = array();
//        print_r($aux);

        while ($aux2 = mysqli_fetch_array($aux)) {
//            print_r($aux2);
            array_push($aout, $aux2[0]);
            
            
        }
        
        $aux->close();
        
//        print_r($aout);

        return $aout;
        
    }

    public function get_playlist_videos_array($id_playlist) {

        $fout = '';
        $query = "SELECT `track_id` FROM `playlist_entries` WHERE `id_playlist` = '$id_playlist'";


        $aux = $this->dblink->query($query);
        
        $aout = array();

        while ($aux2 = mysqli_fetch_row($aux)) {
            array_push($aout, $aux2[0]);
        }

        $aux->close();
        
        return $aout;
        
    }
    public function get_playlist_field($id, $field) {
        
        $fout = '';
        $query = "SELECT `$field` FROM `playlists` WHERE `id` = '$id'";

        $aux = $this->dblink->query($query);
        
        while ($aux2 = mysqli_fetch_row($aux)) {
            $fout = $aux2[0];
        }
        
        return $fout;
        
        
    }

    public function get_user_videos($id) {

        $fout = '';
        $query = "SELECT `id` FROM `tracks` WHERE `id_user` = '$id'";


        $aux = $this->dblink->query($query);

//        print_r($aux);


        if ($aux) {
            if ($aux->num_rows > 0) {
                while ($aux2 = mysqli_fetch_row($aux)) {
//                    print_r($aux2);
                    $fout.=$this->get_player($aux2[0]);
                }
            } else {
                $fout.= 'user has no videos';
            }
        }

        return $fout;
    }
    
    
    function parse_items($its, $margs) {
        
        //====returns only the html5 gallery items
        $fout = '';
        $start_nr = 0; // === the i start nr 
        $end_nr = count($its); // === the i start nr 
        $nr_per_page = 5;
        $nr_items = count($its);
        

        if (isset($its['settings'])) {
            $nr_items--;
            $end_nr--;
            
            if(isset($its['settings']['enable_views'])==false){
                $its['settings']['enable_views'] = 'off';
            }
            if(isset($its['settings']['enable_likes'])==false){
                $its['settings']['enable_likes'] = 'off';
            }
            if(isset($its['settings']['enable_rates'])==false){
                $its['settings']['enable_rates'] = 'off';
            }
        }


//        print_r($its); print_r($margs);

        for ($i = $start_nr; $i < $end_nr; $i++) {

            $che = array(
                'menu_artistname' => '',
                'menu_songname' => '',
                'menu_extrahtml' => '',
            );
            

            if (is_array($its[$i]) == false) {
                $its[$i] = array();
            }

            $che = array_merge($che, $its[$i]);
            //print_r($che);
            
            
            if(isset($che['artistname'])){
                $che['menu_artistname'] = $che['artistname'];
            }
            if(isset($che['songname'])){
                $che['menu_songname'] = $che['songname'];
            }

            $playerid = '';
            if (isset($che['playerid']) && $che['playerid'] != '') {
                $playerid = $che['playerid'];
            }
            
            

            $type = 'audio';

            if (isset($che['type']) && $che['type'] != '') {
                $type = $che['type'];
            }

            if ($type == 'inline') {
                $fout.=$che['source'];
                continue;
            }


            if ($che['source'] == '' || $che['source'] == ' ') {
                continue;
            }
            //print_r($che); echo $playerid;

            $fout.='<div class="audioplayer-tobe" style=""';



            if (isset($che['thumb']) && $che['thumb'] != '') {
                $fout.=' data-thumb="' . $che['thumb'] . '"';
            };


            if ($playerid != '') {
                $fout.=' id="ap' . $playerid . '"';
            };

            if (isset($che['waveformbg']) && $che['waveformbg'] != '') {
                $fout.=' data-scrubbg="' . $che['waveformbg'] . '"';
            };
            if (isset($che['waveformprog']) && $che['waveformprog'] != '') {
                $fout.=' data-scrubprog="' . $che['waveformprog'] . '"';
            };
            if ($type != '') {
                $fout.=' data-type="' . $type . '"';
            };
            if (isset($che['source']) && $che['source'] != '') {
                $fout.=' data-source="' . $che['source'] . '"';
            };
            if (isset($che['sourceogg']) && $che['sourceogg'] != '') {
                $fout.=' data-sourceogg="' . $che['sourceogg'] . '"';
            };
            
            if (isset($che['bgimage']) && $che['bgimage'] != '') {
                $fout.=' data-bgimage="' . $che['bgimage'] . '"';
            };
            
            if($this->check_if_user_played_track($playerid)===true){
                $fout.=' data-viewsubmitted="on"';
            }
            if($this->check_if_user_rated_track($playerid)!==false){
                $fout.=' data-userstarrating="'.$this->check_if_user_rated_track($playerid).'"';
            }


            if ($che['playfrom']) {
                $fout.=' data-playfrom="' . $che['playfrom'] . '"';
            };
            
//                    print_r($margs);;
            if(isset($margs['single']) && $margs['single']=='on'){
                if(isset($margs['width']) && isset($margs['height'])){
                    
                    // ===== some sanitizing
                    $tw = $margs['width'];
                    $th = $margs['height'];
                    $str_tw = '';
                    $str_th = '';
                    



                    if($tw!=''){
                        if (strpos($tw, "%") === false && $tw!='auto') {
                            $str_tw = ' width: '.$tw.'px;';
                        }else{
                            $str_tw = ' width: '.$tw.';';
                        }
                    }


                    if($th!=''){
                        if (strpos($th, "%") === false && $th!='auto') {
                            $str_th = ' height: '.$th.'px;';
                        }else{
                            $str_th = ' height: '.$th.';';
                        }
                    }
                    
//                    print_r($margs); echo $str_tw; echo $str_th;


                    $fout.=' style="'.$str_tw.$str_th.'"';

                }
            }


            $fout.='>';
            //print_r($che);
            $che['menu_artistname'] = stripslashes($che['menu_artistname']);
            $che['menu_songname'] = stripslashes($che['menu_songname']);
            
//            print_r($che);
            
            
            if (isset($its['settings']['skinwave_comments_enable']) && $its['settings']['skinwave_comments_enable'] == 'on') {

                if ($playerid != '') {
                    
                    $fout.='<div class="the-comments">';
                    $comms = $this->get_comments_array($playerid);
//                    echo 'ceva'; print_r($comms);
                    foreach ($comms as $comm) {
                        $fout.= $comm;
                    }
                    $fout.='</div>';
                }
            }

            if ($che['menu_artistname'] != '' || $che['menu_songname'] != '') {
                $fout.='<div class="meta-artist">';
                $fout.='<span class="the-artist">' . $che['menu_artistname'] . '</span>';
                if ($che['menu_songname'] != '') {
                    $fout.='&nbsp;<span class="the-name">' . $che['menu_songname'] . '</span>';
                }

                $fout.='</div>';
            }
            if ($che['menu_artistname'] != '' || $che['menu_songname'] != '' || $che['thumb'] != '') {
                $fout.='<div class="menu-description">';
                if (isset($che['thumb']) && $che['thumb'] != '') {
                    $fout.='<div class="menu-item-thumb-con"><div class="menu-item-thumb" style="background-image: url(' . $che['thumb'] . ')"></div></div>';
                }

                $fout.='<span class="the-artist">' . $che['menu_artistname'] . '</span>';
                $fout.='<span class="the-name">' . $che['menu_songname'] . '</span>';

                if (isset($_COOKIE['dzsap_ratesubmitted-' . $playerid])) {
                    $che['menu_extrahtml'] = str_replace('download-after-rate', 'download-after-rate active', $che['menu_extrahtml']);
                } else {
                    if (isset($_COOKIE['commentsubmitted-' . $playerid])) {
                        $che['menu_extrahtml'] = str_replace('download-after-rate', 'download-after-rate active', $che['menu_extrahtml']);
                    };
                }


                $fout.=$che['menu_extrahtml'];
                $fout.='</div>';
            }

            
            
            
            // --- extra html meta
            if (isset($its['settings']) && ($its['settings']['enable_views'] == 'on' || $its['settings']['enable_likes'] == 'on' || $its['settings']['enable_rates'] == 'on')) {
                $aux_extra_html = '';

                if ($its['settings']['enable_likes'] == 'on') {
                    $aux_extra_html.=$this->mainoptions['str_likes_part1'];

                    if ($this->check_if_user_liked_track($playerid) ) {
                        $aux_extra_html = str_replace('<div class="btn-like">', '<div class="btn-like active">', $aux_extra_html);
                    }
                }


                if ($its['settings']['enable_rates'] == 'on') {
                    $aux_extra_html.='<div class="star-rating-con"><div class="star-rating-bg"></div><div class="star-rating-set-clip" style="width: ';

//                    $aux = get_post_meta($playerid, '_dzsap_rate_index', true);
                    $aux = $this->mysql_get_rates_average($playerid);
                    
                    
                    if ($aux == '') {
                        $aux_extra_html.='0px';
                    } else {
                        $aux_extra_html.=(122 / 5 * $aux) . 'px';
                    }


                    $aux_extra_html.=';"><div class="star-rating-prog"></div></div><div class="star-rating-prog-clip"><div class="star-rating-prog"></div></div></div>';
                }



                if ($its['settings']['enable_views'] == 'on') {
                    $aux_extra_html.=$this->mainoptions['str_views'];
//                    $aux = get_post_meta($playerid, '_dzsap_views', true);
                    
                    $aux = '';
                    
                    $aux = $this->mysql_get_track_plays($playerid);;
                    
                    if ($aux == '') {
                        $aux = 0;
                    }
                    $aux_extra_html = str_replace('{{get_plays}}', $aux, $aux_extra_html);
                }
                if ($its['settings']['enable_likes'] == 'on') {
                    $aux_extra_html.=$this->mainoptions['str_likes_part2'];
                    $aux = $this->mysql_get_track_likes($playerid);
                    if ($aux == '') {
                        $aux = 0;
                    }
                    $aux_extra_html = str_replace('{{get_likes}}', $aux, $aux_extra_html);
                }



                if ($its['settings']['enable_rates'] == 'on') {
                    $aux_extra_html.=$this->mainoptions['str_rates'];
//                    $aux = get_post_meta($playerid, '_dzsap_rate_nr', true);
                    $aux = $this->mysql_get_track_ratings_count($playerid);
                    if ($aux == '') {
                        $aux = 0;
                    }
                    $aux_extra_html = str_replace('{{get_rates}}', $aux, $aux_extra_html);

                    if (isset($_COOKIE['dzsap_ratesubmitted-' . $playerid])) {
                        $aux_extra_html.='{{ratesubmitted=' . $_COOKIE['dzsap_ratesubmitted-' . $playerid] . '}}';
                    };
                }





                $fout.='<div class="extra-html">' . $aux_extra_html . '</div>';
            }



            $fout.='</div>';

            if (isset($che['apply_script'])) {
                
            }
        }
        return $fout;
    }


    public function get_player($id, $pargs = array()) {

        
        
        $fout = '';
        $theid = 1;

        $margs = array(
            'width' => '100%',
            'config' => 'default',
            'height' => '300',
            'source' => '',
            'sourceogg' => '',
            'coverimage' => '',
            'waveformbg' => '',
            'waveformprog' => '',
            'cue' => 'on',
            'config' => 'default',
            'autoplay' => 'off',
            'type' => 'audio',
            'mediaid' => '',
            'player' => '',
            'playerid' => '',
            'mp4' => '',
            'openinzoombox' => 'off',
            'enable_likes' => $this->mainoptions['enable_likes'],
            'enable_views' => $this->mainoptions['enable_views'],
            'enable_rates' => $this->mainoptions['enable_rates'],
            'playfrom' => 'off',
            'artistname' => '',
            'songname' => '',
            'single' => 'on',
            'embedded' => 'off',
            'divinsteadofscript' => 'off',
        );
        
        $margs = array_merge($margs, $pargs);
        


        $query = "SELECT * FROM `tracks` WHERE `id` = '$id'";
        $aux = $this->dblink->query($query);
        
        if ($aux && $aux->num_rows > 0) {
            $aux2 = mysqli_fetch_array($aux);


//            print_r($aux2);
            $theid = $aux2['id'];
            $margs['playerid'] = $theid;
            $margs['source'] = $aux2['source'];
            $margs['sourceogg'] = $aux2['source_ogg'];
            $margs['artistname'] = $aux2['title'];
            if($this->currPage=='uservideos' || isset($_GET['playlist'])){
                $margs['artistname'] = '<a href="'.$this->url_portalphp.'?media='.$theid.'">'.$margs['artistname'].'</a>';
            }
            
//            $margs['songname'] = $aux2[5];
            $margs['coverimage'] = $aux2['thumbnail'];
            $margs['waveformbg'] = $aux2['waveform_bg'];
            $margs['waveformprog'] = $aux2['waveform_prog'];
        }

        $aux->close();




        $vpsettingsdefault = array(
            'id' => 'default',
            'skin_ap' => 'skin-wave',
            'settings_backup_type' => 'full',
            'skinwave_dynamicwaves' => 'off',
            'skinwave_enablespectrum' => 'off',
            'skinwave_enablereflect' => 'on',
            'skinwave_comments_enable' => $this->mainoptions['skinwave_comments_enable'],
            'disable_volume' => 'default',
            'playfrom' => 'default',
        );

        $vpsettings = array();
        $vpsettings['settings'] = $vpsettingsdefault;


        if($vpsettings['settings']['skin_ap']=='skin-wave'){
            if($margs['waveformbg']==''){
                $margs['waveformbg']=$this->url_base.'waves/scrubbg_default.png';
            }
            if($margs['waveformprog']==''){
                $margs['waveformprog']=$this->url_base.'waves/scrubprog_default.png';
            }
//            print_r($margs);
        }





        $its = array(0 => $margs,'settings' => array());

        $vpsettings['settings']['enable_likes']=$margs['enable_likes'];
        $vpsettings['settings']['enable_views']=$margs['enable_views'];
        $vpsettings['settings']['enable_rates']=$margs['enable_rates'];

        $its['settings'] = array_merge($its['settings'],$vpsettings['settings']);



//        print_r($margs);
        //===normal mode
        if ($margs['openinzoombox'] != 'on') {

            $fout.=$this->parse_items($its,$margs);

            if ($margs['divinsteadofscript'] != 'on') {
                $fout.='<script>';
            } else {
                $fout.='<div class="toexecute">';
            }


            $fout.='(function(){
var auxap = jQuery(".audioplayer-tobe").last();
jQuery(document).ready(function ($){
var settings_ap = {
    design_skin: "'.$vpsettings['settings']['skin_ap'].'"
    ,autoplay: "'.$margs['autoplay'].'"
    ,disable_volume:"'.$vpsettings['settings']['disable_volume'].'"
    ,cue: "'.$margs['cue'].'"
    ,embedded: "'.$margs['embedded'].'"
    ,skinwave_dynamicwaves:"'.$vpsettings['settings']['skinwave_dynamicwaves'].'"
    ,skinwave_enableSpectrum:"'.$vpsettings['settings']['skinwave_enablespectrum'].'"
    ,settings_backup_type:"'.$vpsettings['settings']['settings_backup_type'].'"
    ,skinwave_enableReflect:"'.$vpsettings['settings']['skinwave_enablereflect'].'"';
            if (isset($vpsettings['settings']['playfrom'])) {
                $fout.=',playfrom:"'.$vpsettings['settings']['playfrom'].'"';
            }



            $fout.=',soundcloud_apikey:"'.$this->mainoptions['soundcloud_api_key'].'"
    ,skinwave_comments_enable:"'.$vpsettings['settings']['skinwave_comments_enable'].'"';

            $fout.=',settings_php_handler:window.ajaxurl';
            if ($vpsettings['settings']['skinwave_comments_enable'] == 'on') {
                if ($this->currUserId!=='0') {
                    $fout.=',skinwave_comments_account:"'.$this->get_user_field($this->currUserId,'email').'"';
                    $fout.=',skinwave_comments_avatar:"'.$this->get_avatar($this->currUserId).'"';
                }
            }




            if (isset($its['settings']['skinwave_mode']) && $its['settings']['skinwave_mode'] == 'small') {
                $fout.=',skinwave_mode:"'.$its['settings']['skinwave_mode'].'"';
            }



            $fout.=',skinwave_comments_playerid:"'.$margs['playerid'].'"';


            if (isset($vpsettings['settings']['enable_embed_button']) && $vpsettings['settings']['enable_embed_button'] == 'on') {
                $str_db = '';
                $str = '<iframe src=\''.$this->url_base.'bridge.php?type=player&margs='.serialize($margs).'\' style="overflow:hidden; transition: height 0.5s ease-out;" width="100%" height="50" scrolling="no" frameborder="0"></iframe>';
//                echo 'ceva22'.$str;
                $str = str_replace('"',"'",$str);
                $fout.=',embed_code:"'.htmlentities($str,ENT_QUOTES).'"';
            }





            $fout.=',php_retriever:"'.$this->url_base.'soundcloudretriever.php" ,swf_location:"'.$this->url_base.'ap.swf"
,swffull_location:"'.$this->url_base.'apfull.swf"
};
dzsap_init(auxap,settings_ap);
});
})();';

            if ($margs['divinsteadofscript'] != 'on') {
                $fout.='</script>';
            } else {
                $fout.='</div>';
            }
        } else {

            $fout.='<a href="'.$margs['source'].'" data-sourceogg="'.$margs['sourceogg'].'" data-waveformbg="'.$margs['waveformbg'].'" data-waveformprog="'.$margs['waveformprog'].'" data-type="'.$margs['type'].'" data-coverimage="'.$margs['coverimage'].'" class="zoombox effect-justopacity">'.$content.'</a>';



            if ($margs['divinsteadofscript'] != 'on') {
                $fout.='<script>';
            } else {
                $fout.='<div class="toexecute">';
            }
            $fout.='(function(){
var auxap = jQuery(".audioplayer-tobe").last();
jQuery(document).ready(function ($){
var settings_ap = {
    design_skin: "'.$vpsettings['settings']['skin_ap'].'"
    ,skinwave_dynamicwaves:"'.$vpsettings['settings']['skinwave_dynamicwaves'].'"
    ,disable_volume:"'.$vpsettings['settings']['disable_volume'].'"
    ,skinwave_enableSpectrum:"'.$vpsettings['settings']['skinwave_enablespectrum'].'"
    ,settings_backup_type:"'.$vpsettings['settings']['settings_backup_type'].'"
    ,skinwave_enableReflect:"'.$vpsettings['settings']['skinwave_enablereflect'].'"
    ,skinwave_comments_enable:"'.$vpsettings['settings']['skinwave_comments_enable'].'"';

            if ($vpsettings['settings']['skinwave_comments_enable'] == 'on') {
                $fout.=',settings_php_handler:window.ajaxurl';
                if (isset($current_user->data->user_nicename)) {
                    $fout.=',skinwave_comments_account:"'.$current_user->data->user_nicename.'"';
                    $fout.=',skinwave_comments_avatar:"'.$this->get_avatar_url(get_avatar($current_user->data->ID,20)).'"';
                    $fout.=',skinwave_comments_playerid:"'.$margs['playerid'].'"';
                }
            }

            $fout.=',swf_location:"'.$this->url_base.'ap.swf"
    ,swffull_location:"'.$this->url_base.'apfull.swf"
};
$(".zoombox").zoomBox({audioplayer_settings: settings_ap});
});
})();';

            if ($margs['divinsteadofscript'] != 'on') {
                $fout.='</script>';
            } else {
                $fout.='</div>';
            }
        }



//echo $fout;


        return $fout;
    }

    function mysql_get_avatar($id) {
        return '';
    }

    function mysql_get_email($id) {


        $query = "SELECT `avatar` FROM `users` WHERE `id`='$id'";


        $aux = $this->dblink->query($query,MYSQLI_USE_RESULT);

//        print_r($aux);


        $aux->close();

        return '';
    }

    function mysql_login_user($email,$pass) {

        $pass = md5($pass);


        $query = "SELECT id,email FROM users WHERE email='$email' AND password='$pass'";

        $aux = $this->dblink->query($query);

        if ($aux) {
            if ($aux->num_rows == 1) {
                $row = mysqli_fetch_array($aux);

                $this->currUserId = $row['id'];

                return true;
            } else {
                return 'username and password do not match';
            }
        } else {
            return mysqli_error($this->dblink);
        }
    }

    function mysql_create_user($email,$pass) {

        $pass = md5($pass);
        $date = date("Y-m-d H:i:s");

        $query = "INSERT INTO users (email, password, date) VALUES ('$email', '$pass', '$date')";

//        echo $query;

        if ($this->dblink->query($query) === true) {
            $this->currUserId = mysqli_insert_id($this->dblink);
//            echo mysqli_insert_id($this->dblink);


            $deta = array('id_user' => $this->currUserId);
            $dets = serialize($deta);

            $querya = "INSERT INTO `activity` (`id_user`, `type`, `details`, `date`) VALUES ('$this->currUserId', 'add_user', '$dets', '$date')";

            $this->dblink->query($querya);
            return true;
        } else {
            return mysqli_error($this->dblink);
        }
    }

    function mysql_add_track($source,$source_ogg,$title,$desc,$thumbnail,$waveform_bg,$waveform_prog,$otherargs = array()) {

        $date = date("Y-m-d H:i:s");

        $query = "INSERT INTO `tracks` (`id_user`, `source`, `source_ogg`, `title`, `desc`, `thumbnail`, `waveform_bg`, `waveform_prog`, `date`) VALUES ('$this->currUserId', '$source', '$source_ogg', '$title', '$desc', '$thumbnail', '$waveform_bg', '$waveform_prog', '$date')";

//        echo $query;


        if ($this->dblink->query($query) === true) {

            $trackid = mysqli_insert_id($this->dblink);

            $deta = array('track_id' => $trackid);
            $dets = serialize($deta);

            $querya = "INSERT INTO `activity` (`id_user`, `type`, `details`, `date`) VALUES ('$this->currUserId', 'add_track', '$dets', '$date')";

            $this->dblink->query($querya);

            return true;
        } else {
            return mysqli_error($this->dblink);
        }
    }
    
    
    
    function mysql_add_playlist($id_user, $title){
        
        $date = date("Y-m-d H:i:s");

        $query = "INSERT INTO `playlists` (`id_user`, `title`) VALUES ('$id_user', '$title')";

//        echo $query;


        if ($this->dblink->query($query) === true) {

            return true;
        } else {
            return mysqli_error($this->dblink);
        }
    }

}

//print_r($_POST);
