// Cursor

const coords = { x: 0 , y: 0};
const circles = document.querySelectorAll(".circle");
const svg = document.querySelector(".cursor img");
var timer;


svg.style.visibility = "hidden";

circles.forEach((circle) => {
    circle.x = 0;
    circle.y = 0;
})


window.addEventListener("mousemove", (e) =>  {
    coords.x = e.clientX - 12;
    coords.y = e.clientY - 12;

    clearTimeout(timer)


    
    svg.style.visibility = "hidden";
    circles.forEach((circle) => {
        circle.style.display = "block";
    })

    timer = setTimeout(() => {
        circles.forEach((circle) => {
            circle.style.display = "none";
            svg.style.visibility = "visible";
            svg.style.display = "block"
        })
    }, 500);

})

const animateCircles = () => {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
        circle.style.left = x + "px";
        circle.style.top = y + "px";

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1]  || circles[0];
        x += (nextCircle.x  - x) * 0.1;
        y += (nextCircle.y  - y) * 0.1;

        const len = circles.length * 2;
        const scaleFactor = Math.max(window.innerWidth / 1400 , 1 );
        circle.style.scale = ((len - index)/len) * scaleFactor;
    })

       requestAnimationFrame(animateCircles);
}

animateCircles();


// Theme Changer

const themeChangerElement = document.getElementById("theme-changer");

const themeChanger = () => {
    const offsets = themeChangerElement.getBoundingClientRect();
    document.body.style.backgroundColor = offsets.top < 0 ? "#fff" : "#0E0E0E";
}

window.addEventListener("scroll" , themeChanger);
window.addEventListener("load" , themeChanger);


// Pic Animations

const pics = document.querySelectorAll(".animation_wrapper img");

let animeData = [];

const play = (elem , _class) => elem.classList.add(_class);

// _class = move0 , move1 .....

const stop = (elem) => elem.classList.add("end");
const resume = (elem) => elem.classList.remove("end");
const reset = (elem , _class) => elem.classList.remove("end" , _class);


const stopHandler = (elem , i) => {
    stop (elem);

    // complete animation
    elem.addEventListener("animationend", () => {
        animeData[i] = null;
        reset(elem ,`move${i}`);
    }, false);
};

pics.forEach((ele , i) => {
    ele.addEventListener("mouseenter" , () => {
        // Already animated
        if(animeData[i] && animeData[i].startAnime) {
            resume(ele)
        }else {
            // Not animated or stoped
            animeData[i] = {startAnime : true};
            play(ele , `move${i}`)
        }
    })

    ele.addEventListener("mouseleave", () => {
        // Already animated
        if(animeData[i] && animeData[i].startAnime) {
            stopHandler(ele , i);
        }
    })
})



//**********************  Responsiveness ***************//

const nav = document.querySelector("nav");
const menuButton = document.querySelector(".menuButton");
const hero = document.querySelector(".hero");
const aboutMe = document.querySelector(".about-me");
const skills = document.querySelector(".skills");
const myWork = document.querySelector(".my-work");
const message = document.querySelector(".message");
const footer = document.querySelector("footer");

const _cursor =  document.querySelector(".cursor");

const responsive = () => {
    const _innerWidth  = window.innerWidth;

    if(_innerWidth <= 640) {
        // innerWidth <= 640
        nav.style.zoom = 1;
        menuButton.style.zoom = (_innerWidth / 640) * 1.3;
        hero.style.zoom = _innerWidth / 640;
        aboutMe.style.zoom = _innerWidth / 640;
        skills.style.zoom = (_innerWidth / 640) * 1.5;
        myWork.style.zoom = (_innerWidth / 640) * 1.5;
        message.style.zoom = (_innerWidth / 640) * 1.5;
        footer.style.zoom = (_innerWidth / 640) * 1.3;

        _cursor.style.display = "none";
    }else if(_innerWidth < 900) {
        // 900 > innerWidth < 640
        nav.style.zoom = _innerWidth / 900;
        hero.style.zoom = 1;
        aboutMe.style.zoom = 1;
        skills.style.zoom = _innerWidth / 900;
        myWork.style.zoom = (_innerWidth / 900) * 1.2;
        message.style.zoom = (_innerWidth / 900);
        footer.style.zoom = (_innerWidth / 900);

        _cursor.style.display = "block";
    }else if(_innerWidth <= 1200) {
        // 1200 > innerWidth < 900
        nav.style.zoom = _innerWidth / 1200 + 0.3;
        hero.style.zoom = (_innerWidth / 1200) * 1.4;
        aboutMe.style.zoom = (_innerWidth / 1200) * 1.4;
        skills.style.zoom = (_innerWidth / 1200) * 1.4;
        myWork.style.zoom = (_innerWidth / 1200) * 1.6;
        message.style.zoom = (_innerWidth / 1200) * 1.4;
        footer.style.zoom = (_innerWidth / 1200) * 1.3;

        _cursor.style.display = "block";
    }else if(_innerWidth <= 1400) {
        // 1400 > innerWidth < 1200
        nav.style.zoom = _innerWidth / 1400;
        hero.style.zoom = _innerWidth / 1400 - 0.1;
        aboutMe.style.zoom = _innerWidth / 1400 - 0.1;
        skills.style.zoom = _innerWidth / 1400;
        myWork.style.zoom = _innerWidth / 1400;
        message.style.zoom = _innerWidth / 1400;
        footer.style.zoom = _innerWidth / 1400;

        _cursor.style.display = "block";
    }else {
        // over 1400 px
        nav.style.zoom = _innerWidth / 1400;
        hero.style.zoom = (_innerWidth / 1400) * 0.9;
        aboutMe.style.zoom = (_innerWidth / 1400);
        skills.style.zoom = (_innerWidth / 1400);
        myWork.style.zoom = (_innerWidth / 1400);
        message.style.zoom = (_innerWidth / 1400);
        footer.style.zoom = (_innerWidth / 1400);


        _cursor.style.display = "block";
    }
}

window.addEventListener("resize" , ()=> {
    responsive();
    closeHandler();
})


window.addEventListener("load" , responsive);


// MenuBar

const close = document.querySelector(".close");
const closeWrapper = document.querySelector(".closeWrapper");

const openHandler = () => {
    nav.style.right = "0";
    closeWrapper.style.display = 'block';
    document.documentElement.style.overflow = "hidden";
}

const closeHandler = () => {
    nav.style.right = "-100%";
    closeWrapper.style.display = "none";
    document.documentElement.style.overflow = "auto";
}


close.addEventListener("click" , closeHandler);
menuButton.addEventListener("click" , openHandler);
closeWrapper.addEventListener("click" , closeHandler);
// nav.querySelector("*").forEach(ele => {
//     ele.addEventListener("click" , closeHandler);
// });


// On scroll animation

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show')
        }else {
            entry.target.classList.remove('show')
        }
    })
})

const tags = ['p', 'h1', 'h2', 'h3', 'a', 'button'];

tags.forEach((tag) => {
    const hiddenElements = document.querySelectorAll(tag);
    hiddenElements.forEach((el) => observer.observe(el));
});