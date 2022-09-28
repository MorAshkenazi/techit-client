import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { checkUser } from "../services/usersService";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values) => {
      checkUser(values)
        .then((result) => {
          console.log(result.data);
          sessionStorage.setItem("token", result.data.token);
          successMsg("You logged in successfully!");
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
          errorMsg("Oops...something went wrong..");
        });
    },
  });
  return (
    <form className="mx-auto w-25" onSubmit={formik.handleSubmit}>
      <h3 className="display-5 text-center">LOGIN</h3>
      <div className="mb-3 form-floating">
        <input
          type="email"
          className="form-control"
          id="inputEmailLogin"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
        />
        <label htmlFor="inputEmailLogin">Email address</label>
      </div>
      {formik.touched.email && formik.errors.email ? (
        <p className="text-danger">{formik.errors.email}</p>
      ) : null}
      <div className="mb-3 form-floating">
        <input
          type="password"
          className="form-control"
          id="inputPasswordLogin"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
        />
        <label htmlFor="inputPasswordLogin">Password</label>
      </div>
      {formik.touched.password && formik.errors.password ? (
        <p className="text-danger">{formik.errors.password}</p>
      ) : null}
      <div>
        <button
          type="submit"
          className="btn btn-secondary w-100"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Submit
        </button>
        <p className="text-center mt-3">
          <Link to="/register">New user? Register here</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
