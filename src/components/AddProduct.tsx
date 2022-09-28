import { FunctionComponent } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { Link, useNavigate } from "react-router-dom";
import { addProduct } from "../services/productsService";
import Navbar from "./Navbar";

interface AddProductProps {}

const AddProduct: FunctionComponent<AddProductProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      category: "",
      description: "",
      image: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      price: yup.number().required().min(0),
      category: yup.string().required().min(2),
      description: yup.string().required().min(2),
      image: yup.string().required().min(2),
    }),
    onSubmit: (values) => {
      addProduct(values)
        .then((result) => {
          console.log(result.data);
          successMsg("Product was added successfully!");
          navigate("/products");
        })
        .catch((error) => {
          console.log(error);
          errorMsg("Oops...something went wrong..");
        });
    },
  });
  return (
    <>
      <Navbar />
      <form className="mx-auto w-25" onSubmit={formik.handleSubmit}>
        <h3 className="display-5 text-center">ADD NEW PRODUCT</h3>
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
            type="number"
            className="form-control"
            id="inputPrice"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Price"
          />
          <label htmlFor="inputPrice">Price</label>
        </div>
        {formik.touched.price && formik.errors.price ? (
          <p className="text-danger">{formik.errors.price}</p>
        ) : null}
        <div className="mb-3 form-floating">
          <input
            type="text"
            className="form-control"
            id="inputCategory"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Category"
          />
          <label htmlFor="inputCategory">Category</label>
        </div>
        {formik.touched.category && formik.errors.category ? (
          <p className="text-danger">{formik.errors.category}</p>
        ) : null}
        <div className="mb-3 form-floating">
          <input
            type="text"
            className="form-control"
            id="inputDescription"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Description"
          />
          <label htmlFor="inputDescription">Description</label>
        </div>
        {formik.touched.description && formik.errors.description ? (
          <p className="text-danger">{formik.errors.description}</p>
        ) : null}
        <div className="mb-3 form-floating">
          <input
            type="text"
            className="form-control"
            id="inputImage"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Image"
          />
          <label htmlFor="inputImage">Image</label>
        </div>
        {formik.touched.image && formik.errors.image ? (
          <p className="text-danger">{formik.errors.image}</p>
        ) : null}
        <div>
          <button
            type="submit"
            className="btn btn-secondary w-100"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
