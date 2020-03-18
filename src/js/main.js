import { animation } from './_animation';
import { mainRotation } from './_mainRotation';
animation();
mainRotation();



// === Language button ===
const lanBtn = document.getElementById('language');
const imageSects = document.querySelectorAll('.imageSect');
const work_cont_strong = document.querySelectorAll('.work_cont strong');
const work_cont_p = document.querySelectorAll('.work_cont p');
const about_desc = document.querySelector('.career');
const contrib = document.querySelector('.contrib');
const designed = document.querySelector('.designed');
const d_graph = document.querySelectorAll('.d_graph');
const c_graph = document.querySelectorAll('.c_graph');
const imgAnchor = document.querySelectorAll('.imgAnchor');


function addListner(element, type, handler) {
    if (element.addEventListner) {
      element.addEventListner(type, handler, false);
    } else if (element. attachEvent) {
      element.attachEvent("on"+type, handler);
    } else {
      element["on" + type] = handler;
    }
}

function jsonLoad() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText);
            // console.log(data)
            data_Event(data)
        }
    };
    xhttp.open('GET', '../json/coverWork.json', true);
    xhttp.send();
}



function data_Event(data) {

    const contents = data.filter(_filter => _filter.contribution !== null);

    const contrib_g = contents.map(_data => _data.contribution);
    const design_g = contents.map(_data => _data.design);
    const href = contents.map(_data => _data.href);

    for (let i = 0; i < c_graph.length; i++) {
        if (c_graph[i] !== undefined) {
            c_graph[i].style.width = contrib_g[i] + '%';
        }
    }

    for (let i = 0; i < d_graph.length; i++) {
        if (d_graph[i] !== undefined) {
            d_graph[i].style.width = design_g[i] + '%';
        }
    }

    for (let i = 0; i < imgAnchor.length; i++) {
        if (imgAnchor[i] !== undefined) {
            imgAnchor[i].setAttribute('href', href[i]);
            imgAnchor[i].setAttribute('target', '_blank');
        }
    }

    addListner(lanBtn, 'click', (event) => {
        const about_data = data.filter(_filter => _filter.contribution === null);

        const dataMap_eng = contents.map(_data => _data.desc_eng);
        const dataMap_kor = contents.map(_data => _data.desc_kor);

        const about_eng = about_data.map(_data => _data.desc_eng);
        const about_kor = about_data.map(_data => _data.desc_kor);


        let lanchecked = lanBtn.checked;
        if (!lanchecked) {
            // English
            console.log('click true');
            checkedEvent(dataMap_kor, about_kor);
        } else {
            // Korean
            console.log('click false');
            checkedEvent(dataMap_eng, about_eng);
        }

    });
}




function checkedEvent(dataMap, about) {

    for (let i = 0; i < work_cont_strong.length; i++) {
        if (work_cont_p[i] !== undefined) {
            work_cont_p[i].innerHTML = dataMap[i];
        }
    }
    about_desc.innerHTML = about[0];
}


function backimages() {
    for (let i = 0; i < imageSects.length; i++ ) {
        imageSects[i].style.background = `url(../images/mock_${i + 1}.jpg) no-repeat`;
        imageSects[i].style.backgroundSize = `100% 100%`;
    }
}

backimages();
jsonLoad();
