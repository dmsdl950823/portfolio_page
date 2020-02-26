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
            anime({
                targets: quer[0].childNodes[0],
                rotate: 400,
                duration: 1000
            });
        }
        else if (myscroll_m >= workoffsets_2 / 2 &&  // start work 1/2 ~ 2
                 myscroll_m < workoffsets_2) {
            anime({
                targets: quer[0].childNodes[1],
                rotate: 200,
                duration: 1000
            });
        }

        // work 2 start
        else if (myscroll_m >= workoffsets_2 &&
                myscroll_m < workoffsets_math2) {    // Start work2 ~ 1/2
            anime({
                targets: quer[1].childNodes[0],
                rotate: 400,
                duration: 1000
            });
        }
        else if (myscroll_m >= workoffsets_math2 &&
                myscroll_m < workoffsets_3) {        // start work1/2 ~ 3
            anime({
                targets: quer[1].childNodes[1],
                rotate: 200,
                duration: 1000
            });
        }

        // work 3 start
        else if (myscroll_m >= workoffsets_3 &&
                myscroll_m < workoffsets_math3) {        // start work3 ~ 1/2
            anime({
                targets: quer[2].childNodes[0],
                rotate: 400,
                duration: 1000
            });
        }
        else if (myscroll_m >= workoffsets_math3 &&
                myscroll_m < aboutoffsets) {        // start work1/2 ~ about
            anime({
                targets: quer[2].childNodes[1],
                rotate: 200,
                duration: 1000
            });
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


