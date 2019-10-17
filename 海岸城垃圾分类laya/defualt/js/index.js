var mixins = {
    //默认项
    default:{
        data:function () {
            return{
                baseUrl:sysParam.baseUrl,
                version:sysParam.version,
                loading: false,
                ajaxLoading: false,
                //页面
                page: {
                    loadPage:false,
                    index: true,
                    game:false,
                    answerList:false,
                    post:false
                },
                //弹窗
                pop: {
                    postAlert: false,
                    goodsErrorAlert:false,
                    trashAlert:false
                },
                // 文案
                txt:{

                },
                //弹窗黑色背景
                popupBg: false,
                fAlert: {
                    show: false,
                    text: "提示"
                },
                popAlert: {
                    show: false,
                    text: "提示"
                },
                questList:sysParam.quesList,
                questResutList:[],
                tipsAlertData:{},
                trashAlertType:"1",
                nickname:sysParam.nickname,
                userImg:sysParam.userImg,
                rankingNum:sysParam.num,
                postResultImg:"",
                toalQuestionNum:sysParam.quesList.length
            }
        },
        computed: {
          gameQestionJson:function(){
            var questList=this.questList,
                baseUrl=this.baseUrl,
                version=this.version,
                resJson={};
             for(var i=0;i<questList.length;i++){
                
                resJson['questionOrder'+(i+1)]={
                    "id":'questionOrder'+(i+1),
                    "left":23,
                    "top":111,
                    "url":orderJson[i].url
                }

                resJson['question'+i+"title"]={
                    "id":'question'+i+"title",
                    "left":200,
                    "top":220,
                    "url":questList[i].bgimg
                }

                if(Number(questList[i].type) !== 5){
                  //type 1:有害垃圾;2:可回收垃圾;3:其他垃圾;4:厨余垃圾;5:组合垃圾
                  resJson["question"+i+"goodsImgAltlas"]={
                    "id":'question'+i+"goodsImg",
                    "trashType":questList[i].type,
                    "left":200,
                    "top":320, 
                    "url":baseUrl+"/images/goodsAtlas/"+questList[i].sequence+".atlas?ver="+version
                  }
                  resJson["question"+i+"goodsImg"]={
                    "id":'question'+i+"goodsImg",
                    "trashType":questList[i].type,
                    "left":200,
                    "top":320,
                    "url":questList[i].img  
                  }
                }else{
                  if(questList[i].data ==null){
                    return false
                  }
                  for(var j =0;j<questList[i].data.length;j++){
                    resJson["question"+i+"goodsImgAltlas"+j]={
                        "id":'question'+i+"goodsImg"+j,
                        "trashType":questList[i].data[j].i_type,
                        "left":200,
                        "top":320,
                        "url":baseUrl+"/images/goodsAtlas/"+questList[i].data[j].i_sequence+".atlas?ver="+version   
                    }
                    resJson["question"+i+"goodsImg"+j]={
                        "id":'question'+i+"goodsImg"+j,
                        "trashType":questList[i].data[j].i_type,
                        "left":200,
                        "top":320,
                        "url":questList[i].data[j].i_img   
                    }
                  }
                } 
             }
             return resJson
          }
        },
        mounted() {
            var that=this
           setTimeout(function(){
            if(that.page.loadPage){
               that.pageShow('index');
            }
           },2500)
        },
        methods:{
            reNewPage:function(){
                this.questResutList=[]
                game.init();
                this.pageShow('index');
            },
            //生成海报
            getPost:function(){
                var that=this
                that.fadeAlert("海报生成中...")
                setTimeout(function(){
                    html2canvas(document.querySelector("#postBox"),{
                        useCORS:true,
                        scale:1
                    }).then(function (canvas) {
                        that.postResultImg = canvas.toDataURL('image/jpg', 1)	
                        that.popShow('postAlert')						
                    });
                },50) 
            },
            //提交答题数据
            submitResult(){
              var objArry=[],that=this;
              for(var i=0;i<that.questResutList.length;i++){
                objArry.push({
                   id:that.questResutList[i].id,
                   flag:that.questResutList[i].flag
                })   
              }
              ajax({
                url:sysParam.ajaxAnswer,
                data:{
                    answer:JSON.stringify(objArry)
                },
                callBack:function(res){
                    //答完跳转
                    app.pageShow("answerList")
                    setTimeout(function () {
                        app.rule.refresh();
                    }, 100)
                }
               })
            },
            //切换页面
            pageShow: function (id) {
                for (var i in this.page) {
                    this.page[i] = i == id ? true : false;
                }
            },

            //弹窗切换
            popShow: function (id) {
                for (var i in this.pop) {
                    this.pop[i] = i == id ? true : false;
                }
                this.popupBg = id ? true : false;
            },

            //关闭弹窗
            close: function () {
                this.popShow();
            },

            // 错误提示淡入淡出
            fadeAlert: function (text, time) {
                if (this.fadeAlertSetTime) {
                    clearTimeout(this.fadeAlertSetTime)
                }
                this.fAlert.show = true;
                this.fAlert.text = text;
                this.fadeAlertSetTime = setTimeout(function () {
                    app.fAlert.show = false;
                }, time ? time : 1500);
            },

            //跳转外链
            goUrl:function (url) {
                window.location.href = url
            },
            //替换当前页
            goGame:function (url) {
                window.location.replace(url)
            },

        }
    },
    //文案
    text:{
      data:{
          txt:{

          }
      }
    },
    //排行榜
    rankList:{
        data:function () {
            return{
                pageNum:1,
                rankList:[],
                maxPageNum:1
            }
        },
        methods:{
            showRank: function (type) {
                ajax({
                    url: sysParam.ajaxRankingList,
                    data: {
                        "is_share": type,  // 0 分数排行榜  1 助力排行榜
                        "page": this.pageNum,  //获取页数
                    }, callBack: function (data) {
                        app.popShow("rank");
                        if (app.pageNum == 1) {
                            app.rankList = data.result_data.total_page_list
                        } else {
                            app.rankList = app.rankList.concat(data.result_data.total_page_list)
                        }
                        app.maxPageNum = data.result_data.total_page_nums;

                        setTimeout(function () {
                            app.rankList.refresh();
                        }, 100)
                    }
                })
            },
        },
        created:function () {
            this.$nextTick(function () {
                app.rankList = new IScroll(".rankList ");
                app.rankList.on("scrollEnd", function (e) {
                    if (app.pageNum < app.maxPageNum && this.y == this.maxScrollY) {
                        app.pageNum++;
                        app.showRank();
                    }
                })
            })
        }
    },
    //规则
    rule:{
        data:function () {
            return{

            }
        },
        methods:{
            showRule: function () {
                this.popShow("rule");
                setTimeout(function () {
                    app.rule.refresh();
                }, 100)
            },
        },
        created:function () {
            this.$nextTick(function () {
                app.rule = new IScroll("#rule");

            })
        }
    }
};

var app = new Vue({
    mixins:[mixins.default,mixins.text],
    el: '#app',
    data:{
      rule:""
    },
    methods: {

    },
    created: function () {
        this.$nextTick(function () {
            //加载
            sys.lazyLoad(".body", function () {
                //加载完毕
                sys.loadingComplete();
                app.rule = new IScroll("#listContent");
            });
        })
    }
});

