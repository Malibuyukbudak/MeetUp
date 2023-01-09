import { Formik } from 'formik';
import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from "yup"
import { Link } from 'react-router-dom';

function LoginForm({ submit }) {
    const schema = yup.object().shape({
        email: yup.string().required('Required'),
        password: yup.string()
            .min(8, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
    });

    return (
        <Formik
            validationSchema={schema}
            onSubmit={submit}
            initialValues={{
                email: '',
                password: ''
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
                        <Form.Label>Email & Username</Form.Label>
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
                    <Button type="submit">Login</Button>
                    <Link to='/register'>
                        <Button style={{ marginLeft: '10px' }} type="submit" variant='secondary'>Register</Button>
                    </Link>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm