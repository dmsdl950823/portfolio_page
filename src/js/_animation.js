import anime from './animejs/lib/anime.es.js';


// elements
const work_sect = document.getElementById('works');
const workdiv = document.querySelectorAll('.workdiv');
const about_sect = document.getElementById('about');
const quer = document.querySelectorAll('.workLists');
const TOP = document.getElementById('top');

var aboutquery = window.matchMedia("(max-width: 375px)")


const targetGenerator = function(select, child1, Boolimg) {
    switch (Boolimg) {
        case true: {
            return quer[select].childNodes[child1].querySelector('.imageSect')
        }
        case false: {
            return quer[select].childNodes[child1].querySelector('.work_cont > a')
        }
    }
};

const workAnimationGenerator = function(select, child1, Boolimg, side) {
    let animate = {};
    if (side === 1 || side === 0) {
        let transX;
        switch (side) {
            // right: 1 , left: 0
            case 1: transX = -80; break;
            case 0 : transX = 80; break;
        }

        animate = {
            targets: targetGenerator(select, child1, Boolimg),
            translateX: transX,
            translateY: -90,
            opacity: 1,
            duration: 500,
            easing: 'easeInCubic',
        };
    } else { // side === 3 ※ '.work_cont > a'
        animate = {
            targets: targetGenerator(select, child1, Boolimg),
            translateY: -124,
            // delay: 500,
            duration: 500,
            opacity: 1,
            easing: 'easeOutQuart',
        }
    }
    return animate;
};


const topBttnAction = () => {
    addEvent('click', TOP, function (e) {
        let myscroll = document.documentElement.scrollTop;
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    })
};

// offsets
const wk_offset = work_sect.offsetTop;
function workdivs_offset() {
    let off_num = [];
    let i = 0;
    while (i < workdiv.length) {
        off_num.push(workdiv[i].offsetTop);
        i++;
    }
    return off_num;

}
const workoffsets = workdivs_offset();
const aboutoffsets = about_sect.offsetTop;


// worksection offsets
const workoffsets_2 = workoffsets[1] - 100;  // work2 box
const workoffsets_3 = workoffsets[2] - 100;  // work3 box

const workoffsets_math2 = (workoffsets_3 - workoffsets_2) / 2 + workoffsets_2;
const workoffsets_math3 = (aboutoffsets - workoffsets_3) + ( aboutoffsets / 2 );


function scrollAction() {

    let myscroll = document.documentElement.scrollTop;
    let myscroll_m = Math.floor(myscroll);

    console.log( 'my scroll ' + myscroll_m);

    // Animation for 'work/about background'

    if ( myscroll_m > 0) {  // => Start animating from header / 2
        TOP.style.opacity = 1;

        anime({
            targets: '.workback',
            translateX: myscroll_m / 2,
            easing: 'linear',
            duration: 300
        });

        anime({
            targets: '.aboutback',
            translateX: -myscroll_m / 2,
            easing: 'linear',
            duration: 300
        });

    } else {
        TOP.style.opacity = 0;
    }
    // header end

    // work 1 start
    if ( myscroll_m >= workoffsets[0] - 200 &&        // Start work1 ~ 1/2
         myscroll_m < workoffsets_2 / 2 - 200 ) {
        // anime(workAnimationGenerator(0, 0, true, 0));  // image
        // anime(workAnimationGenerator(0, 0, false, 3));  // work_titles
    }
    else if (myscroll_m >= workoffsets_2 / 2 - 200 &&  // start work 1/2 ~ 2
             myscroll_m < workoffsets_2 - 200) {
        // anime(workAnimationGenerator(0, 1, true, 1));
        // anime(workAnimationGenerator(0, 1, false, 3));
    }

    // work 2 start
    else if (myscroll_m >= workoffsets_2 - 200 &&
            myscroll_m < workoffsets_math2 - 200) {    // Start work2 ~ 1/2
        // anime(workAnimationGenerator(1, 0, true, 0));
        // anime(workAnimationGenerator(1, 0, false, 3));
    }
    else if (myscroll_m >= workoffsets_math2 - 200 &&
            myscroll_m < workoffsets_3 - 200) {        // start work1/2 ~ 3
        // anime(workAnimationGenerator(1, 1, true, 1));
        // anime(workAnimationGenerator(1, 1, false, 3));
    }

    // work 3 start
    else if (myscroll_m >= workoffsets_3 - 200 &&
            myscroll_m < workoffsets_math3 - 200) {        // start work3 ~ 1/2
        // anime(workAnimationGenerator(2, 0, true, 0));
        // anime(workAnimationGenerator(2, 0, false, 3));
    }
    else if (myscroll_m >= workoffsets_math3 - 200 &&
            myscroll_m < aboutoffsets - 200) {        // start work1/2 ~ about
        // anime(workAnimationGenerator(2, 1, true, 1));
        // anime(workAnimationGenerator(2, 1, false, 3));
    }
    // works end

    // about start
    else if ( myscroll_m >= aboutoffsets + 200 ) {
        let targetAni = {
            targets: '.profile_name',
            duration: 500,
            opacity: 1,
            easing: 'easeOutQuart',
        };

        if (aboutquery.matches) {
            targetAni.translateY = -44;
            anime(targetAni);
        } else {
            targetAni.translateY = -60;
            anime(targetAni);
        }

    }

}

// crossbrowsing
function addEvent(evnt, elem, func) {
   if (elem.addEventListener)
      elem.addEventListener(evnt, func, false);   // W3C DOM
   else if (elem.attachEvent) {
      elem.attachEvent("on"+evnt, func);          // IE DOM
   }
}


export const animation = () => {


    // document.addEventListener('scroll', scrollAction)
    addEvent('scroll', document, scrollAction);
    topBttnAction();




};


