import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from "../../components/inputs/input"
import { validateEmail } from "../../../src/utils/helper";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Silakan masukkan alamat email yang benar.");
      return;
    }

    if (!password) {
      setError ("Silahkan masukkan password Anda")
      return;
    }

    setError("");

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const {token, user} = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Terjadi kesalahan, silakan coba kembali.");
      }
    }
  }

  return (
    <AuthLayout>
    <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Selamat Datang</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Silahkan masukkan detail informasi login Anda
      </p>

      <form onSubmit={handleLogin}>
        <Input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        label="Email"
        placeholder="john@gmail.com"
        type="text" />
     

        <Input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label="Password"
        placeholder="Minimal 8 Karakter"
        type="password" />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type="submit" className='btn-primary'>
          MASUK
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Belum memiliki akun? {" "}
          <Link className="font-medium text-green-600 underline hover:text-green-400" to="/signup">
            Daftar
          </Link>
        </p>
       </form>
    </div>
    </AuthLayout>
  )
}

export default Login
