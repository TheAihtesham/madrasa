"use client";
import { useState } from "react";
import axios from "../../../lib/axios";
import { useRouter } from "next/navigation";

export default function EnrollForm() {
    const [form, setForm] = useState({
        name: "",
        age: "",
        gender: "",
        contact: "",
        address: "",
        email: "",
        dob: "",
        course: "",
        nationality: "",
        guardianName: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        // Basic validation for age input
        if (e.target.name === 'age' && e.target.value < 0) return;
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/enroll", form);
            alert("Enrollment submitted successfully! Await admin approval.");
            router.push("/");
        } catch (err) {
            console.error("Enrollment Submission Error:", err);
            alert("Error submitting form. Please check your details and try again.");
        } finally {
            setLoading(false);
        }
    };


    const formFields = [
        // Personal Details 
        { name: "name", label: "Full Name", type: "text", required: true, span: 2 },
        { name: "email", label: "Email Address", type: "email", required: true, span: 2 },
        { name: "dob", label: "Date of Birth", type: "date", required: true, span: 1 },
        { name: "age", label: "Age", type: "number", required: true, span: 1 },

        // Contact & Demographic Details 
        { name: "course", label: "Course", type: "select", options: ["الدورة الأولى", "الدورة الثانية", "الدورة الثالثة", "الدورة الرابعة", "الدورة الخامسة", "الدورة السادسة"], required: true, span: 1 },
        { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true, span: 1 },
        { name: "nationality", label: "Nationality", type: "text", required: true, span: 1 },
        { name: "contact", label: "Contact Phone", type: "tel", required: true, span: 2 },

        //  Guardian & Address 
        { name: "guardianName", label: "Parent/Guardian Name", type: "text", required: true, span: 2 },
        { name: "address", label: "Full Address", type: "textarea", required: true, span: 4 }, // Takes full width
    ];


    const renderInput = (field) => {
        const inputClass = "w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg transition duration-150";

        switch (field.type) {
            case "select":
                return (
                    <select
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        className={inputClass + " appearance-none bg-white"}
                    >
                        <option value="" disabled>Select {field.label}</option>
                        {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case "textarea":
                return (
                    <textarea
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={`Enter ${field.label}`}
                        rows="3"
                        className={inputClass}
                    />
                );
            case "number":
                return (
                    <input
                        name={field.name}
                        type="number"
                        value={form[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={`Enter ${field.label}`}
                        min={field.name === 'age' ? "1" : undefined}
                        className={inputClass}
                    />
                );
            default:
                return (
                    <input
                        name={field.name}
                        type={field.type}
                        value={form[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={`Enter ${field.label}`}
                        className={inputClass}
                    />
                );
        }
    };

    return (
        <div className="p-4 md:p-10 pt-2 bg-gray-50 min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto bg-white p-8 md:p-12 mt-15 shadow-2xl rounded-xl border border-gray-100"
            >
                <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">
                    Student Enrollment Application
                </h1>
                <p className="text-center text-gray-500 mb-8 border-b pb-4">
                    Please fill in all required fields accurately to submit your application.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {formFields.map((field) => (
                        <div
                            key={field.name}
                            className={`col-span-1 md:col-span-${field.span}`}
                        >
                            <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            {renderInput(field)}
                        </div>
                    ))}
                </div>

                {/* Submission Button */}
                <div className="mt-10">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-white transition duration-200 shadow-lg ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">...</svg>
                                Submitting Application...
                            </span>
                        ) : (
                            "Submit Enrollment Form"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}