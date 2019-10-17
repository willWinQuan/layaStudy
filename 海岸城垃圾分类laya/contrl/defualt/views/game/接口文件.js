//quesList: <?php echo $quesList ?>, //问题列表
var quesList = [{
    "id": "2",
    "sequence": "序列图文件名",
    "type": "1:有害垃圾;2:可回收垃圾;3:其他垃圾;4:厨余垃圾;5:组合垃圾",
    "bgimg": "背景图",
    "data": [{//组合垃圾拆分
        "i_title": "垃圾标题",
        "i_img": "垃圾图",
        "i_sequence": "序列图文件名",
        "i_type": "1:有害垃圾;2:可回收垃圾;3:其他垃圾;4:厨余垃圾;",
        "i_tips": "提示",
        "i_tip_img": "提示图",
    }],
    "garbage": "",
    "img": "垃圾图",
    "title": "题目",
    "tips": "提示",
    "tip_img": "提示图",
}];


var ajaxAnswer = {
    data: {
        'answer': ''//字符串
    },
    result_data: {
        "result_code": '1',
        "result_msg": "ok",
        "result_data": {}
    }
};
