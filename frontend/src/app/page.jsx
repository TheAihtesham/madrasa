"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "../../lib/axios"; 
import Head from 'next/head'; 

const PatternDivider = () => (
    <div className="flex justify-center py-4">
        <svg className="w-64 h-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4m16 0c0-6.075-4.925-11-11-11S1 5.925 1 12s4.925 11 11 11 11-4.925 11-11z"></path>
        </svg>
    </div>
);

export default function Home() {
    const { user } = useUser();
    const router = useRouter();
    const [notices, setNotices] = useState([]);
    const [loadingNotices, setLoadingNotices] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {

                const response = await axios.get("/notices");
                setNotices(response.data.slice(0, 3));

            } catch (error) {
                console.error("Failed to fetch notices:", error);
            } finally {
                setLoadingNotices(false);
            }
        };

        fetchNotices();
    }, []);


    return (
        <>
            <Head>
                <title>Madrasa Noor-ul-Islam - Education, Peace, Purity</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
            </Head>
            <div className="font-['Inter'] bg-stone-50 text-stone-800 antialiased pt-20">
                <Navbar />
                <section
                    id="home"
                    className="h-[80vh] min-h-[600px] bg-cover bg-center flex flex-col justify-center items-center text-center text-white relative overflow-hidden"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('https://my-masjid.com/wp-content/uploads/2020/12/banner_op3_3.jpg')",
                    }}
                >
                    <div className="max-w-5xl mx-auto p-6 md:p-12 backdrop-blur-sm bg-black/20 rounded-2xl shadow-2xl">
                        <h2 className="text-5xl md:text-7xl font-['Noto_Nastaliq_Urdu'] font-extrabold mb-6 leading-tight">
                            "علم حاصل کرو کیونکہ علم ہر مسلمان مرد و عورت پر فرض ہے"
                        </h2>
                        <p className="text-xl md:text-2xl font-light mb-8 italic">
                            A place of peace, purity, and knowledge — Madrasa Noor-ul-Islam welcomes you.
                        </p>
                        <button
                            onClick={() => (user ? router.push("/enroll") : alert("Please Login First"))}
                            className="px-10 py-4 bg-amber-500 text-stone-900 text-xl font-bold rounded-full hover:bg-amber-400 transition duration-300 ease-in-out transform hover:scale-105 shadow-xl"
                        >
                            ✨ Enroll Now & Start Your Journey
                        </button>
                    </div>
                </section>

                <section id="notices-callout" className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

                        <div className="lg:col-span-2 lg:p-8 bg-stone-50 p-3 rounded-2xl shadow-xl border-t-4 border-green-600">
                            <h2 className="text-2xl lg:text-3xl font-extrabold text-green-800 mb-6 flex items-center">
                                 Latest Notices
                                <span className="ml-auto text-sm font-medium text-green-600 hover:text-green-800 cursor-pointer" onClick={() => router.push('/notice')}>View All</span>
                            </h2>
                            {loadingNotices ? (
                                <p className="text-stone-500">Loading notices...</p>
                            ) : notices.length > 0 ? (
                                <ul className="space-y-4">
                                    {notices.map((notice) => (
                                        <li key={notice._id} className="border-b border-stone-200 pb-3 last:border-b-0 flex justify-between items-start">
                                            <span className="text-lg font-medium text-stone-700 hover:text-green-600 cursor-pointer"
                                            onClick={()=>router.push("/notice")}
                                            >{notice.title}</span>
                                          {notice.pdf && (
                                                <a
                                                    href={notice.pdf}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-2 text-green-600 mt-3 text-sm font-medium hover:underline"
                                                >
                                                     View PDF 
                                                </a>
                                            )}
                                            <span className="text-sm text-stone-500 ml-4 whitespace-nowrap">{notice.description}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-stone-500">No recent notices available.</p>
                            )}
                        </div>

                        <div className="lg:col-span-1 bg-green-800 p-8 rounded-2xl shadow-xl flex flex-col justify-center text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">A Message of Purpose</h3>
                            <p className="text-green-200 mb-6 italic">
                                "The best among you are those who learn the Qur'an and teach it." - Prophet Muhammad (PBUH)
                            </p>
                            <button
                                className="px-6 py-3 bg-amber-500 text-green-900 font-semibold rounded-full hover:bg-amber-400 transition duration-300"
                            >
                                Our Mission
                            </button>
                        </div>
                    </div>
                </section>

                <section id="courses" className="py-24 bg-stone-50 text-center">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <h2 className="text-4xl font-extrabold text-green-800 mb-4">📚 Our Academic Programs</h2>
                        <PatternDivider />
                        <p className="text-xl text-stone-600 mb-16 max-w-3xl mx-auto">Providing comprehensive and authentic Islamic education to nurture pious and knowledgeable individuals.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[
                                { title: "Qur'an Memorization (Hifz)", icon: "📖", desc: "Dedicated program for memorizing the Holy Qur'an with correct pronunciation." },
                                { title: "Tajweed & Qira’at", icon: "🗣️", desc: "Mastering the rules of recitation and different authentic reading styles." },
                                { title: "Islamic Studies (Dars-e-Nizami)", icon: "🎓", desc: "In-depth classical curriculum covering various Islamic sciences." },
                                { title: "Arabic Grammar & Language", icon: "✍️", desc: "Foundation course for understanding the language of the Qur'an and Hadith." },
                                { title: "Fiqh (Islamic Jurisprudence)", icon: "⚖️", desc: "Study of practical Islamic laws based on the consensus of the scholars." },
                                { title: "Urdu & Islamic Literature", icon: "📜", desc: "Developing linguistic skills and appreciating classical Islamic texts." },
                            ].map((course, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-8 rounded-xl border border-stone-200 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 text-left"
                                >
                                    <span className="text-4xl block mb-4">{course.icon}</span>
                                    <h3 className="text-2xl font-bold text-green-800 mb-3">{course.title}</h3>
                                    <p className="mt-2 text-stone-600">{course.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

 
                <section
                    id="donations"
                    className="py-24 bg-cover bg-center text-center text-white relative"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(28, 71, 56, 0.9), rgba(28, 71, 56, 0.8)), url('https://picsum.photos/seed/madrasa-donation/1200/600')",
                    }}
                >
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <h2 className="text-4xl font-extrabold mb-4 text-amber-300">💚 Empowering The Future of Islam</h2>
                        <p className="text-xl font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                            Your generous contribution is a continuous charity (*Sadaqah Jariyah*). It helps us provide **free education, food, and accommodation** to deserving students seeking sacred knowledge.
                        </p>
                        <button
                            onClick={() => router.push("/donation")}
                            className="px-10 py-4 bg-amber-500 text-green-900 rounded-full font-bold text-xl hover:bg-amber-400 transition duration-300 shadow-2xl shadow-green-900/50 transform hover:scale-105"
                        >
                            🤲 Donate 
                        </button>
                    </div>
                </section>

                <section id="achievements" className="py-24 bg-white text-center">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <h2 className="text-4xl font-extrabold text-green-800 mb-4">🏆 Milestones of Excellence</h2>
                        <PatternDivider />
                        <p className="text-xl text-stone-600 mb-16 max-w-3xl mx-auto">Celebrating the dedication and success of our bright students in national and international forums.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                {
                                    title: "National Hifz Competition Winner",
                                    desc: "Our student Abdullah Khan secured 1st position in the National Qur'an Memorization Contest 2024.",
                                    icon: "🥇"
                                },
                                {
                                    title: "Arabic Excellence Award",
                                    desc: "Fatima Bano achieved distinction in Arabic Grammar & Recitation held by Islamic Foundation.",
                                    icon: "✨"
                                },
                                {
                                    title: "Islamic Knowledge Champion",
                                    desc: "Team Madrasa Noor-ul-Islam won the Inter-Madrasa Islamic Quiz Competition 2025.",
                                    icon: "🧠"
                                },
                            ].map((a, i) => (
                                <div
                                    key={i}
                                    className="bg-stone-50 p-6 rounded-xl border-l-4 border-amber-500 shadow-lg transition duration-300 hover:shadow-xl text-left"
                                >
                                    <div className="text-4xl mb-3">{a.icon}</div>
                                    <h3 className="text-xl font-bold text-green-700">{a.title}</h3>
                                    <p className="mt-2 text-stone-600">{a.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-green-800 text-center text-white border-t-8 border-amber-500">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <h2 className="text-4xl font-extrabold mb-4 text-amber-300">Start Your Journey Towards Enlightenment Today!</h2>
                        <p className="text-xl mb-8 font-light">
                            Transform your life through the light of knowledge and spiritual growth. Enroll now for the upcoming session.
                        </p>
                        <button
                            onClick={() => (user ? router.push("/enroll") : alert("Please Login First"))}
                            className="px-12 py-4 bg-white text-green-800 rounded-full font-bold text-xl hover:bg-stone-100 transition duration-300 shadow-2xl shadow-green-900/50 transform hover:scale-105"
                        >
                            🕌 Apply for Enrollment
                        </button>
                    </div>
                </section>


                <footer className="bg-green-900 text-green-200 py-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

                        <div>
                            <h3 className="text-xl font-bold text-amber-500 mb-4">Madrasa Noor-ul-Islam</h3>
                            <p className="text-sm">Dedicated to spreading authentic Islamic knowledge and fostering a community of righteous scholars.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-sm">

                                <li><a href="/notice" className="hover:text-amber-500 transition">Latest Notices</a></li>
                                <li><a href="/donation" className="hover:text-amber-500 transition">Support Us</a></li>

                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                            <p className="text-sm">123 Islamic Center Rd, Knowledge City, State 45678</p>
                            <p className="text-sm mt-2">Email: info@madrasanoor.edu</p>
                            <p className="text-sm">Phone: (123) 456-7890</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                            <div className="flex space-x-4 text-2xl">
                                <a href="#" className="hover:text-amber-500 transition">FB</a>
                                <a href="#" className="hover:text-amber-500 transition">TW</a>
                                <a href="#" className="hover:text-amber-500 transition">IG</a>
                            </div>
                        </div>

                    </div>
                    <div className="max-w-7xl mx-auto text-center mt-10 border-t border-green-700 pt-6">
                        <p className="text-sm text-green-400">© {new Date().getFullYear()} Madrasa Noor-ul-Islam. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
