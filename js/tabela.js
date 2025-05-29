
// const tableData = [
//   {
//     imie: 'Jan', 
//     nazwisko: 'Kowalski',
//     opinie: 'Bardzo interesujące zajęcia.',
//     ocenaPomoc: 'Wysoka',
//     ocenaProwadzacy: 'Doskonała',
//     dataOpinii: '2023-01-15',
//     dataZajec: '2023-01-10'
//   },
//   {
//     imie: 'Jan', 
//     nazwisko: 'Kowalski',
//     opinie: 'Bardzo interesujące zajęcia.',
//     ocenaPomoc: 'Wysoka',
//     ocenaProwadzacy: 'Doskonała',
//     dataOpinii: '2023-01-15',
//     dataZajec: '2023-01-10'
//   },
//   {
//     imie: 'Jan', 
//     nazwisko: 'Kowalski',
//     opinie: 'Bardzo interesujące zajęcia.',
//     ocenaPomoc: 'Wysoka',
//     ocenaProwadzacy: 'Doskonała',
//     dataOpinii: '2023-01-15',
//     dataZajec: '2023-01-10'
//   },
//   {
//     imie: 'Jan', 
//     nazwisko: 'Kowalski',
//     opinie: 'Bardzo interesujące zajęcia.',
//     ocenaPomoc: 'Wysoka',
//     ocenaProwadzacy: 'Doskonała',
//     dataOpinii: '2023-01-15',
//     dataZajec: '2023-01-10'
//   },
//   {
//     imie: 'Jan', 
//     nazwisko: 'Kowalski',
//     opinie: 'Bardzo interesujące zajęcia.',
//     ocenaPomoc: 'Wysoka',
//     ocenaProwadzacy: 'Doskonała',
//     dataOpinii: '2023-01-15',
//     dataZajec: '2023-01-10'
//   },

// ];

// function insertDataIntoTable(data) {
//   const tableBody = document.getElementById('Tabela_opini').getElementsByTagName('tbody')[0];

//   data.forEach(rowData => {

//     const newRow= document.createElement('tr');

//     const Imie = document.createElement('td');
//     Imie.textContent = rowData.imie;

//     const Nazwisko = document.createElement('td');
//     Nazwisko.textContent = rowData.nazwisko;

//     const Opinie = document.createElement('td');
//     Opinie.textContent = rowData.opinie;

//     const Ocena_pomocna = document.createElement('td');
//     Ocena_pomocna.textContent = rowData.ocenaPomoc;

//     const Ocena_prow = document.createElement('td');
//     Ocena_prow.textContent = rowData.ocenaProwadzacy;

//     const Data_wyst = document.createElement('td');
//     Data_wyst.textContent = rowData.dataOpinii;

//     const Data_zajec = document.createElement('td');
//     Data_zajec.textContent = rowData.dataZajec;

//     newRow.appendChild(Imie);
//     newRow.appendChild(Nazwisko);
//     newRow.appendChild(Opinie);
//     newRow.appendChild(Ocena_pomocna);
//     newRow.appendChild(Ocena_prow);
//     newRow.appendChild(Data_wyst);
//     newRow.appendChild(Data_zajec);


//     tableBody.appendChild(newRow);
//   });
// }

// insertDataIntoTable(tableData);