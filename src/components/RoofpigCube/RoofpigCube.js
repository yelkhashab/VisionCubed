import './RoofpigCube.scss'
import { Helmet } from "react-helmet";
import React, { useEffect } from "react";

export default function RoofpigCube({moves = "", state}) {
    return (
        <>
            <section className='roofpig-cube'>
                <section className='roofpig-cube__moves'>
                {state === "scan" && (
                    <div className="roofpig" data-config="alg=y y y y y x x2|colored=*/m|colors=U:w D:y R:o L:r F:b B:g|hover=none"></div>
                )}
                {state === "solve" && (
                    <div className="roofpig" data-config={`alg=${moves}|colors=U:w D:y R:r L:o F:g B:b|hover=none`}></div>
                )}
                </section>
                <Helmet>
                    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
                    <script src="roofpig_and_three.min.js"></script>
                </Helmet>
            </section>
        </>
    )
}