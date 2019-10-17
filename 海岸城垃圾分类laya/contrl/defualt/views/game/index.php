<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title><?php echo $activity['title']; ?></title>
    <?php include_once ROOT_PATH . '/public_tpl/common_header.php'; ?>
    <?php include_once ROOT_PATH . '/public_tpl/common_viewport.php'; ?>
    <meta charset="utf-8"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta equiv="Expires" content="0"/>

    <script>


        var sysParam = {
            baseUrl: '<?php echo $this->SURL(true); ?>/', //*插件的基本资源路径
            isAttention: '<?php echo $isSubscribe; ?>', //*用户是否已关注
            version: "<?php echo $version ?>", //版本
            musicUrl: "<?php echo $settings['musicUrl'] ?>", //音频路径
            quesList: <?php echo $quesList ?>, //题目列表
            num: <?php echo $num ?>, //第xx位
            nickname: "<?php echo $user['nickname'] ?>", //昵称
            userImg: '<?php echo $user['user_img'] ?>', //头像
            quesList: <?php echo $quesList ?>, //问题列表
            ajaxAnswer:"<?php echo AU('game/answer') ?>" //提交答题信息
        }

        var gameDefaultJson={
            "konwBtn":{"id":"konwBtn","left":229,"top":624,"height":63,"width":183,"url":sysParam.baseUrl+"images/gamePage/gameTip/konwBtn.png?ver="+sysParam.version},
            "gameTipBg":{"id":"gameTipBg","left":0,"top":0,"height":1008,"width":640,"url":sysParam.baseUrl+"images/gamePage/gameTip/gameTipBg.png?ver="+sysParam.version},
            "hand":{"id":"hand","left":300,"top":554,"height":69,"width":79,"url":sysParam.baseUrl+"images/gamePage/hand.png?ver="+sysParam.version},
            "trash01":{"id":"trash01","left":7,"top":717,"height":241,"width":156,"url":sysParam.baseUrl+"images/gamePage/trash/trash01.png?ver="+sysParam.version},
            "trash02":{"id":"trash02","left":163,"top":717,"height":241,"width":156,"url":sysParam.baseUrl+"images/gamePage/trash/trash02.png?ver="+sysParam.version},
            "trash03":{"id":"trash03","left":319,"top":717,"height":241,"width":156,"url":sysParam.baseUrl+"images/gamePage/trash/trash03.png?ver="+sysParam.version},
            "trash04":{"id":"trash04","left":475,"top":717,"height":241,"width":156,"url":sysParam.baseUrl+"images/gamePage/trash/trash04.png?ver="+sysParam.version},
            "orderToal":{"id":"orderToal","left":73,"top":110,"height":37,"width":38,"url":sysParam.baseUrl+"images/gamePage/orderBox/orderToal.png?ver="+sysParam.version},
            "gamePageBg":{"id":"gamePageBg","left":0,"top":0,"height":1008,"width":640,"url":sysParam.baseUrl+"images/gamePage/gamePageBg.png?ver="+sysParam.version},
            "somke01":{"id":"somke01","left":17,"top":730,"height":176,"width":173,"url":sysParam.baseUrl+"images/smokeAtlas/smoke.atlas?ver="+sysParam.version},
            "somke02":{"id":"somke02","left":173,"top":730,"height":176,"width":173,"url":sysParam.baseUrl+"images/smokeAtlas/smoke.atlas?ver="+sysParam.version},
            "somke03":{"id":"somke03","left":329,"top":730,"height":176,"width":173,"url":sysParam.baseUrl+"images/smokeAtlas/smoke.atlas?ver="+sysParam.version},
            "somke04":{"id":"somke04","left":485,"top":730,"height":176,"width":173,"url":sysParam.baseUrl+"images/smokeAtlas/smoke.atlas?ver="+sysParam.version},
        }
        
        var orderJson=[
            {"id":"order1","left":23,"top":111,"height":36,"width":47,"url":sysParam.baseUrl+"images/gamePage/orderBox/order01.png?ver="+sysParam.version},
            {"id":"order2","left":23,"top":111,"height":36,"width":48,"url":sysParam.baseUrl+"images/gamePage/orderBox/order02.png?ver="+sysParam.version},
            {"id":"order3","left":23,"top":111,"height":36,"width":47,"url":sysParam.baseUrl+"images/gamePage/orderBox/order03.png?ver="+sysParam.version},
            {"id":"order4","left":23,"top":111,"height":36,"width":49,"url":sysParam.baseUrl+"images/gamePage/orderBox/order04.png?ver="+sysParam.version},
            {"id":"order5","left":23,"top":111,"height":36,"width":47,"url":sysParam.baseUrl+"images/gamePage/orderBox/order05.png?ver="+sysParam.version},
            {"id":"order6","left":23,"top":111,"height":36,"width":48,"url":sysParam.baseUrl+"images/gamePage/orderBox/order06.png?ver="+sysParam.version},
            {"id":"order7","left":23,"top":111,"height":36,"width":47,"url":sysParam.baseUrl+"images/gamePage/orderBox/order07.png?ver="+sysParam.version},
            {"id":"order8","left":23,"top":111,"height":36,"width":48,"url":sysParam.baseUrl+"images/gamePage/orderBox/order08.png?ver="+sysParam.version},
            {"id":"order9","left":23,"top":111,"height":36,"width":47,"url":sysParam.baseUrl+"images/gamePage/orderBox/order09.png?ver="+sysParam.version},
            {"id":"order10","left":25,"top":111,"height":36,"width":45,"url":sysParam.baseUrl+"images/gamePage/orderBox/order10.png?ver="+sysParam.version}    
        ]
    </script>

    <link rel="stylesheet" type="text/css" href="<?php echo $this->SURL('/css/animation.css'); ?>">
    <link rel="stylesheet" type="text/css" href="<?php echo $this->SURL('/css/common.css'); ?>">
    <link rel="stylesheet" type="text/css" href="<?php echo $this->SURL('/css/index.css'); ?>">
