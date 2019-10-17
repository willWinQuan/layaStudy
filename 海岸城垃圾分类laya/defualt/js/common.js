
var sys = (function () {
    var _this;
    var s = function () {
        _this = this;
    };
    s.prototype.init = function () {
        this.stopScrolling();
        this.loadCompant = false;
    };
    s.prototype.lazyLoad = function (obj, fun) {
        var imgArr = [], num = 0;
        $(obj).find("*").each(function () {
            var src =$(this).attr("data-src");
            if (src) {
                imgArr.push(src);
                $(this).attr("src", src);
                $(this).attr("data-src", "");
            }else {
                var img = $(this).css("background-image");
                if (img != "none") {
                    img = img.replace(/("|'|\(|\)|url)/g, "").toString();
                    imgArr.push(img);
                }
            }
        });
        var imgArrNum = imgArr.length;
        if (imgArrNum > 0) {
            $(".loadingLine").show();
            for (var i = 0; i < imgArrNum; i++) {
                var img = new Image();
                img.src = imgArr[i];
                img.onload = function () {
                    loadFun()
                };
                img.onerror = function () {
                    loadFun()
                };
                function loadFun() {
                    if (num < (imgArrNum - 1)) {
                        num++;
                        if (!_this.loadCompant) {
                            var pp = parseInt(num / imgArrNum * 100);
                            $(".loadingLine>div").css("width", pp + "%");
                        }
                    } else {
                        if (!_this.loadCompant) {
                            $(".loadingLine>div").css("width", "100%");
                            _this.loadCompant = true;
                        }
                        if (typeof fun == "function") {
                            fun()
                        }
                    }
                }
            }
        } else {
            if (typeof fun == "function") {
                fun()
            }
        }
    };
    s.prototype.stopScrolling = function (e) {
        document.addEventListener('touchmove', _this.preventDefault, {passive: false});
    };
    s.prototype.openScrolling = function () {
        document.removeEventListener('touchmove', _this.preventDefault);
    };
    s.prototype.preventDefault = function (e) {
        e.preventDefault();
    };
    s.prototype.loadingComplete = function () {
        app.loading = false;
        this.init();
    };
    return new s();
})();


//音频控制
var media = (function () {
    var musicUrl = sysParam.musicUrl,   //音频连接
        musicPlayIco = sysParam.baseUrl + "images/mPlay.png",//播放按钮
        musicPauseIco = sysParam.baseUrl + "images/mPaused.png";//暂停按钮
    if (musicUrl) {
        var img = "<img src='" + musicPlayIco + "' id='musicCtrl' class='btn mAnim mRb'>";
        $("body").append(img);
        var m = function () {
            this.audio = new Audio();
            this.audio.setAttribute("autoplay", "autoplay");
            this.audio.setAttribute("loop", "loop");
            this.audio.volume=0.8;//声音大小0-1
            if (sysParam.musicUrl) {
                this.init();
            }
        };
        m.prototype.init = function () {
            var _this = this;
            this.audio.src = musicUrl;
            this.music = $("#musicCtrl");
            this.music.show();
            this.music.attr("src", musicPlayIco);
            document.onreadystatechange = function () {
                if (document.readyState == "complete" && _this.audio.paused) {
                    _this.audioPlay();
                }
            };
            $("body").one("touchstart", function () {
                _this.audioPlay();
            });
            document.addEventListener("WeixinJSBridgeReady", function () {
                media.audio.play();
            }, false);
            this.music.off().on("click", function () {
                _this.musicCtrl(_this)
            });
        };
        m.prototype.musicCtrl = function (b) {
            if (b.audio.paused) {
                b.audioPlay();
                return;
            }
            b.audioPause();
        };
        m.prototype.audioPlay = function () {
            this.audio.play();
            this.music.attr("src", musicPlayIco);
            this.music.addClass("mAnim");
        };
        m.prototype.changeMusic = function (url) {
            if (this.audio.src != url) {
                this.audio.pause();
                this.audio.src = url;
                this.audio.play();
            }
        };
        m.prototype.audioPause = function () {
            this.audio.pause();
            this.music.attr("src", musicPauseIco);
            this.music.removeClass("mAnim");
        };
        return new m();
    }
})();

function ajax(b) {
    app.ajaxLoading = true;
    $.ajax({
        type: b.type ? b.type : 'post',
        url: b.url,
        dataType: 'json',
        data: b.data ? b.data : "",
        timeout: 15000,
        success: function (data) {
            app.ajaxLoading = false;
            if (data.result_code == 1) {
                if (typeof b.callBack == "function") {
                    b.callBack(data)
                }
            } else {
                if (typeof b.err == "function") {
                    b.err(data);
                } else {
                    app.fadeAlert(data.result_msg);
                }
            }
        },
        error: function (xhr, type) {
            app.ajaxLoading = false;
            alert('网络超时，请刷新后再试！');
        }
    });
}


