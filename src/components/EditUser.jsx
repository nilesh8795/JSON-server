import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function EditUser() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (state) {
            setValue("name", state.name || "");
            setValue("email", state.email || "");
            setValue("password", state.password || "");
        }
    }, [state, setValue]);

    const onSubmit = (data) => {
        console.log(data); 
        navigate("/users"); 
    };

    return (
        <div className="mt-10">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        {...register("name")}
                        className="block w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter name"
                    />
                    <p className="text-red-500">{errors.name?.message}</p>
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className="block w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter email"
                    />
                    <p className="text-red-500">{errors.email?.message}</p>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        {...register("password")}
                        className="block w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter password"
                    />
                    <p className="text-red-500">{errors.password?.message}</p>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                    Update
                </button>
            </form>
        </div>
    );
}
