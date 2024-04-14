import './Learn.scss'
import Header from '../../components/Header/Header'
import RoofpigCube from '../../components/RoofpigCube/RoofpigCube'

export default function Learn() {
    return (
        <>
            <section className='learn'>
                <Header />
                <RoofpigCube state="solve" moves="R U  R' U R U2 R' U"/>
            </section>
        </>
    )
}