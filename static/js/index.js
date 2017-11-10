$(function () {
	var i = 0;
	var onoff = true;
//	初始导航条字体颜色
	$("#nav li a").css("color", "#9d9d9d").eq(i).css("color", "#fff");
//	作品描述定位
	$(".details").css("top", $(".works-item").height() / 2);
	//	判断是否存在滚动条
		if ($(window).height() == $(document).height()) {
		//	滚轮上下滚动
			$(document).on("mousewheel DOMMouseScroll", function (e) {
				var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
							(e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
		//		开关
				if (onoff) {
					onoff = false;
		//			向上滚
					if (delta > 0) {
						i--;
						if (i < 0) {
							i = 0;
						}
						$(".content-box").animate({
							top: -i * parseInt($(".content1").height())
						});
						setTimeout(function () {
							onoff = true;
						}, 400)
					}else if (delta < 0) {
						i++;
						if (i >= $(".content").size()) {
							i = $(".content").size() -1;
						}
						$(".content-box").animate({
							top: -i * parseInt($(".content1").height())
						});
						setTimeout(function () {
							onoff = true;
						}, 400)
					}
				}
				console.log(i)
				$("#nav li a").css("color", "#9d9d9d").eq(i).css("color", "#fff");	
			});
		//	点击导航条跳转到相应页面
			$("#nav li").on("click", function () {
				i = $(this).index();
				$(".content-box").animate({
					top: -i * parseInt($(".content1").height())
				});
				$("#nav li a").css("color", "#9d9d9d").eq(i).css("color", "#fff");	
			})
		}else {
			$("#nav li").on("click", function () {
				i = $(this).index(); 
				console.log(i, $(".content").eq(i).offset().top);
				$("body,html").animate({
					scrollTop: $(".content").eq(i).offset().top
				});	
				$("#nav li a").css("color", "#9d9d9d").eq(i).css("color", "#fff");
			});
		}
})
//
//$(window).resize(function () {          //当浏览器大小变化时
//}); 