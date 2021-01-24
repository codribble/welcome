const toDoForm = document.getElementById("toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pendingList = document.querySelector(".pendingList");
const finishedList = document.querySelector(".finishedList");

const PENDING_LS = "PENDING";
const FINISHED_LS = 'FINISHED';

let pending = [];
let finished = [];

function deleteToDo(e){
    e.preventDefault();
  
    const btn = e.target;
    const li = btn.parentNode;
    const ul = li.parentNode.className;
  
    if( ul === 'pendingList'){
      pendingList.removeChild(li);
    
      const cleanToDos = pending.filter(function(pending){
        return pending.id !== parseInt(li.id);
      });
  
      pending = cleanToDos;
  
      saveToDos();
    }else{
      finishedList.removeChild(li);
  
      const cleanToDos = finished.filter(function(finished){
        return finished.id !== parseInt(li.id);
      });
  
      finished = cleanToDos;
  
      saveFinished();
    }
  }
  
  function finishedToDo(e){
    e.preventDefault();
    
    const btn = e.target;
    const li = btn.parentNode;
    const ul = li.parentNode.className;
    const span = li.querySelector('span');
    const text = span.innerText;
    const id = li.id;
  
    const obj = {
      text: text,
      id: id
    };
  
    if( ul === 'finishedList' ){
      finishedList.removeChild(li);
      pendingList.appendChild(li);
  
      const cleanToDos = finished.filter(function(finished){
        return finished.id !== parseInt(li.id);
      });
  
      finished = cleanToDos;
  
      pending.push(obj);
    }else{  
      pendingList.removeChild(li);
      finishedList.appendChild(li);
    
      const cleanToDos = pending.filter(function(pending){
        return pending.id !== parseInt(li.id);
      });
    
      pending = cleanToDos;
    
      finished.push(obj);
    }  
  
    saveToDos();
    saveFinished();
  }
  
  function saveFinished(){
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
  }
  
  function saveToDos(){
    localStorage.setItem(PENDING_LS, JSON.stringify(pending));
  }
  
  function paintToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const finBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = pending.length + 1;
    delBtn.id = "del-"+newId;
    delBtn.addEventListener('click', deleteToDo);
    finBtn.id = 'fin-'+newId;
    finBtn.addEventListener('click', finishedToDo);
    span.innerText = text;
  
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    li.appendChild(span);
    li.id = newId;
  
    pendingList.appendChild(li);
  
    const toDoObj = {
      text: text,
      id: newId
    }
  
    pending.push(toDoObj);
    saveToDos();
  }
  
  function paintFinishedToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const finBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = finished.length + 1;
    delBtn.id = "del-"+newId;
    delBtn.addEventListener('click', deleteToDo);
    finBtn.id = 'fin-'+newId;
    finBtn.addEventListener('click', finishedToDo);
    span.innerText = text;
  
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    li.appendChild(span);
    li.id = newId;
  
    finishedList.appendChild(li);
  
    const toDoObj = {
      text: text,
      id: newId
    }
  
    finished.push(toDoObj);
    saveFinished();
  }
  
  function handelSubmit(e){
    e.preventDefault();
  
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
  }
  
  function loadToDos() {
    const pendingToDos = localStorage.getItem(PENDING_LS);
    const finishedToDos = localStorage.getItem(FINISHED_LS);
  
    if (pendingToDos !== null) {
      const parsedPendingToDos = JSON.parse(pendingToDos);
      
      parsedPendingToDos.forEach(function(pending){
        paintToDo(pending.text);
      });
    }
  
    if(finishedToDos !== null) {
      const parsedFinishedToDos = JSON.parse(finishedToDos);
  
      parsedFinishedToDos.forEach(function(finished){
        paintFinishedToDo(finished.text);
      });
    }
  }
  
  function init() {
    loadToDos();
  
    toDoForm.addEventListener('submit', handelSubmit);
  }
  
  init();