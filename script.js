

// Empty object for the song

let singers = [];

// Grabe some element from html 

const infoSinger = document.querySelector('.table_for_input_value');
const formList = document.querySelector('form');


// fuction to generate the information of the singer

const giveInfoOfSinger = () => {

  // The html 
  const html = singers.map(singer => {
    return `
          <ul class="infolist">
            <li class="image">
               <img src="${singer.picture}" alt="">
            </li>
            <li class="table_musicstyle_name">
             <strong> ${singer.title}</strong> <br>
              ${singer.style}
            </li>
            <li class="table_name_of_artist">
              <strong>${singer.name}</strong> <br>
              ${singer.legth}
            </li>
            <li class="table_score">
              Score:<input id="number"  style ="border:none" value =" 0" />
            </li>
            <li>
              <button class="plus_button" >+1</button>
            </li>
            <li>
              <button class = "delete-btn" data-song="${singer.id}">
                <img src="./assets/delete.png" alt="Delete ${singer.title}">
              </button>
            </li>
          </ul>`
  }).join('');

  infoSinger.innerHTML = html;

};

giveInfoOfSinger()
// Function for adding information of the song
const addSinger = e => {

  e.preventDefault();
  const listForm = e.currentTarget;

// Adding the new list of singer

  const newSinger = {
    title : listForm.title.value,
    name: listForm.name.value,
    style: listForm.style.value,
    legth: listForm.legth.value,
    picture: listForm.picture.value,
    id: Date.now(),
    
  };
  
  singers.push(newSinger);
  infoSinger.dispatchEvent(new CustomEvent('listUpdated'));

  listForm.reset();
  console.log(singers);
}




// Function delete button

const handleClick = e => {
  const deleteBtn = e.target.closest('button.delete-btn');
  if(deleteBtn) {
    const id = Number(deleteBtn.dataset.song);
    deleletSinger(id);
    console.log(id);
  }
//function for adding the score

  const pulsBtn = e.target.matches('button.plus_button');
    
  if(pulsBtn) {
    const id = e.target.closest('.table_score');

    function increasScore () {
      var value = parseInt(document.getElementById('number').value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      document.getElementById('number').value = value;
    }
    increasScore()
  }

 
}






const deleletSinger = id => {
  singers = singers.filter(singer => singer.id !== id);
  infoSinger.dispatchEvent(new CustomEvent('listUpdated'));
}

// Fuction for the localStorage

const originLocalStorage = () => {
  const infoListSinger = JSON.parse(localStorage.getItem('singers'));

  if (infoListSinger) {
    singers = infoListSinger;
  }

  infoSinger.dispatchEvent(new CustomEvent('listUpdated'));
};

const newLocalStorage = () => {
  localStorage.setItem('singers', JSON.stringify(singers));
}



// Event listener of the delete button
infoSinger.addEventListener('click', handleClick);

// Event listener which generate the new singer
formList.addEventListener('submit', addSinger);
infoSinger.addEventListener('listUpdated', giveInfoOfSinger)

// Event listener fo local storage

infoSinger.addEventListener('listUpdated', newLocalStorage);


originLocalStorage();

