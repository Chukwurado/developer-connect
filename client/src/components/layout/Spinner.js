import React, { Fragment } from "react";

const Spinner = () => {
    return (
        <Fragment>
            {/* <i
                className="fa fa-circle-o-notch fa-spin"
                style={{ fontSize: "24px", margin: "auton", display: "block" }}
            ></i> */}
            <i
                class="fas fa-spinner"
                style={{ fontSize: "24px", margin: "auton", display: "block" }}
            ></i>
        </Fragment>
    );
};

export default Spinner;
