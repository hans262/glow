import { useEffect, useRef, useState } from "react"
import { Switch } from 'antd'

export default function Test() {
  const [state, setState] = useState({
    traffic: true //路况
  })

  const onSwitchChange = (value: keyof typeof state, checked: boolean) => {
    setState(e => ({ ...e, [value]: checked }))
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <span>
          <Switch
            checked={state.traffic}
            onChange={v => onSwitchChange('traffic', v)}
          />路况
        </span>
      </div>
      <AMapCore
        width={600}
        height={500}
        traffic={state.traffic}
        plugin={{ ToolBar: true }}
      />
    </div>
  )
}

export const AMapCore: React.FC<{
  version?: string
  key?: string
  width?: string | number
  height?: string | number
  traffic?: boolean //路况
  plugin?: {
    ToolBar?: boolean
  }
}> = (props) => {
  const {
    version = '1.4.15', key = '4f61b980c8dedfce2e287de13f09cee0',
    width = '100%', height = '100%', traffic = false, plugin
  } = props

  const [aMapApiLoaded, setAMapApiLoaded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>() //地图ref
  const trafficLayerRef = useRef<any>() //路况图层ref

  useEffect(() => {
    if (document.getElementById('AMap-script')) {
      setAMapApiLoaded(true)
      return
    }
    const script = document.createElement('script')
    script.src = `https://webapi.amap.com/maps?v=${version}&key=${key}`
    script.id = "AMap-script"
    script.async = true
    document.getElementsByTagName('body')[0].appendChild(script)
    script.onload = () => {
      setAMapApiLoaded(true)
    }
  }, [version, key])

  useEffect(() => {
    const AMap = (window as any).AMap

    if (AMap && contentRef.current) {
      // console.log(AMap)
      //创建地图
      let map = new AMap.Map(contentRef.current, {
        zoom: 10,
        lang: 'ch',
        center: [103.970365, 30.679157]
      })

      mapRef.current = map

      // //标记窗体
      // let marker = new AMap.Marker({
      //   position: [103.970365, 30.679157],
      // })
      // map.add(marker)

      //设置最大缩放
      // map.setFitView()

      // //圆圈窗体
      // let circle = new AMap.Circle({
      //   center: marker.getPosition(),
      //   radius: 5000,
      //   fillOpacity: 0.1,
      //   strokeWeight: 1,
      // })
      // map.add(circle)

      // //标题内容信息窗体
      // let wind = new AMap.InfoWindow({
      //   content: "中坝站",
      //   offset: new AMap.Pixel(0, -28)
      // })
      // wind.open(map, marker.getPosition())
    }
  }, [aMapApiLoaded])

  useEffect(() => {
    const AMap = (window as any).AMap
    if (AMap && mapRef.current) {
      if (traffic) {
        if (!trafficLayerRef.current) {
          //第一次赋值路况图层
          trafficLayerRef.current = new AMap.TileLayer.Traffic({
            zIndex: 10
          })
        }
        mapRef.current.add(trafficLayerRef.current!)
      } else {
        if (trafficLayerRef.current) {
          mapRef.current.remove(trafficLayerRef.current)
        }
      }
    }
  }, [traffic, aMapApiLoaded])

  useEffect(() => {
    const AMap = (window as any).AMap

    if (AMap && mapRef.current) {
      if (plugin?.ToolBar) {
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'], () => {
          // 缩放、定位、平移窗体
          mapRef.current!.addControl(new AMap.ToolBar())
          // 比例尺窗体
          // mapRef.current!.addControl(new AMap.Scale())
          // 缩略图窗体
          // mapRef.current!.addControl(new AMap.OverView({ isOpen: true }))
        })
      }
    }
  }, [plugin?.ToolBar, aMapApiLoaded])

  return <div ref={contentRef} style={{ width, height }} />
}