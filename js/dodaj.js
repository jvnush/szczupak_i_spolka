document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('opinionForm');
  const clearButton = document.getElementById('clearTable');

const initialData = [
  {
    imie: 'Andrzej',
    nazwisko: 'Wędkarz',
    opinie: 'Wyprawa na szczupaka była niezapomniana!',
    Ocena_pomocna: 'Wysoka',
    Ocena_prow: 'Doskonała',
    Data_opinii: '2023-05-12',
    Data_Zajec: '2023-05-10'
  },
  {
    imie: 'Krzysztof',
    nazwisko: 'Karpiarz',
    opinie: 'Świetna atmosfera, złowiłem rekordowego karpia!',
    Ocena_pomocna: 'Wysoka',
    Ocena_prow: 'Doskonała',
    Data_opinii: '2024-06-20',
    Data_Zajec: '2024-06-18'
  },
  {
    imie: 'Marek',
    nazwisko: 'Leszcz',
    opinie: 'Dużo brań i fachowy przewodnik – polecam.',
    Ocena_pomocna: 'Średnia',
    Ocena_prow: 'Dobra',
    Data_opinii: '2024-08-05',
    Data_Zajec: '2024-08-02'
  },
  {
    imie: 'Anna',
    nazwisko: 'Sandacz',
    opinie: 'Niesamowita przygoda! Złapałam pierwszego sandacza w życiu.',
    Ocena_pomocna: 'Wysoka',
    Ocena_prow: 'Doskonała',
    Data_opinii: '2025-04-01',
    Data_Zajec: '2025-03-30'
  },
  {
    imie: 'Tomasz',
    nazwisko: 'Okoniarz',
    opinie: 'Organizacja na najwyższym poziomie. Wiele emocji!',
    Ocena_pomocna: 'Wysoka',
    Ocena_prow: 'Dobra',
    Data_opinii: '2025-01-17',
    Data_Zajec: '2025-01-15'
  },
  {
    imie: 'Ewa',
    nazwisko: 'Płotka',
    opinie: 'Cisza, spokój i piękne jezioro. Idealny weekend.',
    Ocena_pomocna: 'Średnia',
    Ocena_prow: 'Doskonała',
    Data_opinii: '2023-09-14',
    Data_Zajec: '2023-09-10'
  },
  {
    imie: 'Paweł',
    nazwisko: 'Sum',
    opinie: 'Sumy brały jak szalone! Przewodnik zna swoje miejsca.',
    Ocena_pomocna: 'Wysoka',
    Ocena_prow: 'Doskonała',
    Data_opinii: '2024-07-21',
    Data_Zajec: '2024-07-19'
  },
  {
    imie: 'Łukasz',
    nazwisko: 'Zander',
    opinie: 'Trochę mało brań, ale sprzęt i opieka na plus.',
    Ocena_pomocna: 'Średnia',
    Ocena_prow: 'Dobra',
    Data_opinii: '2024-10-03',
    Data_Zajec: '2024-10-01'
  }
];

  let tableData = loadTableData();

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const newOpinion = {
      imie: document.getElementById('imie').value,
      nazwisko: document.getElementById('nazwisko').value,
      opinie: document.getElementById('opinie').value,
      Ocena_pomocna: document.getElementById('Ocena_pomocna').value,
      Ocena_prow: document.getElementById('Ocena_prow').value,
      Data_opinii: document.getElementById('Data_opinii').value,
      Data_Zajec: document.getElementById('Data_Zajec').value
    };


    tableData.push(newOpinion);
    localStorage.setItem('opinions', JSON.stringify(tableData.slice(initialData.length)));

    refreshTable();
    form.reset();

});

clearButton.addEventListener('click', function() {

    localStorage.removeItem('opinions');
    tableData = loadTableData(); 
    refreshTable();

});

function loadTableData() {

    const storedData = JSON.parse(localStorage.getItem('opinions')) || [];
    return [...initialData, ...storedData];

}

function refreshTable() {
    const tableBody = document.getElementById('Tabela_opini').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    insertDataIntoTable(tableData);
}

function insertDataIntoTable(data) {

    const tableBody = document.getElementById('Tabela_opini').getElementsByTagName('tbody')[0];

    data.forEach(rowData => {
      const newRow = document.createElement('tr');
      Object.values(rowData).forEach(text => {
        const cell = document.createElement('td');
        cell.textContent = text;
        newRow.appendChild(cell);
      });
      tableBody.appendChild(newRow);
    });

  }

  refreshTable();
  
});