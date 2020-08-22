console.log('work');

// Object for the song

let singers = [];

// Grabe some element from html 

const infoSinger = document.querySelector('.table_for_input_value');
const formList = document.querySelector('form');


// fuction to generate the information of the singer

const giveInfoOfSinger = () => {
  const html = singers.map(singer => {
    return `
          <ul class="infolist">
            <li class="image">
               <img src="">
            </li>
            <li class="table_musicstyle_name">
              ${singer.title} <br>
              ${singer.style}
            </li>
            <li class="table_name_of_artist">
              ${singer.name} <br>
              ${singer.legth}
            </li>
            <li class="table_score">
              Score : 10
            </li>
            <li>
              <button class="plus_button">+1</button>
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
};

const deleletSinger = id => {
  singers = singers.filter(singer => singer.id !== id);
  infoSinger.dispatchEvent(new CustomEvent('listUpdated'));
}

// Event listener of the delete button
infoSinger.addEventListener('click', handleClick);

// Event listener which generate the new singer
formList.addEventListener('submit', addSinger);
infoSinger.addEventListener('listUpdated', giveInfoOfSinger)


  

