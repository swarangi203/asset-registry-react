import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Axios from "axios";
import ComponentToPrint from '../components/ComponentToPrint';
import Qr from "../components/Qr";




function AddAsset2(props) {
  const reqpath=window.location.origin+"/info/"+props.match.params.UID;
  const auth = getAuth();
  const [uidval,setuidval]=React.useState(null);
  const [data,setdata]=React.useState(null);
  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle:"WCE Asset" + props.match.params.UID
  });
  
  React.useEffect(()=>{
   Axios.get('https://wce-asset-registry.herokuapp.com/addasset/'+props.match.params.UID)
   .then(function (response) {
     console.log(response.data[0]);
     setdata(response.data[0]);
   })
   .catch(function (error) {
     console.log(error);
   });
  },[]);


  onAuthStateChanged(auth, (user) => {
    if (user) {
      setuidval(user.uid);
      
    } else {
      setuidval(null);
    }
  });
 



  if(uidval&&data)
  {
  return (
    <div className="navfootpad">
        <Navbar />
         <div style={{textAlign:"center"}}>
         < ComponentToPrint ref={componentRef} reqpath={reqpath} data={data}/>
         <button style={{marginTop:"20px"}} className="simplebtn" onClick={handlePrint}>Print</button>
         <hr className="hrline" style={{ padding: 0, marginTop: '20px'}}/>
      
         <Qr name={"WCE Asset" + props.match.params.UID} value={reqpath}/>
         </div>
         
        <Footer />
    </div>
  );
  }
  else
  {
    return null;
  }
}




export default AddAsset2;