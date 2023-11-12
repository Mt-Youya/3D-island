import { Suspense, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import emiljs from "@emailjs/browser"
import Fox from "../models/Fox.jsx"
import Loader from "../components/Loader.jsx"
import useAlert from "../hooks/useAlert.js"
import Alert from "../components/Alert.jsx"

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" })
    const [loading, setLoading] = useState(false)
    const [currentAnimation, setCurrentAnimation] = useState("idle")
    const { alert, showAlert, hideAlert } = useAlert()

    const formRef = useRef(null)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleFocus() {
        setCurrentAnimation("walk")
    }

    function handleBlur() {
        setCurrentAnimation("idle")
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setCurrentAnimation("hit")

        await emiljs.sendForm(
            import.meta.env.VITE_APP_SERVICE_ID,
            import.meta.env.VITE_APP_TEMPLATE_ID,
            {
                form_name: form.name,
                to_name: "Yonjay",
                form_email: "contact@jay.me",
                to_email: form.email,
                message: form.message,
            },
            import.meta.env.VITE_APP_PUBLIC_ID,
        ).catch(
            () => {
                setLoading(true)
                setCurrentAnimation("idle")
                showAlert({
                    show: true,
                    text: "I didn't receive your message 😢",
                    type: "danger",
                })
            },
        )
        showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
        })
        setLoading(false)

        setTimeout(() => {
            hideAlert(false)
            setCurrentAnimation("idle")
            setForm({
                name: "",
                email: "",
                message: "",
            })
        }, [3000])
    }

    return (
        <section className="relative flex lg:flex-row flex-col max-container">
            {alert.show && <Alert {...alert} />}

            <div className="flex min-w-[50%] flex flex-col">
                <h1 className="head-text">Get in Touch </h1>

                <form className="w-full flex flex-col gap-7 mt-14" ref={formRef} onSubmit={handleSubmit}>
                    <label className="text-black-500">
                        Name
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Yonjay"
                            className="input"
                            value={form.name}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text-black-500">
                        Email
                        <input
                            required
                            type="text"
                            name="email"
                            placeholder="yonjay@gmail.com"
                            className="input"
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text-black-500">
                        Your Message
                        <textarea
                            required
                            rows="4"
                            name="message"
                            placeholder="Let me know how I can help you!"
                            className="textarea"
                            value={form.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>

                    <button type="submit" className="btn" onFocus={handleFocus} onBlur={handleBlur} disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>

            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
                <Canvas
                    camera={{
                        position: [0, 0, 5],
                        fov: 75,
                        near: 0.1,
                        far: 1000,
                    }}
                >
                    <directionalLight position={[0, 0, 1]} intensity={2.5} />
                    <ambientLight intensity={1} />
                    <pointLight position={[5, 10, 0]} intensity={2} />
                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={2}
                    />

                    <Suspense fallback={<Loader />}>
                        <Fox
                            currentAnimation={currentAnimation}
                            position={[0.5, 0.35, 0]}
                            rotation={[12.629, -0.6, 0]}
                            scale={[0.5, 0.5, 0.5]}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    )
}
