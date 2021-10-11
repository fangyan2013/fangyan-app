

var list_quote=[]
var dict_quote={}
var list_data={}

//变量块
var parameter = localStorage.getItem('list_data');//节点出参保存

if (parameter != 'None'){//回显变量
	var list_data = JSON.parse(parameter)
	for (var l_key in list_data){
        html_str=''
		html_str+='	<div class="tab_but" style="position:relative;"> '
		html_str+='		<div class="tab_but_div data_updata" id="'+l_key+'">'
		html_str+='			<font style="line-height: 0px;margin-left:17px;">'+l_key+'</font>'
		html_str+='		</div> '
		html_str+='		<i id="data_copy" data-key="'+l_key+'" data-value="'+list_data[l_key]+'" class="layui-icon layui-icon-list data_copy" style="font-size: 16px; color: #000000;cursor:pointer;"></i>'
				
		html_str+='		<i id="data_del" data-key="'+l_key+'" data-value="'+list_data[l_key]+'"  class="layui-icon layui-icon-close" style="font-size: 3px; color: #1E9FFF;cursor:pointer;position:absolute;top:-5px;left:3px;"></i>'
		html_str+='	</div>'
		

        $("#tab_data").append(html_str);
	}
	
}

$( "#add_data" ).click(function(e){
		//添加变量
		console.log('123123123123123123')
		console.log($("textarea[name='data_value']").val(),$("input[name='data_key']").val(),'变量添加')

		var data_key = $("input[name='data_key']").val()
		var data_value = $("textarea[name='data_value']").val()
	
		if (list_data.hasOwnProperty(data_key)){
			$("#"+data_key).parent().remove()
		}
		//判断是否存在重名的重名的编辑
	
	
        html_str=''
		html_str+='	<div class="tab_but" style="position:relative;"> '
		html_str+='		<div class="tab_but_div data_updata" id="'+data_key+'">'
		html_str+='			<font style="line-height: 0px;margin-left:17px;">'+data_key+'</font>'
		html_str+='		</div> '
		html_str+='		<i id="data_copy" data-key="'+data_key+'" data-value="'+data_value+'" class="layui-icon layui-icon-list" style="font-size: 16px; color: #000000;cursor:pointer;"></i>'
				
		html_str+='		<i id="data_del" data-key="'+data_key+'" data-value="'+data_value+'"  class="layui-icon layui-icon-close" style="font-size: 3px; color: #1E9FFF;cursor:pointer;position:absolute;top:-5px;left:3px;"></i>'
		html_str+='	</div>'
		

        $("#tab_data").append(html_str);
		
		list_data[data_key]=data_value

})




$(document).on("click",'#data_del',function(){
    //删除变量
    list_data.splice($(this).parent().index(),1)
    console.log(list_data,$(this).parent().index())
    $(this).parent().remove()
});


$(document).on("click",'.data_updata',function(){
    //编辑变量

    $('.tab_but').css({"border":"1px solid #c9c9c9"});
	$(this).parent('div').css({"border":"1px solid #1E9FFF"});

	for (var data_index in list_data){
		if (data_index===$(this).children('font').text()){
			$("textarea[name='data_value']").val(list_data[data_index])
			$("input[name='data_key']").val(data_index)
		}
		
	}

});

var edit_id = localStorage.getItem("edit_id")
var Ginseng = localStorage.getItem("Ginseng")

console.log('手法拙劣',parameter,edit_id,Ginseng)


if (localStorage.getItem("Ginseng")!='None'){
	var Ginseng = JSON.parse(localStorage.getItem("Ginseng"))			

	var list_node = parent.list_node_obj(edit_id)//当前节点前的节点
	
	
	for (var list_node_index in list_node){
		console.log(list_node[list_node_index],'list_node_index',Ginseng)
		
		if (Ginseng.hasOwnProperty(list_node[list_node_index])){
			for (const Ginseng_i of Ginseng[list_node[list_node_index]]) {//回显前置节点出参
				console.log(Ginseng_i,'-------000000000---------')
				html_str=''
				html_str+='    <div  class="tab_but">'
				html_str+='        <div class="tab_but_div">'
				//html_str+='            <font class="tab_but_a">'+ Ginseng_i['title'] +'</font>'
				html_str+='            <font class="tab_but_a" style="pointer-events: none;">'+ Ginseng_i['title'] +'</font>'
				html_str+='        </div>'
				html_str+='        <i id="tab_copy" data-id="'+edit_id+'" data-title="'+ Ginseng_i['title'] +'" class="layui-icon layui-icon-list tab_copy" style="font-size: 16px; color: #000000;cursor:pointer;"></i>'
				html_str+='    </div>'
				$("#tab_2").append(html_str);
			}
		}
	}
}


