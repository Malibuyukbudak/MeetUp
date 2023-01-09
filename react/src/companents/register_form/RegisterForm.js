import { Formik } from 'formik';
import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import * as yup from "yup"

function RegisterForm({ submit }) {
    const schema = yup.object().shape({
        nameSurname: yup.string().required('Required'),
        username: yup.string().required('Required'),
        email: yup.string().email('Invalid email').required('Required'),
        password: yup.string()
            .min(8, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        telephone: yup.string().required('Required'),
    });
    return (
        <Formik
            validationSchema={schema}
            onSubmit={submit}
            initialValues={{
                nameSurname: '',
                username: '',
                email: '',
                password: '',
                telephone: ''
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

                <Form style={{ width: "40%", marginLeft: "10%", marginTop: "5%" }} noValidate onSubmit={handleSubmit} >
                    <Image src="login-image.png" height={"100px"} />
                    <Form.Group className='mb-3'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type='nameSurname'
                            placeholder="ali buyukbudak"
                            name="nameSurname"
                            value={values.nameSurname}
                            onChange={handleChange}
                            isInvalid={!!errors.nameSurname}
                        >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.nameSurname}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            name="username"
                            value={values.username}
                            placeholder="malibuyukbudak"
                            isInvalid={!!errors.username}
                        >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="ali.buyukbudak@adesso.com.tr"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control
                            type="telephone"
                            onChange={handleChange}
                            name="telephone"
                            value={values.telephone}
                            placeholder="0555 177 2134"
                            isInvalid={!!errors.telephone}
                        >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.telephone}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="********"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" >Register</Button>
                    <Link to="/login">
                        <Button style={{ marginLeft: '10px' }} variant="secondary">Login</Button>
                    </Link>
                </Form>

            )}

        </Formik>
    )
}

export default RegisterForm