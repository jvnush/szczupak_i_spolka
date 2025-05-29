let map;
let activeInfoWindow;

function initMap() {

    const mapOptions = {
        center: { lat: 	52.409538, lng: 16.931992 }, 
        zoom: 7, 
};


map = new google.maps.Map(document.getElementById('map'), mapOptions);

  
const locations = [
    {
        position: { lat: 53.7768, lng: 20.4894 }, 
        title: "Jezioro Ukiel (Krzywe), Olsztyn",
        info: "Popularne łowisko w Warmii. Szczupaki, okonie, leszcze.",
        icon: "https://img.icons8.com/color/48/fish.png",
        price: "Łowienie z brzegu i łodzi, dobre na spinning.",
    },
    {
        position: { lat: 50.0213, lng: 20.0607 }, 
        title: "Zalew Bagry, Kraków",
        info: "Łowisko miejskie – okonie, karpie, sandacze.",
        icon: "https://img.icons8.com/color/48/fish.png",
        price: "Dobre miejsce na szybki wypad po pracy.",
    },
    {
        position: { lat: 52.2370, lng: 21.0175 }, 
        title: "Wisła – Warszawa",
        info: "Długa trasa do połowów – sumy, sandacze, bolenie.",
        icon: "https://img.icons8.com/color/48/fish.png",
        price: "Łowienie z brzegu, najlepiej wieczorami.",
    },
    {
        position: { lat: 51.7778, lng: 19.4540 }, 
        title: "Zbiornik Jeziorsko, Łódzkie",
        info: "Jezioro zaporowe – szczupaki, sandacze, karpie.",
        icon: "https://img.icons8.com/color/48/fish.png",
        price: "Duży akwen – warto mieć łódź lub ponton.",
    },
    {
        position: { lat: 54.3798, lng: 18.6131 }, 
        title: "Zatoka Pucka",
        info: "Morskie wędkowanie – flądry, belony, okonie morskie.",
        icon: "https://img.icons8.com/color/48/fish.png",
        price: "Łowienie z brzegu lub kutra, wymaga doświadczenia.",
    },
    {
        position: { lat: 51.0544, lng: 17.0741 }, 
        title: "Odra – Wrocław",
        info: "Urban fishing – bolenie, szczupaki, sumy.",
        icon: "https://img.icons8.com/color/48/fish.png",
        price: "Wędkarze chwalą poranki na betonowych nabrzeżach.",
    }
];


locations.forEach((location) => {

    const marker = new google.maps.Marker({

        position: location.position,
        map: map,
        title: location.title,
        icon: {
            url: location.icon,
            scaledSize: new google.maps.Size(35, 35)
        },
        animation: google.maps.Animation.DROP
        
    });

    const infowindow = new google.maps.InfoWindow({

        content: `<div class="infowindow-content"><strong>${location.title}</strong><br>${location.info}<br><strong>Cena:</strong> ${location.price}</div>`

    });

    marker.addListener('click', () => {

        if (activeInfoWindow) {
            activeInfoWindow.close();
        }
        infowindow.open(map, marker);
        activeInfoWindow = infowindow;

    });

    marker.addListener('dblclick', () => {

        window.location.href = location.destination;

    });
});
}
