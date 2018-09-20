(function() {
    var imgItemList = document.querySelectorAll('.carouesel-img-item')
    var imgItem = imgItemList[0]
    var lastItem = imgItemList[imgItemList.length - 1]
    var cloneLastItem = lastItem.cloneNode(true)
    // image width and step for scroll
    var step = imgItem ? imgItem.offsetWidth : null
    // endpoint
    var current = 0
    var currentSlide = 0
    // default indent between images
    var padding = 20
    // count of images
    var imgCount = imgItemList.length

    var carousel = document.querySelector('.carousel-list')
    // setTimeout(() => {
    //     carousel.insertBefore(cloneLastItem, imgItem)

    // }, 2000)
    carousel.style.transform = 'translate3d(' + 0 + 'px, 0px, 0px)'
    var firstClone = imgItem

    // buttons
    var prev = document.querySelector('.arrow-left')
    var next = document.querySelector('.arrow-right')

    prev.addEventListener('click', () => {
        currentSlide += 1

        console.log(currentSlide, imgCount, currentSlide === imgCount)
        if (currentSlide >= imgCount - 3) {
            currentSlide = imgCount - 3
            return
        }
        current -= step + padding
        carousel.style.transform = 'translate3d(' + current + 'px, 0px, 0px)'
    })

    next.addEventListener('click', () => {
        currentSlide -= 1
        console.log(currentSlide, imgCount, currentSlide === imgCount)
        if (currentSlide <= 0) {
            return currentSlide = 0
        }

        // if (currentSlide < 0) {
        //     var last = document.querySelector('.carousel-list img:last-child')
        //     console.log('last', last)
        //     var first = document.querySelector('.carousel-list img:first-child')
        //     carousel.insertBefore(last, first)
        // }

        current += step + padding
        console.log('current', currentSlide)
        carousel.style.transform = 'translate3d(' + (current) + 'px, 0px, 0px)'
       
    })
   
})()


// сделать клон картинки в конец и удалять из начала