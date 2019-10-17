/***write by chenHaiQuan 20190925*/

var game;
$(function(){

    var WebGL = Laya.WebGL;
    var w = 640, h = window.innerHeight;
    Laya.init(w, h, WebGL);
    Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
    var Stage = Laya.stage;

    var Loader = laya.net.Loader; //加载资源
    var Handler = laya.utils.Handler;
    var Sprite = Laya.Sprite; //元素
    var Tween = Laya.Tween; //缓动
    var Event = laya.events.Event;
    var Animation = Laya.Animation;
    
    var allResJson=Object.assign(gameDefaultJson,app.gameQestionJson);
    var resArry=[];
    for(var key in allResJson){
        if (allResJson[key].url.indexOf("json") != -1) {
            allResJson[key].type = Loader.ATLAS
        } else if (allResJson[key].url.indexOf("mp3") != -1) {
            allResJson[key].type = Loader.SOUND
        } else if (allResJson[key].url.indexOf("atlas") != -1) {
            allResJson[key].type = Loader.ATLAS
        } else {
            allResJson[key].type = Loader.IMAGE
        }  
        resArry.push(allResJson[key])
    };

    //初始化游戏
    var lab = [],level=0,trashesArry=[],
    isGroup =false,groupAllNum=2,groupNum=1;
    game=(function(){
        var _this, g = function () {
            _this = this;
            this.load();
        };
        
        //加载资源
        g.prototype.load=function(){
            Laya.loader.load(resArry, Handler.create(this, getLab));

            $(".gamePage").prepend($("#layaContainer"));
          
            function getLab(){
                var index=0
                for(var key in allResJson){
                    lab[key]={
                      x:allResJson[key].left,
                      y:allResJson[key].top,
                      url:resArry[index].type == Loader.IMAGE?Loader.getRes(resArry[index].url):resArry[index].url
                    };
                    index++;
                }
                this.init();
            }
        }

        //初始化
        g.prototype.init = function () {
            Stage._childs=[];
            level=0;
            trashesArry=[];
            isGroup =false;
            groupAllNum=2;
            groupNum=1;
            this.questionsObj=new Sprite()
            this.createDeafultStage() 
        };
        
        //接口数据没渲染前状态 初始舞台区
        g.prototype.createDeafultStage=function(){
            var that=this
            //提示/提示按钮/背景/总序列/四个垃圾桶
            var bg=createImg("gamePageBg");
            bg.scaleY= h/1008;
            Stage.addChild(bg);

            var orderToal=createImg("orderToal")
            Stage.addChild(orderToal);

            
            //垃圾桶
            trashesArry=[]
            //type 1:有害垃圾;2:可回收垃圾;3:其他垃圾;4:厨余垃圾;
            var trashTypeList=["1","2","3","4"]
            for(var i=1;i<=4;i++){
               //创建 sprite 给sprite加入垃圾桶的图
            //    createAltlas("question"+questionNum+"goodsImg","question"+questionNum+"goodsImgAltlas");
               var trashesObj= createAltlas("trash0"+i,"somke0"+i);
               trashesObj.trashType=trashTypeList[i-1];

               trashesArry.push(trashesObj)
               Stage.addChild(trashesObj);
               
               (function(app,trashesObj){
                  trashesObj.on(Event.CLICK,that,function () {
                    app.trashAlertType=trashesObj.trashType;
                    app.popShow('trashAlert')
                  })   
               })(app,trashesObj)
            }

            var gameTipBg=createImg("gameTipBg")
            gameTipBg.scaleY= h/1008;
            Stage.addChild(gameTipBg);
            
            var konwBtn=createImg("konwBtn")
            Stage.addChild(konwBtn);
            
            //点击我知道了关闭提示
            konwBtn.on(Event.CLICK,that,function () {
                konwBtn.visible=false;
                gameTipBg.visible=false;
                
                //开始加载题目
                for(var i=0;i<app.questList.length;i++){
                    if(level==i && Number(app.questList[i].type) == 5){
                        isGroup=true
                    }
                }
                that.createQuestionsStage(level,isGroup)
            });
        }
        
        //加载第几题题目
        g.prototype.createQuestionsStage=function(questionNum,isGroup){
            //questionNum 第几题
            //isGroup 是否是组合特殊 题
            var that=this
            that.questionsObj._childs=[] //清空问题容器
            //创建序号/题目名称/题目图片
            var orderNum=createImg('questionOrder'+(questionNum+1));
            that.questionsObj.addChild(orderNum)

            var questionTitle=createImg("question"+questionNum+"title",false,false,1);
            that.questionsObj.addChild(questionTitle)
            
            if(!isGroup){
                var questionImg=createAltlas("question"+questionNum+"goodsImg","question"+questionNum+"goodsImgAltlas",360);
                questionImg.isMove=false
                questionImg.curX=questionImg.x
                questionImg.curY=questionImg.y
                questionImg.listIndex=questionNum
                questionImg.trashType=app.questList[questionNum].type
                that.questionsObj.addChild(questionImg)
                setGoodsDrag(questionImg)
            }else{
                groupAllNum=app.questList[questionNum].data.length
                for(var i=0;i<app.questList[questionNum].data.length;i++){
                    var questionImg=createAltlas("question"+questionNum+"goodsImg"+i,"question"+questionNum+"goodsImgAltlas"+i,360);
                    questionImg.isMove=false
                    questionImg.curX=questionImg.x
                    questionImg.curY=questionImg.y
                    questionImg.listIndex=questionNum
                    questionImg.childListIndex=i
                    questionImg.trashType=app.questList[questionNum].data[i].i_type
                    that.questionsObj.addChild(questionImg)
                    setGoodsDrag(questionImg)
                } 
            }
            
            Stage.addChild(this.questionsObj)

            //加载提示手 避免被题目图片遮挡
            if(level == 0){
                var hand=createImg("hand");
                Stage.addChild(hand);
                var defaultHand={x:hand._x,y:hand._y}
                //设置手的缓动
                Tween.to(hand,{x:defaultHand.x,y:defaultHand.y+180,alpha:0.8},1000,"",Handler.create(this,function () {
                    hand.visible=false;
                }));
            }
            
            //设置物品拖拽事件
            function setGoodsDrag(eventobj){
                var obj=eventobj
                // 按下物品
                obj.on(Event.MOUSE_DOWN,this,function () {
                    obj.isMove=true;
                    obj.oldX =Stage.mouseX;
                    obj.oldY =Stage.mouseY;
                });
                // 移动物品
                Stage.on(Event.MOUSE_MOVE,this,function () {
                    if(obj.isMove){
                        obj.x = (Stage.mouseX-obj.oldX)+obj.curX;
                        obj.y = (Stage.mouseY-obj.oldY)+obj.curY;
                        obj.play(true); //播放图集
                    }
                })
                // 停止触碰
                Stage.on(Event.MOUSE_UP,this,out);
                Stage.on(Event.MOUSE_OUT,this,out);

                /**hitTestPoint-检测某个点是否在此对象内。*/
                function out() {
                    if(obj.isMove){
                        obj.isMove=false;
                        var hitNum=""
                        for(var i=0;i<trashesArry.length;i++){
                            if(trashesArry[i].hitTestPoint(Stage.mouseX,Stage.mouseY)){
                                hitNum = i;
                                trashesArry[i].play(false);
                                (function(trashesArryItem){
                                    setTimeout(function(){
                                        trashesArryItem.stop()
                                    },1000)
                                })(trashesArry[i]);
                                
                               if(trashesArry[i].trashType == obj.trashType){
                                  //正确 保存结果
                                  app.questResutList.push({
                                     id:app.questList[obj.listIndex].id,
                                     trashType:obj.trashType,
                                     title:isGroup ? app.questList[obj.listIndex].data[obj.childListIndex].i_title:app.questList[obj.listIndex].title,
                                     flag:1
                                  })
                               }else{
                                  

                                 //错误 弹窗
                                 //1:有害垃圾;2:可回收垃圾;3:其他垃圾;4:厨余垃圾;

                                 var tip_img,tips,tipsTitle;
                                 if(isGroup){
                                    tip_img=app.questList[obj.listIndex].data[obj.childListIndex].i_tip_img;
                                    tips=app.questList[obj.listIndex].data[obj.childListIndex].i_tips;
                                    tipsTitle=app.questList[obj.listIndex].data[obj.childListIndex].i_title;
                                 }else{
                                    tip_img=app.questList[obj.listIndex].tip_img;
                                    tips=app.questList[obj.listIndex].tips;
                                    tipsTitle=app.questList[obj.listIndex].title;
                                 }
                                 app.tipsAlertData={
                                    title:tipsTitle,
                                    tip_img:tip_img,
                                    tips:tips,
                                    trashType:obj.trashType
                                 }

                                 //保存结果
                                 app.questResutList.push({
                                    id:obj.id,
                                    trashType:obj.trashType,
                                    title:tipsTitle,
                                    flag:0
                                })
                                 app.popShow('goodsErrorAlert')
                               }
                            }
                        }
                        //监测是否碰撞到选框
                        if(hitNum!==""){
                            Tween.to(obj,{alpha:0},200,"",Handler.create(this,function () {
                                obj.visible=false;
                                //下一题
                                level++;
                                if(level >= app.questList.length-1){
                                   level=app.questList.length-1
                                }

                                if(groupNum == groupAllNum && level == app.questList.length-1){
                                    //特殊题拖动加满
                                    
                                    //提交数据存储 && 跳转
                                    app.submitResult()
                                    return false
                                }

                                //特殊题需拖动多次
                                if(isGroup){
                                   groupNum++ //特殊题拖动加1
                                   return false 
                                }
                                for(var i=0;i<app.questList.length;i++){
                                    if(level == i && Number(app.questList[i].type) == 5){
                                        isGroup=true
                                    }
                                }
                                setTimeout(function(){
                                    that.createQuestionsStage(level,isGroup)
                                },500)
                            }));
                        }else {
                            Tween.to(obj,{x:obj.curX,y:obj.curY},200);
                            obj.stop();
                        }
                    }
                }
            }
        }

        return new g()
    })()


    //新建一个altlas
    function createAltlas(img,aniPath,x, y){
        var newSprite=new Sprite(),ani = new Animation(),
        aniConfPath=lab[aniPath].url;
        
        var imgObj=new Sprite();   
        imgObj.graphics.drawTexture(
            lab[img].url,
            0,
            0
        );
        newSprite.addChild(imgObj);
        newSprite.addChild(ani);
        
        ani.loadAtlas(aniConfPath);	// 加载图集动画
        ani.interval = 200;			// 设置播放间隔（单位：毫秒）
        ani.index = 0;	            // 当前播放索引	
        ani.visible=false;

        // 获取动画的边界信息
        var bounds = ani.getGraphicBounds();
        x = x ? x-bounds.width/2: lab[aniPath].x;
        y = y ? y/1008*h : lab[aniPath].y/1008*h;
        
        newSprite.size(bounds.width,bounds.height)
        newSprite.width=bounds.width;
        newSprite.height=bounds.height; 

        newSprite.pos(x, y);
        newSprite.isAniPlay=false;
        newSprite.play=function(isNeedImgObjFlase){
            //是否需要隐藏静态图
            if(!newSprite.isAniPlay){
                newSprite.isAniPlay=true;
                ani.visible=true;
                if(isNeedImgObjFlase){
                  imgObj.visible=false;
                }
                ani.play();
            }
           
        }
        newSprite.stop=function(){
           newSprite.isAniPlay=false;
           ani.index=0;
           ani.stop();
           ani.visible=false;
           imgObj.visible=true;
        }

        return newSprite
    }

    // 新建一个元件
    function createImg(img, x, y, c) {  //c不填 中心点在左上角 c=1中心点在元素中心
        //img 为lab 对象的key 也就是图片对象的key
        var Bitmap = new Sprite(), skin = lab[img].url;
        
        Bitmap.graphics.drawTexture(skin, 0, 0);

        Bitmap.size(skin.width, skin.height);
        Bitmap.width = skin.width;
        Bitmap.height = skin.height;
        var regX = skin.width / 2, regY = skin.height / 2;
        Bitmap.center = c;
        x = x ? x : lab[img].x;
        y = y ? y/1008*h : lab[img].y/1008*h;
        if (c == 1) {
            Bitmap.pivot(regX, regY);
            x=320
        } else if (c == 2) {
            Bitmap.pivot(regX, skin.height);
            x=x+regX
        }
            
        Bitmap.pos(x, y);
        return Bitmap
    }
})