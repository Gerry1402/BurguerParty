import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import {
  inputs1,
  inputs2,
  selects,
  defaultValues,
} from "../../data/Forms/User/SignUp";
import Loading from "../../components/Loading";
import supabase from "../../services/public";

const SignUp = () => {
  const [formData, setFormData] = useState(defaultValues);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [relations, setRelations] = useState([]);
  const countrySelect = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getPoblations = async () => {
      try {
        const relations = await axios
          .get(
            "https://countriesnow.space/api/v0.1/countries/population/cities"
          )
          .then((data) =>
            data.data.data.map(({ city, country }) => ({ [city]: country }))
          );
        setRelations(relations);
        const cities = relations.map((obj) => Object.keys(obj)[0]);
        setCities(cities);
        const countries = [
          ...new Set(relations.map((obj) => Object.values(obj)[0])),
        ];
        setCountries(countries);
      } finally {
        setLoading(false);
      }
    };
    getPoblations();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleChangeCity = (e) => {
    countrySelect.current.value = Object.values(
      relations.find((relation) => Object.keys(relation)[0] === e.target.value)
    )[0];
    handleChange(e);
  };

  const handleChangeCountry = (e) => {
    const filtered = relations
      .filter((relation) => Object.values(relation)[0] === e.target.value)
      .map((relation) => Object.keys(relation)[0]);
    setCities(
      filtered.length > 0
        ? filtered
        : relations.map((relation) => Object.keys(relation)[0])
    );
    handleChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated([true, false]);
    const {
      email,
      password,
      name,
      surname,
      birthdate,
      display_name,
      country,
      city,
      description,
    } = formData;
    const { error: SignUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          surname,
          birthdate,
          display_name,
          country,
          city,
          description,
        },
      },
    });
    if (SignUpError) {
      console.error("Error: ", SignUpError);
      return;
    }
    navigate(`/`);
  };

  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          {inputs1.map((input, index) => (
            <Form.Group as={Col} {...input.size} className="mb-3" key={index}>
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
          <Col {...selects.country.size}>
            <Form.Select
              ref={countrySelect}
              size="lg mb-3"
              onChange={handleChangeCountry}
            >
              <option value="">{selects.country.defaultValue} </option>
              {countries.map((country, i) => (
                <option key={i} value={country}>
                  {country}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col {...selects.country.size}>
            <Form.Select size="lg mb-3" onChange={handleChangeCity}>
              <option value="">{selects.city.defaultValue} </option>
              {cities.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </Form.Select>
          </Col>
          {inputs2.map((input, index) => (
            <Form.Group as={Col} {...input.size} className="mb-3" key={index}>
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
        <Row>
          <Col xs={12} md={12} lg={12}>
            <Button className="w-100" variant="primary" type="submit">
              Sign Up
            </Button>
          </Col>
        </Row>
      </Form>
      <p className="text-center mt-3">
        Already have an account?{" "}
        <a
          href="/signin"
          className="text-primary link-underline link-underline-opacity-0"
        >
          Sign In
        </a>
      </p>
    </Container>
  );
};

export default SignUp;
