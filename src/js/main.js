import '../scss/main.scss';
import '../index.html';

const calendar = `
<div class="container">
<div class="d-flex justify-content-between align-items-center">
  <h2>Calendar</h2>
  <div class="d-flex">
    <select class="form-select" id="filterInput">
      <option value="All members" selected>All members</option>
      <option value="Maria">Maria</option>
      <option value="Bob">Bob</option>
      <option value="Alex">Alex</option>
    </select>
    <a href="#" id="newEventButton">New event <i class="icon-cross"></i></a>
  </div>
</div>
<table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Mon</th>
      <th scope="col">Tue</th>
      <th scope="col">Wed</th>
      <th scope="col">Thu</th>
      <th scope="col">Fri</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">10:00</th>
      <td id='1'></td>
      <td id='2'></td>
      <td id='3'></td>
      <td id='4'></td>
      <td id='5'></td>
    </tr>
    <tr>
      <th scope="row">11:00</th>
      <td id='6'></td>
      <td id='7'></td>
      <td id='8'></td>
      <td id='9'></td>
      <td id='10'></td>
    </tr>
    <tr>
      <th scope="row">12:00</th>
      <td id='11'></td>
      <td id='12'></td>
      <td id='13'></td>
      <td id='14'></td>
      <td id='15'></td>
    </tr>
    <tr>
      <th scope="row">13:00</th>
      <td id='16'></td>
      <td id='17'></td>
      <td id='18'></td>
      <td id='19'></td>
      <td id='20'></td>
    </tr>
    <tr>
      <th scope="row">14:00</th>
      <td id='21'></td>
      <td id='22'></td>
      <td id='23'></td>
      <td id='24'></td>
      <td id='25'></td>
    </tr>
    <tr>
      <th scope="row">15:00</th>
      <td id='26'></td>
      <td id='27'></td>
      <td id='28'></td>
      <td id='29'></td>
      <td id='30'></td>
    </tr>
    <tr>
      <th scope="row">16:00</th>
      <td id='31'></td>
      <td id='32'></td>
      <td id='33'></td>
      <td id='34'></td>
      <td id='35'></td>
    </tr>
    <tr>
      <th scope="row">17:00</th>
      <td id='36'></td>
      <td id='37'></td>
      <td id='38'></td>
      <td id='39'></td>
      <td id='40'></td>
    </tr>
    <tr>
      <th scope="row">18:00</th>
      <td id='41'></td>
      <td id='42'></td>
      <td id='43'></td>
      <td id='44'></td>
      <td id='45'></td>
    </tr>
  </table>
</div>
`;

const createEvent = `
<div class="container">
<form id="form">
  <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Name of the event:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="nameEventInput">
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Participants:</label>
    <div class="col-sm-10">
      <select class="form-select" id="participansInput">
        <option value="Maria, Bob, Alex" selected>Maria, Bob, Alex</option>
        <option value="Maria, Bob">Maria, Bob</option>
        <option value="Bob, Alex">Bob, Alex</option>
        <option value="Maria, Alex">Maria, Alex</option>
      </select>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Day:</label>
    <div class="col-sm-10">
      <select class="form-select" id="dayInput">
        <option value="Monday" selected>Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
      </select>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Time:</label>
    <div class="col-sm-10">
      <select class="form-select" id="timeInput">
        <option value="10:00" selected>10:00</option>
        <option value="11:00">11:00</option>
        <option value="12:00">12:00</option>
        <option value="13:00">13:00</option>
        <option value="14:00">14:00</option>
        <option value="15:00">15:00</option>
        <option value="16:00">16:00</option>
        <option value="17:00">17:00</option>
        <option value="18:00">18:00</option>
      </select>
    </div>
  </div>
  <a href="#" onclick="onNavigate('/calendar'); return false;">Cancel</a>
  <button type="submit" class="btn btn-primary">Create</button>
</form>
</div>
`;

const routes = {
  '/': calendar,
  '/calendar': calendar,
  '/create-event': createEvent,
};
let allEvents = [];
const timeStamps = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const rootDiv = document.getElementById('root');

rootDiv.innerHTML = routes[window.location.pathname];
const newEventButton = document.getElementById('newEventButton');
newEventButton.addEventListener('click', onNavigate);

function onNavigate(pathname) {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  rootDiv.innerHTML = routes[pathname];

  if (pathname === '/calendar') {
    allEvents = JSON.parse(localStorage.getItem('events'));
    allEvents.forEach((event) => {
      const eventCell = document.getElementById(event.id);
      const eventBlock = document.createElement('div');
      eventCell.appendChild(eventBlock);
      eventBlock.classList.add('event');
    });
  }

  if (pathname === '/create-event') {
    const formElement = document.getElementById('form');
    formElement.addEventListener('submit', submitForm);
  }
};

function submitForm() {
  const nameEventInput = document.getElementById('nameEventInput');
  const participansInput = document.getElementById('participansInput');
  const dayInput = document.getElementById('dayInput');
  const timeInput = document.getElementById('timeInput');

  if (localStorage.getItem('events') === null) {
    localStorage.setItem('events', JSON.stringify(allEvents));
  } else {
    allEvents = JSON.parse(localStorage.getItem('events'));
  }

  const eventId = timeStamps.indexOf(timeInput.value) * 5 + days.indexOf(dayInput.value) + 1;

  const event = {
    id: eventId,
    name: nameEventInput.value,
    participans: participansInput.value.split(', '),
    day: dayInput.value,
    time: timeInput.value,
  };

  if (allEvents.find((item) => item.id === event.id) === undefined) {
    allEvents.push(event);
    localStorage.setItem('events', JSON.stringify(allEvents));
    onNavigate('/calendar');
  } else {
    // return;
  }
}

window.onpopstate = () => {
  rootDiv.innerHTML = routes[window.location.pathname];
};
