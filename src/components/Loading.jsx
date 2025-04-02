import { Spinner } from "react-bootstrap";

const Loading = () => (
    <div className="d-flex w-100 justify-content-center">
        <Spinner animation="border" variant="primary" />
    </div>
);

export default Loading;
