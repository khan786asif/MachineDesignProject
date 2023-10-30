import { Link } from "react-router-dom";
const Home = () => {
    return (
        <section>
            <h1>
                Welcome to Design Interface of <span id="element"></span>
            </h1>
            <div>
                <h3>
                    || This design of Bushed Pin Flexible Coupling is for only 4
                    and 6 numbers of pin. ||
                </h3>
            </div>
            <p>Are you a Designer or a Layman??</p>
            <button className="btn1">
                <Link style={{ textDecoration: "none" }} to="/designer">
                    Designer
                </Link>
            </button>
            <button className="btn2">
                <Link style={{ textDecoration: "none" }} to="/layman">
                    Layman
                </Link>
            </button>
        </section>
    );
};

export default Home;
