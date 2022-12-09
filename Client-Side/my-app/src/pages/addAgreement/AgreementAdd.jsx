import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Navi from '../../layouts/Navi'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Container, Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; 
import './agreementAdd.css'
import AgreementService from "../../services/agreementService"; 
import authHeader from "../../services/auth-header";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authService from "../../services/authService";
import UploadFiles from "../../components/UploadFiles";


const AgreementAdd = () => {


  //const [customers, setCustomers] = useState([])
  // useEffect(() => {
  //   const handleonLoad = async (e) => {
  //     const API_URL = "http://localhost:5000/api/customer"
  //       const res = await axios.get(API_URL,{ headers: authHeader() })
       
  //       return setCustomers(res.data.data);
  //   };
      
  //   return () => {
  //     handleonLoad()
  //   }
  // }, [])
  
    // const handleonLoad = async (e) => {
    //   const API_URL = "http://localhost:5000/api/customer"
    //     const res = await axios.get(API_URL,{ headers: authHeader() })
       
    //     return setCustomers(res.data.data);
    // };
    const formData = new FormData();
    var user = authService.getCurrentUser();
   const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [files,setFiles] = useState([])
  const [credentials, setCredentials] = useState({
    agreementName: undefined,
    agreementTotalPrice: undefined,
    agreementWithdrawalFee: undefined,
    acceptanceDate: new Date(),
    description: undefined,
    endDate : undefined,
    user:user,
  });
 
  const [openDate, setOpenDate] = useState(false);
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(credentials)
  };
  const handleDate = () => {
    setCredentials({credentials: {acceptanceDate: dates[0].startDate}});
    console.log(credentials)
  };
  const handleFile = async (e) => {
    try {
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("files",e.target.files[i])
      }
      // const API_URL = "http://localhost:5000/files"
      // const agreement = "credentials.agreementName";
      // const ress = await axios.put(API_URL,formData,{ headers: {
      //     "Content-type": "application/json",
      //   } })
      // formData.append("file",e.target.files[0])
      // const API_URL = "http://localhost:5000/files"
      // const res = await axios.put(API_URL,files,credentials,{ headers: authHeader() })
     
      for (const values of formData.entries()) {
        console.log(values)
        
      }
    } catch (error) {
      alert(error.message)
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    credentials.acceptanceDate = dates[0].startDate;
    credentials.endDate = dates[0].endDate;
    setFiles(formData)
    console.log(files)
    console.log(credentials)
    try {
      const agreementService = new AgreementService()
      
      const res = await agreementService.addAgreement(
        credentials.agreementName,
        credentials.description,
        credentials.agreementTotalPrice,
        credentials.agreementWithdrawalFee,
        credentials.acceptanceDate,
        credentials.endDate,
        credentials.user,
        )
        console.log(res.data.data.id)
        formData.append("agreementId",res.data.data.id)
        const API_URL = "http://localhost:5000/files"
        const ress = await axios.put(API_URL,formData,{ headers: {
              "Content-type": "application/json",
            } })
        console.log(ress)
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
  // const handleOption = async (e) => {
  //   e.preventDefault()
  //   let value = e.target.value;
  //   const API_URL = "http://localhost:5000/api/customerById?id="+value
  //   const res = await axios.get(API_URL,{ headers: authHeader() })
  //   let data = res.data.data
  //   credentials.customer = data
  //   console.log(credentials)
  
  // }


  return (
    <div   >
      <Container>
        <Navi />
        <div >
        <InputGroup className='m-3'>
          <InputGroup.Text>Agreement Name</InputGroup.Text>
          <Form.Control  aria-label="With textarea" onChange={handleChange} id="agreementName" />
        </InputGroup>
        <InputGroup className='m-3'>
          <InputGroup.Text>Description</InputGroup.Text>
          <Form.Control as="textarea" aria-label="With textarea" onChange={handleChange} id="description" />
        </InputGroup>
        <InputGroup className="m-3">
          <InputGroup.Text>Agreement Totel Price</InputGroup.Text>
          <Form.Control aria-label="Amount (to the nearest dollar)" onChange={handleChange} id="agreementTotalPrice" />
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <InputGroup className="m-3">
          <InputGroup.Text>Agreement Withdrawal Fee</InputGroup.Text>
          <Form.Control aria-label="Amount (to the nearest dollar)"  onChange={handleChange} id="agreementWithdrawalFee" />
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <InputGroup className='m-3' >
          <InputGroup.Text style={{width:"25%"}} >Agreement Dates</InputGroup.Text>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
              dates[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
              />
            )}
        </div>
        </InputGroup>
        <InputGroup className='m-3'>
          <InputGroup.Text>Agreement File</InputGroup.Text>
          <Form.Control type="file" multiple onChange={handleFile} id="agreementFile" />
        </InputGroup>
        {/* <InputGroup className='m-3'>
          <InputGroup.Text>Select Customer</InputGroup.Text>
            <div>
              <select onClick={handleOption} > 
                <option>-------</option>
                {customers.map(thisCustomer => (
                               <option value={thisCustomer.id} id="customer"  >{thisCustomer.name}</option>
                            ))}
              </select>
            </div>
        </InputGroup> */}
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

export default AgreementAdd;
