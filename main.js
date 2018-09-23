(function() {

    var screenPoints = {
        medium: 1200,
        small: 768
    }
    // screen sizes
    var device = checkScreen(screen.offsetWidth || screen.availWidth)
    function checkScreen(screenWidth) {
        if (screenWidth > screenPoints.medium) {
            return {screen: 'desktop', imgCount: 4}
        } else if (screenWidth <= screenPoints.medium && screenWidth > screenPoints.small) {
            return {screen: 'tablet', imgCount: 3}
        }
        return {screen: 'mobile', imgCount: 2}
    }

    var carouselWrap = document.querySelector('.carousel')
    var carousel = document.querySelector('.carousel-list')
    var imgItemList = document.querySelectorAll('.carouesel-img-item')
    var carouselWidth = carousel.offsetWidth

    // default indent between images
    var padding = 20
    // set width for images
    imgItemList.forEach((item, i) => {
        if (i < device.imgCount) {
            item.classList.add('active')
        }   
        item.style.width = (carousel.offsetWidth - padding * (device.imgCount - 1)) / device.imgCount + 'px'
    })

    var imgItem = imgItemList[0]

    // image width and step for scroll
    var step = imgItem ? imgItem.offsetWidth : null
    // endpoint
    var current = 0
    var currentSlide = 0
     
    var fullStep = step + padding
    // count of images
    var imgCount = imgItemList.length

    var currentWidth = 0
    var fullWidth = fullStep * imgCount

    // controls
    var prev = document.querySelector('.arrow-left')
    var next = document.querySelector('.arrow-right')

    var first = document.querySelector('.carousel-list img:first-child')
    var last = document.querySelector('.carousel-list img:last-child')

    // --- left button (prev)
    prev.addEventListener('click', () => {

        if (last.classList.contains('active')) {
            return
        }

        currentSlide += 1
        var index = device.imgCount
        imgItemList.forEach((item, i) => {
            item.classList.remove('active')
            if (i >= currentSlide && index) {
                item.classList.add('active')
                index--
            }
        })

        current -= fullStep
        
        carousel.style.transform = 'translate3d(' + current + 'px, 0px, 0px)'
        
    })
    // ---

    // --- right button (next)
    next.addEventListener('click', () => {

        if (first.classList.contains('active')) {
            return
        }

        currentSlide -= 1

        var index = device.imgCount
        imgItemList.forEach((item, i) => {
            item.classList.remove('active')

            if (i >= currentSlide && index) {
                item.classList.add('active')
                index--
            }
        })
        current += fullStep

        carousel.style.transform = 'translate3d(' + (current) + 'px, 0px, 0px)'
       
    })
    // ---

    // --- responsible on resize
    window.addEventListener('resize', () => {
        device = checkScreen(screen.offsetWidth || screen.availWidth)
        initWithActiveClass(imgItemList)
    })
    // ---
    

    function initWithActiveClass(list) {
        list.forEach((item, i) => {
            item.classList.remove('active')
            if (i < device.imgCount) {
                item.classList.add('active')
            }

            item.style.width = (carousel.offsetWidth - padding * (device.imgCount - 1)) / device.imgCount + 'px'
        })
        step = imgItem ? imgItem.offsetWidth : null
        fullStep = step + padding
    }

    carousel.classList.add('grabbable')

    // swipe
    carousel.onmousedown = (e) => {
        console.log('start', e.pageX)
        document.onmousemove = function(e) {
            
            console.log('move', e.pageX)
            carousel.style.transform = 'translate3d(' + 200 + 'px, 0px, 0px)'
            carousel.onmouseup = (e) => {
                console.log('up', e.pageX)
                // --
                currentSlide -= 1

                var index = device.imgCount
                imgItemList.forEach((item, i) => {
                    item.classList.remove('active')

                    if (i >= currentSlide && index) {
                        item.classList.add('active')
                        index--
                    }
                })
                current += fullStep

                carousel.style.transform = 'translate3d(' + (current) + 'px, 0px, 0px)'
                // --

                document.onmousemove = null
                carousel.onmouseup = null


            }
        }
    }

    var touchStartPoint = 0

    console.log(window.ondragstart)
    carousel.ontouchstart = (e) => {
        var touchLocation = e.targetTouches[0]
        touchStartPoint = touchLocation.clientX
        console.log('mobile start touche', touchLocation.clientX)
    }
    carousel.ontouchend = (e) => {
        var touchLocation = e.targetTouches[0]
        // touchStartPoint = touchLocation
        console.log('mobile end touche', touchStartPoint)

        // if (first.classList.contains('active')) {
        //     return
        // }

        carousel.style.transform = 'translate3d(' + (current += fullStep) + 'px, 0px, 0px)'

    }
    carousel.ontouchmove = (e) => {
        var touchLocation = e.targetTouches[0]
        var deltaX = 0
            console.log('ontouchemove')
        if (touchStartPoint < touchLocation.clientX) {
            // console.log('меньше')
            deltaX = touchLocation.clientX - touchStartPoint
        }

        // carousel.style.transform = 'translate3d(' + (current + deltaX) + 'px, 0px, 0px)'
        
        console.log('MOOVE',  touchStartPoint, touchLocation.clientX)
    }
    carousel.ondragstart = function() {
        return false
    }
    // carousel.ontouchstart = function() {
    //     return false;
    // }


})()
