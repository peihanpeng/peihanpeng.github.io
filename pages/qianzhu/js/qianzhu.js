$(function () {
	var i = 0;
	var onoff1 = true,
		onoffHd = true;
	//头部导航条li数据容器
	var hdLiLt = 0;
//-----------------上下轮播页面---------------------
//	滚轮上下滚动页面
	$(document).on("mousewheel DOMMouseScroll", function (e) {
	    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
	                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
		if (onoff1 === true) {
			// 向上滚
			onoff1 = false;
		    if (delta > 0) {
		    	i--;
		    	if (i < 0) {
		    		i = 0;
		    	}
		        $(".contents").css("top", -i * parseInt($(".content").css("height")));
	    		changeColor();
		        setTimeout(function () {
		        	onoff1 = true;
		        }, 400);
	        // 向下滚
		    } else if (delta < 0) {
		    	i++;
		    	if (i >= $(".content").size()) {
		    		i = $(".content").size() - 1;
		    	}
		        $(".contents").css("top", -i * parseInt($(".content").css("height")));
	    		changeColor();
				setTimeout(function () {
		        	onoff1 = true;
		        }, 400);
		    }
		}
		console.log($("header li").eq(i))
		//向下滚动改变头部导航条
		changeH();
		
		//导航条上面绿色线宽度
		var iWidth = $("header .list_inline li").eq(i).width();
//		console.log($("header .list_inline li").eq(i).width());		
		//头部导航条上面横线定位
		getILeft();
	});
	
	//初始头部导航条“首页”字体变色
	$("header .list_inline li a").eq(0).css("color", "#00dfb9");
	
	//点击左下角按钮向下翻页
	$(".movedowm").on("click", function () {
		i = 1;
	    $(".contents").css("top", -i * parseInt($(".content").css("height")));
	    changeH();
	    changeColor();
	    getILeft();
	});
	
	//点击右边上下按钮上下翻滚
	$(".contents > .guide .up").on("click", function () {
		i--;
		if (i < 0) {
			i = 0;
		}
	    $(".contents").css("top", -i * parseInt($(".content").css("height")));
	    changeH();
	    changeColor();
	    getILeft();
	});
	$(".contents > .guide .down").on("click", function () {
		i++;
		if (i > 7) {
			i = 7;
		}
	    $(".contents").css("top", -i * parseInt($(".content").css("height")));
	    changeH();
	    changeColor();
	    getILeft();
	});
	
	//点击头部导航条跳转到对应页面
	$("header .list_inline li").on("click", function () {
		i = $(this).index();
	    $(".contents").css("top", -i * parseInt($(".content").css("height")));
	    //页面对应的字体变色
		changeColor();
	    changeH();
	    getILeft();
	});
	
	//移入移出头部导航条字体改变颜色
    $("header .list_inline li").hover(function () {
    	$("header .list_inline li a").eq($(this).index()).css("color", "#00dfb9");
    }, function () {
    	$("header .list_inline li a").css("color", "#ccc").eq(i).css("color", "#00dfb9");
    });
	
	//封装向下滚动改变导航条
		function changeH () {
			if (i >= 1) {
				$("header").addClass("fixed");
				$("header .cert").removeClass("active");
			}else {
				$("header").removeClass("fixed");
				$("header .cert").addClass("active");
			}
		}
   //封装改变页面对应字体颜色
    function changeColor () {
  	  $("header .list_inline li a").css("color", "#ccc").eq(i).css("color", "#00dfb9");
    }
    
    //封装头部导航条横线点位
	function getILeft () {
		if (onoffHd) {
			onoffHd = false;
			setTimeout(function () {
				if(i < 8) {
					hdLiLt = $("header li").eq(i).offset().left;
					console.log(hdLiLt);
					$("header .line").animate({left: hdLiLt}, 200, "linear");
				}
				onoffHd = true;			
			}, 210)
		}
	}
    
	
//-----------------左右轮播页面--------------------------------------------------
	
//	左右轮播页面新闻轮播
	var j = 0;
//	获取里的高度
	var $liHeight = $(".news_item li").height();
	setInterval(function () {
		j++;
		if (j >= $(".news_item li").size() - 1) {
			j = 0;
		}
		$(".news_item ul").animate({"top": -$liHeight * j}, 800)
//		console.log(j)
	}, 4000)
	
//	拖拽左右滚动页面
	var starX = 0,
		endX = 0,
		x = 0,
		ctX = 0,
		k = 1,
		timer = 0,
		//定义一个contentX_item的宽度
		ctItW = parseInt($(".contentX").width())/6;
	$(".contentX_item").css("width", ctItW);
	//contentX初始定位
	$(".contentX").css("left", -ctItW);
	$(".contentX").on("mousedown", function (ev) {
		clearInterval(timer);
		//按下一开始鼠标x坐标
		starX = ev.pageX;
		//contentX当前位置的水平定位
		ctX = parseInt($(".contentX").css("left"));
		$(".contentX").on("mousemove", function (ev) {
			//弹起时鼠标的x坐标
			endX = ev.pageX;
			//按下后鼠标移动的水平距离
			x = endX - starX;
			$(".contentX").css("left", ctX + x);
		});
	});
	$("body").on("mouseup", function () {
		$(".contentX").off("mousemove");
		//向右拖动
		if (x > 0) {
			if (x > ctItW/2) {
				k--;
				if (k == 0) {
					$(".contentX").animate({left: -k * ctItW}, "fast", "linear", function () {
						$(".contentX").css("left", -4 * ctItW);
					});
					k = 4;
				}else {
					
					$(".contentX").animate({left: -k * ctItW}, "fast", "linear");
				}
			}else {
				$(".contentX").animate({left: -k * ctItW}, "fast", "linear");
			}
		//向左拖动
		}else {
			if (x < -ctItW/2) {
				k++;
				if (k == 5) {
					$(".contentX").animate({left: -k * ctItW}, "fast", "linear", function () {
						$(".contentX").css("left", -1 * ctItW);
					});
					k = 1;
				}else {
					
					$(".contentX").animate({left: -k * ctItW}, "fast", "linear");
				}
			}else {
				$(".contentX").animate({left: -k * ctItW}, "fast", "linear");
			}
		}
		//页面对应的右下角导航条改变颜色
		$(".guide > div").eq(k - 1).addClass("active").siblings().removeClass("active");
//		roll();
	});
	
	//右下角导航条
	$(".guide > div").hover( function () {
		//关闭定时器
		clearInterval(timer);
		k = $(this).index() + 1;
		$(this).addClass("active").siblings().removeClass("active");
		$(".contentX").stop().animate({"left": -ctItW * k}, 300);
	}, function () {
		roll();
	})
	
	
	//封装自动轮播
	function roll () {
		timer = setInterval(function () {
			k++;
			if (k >= $(".contentX_item").size() - 1) {
				k = 1;
				$(".contentX").css("left", 0);
			}
			$(".contentX").animate({"left": -ctItW * k}, 300)
			console.log(k);
			//左下角导航条变色
			$(".guide > div").eq(k - 1).addClass("active").siblings().removeClass("active");
		}, 4000);
	}
	
	//右边导航条
	$(".guide .icon li").hover(function () {
		$(this).addClass("active").siblings().removeClass("active");
	}, function () {
		$(this).removeClass("active")
	});
	//点击打开/关闭导航条
	var onoff2 = true;
	$("a.switch").on("click", function () {
		if (onoff2 === true) {
			$("ul.icon").css("right", -70);
			$(this).addClass("off");
			onoff2 = false;
		}else {
			$("ul.icon").css("right", 0);
			$(this).removeClass("off");
			onoff2 = true;
		}
	})

	//左右自动轮播
	roll();
	
//-------------第四页移入移出改变样式---------------
	$(".content4 .items li").hover(function () {
		$(this).addClass("active").siblings().removeClass("active");
		$(".content4 .bg_one").show().css({
			"left": $(this).offset().left,
			"top": $(this).offset().top - $(".content4 .box").offset().top
		})
	}, function () {
		$(this).removeClass("active");
	})
	
//---------------第七页轮播--------------
	//自动轮播
	var a = 0;
	var timer7 = 0;
	//获取左边导航菜单li高度
	var ct7LiHeight = $(".content7 li").eq(0).height() + 2*10;
	//获取内容块宽度
	var ct7Width = $(".content7 .swiper_slide").eq(0).width();
	//自动轮播
	ct7Timer();
	//移入左边导航条跳转对应新闻
	$(".content7 .menu_item").hover(function () {
		clearInterval(timer7);
		a = $(this).index();
		$(".content7 .menu li").eq(a).addClass("active").siblings().removeClass("active");
		$(".content7 .menu .bg_one").css("top", a * ct7LiHeight);
		$(".content7 .swiper_wrapper").css({
			"transition": ".5s ease",
			"left": -(a + 1) * ct7Width
		});
	}, function () {
		ct7Timer();
	});
	
	//封装自动轮播函数。
	function ct7Timer () {
		timer7 = setInterval(function () {
			a++;
			if (a >= $(".content7 .swiper_slide").size() - 1) {
				a = 0;
				$(".content7 .swiper_wrapper").css({
					"transition": "none",
					"left": 0
				});
			}
			$(".content7 .menu li").eq(a).addClass("active").siblings().removeClass("active");
			$(".content7 .menu .bg_one").css("top", a * ct7LiHeight);
			setTimeout(function () {
				$(".content7 .swiper_wrapper").css({
					"transition": ".5s ease",
					"left": -(a + 1) * ct7Width
				});
			}, 80);
		}, 4000);
	
	}
});
