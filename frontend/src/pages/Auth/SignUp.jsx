import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from "../../components/inputs/input"
import { validateEmail } from "../../../src/utils/helper";
import ProfilePhotoSelector from '../../components/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/UserContext';
import { API_PATHS } from '../../utils/apiPaths';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {updateUser} = useContext(UserContext);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Silahkan masukkan nama Anda");
      return;
    }

    if (!validateEmail(email)) {
      setError("Silakan masukkan alamat email yang benar.");
      return;
    }

    if (!password) {
      setError("Silahkan masukkan password Anda");
      return;
    }

    setError("");

    //SignUp API Call
    try {

      //Upload image if present
      if(profilePic) {
        const imageUploadRes = await uploadImage (profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl 
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
  };

  return (
    <AuthLayout>
    <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Daftarkan akun Anda</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Bergabung bersama kami dengan memasukkan detail informasi Anda
        </p>

        <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Nama Lengkap"
            placeholder="John"
            type="text"
            />

    
   

        <Input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        label="Email"
        placeholder="john@gmail.com"
        type="text" />
        
        <div className='col-span-2'>
        <Input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label="Password"
        placeholder="Minimal 8 Karakter"
        type="password" />
        </div>
            </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

<button type="submit" className='btn-primary'>
  DAFTAR
</button>

<p className="text-[13px] text-slate-800 mt-3">
  Sudah memiliki akun? {" "}
  <Link className="font-medium text-green-600 underline hover:text-green-400" to="/login">
    Masuk
  </Link>
</p>
          </form> 
    </div>
    </AuthLayout>
  )
}

export default SignUp
