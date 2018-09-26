(function() {
    window.onload = function () {
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
        // set width for slider items
        imgItemList.forEach((item, i) => {
            if (i < device.imgCount) {
                item.classList.add('active')
            }
            item.style.minWidth = (carousel.offsetWidth - padding * (device.imgCount - 1)) / device.imgCount + 'px'
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
        console.log(fullWidth - fullStep * device.imgCount)
    
        // controls
        var prev = document.querySelector('.arrow-left')
        var next = document.querySelector('.arrow-right')
    
        var first = document.querySelector('.carousel-list a:first-child')
        var last = document.querySelector('.carousel-list a:last-child')
    
        init()
    
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
            console.log('resize')
            device = checkScreen(screen.offsetWidth || screen.availWidth)
            initWithActiveClass(imgItemList)
        })
        // ---
        
    
        function init() {
            // carousel.classList.add('grabbable')
            var arrows = carousel.querySelectorAll('.arrow')
            carousel.classList.add('transition')
        }
    
        function initWithActiveClass(list) {
            list.forEach((item, i) => {
                item.classList.remove('active')
                if (i < device.imgCount) {
                    item.classList.add('active')
                }
    
                item.style.minWidth = (carousel.offsetWidth - padding * (device.imgCount - 1)) / device.imgCount + 'px'
            })
            step = imgItem ? imgItem.offsetWidth : null
            fullStep = step + padding
        }
    
        // start point on touch
        var touchStartPoint = 0
        var direction = 'RIGHT'
    
        // toche desktop
        carousel.onmousedown = (e) => {
            carousel.classList.remove('transition')
            touchStartPoint = e.pageX
    
            document.onmousemove = function(e) {
                let deltaX = 0
                if (touchStartPoint <= e.pageX) {
                    direction = 'RIGHT'
                    deltaX = e.pageX - touchStartPoint
                    if (first.classList.contains('active')) {
                        deltaX = (e.pageX - touchStartPoint) < 50 ? (e.pageX - touchStartPoint) : 50
                    }
                    carousel.style.transform = 'translate3d(' + (current + deltaX) + 'px, 0px, 0px)'
                } else {
                    direction = 'LEFT'
                    deltaX = touchStartPoint - e.pageX
                    if (last.classList.contains('active')) {
                        deltaX = (touchStartPoint - e.pageX) < 50 ? (touchStartPoint - e.pageX) : 50
                    }
                    carousel.style.transform = 'translate3d(' + (current - deltaX) + 'px, 0px, 0px)'
                }
    
                carousel.onmouseup = (e) => {
                    carousel.classList.add('transition')
                    // currentSlide -= 1
                    if (first.classList.contains('active') && direction === 'RIGHT') {
                        carousel.style.transform = 'translate3d(' + (0) + 'px, 0px, 0px)'
                        return
                    }
            
                    if (last.classList.contains('active') && direction === 'LEFT') {
                        carousel.style.transform = 'translate3d(' + (-(fullWidth - fullStep * device.imgCount)) + 'px, 0px, 0px)'
                        return
                    }
            
                    if (direction === 'RIGHT') {
                        currentSlide -= 1
            
                        var index = device.imgCount
                        imgItemList.forEach((item, i) => {
                            item.classList.remove('active')
                
                            if (i >= currentSlide && index) {
                                item.classList.add('active')
                                index--
                            }
                        })
                    }
            
                    if (direction === 'LEFT') {
                        currentSlide += 1
            
                        var index = device.imgCount
                        imgItemList.forEach((item, i) => {
                            item.classList.remove('active')
                            if (i >= currentSlide && index) {
                                item.classList.add('active')
                                index--
                            }
                        })
                    }
                    var index = device.imgCount
                    imgItemList.forEach((item, i) => {
                        item.classList.remove('active')
                        if (i >= currentSlide && index) {
                            item.classList.add('active')
                            index--
                        }
                    })

                    var indent = direction === 'RIGHT' ? (current += fullStep) : (current -= fullStep)
                    carousel.style.transform = 'translate3d(' + (indent) + 'px, 0px, 0px)'
                    // ---
    
                    document.onmousemove = null
                    carousel.onmouseup = null
                }
            }
        }
        // -----
    
    
        // --- mobile touche
        var deltaX = 0
    
        carousel.ontouchstart = (e) => {
            carousel.classList.remove('transition')
            var touchLocation = e.targetTouches[0]
            touchStartPoint = touchLocation.clientX
        }

        function touchMove(e) {
            var touchLocation = e.targetTouches[0]
    
            if (touchStartPoint <= touchLocation.clientX) {
                direction = 'RIGHT'
                deltaX = touchLocation.clientX - touchStartPoint
                if (first.classList.contains('active')) {
                    deltaX = (touchLocation.clientX - touchStartPoint) < 50 ? (touchLocation.clientX - touchStartPoint) : 50
                }
                carousel.style.transform = 'translate(' + (current + deltaX) + 'px, 0px)'
            } else {
                direction = 'LEFT'
                deltaX = touchStartPoint - touchLocation.clientX
    
                if (last.classList.contains('active')) {
                    deltaX = (touchStartPoint - touchLocation.clientX) < 50 ? (touchStartPoint - touchLocation.clientX) : 50
                }
    
                carousel.style.transform = 'translate(' + (current - deltaX) + 'px, 0px)'
            }
        }

        function touchEnd(e) {
            carousel.classList.add('transition')
    
            if (first.classList.contains('active') && direction === 'RIGHT') {
                carousel.style.transform = 'translate3d(' + (0) + 'px, 0px, 0px)'
                return
            }
    
            if (last.classList.contains('active') && direction === 'LEFT') {
                carousel.style.transform = 'translate3d(' + (-(fullWidth - fullStep * device.imgCount)) + 'px, 0px, 0px)'
                return
            }
    
            if (direction === 'RIGHT') {
                currentSlide -= 1
    
                var index = device.imgCount
                imgItemList.forEach((item, i) => {
                    item.classList.remove('active')
        
                    if (i >= currentSlide && index) {
                        item.classList.add('active')
                        index--
                    }
                })
            }
    
            if (direction === 'LEFT') {
                currentSlide += 1
    
                var index = device.imgCount
                imgItemList.forEach((item, i) => {
                    item.classList.remove('active')
                    if (i >= currentSlide && index) {
                        item.classList.add('active')
                        index--
                    }
                })
            }
            var touchLocation = e.targetTouches[0]
            var indent = direction === 'RIGHT' ? (current += fullStep) : (current -= fullStep)
            carousel.style.transform = 'translate3d(' + (indent) + 'px, 0px, 0px)'
            // carousel.style.transform = 'translate3d(' + (current -= fullStep) + 'px, 0px, 0px)'
            carousel.ontouchmove = touchMove
            carousel.ontouchend = touchEnd
        }
       
        carousel.ontouchmove = touchMove
        carousel.ontouchend = touchEnd
    
        carousel.ondragstart = function() {
            // return false
        }
    }
    

})()
