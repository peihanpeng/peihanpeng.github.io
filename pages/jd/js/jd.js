//js
window.onload = function () {
	var city = document.getElementById("city");
	var aA = document.getElementsByTagName("a");
	var displayCity = document.getElementById("displayCity");
	var rightImg = document.getElementById("right_img");
	var leftImg = document.getElementById("left_img");
	var oMobile = document.getElementById("mobile");
	var mobileStatic = oMobile.getElementsByClassName("mobile_static")[0];
	//获取二维码下隐藏的东西
	var mobilePop = document.getElementById("J_mobile_pop");
	for (var i=0, len=aA.length; i<len; i++) {
		aA[i].onclick = function () {
			for (var j=0; j<len; j++) {
				aA[j].className = "";
			}
			this.className = "show";
			displayCity.innerText = this.innerText;
		}
	}
	leftImg.onmouseenter = function () {
		rightImg.style.width = "990px";
	}
	leftImg.onmouseleave = function () {
		rightImg.style.width = "0";
	}
	oMobile.onmouseenter = function () {
		mobilePop.style.display = "block";
	}
	oMobile.onmouseleave = function () {
		mobilePop.style.display = "none";
	}
	//移入二维码显示隐藏,移出隐藏
	mobileStatic.onmouseenter = function () {
		mobilePop.style.display = "block";
	}
	mobilePop.onmouseleave = function () {
		mobilePop.style.display = "none";
	}
//	滚动一定距离出现搜索框
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var search = document.getElementsByClassName("search_hide")[0];
	var leftSidebar = document.getElementById("left_sidebar");
	var liftListItem = leftSidebar.getElementsByClassName("lift_list_item");
	if (scrollTop >= 800) {
		search.style.top = "0";
	}else {
		search.style.top = "-100px";
	}
}








//jq
//	左边侧边栏
$(window).scroll(function () {
	var $scrollTop = $(document).scrollTop();
	console.log($scrollTop);
	var i = 0;
	if ($scrollTop > 1200) {
		$("#left_sidebar").fadeIn(300);
	}else {
		$("#left_sidebar").fadeOut(300);
	}
	if ($scrollTop >= 1400 && $scrollTop < 2140) {
		i = 0;
	}else if ($scrollTop >= 2140 && $scrollTop < 2730) {
		i = 1;
	}else if ($scrollTop >= 2730 && $scrollTop < 3290) {
		i = 2;
	}else if ($scrollTop >= 3290 && $scrollTop < 4190) {
		i = 3;
	}else if ($scrollTop >= 4190) {
		i = 4;
	}
	$(".lift_list_item").removeClass("bg").eq(i).addClass("bg");
	$(".lift_list_item").off().hover(function () {
		$(".lift_list_item").removeClass("bg").eq(i).addClass("bg");;
		$(this).addClass("bg");
	}, function () {
		$(".lift_list_item").removeClass("bg").eq(i).addClass("bg");;
	})
	$(".lift_list_item").off().click(function () {
		i = $(this).index();
		console.log(i)
		if (i == 0) {
			$("body,html").animate({ scrollTop: 1400 }, 200);
		}else if (i == 1) {
			$("body,html").animate({ scrollTop: 2140 }, 200);
		}else if (i == 2) {
			$("body,html").animate({ scrollTop: 2730 }, 200);
		}else if (i == 3) {
			$("body,html").animate({ scrollTop: 3290 }, 200);
		}else if (i == 4) {
			$("body,html").animate({ scrollTop: 4190 }, 200);
		}
	 });
	$(".return_top").off().click(function () {
			$("body,html").animate({ scrollTop: 0 }, 200);
	})
})
	



$(function (){
//	轮播图1
//	获取轮播图图片的li
	var $imgLi = $("#content_head .slideshow");
	var htmlSpan = "";
//	获取轮播图最外层框
	var $ctHead = $("#content_head");
//	获取左右按键
	var timer = 0;
	var i = 0;
//	插入与图片相同个数的span点
	$.each($imgLi, function () {
		htmlSpan += "<span></span>";
	});
	$(".radius").html(htmlSpan);
//	最后一个span点margin-right为0
	$(".radius span").eq($(".radius span").size() - 1).css("margin-right", 0);
//	span点居中
	$(".radius").css("left", (790 - parseInt($(".radius").css("width")))/2)
//	移入图片左右按键显示，停止轮播，移出左右按键消失，继续轮播
	$ctHead.hover(function (){
		$(".slideshow_btn").show();
		clearInterval(timer);
	}, function () {
		$(".slideshow_btn").hide();
		carousel();
	});
//	显示第一张图片
	$imgLi.eq(0).show();
//	第一个span点变红
	$(".radius span").eq(0).addClass("active");
//	自动轮播
	carousel();
//	鼠标移入span点显示对应图片,span点变色
	$(".radius span").mouseenter(function () {
		i = $(this).index();
		show();
	});
//	按左按钮显示上一张
	$(".left").click(function () {
		i--;
		if (i < 0) {
			i = $imgLi.size() - 1;
		}
		show();
	})
//	按右边按钮显示下一张
	$(".right").click(function () {
		i++;
		if (i > $imgLi.size() - 1) {
			i = 0;
		}
		show();
	})
	function carousel () {
		timer = setInterval(function () {
			i++;
			if (i == $imgLi.size()) {
				i = 0;
			}
			show();
		},4000);
	}
	function show () {
		$imgLi.eq(i).fadeIn(300).siblings().fadeOut(300);
//		当前图片对应的span点变红
		$(".radius span").eq(i).addClass("active").siblings().removeClass("active");
	}
});	

