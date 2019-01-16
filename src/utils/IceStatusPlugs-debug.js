/**
 * Ext的静态数据组件
 * 依托js
 * basedata/citydata.js和basedata/statusData.js
 * @author icesongs
 * @param renderTo 父容器
 */
function IcePCC(renderTo){
	this.rt = document.getElementById(renderTo);
	var table = document.createElement('TABLE');
	table.cellPadding = '0';
	table.cellSpacing = '0';
	var tbody = document.createElement('TBODY');
	var tr = document.createElement('TR');
	var td1 = document.createElement('TD');
	tr.appendChild(td1);
	var td2 = document.createElement('TD');
	tr.appendChild(td2);
	var td3 = document.createElement('TD');
	tr.appendChild(td3);
	tbody.appendChild(tr);
	table.appendChild(tbody);
	this.room = {province:td1,city:td2,county:td3};
	this.rt.appendChild(table);
	this.plugs = {};
}
/**
 * 创建省市区、县主键
 */
IcePCC.prototype.init = function(){
	var me = this;
	//数据格式
	var acodefields = ['v','n','c'];
	//省数据
	var provincestore = new Ext.data.JsonStore({
		data:[{n:'全部',v:-1}],
		sortInfo:{field:'v',direction:'ASC'},
		fields:acodefields
	});
	provincestore.loadData(citydata,true);
	//市数据
	var citystore = new Ext.data.JsonStore({
		data:[],
		sortInfo:{field:'v',direction:'ASC'},
		fields:acodefields
	});
	//区县数据
	var countystore = new Ext.data.JsonStore({
		data:[],
		sortInfo:{field:'v',direction:'ASC'},
		fields:acodefields
	});
	
	//省
   	var provincecb = new Ext.form.ComboBox({
   		renderTo:this.room.province,
		triggerAction:"all",
	   	lazyRender:true,
	   	store: provincestore,
		displayField:"n",
		valueField:"v",
		mode:"local",
		width:80,
		id:"pro"+new Date().getTime(),
		listeners:{
		select:function(combo,record,index){
			me.plugs['city'].clearValue();
			if(combo.getValue() != -1){
				citystore.loadData([{n:'全部',v:-1}]);
			}else{
				this.setValue('');
				citystore.loadData([]);
			}
			citystore.loadData(record.data.c,true);
			citystore.sort('v','ASC');
			me.plugs['county'].clearValue();
			countystore.loadData([]);
		}
		},
		emptyText:"请选择省"
	});
	this.plugs['province'] = provincecb;
	//市
	var citycb = new Ext.form.ComboBox({
		renderTo:this.room.city,
		triggerAction:"all",
		store:citystore,
		displayField:"n",
		valueField:"v",
		mode:"local",
		id:"city"+new Date().getTime(),
		width:100,
		listeners:{
			select:function(combo,record,index){
				me.plugs['county'].clearValue();
				if(combo.getValue() != -1){
					countystore.loadData([{n:'全部',v:-1}]);
				}else{
					this.setValue('');
					countystore.loadData([]);
				}
				countystore.loadData(record.data.c,true);
				countystore.sort('v','ASC');
			}
		},
		emptyText:"请选择市"
	});
	this.plugs['city'] = citycb;
	//区县
	var countycb = new Ext.form.ComboBox({
		renderTo:this.room.county,
		triggerAction:"all",
		store:countystore,
		displayField:"n",
		valueField:"v",
		mode:"local",
		id:"county"+new Date().getTime(),
		width:100,
		emptyText:"请选择区/县",
		listeners:{
			select:function(combo,record,index){
				if(combo.getValue() == -1){
					this.setValue('');
				}
			}
		}
	});
	this.plugs['county'] = countycb;
	return this.plugs;
};
/**
 * 设置省市县的值到
 * @return {province:'省',city:'市',county:'区、县'}
 */
IcePCC.prototype.getValues = function(){
	var res = {province:'-1',city:'-1',county:'-1'};
	var val = this.plugs['province'].getValue();
	if(val != ''){
		res.province = val;
	}
	val = this.plugs['city'].getValue();
	if(val != ''){
		res.city = val;
	}
	val = this.plugs['county'].getValue();
	if(val != ''){
		res.county = val;
	}
	return res;
};
/**
 * 学历组件
 * 依托js
 * basedata/statusData.js
 * @param renderTo父容器
 */
