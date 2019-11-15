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
    $('div').hide();
    $('div').fadeIn(1000);
};

// function boxRender(el) {
//     let templateMrkup = $('#box-template').html();
//     let template = Handlebars.compile(templateMrkup);
//     let hornOutput = template(el);
//     $('#box').append(hornOutput);
//     // $('div').hide();
//     // $('div').fadeIn(1000);
// };

function populateSelectBox() {
    let seen = {};
    let select = $('.filter');
    $(select).empty();
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
            $('#photo-template').html('');
            Horns.all.forEach(element => {
                element.render();
            });
        } else if ($('.sort').val() == 'number') {
            sortByNumOfHorns();            
            $('#photo-template').html('');
            Horns.all.forEach(element => {
                element.render();
            });
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

function sortByNumOfHorns() {
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

// $(`#photo-template`).on('click',function () { 
//     let clicked = $('#photo-template>div').attr('id');
//     boxRender(clicked);
//     console.log('as', clicked);
        
// });
$('.filter').on('change', function () {
    let selected = $(this).val();
    $('div').hide();
    $(`#${selected}`).fadeIn(1000);
    console.log('se', selected);
    
});

$(`button`).click(function () {
    let num = $(this).attr('id');
    showData(num);
});

function showData(pageNum) {
    $('#photo-template').html('');
    Horns.all = [];
    $.get(`../data/page-${pageNum}.json`)
        .then(data => {
            data.forEach(thing => {
                let horn = new Horns(thing)
                horn.render();
            });
        })
        .then(() => populateSelectBox())
        .then(() => populateSortBox())
}

$(document).ready(function () {
    showData(1)
});

// //Showing the rules of the game
// function show() {
//     // var inst = document.getElementById(`${this.keyword}`)
//     var foggy = document.getElementById('foggy')
//     // inst.setAttribute('style',' visibility: visible; opacity: .5; transition: opacity 1s');
//     foggy.setAttribute('style',' opacity:.5; transition: opacity 1s');
//   }
//   var visible = document.getElementById('photo-template')
//   visible.addEventListener('click', show)
  
  //Hiding the rules 
//   function hide() {
//     var inst = document.getElementById('back');
//     var foggy = document.getElementById('foggy');
//     inst.setAttribute('style','opacity:0; transition: opacity 1s; z-index:0');
//     foggy.setAttribute('style','opacity:0; transition: opacity 1s; z-index:0');
//   }
//   var hidden = document.getElementById('hide')
//   hidden.addEventListener('click', hide)