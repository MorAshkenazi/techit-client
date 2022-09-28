import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { User } from "../interfaces/User";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { addUser } from "../services/usersService";
import { Link, useNavigate } from "react-router-dom";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values) => {
      let user: User = { ...values, isAdmin: false };
      addUser(user)
        .then((result) => {
          console.log(result.data);
          sessionStorage.setItem("token", result.data.token);
          successMsg("You registered successfully!");
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
      <h3 className="display-5 text-center">REGISTER</h3>
      <div className="mb-3 form-floating">
        <input
          type="text"
          className="form-control"
          id="inputName"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Name"
        />
        <label htmlFor="inputName">Name</label>
      </div>
      {formik.touched.name && formik.errors.name ? (
        <p className="text-danger">{formik.errors.name}</p>
      ) : null}
      <div className="mb-3 form-floating">
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
        />
        <label htmlFor="inputEmail">Email address</label>
      </div>
      {formik.touched.email && formik.errors.email ? (
        <p className="text-danger">{formik.errors.email}</p>
      ) : null}
      <div className="mb-3 form-floating">
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
        />
        <label htmlFor="inputPassword">Password</label>
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
          <Link to="/">Already have user? Login here</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
