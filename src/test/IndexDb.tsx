import { useEffect } from "react"

export default function IndexDb() {
  useEffect(() => {
    // let db: IDBDatabase
    // //打开数据库，如果没有则创建
    // let request = window.indexedDB.open('myDB', 1)
    // //捕捉错误
    // request.addEventListener('error', function (e) {
    //   console.log('数据库打开失败')
    // })
    // request.addEventListener('success', function (e) {
    //   console.log('打开数据库成功')
    //   //得到数据库数据
    //   db = request.result
    //   // add()
    //   read()
    //   // updata()
    //   // remove()
    //   readAll()
    //   // deleteDB('myDB')

    //   // close(db)
    // })
    // request.addEventListener('upgradeneeded', function (e:IDBVersionChangeEvent) {
    //   console.log('数据库已创建/升级')
      
    //   db = e.target.result

    //   //建表
    //   let objectStore
    //   if (!db.objectStoreNames.contains('person')) {//判断表是否存在
    //     // objectStore=db.createObjectStore('person',{autoIncrement:true})//默认设置主键、自增
    //     objectStore = db.createObjectStore('person', { keyPath: 'id', autoIncrement: true })//自定义主键名称，自增

    //     //设置三个参数：索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
    //     objectStore.createIndex('name', 'name', { unique: true })//不能重复
    //     objectStore.createIndex('email', 'email')
    //   }
    // })

    // let add = function () {
    //   let request = db.transaction(['person'], 'readwrite')
    //     .objectStore('person')
    //     .add({ name: 'Kemi', email: 'Kemi@qq.com' })
    //   //写入数据是异步操作，所以需要监听是否成功
    //   request.addEventListener('success', function (e) {
    //     console.log('数据写入成功')
    //   })
    //   request.addEventListener('error', function (e) {
    //     console.log('数据写入失败')
    //   })
    // }

    // let read = function () {
    //   let transaction = db.transaction(['person'], 'readonly')
    //   let objectStore = transaction.objectStore('person')
    //   // let request=objectStore.get(1)//通过索引获取数据
    //   let request = objectStore.index('name').get('Tom')//通过索引获取数据
    //   request.addEventListener('error', function (e) {
    //     console.log('读取失败')
    //   })
    //   request.addEventListener('success', function (e) {
    //     let result = e.target.result
    //     console.log(result)
    //     console.log(result.name + ',' + result.email)
    //   })
    // }

    // let readAll = function () {
    //   let objectStore = db.transaction(['person']).objectStore('person')
    //   objectStore.openCursor().addEventListener('success', function (e) {
    //     let cursor = e.target.result
    //     if (cursor) {
    //       console.log(cursor.key + ',' + cursor.value.name + ',' + cursor.value.email)
    //       cursor.continue()
    //     } else {
    //       console.log('没有数据了')
    //     }
    //   })
    // }

    // let updata = function () {
    //   let request = db.transaction(['person'], 'readwrite')
    //     .objectStore('person')
    //     .put({ id: 1, name: 'Tom', email: 'Tom@qq.com' })
    //   request.addEventListener('success', function (e) {
    //     console.log('数据更新成功')
    //   })
    //   request.addEventListener('error', function (e) {
    //     console.log('数据更新失败')
    //   })
    // }

    // let remove = function () {
    //   let request = db.transaction(['person'], 'readwrite')
    //     .objectStore('person')
    //     .delete(4)
    //   request.addEventListener('success', function (e) {
    //     console.log('数据删除成功')
    //   })
    // }

    // let close = function (db: IDBDatabase) {
    //   db.close()
    // }

    // let deleteDB = function (dbName: string) {
    //   indexedDB.deleteDatabase(dbName)
    // }
  }, [])
  return (
    <div>Index Db</div>
  )
}