import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Queue = lazy(() => import("./Queue"))
const Drag = lazy(() => import("./RxDrag"))
const Input = lazy(() => import("./Input"))
const Observable = lazy(() => import("./Observable"))
const Progress = lazy(() => import("./Progress"))
const Subject = lazy(() => import("./Subject"))

export default function Rxjs () {
  return (
    <Routes>
      <Route path="/" element={<Queue />} />
      <Route path={'drag'} element={<Drag />} />
      <Route path={'input'} element={<Input />} />
      <Route path={'observable'} element={<Observable />} />
      <Route path={'progress'} element={<Progress />} />
      <Route path={'subject'} element={<Subject />} />
      <Route path="*" element={<Queue />} />
    </Routes>
  )
}