'use client'
import React, { useState } from 'react';
import { register } from '@/service/authService';
import Swal from 'sweetalert2';

const Register = () => {
    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState({
        username: '',
        phone: '',
        email: '',
        password: '',
        role: 'USER'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
        validate(name, value);
    };

    const validate = (name, value) => {
        const newErrors = { ...errors };
        if (!value) {
            newErrors[name] = `${name} is required`;
        } else {
            delete newErrors[name];
            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
        if (Object.keys(newErrors).length !== 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ...newErrors,
            }));
        }
        return Object.keys(newErrors).length === 0;
    };

    const validateAllFields = () => {
        let isValid = true;
        for (const key in userData) {
            if (!validate(key, userData[key])) {
                isValid = false;
            }
        }
        return isValid;
    };

    const handleSubmit = async (e) => {

        const isValid1 = validateAllFields();
        if (!isValid1) {
            return;
        }
        try {
            const req = {
                username: userData.username,
                phone: userData.phone,
                email: userData.email,
                password: userData.password,
                role: userData.role
            }
            await register(req)
                .then((res) => {
                    if (res.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful',
                            text: res.message,
                        })
                        localStorage.setItem('user', JSON.stringify(res.data));
                        window.location.href = '/login';
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Registration Failed',
                            text: res.message,
                        })
                    }
                })
        } catch (error) {
            console.log("error in registering user", error);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select name="role" onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="USER">User</option>
                            <option value="SELLER">Seller</option>
                        </select>
                    </div>
                    <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
