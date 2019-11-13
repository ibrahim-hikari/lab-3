'use strict'

function Horns(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    Horns.all.push(this);
}

Horns.all = [];

Horns.prototype.render = function () {

    let templateMrkup = $('#horns-template').html();
    let template = Handlebars.compile(templateMrkup);
    let hornOutput = template(this);
    $('#photo-template').append(hornOutput);
};

function populateSelectBox() {
    let seen = {};
    let select = $('.filter');
    Horns.all.forEach(horn => {
        if (!seen[horn.keyword]) {
            let option = `<option value = "${horn.keyword}">${horn.keyword}</option>`;
            select.append(option);
            seen[horn.keyword] = true;

        }

    })

}
function populateSortBox() {
    $('.sort').on('change', function () {
        if ($('.sort').val() == 'title') {
            sortingByTitle();
            // $('div').hide();
            // $(`.${selected}`).fadeIn(1000);
            console.log('asd', Horns.all);
        } else if ($('.sort').val() == 'number') {
            sortingByNumOfHorns();
            console.log('asd', Horns.all);
        } else {
            console.log('asd');
        }
    });

}

/// modified from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

function sortingByTitle() {
    Horns.all.sort(function (a, b) {
        var nameA = a.title
        var nameB = b.title
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });
}

function sortingByNumOfHorns() {
    Horns.all.sort(function (a, b) {
        var numA = a.horns
        var numB = b.horns
        if (numA < numB) {
            return -1;
        }
        if (numA > numB) {
            return 1;
        }

        return 0;
    });
}


$('.filter').on('change', function () {
    let selected = $(this).val();
    $('div').hide();
    $(`.${selected}`).fadeIn(1000);
});


$('.page-1').on('click', function () {
    let packeage = $('main').html
    $.get('../data/page-1.json')
    .then(data => {
        data.forEach(thing => {
            let horn = new Horns(thing)
            horn.render();
        });
    })
    .then(() => populateSelectBox())
    .then(() => populateSortBox())

});

$('.page-2').on('click', function () {
$.get('../data/page-2.json')
    .then(data => {
        data.forEach(thing => {
            let horn = new Horns(thing)
            horn.render();
        });
    })
    .then(() => populateSelectBox())
    .then(() => populateSortBox())
});