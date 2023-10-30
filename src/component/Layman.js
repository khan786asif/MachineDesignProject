import React, { useState } from "react";
import classes from "./Layman.module.css";
import { main, result } from "./LaymanBack";
import { Link } from "react-router-dom";

const Layman = () => {
    const [input, setInput] = useState({ MS: "", MC: "", NN: "" });
    const [show, setShow] = useState(false);
    return (
        <div className={classes.container2}>
            <h1>Input Design Specifications:</h1>
            <form className={classes.myForm}>
                <select
                    value={input.MS}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, MS: e.target.value };
                        })
                    }
                >
                    <option>Enter the material of shaft</option>
                    <option value="1">Mild Steel</option>
                    <option value="2">Aluminium</option>
                    <option value="3">Cast Iron</option>
                    <option value="4">Concrete</option>
                </select>
                <select
                    value={input.MC}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, MC: e.target.value };
                        })
                    }
                >
                    <option>Enter the material of coupling material</option>
                    <option value="1">Mild Steel</option>
                    <option value="2">Aluminium</option>
                    <option value="3">Cast Iron</option>
                    <option value="4">Concrete</option>
                </select>
                <input
                    type="number"
                    className={classes.myInput}
                    value={input.NN}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, NN: e.target.value };
                        })
                    }
                    placeholder="Enter number of nuts"
                />
            </form>
            <button
                onClick={() => {
                    main(input);
                    setShow(true);
                }}
                className={classes.btn}
            >
                Get Results
            </button>
            <Link to="/cadModel" className={classes.btn}>
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

export default Layman;
