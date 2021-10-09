import { useEffect, useState } from "react"

export default function Test() {
  const [aMapApiLoaded, setAMapApiLoaded] = useState(false)

  useEffect(() => {
    if (document.getElementById('AMap-script')) {
      setAMapApiLoaded(true)
      return
    }
    let script = document.createElement('script')
    script.src = 'https://webapi.amap.com/maps?v=1.4.6&key=4f61b980c8dedfce2e287de13f09cee0'
    script.id = "AMap-script"
    script.async = true
    document.getElementsByTagName('body')[0].appendChild(script)
    script.onload = () => {
      setAMapApiLoaded(true)
    }
  }, [])

  useEffect(() => {
    const AMap = window.AMap
    if (AMap) {
      // console.log(AMap)
      //创建地图
      let map = new AMap.Map('mapContainer', {
        zoom: 10,
        lang: 'ch',
        center: [103.970365, 30.679157],
      })

      //窗体插件
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'], function () {
        //缩放、定位、平移窗体
        map.addControl(new AMap.ToolBar())
        //比例尺窗体
        map.addControl(new AMap.Scale())
        //缩略图窗体
        // map.addControl(new AMap.OverView({isOpen:true}))
      })

      //标记窗体
      let marker = new AMap.Marker({
        position: [103.970365, 30.679157]
      })
      marker.setMap(map)

      //设置最大缩放
      // map.setFitView()

      //圆圈窗体
      // let circle = new AMap.Circle({
      //   center: [117.770236, 35.918489],
      //   radius: 5000,
      //   fillOpacity: 0.1,
      //   strokeWeight: 1,
      // })
      // circle.setMap(map)

      //标题内容信息窗体
      let info = new AMap.InfoWindow({
        content: "中坝站",
        offset: new AMap.Pixel(0, -28)
      })
      info.open(map, marker.getPosition())
    }
  }, [aMapApiLoaded])

  return (
    <>
      <div id="mapContainer" style={{
        width: 600,
        height: 600
      }}></div>
    </>
  )
}