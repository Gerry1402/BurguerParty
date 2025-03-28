import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SignIn = () => {
    // const handleSubmit = (event) => {
    return (
        <Form>
            <Container>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                            style={{ width: "100%" }}
                        >
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};

export default SignIn;
