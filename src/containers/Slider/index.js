import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";


const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );



  // Fonction pour afficher la carte suivante
  const nextCard = () => {
    if (byDateDesc && byDateDesc.length > 0 && !autoScrollPaused) {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  // Appel de la fonction nextCard toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(nextCard, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [index, autoScrollPaused]);

  // Fonction pour mettre en pause le défilement automatique
  const pauseAutoScroll = () => {
    setAutoScrollPaused(true);
  };

  // Fonction pour reprendre le défilement automatique
  const resumeAutoScroll = () => {
    setAutoScrollPaused(false);
  };



  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <React.Fragment key={`${idx + 1}`}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
            onMouseEnter={pauseAutoScroll}
            onMouseLeave={resumeAutoScroll}

          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCarddescriptionContainer">
              <div className="SlideCarddescription">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCardpaginationContainer">
            <div className="SlideCardpagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${radioIdx + 1}`}
                  type="radio"
                  name="radio-button"
                  onChange={() => setIndex(radioIdx)}
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </React.Fragment >
      ))}
    </div >
  );
};

export default Slider;
