# Star Wars Garage 🚀

[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](https://opensource.org/licenses/MIT)
![React Version](https://img.shields.io/badge/react-v18.3.1-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/v5.1.5-js?style=for-the-badge&logo=vite&label=Vite&color=%23a54ffe)

This is a simple React + TypeScript + Vite application to fetch vehicles from the Star Wars API and allows users to add their own spacecrafts, which are stored locally. Favorite spacecrafts, like the X-Wing and Millennium Falcon, are always shown at the top of the list.

## ❗️ Features

- Fetches data from the SWAPI for Star Wars vehicles and starships.
- Allows users to add new spacecrafts, which are saved to local storage.
- Favorites feature: Starships like the X-Wing and Y-Wing are marked as favorites and displayed at the top of the list.
- Spacecrafts created can be added to favorites.
- Filter options to view all spacecraft, only vehicles, or only starships.
- Displays key information about each spacecraft such as model, cost, and specific details for vehicles and starships.

## 🖼️ Examples

### New UI
<img src="examples/newExampleHome.png" />
<img src="examples/newExampleHomeCardOpen.png" />
<img src="examples/newExampleHomeCardOpen2.png" />
<img src="examples/newExampleAddSpacecraft.png" />

### Old UI
<img src="examples/example1.png" />
<img src="examples/example2.png" />

## 💿 Setup 

1. Clone the repository:
```sh
git clone https://github.com/AugustoLL/Star-Wars-Garage.git
cd Star-Wars-Garage
```

2. Install dependencies:

```sh
npm install
```

or

```sh
yarn install
```

3. Start the development server:

```sh
npm run dev
```
or

```sh
yarn dev
```

## 💡 Usage

1. Add a Spacecraft: Click on the "Add Spacecraft" button to navigate to the form where you can add new vehicles or starships. All spacecrafts added by users are stored in local storage and will persist across sessions.
2. Favorites: The X-Wing and Y-Wing are marked as favorites by default. To favorite a spacecraft, modify the FAVORITE_SPACECRAFTS constant in the code or create a new spacecraft and mark it as favorite.
3. Filter Spacecraft: Use the chips at the top of the homepage to filter between vehicles, starships, or all spacecraft.

## ⚒️ Technologies Used

- React
- Vite
- Typescript
- React Router
- Material UI

## ❕ Yet to implement
- ~~(IMPORTANT) Add filter to show all, only vehicles or only starships~~
- ~~Set local spacecrafts as favorite~~
- ~~Currently the Homepage only shows the name of the spacecraft, the model, the cost in credits, the date created, and if the spacecraft is marked as favorite. While all the other data is retrieved from the API, it's not currently shown.~~ 
- ~~Currently the Homepage shows name of spacecraft, model, cost in credits, date created, is favorite and the specific fields for each type of Spacecraft. Design a better Card component to show all the data.~~
- ~~Add loading, to show the user the data is being retrieved.~~
- Improve UI

## 📑 License
[MIT](http://opensource.org/licenses/MIT)

This project is licensed under the MIT License.

# Progetto FE

## Introduzione

Sono un appassionato di star wars che adora i veicoli e le astronavi ideate da Lucasfilm.

Conosco le api `SWAPI` che contengono sia veicoli che astronavi ma sono fermi da episodio 7.
Essendo un vero fan, anche delle loro ultime creazioni, mi piacerebbe inserire le astronavi e i veicoli mancanti.

Il millennium falcon e lo x-wing sono veramente iconiche devo per forza averle sempre in primo piano.

## Obiettivo

Creare un'applicazione in Vite+React+TypeScript che gestisca una lista di veicoli e astronavi di Star Wars, includendo i mezzi preferiti e la possibilità di aggiungere nuovi elementi. I dati saranno salvati localmente utilizzando il local storage.

## Funzionalità principali

### Lista unificata di astronavi e veicoli:

- Visualizzare una lista che includa sia i veicoli che le astronavi di Star Wars, recuperati dalle API di SWAPI;
- Aggiungere un filtro con chip per alternare tra veicoli e astronavi;
- I mezzi preferiti, come il Millennium Falcon e l'X-Wing, devono sempre apparire in cima alla lista.

### Pagina per aggiungere nuovi mezzi

- Creare una pagina dedicata all'inserimento di nuovi veicoli o astronavi, con i dati salvati in local storage;
- I nuovi mezzi aggiunti devono essere visibili nella lista principale insieme a quelli di SWAPI.

## Risorse

### Fondazionali

- [React](https://react.dev/);
- [Typescript](https://www.typescriptlang.org/);
- [Vite](https://vitejs.dev/).

### Progetto

- [SWAPI](https://swapi.dev/);
- [I veicoli di SWAPI](https://swapi.dev/documentation#vehicles);
- [Le astronavi di SWAPI](https://swapi.dev/documentation#starships).