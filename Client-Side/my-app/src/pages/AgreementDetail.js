import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import AgreementService from '../services/agreementService'
import { Alert, Button, Card, Container } from 'react-bootstrap'
import Navi from '../layouts/Navi'

export default function AgreementDetail() {
    let { id } = useParams()
    const [agreement, setAgreement] = useState({})
    const [files, setFiles] = useState([])
    const [fileData, setfileData] = useState([])
    useEffect(  ()  => {
        let agreementService = new AgreementService()
        agreementService.getAgreementById(id).then(result => setAgreement(result.data.data))
        agreementService.getAgreementById(id).then(result => setFiles(result.data.data.files))
    }, [])
    const handleFiles = async (e) => {
        try {
            for (let index = 0; index < files.length; index++) {
                setfileData(files.map(file => file.data))
                console.log(index)
                console.log(fileData)
            }
        } catch (error) {
          alert(error.message)
        }
      };
        // for (let index = 0; index < files.length; index++) {
        //     setfileData(fileData + files[index].type)
        //     console.log(index)
        
        // }
        console.log(fileData)
    // console.log(agreement.files.length)
    //console.log(agreement.files[1].data)
    // for (let index = 0; index < agreement.files.length; index++) {
    //     const element = agreement.files[index].data;
    //     console.log(element)
    //     setfileData(element)
    // }
    return (
        <div>
            <Container>
            <Navi/>
            <Card className="text-center mt-3">
                <Card.Header>Agreement Id :{agreement.id}</Card.Header>
                <Card.Body>
                    <Card.Title>Agreement Name :{agreement.agreementName}</Card.Title>
                    <Card.Text>
                        Agreement Description :{agreement.description}
                    </Card.Text>
                    <Card.Text>
                        Agreement Total Price :{agreement.agreementTotalPrice}
                    </Card.Text>
                    <Card.Text>
                        Agreement Withdrawal Fee :{agreement.agreementWithdrawalFee}
                    </Card.Text>
                    {/* {files.map(file =>(file.type))} */}
                    <Card.Text> 
                        {files.length > 0 ?
                        <Button onClick={handleFiles} variant='success' className='m-3'>Show Files</Button>:
                        <Alert variant="danger">
                            Files not Found {' '}
                        </Alert>}
                        {fileData.map(item => (
                            // <li style={{listStyle :"none"}}>
                            //     <a target="_blank" href={item}>{item}</a>
                            // </li>
                            <Alert key={item} variant="success">
                            İf you want to see file on click Link {' '}
                            <Alert.Link target="_blank" href={item}>{item}</Alert.Link>
                           </Alert>
                            ))}
                    </Card.Text>
                    <Card.Text>
                        Agreement Acceptance Date :{agreement.acceptanceDate}
                    </Card.Text>
                    <Card.Text>
                        Agreement End Date :{agreement.endDate}
                    </Card.Text>
                    <Card.Text>
                        
                    </Card.Text>
                    
                    <Button variant="primary" as={NavLink} to={`/agreements`} >Go Back</Button>
                </Card.Body>
                <Card.Footer className="text-muted"> 
                {/* {agreement.map(user => <div>{user.name}</div>)} */}
                </Card.Footer>
            </Card>
            </Container>
        </div>
    )
}
