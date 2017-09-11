//媒体查询
setHtmlFontSize();
window.onresize = function(){
	setHtmlFontSize ();
}
function setHtmlFontSize (){
	if(window.innerWidth <= 750){
		document.documentElement.style.fontSize = ((window.innerWidth / 750)*100)+'px';		
	}else{
		document.documentElement.style.fontSize = '100px';
	}
}

$(function () {
//------------------轮播图------------------------
	var timer = 0;
	var i = 1;
	var starX = 0,
		endX = 0,
		x = 0,
		ctX = 0;
	//获取轮播图li宽度
	var $liWidth = $("#content1 .picture_box").width() / 6;
	//设置里宽度
	$("#content1 .picture_box li").css("width", $liWidth);
	//轮播图初始定位
	$("#content1 .picture_box").css("left", -$liWidth);	
	
	//自动轮播
	carousel();
	//封装自动轮播函数
	function carousel () {
		timer = setInterval(function () {
			i++;
			if (i >= $("#content1 .picture_box li").size() - 1) {
				$("#content1 .picture_box").animate({left: -$liWidth * i}, 500, function () {
					$("#content1 .picture_box").css("left", -$liWidth * 1);
				});
				i = 1;
			}
			$("#content1 .picture_box").animate({left: -$liWidth * i}, 500);
			//对应轮播点改变样式
			$("#content1 .radius li").eq(i - 1).addClass("active").siblings().removeClass("active");
		}, 3000);
	}
	
//------------返回顶部------------
	$("#return_top").on("click", function () {
		$("body, html").scrollTop(0);
	});
	
//-------------秒杀倒计时--------------------
	var endTime = new Date(2018, 0, 1);
	var	nowTime = 0,
		countDown = 0,
		hour = 0,
		minutes = 0,
		seconds = 0;
	setInterval(function () {
		endTime = new Date(2018, 0, 1);
		nowTime = new Date();
		countDown = new Date(endTime - nowTime);
		hour = countDown.getHours();
		if (hour < 10) hour = "0" + hour;
		minutes = countDown.getMinutes();
		if (minutes < 10) minutes = "0" + minutes;
		seconds = countDown.getSeconds();
		if (seconds < 10) seconds = "0" + seconds;
		console.log(hour)
		$("#content4 .hours").text(hour);
		$("#content4 .minutes").text(minutes);
		$("#content4 .seconds").text(seconds);
	}, 1000);
		
	
	
})
