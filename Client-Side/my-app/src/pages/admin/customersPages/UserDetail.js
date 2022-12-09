import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Button, Card, Container } from 'react-bootstrap'
import AdminService from '../service/adminService'

export default function UserDetail() {
    let { id } = useParams()
    const [user, setUser] = useState({})
    useEffect(() => {
        let adminService = new AdminService()
        adminService.getUserById(id).then(result => setUser(result.data.data))
    }, [])
    return (
        <div>
            <Container>
            <Card className="text-center mt-3">
                <Card.Header>Agreement Id :{user.id}</Card.Header>
                <Card.Body>
                    <Card.Title>Agreement Name :{user.email}</Card.Title>
                    <Card.Text>
                        Agreement Description :{user.name}
                    </Card.Text>
                    <Card.Text>
                        Agreement Total Price :{user.password}
                    </Card.Text>
                    
                    <Card.Text>
                        Agreement Total Price :{user.username}
                    </Card.Text>
                    
                    <Button variant="primary" as={NavLink} to={`/admin`} >Go Back</Button>
                </Card.Body>
                <Card.Footer className="text-muted"> 
                {/* {agreement.map(user => <div>{user.name}</div>)} */}
                </Card.Footer>
            </Card>
            </Container>
        </div>
    )
}
