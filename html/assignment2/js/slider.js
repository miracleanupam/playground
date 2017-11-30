let sliderIndices = document.getElementsByClassName('slider-index');
class Slider{
  constructor(container, textDiv, text, imagesnames, imagewidth, imageheight){
    this.container = container;
    this.container.style.overflow = 'hidden';
    this.sliderTitle = textDiv;
    this.text = text;
    this.isActive = false;
    this.imagesnames = imagesnames;
    this.imgwidth = imagewidth;
    this.imgheight = imageheight;
    this.imgul = document.createElement('ul');
    this.imgul.style.listStyle = 'none';
    this.imgul.style.paddingLeft = '0px';
    this.imgul.style.height = this.imgheight+'px';
    this.imgul.style.width = this.imgwidth*4+'px';
    this.imgul.style.margin = '0px';
    this.imgul.style.display = 'flex';
    // this.imgul.style.position = 'absolute';
    for (var i=0; i<this.imagesnames.length; i++){
      let listitem = document.createElement('li');
      listitem.style.display = "inline-block";
      let listimg = document.createElement('img');
      listimg.setAttribute("src",imagesnames[i]);
      listimg.style.width = this.imgwidth+'px';
      listimg.style.height = this.imgheight+'px';
      this.imgul.appendChild(listitem);
      listitem.appendChild(listimg);
    }
    var listitem = document.createElement('li');
    listitem.style.display = "inline-block";
    var listimg = document.createElement('img');
    listimg.setAttribute("src",imagesnames[0]);
    listimg.style.width = this.imgwidth+'px';
    listimg.style.height = this.imgheight+'px';
    this.imgul.appendChild(listitem);
    listitem.appendChild(listimg);

    this.container.appendChild(this.imgul);
    this.index = 0;
    // this.leftbutton = leftarrow;
    // this.leftbutton.onclick = () => {
    //   this.animateRight();
    // }
    //
    // this.rightbutton = rightarrow;
    // this.rightbutton.onclick = () => {
    //   this.animateLeft();
    // }
    // console.log(this.leftbutton, this.rightbutton);
    // console.log(this.imgwidth, this.imgheight, this.imgul);
  }

  animateLeft() {
    let counter = 0;
    let id = setInterval(() => {
      if ( counter !== 0 && counter%this.imgwidth==0) {
        clearInterval(id);
        this.index+=1;
        if (this.index>=sliderIndices.length) {
          this.index = 0;
        }
        sliderIndices[this.index].click();
      }else {
        let style = window.getComputedStyle(this.imgul);
        let lmargin = style.getPropertyValue('margin-left');
        let nlmargin = parseInt(lmargin);
        if (nlmargin == -this.imgwidth*3) {
          nlmargin = 0;
          this.index = 0;
        }
        let newlmargin = nlmargin-25+'px';
        this.imgul.style.marginLeft = newlmargin;
        counter+=25;
        // console.log(counter);
      }
    }, 5);
  }

  animateRight() {
    let counter = 0;
    let id = setInterval(() => {
      if ( counter !== 0 && counter%this.imgwidth == 0) {
        clearInterval(id);
        this.index-=1;
        console.log(this.index,sliderIndices.length);
        if (this.index<0) {
          this.index = 2;
        }
        sliderIndices[this.index].click();
        console.log(this.index);
      }else {
        let style = window.getComputedStyle(this.imgul);
        let lmargin = style.getPropertyValue('margin-left');
        let nlmargin = parseInt(lmargin);
        if (nlmargin == 0) {
          nlmargin = -this.imgwidth*3;
          this.index = 3;
        }
        let newlmargin = nlmargin+25+'px';
        this.imgul.style.marginLeft = newlmargin;
        counter+=25;
        // console.log(counter);
      }
    }, 5);
  }

  jump(index) {
    // console.log("jump ma aayo", index);
        let newlmargin = (index-1)*-this.imgwidth;
        // console.log(newlmargin);
        this.index = index-1;
        this.imgul.style.marginLeft = newlmargin+'px';
  }

  active() {
    this.sliderTitle.innerText = this.text;
    this.imgul.style.display = 'flex';
    this.isActive = true;
  }

  inactive() {
    this.imgul.style.display = 'none';
    this.isActive = false;
  }
}

