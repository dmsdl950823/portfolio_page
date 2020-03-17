export const mainRotation = () => {

    const header = document.getElementById('header');
    const cube = document.querySelector('.cube');

    function addListner(element, type, handler) {
        if (element.addEventListner) {
          element.addEventListner(type, handler, false);
        } else if (element. attachEvent) {
          element.attachEvent("on"+type, handler);
        } else {
          element["on" + type] = handler;
        }
    }

    const transformY = 28;
    const rotateX = 90;
    let T_num = 0;
    let R_num = 0;

    addListner(header, 'click', () => {
        T_num++;
        R_num++;

        if (R_num === 4) {
            R_num = 0;
        }
        if (T_num === 3) {
            T_num--;
            T_num -= 1;
        }

        let transY = transformY * T_num;
        let rotate = rotateX * R_num;

        if (rotate === 0 ) {
            transY = 0;
        }

        cube.style.transform = `
            translateY(${ transY }px) 
            rotateX(${ rotate }deg)
        `;

    })
};