$(".tab_copy").click(function(){
	//复制出参
	var id = $(this).data('id')
	var title = $(this).data('title')
	console.log(title,id)
	const input = document.createElement('input');
	input.setAttribute('readonly', 'readonly');
	input.setAttribute('value', "${"+title+"}");
	document.body.appendChild(input);
	input.select();
	if (document.execCommand('copy')) {
		document.execCommand('copy');
		layer.msg('复制成功');
	}
	document.body.removeChild(input);
});
	
	
$(".data_copy").click(function(){
	//复制变量名
	var key = $(this).data('key')
	var value = $(this).data('value')
	const input = document.createElement('input');
	input.setAttribute('readonly', 'readonly');
	input.setAttribute('value', "${__data("+key+")}");
	document.body.appendChild(input);
	input.select();
	if (document.execCommand('copy')) {
		document.execCommand('copy');
		layer.msg('复制成功');
	}
	document.body.removeChild(input);
});
	
	

$(document).on("click",'.tab_value',function(){//切换filex跟text
    $(this).next().show();
    $(document).on("click",'.F_T>div',function(){
        $(this).parent().prev().children("div").children("font").text($(this).text())
        $(this).parent().hide();
        if ($(this).children('font').html()=='File'){//切换value输入框中的内容
            str_html="<input style='border:none;outline:medium;' type='file'>"
            $(this).parents('td').nextAll()[0].innerHTML= str_html;
        }else{
            str_html="<div class='tex' contenteditable placeholder='请输入文字'></div>"
            $(this).parents('td').nextAll()[0].innerHTML= str_html;
        }
    });
    $(document).mouseup(function(e){//空白处点击关闭弹窗
      var _con = $(".F_T>div");   // 设置目标区域
      if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
          $(".F_T").hide();  // 功能代码
      }
    });
});











layui.use(['form','element','layedit', 'laydate','code'], function(){
var element = layui.element;
var form = layui.form;
var layedit = layui.layedit;
var laydate = layui.laydate;
var layer = layui.layer;
var code = layui.code;
layui.code({
 title: 'Response',
 about: false,
});



$(document).on("click",'#site_add',function(){
 //添加出参
 $("#addGoodsForm")[0].reset();//清空表单
 layer.open({
     type: 1
    ,title: '节点出参'
    ,anim: 5
    ,content: $("#test")
    ,area: ['600px', '400px']
    ,maxmin: true
    ,shade: [0.8, '#393D49']
    ,btn: ['确定','取消']
    ,yes: function(index, layero){
        var data = form.val('example');
		var tab_var=$(".tab_but_a")
		for (var l in tab_var){			
			if (tab_var.eq(l).text()===data['title']){
				layer.msg('出参不能重名'); 
				return
            }
		}
		
		
		
        //alert(JSON.stringify(data));
        list_quote.push(data)
        html_str=''
        html_str+='    <div  class="tab_but">'
        html_str+='        <div class="tab_but_div">'
        html_str+='            <font class="tab_but_a">'+ data['title'] +'</font>'
        html_str+='        </div>'
        html_str+='        <i id="tab_del" class="layui-icon layui-icon-close" style="font-size: 3px; color: #1E9FFF;cursor:pointer;"></i>'
        html_str+='    </div>'
        $("#tab_1").append(html_str);
        layer.closeAll();
    }
     ,btn2: function(index, layero){
          layer.closeAll();
        //按钮【按钮二】的回调

        //return false 开启该代码可禁止点击该按钮关闭
      }
  });
});


$(document).on("click",'.tab_but_a',function(e){
 //编辑出参
 var title = $(this).text()
 $("#addGoodsForm")[0].reset();//清空表单
 layer.open({
     type: 1
    ,title: '节点出参'
    ,anim: 5
    ,content: $("#test")
    ,area: ['600px', '400px']
    ,maxmin: true
    ,shade: [0.8, '#393D49']
    ,btn: ['确定','取消']
    ,success: function(layero, index){
        //回显
        for (const i of list_quote){
            console.log(i['title'],'xxxxxxxxxxxxxxxxxxx',title)
            if (i['title']==title){
                form.val('example',i);
            }
        }
    }
    ,yes: function(index, layero){
        var data = form.val('example');
        for (var i=0;i<list_quote.length;i++){
            if (list_quote[i]['title']==title){
                list_quote.splice(i,1,data)
                $('.tab_but_a')[i].innerHTML=data["title"]
            }
        }
        layer.closeAll();
    }
    ,btn2: function(index, layero){
        layer.closeAll();
        //按钮【按钮二】的回调

        //return false 开启该代码可禁止点击该按钮关闭
    }
  });
});



$(document).on("click",'#tab_del',function(){
    //删除全局变量
    list_quote.splice($(this).parent().index(),1)
    console.log(list_quote,$(this).parent().index())
    $(this).parent().remove()
});





});
