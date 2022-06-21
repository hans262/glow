import React, { Component } from 'react'

/**
 * Error Boundaries
 * 使用场景：异常捕捉
 * 捕捉子组件异常，并做出处理
 */

export default function ErrorBoundaries() {
  return (
    <ErrorBoundary>
      <h1>React Error Boundaries</h1>
      <Test />
    </ErrorBoundary>
  )
}

function Test(props: any) {
  return (
    <div>{props.name.hello}</div>
  )
}

class ErrorBoundary extends Component<{
  children: React.ReactNode
}> {
  state = { hasError: false, error: new Error() }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error }
  }

  componentDidCatch(error: any, info: any) {
    // 上报错误日志到服务器
    // console.log(error)
    // console.log(info)
  }

  render() {
    if (this.state.hasError) {
      const componentName = this.state.error.stack?.split('\n')[1]?.split(' ')[5]
      return (
        <>
          <h1>{componentName}组件报错</h1>
          <p>{this.state.error.message}</p>
        </>
      )
    }
    return this.props.children
  }
}