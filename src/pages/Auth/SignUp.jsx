import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom';

import { inputs, defaultValues } from '../../data/Forms/User/SignUp';
import supabase from '../../services/supabase';

const SignUp = () => {
    const [formData, setFormData] = useState(defaultValues);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);

        const { email, password } = formData;
        const {
            data: { user },
            error: SignUpError,
        } = await supabase.auth.signUp({ email, password });
        if (SignUpError) {
            console.error('Error: ', SignUpError);
            return;
        }

        const { name, surname, birthdate, description } = formData;
        const { error: insertProfileError } = await supabase.from('profile').insert({
            name,
            surname,
            birthdate,
            description,
            user_id: user.id,
        });
        if (insertProfileError) {
            console.error('Error: ', insertProfileError);
            return;
        }
        navigate(`/`);
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                <Container>
                    {inputs.map((row, index) => (
                        <Row key={index}>
                            {row.map((input, index) => (
                                <Form.Group as={Col} key={index} {...input.size} className="mb-3">
                                    <FloatingLabel label={input.label}>
                                        <Form.Control
                                            required
                                            {...input.control}
                                            placeholder=""
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {input.feedback}
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback />
                                    </FloatingLabel>
                                </Form.Group>
                            ))}
                        </Row>
                    ))}
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <Button variant="primary" className="w-100" type="submit">
                                Sign Up
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <Container className="text-center mt-3">
                <p>
                    Already have an account?{' '}
                    <a
                        href="/signin"
                        className="text-primary link-underline link-underline-opacity-0"
                    >
                        Sign In
                    </a>
                </p>
            </Container>
        </>
    );
};

export default SignUp;
