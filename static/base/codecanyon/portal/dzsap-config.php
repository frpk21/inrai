<?php
$dzsap_config = array(
    'type' => 'normal',
    'url_portalphp' => 'portal.php',
    'mysql_server' => 'localhost',
    'mysql_user' => 'root',
    'mysql_password' => 'root',
    'mysql_table' => 'zoomsounds',
    'enable_likes' => 'on',
    'enable_views' => 'on',
    'enable_rates' => 'on',
    'str_likes_part1' => '<div class="btn-like"><span class="the-icon"></span>Like</div>',
    'str_views' => '<div class="counter-hits"><span class="the-number">{{get_plays}}</span> plays</div>',
    'str_likes_part2' => '<div class="counter-likes"><span class="the-number">{{get_likes}}</span> likes</div>',
    'str_rates' => '<div class="counter-rates"><span class="the-number">{{get_rates}}</span> rates</div>',
    'soundcloud_api_key' => '',
    'skinwave_comments_enable' => 'on',
            'dzsap_tab_share_content' => '<span class="share-icon-active"><iframe src="//www.facebook.com/plugins/like.php?href={{currurl}}&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21&amp;appId=569360426428348" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:120px; height:21px;" allowTransparency="true"></iframe></span>
<span class="share-icon-active"><div class="g-plusone" data-size="medium"></div></span>
<span class="share-icon-active"><a href="https://twitter.com/share" class="twitter-share-button" data-via="ZoomItFlash">Tweet</a></span><br><br><h5>Embed</h5><div class="dzs-code">{{embedcode}}</div>
<script type="text/javascript">
  (function() {
    var po = document.createElement("script"); po.type = "text/javascript"; po.async = true;
    po.src = "https://apis.google.com/js/platform.js";
    var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s);
  })();
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document, "script", "twitter-wjs");</script>',
            
);