function IceCulturallv(renderTo){
	this.rt = document.getElementById(renderTo);
	this.plugs = null;
}
/**
 * 实例化学历组件
 * @param def 默认值
 */
IceCulturallv.prototype.init = function(def){
	this.plugs = new Ext.form.ComboBox({
		renderTo:this.rt,
		triggerAction:'all',
		id:"cul"+new Date().getTime(),
		lazyRender:true,
		store: new Ext.data.JsonStore({
			data:StatusData['Culturallv'],
			sortInfo:{field:'v',direction:'ASC'},
			fields:['v','n']
		}),
		displayField:'n',
		valueField:'v',
		mode:'local',
		emptyText:'请选择学历'
	});
	if(typeof(def) != 'undefined'){
		this.plugs.setValue(def);
	}
	return this.plugs;
};
/**
 * 宗教信仰组件
 * 依托js
 * basedata/statusData.js
 * @param renderTo 
 */
function IceReligiousbl(renderTo){
	this.rt = document.getElementById(renderTo);
	this.plugs = null;
}
/**
 * 实例化宗教信仰组件
 * @param def 默认值
 */
IceReligiousbl.prototype.init = function(def){
	this.plugs = new Ext.form.ComboBox({
		renderTo:this.rt,
		triggerAction:'all',
		id:"rel"+new Date().getTime(),
		lazyRender:true,
		store: new Ext.data.JsonStore({
			data:StatusData['Religiousbl'],
			sortInfo:{field:'v',direction:'ASC'},
			fields:['v','n']
		}),
		displayField:'n',
		valueField:'v',
		mode:'local',
		emptyText:'请选择宗教信仰'
	});
	if(typeof(def) != 'undefined'){
		this.plugs.setValue(def);
	}
	return this.plugs;
};
/**
 * 民族组件
 * 依托js
 * basedata/statusData.js
 * @param renderTo父容器
 */
function IceNationality(renderTo){
	this.rt = document.getElementById(renderTo);
	this.plugs = null;
}
/**
 * 实例化民族组件
 * @param def 默认值 01为汉族
 */
IceNationality.prototype.init = function(def){
	this.plugs = new Ext.form.ComboBox({
		renderTo:this.rt,
		triggerAction:'all',
		lazyRender:true,
		id:"nat"+new Date().getTime(),
		store: new Ext.data.JsonStore({
			data:StatusData['Nationality'],
			sortInfo:{field:'v',direction:'ASC'},
			fields:['v','n']
		}),
		displayField:'n',
		valueField:'v',
		mode:'local',
		emptyText:'请选择民族'
	});
	if(typeof(def) != 'undefined'){
		this.plugs.setValue(def);
	}
	return this.plugs;
};
/**
 * 获取民族值
 */
IceNationality.prototype.getValue = function(){
	if(this.plugs.getValue() == ''){
		return -1;	
	}else{
		return this.plugs.getValue();
	}
};
/**
 * 籍贯组件
 * 依托js
 * basedata/statusData.js
 * @param renderTo父容器
 */
function IceNativeplace(renderTo){
	this.rt = document.getElementById(renderTo);
	this.plugs = null;
}
/**
 * 实例化籍贯组件
 * @param def 默认值
 */
IceNativeplace.prototype.init = function(def){
	this.plugs = new Ext.form.ComboBox({
		renderTo:this.rt,
		triggerAction:'all',
		lazyRender:true,
		id:"natp"+new Date().getTime(),
		store:new Ext.data.JsonStore({
			data:StatusData['Nativeplace'],
			sortInfo:{field:'v',direction:'ASC'},
			fields:['v','n']
	    }),
	    displayField:'n',
	    valueField:'v',
	    mode:"local",
	    emptyText:'请选择籍贯'
	});
	if(typeof(def) != 'undefined'){
		this.plugs.setValue(def);
	}
	return this.plugs;
};