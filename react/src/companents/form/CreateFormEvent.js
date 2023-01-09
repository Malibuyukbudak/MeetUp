import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as yup from "yup"

function CreateFormEvent({ title, capacity, categories, city, state, date, image, description, createEventSubmit, getCategories }) {
    const schema = yup.object().shape({
        title: yup.string().required(),
        //categories: yup.string().required(),
        capacity: yup.number().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        date: yup.string().required(),
        image: yup.string().required(),
        description: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    return (
        <Formik
            validationSchema={schema}
            onSubmit={createEventSubmit}
            initialValues={{
                title: title,
                categories: categories,
                capacity: capacity,
                city: city,
                state: state,
                date: date,
                image: image,
                description: description,
                terms: false,
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <div style={{ margin: "80px" }}>
                    <Form noValidate onSubmit={handleSubmit} >
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationFormik01">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Adesso Happy Hour"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Title.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="validationFormik02">
                                <Form.Label>Categories</Form.Label>
                                <Form.Select
                                    onChange={handleChange}
                                    name="categories"
                                    value={values.categories}
                                >
                                    {getCategories?.map((x, y) =>
                                        <option value={x?._id || x?.id} key={y}>{x?.name}</option>)
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Category.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="validationFormik03">
                                <Form.Label>Capacity</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="100"
                                    name="capacity"
                                    value={values.capacity}
                                    onChange={handleChange}
                                    isInvalid={!!errors.capacity} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Capacity.
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} controlId="validationFormik04">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Istanbul"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    isInvalid={!!errors.city} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="validationFormik05">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Maslak"
                                    name="state"
                                    value={values.state}
                                    onChange={handleChange}
                                    isInvalid={!!errors.state} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                                </Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group as={Col} controlId="validationFormik06">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="date"
                                    value={values.date}
                                    onChange={handleChange}
                                    isInvalid={!!errors.date}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Image.
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Row >

                        {/* <Form.Group className="mb-3" controlId="validationFormik07">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Image"
                                name="image"
                                value={values.image}
                                onChange={handleChange}
                                isInvalid={!!errors.image}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Image.
                            </Form.Control.Feedback>
                        </Form.Group> */}
                        <Form.Group className="mb-3" controlId="validationFormik07">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Image"
                                name="image"
                                value={values.image}
                                onChange={handleChange}
                                isInvalid={!!errors.image}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Image.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                placeholder="Leave a comment here"
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Description.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                name="terms"
                                value={values.terms}
                                label="Agree to terms and conditions"
                                onChange={handleChange}
                                isInvalid={!!errors.terms}
                                feedback={errors.terms}
                                feedbackType="invalid"
                                id="validationFormik0"
                            />
                        </Form.Group>
                        <Button type="submit">Save Event</Button>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

export default CreateFormEvent