import { animation } from './_animation';
animation();

// =========================

// === Language button ===
const lanBtn = document.getElementById('language');
const imageSects = document.querySelectorAll('.imageSect');
const work_cont_strong = document.querySelectorAll('.work_cont strong');
const work_cont_p = document.querySelectorAll('.work_cont p');
const about_desc = document.querySelector('.desc');


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
            // const param = parseInt(window.location.hash.replace('#', ''));
            data_Event(data)
        }
    };
    xhttp.open('GET', '../json/coverWork.json', true);
    xhttp.send();
}



function data_Event(data) {
    addListner(lanBtn, 'click', (event) => {
        const contents = data.filter(_filter => _filter.title);
        const about_data = data.filter(_filter => _filter.title === '');

        const dataMap_eng = contents.map(_data => _data.desc_eng);
        const dataMap_kor = contents.map(_data => _data.desc_kor);

        const about_eng = about_data.map(_data => _data.desc_eng);
        const about_kor = about_data.map(_data => _data.desc_kor);


        let lanchecked = lanBtn.checked;
        if (!lanchecked) {
            // English
            console.log('click true');
            checkedEvent(dataMap_eng, about_eng);
        } else {
            // Korean
            console.log('click false');
            checkedEvent(dataMap_kor, about_kor);
        }
    });
}

function checkedEvent(dataMap, about) {
    for (let i = 0; i < work_cont_strong.length; i++) {
        // console.log(work_cont_strong[i]
        // console.log(work_cont_p[i])

        if (work_cont_p[i] !== undefined) {
            work_cont_p[i].innerHTML = dataMap[i];
        }
    }
    about_desc.innerHTML = about[0]
}

function backimages() {
    for (let i = 0; i < imageSects.length; i++ ) {
        imageSects[i].style.background = `url(../images/mock_${i + 1}.jpg) no-repeat`;
        imageSects[i].style.backgroundSize = `100% 100%`;
    }
}

backimages();
jsonLoad();