let sliderContainer = document.getElementById('slider-container');
let leftarrow = document.getElementById('left-arrow');
let rightarrow = document.getElementById('right-arrow');
let textDiv = document.getElementById('slider-title');
// console.log(sliderIndices);
// console.log(leftarrow, rightarrow);
// console.log(sliderContainer);
// console.log(textDiv);
slider1 = new Slider(sliderContainer, textDiv, "Donec faucibus ultricies congue", ['./images/mountain1.jpg','./images/mountain2.jpg','./images/mountain3.jpg'], 1175, 704);
slider2 = new Slider(sliderContainer, textDiv, "Donec faucibus ultricies dongue", ['./images/mountain4.jpg','./images/mountain5.jpg','./images/mountain6.jpg'], 1175, 704);

let sliders = [slider1, slider2];

let prevSlider = document.getElementById('prevSlider');
let nextSlider = document.getElementById('nextSlider');
prevSlider.onclick = () => {
  slider2.inactive();
  slider1.active();
}

nextSlider.onclick = () => {
  slider1.inactive();
  slider2.active();
}

leftarrow.onclick = () => {
    sliders.forEach((slider) => {
      if (slider.isActive) {
        slider.animateRight();
      }
    });
}

rightarrow.onclick = () => {
    sliders.forEach((slider) => {
      if (slider.isActive) {
        slider.animateLeft();
      }
    });
}

function addClass(el, classNameToAdd){
  // console.log(el, classNameToAdd);
    el.className += ' ' + classNameToAdd;
}

function removeClass(el, classNameToRemove){
    var elClass = ' ' + el.className + ' ';
    while(elClass.indexOf(' ' + classNameToRemove + ' ') !== -1){
         elClass = elClass.replace(' ' + classNameToRemove + ' ', '');
    }
    el.className = elClass;
}


for (let i = 0; i < sliderIndices.length; i++) {
  // let ind = i+1;
  // console.log(ind);
  sliderIndices[i].addEventListener('click', () => {
    // console.log("click vayo",i);
    sliders.forEach((slider)=>{
      if (slider.isActive) {
        // console.log("secondwala", slider);
        slider.jump(i+1);
        let active = document.getElementsByClassName("slider-control-active")[0];
        if (sliderIndices[i] !== active) {
          removeClass(active, "slider-control-active");
          addClass(sliderIndices[i], "slider-control-active");
        }
      }
    });
  });
}

slider2.inactive();
slider1.active();


let projectul = document.getElementById("project-ul");
let projectcontainer = document.getElementById('project-container');
// projectcontainer
projectcontainer.style.overflow = 'hidden';
projectul.style.display = 'flex';
projectul.style.width = 1175*2;

for (var i = 0; i<8; i++) {
  let listitem = document.createElement('li');
  listitem.className = 'project-image group';
  let img = document.createElement('img');
  img.src = './images/mountain'+(i+1)+'.jpg';
  img.style.height = '270px';
  // console.log(img.src);
  let p = document.createElement('p');
  p.innerHTML = 'Lorem Ipsum';
  let eye = document.createElement('a');
  eye.className = 'eye';
  eye.href = '#';
  eye.target='_blank';
  let span = document.createElement('span');
  span.className = "fa fa-eye";
  span.setAttribute('aria-hidden', 'true');
  eye.appendChild(span);
  let link = document.createElement('a');
  link.className='link';
  link.href = "#";
  link.target = '_blank';
  let anotherspan = document.createElement('span');
  anotherspan.className = 'fa fa-link';
  anotherspan.setAttribute('aria-hidden', 'true');
  link.appendChild(anotherspan);
  listitem.appendChild(img);
  listitem.appendChild(p);
  listitem.appendChild(eye);
  listitem.appendChild(link);
  projectul.appendChild(listitem);
}


let prevProject = document.getElementById('prev-project');
let nextProject = document.getElementById('next-project');

prevProject.onclick = () => {
  // projectul.style.marginLeft = '0px';
  let id = setInterval(() => {
    let style = window.getComputedStyle(projectul);
    let lmargin = style.getPropertyValue('margin-left');
    let nlmargin = parseInt(lmargin);
    if (nlmargin == 0) {
      clearInterval(id);
    }
    if (nlmargin < 0) {
      let newlmargin = nlmargin+5+'px';
      projectul.style.marginLeft = newlmargin;
    }
    // console.log(newlmargin);
  }, 5);
}

nextProject.onclick = () => {
  let id = setInterval(() => {
    let style = window.getComputedStyle(projectul);
    let lmargin = style.getPropertyValue('margin-left');
    let nlmargin = parseInt(lmargin);
    if (nlmargin == -1200) {
      clearInterval(id);
    }
    if (nlmargin>-1200) {
      let newlmargin = nlmargin-5+'px';
      projectul.style.marginLeft = newlmargin;
    }
    // console.log(newlmargin);
  },5);
}
