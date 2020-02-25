import anime from './animejs/lib/anime.es.js';




// elements
const header = document.getElementById('header');
const work_sect = document.getElementById('works');
const workdiv = document.querySelectorAll('.workdiv');


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



export const animation = () => {

    document.addEventListener('scroll', (e) => {

        let myscroll = document.documentElement.scrollTop;
        let myscroll_m = Math.floor(myscroll);

        // Animation for 'Workworkwork...'
        if ( myscroll_m >= wk_offset / 2) {  // => Start animating from header / 2
            // console.log('Worksworksworks.......')

            anime({
                targets: '#workback',
                rotate: '1turn',
                duration: 1000
            });
        }

        //
        if ( myscroll_m >= workoffsets[0] && myscroll_m < workoffsets[1]) {
            console.log(workoffsets[0] + 'we just passed here')

        }
        else if (myscroll_m >= workoffsets[1] && myscroll_m < workoffsets[2]) {
            console.log(workoffsets[1] + 'we just passed here')

        }
        else if (myscroll_m >= workoffsets[2]){
            console.log(workoffsets[2] + 'we just passed here')

        }


        // if (myscroll > wk_offset) {
            // Inside 'work' scroll

            // console.log(wk_offset / 2)

        // }
    })



};


