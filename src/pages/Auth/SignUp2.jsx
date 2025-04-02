import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { inputs, getCitiesCountries, defaultValues, selects } from '../../data/Forms/User/SignUp2';
import supabase from '../../services/supabase';

const SignUp = () => {
    const { cities, countries, relations } = getCitiesCountries();
    const [formData, setFormData] = useState(defaultValues);
    const [validated, setValidated] = useState(false);
    const [citiesList, setCitiesList] = useState(cities);
    /* trunk-ignore(eslint/no-unused-vars) */
    const [country, setCountry] = useState('');
    const navigate = useNavigate();

    const handleChangeCity = (e) => {
        setCountry(Object.values(relations.find((relation) => Object.keys(relation) === e.target.value)));
        handleChange(e);
    };

    const handleChangeCountry = (e) => {
        const filtered = relations
            .filter((relation) => Object.values(relation) === e.target.value)
            .flatMap((obj) => Object.keys(obj));
        setCitiesList(filtered.length > 0 ? filtered : cities);
        setCountry(e.target.value);
        handleChange(e);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);

        const { phone, city, country, description } = formData;
        const { error: updateUser } = await supabase.auth.updateUser({
            phone,
            options: {
                data: {
                    city,
                    country,
                    description,
                },
            },
        });
        if (updateUser) {
            console.error('Error: ', updateUser);
            return;
        }
        navigate(`/`);
    };

    return (
        <>
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Form.Select {...selects.country.size} onChange={handleChangeCountry}>
                            <option value="">{selects.country.defaultValue} </option>
                            {countries.map((country, i) => (
                                <option key={i} value={country}>
                                    {country}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Select {...selects.city.size} onChange={handleChangeCity}>
                            <option value="">{selects.city.defaultValue} </option>
                            {citiesList.map((city, i) => (
                                <option key={i} value={city}>
                                    {city}
                                </option>
                            ))}
                        </Form.Select>
                        {inputs.map((input, index) => (
                            <Form.Group as={Col} {...input.size} className="mb-3" key={index}>
                                <FloatingLabel label={input.label}>
                                    <Form.Control required {...input.control} placeholder="" onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid">{input.feedback}</Form.Control.Feedback>
                                    <Form.Control.Feedback />
                                </FloatingLabel>
                            </Form.Group>
                        ))}
                    </Row>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <Button variant="primary" className="w-100" type="submit">
                                Continue
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
};

export default SignUp;
