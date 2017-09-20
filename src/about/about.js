var HDRatio = Math.ceil(window.innerWidth / 1920);
new JParticles.particle('#particle', {
  lineShape: 'cube',
  maxR: 2.4 * HDRatio,
  minR: 0.6 * HDRatio,
  range: 2000 * HDRatio,
  proximity: 100 * HDRatio,
  maxSpeed: 1  * HDRatio,
  minSpeed: 0.1 * HDRatio,
  // 开启视差效果
  parallax: true
});


// 百度地图API功能
var map = new BMap.Map("map");
var point = new BMap.Point(114.0117, 22.6016);
map.centerAndZoom(point,15);
// map.enableScrollWheelZoom(true);

var marker = new BMap.Marker(point);  // 创建标注
map.addOverlay(marker);               // 将标注添加到地图中

var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
/*缩放控件type有四种类型:
BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
map.addControl(top_left_control);
map.addControl(top_left_navigation);

var sContent = '<p style="padding: 5px 10px;">Yo!Point~</p>';
var infoWindow = new BMapLib.SearchInfoWindow(map, sContent, {
  title: "深圳友朋智能商业科技有限公司", //标题
  panel : "panel", //检索结果面板
  enableAutoPan : true, //自动平移
  searchTypes :[
    BMAPLIB_TAB_SEARCH,   //周边检索
    BMAPLIB_TAB_TO_HERE,  //到这里去
    BMAPLIB_TAB_FROM_HERE //从这里出发
  ]
});
infoWindow.open(point);
marker.onclick = function(e) {
  infoWindow.open(point);
}
