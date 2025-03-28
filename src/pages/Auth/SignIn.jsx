import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';

const SignIn = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    {`We'll never share your email with anyone else.`}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
};

export default SignIn;
