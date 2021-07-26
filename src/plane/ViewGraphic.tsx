import { createRef, PureComponent } from 'react'
import * as paper from 'paper'
import { ServiceCore } from './services';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import Left from './Left';
import Right from './Right';
import { connect } from 'react-redux'
import { RootState } from '../store';
import { ACTION, ActionType, papersub } from './subject';
import { Item } from './types';

interface ViewGraphicProps {
  height: number | string
  plane: RootState['plane']
}

interface ViewGraphicState {
  layers: Item[]
}

class ViewGraphic extends PureComponent<ViewGraphicProps, ViewGraphicState> {
  ref = createRef<HTMLDivElement>()
  paper: paper.PaperScope
  serviceCore: ServiceCore
  resizePaperSub?: Subscription
  paperSub?: Subscription

  constructor(props: ViewGraphicProps) {
    super(props)
    this.paper = new paper.PaperScope()
    this.serviceCore = new ServiceCore(this.paper)
    this.state = {
      layers: []
    }
  }

  componentWillUnmount() {
    this.resizePaperSub?.unsubscribe()
    this.paperSub?.unsubscribe()
    this.paper.view.off('created', this.onCreated)
  }

  componentDidMount() {
    const ref = this.ref.current
    if (!ref) return
    const canvas = document.createElement('canvas')
    ref.appendChild(canvas)
    this.paper.setup(canvas)
    this.serviceCore.registerService('draw')

    const size = ref.getBoundingClientRect()

    this.paper.view.viewSize = new this.paper.Size(
      size.width, size.height
    )
    const observable = fromEvent(window, 'resize').pipe(
      debounceTime(300),
      map(() => ref.getBoundingClientRect())
    )

    this.resizePaperSub = observable.subscribe(e => {
      this.paper.view.viewSize = new this.paper.Size(e.width, e.height)
    })

    this.paperSub = papersub.subscribe(this.onSubscribe)

    this.paper.view.on('created', this.onCreated)
  }

  onSubscribe = (e: ActionType) => {
    switch (e.type) {
      case ACTION.VISIBLE_ITEM:
        if (e.payload.className === 'Layer') {
          let layer = this.paper.project?.layers.find(l => l.id === e.payload.id)!
          layer.visible = e.payload.visible
        } else {
          let item = this.paper.project?.getItem({
            className: e.payload.className,
            id: e.payload.id
          })!
          item.visible = e.payload.visible
        }
        return
      default:
        return
    }
  }

  onCreated = (_: { type: string, payload: paper.Item }) => {
    let layers: Item[] = this.paper.project!.layers.map(l => ({
      visible: l.visible!,
      id: l.id,
      className: l.className!,
      children: l.children!.map(i => ({
        id: i.id, className: i.className!, visible: i.visible!
      }))
    }))
    this.setState(e => ({ ...e, layers }))
  }

  componentDidUpdate(prevProps: ViewGraphicProps) {
    if (prevProps.plane.editorType !== this.props.plane.editorType) {
      this.serviceCore.registerService(this.props.plane.editorType)
    }
  }

  render() {
    const { height } = this.props
    return (
      <div style={{ height, display: 'flex' }}>
        <Left width={200} />
        <div
          style={{
            width: 'calc(100% - 400px)',
            overflow: 'hidden', border: '1px solid'
          }}
          ref={this.ref}
        ></div>
        <Right width={200} layers={this.state.layers} />
      </div>
    )
  }
}

const mapstate = (state: RootState) => ({ plane: state.plane })

export default connect(mapstate)(ViewGraphic)