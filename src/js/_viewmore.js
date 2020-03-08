

// =========

function jsonLoad() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText);
            const param = parseInt(window.location.hash.replace('#', ''));
            jsonapplier(data, param);
        }
    };
    xhttp.open('GET', '../json/works.json', true);
    xhttp.send();
};

function jsonapplier(data, param) {
    let types = param;

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
          // dots: true,
          centerMode: true,
          focusOnSelect: true
        });

        // mapping data into DOM
        // let dataMap = [];
        const mapped_data = filtered_data.map(_data => {

            const largeimages = `<div>
                                    <a href="/" class="page_anchor" target="_blank">
                                        <img src="../images/${ _data.src }.jpg" alt=${ _data.id } />
                                    </a>
                                    <h3 class="largeTitle">${ _data.title }</h3>
                                </div>`;

            const smallimages = `<div>
                                    <img src="../images/${ _data.src }.jpg" alt=${ _data.id } />
                                    <p class="smallTitle"><span>${_data.title}</span></p>
                                </div>`;



            $('.slider-for').slick('slickAdd', largeimages);
            $('.slider-nav').slick('slickAdd', smallimages);
        });


    });



    console.log(data)
}


jsonLoad();

