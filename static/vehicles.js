let items = document.querySelectorAll(".item");
let slider = document.querySelector(".slider");
let sliderWidth;
let itemWidth;
let currentPos = 0;

function init() {
  sliderWidth = slider.getBoundingClientRect().width;
  itemWidth = sliderWidth / items.length;
  document.body.style.height = `${
    sliderWidth - (window.innerWidth - window.innerHeight)
  }px`;
}

function setSliderWidth() {
  let totalWidth = 0;
  items.forEach((item) => {
    totalWidth += item.offsetWidth;
  });

  slider.style.width = `${totalWidth}px`;
}

function animate() {
  init();
  setSliderWidth();
  currentPos = window.scrollY;
  slider.style.transform = `translateX(${-currentPos}px)`;
  requestAnimationFrame(animate);
}


animate();

// Handle car movement

var isOverlayActive = true;
document.addEventListener('keydown', (event) => 
{
  if (isOverlayActive !== true)
  {
    const scrollRate = 20
    const slideSize = window.innerWidth;
    if (event.key === "d" || event.key === "D") 
      {
        window.scrollBy(0, scrollRate);
      } 
    else if (event.key === "a" || event.key === "A") 
    {
      window.scrollBy(0, scrollRate * -1);
    }
        
    else if (event.key === "m" || event.key === "M") 
    {
      window.scrollBy(0, slideSize)
    }

    else if (event.key === "n" || event.key === "N") 
    {
      window.scrollBy(0, slideSize * -1)
    }
    else if (event.key === 'z' || event.key === 'Z')
    {
      window.scrollTo(0, 0);
    }
  }

  else
  {
    isOverlayActive = false;
    let elements = document.querySelectorAll(".visible");
    elements.forEach(element => {
      element.classList.add("hidden")
    });
  }
})