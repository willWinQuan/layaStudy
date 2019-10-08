# layaStudy
联动互动laya学习笔记

1.关于Math.sin(x)以及math.cos(X)
Math.sin(x)      x 的正玄值。返回值在 -1.0 到 1.0 之间；

 

Math.cos(x)    x 的余弦值。返回的是 -1.0 到 1.0 之间的数；

这两个函数中的X 都是指的“弧度”而非“角度”，弧度的计算公式为： 2*PI/360*角度；

30° 角度 的弧度 = 2*PI/360*30

 

2.如何得到圆上每个点的坐标？
解决思路：根据三角形的正玄、余弦来得值；

假设一个圆的圆心坐标是(a,b)，半径为r，

则圆上每个点的X坐标=a + Math.sin(2*Math.PI / 360) * r ；Y坐标=b + Math.cos(2*Math.PI / 360) * r ；

 

3.如何求时钟的秒针转动一圈的轨迹？
假设秒针的初始值（起点）为12点钟方向，圆心的坐标为（a,b)。

解决思路：一分钟为60秒，一个圆为360°，所以平均每秒的转动角度为 360°/60 = 6°；

 

for(var times=0; times<60; times++) {

      var hudu = (2*Math.PI / 360) * 6 * times;

       var X = a + Math.sin(hudu) * r;

       var Y = b - Math.cos(hudu) * r    //  注意此处是“-”号，因为我们要得到的Y是相对于（0,0）而言的。

}

# 骨骼动画
  骨骼动画由Templet，AnimationPlayer，Skeleton三部分组成。
  