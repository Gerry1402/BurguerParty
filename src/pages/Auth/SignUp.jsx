import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { signUpSupabase } from "../../services/supabase/auth";
import { insertSupabase } from "../../services/supabase/crud";

const SignUp = () => {
    const [json, setJson] = useState({
        name: "",
        surname: "",
        birthdate: "",
        email: "",
        password: "",
        description: "",
    });
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        signUpSupabase({
            email: json.email,
            password: json.password,
        });
        // insertSupabase('profile', [{
        //     name: json.name,
        //     surname: json.surname,
        //     birthdate: json.birthdate,
        //     description: json.description,
        //     user_id: }])
    };

    return (
        <>
            <Form
                noValidate
                validated={validated}
                onSubmit={(e) => handleSubmit(e)}
            >
                <Container>
                    <Row>
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group className="mb-3" xs={12} md={6} lg={6}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) =>
                                        setJson({
                                            ...json,
                                            name: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Name"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write a name
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) =>
                                        setJson({
                                            ...json,
                                            surname: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Sur Name"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Wite one or two surnames
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) =>
                                        setJson({
                                            ...json,
                                            email: e.target.value,
                                        })
                                    }
                                    type="email"
                                    placeholder="example@email.com"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write a valid email.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) =>
                                        setJson({
                                            ...json,
                                            password: e.target.value,
                                        })
                                    }
                                    type="password"
                                    minLength={8}
                                    placeholder="Pa$$w0rd"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Must contain minimum 8 characters
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Descrpition</Form.Label>
                                <Form.Control
                                    required
                                    minLength={50}
                                    as="textarea"
                                    rows={3}
                                    placeholder="Write a minimum of 50 characters."
                                    onChange={(e) =>
                                        setJson({
                                            ...json,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <Button
                                variant="primary"
                                className="w-100"
                                type="submit"
                            >
                                Sign Up
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <div className="text-center mt-3">
                <p>
                    Already have an account?{" "}
                    <a
                        href="/signin"
                        className="text-primary link-underline link-underline-opacity-0"
                    >
                        Sign In
                    </a>
                </p>
            </div>
        </>
    );
};

export default SignUp;
