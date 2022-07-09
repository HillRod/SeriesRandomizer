import series from "./JSON/series.json"
import './App.css';
import { Button, Col, Row, Container, Card, DropdownButton, Dropdown, Accordion, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faFilm, faFilter } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
// import PlatformModal from "./Modal/PlatformModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [serie, setSerie] = useState(series["simpsons"]);
  const [allSelected, setAllSelected] = useState(true);
  const [seasonsFilter, setSeasonsFilter] = useState([]);
  const [optionsSeries, setOptionSeries] = useState([]);
  const [episode, setEpisode] = useState(null);
  const [season, setSeason] = useState(null);
  // const [platfrom, setPlatform] = useState(null);
  // const [showPlatformModal, setShowPlatformModal] = useState(false);

  useEffect(() => {
    let arraycito = Array(serie.seasons.length).fill(true)
    // serie.forEach(() => arraycito.push(true))
    setOptionSeries(Object.keys(series).map(k => ({
      value:k,
      label:series[k].series_title
    })))
    
    setSeasonsFilter([...arraycito]);
    // if (!localStorage.getItem('platform')) {
    //   setShowPlatformModal(true);
    // } else {
    //   setPlatform(localStorage.getItem('platform'));
    // }
  }, [])

  const handleChangeSerie = (e) => {
    setSerie(series[e.target.value])
    document.querySelector('.bgImage').style.backgroundImage = `url('${series[e.target.value].series_bg}')`;
    setSeasonsFilter([...Array(series[e.target.value].seasons.length).fill(true)])
    setAllSelected(true);

  }

  const handleChangeFilter = (t) => {
    debugger;
    let arraycito = seasonsFilter;
    arraycito[parseInt(t) - 1] = !arraycito[parseInt(t) - 1];
    setSeasonsFilter([...arraycito]);
  }

  const handleRandomize = () => {
    const sfiltered = serie.seasons.filter(season => true === seasonsFilter[season.seasonSequenceNumber - 1])
    if (sfiltered.length > 0) {
      const seasonRan = Math.floor(Math.random() * sfiltered.length);
      setSeason(sfiltered[seasonRan]);
      const episodies = sfiltered[seasonRan].episodes;
      const episodeRan = episodies[Math.floor(Math.random() * episodies.length)];
      setEpisode(episodeRan);
    } else {
      toast.info('Selecciona al menos una temporada')
    }
    //window.open('https://www.starplus.com/es-419/video/' + episodeId, "_blank");
  }

  const handleClickAll = () => {

    setAllSelected(!allSelected);
    let arraycito = Array(serie.seasons.length).fill(!allSelected);
    setSeasonsFilter([...arraycito]);
  }

  // const handleChangePlatform = (plat) => {
  //   setPlatform(plat)
  //   localStorage.setItem('platform', plat)
  // }

  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        pauseOnHover
      />
      {/* <PlatformModal show={showPlatformModal} onCloseModal={setShowPlatformModal} setPlatform={handleChangePlatform} /> */}
      {/* <DropdownButton title='Plataforma' className="platform-dropdown" style={{ zIndex: '-1' }}>
        <Dropdown.Item onClick={() => handleChangePlatform('Disney')}>Disney +</Dropdown.Item>
        <Dropdown.Item onClick={() => handleChangePlatform('Star')}>Star +</Dropdown.Item>
      </DropdownButton> */}
      {/* <Button onClick={() => setShowPlatformModal(true)} className="platform-dropdown">Plataforma</Button> */}
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ marginTop: '6rem' }}>
        <Row className="d-flex justify-content-center w-100">
          <Col xs={6} className='mb-3'>
            {/* <Select options={optionsSeries} onChange={(e) => handleChangeSerie(e)}/> */}
            <Form.Select onChange={(e) => handleChangeSerie(e)}>
              {
                optionsSeries.map((s) =>{
                  return(
                    <option value={s.value}>{s.label}</option>
                  )
                })
              }
            </Form.Select>
          </Col>
          <Col xs={12}>
            <Accordion >
              <Accordion.Item eventKey="0">
                <Accordion.Header> Filtros por temporada<FontAwesomeIcon className="mx-2" icon={faFilter} />
                  <div className="switch_box box_4" style={{ marginRight: '1rem' }}>
                    <div className="input_wrapper">
                      <input type="checkbox" checked={allSelected} className="switch_4" onClick={(e) => {
                        e.stopPropagation()
                        handleClickAll()
                      }} />
                      <svg className="is_checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67" onClick={(e) => {
                        e.stopPropagation();
                        handleClickAll()
                      }}>
                        <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z" />
                      </svg>
                      <svg className="is_unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982" onClick={(e) => {
                        e.stopPropagation();
                        handleClickAll()
                      }}>
                        <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z" fillRule="evenodd" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  Seleccionar todos
                </Accordion.Header>
                <Accordion.Body style={{ maxHeight: '30vh', overflowY: 'scroll' }}>
                  <Container>
                    <Row className="d-flex justify-content-center">
                      {serie && (serie.seasons?.map(season => (
                        <Col className="mt-2 d-flex justify-content-center" xs={4} md={1} key={season.seasonSequenceNumber}>
                          <div className="switch_box box_4">
                            <div className="input_wrapper">
                              <input type="checkbox" checked={seasonsFilter[season.seasonSequenceNumber - 1]} onChange={(e) => handleChangeFilter(season.seasonSequenceNumber)} className="switch_4" data-after-content={season.seasonSequenceNumber} />
                              <svg className="is_checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67" onClick={(e) => {
                                e.stopPropagation();
                                handleChangeFilter(season.seasonSequenceNumber);
                              }}>
                                <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z" />
                              </svg>
                              <svg className="is_unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982" onClick={(e) => {
                                e.stopPropagation();
                                handleChangeFilter(season.seasonSequenceNumber);
                              }}>
                                <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z" fillRule="evenodd" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </Col>
                      )
                      ))}
                    </Row>
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col sm={episode ? 6 : 12}>
            <Button onClick={handleRandomize} className="my-3">
              Episodio aleatorio <FontAwesomeIcon icon={faDice} />
            </Button>
            {
              episode && (
                <Card>
                  <Card.Img src={episode.image} />
                  <Card.Body>
                    <Card.Title>
                      {"T" + season.seasonSequenceNumber + "E" + episode.episodeSequenceNumber + ": " + episode.title_es}
                    </Card.Title>
                    <Card.Text>
                      {episode.description_es}
                    </Card.Text>
                    {/* <Button onClick={() => { window.open((platfrom === 'Disney' ? 'https://www.disneyplus.com/video/' : 'https://www.starplus.com/video/') + episode.contentId, "_blank"); }} variant="primary">Ver episodio <FontAwesomeIcon icon={faFilm} /></Button> */}
                    <Button onClick={() => { window.open((`https://www.${serie.platform}plus.com/video/`) + episode.content_id, "_blank"); }} variant="primary">Ver episodio <FontAwesomeIcon icon={faFilm} /></Button>
                  </Card.Body>
                </Card>
              )
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
