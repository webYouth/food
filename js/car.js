$(function(){
	localStorage.setItem("1",1)
	localStorage.setItem("2",2)
	var local = window.localStorage;
	var arr =[];
	for(var i=0;i<local.length;i++){
		var numId = localStorage.key(i);
		if(!isNaN(numId)){
			arr.push(numId)
		}
	}
	$.ajax({
		url:"json/goods.json",
		success:function(mag){
			var str = "";
			for(var i in mag){
				var data = mag.data;
				
				for(var i=0;i<arr.length;i++){
					for(var j=0;j<data.length;j++){
						if(arr[i]==data[j].id){
							str += '<dl class="stores"><span class="select goodsele">&radic;</span>'
							str += '<dt><img src="img/'+data[j].img+'"/></dt><dd><span class="good_title">'+data[j].title+'</span></dd><dd class="prices">￥<span id="price">'+data[j].prices+'</span><p class="pp">￥<span class="old">'+data[j].oldpri+'</span></p></dd>'
							str +='<dd class="teast">口味：苹果味</dd><dd class="number"><span  class="decrease"></span><input type="number"value="1" class="nums"/><span  class="crease"></span></dd></dl>'
						}
					}
				}
				$(".wrapper").append(str)
			}
			$('.goodsele').click(function(){
				$(this).toggleClass("select_red")
			})
		}
		
	});
	$('.select').click(function(){
		if($(".goodsele")[class="select_red"]){
			
		}
		$('.select').toggleClass("select_red")
	})
	/*数量加*/
	$(".wrapper").on("click",".crease",function(){
		var nums = $('.nums').val();
//		console.log(nums)
		nums++;
		$('.nums').val(nums);
		$('.tip').css('display','none')
		
//		localStorage.number = nums;
		
	})
	/*数量减*/
	$(".wrapper").on("click",".decrease",function(){
		var nums = $('.nums').val();
//		console.log(nums)
		nums--;
		if(nums<1){
			nums = 1;
			$('.tip').css('display','block')
			setTimeout(function(){
				$('.tip').css('display','none')
			},2000)
		}
		$('.nums').val(nums)
//		localStorage.number = nums;
		
	})
	var l = $('.stores').size();
	console.log(l)
})
