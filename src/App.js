import simp from "./JSON/simpisodios.json";
import './App.css';
import { Button, Col, Row, Container, Card, DropdownButton,Dropdown } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faFilm } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import PlatformModal from "./Modal/PlatformModal";


function App() {

  const [episode, setEpisode] = useState(null);
  const [season, setSeason] = useState(null);
  const [platfrom, setPlatform] = useState(null);
  const [showPlatformModal, setShowPlatformModal] = useState(false);

  useEffect(() =>{
    debugger;
    if(!localStorage.getItem('platform')){
      setShowPlatformModal(true);
    }else{
      setPlatform(localStorage.getItem('platform'));
    }
  },[])

  const handleRandomize = () => {
    debugger;
    const seasonRan = Math.floor(Math.random() * 33);
    setSeason(simp.simpisodios[seasonRan]);
    const episodies = simp.simpisodios[seasonRan].episodes;
    const episodeRan = episodies[Math.floor(Math.random() * episodies.length)];
    setEpisode(episodeRan);
    //window.open('https://www.starplus.com/es-419/video/' + episodeId, "_blank");
  }

  const handleChangePlatform = (plat) => {
    setPlatform(plat)
    localStorage.setItem('platform', plat)
  }

  return (
    <div className="App">
      <PlatformModal show={showPlatformModal} onCloseModal={setShowPlatformModal} setPlatform={handleChangePlatform}/>
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <DropdownButton title='Plataforma' className="platform-dropdown">
          <Dropdown.Item onClick={() => handleChangePlatform('Disney')}>Disney +</Dropdown.Item>
          <Dropdown.Item onClick={() => handleChangePlatform('Star')}>Star +</Dropdown.Item>
      </DropdownButton>
        <Row className="d-flex justify-content-center">
          <Col sm={episode? 6 : 12}>
            {
              episode && (
                <Card>
                  <Card.Img src={episode.image} />
                  <Card.Body>
                    <Card.Title>
                      {"T"+season.seasonSequenceNumber+"E"+episode.episodeSequenceNumber+": "+episode.title}
                    </Card.Title>
                    <Card.Text>
                      {episode.description}
                    </Card.Text>
                    <Button onClick={() => {window.open((platfrom === 'Disney' ? 'https://www.disneyplus.com/video/':'https://www.starplus.com/video/') + episode.contentId, "_blank");}} variant="primary">Ver episodio <FontAwesomeIcon icon={faFilm} /></Button>
                  </Card.Body>
                </Card>
              )
            }
            <Button onClick={handleRandomize} className="mt-3">
              Episodio aleatorio <FontAwesomeIcon icon={faDice} />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
