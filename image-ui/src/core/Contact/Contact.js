import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import './Contact.css';
import contactImage from './contact.jpg';
import { API } from '../../config';
import  JSZip from 'jszip';
import FileSaver from 'file-saver';
import JSZipUtils from 'jszip-utils';

const Contact = () => {
 //   const imgaeUrl= `url(${API}/product/photo/${item._id})`
//  const download =()=>{
//     let links=[
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlWMMeHaxv8LJdrZCvo4fBvEo2uJazm9x_VX2dExy&s",
//          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlWMMeHaxv8LJdrZCvo4fBvEo2uJazm9x_VX2dExy&s"
//     ];
//     var zip = new JSZip();
//     var count = 0;
//     var zipFilename = "Pictures.zip";  
//     links.forEach(function (url, i) {
//       var filename = links[i];
//       filename = filename.replace(/[\/\*\|\:\<\>\?\"\\]/gi, '').replace("httpssequenceimagestaging.blob.core.windows.netretouch","");
//       JSZipUtils.getBinaryContent(url, function (err, data) {
//         if (err) {
//           throw err;
//         }
//         zip.file(filename, data, { binary: true });
//         count++;
//         if (count == links.length) {
//           zip.generateAsync({ type: 'blob' }).then(function (content) {
//             FileSaver.saveAs(content, zipFilename);
//           });
//         }
//       });
//     });
// }
    return (
        <Layout title="contact us" description="E-Commerce Website">
           <section className='contactSection'>
           <Container>
           <Row>
         {/*   <button onClick={()=>download()}>click me </button> */}
               <Col md={6}>
                   <div className="contact1-pic js-tilt" data-tilt>
                       <img src={contactImage} alt="IMG" />
                   </div>
               </Col>
               <Col md={6} className="container-contact1">
                   <form className="contact1-form validate-form">
                       <span className="contact1-form-title">
                           Get in touch
                       </span>

                       <div className="wrap-input1 validate-input" data-validate="Name is required">
                           <input className="input1" type="text" name="name" placeholder="Name" />
                           <span className="shadow-input1"></span>
                       </div>

                       <div className="wrap-input1 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                           <input className="input1" type="text" name="email" placeholder="Email" />
                           <span className="shadow-input1"></span>
                       </div>


                       <div className="wrap-input1 validate-input" data-validate="Message is required">
                           <textarea className="input1" name="message" placeholder="Message"></textarea>
                           <span className="shadow-input1"></span>
                       </div>

                       <div className="container-contact1-form-btn">
                           <button className="contact1-form-btn">
                               <span>
                                   Send Email
                                   <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                               </span>
                           </button>
                       </div>
                   </form>
               </Col>
           </Row>
       </Container>
           </section>
        </Layout>
    )
}

export default Contact