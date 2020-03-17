

// =========

function jsonLoad() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText);
            const param = parseInt(window.location.hash.replace('#', ''));
            const title_param = decodeURI(window.location.hash).split('#')[2];
            jsonapplier(data, param, title_param);
        }
    };
    xhttp.open('GET', '../json/works.json', true);
    xhttp.send();
}

function jsonapplier(data, param, title_param) {
    let types = param;

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
          slidesToScroll: 3,
          asNavFor: '.slider-for',
          dots: matchMedia,
          centerMode: true,
          focusOnSelect: false
        });

        // mapping data into DOM
        const mapped_data = filtered_data.map(_data => {

            let webData;

            if (title_param === 'Web Page') {
                webData = `
                    <div class="dataContribution_wrap">
                        <div class="data_contribution">
                            <p>
                                <strong>Participation</strong>
                                <span> 30 %</span>
                            </p>
                            <!--${_data.contribution}-->
                            <p>
                                <strong>Coding</strong>
                                <span>40 %</span>
                            </p>
                            <p>
                                <strong>Design</strong>
                                <span>50 %</span>
                            </p>
                        </div>
                        <div class="desc_brwz_wrap">
                            <p class="data_desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <div class="browzer">
                                <strong>CrossBrowser</strong>
                                <ul>
                                    <li>${_data.browser}</li>
                                    <li>${_data.browser}</li>
                                    <li>${_data.browser}</li>
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
                                <span> 30 %</span>
                            </p>
                            <!--${_data.contribution}-->
                            <p>
                                <strong>Design</strong>
                                <span>50 %</span>
                            </p>
                        </div>
                        <div class="desc_brwz_wrap __desc_brwz_wrap">
                            <p class="__data_desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                    </div>`;
            }


            const largeimages = `<div>
                                    <a href="/" class="page_anchor" target="_blank">
                                        <img src="../images/${ _data.src }.jpg" alt=${ _data.id } />
                                    </a>
                                    <h3 class="largeTitle">${ _data.title }</h3>
                                    <h4 class="dataSubTit">${ _data.subtitle }</h4>
                                    ${webData}
                                </div>`;

            const smallimages = `<div>
                                    <img src="../images/${ _data.src }.jpg" alt=${ _data.id } />
                                    <p class="smallTitle"><span>${_data.title}</span></p>
                                </div>`;



            $('.slider-for').slick('slickAdd', largeimages);
            $('.slider-nav').slick('slickAdd', smallimages);
        });


    });



    // console.log(data)
}


jsonLoad();

