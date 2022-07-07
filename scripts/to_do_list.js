document.addEventListener('DOMContentLoaded', function () {

  // get date
  const n = new Date();
  const y = n.getFullYear();
  const m = n.getMonth() + 1;
  const d = n.getDate();
  const all_weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekday = all_weekdays[n.getDay()];
  const today = `${weekday} ${m}/${d}/${y}`;

  const title = document.querySelector("#date").append(today);

  // main variables
  const todayList = document.querySelector('#today__list ul');
  const forms = document.forms;

  // done items
  todayList.addEventListener('click', (e) => {
    if (e.target.className == 'to__do__item' || e.target.className == 'done') {
      const li = e.target.parentElement;
      li.remove();
    }
  });

  // add items
  const addForm = forms['add-item'];
  addForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // create elements
    const value = addForm.querySelector('input[type="text"]').value;
    const li = document.createElement('li');
    const itemName = document.createElement('span');
    const doneBtn = document.createElement('span');
    const reschedule__tomorrow__button = document.createElement('span');

    // add text content
    itemName.textContent = value;
    doneBtn.textContent = 'done';
    reschedule__tomorrow__button.textContent = 'tomorrow';

    // add classes
    itemName.classList.add('to__do__item');
    doneBtn.classList.add('done');
    reschedule__tomorrow__button.classList.add('reschedule');

    // append to DOM
    li.appendChild(itemName);
    li.appendChild(doneBtn);
    li.appendChild(reschedule__tomorrow__button);
    todayList.appendChild(li);

    // reset input field as blank
    addForm.reset();
  });

  // hide items
  const hideBox = document.querySelector('#hide');
  hideBox.addEventListener('change', function (e) {
    if (hideBox.checked) {
      todayList.style.display = "none";
    } else {
      todayList.style.display = "initial";
    }
  });

  // filter items
  const searchBar = forms['search__items'].querySelector('input');
  searchBar.addEventListener('keyup', (e) => {
    const lookup = e.target.value.toLowerCase();
    const items = todayList.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
      const things__to__do = item.firstElementChild.textContent;
      if (things__to__do.toLowerCase().includes(lookup)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // tabbed content
  const tabs = document.querySelector('.tabs');
  const panels = document.querySelectorAll('.panel');
  tabs.addEventListener('click', (e) => {
    if (e.target.tagName == 'LI') {
      const viewPanel = document.querySelector(e.target.dataset.view);
      Array.from(panels).forEach((panel) => {
        if (panel == viewPanel) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    }
  });

})
