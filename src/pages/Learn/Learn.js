import './Learn.scss'
import Header from '../../components/Header/Header'
import RoofpigCube from '../../components/RoofpigCube/RoofpigCube'
import { Helmet } from 'react-helmet'

export default function Learn() {
    return (
        <>
            <section className='learn'>
                <Header />
                <RoofpigCube state="solve" moves="R U  R' U R U2 R' U"/>
                <Helmet>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                    <script src="roofpig_and_three.min.js"></script>
                </Helmet>
                
            </section>
        </>
    )
}