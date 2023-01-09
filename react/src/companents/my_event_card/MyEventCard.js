import { useState } from 'react';
import { Image, ListGroup, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CreateFormEvent from '../form/CreateFormEvent';
import * as yup from "yup"
import './MyEventCard.css'

function MyCardEvent({
  id, title, description, image, date, categories,
  categoryId, capacity, state, city, getCategories, deleteEvent,
  updateEvent
}) {


  yup.object().shape({
    title: yup.string().required(),
    //categories: yup.string().required(),
    capacity: yup.number().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    date: yup.date().required(),
    image: yup.string().required(),
    description: yup.string().required(),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div style={{ margin: '40px', display: 'block', width: 800 }}>

      <div className="left">
        <Image variant="top" className='my-card-image' src={image} />
        <ListGroup >
          <ListGroup.Item className='my-title'>{title} </ListGroup.Item >
          <ListGroup.Item>{date}</ListGroup.Item>
          <ListGroup.Item> Category: {categories}</ListGroup.Item>
          <ListGroup.Item> Capacity: {capacity}</ListGroup.Item>
          <ListGroup.Item> State: {state}</ListGroup.Item>
          <ListGroup.Item> City: {city}</ListGroup.Item>
        </ListGroup>
        <ListGroup >
          <ListGroup.Item  >
            <Button variant="outline-danger" onClick={() => deleteEvent(id)}>Delete</Button>
            <Button style={{ marginLeft: '10px' }} variant="outline-success" onClick={handleShow}>Update</Button>
          </ListGroup.Item >
        </ListGroup>
        <Modal show={show} onHide={handleClose} responsive="lg" >
          <CreateFormEvent
            getCategories={getCategories}
            capacity={capacity}
            city={city}
            date={date}
            description={description}
            image={image}
            title={title}
            state={state}
            categories={categoryId}
            createEventSubmit={(values) => updateEvent({ id, values })}
          ></CreateFormEvent>
        </Modal >
      </div>

      <div className="my-right">
        <ListGroup>
          <div className='my-description'>Description</div>
          <ListGroup.Item  >
            {description}
          </ListGroup.Item >
        </ListGroup>
      </div>
    </div>
  )
}

export default MyCardEvent