import anime from './animejs/lib/anime.es.js';


function addEvent(evnt, elem, func) {
   if (elem.addEventListener)  // W3C DOM
      elem.addEventListener(evnt, func, false);
   else if (elem.attachEvent) { // IE DOM
      elem.attachEvent("on"+evnt, func);
   }
}




// elements
const header = document.getElementById('header');
const work_sect = document.getElementById('works');
const workdiv = document.querySelectorAll('.workdiv');
const about_sect = document.getElementById('about');
const quer = document.querySelectorAll('.workLists');



const targetGenerator = function(select, child1, Boolimg) {
    switch (Boolimg) {
        case true: {
            return quer[select].childNodes[child1].querySelector('.imageSect')
        }
        case false: {
            return quer[select].childNodes[child1].querySelector('.work_cont')
        }
    }
};

const workAnimationGenerator = function(select, child1, Boolimg, side) {
    // let animate = {};
    let transX;

    switch (side) {
        // right: 1 , left: 0
        case 1: transX = -80; break;
        case 0 : transX = 80; break;
    }

    let animate = {
        targets: targetGenerator(select, child1, Boolimg),
        translateX: transX,
        translateY: -90,
        opacity: 1,
        duration: 500,
        easing: 'easeInOutQuint',
    };

    return animate;
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


export const animation = () => {


    document.addEventListener('scroll', (e) => {
        let myscroll = document.documentElement.scrollTop;
        let myscroll_m = Math.floor(myscroll);

        console.log( 'my scroll ' + myscroll_m);

        // Animation for 'Workworkwork...'
        if ( myscroll_m >= wk_offset / 2 &&
             myscroll_m < workoffsets[0]) {  // => Start animating from header / 2
            anime({
                targets: '.workback',
                translateX: myscroll_m
            });
        }
        // header end

        // work 1 start
        if ( myscroll_m >= workoffsets[0] &&        // Start work1 ~ 1/2
             myscroll_m < workoffsets_2 / 2 ) {
            anime(workAnimationGenerator(0, 0, true, 0))
        }
        else if (myscroll_m >= workoffsets_2 / 2 &&  // start work 1/2 ~ 2
                 myscroll_m < workoffsets_2) {
            anime(workAnimationGenerator(0, 1, true, 1))
        }

        // work 2 start
        else if (myscroll_m >= workoffsets_2 &&
                myscroll_m < workoffsets_math2) {    // Start work2 ~ 1/2
            anime(workAnimationGenerator(1, 0, true, 0))
        }
        else if (myscroll_m >= workoffsets_math2 &&
                myscroll_m < workoffsets_3) {        // start work1/2 ~ 3
            anime(workAnimationGenerator(1, 1, true, 1))
        }

        // work 3 start
        else if (myscroll_m >= workoffsets_3 &&
                myscroll_m < workoffsets_math3) {        // start work3 ~ 1/2
            anime(workAnimationGenerator(2, 0, true, 0))
        }
        else if (myscroll_m >= workoffsets_math3 &&
                myscroll_m < aboutoffsets) {        // start work1/2 ~ about
            anime(workAnimationGenerator(2, 1, true, 1))
        }
        // works end

        // about start
        else if ( myscroll_m >= aboutoffsets ) {
            anime({
                targets: '.aboutback',
                translateX: Math.floor(myscroll_m - aboutoffsets)
            });
        }

    })





};


