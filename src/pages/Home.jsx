import { Link } from "react-router-dom";

function Home() {
    return (<>
        <h1>Home</h1>
        <ul>
            <li> <Link to="/create" >Create</Link> </li>
            <li> <Link to="/read" >Read</Link> </li>
        </ul>
    </>);
}

export default Home;
