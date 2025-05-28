"use client";
import React, { useState } from 'react';
import { login } from '@/service/authService';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
export default function Login() {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
 const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if(user){
      console.log("user", user);
      router.push('/')
    }
    else{
      router.push('/login')
    }

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    validate(name, value);
  }

  const validate = (name, value) => {
    const newErrors = { ...errors };
    if (!value) {
      newErrors[name] = `${name} is required`;
    }
    else {
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
        email: userData.email,
        password: userData.password,
      }
      await login(req)
        .then((res) => {
          if (res.status) {
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: res.message,
            })
            localStorage.setItem('user', JSON.stringify(res.user));
            Cookies.set('user', JSON.stringify(res.user), { expires: 7 });
            window.location.href = '/';
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: res.message,
            })
          }
        })
    } catch (error) {
      console.log("error in login user", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          </div>

          <div className="flex items-center justify-end">
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
          </div>

          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
}
