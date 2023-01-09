import React from 'react'
import { Card, Image, ListGroup } from 'react-bootstrap'

function ProfileCard({ nameSurname, username, email, password, telephone }) {
  return (
    <div style={{ margin: '30px' }}>

      <Card style={{ width: '20rem' }}>
        <Image variant="top" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
        <ListGroup variant="flush">
          <ListGroup.Item> Full Name: {nameSurname}</ListGroup.Item>
          <ListGroup.Item> Username: {username}</ListGroup.Item>
          <ListGroup.Item> Mail: {email}</ListGroup.Item>
          <ListGroup.Item> Password: ************</ListGroup.Item>
          <ListGroup.Item> Telephone: {telephone}</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  )
}

export default ProfileCard