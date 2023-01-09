import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

function ServerSwitch() {
    const dotNet = 'http://localhost:7197/api';
    const nodeJs = 'http://localhost:8000/api';

    const [switchState, setSwitchState] = useState(localStorage.getItem('url') === nodeJs)

    const handleChange = async (e) => {
        setSwitchState(!switchState)
        if (switchState) {
            localStorage.setItem('url', dotNet)
            localStorage.removeItem('token')
            window.location.reload();
        } else {
            localStorage.setItem('url', nodeJs);
            localStorage.removeItem('token')
            window.location.reload();
        }
    }
    return (
        <Form>
            <Container>
                <Row >
                    <Col>
                        <Form.Label style={{ color: 'white' }}>.Net</Form.Label>
                    </Col>
                    <Col>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            onChange={handleChange}
                            checked={switchState}
                        />
                    </Col>
                    <Col>
                        <Form.Label style={{ color: 'white' }}> Node.js</Form.Label>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}

export default ServerSwitch