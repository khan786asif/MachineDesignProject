import React, { useState } from "react";
import "./Designer.css";
import { main, result } from "./DesginerBack";
import { Link } from "react-router-dom";

const Designer = () => {
    const [input, setInput] = useState({
        power: "",
        rpm: "",
        MF: "",
        SS: "",
        CSS: "",
        SC: "",
        P: "",
        LF: "",
        BP: "",
    });
    const [show, setShow] = useState(false);
    return (
        <div className="container">
            <h1>Input Design Specifications:</h1>
            <form action="" className="myForm">
                <input
                    type="number"
                    className="myInput"
                    placeholder="Enter the power in kW"
                    value={input.power}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, power: e.target.value };
                        })
                    }
                />
                <input
                    type="number"
                    className="myInput"
                    placeholder="Enter the rpm"
                    value={input.rpm}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, rpm: e.target.value };
                        })
                    }
                />
                <input
                    type="number"
                    className="myInput"
                    placeholder="Enter the multiplication factor"
                    value={input.MF}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, MF: e.target.value };
                        })
                    }
                />
                <input
                    type="number"
                    className="myInput"
                    placeholder="Enter the allowable shear stress for shaft"
                    value={input.SS}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, SS: e.target.value };
                        })
                    }
                />
                <input
                    type="number"
                    className="myInput"
                    placeholder="Enter the crushing shear stress for shaft"
                    value={input.CSS}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, CSS: e.target.value };
                        })
                    }
                />
                <input
                    type="number"
                    className="myInput"
                    placeholder="Enter the allowable shear stress for cuppling material"
                    value={input.SC}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, SC: e.target.value };
                        })
                    }
                />
                <input
                    type="number"
                    className="myInput"
                    placeholder="Enter the number of pins/nuts"
                    value={input.P}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, P: e.target.value };
                        })
                    }
                />
                <input
                    type="number"
                    className="myInput"
                    placeholder="Enter the length of flange"
                    value={input.LF}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, LF: e.target.value };
                        })
                    }
                />
                <input
                    type="number"
                    className="myInput"
                    placeholder="Enter the value of allowable bearing pressure"
                    value={input.BP}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, BP: e.target.value };
                        })
                    }
                />
            </form>
            <button
                onClick={() => {
                    main(input);
                    setShow(true);
                }}
                className="btn"
            >
                Get Results
            </button>
            <Link to="/cadModel" className="btn">
                Show Cad Model
            </Link>
            {show && (
                <div className="result">
                    <div>
                        Maximum Torque induced is: {result.T}
                        <br />
                        The diameter of shaft is: {result.DS}
                        <br />
                        The standard diameter of shaft is : {result.SDS}
                    </div>
                    <h1>Design of Pin</h1>
                    <div>
                        The diameter of Pin is : {result.DP}
                        <br />
                        The overall diameter of rubber bush is: {result.ODR}
                        <br />
                        The Diameter of pitch circle of pins is: {result.DPC}
                        <br />
                        Maximum principal stress is: {result.PS}
                        <br />
                        Maximum shear stress is: {result.SS}
                        <br />
                        Design is{!result.pinSafe ? " not " : " "}safe for pins
                        and rubber bush
                        <br />
                    </div>
                    <h1>Design of Hub</h1>
                    <div>
                        Outer diameter of hub is: {result.ODH}
                        <br />
                        Length of hub is: {result.LH}
                        <br />
                        Induced shear stress in hub is:{result.SSH}
                        <br />
                        Design of hub is{!result.hubSafe ? " not " : " "}safe
                    </div>
                    <h1>Design of Key</h1>
                    <div>
                        Induced shear stress for key is: {result.SSK}
                        <br />
                        Induced crushing stress for key is: {result.CSK}
                        <br />
                        Design is{!result.keySafe ? " not " : " "}safe for key
                    </div>
                    <h1>Design of Flange</h1>
                    <div>
                        the thickness of flange is: {result.TF}
                        <br />
                        Induced shear stress in flange is: {result.SSF}
                        <br />
                        Design is{!result.flangeSafe ? " not " : " "}safe for
                        flange
                    </div>
                </div>
            )}
        </div>
    );
};

export default Designer;
