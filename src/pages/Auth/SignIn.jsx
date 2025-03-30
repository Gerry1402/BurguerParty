import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { signInSupabase, signUpSupabase } from "../../services/supabase/auth";
import { useState } from "react";

const SignIn = () => {
    const [json, setJson] = useState({ email: "", password: "" });
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (e) => {

        if (e.currentTarget.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        const { email, password } = json;
        const user = await signUpSupabase(email, password);
        if (!user) {
            console.log("Error creating user");
        } else {
            console.log("User created: ", user);
            window.location.href = "/";
        }
        setValidated(true);
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
                            <Button
                                variant="primary"
                                className="w-100"
                                type="submit"
                            >
                                Sign In
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <div className="text-center mt-3">
                <p>
                    Don&apos;t have an account?{" "}
                    <a
                        href="/signup"
                        className="text-primary link-underline link-underline-opacity-0"
                    >
                        Sign Up
                    </a>
                </p>
            </div>
        </>
    );
};

export default SignIn;
