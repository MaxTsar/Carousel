(function() {
    var imgItemList = document.querySelectorAll('.carouesel-img-item')
    var imgItem = imgItemList[0]
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
    var firstClone = imgItem

    // buttons
    var prev = document.querySelector('.arrow-left')
    var next = document.querySelector('.arrow-right')

    prev.addEventListener('click', () => {
        currentSlide += 1
        current -= step + padding
        console.log('current', current, 'step', step)
        carousel.style.transform = 'translate3d(' + current + 'px, 0px, 0px)'
    })

    next.addEventListener('click', () => {
        currentSlide -= 1

        if (currentSlide < 0) {
            var last = document.querySelector('.carousel-list img:last-child')
            console.log('last', last)
            var first = document.querySelector('.carousel-list img:first-child')
            carousel.insertBefore(last, first)
        }
        
        current += step + padding
        console.log('current', currentSlide)
        carousel.style.transform = 'translate3d(' + (current) + 'px, 0px, 0px)'
       
    })
   
})()


// сделать клон картинки в конец и удалять из начала