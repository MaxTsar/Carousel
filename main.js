(function() {
    var carousel = document.querySelector('.carousel-list')
    carousel.style.transform = 'translate3d(' + -305 + 'px, 0px, 0px)'

    // buttons
    var prev = document.querySelector('.arrow-left')
    var next = document.querySelector('.arrow-right')

    prev.addEventListener('click', () => console.log('click left'))
    next.addEventListener('click', () => console.log('click right'))


    console.log(123)
    const imgItem = document.querySelector('.carouesel-img-item')
    const imgItemWidth = imgItem ? imgItem.offsetWidth : null
    console.log('item width', imgItemWidth)
})()