import { useContext, useState } from 'react'
import { useFormik } from "formik";
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';



export default function Register() {


    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setAccessToken } = useContext(AuthContext);

    const initialValues = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3)
            .max(15)
            .required("Name is required"),
    
        email: Yup.string()
            .email()
            .required(),
    
        password: Yup.string()
            .min(4)
            .max(9)
            .matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must start with an uppercase letter followed by 3-8 lowercase letters or numbers")
            .required("Password is required"),
    
        rePassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required(),
    
        phone: Yup.string()
            .matches(/^(002)?01[0125][0-9]{8}$/)
            .required(),
    });

    const formik = useFormik({
        initialValues,
        // validate: validateForm,
        validationSchema,
        onSubmit: handleRegister,

    });

    



    async function handleRegister(values) {
        console.log("submit", values);
        setIsLoading(true);
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/auth/signup`,
                values
            );
            console.log(data);
            //success
            if (data.message === "success") {

                setAccessToken(data.token);

                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            setError(error.response.data.message)

        } finally {
            setIsLoading(false);
        }
    }



    return (
        <>
            <section className="container h-screen mt-14 pt-16">
                <div className="max-w-xl mx-auto">
                    <h1 className="text-lg font-bold mb-8">Register:</h1>


                    {error && <div className="alert alert-error max-w-xl mx-auto my-5">{error}</div>}{" "}

                    <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            <label
                                htmlFor="name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Name:
                            </label>
                            {formik.errors.name && formik.touched.name && (<span className="text-red-600">{formik.errors.name}</span>)}

                        </div>





                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email:
                            </label>
                            {formik.errors.email && formik.touched.email && (<span className="text-red-600">{formik.errors.email}</span>)}
                        </div>




                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            <label
                                htmlFor="password"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Password
                            </label>
                            {formik.errors.password && formik.touched.password && (<span className="text-red-600">{formik.errors.password}</span>)}
                        </div>





                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="password"
                                name="rePassword"
                                id="rePassword"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.rePassword}
                            />
                            <label
                                htmlFor="rePassword"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Confirm your Password
                            </label>
                            {formik.errors.rePassword && formik.touched.rePassword && (<span className="text-red-600">{formik.errors.rePassword}</span>)}
                        </div>




                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />
                            <label
                                htmlFor="phone"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Phone:
                            </label>
                            {formik.errors.phone && formik.touched.phone && (<span className="text-red-600">{formik.errors.phone}</span>)}
                        </div>




                        {formik.isValid}

                        {formik.dirty}


                        <button
                            disabled={!(formik.isValid && formik.dirty)}
                            type="submit"
                            className="btn btn-green">
                            {isLoading ?
                                <i className="fas fa-spinner fa-spin"></i>
                                : "Register"}
                        </button>
                    </form></div></section>
        </>
    )
}