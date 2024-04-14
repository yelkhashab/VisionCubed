import './Learn.scss'
import Header from '../../components/Header/Header'
import { Helmet } from "react-helmet";

export default function Learn() {
    return (
        <>
            <section className='learn'>
                <Header />
                <section className='learn__moves'>
                    <div className='roofpig' data-config="alg=R U R' U R U2 R'"></div>
                </section>
            </section>
            <Helmet>
                <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
                <script src="roofpig_and_three.min.js"></script>
            </Helmet>
        </>
    )
}