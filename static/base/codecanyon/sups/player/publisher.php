<?php

require_once(dirname(__FILE__).'/config.php');

$dzsap_portal = null;
if($dzsap_config['type']=='portal'){
    require_once(dirname(__FILE__).'/portal/class-portal.php');
    $dzsap_portal = new DZSAP_Portal();
}


class DZSAP_Publisher {

    function __construct() {


        $this->check_post_input();
    }

    function check_post_input() {

        global $dzsap_portal,$dzsap_config;

        if (isset($_POST['action']) && $_POST['action'] == 'dzsap_get_views') {

            $aux = 'db-views';
            $playerid = '';

            if (isset($_POST['playerid'])) {
                $aux.=$_POST['playerid'];
                $playerid = $_POST['playerid'];
            }

            $file = dirname(__FILE__).'/db/'.$aux.'.html';


            $current = file_get_contents($file);
            echo $current;

            if (isset($_COOKIE['viewsubmitted-'.$playerid])) {
                echo 'viewsubmitted';
            }


            echo '{{theip-';
            echo $this->misc_get_ip();
            echo '}}';

            //print_r($_COOKIE);

            die();
        }



        if (isset($_POST['action']) && $_POST['action'] == 'dzsap_submit_views') {

            $aux = 'db-views';
            $playerid = '';

            if (isset($_POST['playerid'])) {
                $aux.=$_POST['playerid'];
                $playerid = $_POST['playerid'];
            }



            if ($dzsap_config['type'] == 'portal') {

                echo $dzsap_portal->submit_view();
            } else {
                $file = dirname(__FILE__).'/db/'.$aux.'.html';


                $current = file_get_contents($file);

                if ($current == '') {
                    $current = 0;
                }
                $current = intval($current);

                $confirmer = 'hascookie';

                if (isset($_COOKIE['viewsubmitted-'.$playerid])) {
                    //echo $current;
                } else {
                    $current = $current + 1;
                    $confirmer = file_put_contents($file,$current);
                    //echo $current;
                }
                setcookie('viewsubmitted-'.$playerid,'1',time() + 36000);


                echo $confirmer;
            }
            die();
        }
        if (isset($_POST['action']) && $_POST['action'] == 'dzsap_submit_download') {

            $aux = 'db-download';
            $playerid = '';

            if (isset($_POST['playerid'])) {
                $aux.=$_POST['playerid'];
                $playerid = $_POST['playerid'];
            }



            if ($dzsap_config['type'] == 'portal') {

                echo $dzsap_portal->submit_view();
            } else {
                $file = dirname(__FILE__).'/db/'.$aux.'.html';


                $current = file_get_contents($file);

                if ($current == '') {
                    $current = 0;
                }
                $current = intval($current);

                $confirmer = 'hascookie';

                if (isset($_COOKIE['downloadsubmitted-'.$playerid])) {
                    //echo $current;
                } else {
                    $current = $current + 1;
                    $confirmer = file_put_contents($file,$current);
                    //echo $current;
                }
                setcookie('downloadsubmitted-'.$playerid,'1',time() + 36000);


                echo $confirmer;
            }
            die();
        }

        if (isset($_POST['action']) && $_POST['action'] == 'dzsap_get_comments') {


            $aux = 'comments';
            $playerid = '';

            if (isset($_POST['playerid'])) {
                $aux.=$_POST['playerid'];
                $playerid = $_POST['playerid'];
            }

            $file = dirname(__FILE__).'/db/'.$aux.'.html';
//    echo $file;
            $current = file_get_contents($file);



            echo $current;



            //print_r($_COOKIE);

            die();
        }


        if (isset($_POST['action']) && $_POST['action'] == 'dzsap_front_submitcomment') {

            $aux = 'comments';

            if (isset($_POST['playerid'])) {
                $aux.=$_POST['playerid'];
            }

            
            if ($dzsap_config['type'] == 'portal') {

                echo $dzsap_portal->submit_comment();
            } else {
                $file = dirname(__FILE__).'/db/'.$aux.'.html';
                $current = file_get_contents($file);
                $current .= $_POST['postdata'];
                $confirmer = file_put_contents($file,$current);

                echo $confirmer;
            }


            die();
        }
        
        
        if (isset($_POST['action']) && $_POST['action'] == 'dzsap_submit_playlist_entry') {
            $dzsap_portal->submit_playlist_entry($_POST['playlistid'], $_POST['mediaid']);
        }

        if (isset($_POST['action']) && $_POST['action'] == 'dzsap_retract_playlist_entry') {
            $dzsap_portal->retract_playlist_entry($_POST['playlistid'], $_POST['mediaid']);
        }



        if (isset($_POST['action']) && $_POST['action'] == 'dzsap_get_rate') {


            $aux = 'db-rates';
            $playerid = '';

            if (isset($_POST['playerid'])) {
                $aux.=$_POST['playerid'];
                $playerid = $_POST['playerid'];
            }

            $file = dirname(__FILE__).'/db/'.$aux.'.html';

            $current = file_get_contents($file);



            if (isset($_COOKIE['ratesubmitted-'.$playerid])) {
                $current.='|'.$_COOKIE['ratesubmitted-'.$playerid];
            }

            echo $current;



            //print_r($_COOKIE);

            die();
        }
        if (isset($_POST['action']) && $_POST['action'] == 'dzsap_submit_rate') {



            $aux = 'db-rates';

            if (isset($_POST['playerid'])) {
                $aux.=$_POST['playerid'];
                $playerid = $_POST['playerid'];
            }


            if ($dzsap_config['type'] == 'portal') {

                echo $dzsap_portal->submit_rating();
            } else {


                $file = dirname(__FILE__).'/db/'.$aux.'.html';





                $current = file_get_contents($file);
                $current_arr = explode("|",$current);
//    print_r($current_arr);

                $rate_index = 0;
                $rate_nr = 0;

                if (count($current_arr) == 1 && $current_arr[0] == '') {
//        echo 'ceva';
                } else {
                    $rate_index = $current_arr[0];
                    $rate_nr = intval($current_arr[1]);

                    if ($rate_index == '' || $rate_index == ' ') {
                        $rate_index = 0;
                    }
                }

                if (!isset($_COOKIE['ratesubmitted-'.$playerid])) {
                    $rate_nr++;
                }


                if ($rate_nr <= 0) {
                    $rate_nr = 1;
                }

                $rate_index = ($rate_index * ($rate_nr - 1) + intval($_POST['postdata'])) / ($rate_nr);

//    echo ' $rate_index: '; print_r($rate_index);
//    echo ' $rate_nr: '; print_r($rate_nr);

                $fout = $rate_index.'|'.$rate_nr;

//    echo ' $fout: '; print_r($fout);

                $confirmer = file_put_contents($file,$fout);


                setcookie('ratesubmitted-'.$playerid,intval($_POST['postdata']),time() + 36000);

                echo $confirmer;
            }

            die();
        }






        if (isset($_POST['action']) && $_POST['action'] == 'dzsap_get_likes') {


            $aux = 'db-likes';

            if (isset($_POST['playerid'])) {
                $aux.=$_POST['playerid'];
                $playerid = $_POST['playerid'];
            }

            $file = dirname(__FILE__).'/db/'.$aux.'.html';

            $current = file_get_contents($file);
            echo $current;


            if (isset($_COOKIE['likesubmitted-'.$playerid])) {
                echo 'likesubmitted';
            }

            //print_r($_COOKIE);


            die();
        }


        if (isset($_POST['action']) && $_POST['action'] == 'dzsap_submit_like') {



            $aux = 'db-likes';
            $playerid = '';

            if (isset($_POST['playerid'])) {
                $aux.=$_POST['playerid'];
                $playerid = $_POST['playerid'];
            }





            if ($dzsap_config['type'] == 'portal') {

                echo $dzsap_portal->submit_like();
            } else {

                $file = dirname(__FILE__).'/db/'.$aux.'.html';



                $current = file_get_contents($file);
                $current = intval($current);
                $current = $current + 1;
                $confirmer = file_put_contents($file,$current);
                setcookie('likesubmitted-'.$playerid,'1',time() + 36000);


                echo $confirmer;
            }



            die();
        }
        if (isset($_POST['action']) && $_POST['action'] == 'dzsap_retract_like') {

            $aux = 'db-likes';
            $playerid = '';

            if (isset($_POST['playerid'])) {
                $aux.=$_POST['playerid'];
                $playerid = $_POST['playerid'];
            }

            $file = dirname(__FILE__).'/db/'.$aux.'.html';


            if ($dzsap_config['type'] == 'portal') {

                echo $dzsap_portal->retract_like();
            } else {

                $file = dirname(__FILE__).'/db/'.$aux.'.html';



                $current = file_get_contents($file);
                $current = intval($current);
                $current = $current - 1;
                $confirmer = file_put_contents($file,$current);


                setcookie('likesubmitted-'.$playerid,'',time() - 36000);

                echo $confirmer;
            }




            die();
        }
    }

    function misc_get_ip() {

        if (isset($_SERVER['HTTP_CLIENT_IP']) && !empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && !empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = (isset($_SERVER['REMOTE_ADDR'])) ? $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
        }

        $ip = filter_var($ip,FILTER_VALIDATE_IP);
        $ip = ($ip === false) ? '0.0.0.0' : $ip;


        return $ip;
    }

}

$dzsap_publisher = new DZSAP_Publisher();



//print_r($_POST);
