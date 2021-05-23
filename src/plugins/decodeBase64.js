const fs = require('fs');

export const buffers = (base64s) => {
  let listBase64s = []
  if(Array.isArray(base64s)){
    listBase64s = base64s
  }else listBase64s.push(base64s)

  const buffs = []
  listBase64s.map(item =>{
    const buff = new Buffer.from(item.base64, 'base64')
    buffs.push(buff)
  })
  return buffs
}

export const decodingBufferToImages = (buffs) => {
  if(Array.isArray(buffs)){
    const listImgs = []
    buffs.map((buff, idx) =>{
      listImgs.push(fs.writeFileSync(`img-${idx}`, buff))
    })
    return listImgs
  }else return fs.writeFileSync('img.png', buffs)
}