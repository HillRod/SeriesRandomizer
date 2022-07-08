import { Modal, Col, Row, Button } from "react-bootstrap"

export default function PlatformModal({ show, onCloseModal, setPlatform }) {


    return (
        <Modal show={show} onHide={() => onCloseModal(false)} centered backdrop="static" keyboard={ false }>
            <Modal.Header className="d-flex justify-content-center">
                <Modal.Title>Selecciona tu plataforma</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button className="disney-button" onClick={() => {
                            setPlatform('Disney')
                            onCloseModal(false)
                        }}>
                            Disney +
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button className="star-button" onClick={() => {
                            setPlatform('Star')
                            onCloseModal(false)
                        }}>
                            Star +
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}