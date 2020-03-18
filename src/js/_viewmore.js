
function jsonLoad() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            try {
                const data = JSON.parse(this.responseText);
                const param = parseInt(window.location.hash.replace('#', ''));
                // console.log(data)
                const title_param = decodeURI(window.location.hash).split('#')[2];
                jsonapplier(data, param, title_param);
            } catch (e) {
                console.log(e)
            }
        }
    };
    xhttp.open('GET', '../json/works.json', true);
    xhttp.send();
}

function jsonapplier(data, param, title_param) {
    let types = param;

    console.log(data);

    // Insert subTitle
    const subTitle = document.getElementById('subTitle');
    subTitle.innerHTML = title_param;

    const matchMedia = window.matchMedia("(max-width: 375px)").matches;

    // filtering data with type
    const filtered_data = data.filter(_data => _data.work_type === types);

    $(document).ready(function(){
        // slider
       $('.slider-for').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: '.slider-nav'
        });

        $('.slider-nav').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: '.slider-for',
          dots: matchMedia,
          centerMode: true,
          focusOnSelect: true
        });

        // mapping data into DOM
        const mapped_data = filtered_data.map(_data => {

            let webData;

            const browser_ = () => {
                let browserList = [];
                if (_data.browser !== null) {
                    const browser = _data.browser;
                    const browser_split = browser.split(', ');

                    for (let i = 0; i <browser_split.length; i++ ){
                        // console.log(browser_split[i])
                        browserList.push(`<li>${browser_split[i]}</li>`);
                    }
                    return browserList.toString().replace(/,/g, '');
                }
            };


            if (title_param === 'Web Page') {
                webData = `
                    <div class="dataContribution_wrap">
                        <div class="data_contribution">
                            <p>
                                <strong>Participation</strong>
                                <span>
                                    ${_data.participate} %
                                    <small class="g_back">
                                        <i class="graph"></i>
                                    </small>
                                </span>
                            </p>
                            <p>
                                <strong>Coding</strong>
                                <span>
                                    ${_data.coding} %
                                    <small class="g_back">
                                        <i class="graph"></i>
                                    </small>
                                </span>
                            </p>
                            <p>
                                <strong>Design</strong>
                                <span>
                                    ${_data.design} %
                                    <small class="g_back">
                                        <i class="graph"></i>
                                    </small>
                                </span>
                            </p>
                        </div>
                        <div class="desc_brwz_wrap">
                            <p class="data_desc">${_data.description}</p>
                            <div class="browzer">
                                <strong>CrossBrowser</strong>
                                <ul>
                                    ${browser_()}
                                </ul>
                            </div>
                        </div>
                    </div>`;
            } else {
                webData = `
                    <div class="dataContribution_wrap">
                        <div class="data_contribution __data_contribution">
                            <p>
                                <strong>Participation</strong>
                                <span>
                                    ${_data.participate}%
                                    <small class="g_back">
                                        <i class="graph"></i>
                                    </small>
                                </span>
                            </p>
                            <p>
                                <strong>Design</strong>
                                <span>
                                    ${_data.design} %
                                    <small class="g_back">
                                        <i class="graph"></i>
                                    </small>
                                </span>
                            </p>
                        </div>
                        <div class="desc_brwz_wrap __desc_brwz_wrap">
                            <p class="__data_desc">${_data.description}</p>
                        </div>
                    </div>`;
            }


            const top_slide = `<div>
                                    <a href="/" class="page_anchor" target="_blank">
                                        <img src="../images/${ _data.img_src }.jpg" alt=${ _data.id } />
                                    </a>
                                    <h3 class="largeTitle">${ _data.title }</h3>
                                    <h4 class="dataSubTit">${ _data.subtitle }</h4>
                                    ${webData}
                                </div>`;

            const bottom_slide = `<div>
                                    <img src="../images/${ _data.img_src }.jpg" alt=${ _data.id } />
                                    <p class="smallTitle"><span>${_data.title}</span></p>
                                </div>`;



            $('.slider-for').slick('slickAdd', top_slide);
            $('.slider-nav').slick('slickAdd', bottom_slide);
        });


    });



    // console.log(data)
}


jsonLoad();

