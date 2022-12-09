import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Navi from '../../layouts/Navi'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Container, Dropdown } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; 
import './agreementUpdate.css'
import AgreementService from "../../services/agreementService"; 
import authHeader from "../../services/auth-header";
import { addYears, format } from "date-fns";
import { DateRange } from "react-date-range";
import { faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authService from "../../services/authService";
import {withRouter} from 'react-router-dom';


const AgreementUpdate = () => {

    let { id } = useParams();
    var user = authService.getCurrentUser();
    console.log()
  const [credentials, setCredentials] = useState({
    agreementName: undefined,
    agreementTotalPrice: undefined,
    agreementWithdrawalFee: undefined,
    agreementFile: undefined,
    acceptanceDate: undefined,
    description: undefined,
    endDate : undefined,
    user:user
  });

  const [dates, setDates] = useState([
    {
      startDate: credentials.acceptanceDate,
      endDate: credentials.endDate,
      key: "selection",
    },
  ]);
    useEffect(() => {
        let agreementService = new AgreementService()
        agreementService.getAgreementById(id).then(result => setCredentials(result.data.data))
        console.log(credentials)
    }, [])
    
  const [openDate, setOpenDate] = useState(false);
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(credentials)
  };
  const handleFile = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file",e.target.files[0])
      console.log(e.target.files[0])
      const API_URL = "http://localhost:5000/files"
      const res = await axios.put(API_URL,formData,{ headers: authHeader() })
      console.log(res.data.fileDownloadUri)
      setCredentials((prev) => ({ ...prev, [e.target.id]: res.data.fileDownloadUri }));
    } catch (error) {
      alert(error.message)
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    credentials.acceptanceDate = dates[0].startDate;
    credentials.endDate = dates[0].endDate;
    console.log(credentials)
    try {
      const agreementService = new AgreementService()
      
      const res = await agreementService.updateAgreement(credentials)
      navigate("/")
    } catch (err) {
      console.log(err)
      alert(err.response.data)
    }
  };
  const cancelClick = async (e) => {
    e.preventDefault();
    navigate("/")
  };
  return (
    <div   >
      <Container>
        <Navi />
        <div >
        <InputGroup className='m-3'>
          <InputGroup.Text>Agreement Name</InputGroup.Text>
          <Form.Control  aria-label="With textarea" value={credentials.agreementName} onChange={handleChange} id="agreementName" />
        </InputGroup>
        <InputGroup className='m-3'>
          <InputGroup.Text>Description</InputGroup.Text>
          <Form.Control as="textarea" aria-label="With textarea"  value={credentials.description} onChange={handleChange} id="description" />
        </InputGroup>
        <InputGroup className="m-3">
          <InputGroup.Text>Agreement Totel Price</InputGroup.Text>
          <Form.Control aria-label="Amount (to the nearest dollar)" value={credentials.agreementTotalPrice} onChange={handleChange} id="agreementTotalPrice" />
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <InputGroup className="m-3">
          <InputGroup.Text>Agreement Withdrawal Fee</InputGroup.Text>
          <Form.Control aria-label="Amount (to the nearest dollar)" value={credentials.agreementWithdrawalFee}  onChange={handleChange} id="agreementWithdrawalFee" />
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <InputGroup className='m-3'>
          <InputGroup.Text>Agreement File</InputGroup.Text>
          <Form.Control type="file" defaultValue={credentials.agreementFile} onChange={handleFile}  id="agreementFile" />
        </InputGroup>
        <InputGroup className='m-3' >
          <InputGroup.Text style={{width:"25%"}} >Agreement Dates</InputGroup.Text>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${credentials.acceptanceDate}  ${credentials.endDate}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
                startDatePlaceholder={credentials.acceptanceDate}
                endDatePlaceholder={credentials.endDate}
                
              />
            )}
        </div>
        </InputGroup>
        </div>
        <InputGroup className='m-3 d-grid gap-2'  >
            <Button variant="success" size="lg" onClick={handleClick}>
              Submit
            </Button>
            <Button variant="danger" size="lg" onClick={cancelClick}>
              Cancel
            </Button>
        </InputGroup>
        {error && <span>{error.message}</span>}
      </Container>
    </div>
  );
};

export default AgreementUpdate;
