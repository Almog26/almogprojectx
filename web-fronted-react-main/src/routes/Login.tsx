import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../@types/types";
import { useAuth } from "../hooks/useAuth";
import auth from "../services/auth";
import { showSuccessDialog, showErrorDialog } from "../ui/dialogs";
import patterns from "../validation/patterns";
import { useThemeFunction } from "../contexts/ThemeContext";
const Login = () => {
const { theme, toggle } = useThemeFunction();
const navigate = useNavigate();
const { login } = useAuth();
const onLogin = (data: LoginUser) => {
auth
.login(data)
.then((res) => {
showSuccessDialog("Login", "Logged in").then(() => {
login(res.data);
// send the user to home page
navigate("/");
});
})
.catch((e) => {
showErrorDialog("Login Error", e.response.data);
});
};
const {
register,
handleSubmit,
formState: { errors },
} = useForm<LoginUser>();
return (
<div className={`${theme === "light" ? "bg-gray-100" : "bg-gray-500"} flex justify-center items-center flex-col`}>
<h4 className="text-yellow-500 text-3xl  ">Login info </h4>

<form noValidate onSubmit={handleSubmit(onLogin)}>
{/* email */}
<section>
<h2 className=" text-black">email</h2>
<input
placeholder="Email"
autoCapitalize="true"
autoCorrect="false"
autoComplete="email"
type="email"
{...register("email", {
required: "This field is mandatory",
pattern: patterns.email,
})}
/>
{errors.email && <p>{errors.email?.message}</p>}
</section>
<p className="text-black">password</p>
{/* password */}
<section>
<input
autoComplete="current-password"
placeholder="Password"
type="password"
{...register("password", {
required: "This field is mandatory",
pattern: patterns.password,
})}
/>
{errors.password && <p>{errors.password?.message}</p>}
</section>
<button className="text-black rounded-xl h-6 w-11 mt-2 bg-red-100">Login</button>
</form>
</div>
);
};
export default Login;
