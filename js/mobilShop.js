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