import React from 'react'
import { Button, Navbar,Stack } from 'react-bootstrap'

export default function SingedOut() {
    return (
        <div>
            <Navbar.Collapse className="justify-content-end">

                <Stack direction="horizontal" gap={3}>
                    <Button variant="outline-success">Login</Button>
                    <Button variant="outline-primary">Register</Button>
                </Stack>
            </Navbar.Collapse>
        </div>
    )
}
