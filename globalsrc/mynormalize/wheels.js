const randomColor = document.querySelector('.randomColor')
randomColor.addEventListener('click', function() {
    this.style.backgroundColor = getRandomColor()
})