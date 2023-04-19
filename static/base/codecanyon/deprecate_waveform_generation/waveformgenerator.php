<!DOCTYPE HTML>
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    <title>Video / Youtube Player / AS3</title><link rel="stylesheet" type="text/css" href="style/style.css">

<style>
    .mwrap{
        padding: 10px;
    }

    .setting{
        margin-bottom: 21px;;
    }
    .setting .setting-label{
        margin-bottom: 7px;;
        font-weight: bold;
    }
    .setting .sidenote{
        margin-top: 7px;
        font-style: italic;;

    }
    </style>
<body>
<div class="mwrap">

<?php
    if(isset($_POST['media'])) {

        ?>

    <form method="post">
        <button class="button-secondary">Clear Data</button>
        </form>
        <br>
        <div id="flashcon1" style="position: relative; width:100%; height:100%; top:0; left:0;">
            <object type="application/x-shockwave-flash" data="wavegenerator.swf" width="1024" height="512"
                    id="flashcontent" style="visibility: visible; ">
                <param name="movie" value="wavegenerator.swf">
                <param name="menu" value="false">
                <param name="allowScriptAccess" value="always">
                <param name="scale" value="noscale">
                <param name="allowFullScreen" value="true">
                <param name="wmode" value="opaque">
                <param name="flashvars"
                       value="media=<?php echo $_POST['media']; ?>&settings_multiplier=<?php echo $_POST['multiplier']; ?>&savetophp_loc=savepng.php&color_wavesbg=<?php echo $_POST['color_wavesbg']; ?>&color_wavesprog=<?php echo $_POST['color_wavesprog']; ?>&settings_enablejscallback=on&settings_autogenerate_prog=<?php echo $_POST['settings_autogenerate_prog']; ?>&settings_autogenerate_bg=<?php echo $_POST['settings_autogenerate_bg']; ?>&sample_time_start=<?php echo $_POST['sample_time_start']; ?>&sample_time_end=<?php echo $_POST['sample_time_end']; ?>&sample_time_total=<?php echo $_POST['sample_time_total']; ?>">
            </object>
        </div>
        <script>
            window.api_wavesentfromflash = function (arg) {
                if (window.console) {
                    console.info(arg);
                }
                ;
            }
        </script>

    <?php
    }else{

?>

        <form method="post">
            <div class="setting">
                <div class="setting-label">
                    Media
                </div>
                <input type="text" name="media" value="song.mp3">
            </div>
            <div class="setting">
                <div class="setting-label">
                    Multiplier
                </div>
                <input type="text" name="multiplier" value="1">
            </div>
            <div class="setting">
                <div class="setting-label">
                    Autogenerate Background Wave
                </div>
                <select name="settings_autogenerate_bg">
                    <option>on</option>
                    <option>off</option>
                    </select>
            </div>
            <div class="setting">
                <div class="setting-label">
                    Background Wave Color
                </div>
                <input type="text" name="color_wavesbg" value="ffffff">
            </div>
            <div class="setting">
                <div class="setting-label">
                    Progress Wave Color
                </div>
                <input type="text" name="color_wavesprog" value="a36363">
            </div>
            <div class="setting">
                <div class="setting-label">
                    Autogenerate Progress Wave
                </div>
                <select name="settings_autogenerate_prog">
                    <option>on</option>
                    <option>off</option>
                    </select>
            </div>
            <div class="setting">
                <div class="setting-label">
                    Sample Time Start
                </div>
                <input type="text" name="sample_time_start" value="0">
                <div class="sidenote">If this is a sample to a complete song, you can write here start times, if not, leave to 0.</div>
            </div>
            <div class="setting">
                <div class="setting-label">
                    Sample Time End
                </div>
                <input type="text" name="sample_time_end" value="0">
                <div class="sidenote">If this is a sample to a complete song, you can write here end times, if not, leave to 0.</div>
            </div>
            <div class="setting">
                <div class="setting-label">
                    Sample Time Total
                </div>
                <input type="text" name="sample_time_total" value="0">
                <div class="sidenote">If this is a sample to a complete song, you can write here total times, if not, leave to 0.</div>
            </div>
            <div class="">
                <button class="button-primary">Submit</button>
            </div>
        </form>

<?php

    }

?>
</div>
</body></html>
<?php
//sleep(5);