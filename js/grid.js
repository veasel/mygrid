// 简单的表格生成插件，只为了展示数据而已
// 2015年5月18日 12:00更新


// $("div").grid(options);
// options={

// 		thead:[{name: "姓名",    //name 为表头对应的名称
// 				key:"CPatientName", //key为data数据中的对应的属性名
// 				visible: true  //内容是否可见，默认true为可见
//				width: 30     //宽度为数字，不设置为默认
//            }]	,
// 		data: arr, //数据源
// 		serialnum:true, //是否显示序列号，默认为true显示
// }


;(function($){

	var Grid=function(ele,settings){
		this.ele=ele;
		this._options={
			thead:[],
			serialnum:true,
			data:null
		};
		this.options=$.extend({},this._options,settings);
	}



	Grid.prototype={

		renderHead:function(){
			var self=this;
			var html="<table class=mygrid><thead><tr><th></th>";	
			var data=self.options.thead;
			$.each(data,function(i,ele){
				html+="<th "+self.headStyle(ele)+">"+ele.name+"</th>";
			})
			return html+"</tr></thead>";
		},

		renderBody:function(options){ //加载tbody数据
			var html='';
			var thead=options.thead;
			$.each(options.data,function(i,ele){
				html=html+"<tr><td>"+(i+1)+"</td>";				
				for(var k=0;k<thead.length;k++){
					var td=thead[k];
					html=html+ "<td >"+ele[td.key]+"</td>";	
				}
				html=html+"</tr>"
			})
			return html+"</tbody></table>";
		},
		serial:function(){//是否产生序列号
			var self=this;
			var serialnum=this.options.serialnum;
			if(!serialnum){
				self.ele.find("tr").each(function(){
					$(this).children().eq(0).hide();
				})
			}
		},
		headStyle:function(ele){   //加载头部样式
			var eStyle="";

			if(ele.width){
				eStyle+=+"width:"+ele.width+";";
			}
			return eStyle? "style="+eStyle: "";
		},
		visible:function(){  //tbody 里td是否可见
			var self=this;
			var datas=self.options.thead;
			for(var i=0;i<datas.length;i++){
				var td=datas[i];
				if(!td.visible){ //如果false,默认为true
					self.ele.find("tr").each(function(){
						$(this).children().eq(i+1).hide();
					})
				}
			}		
			self.serial();
		},
		
		init:function(){
			var self=this;
			var html;
			var options=self.options;
			html=self.renderHead()+self.renderBody(options);
			self.ele.append(html);
			self.visible();
		}	
	}
	


	$.fn.grid=function(options){
		var mygrid=new Grid(this,options);	
		return  mygrid.init();
	}



})(jQuery)