</head>
<body>
<section id="app">
    <!--加载-->
    <transition name="fade">
        <section class="loading" id="loading" v-show="loading">
            <div class="loadingBox">
                <p><img class="" src="<?php echo $this->SURL('/logo.png') ?>"></p>
                <span class="l-1">i</span>
                <span class="l-2">-</span>
                <span class="l-3">l</span>
                <span class="l-4">z</span>
                <span class="l-5">.</span>
                <span class="l-6">c</span>
                <span class="l-7">n</span>
                <div class="loadingLine">
                    <div></div>
                </div>
            </div>
        </section>
        <?php $this->widget('application.widgets.AddonLoadingAnime', array(
            'activity' => $this->activity,
            'logo' => empty($settings['loadingImg']) ? $this->DSURL('/images/logo.png') : $settings['loadingImg'],
            'text' => '',
            'background' => '#000',
            'addClass' => '',
            'id' => '',
            'ext' => 'v-show="loading"'
        )); ?>
    </transition>
    <section v-cloak class="body">

        <transition-group name="fade">
            <!--加载页-->
            <section class="loadPage" key="fade" v-show="page.loadPage">
                <img class="loadBg" src="<?php echo $this->SURL('/images/loadPage/loadBg.png') ?>" />
                <img class="loadLogo" src="<?php echo $this->SURL('/images/loadPage/loadLogo.png') ?>" />
                <img class="loadContent" src="<?php echo $this->SURL('/images/loadPage/loadContent.png') ?>" />
                <div class="toIndex" @click="pageShow('index')">跳过>></div>
            </section>
            <!--首页-->
            <section class="index" key="fade" v-show="page.index">
                <img src="<?php echo $this->SURL('/images/index/indexBg.png') ?>" class="indexBg"/>
                <img src="<?php echo $this->SURL('/images/index/logoImg.png') ?>" class="logoImg"/>
                <img src="<?php echo $this->SURL('/images/index/themTitle.png') ?>" class="themTitle"/>
                <img src="<?php echo $this->SURL('/images/index/hearter.png') ?>" class="hearter heartbeat"/>
                <img src="<?php echo $this->SURL('/images/index/beginBtn.png') ?>" class="btn beginBtn animation-icon"
                     @click="pageShow('game')"/>
            </section>

            <!-- 垃圾分类页面 -->
            <section class="gamePage" key="fade" v-show="page.game">
                 <div class="toalQuestionNum" v-text="toalQuestionNum"></div>
            </section>

            <!-- 垃圾分类结果页面 -->
            <section class="answerList" key="fade" v-show="page.answerList">
                <img src="<?php echo $this->SURL('/images/answerList/answerListBg.png') ?>" class="answerListBg"/>
                <img src="<?php echo $this->SURL('/images/answerList/lookPostBtn.png') ?>" class="btn lookPostBtn" @click="pageShow('post')"/>
                <div class="listBox">
                    <div class="listContent" id="listContent">
                        <div>
                            <div class="listItem" v-for="(item,index) in questResutList" :key="index">
                                <img :src="baseUrl+'/images/answerList/listBox/listItem/itemType0'+item.trashType+'.png?ver='+version"
                                    class="itemType01"/>
                                <div class="itemName" v-text="item.title"></div>
                                <img 
                                    :src="item.flag == 1 ? baseUrl+'/images/answerList/listBox/listItem/trueImg.png?ver='+version:baseUrl+'/images/answerList/listBox/listItem/errorImg.png?ver='+version"
                                    class="errorImg"/>                           
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 海报页面 -->
            <section class="postPage" key="fade" v-show="page.post">

               <div class="postBox" id="postBox">
                    <img src="<?php echo $this->SURL('/images/postPage/postBox/postPageBg.png') ?>" class="postPageBg"/>
                    <img src="<?php echo $this->SURL('/images/postPage/postLogo.png') ?>" class="postLogo" />
                    <img src="<?php echo $this->SURL('/images/postPage/postBox/themText.png') ?>" class="themText"/>
                    <div class="userInfo">
                        <img :src="userImg" class="userImg"/>
                        <div class="userName" v-text="nickname"></div>
                    </div>
                    
                    <div class="rankingNum" v-text="rankingNum"></div>
                    <img src="<?php echo $this->SURL('/images/postPage/postBox/qrcodeBg.png') ?>" class="qrcodeBg"/>
                    <img src="<?php echo $this->SURL('/images/postPage/postBox/qrcodeImg.png') ?>" class="qrcodeImg"/>
                </div>
                
                <img src="<?php echo $this->SURL('/images/postPage/postPageBg.png') ?>" class="postPageBg"/>
                <img src="<?php echo $this->SURL('/images/postPage/postLogo.png') ?>" class="postLogo"/>
                <img src="<?php echo $this->SURL('/images/postPage/themText.png') ?>" class="themText"/>
                <div class="userInfo">
                    <img :src="userImg" class="userImg"/>
                    <div class="userName" v-text="nickname"></div>
                </div>
                <img src="<?php echo $this->SURL('/images/postPage/againBtn.png') ?>" class="btn againBtn" @click="reNewPage"/>
                <img src="<?php echo $this->SURL('/images/postPage/getPostBtn.png') ?>" class="btn getPostBtn" @click="getPost"/>
                <div class="rankingNum" v-text="rankingNum"></div>
                
            </section>
        </transition-group>

        <transition-group name="dialog">
            <!-- 海报查看 -->
            <div class="postAlert" style="z-index:1;" key="fade" v-show="pop.postAlert">
                <div class="postImgBox">
                    <img :src="postResultImg" class="btn postImg"/>
                </div>
                <img src="<?php echo $this->SURL('/images/postAlert/postTip.png') ?>" class="postTip"/>
                <img src="<?php echo $this->SURL('/images/postAlert/postAlertColseBtn.png') ?>" class="btn postAlertColseBtn" @click="close"/>
            </div>
            
            <!-- 选错弹框-->
            <div class="goodsErrorAlert01" style="z-index:1;" key="fade" v-show="pop.goodsErrorAlert">
                <!-- trashType 1:有害垃圾;2:可回收垃圾;3:其他垃圾;4:厨余垃圾; -->
                <img :src="baseUrl+'images/goodsErrorAlert/goodsErrorAlert0'+tipsAlertData.trashType+'/goodsErrorAlert0'+tipsAlertData.trashType+'Bg.png?ver='+version" class="goodsErrorAlert01Bg" />
                <div class="alertContentBox">  
                    <img :src="tipsAlertData.tip_img" class="alertGoodsImg" />
                    <div class="alertContent" v-text="tipsAlertData.tips"></div>
                    <div class="alertTitle" v-text="tipsAlertData.title"></div>
                </div>

                <img src="<?php echo $this->SURL('/images/goodsErrorAlert/goodsErrorAlert01/alertcloseBtn.png') ?>" class="btn alertcloseBtn" @click="close"/>
            </div>

            <!-- 垃圾桶介绍弹框 -->
            <div class="trashAlert" style="z-index:1" key="fade" v-show="pop.trashAlert">
                <img :src="baseUrl+'images/trashAlert/trashAlert0'+trashAlertType+'.png?ver='+version" 
                     :class="'trashAlert0'+trashAlertType" />
                <img src="<?php echo $this->SURL('/images/trashAlert/closeAlertBtn.png') ?>" class="btn closeAlertBtn" @click="close"/>
            </div>

        </transition-group>

        <transition-group name="fade">
            <!--弹窗黑层-->
            <section class="popupBg" key="fade" v-show="popupBg || pop.isEnd"></section>
        </transition-group>

        <transition-group name="fade">
            <div key="fade" class="fadeAlert" v-show="fAlert.show" v-html="fAlert.text"></div>
            <section key="fade" class="load" id="load" v-show="ajaxLoading">
                <div id="loading-center">
                    <div id="loading-center-absolute">
                        <div class="object" id="object_one"></div>
                        <div class="object" id="object_two" style="left:20px;"></div>
                        <div class="object" id="object_three" style="left:40px;"></div>
                        <div class="object" id="object_four" style="left:60px;"></div>
                        <div class="object" id="object_five" style="left:80px;"></div>
                    </div>
                </div>
            </section>
        </transition-group>
    </section>
