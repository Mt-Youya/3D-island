import { Link } from "react-router-dom"
import { arrow } from "../assets/icons/index.js"

function renderContent(current) {
    switch (current) {
        case 1:
            return (
                <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
                    Hi, I'm <span className="font-semibold">Yonjay</span>
                    <br />
                    A Software Engineer from Shanghai
                </h1>
            )
        case 2:
            return (
                <InfoBox
                    link="/about"
                    btnText="Learn more"
                    text="Worked with many companied and picked up many skills along the way"
                />
            )
        case 3:
            return (
                <InfoBox
                    link="/projects"
                    btnText="Visit my portfolio"
                    text="Let multiple projects to success over the years. Curious about the impact?"
                />
            )
        case 4:
            return (
                <InfoBox
                    link="/contact"
                    btnText="Let's talk"
                    text="Need a project done or looking for a dev? I'm just a few keystrokes away"
                />
            )
        default:
            return
    }
}

function InfoBox({ text, link, btnText }) {
    return (
        <div className="info-box">
            <p className="font-medium sm:text-xl text-center">{text}</p>
            <Link to={link} className="neo-brutalism-white neo-btn">{btnText}
                <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
            </Link>
        </div>
    )
}

export default function HomeInfo({ currentStage }) {
    return renderContent(currentStage) || null
}
