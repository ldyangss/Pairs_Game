let timer;
let seconds = 15;
let started = false;

function updateTimer() {
    seconds--;

    if (seconds < 0) {
        clearInterval(timer); 
        alert('Game Over!'); 
        return;
    }

    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}

const img = [
    'url(image/img1.png)', 'url(image/img1.png)',
    'url(image/img2.png)', 'url(image/img2.png)',
    'url(image/img3.png)', 'url(image/img3.png)',
    'url(image/img4.png)', 'url(image/img4.png)',
    'url(image/img5.png)', 'url(image/img5.png)',
    'url(image/img6.png)', 'url(image/img6.png)',
    'url(image/img7.png)', 'url(image/img7.png)',
    'url(image/img8.png)', 'url(image/img8.png)',];
var shuf_img = img.sort(()=>(Math.random() > .5)? 2 : -1);
for (var i = 0; i < img.length; i++){
    let box = document.createElement('div');
    box.className = 'item';
    box.style.backgroundImage = shuf_img[i];
    box.style.backgroundSize = "cover";

    box.onclick = function() {
        if (!started) {
            timer = setInterval(updateTimer, 1000);
            started = true;
        }

        if (this.classList.contains('boxOpen') || this.classList.contains('boxMatch')) {
            return;
        }
    
        this.classList.add('boxOpen');
    
        setTimeout(function() {
            const openedBoxes = document.querySelectorAll('.boxOpen');
    
            if (openedBoxes.length > 1) {
                if (openedBoxes[0].style.backgroundImage === openedBoxes[1].style.backgroundImage) {
                    openedBoxes[0].classList.add('boxMatch');
                    openedBoxes[1].classList.add('boxMatch');
                    openedBoxes[0].classList.remove('boxOpen');
                    openedBoxes[1].classList.remove('boxOpen');

                    seconds += 5; 

                    if (document.querySelectorAll('.boxMatch').length === img.length) {
                        clearInterval(timer);
                        alert('Congratulation!  YOU GOT IT!');
                    }
                } else {
                    openedBoxes[1].classList.remove('boxOpen');
                    openedBoxes[0].classList.remove('boxOpen');
                }
            }
        }, 500);
    }

    document.querySelector('.game').appendChild(box);
}