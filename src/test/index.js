
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(111);
  }, 1000)
})


function ajax() {
  /*return promise1
    .then(res => {
      return res
    })*/
  
  return new Promise((resolve, reject) => {
    promise1
      .then(res => {
        resolve(res)
      })
  })
}

(async () => {
  console.log(await ajax());
})()