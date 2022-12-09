import axios from "axios";
import authHeader from "./auth-header";
 class AgreementService  {
  getAgreements(){
    return axios.get("http://localhost:5000/api/products",{ headers: authHeader() })
  }
  getAgreementById(id){
    return axios.get(`http://localhost:5000/api/getByAgreementId?id=`+id,{ headers: authHeader() })
  }
  getAgreementByUserId(id){
    return axios.get(`http://localhost:5000/api/getAgreementByUserId?id=`+id,{ headers: authHeader() })
  }
  getAgreementSorted(id){
    return axios.get("http://localhost:5000/api/getAgreementByUserIdSorted?id="+id,{ headers: authHeader() })
  }
  getAgreementByName(agreementName){
    return axios.get(`http://localhost:5000/api/getByAgreementName?agreementName`+agreementName,{ headers: authHeader() })
  }
  getAgreementswithUser(){
    return axios.get("http://localhost:5000/api/getAgreements",{ headers: authHeader() })
  }
  setAgreementPassive(agreementId,userId){
    console.log(agreementId)
    return axios.put(`http://localhost:5000/api/passiveAgreement?agreementId=${agreementId}&userId=${userId}` ,{ headers: authHeader() })
  }
  setAgreementActive(agreementId,userId){
    console.log(agreementId)
    return axios.put(`http://localhost:5000/api/activeAgreement?agreementId=${agreementId}&userId=${userId}` ,{ headers: authHeader() })
  }
  // addAgreement(agreement){
  //   return axios.post("http://localhost:5000/api/addAgreement",{agreement},{ headers: authHeader() })
  // }
  addAgreement(agreementName, description, agreementTotalPrice,agreementWithdrawalFee,
  acceptanceDate,endDate,user) {
    return axios.post("http://localhost:5000/api/addAgreement", {
      agreementName,
      description,
      agreementTotalPrice,
      agreementWithdrawalFee,
      acceptanceDate,
      endDate,
      user
    },{ headers: authHeader() });
  }

  updateAgreement(agreement) {
    console.log(agreement)
    return axios.put("http://localhost:5000/api/updateAgreement", agreement,{ headers: authHeader() });
  }
}export default AgreementService
