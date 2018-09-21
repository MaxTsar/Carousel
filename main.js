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

        // check device and set img count
        // var deviceImgCount = 

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

    // --- left button (prev)
    prev.addEventListener('click', () => {
        var last = document.querySelector('.carousel-list img:last-child')

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
        var first = document.querySelector('.carousel-list img:first-child')

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
    }

})()
