let toggleMain = document.getElementById('toggle_main');//btn
let main = document.getElementById('controller');//content
let toggleEssay = document.getElementById('toggle_about');//btn
let essay = document.getElementById('essay');//content
let toggleParams = document.getElementById('toggle_params');//btn
let params = document.getElementById('params');

let sum = document.getElementById('sum');
let close_sum = document.getElementById('sum');
let mobil = document.getElementById('menu_mobil');

function display_controller(){
    main.style.display = 'block';
    essay.style.display = 'none';
    params.style.display = 'none';
  }
function display_essay(){
    main.style.display = 'none';
    essay.style.display = 'block';
    params.style.display = 'none';
  }
function display_params(){
    main.style.display = 'none';
    essay.style.display = 'none';
    params.style.display = 'block';
}
function menu_mobil(){
    sum.style.display = 'block';
    mobil.style.left = '0px';
    mobile.style.padding = '10px';
    mobil.style.paddingRight = "0%";
}
function closer(){
    close_sum.style.display='none';
    mobil.style.left = '-50px';
    mobil.style.paddingRight = "2.5%";
}