$(function () {
	var timer = 0;
	var i = 0;
		$(".ct_bt > li").eq(0).addClass("active");
	
	$(".icon_left").click(function () {
		i--;
		if (i < 0) i = 2;
		show();
	})
	$(".icon_right").click(function () {
		i++;
		if (i > 2) i = 0;
		show();
	})
	$(".commodity_content_content").hover(function () {
		$(".icon_btn").show();
		clearInterval(timer);
	}, function () {
		$(".icon_btn").hide();
		carousel();
	})
	function show () {
		$(".commodity_content").fadeOut(300).eq(i).fadeIn(300);
		$(".ct_bt > li").eq(i).addClass("active").siblings().removeClass("active");
	}
	function carousel () {
		timer = setInterval(function () {
			i++;
			if (i > 2) i = 0;
			show();
		}, 4000);
	}
	carousel();
})



$(function () {
	var i = 0;
	var timer = 0;
	$(".sk_special_indlist > li").eq(0).addClass("active");
		$(".seckill_right_item").eq(0).fadeIn(300).siblings().fadeOut(300);
	$(".sk_special_indlist > li").mouseenter(function () {
		i = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".seckill_right_item").eq(i).fadeIn(300).siblings().fadeOut(300);
	})
	timer = setInterval(function () {
		i++;
		if (i > 1) i = 0;
		$(".sk_special_indlist > li").eq(i).addClass("active").siblings().removeClass("active");
		$(".seckill_right_item").eq(i).fadeIn(300).siblings().fadeOut(300);
	}, 4000)
})



$(function () {
//	轮播图2
//	显示第一张图,第一个圆点变色
	$(".live_item").eq(0).show().siblings().hide();
	$(".live_radius_item").eq(0).addClass("live_radius_bg");
	var timer = 0;
	var i = 0;
//	自动轮播
	carousel();
//	移入停止轮播
	$(".live_inner").hover(function () {
		clearInterval(timer);
	}, function () {
		carousel();
	});
//	移入圆点显示对应图片
	$(".live_radius_item").mouseenter(function () {
		i = $(this).index();
		show();
	});
//	按左边按键显示上一张
	$(".live_btn_left").click(function () {
		i--;
		if (i < 0) {
			i = $(".live_item").size() - 1;
		}
		show();
	})
//	按右边按钮显示下一张
	$(".live_btn_right").click(function () {
		i++;
		if (i > $(".live_item").size() - 1) {
			i = 0;
		}
		show();
	})
	function carousel () {
		timer = setInterval(function () {
			i++;
			if (i == $(".live_item").size()) {
				i = 0;
			}
			show();
		}, 4000);
	}
	function show () {
		$(".live_item").eq(i).fadeIn(300).siblings().fadeOut(300);
		$(".live_radius_item").eq(i).addClass("live_radius_bg").siblings().removeClass("live_radius_bg");
	}
});


//	产品切换
$(function () {
	var i = 1;
//	第一个
	pre($(".pt_logo_btn_left1"), $(".pt_logo_list1"));
	next($(".pt_logo_btn_right1"), $(".pt_logo_list1"));
//	第二个
	pre($(".pt_logo_btn_left2"), $(".pt_logo_list2"));
	next($(".pt_logo_btn_right2"), $(".pt_logo_list2"));
//	第三个
	pre($(".pt_logo_btn_left3"), $(".pt_logo_list3"));
	next($(".pt_logo_btn_right3"), $(".pt_logo_list3"));
//	第四个
	pre($(".pt_logo_btn_left4"), $(".pt_logo_list4"));
	next($(".pt_logo_btn_right4"), $(".pt_logo_list4"));
//	第五个
	pre($(".pt_logo_btn_left5"), $(".pt_logo_list5"));
	next($(".pt_logo_btn_right5"), $(".pt_logo_list5"));
	function pre (a, b) {
		a.click(function () {
			i--;
			if (i < 1) {
				i = 2;
				b.css("transition", "none").css("left", -570 * (i + 1));
			}
			setTimeout(function() {
				
				b.css("transition", ".6s cubic-bezier(0,1.35,.83,.98),-webkit-transform .6s cubic-bezier(0,1.35,.83,.98),-moz-transform .6s cubic-bezier(0,1.35,.83,.98)").css("left", -570 * i);
			}, 80);
		})
	}
	function next (a, b) {
		a.click(function () {
			i++;
			if (i > 2) {
				i = 1;
				b.css("transition", "none").css("left", -570 * (i - 1));
			}
			setTimeout(function() {
				b.css("transition", ".6s cubic-bezier(0,1.35,.83,.98),-webkit-transform .6s cubic-bezier(0,1.35,.83,.98),-moz-transform .6s cubic-bezier(0,1.35,.83,.98)").css("left", -570 * i);
			}, 80);
		})
	}
})


