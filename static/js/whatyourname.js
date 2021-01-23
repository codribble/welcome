const form = document.getElementById('askName');
const toDo = document.getElementById('toDo');
const intro = toDo.querySelector('.intro');
const somethingName = document.getElementById('name');

const NAME_LS = 'name';

function handleName(e){
    const name = e.target.value;

    if( name.length != 0 )
        somethingName.classList.add('on');
    else
        somethingName.classList.remove('on');
}

function whoareyou(){
    const yourName = localStorage.getItem(NAME_LS);

    if( yourName === null ){
        form.style.display = 'block';
        toDo.style.display = 'none';
    }else{
        form.style.display = 'none';
        toDo.style.display = 'block';
        intro.innerText = `Welcome! ${yourName}!`;
    }
}

function handleMemoryName(){
    const who = somethingName.value;

    localStorage.setItem(NAME_LS, who);
}

function init(){
    whoareyou();

    form.addEventListener('submit', handleMemoryName);
    somethingName.addEventListener('keyup', handleName);
}

init();