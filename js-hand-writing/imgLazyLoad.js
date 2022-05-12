const imgList = [...document.querySelectorAll('img')]
const len = imgList.length

const imgLazyLoad = (function(){
    let count=0; // 每次函数被调用时，count还保留直至上次累计的值
    // const deleteIdx = [] // todo: 试下放哪里更好
    return function(){
        const deleteIdx = [] // 这里不需要放到闭包函数外，为什么？
        imgList.forEach((img,idx) => {
            const imgTop = img.getBoundingClientRect().top
            if(imgTop < window.innerHeight) {
                img.src = img.dataset.src
                count++
                deleteIdx.push(idx)
            }
            if(count===len) {
                document.removeEventListener('scroll')
            }
        })
        imgList = imgList.filter((_,idx) => !deleteIdx.includes(idx))
    }
})()

document.addEventListener('scroll', imgLazyLoad)


// 方法二： IntersectionObserver

function lazyLoad(){
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry=>{
            if(entry.intersectionRatio>0){
                entry.target.src = entry.target.dataset.src
                observer.unobserve(entry.target)
            }
        })
    })
    imgList.forEach(img => {
        observer.observe(img)
    })
}

window.addEventListener('scroll', lazyLoad)
