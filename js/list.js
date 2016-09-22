$(function(){
	var myScroll;
	ajaxs()
	iscr()
	$.ajax({
		url:"list.json",
		success:function(data){
			var mag = data.data
			var str =""
			for(var i in mag){ 
				str += '<li>'+mag[i].name+'</li>'
			}
			$("#list .li").append(str);
			$(".lis").append(str);
		}
	})
	
	
	function ajaxs(){
		$.ajax({
		url:"goods.json",
		success:function(data){
			var mag = data.data;
//			console.log(1);
//			console.log(data);
//			var str = ""
//			for(var i in mag){
//				str += '<dl>'
//				str += '<dt><img src="img/'+mag[i].img+'"/></dt>'
//				str += '<dd>'+mag[i].title+'</dd>'
//				str += '<dd>'
//				str += 	'<p>￥'+mag[i].prices+'<span>￥'+mag[i].oldpri+'</span></p>'
//				str += 	'<div class="car">'
//				str += 		'<img src="img/bycar.gif"/>'
//				str += '</div>'
//				str += '</dd>'
//			    str += '</dl>'
//			}
			$.each(mag, function(index) {
				var odl = $("<dl></dl>");
				var odt = $("<dt dataid='"+mag[index].id+"'>图片加载</dt>")
				var pic = $("<img src='img/"+mag[index].img+"'/>")
				var odd = $('<dd>'+mag[index].title+'</dd>')
				var odd1 =
				$('<dd><p>￥'+mag[index].prices+'<span>￥'+mag[index].oldpri+'</span></p><div dataid = "'+mag[index].id+'" class="car"><img src="img/bycar.gif"/></div></dd>')
				
				odl.append(odt)
				odl.append(odd)
				odl.append(odd1)
				pic.on("load",function(){
						sx()
						odt.html(pic)
				})
				$("#box").append(odl);
			
			});
			
		}
	})
	}
//localstage
		$("#box").on("click","dt",function(){
			var dataid = $(this).attr("dataid");
			localStorage.setItem('dataid',dataid)
			window.location.href = "detail.html"
		})

//加入购物车的数量
		var numb = localStorage.getItem("num")
		$(".num").html(numb);
		$("#box").on("click",".car",function(){
		var dataid = $(this).attr("dataid");
			localStorage.setItem(dataid,dataid)
			
		if(localStorage.getItem("num")){
			var num = parseInt(localStorage.getItem('num')) + 1; 
			localStorage.setItem('num',num)
		}else{
			localStorage.setItem('num',1)
		}
			var numb = localStorage.getItem("num")
			$(".num").html(numb);
		})
		

//加载滑动
	function updatePosition(){
		if(this.y<-300){
			console.log(myScroll.y)
			$("#up").show();
		}else{
			$("#up").hide();
		}
		
	}
//	$("#up").click(function(){
//		
//	})
	function iscr(){
		myScroll = new IScroll("#cov",{ mouseWheel: true, click: true})
		myScroll.on('scroll', updatePosition);
		myScroll.on('scrollEnd', updatePosition);
		$("#aaaa").on("touchstart",function(){
			myScroll.scrollToElement(document.querySelector('.boom'))
		})
	}
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
     
     
    $("#cov").on("touchmove",function(){
    	if(myScroll.y > 50){
    		$("#cov .boom").show()
    	}
    })
    
   $("#cov").on("touchend",function(){
// console.log(myScroll.y+":"+myScroll.maxScrollY)
   		if(myScroll.y > 0){
    		sx()
    		$("#cov .boom").hide()
    	}
   		if(myScroll.y < myScroll.maxScrollY - 50){
   			ajaxs()
   		}
   })  
    function sx(){
		myScroll.refresh()
	}

	
	
	
//list 当前li颜色	
	$(".li").on("click","li",function(){
		var index = $(this).index();
		$(this).css({"border-bottom":"0.15rem solid red","color":"#ff9ca0"}).siblings().css({"border":"0","color":"#666"})
		$(".lis li").eq(index).css({"background":"#ffa3a6","color":"#fff"}).siblings().css({"background":"#eee","color":"#666"})
	})
	
	$(".lis").on("click","li",function(){
		var index = $(this).index();
		$(this).css({"background":"#ffa3a6","color":"#fff"}).siblings().css({"background":"#eee","color":"#666"})
		$(".li li").eq(index).css({"border-bottom":"0.15rem solid red","color":"#ff9ca0"}).siblings().css({"border":"0","color":"#666"})
	})
	
	
	$(".down").click(function(){
		$(".lis").toggle();
	})

//加载。。。
		
		var time = setInterval(jsq,800)
		
		function jsq(){
			clearInterval(time)
			var time1 = setInterval(function(){
				clearInterval(time1);
				$(".boom p").html("玩命加载中•")
			},400)
			var time2 = setInterval(function(){
				clearInterval(time2);
				$(".boom p").html("玩命加载中••••")
			},800)
			time = setInterval(jsq,800)
		}

//list旋转
	$("#list .down").click(function(){
		if($(".don").length > 0){
			$(this).removeClass("don")
			$(this).addClass("dong")
		}else{
			$(this).addClass("don")
			$(this).removeClass("dong")
		}
	})


})