</section>

<script src="//res1.i-lz.cn/plugin/vue.min.js"></script>
<script src="//res1.i-lz.cn/plugin/iscroll.js"></script>
<script src="//res1.i-lz.cn/plugin/layaAir/laya.core.min.js"></script>
<script src="//res1.i-lz.cn/plugin/layaAir/laya.webgl.min.js"></script>
<script src="<?php echo $this->SURL('/js/lodash-4.17.15.js') ?>"></script>
<script src="//res1.i-lz.cn/plugin/zepto.min.js"></script>
<script src="<?php echo $this->SURL('/js/html2canvas.min.js') ?>"></script>
<script src="<?php echo $this->SURL('/js/common.js') ?>"></script>
<script src="<?php echo $this->SURL('/js/index.js') ?>"></script>
<script src="<?php echo $this->SURL('/js/gameView.js') ?>"></script>
<script type="text/javascript">
    var title = "<?php echo $settings['shareTitle']; ?>", //分享标题
        desc = "<?php echo $settings['shareDesc'] ?>", //分享描述
        img = "<?php echo $settings['shareIcon'] ?>", //分享图标
        link = '<?php echo $shareUrl ?>'; //分享链接
    function init_wxjs() {
        WX_STAT.init({
            hideToolbar: true,
            hideOptionMenu: false,
            networkType: "",
            title: '{title}',
            title_vars: {
                '{title}': 'title'
            },
            desc: '{desc}',
            desc_vars: {
                '{desc}': 'desc'
            },
            img: '{img}',
            img_vars: {
                '{img}': 'img'
            },
            link: '{link}',
            link_vars: {
                '{link}': 'link'
            }
        }, { // 分享取消
            cancel: function (resp) {
                //alert(resp);
            },
            // 分享失败
            fail: function (resp) {
                //alert(resp);
            },
            // 分享成功
            ok: function (resp) {
                if (app.page.staff || app.page.jobnum) {
                    return;
                }
                ajax({
                    url: sysParam.ajaxLuckDraw,
                    callBack: function (res) {
                        app.prizeInfo = res.result_data;
                        app.popShow("getprize");
                    }
                })
            }
        }, {
            aid: "<?php echo $activity['aid']; ?>",
            wxid: "<?php echo $wxInfo['openid']; ?>",
            fromType: "<?php echo $this->fromType; ?>",
            fromWxid: "<?php echo $this->fromwx; ?>",
            attent: sysParam.isSubscribe
        });
    };
    init_wxjs();
</script>
</body>
</html>