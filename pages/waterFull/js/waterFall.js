$(function () {
	//定义数组装图片名字
	var imgs = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"];
	//定义图片引用地址前缀
	var base = "img/";
	var baseElem = $("<div class='box'></div>").append("<img>");
	//定义一个空数组
	var boxData = [];
	//瀑布流布局  
	function waterFall () {
		var $box = $("div.box");
		//获取class为box的div的宽度+外边距(固定宽度，随便获取一个)
		var boxWidth = $box.eq(0).width() + 20;
		var miniHeight = 0;
		var minIndex = null;
		$box.each(function (index, elem) {
			if (index < 3) {
				boxData[index] = $box.eq(index).height() + 10;
				$(elem).css({
					"top": 0,
					"left": index * boxWidth
				});
			}else {
				//数组最小高度
				minHeight = Math.min.apply(null, boxData);
				//数组最小高度的索引
				minIndex = $.inArray(minHeight, boxData);
				$(elem).css({
					"top": minHeight + 10,
					"left": parseInt($box.eq(minIndex).css("left"))
				});
			}
			boxData[minIndex] += $(elem).height() + 20;
		});
	}
	//添加box函数
	function getBox () 	{
		for (var i=0; i<imgs.length; i++) {
			baseElem.clone().hide().children("img").attr("src", base + imgs[i]).on("load", function () {
				waterFall();
				$(this).parent().fadeIn(500);
			}).end().appendTo("#container");
		}
	}
	//绑定滚轮事件，判断滚动位置添加box
	$(window).on("load", function () {
		getBox();
		$(document).on("mousewheel DOMMouseScroll", function () {
			//$(document).scrollTop():滚动条的高度
			//$(window).height():浏览器窗口的高度
			//$(document).height():document的高度
			if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
				getBox();
			
			}
		});
	});
});
