import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { insertSupabase } from "../../services/supabase/crud";
import { signUpSupabase } from "../../services/supabase/auth";

const YearsAgo = (years) => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - years);
    return today.toISOString().split("T")[0];
};

const SignUp = () => {
    const adultAge = YearsAgo(18);

    const [json, setJson] = useState({
        name: "",
        surname: "",
        birthdate: adultAge,
        email: "",
        password: "",
        description: "",
    });
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (e) => {
        if (e.currentTarget.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        const {email, password} = json;
        const user = await signUpSupabase(email, password);
        if (!user) {
            console.log("Error creating user");
        } else {
            console.log("User created: ", user);
            window.location.href = "/";
        }

        // insertSupabase('profile', [{
        //     name: json.name,
        //     surname: json.surname,
        //     birthdate: json.birthdate,
        //     description: json.description,
        //     user_id: }])
        setValidated(true);
    };

    return (
        <>
            <h2 className="text-center mb-3">Sign Up</h2>
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
                        <Col xs={12} md={8} lg={9}>
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
                        <Col xs={12} md={4} lg={3}>
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
                                            birthdate: e.target.value,
                                        })
                                    }
                                    type="date"
                                    defaultValue={adultAge}
                                    max={adultAge}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Must contain minimum 8 characters
                                </Form.Control.Feedback>
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
