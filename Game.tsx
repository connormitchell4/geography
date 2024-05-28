import React, { useState, useEffect, useRef } from 'react';
import Globe from './Globe';
import alternateNamesMapping from './AlternateNames';
import './styles.css';
import { Feature, FeatureCollection, Polygon, MultiPolygon } from 'geojson';

interface FeatureProperties {
  sovereignt: string;
  admin: string;
  name: string;
  type: string;
}

interface GeoJsonFeature extends Feature<Polygon | MultiPolygon, FeatureProperties> {}

interface GeoJsonData extends FeatureCollection<Polygon | MultiPolygon, FeatureProperties> {}

const Game: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [countries, setCountries] = useState<string[]>([]);
  const [territories, setTerritories] = useState<string[]>([]);
  const [guessedCountries, setGuessedCountries] = useState<string[]>([]);
  const [mode, setMode] = useState<string>('countries');
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonData | null>(null);
  const [totalItems, setTotalItems] = useState<number>(197); // Default to 197 for 'countries' mode
  const [flash, setFlash] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0); // 20 minutes
  const [gameOver, setGameOver] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false); // New state for game started
  const [inputError, setInputError] = useState<boolean>(false);
  const [startButtonText, setStartButtonText] = useState<string>("Start");
  const [countryPlaceHolder, setCountryPlaceholder] = useState<string>("Type Country Name");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/countries.geojson')
      .then((response) => response.json())
      .then((data: GeoJsonData) => {
        const countryNames: string[] = [];
        const territoryNames: string[] = [];
        const countryData: GeoJsonData = { ...data, features: [] };
        const territoryData: GeoJsonData = { ...data, features: [] };

        data.features.forEach((feature: GeoJsonFeature) => {
          if (
            ((feature.properties.sovereignt === feature.properties.admin ||
              feature.properties.name === 'Israel') &&
              feature.properties.type !== 'Indeterminate' &&
              feature.properties.name !== 'Somaliland' &&
              feature.properties.name !== 'N. Cyprus') ||
            feature.properties.name === 'Palestine'
          ) {
            countryNames.push(feature.properties.name.toString().toLowerCase());
            countryData.features.push(feature);
            territoryData.features.push(feature);
          } else if (
            feature.properties.type !== 'Lease' &&
            feature.properties.name !== 'Siachen Glacier' &&
            feature.properties.name !== 'Brazilian I.' &&
            feature.properties.name !== 'Southern Patagonian Ice Field' &&
            feature.properties.name !== 'Bir Tawil'
          ) {
            territoryNames.push(feature.properties.name.toString().toLowerCase());
            territoryData.features.push(feature);
          }
        });

        setCountries(countryNames);
        setTerritories(territoryNames);
        console.log(territories)
        console.log(countries)

        const totalItems = mode === 'countries' ? countryNames.length : countryNames.length + territoryNames.length;
        setTotalItems(totalItems);

        if (mode === 'countries') {
          setGeoJsonData(countryData);
          
        } else {
          setGeoJsonData(territoryData);
          
        }
      })
      .catch((error) => {
        console.error('Error fetching GeoJSON data:', error);
      });
  }, [mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleGuess = () => {
    if (gameOver === 2 || !gameStarted) return;

    const normalizedInput = inputValue.trim().toLowerCase();
    const primaryName = alternateNamesMapping[normalizedInput] ? alternateNamesMapping[normalizedInput].toLowerCase() : normalizedInput;

    if (mode === 'countries') {
      
      if (!countries.includes(primaryName)) {
        //case for when guess isn't a country
        setInputError(true); // Trigger red flash
        setTimeout(() => setInputError(false), 500);
      }
      if (guessedCountries.includes(primaryName)) {
        //case for when country is guessed already
        setInputError(true); // Trigger red flash
        setTimeout(() => setInputError(false), 500);
        setCountryPlaceholder("Already Guessed!")
        setTimeout(() => setCountryPlaceholder("Type Country Here"), 1000);
      }
      if (countries.includes(primaryName) && !guessedCountries.includes(primaryName)) {
        setGuessedCountries([...guessedCountries, primaryName]);
        setFlash(true);
      }
    } else {
      
      if (!territories.includes(primaryName) && !countries.includes(primaryName)) {
        //case for when guess isn't a country
        setInputError(true); // Trigger red flash
        setTimeout(() => setInputError(false), 500);
      }
      if (guessedCountries.includes(primaryName)) {
        //case for when country is guessed already
        setInputError(true); // Trigger red flash
        setTimeout(() => setInputError(false), 500);
        setCountryPlaceholder("Already Guessed!")
        setTimeout(() => setCountryPlaceholder("Type Country Here"), 1000);
      }
      if ((territories.includes(primaryName) || countries.includes(primaryName)) && !guessedCountries.includes(primaryName)) {
        setGuessedCountries([...guessedCountries, primaryName]);
        setFlash(true);
      }
    }
    setInputValue('');
  };

  useEffect(() => {
    if (flash) {
      const timer = setTimeout(() => setFlash(false), 1000); // Duration of the flash animation
      return () => clearTimeout(timer);
    }
  }, [flash]);

  useEffect(() => {
    let timer

    if (gameStarted && gameOver !== 2) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime + 1);
      }, 1000);
    } 

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [gameStarted, timeLeft]);

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
    setGuessedCountries([]);
    setGameOver(0);
    setStartButtonText("Start")
    setGameStarted(false); // Reset game started state
  };

  const startGame = () => {
      
      setGameStarted(true);
      setGameOver(1);
      setGuessedCountries([]);
      setInputValue('');
      setStartButtonText("Give Up")
      setTimeLeft(0); 
    
    
  };

  const endGame = () => {
    if (confirm("Are you sure you want to give up?")){
      setGameStarted(false);
      setGameOver(2);
      setStartButtonText("Start")
    } else {
      return;
    }
    
    
  }

  const handleKeyPress = (event) => {
    if (event.key !== 'Enter') {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  
  const missedCountries = mode === 'countries' ? countries.filter((country) => !guessedCountries.includes(country)) : territories.concat(countries).filter((country) => !guessedCountries.includes(country));
  

  return (
    <div className="container">
      <div className="game-container">
      <button className='button-17' onClick={startButtonText==="Start" ? startGame : endGame}>{startButtonText}</button> {/* Start button */}
        <input
          tabIndex={0}
          className=
          {`centered-option ${inputError ? 'error' : ''}`}
          style={{ width: '100%' }}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
          placeholder={countryPlaceHolder}
          disabled={!gameStarted} // Disable input when game hasn't started
          ref={inputRef}
        />
        <div className="select-guess-container">
          <select className="centered-option" value={mode} onChange={handleModeChange}>
            <option value="countries">Guess All Countries</option>
            <option value="countriesAndTerritories">Guess All Countries and Territories</option>
          </select>
          <button className="button-17" onClick={handleGuess} disabled={!gameStarted}>Guess</button> {/* Disable button when game hasn't started */}
        </div>

        <div>
          Guessed {guessedCountries.length} out of {totalItems}
        </div>
        <div>
          Timer: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
        </div>
        <div>
          <h3>Guessed Countries</h3>
          <ul
            style={{
              overflowY: 'scroll',
              height: '30vh',
              width: '20vw',
              padding: '1px',
              flexDirection: 'column-reverse',
              borderTop: '1px solid #ccc'
            }}
          >
            {guessedCountries.slice().reverse().map((country, index) => (
              <li key={index}>
                <p className={index === 0 && flash ? 'flash-green' : ''}>{country}</p>
              </li>
            ))}
          </ul>
        </div>
        {(gameOver === 2) && (
          <div>
            <h2>Game Over You Fucking Idiot!</h2>
            <h3>Here's What you Missed:</h3>
            <ul
              style={{
                overflowY: 'scroll',
                height: '30vh',
                width: '20vw',
                padding: '1px',
                borderTop: '1px solid #ccc'
              }}
            >
              {missedCountries.map((country, index) => (
                <li key={index}>{country}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="globe-container">
        {geoJsonData && <Globe geoJsonData={geoJsonData} guessedCountries={guessedCountries} gameOver={gameOver} />}
      </div>
    </div>
  );
};

export default Game;
