

// =========

function jsonLoad() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText);
            jsonapplier(data);
        }
    };
    xhttp.open('GET', '../json/works.json', true);
    xhttp.send();
};

function jsonapplier(data) {
    let types = 0;

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
          dots: true,
          centerMode: true,
          focusOnSelect: true
        });

        // mapping data into DOM
        // let dataMap = [];
        const mapped_data = filtered_data.map(_data => {
            $('.slider-for').slick('slickAdd', `<div>${ _data.title }</div>`)
            $('.slider-nav').slick('slickAdd', `<div>${ _data.title }</div>`)
        });


    });



    console.log(filtered_data)
}


jsonLoad();

