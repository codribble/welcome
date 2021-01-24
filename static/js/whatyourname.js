const askName = document.getElementById('askName');
const askNameForm = document.getElementById('askNameForm');
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
        askName.style.display = 'block';
        toDo.style.display = 'none';
    }else{
        askName.style.display = 'none';
        toDo.style.display = 'block';
        intro.innerHTML = `Welcome! <strong>${yourName}!</strong>`;
    }
}

function handleMemoryName(){
    const who = somethingName.value;

    localStorage.setItem(NAME_LS, who);
}

function init(){
    whoareyou();

    askNameForm.addEventListener('submit', handleMemoryName);
    somethingName.addEventListener('keyup', handleName);
}

init();