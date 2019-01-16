/**
 * 静态数据
 */
var StatusData = {
	/**
	* 文化程度集合
	* 数据格式{v:'编号',n:'名称'}
	*/
	Culturallv: [
		{v:'03'	,n:'博士'},
		{v:'04'	,n:'硕士'},
		{v:'10'	,n:'研究生'},
		{v:'20'	,n:'本科'},
		{v:'30'	,n:'大专'},
		{v:'40'	,n:'中专'},
		{v:'50'	,n:'技工学校'},
		{v:'60'	,n:'高中'},
		{v:'70'	,n:'初中'},
		{v:'80'	,n:'小学'}
	],
	/**
	* 民族对象集合
	* 格式：{v:'代号',n:'名称'}
	*/
	Nationality:[
		{v:-1	,n:'全部'},
		{v:1	,n:'汉族'},
		{v:2	,n:'蒙古族'},
		{v:3	,n:'回族'},
		{v:4	,n:'藏族'},
		{v:5	,n:'维吾尔族'},
		{v:6	,n:'苗族'},
		{v:7	,n:'彝族'},
		{v:8	,n:'壮族'},
		{v:9	,n:'布依族'},
		{v:10	,n:'朝鲜族'},
		{v:11	,n:'满族'},
		{v:12	,n:'侗族'},
		{v:13	,n:'瑶族'},
		{v:14	,n:'白族'},
		{v:15	,n:'土家族'},
		{v:16	,n:'哈尼族'},
		{v:17	,n:'哈萨克族'},
		{v:18	,n:'傣族'},
		{v:19	,n:'黎族'},
		{v:20	,n:'僳僳族'},
		{v:21	,n:'佤族'},
		{v:22	,n:'畲族'},
		{v:23	,n:'高山族'},
		{v:24	,n:'拉祜族'},
		{v:25	,n:'水族'},
		{v:26	,n:'东乡族'},
		{v:27	,n:'纳西族'},
		{v:28	,n:'景颇族'},
		{v:29	,n:'柯尔克孜族'},
		{v:30	,n:'土族'},
		{v:31	,n:'达斡尔族'},
		{v:32	,n:'仫佬族'},
		{v:33	,n:'羌族'},
		{v:34	,n:'布朗族'},
		{v:35	,n:'撒拉族'},
		{v:36	,n:'毛南族'},
		{v:37	,n:'仡佬族'},
		{v:38	,n:'锡伯族'},
		{v:39	,n:'阿昌族'},
		{v:40	,n:'普米族'},
		{v:41	,n:'塔吉克族'},
		{v:42	,n:'怒族'},
		{v:43	,n:'乌孜别克族'},
		{v:44	,n:'俄罗斯族'},
		{v:45	,n:'鄂温克族'},
		{v:46	,n:'德昂族'},
		{v:47	,n:'保安族'},
		{v:48	,n:'裕固族'},
		{v:49	,n:'京族'},
		{v:50	,n:'塔塔尔族'},
		{v:51	,n:'独龙族'},
		{v:52	,n:'鄂伦春族'},
		{v:53	,n:'赫哲族'},
		{v:54	,n:'门巴族'},
		{v:55	,n:'珞巴族'},
		{v:56	,n:'基诺族'},
		{v:57	,n:'其他'},
		{v:58	,n:'外国血统'}
	],
	/**
	* 宗教信仰集合
	* 数据格式{v:'编号',n:'名称'}
	*/
	Religiousbl: [
		{v:'00'	,n:'无宗教信仰'},
		{v:'10'	,n:'佛教'},
		{v:'20'	,n:'喇嘛教'},
		{v:'30'	,n:'道教'},
		{v:'40'	,n:'天主教'},
		{v:'50'	,n:'基督教'},
		{v:'60'	,n:'东正教'},
		{v:'70'	,n:'伊斯兰教'},
		{v:'99'	,n:'其他'}
	],
	/**
	* 籍贯对象集合
	* 格式{v:'编号',n:'名称',s:'简称',pc:'省会'}
	*/
	Nativeplace: [
		{v:'11'	,n:'北京'			,s:'京'		,pc:'北京'},
		{v:'12'	,n:'天津'			,s:'津'		,pc:'天津'},
		{v:'13'	,n:'河北省'			,s:'冀'		,pc:'石家庄'},
		{v:'14'	,n:'山西省'			,s:'晋'		,pc:'太原'},
		{v:'15'	,n:'内蒙古自治区'		,s:'内蒙古'	,pc:'呼和浩特'},
		{v:'21'	,n:'辽宁省'			,s:'辽'		,pc:'沈阳'},
		{v:'22'	,n:'吉林省'			,s:'吉'		,pc:'长春'},
		{v:'23'	,n:'黑龙江省'			,s:'黑'		,pc:'哈尔滨'},
		{v:'31'	,n:'上海'			,s:'沪'		,pc:'上海'},
		{v:'32'	,n:'江苏省'			,s:'苏'		,pc:'南京'},
		{v:'33'	,n:'浙江省'			,s:'浙'		,pc:'杭州'},
		{v:'34'	,n:'安徽省'			,s:'皖'		,pc:'合肥'},
		{v:'35'	,n:'福建省'			,s:'闽'		,pc:'福州'},
		{v:'36'	,n:'江西省'			,s:'赣'		,pc:'南昌'},
		{v:'37'	,n:'山东省'			,s:'鲁'		,pc:'济南'},
		{v:'41'	,n:'河南省'			,s:'豫'		,pc:'郑州'},
		{v:'42'	,n:'湖北省'			,s:'鄂'		,pc:'武汉'},
		{v:'43'	,n:'湖南省'			,s:'湘'		,pc:'长沙'},
		{v:'44'	,n:'广东省'			,s:'粤'		,pc:'广州'},
		{v:'45'	,n:'广西壮族自治区'	,s:'桂'		,pc:'南宁'},
		{v:'46'	,n:'海南省'			,s:'琼'		,pc:'海口'},
		{v:'50'	,n:'重庆'			,s:'渝'		,pc:'重庆'},
		{v:'51'	,n:'四川省'			,s:'川/蜀'	,pc:'成都'},
		{v:'52'	,n:'贵州省'			,s:'贵/黔'	,pc:'贵阳'},
		{v:'53'	,n:'云南省'			,s:'云/滇'	,pc:'昆明'},
		{v:'54'	,n:'西藏自治区'		,s:'藏'		,pc:'拉萨'},
		{v:'61'	,n:'陕西省'			,s:'陕/秦'	,pc:'西安'},
		{v:'62'	,n:'甘肃省'			,s:'甘/陇'	,pc:'兰州'},
		{v:'63'	,n:'青海省'			,s:'青'		,pc:'西宁'},
		{v:'64'	,n:'宁夏回族自治区'	,s:'宁'		,pc:'银川'},
		{v:'65'	,n:'新疆维吾尔族自治区'	,s:'新'		,pc:'乌鲁木齐'},
		{v:'71'	,n:'台湾省'			,s:'台'		,pc:'台北'},
		{v:'81'	,n:'香港特别行政区'	,s:'港'		,pc:'香港'},
		{v:'82'	,n:'澳门特别行政区'	,s:'澳'		,pc:'澳门'},
		{v:'91'	,n:'国外'			,s:'外'		,pc:'-'}
	]
};