//	产品切换
$(function () {
	var i = 1;
	$(".shop_item").hover(function () {
		$(".shop_btn").show();
	}, function () {
		$(".shop_btn").hide();
	})
	$(".shop_btn").mouseenter(function () {
		$(".shop_btn").show();
	})
	$(".shop_btn_left").click(function () {
		i--;
		if (i < 0) {
			i = 3;
			$(".shop_list").css("transition", "none").css("left", -(i + 1) * 1000);
		}
		setTimeout(function () {
			$(".shop_list").css("transition", ".8s").css("left", -i * 1000);
		},80)
	})
	$(".shop_btn_right").click(function () {
		i++;
		if (i > 4) {
			i = 1;
			$(".shop_list").css("transition", "none").css("left", -(i - 1) * 1000);
		}
		setTimeout(function () {
			$(".shop_list").css("transition", ".8s").css("left", -i * 1000);
		},80)
	})
})

	
//	倒计时
$(function () {
	var t = 0;
	var date = 0;
	var minute = 0;
	var second = 0;
	countDown = setInterval(function () {
		t = new Date(2017, 9, 1) - new Date();
		d = new Date(t);
		date = d.getMonth() * 30 + d.getDate();
		minute = d.getMinutes();
		second = d.getSeconds();
		function conversion (a) {
			return a < 10 ? '0' + a : a;
		}
		$(".hour").text(conversion(date));
		$(".minute").text(conversion(minute));
		$(".second").text(conversion(second));
	}, 1000)
})
//	菜单栏
$(function () {
	var i = 0;
	$("#list_menu > li").mouseenter(function () {
		i = $(this).index();
		$(this).css("background", "#999395").siblings().css("background", "none");
		$("#list_right_content").show();
		$("#list_right_content > li").eq(i).show().siblings().hide();
		$("#list_right_content").hover(function () {
			$("#list_menu > li").eq(i).css("background", "#999395").siblings().css("background", "none");
			$("#list_right_content").show();
		}, function () {
			$("#list_right_content").hide();
		})
	})
	$("#list_menu").mouseleave(function () {
		$("#list_menu > li").css("background", "none");
		$("#list_right_content").hide();
	})
})

//	促销广告
$(function () {
	$(".sales_promotion").mouseenter(function () {
		$(".red_underline").css("left", -2);
		$(".news_tab_content div").eq(0).show().siblings().hide();
	})
	$(".announcement").mouseenter(function () {
		$(".red_underline").css("left", 50);
		$(".news_tab_content div").eq(1).show().siblings().hide();
	})
})
	
//	排行榜
$(function () {
	var i = 0;
	$(".commodity_rt_ct_top > a").mouseenter(function () {
		i = $(this).index();
		$(".table_active").css("left", 76 * i);
		$(".commodity_rt_bt_item").eq(i).show().siblings().hide();
		
	})
})

//	右边侧边栏
$(function () {
	var i = 0;
	$(".right_sidebar_list1 .right_sidebar_item").hover(function () {
		i = $(this).index();
		console.log(i);
		$(".item_ico").css("background-color", "#7a6e6e").eq(i).css("background-color", "#c81623");
		$(".item_text").eq(i).css({"left": -60, "background-color": "#c81623"});
	}, function () {
		$(".item_ico").css("background-color", "#7a6e6e");
		$(".item_text").css({"left": 35, "background-color": "#c81623"});
	})
	$(".right_sidebar_list2 .right_sidebar_item").hover(function () {
		i = $(this).index();
		console.log(i);
		$(".right_sidebar_list2 .item_ico").css("background-color", "#7a6e6e").eq(i).css("background-color", "#c81623");
		$(".right_sidebar_list2 .item_text").eq(i).css({"left": -60, "background-color": "#c81623"});
	}, function () {
		$(".right_sidebar_list2 .item_ico").css("background-color", "#7a6e6e");
		$(".right_sidebar_list2 .item_text").css({"left": 35, "background-color": "#c81623"});
	})
	$(".right_sidebar_item7").click(function () {
		$("body, html").scrollTop(0);
	})
})

//	二维码
$(function () {
	show($(".fifth_left_ct .qr_code_ico"), $(".fifth_left_ct .qr_code_pop"));
	show($(".fifth_right_ct .qr_code_ico"), $(".fifth_right_ct .qr_code_pop"));
	show($(".sixth_left_ct .qr_code_ico"), $(".sixth_left_ct .qr_code_pop"));
	show($(".sixth_right_ct .qr_code_ico"), $(".sixth_right_ct .qr_code_pop"));
	show($(".pt_computer .qr_code_ico"), $(".pt_computer .qr_code_pop"));
	function show (a, b) {
		a.hover(function () {
			b.show();
		}, function () {
			b.hide();
		})
	}
})
