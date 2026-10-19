
const API_FILMS = "https://swapi.info/api/films";
const API_PEOPLE = "https://swapi.info/api/people";

// EJERCICIO 1: Gráfica de líneas de las películas
async function getFilms() {
  try {
    const response = await fetch(API_FILMS);

    if (!response.ok) {
      throw new Error("No se pudieron obtener las películas");
    }

    const films = await response.json();

    const labels = films.map((film) => film.title);

    const years = films.map((film) =>
      Number(film.release_date.split("-")[0])
    );

    new Chartist.Line(
      ".peliculas",
      {
        labels: labels,
        series: [years]
      },
      {
        height: "500px",
        lineSmooth: false,
        showPoint: true,
        axisY: {
          onlyInteger: true,
          offset: 50
        },
        chartPadding: {
          top: 20,
          right: 30,
          bottom: 20,
          left: 10
        }
      }
    );
  } catch (error) {
    console.error("Error con las películas:", error);
  }
}

// EJERCICIO 2: Gráfica de barras de los personajes
async function getPeople() {
  try {
    const response = await fetch(API_PEOPLE);

    if (!response.ok) {
      throw new Error("No se pudieron obtener los personajes");
    }

    const people = await response.json();

    // Mostrar los 10 primeros personajes para facilitar la lectura
    const topPeople = people.slice(0, 10);

    const labels = topPeople.map((person) => person.name);
    const movieCounts = topPeople.map((person) => person.films.length);

    new Chartist.Bar(
      ".personajes",
      {
        labels: labels,
        series: [movieCounts]
      },
      {
        horizontalBars: true,
        height: "800px",
        seriesBarDistance: 30,
        axisY: {
          offset: 160
        },
        axisX: {
          onlyInteger: true,
          low: 0
        },
        chartPadding: {
          top: 20,
          right: 40,
          bottom: 20,
          left: 10
        }
      }
    );
  } catch (error) {
    console.error("Error con los personajes:", error);
  }
}

// Ejecutar las dos gráficas
getFilms();
getPeople();
