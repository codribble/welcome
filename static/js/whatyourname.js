const somethingName = document.getElementById('name');

function handleName(e){
    const name = e.target.value;

    if( name.length != 0 )
        somethingName.classList.add('on');
    else
        somethingName.classList.remove('on');
}

function init(){
    somethingName.addEventListener('keyup', handleName);
}

init();