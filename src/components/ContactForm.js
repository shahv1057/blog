import React from 'react'
import SocialIcons from "./SocialIcons"


class ContactForm extends React.Component {

    render() {
        const formStyle = {
          textAlign: 'center',
          margin: "0rem",
        }
        const buttonsStyle = {
          marginTop: '3rem',
          textAlign: 'center',
        }
        return (
            <form method="post" action="https://www.flexyform.com/f/741fb57755e870b536ff3891610201ea6ef4f9cd">
            <div style={{textAlign:"left", marginTop:"30px", border:"1px", marginRight:"20px", marginLeft:'50px'}}>
            <textarea style={{border:'none'}} placeholder="Name..." rows="1" cols="30" type = 'text' name="fullname" fontSize='40px'></textarea>
            <br/>
            <textarea style={{border:'none'}} placeholder="Email..." rows="1" cols="30" type = 'email' name="email" ></textarea>
            <br/>
            <textarea style={{border:'none'}} placeholder="Type your message here..." rows="6" cols="30" name="comment"></textarea>
            <div style={{marginTop: '.2rem',textAlign: 'center'}}>
              <button type="submit" style={{backgroundColor:"#289494", color:"white",cursor:'pointer'}} className="button special">Submit</button>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            </div>
          </form>
        )
        // return (
        //   <form style={formStyle} className="form" action={this.props.action} method="post" width ="1200px">
        //     <div>
        //       <label>Name:</label>
        //       <br/>
        //       <input type="text" name="fullname" width="1200px"/>
        //     </div>
        //     <br/>
        //     <div>
        //       <label style={{marginTop:"1em"}}>Email:</label>
        //       <br/>
        //       <input type="email" name="email"/>
        //     </div>
        //     <br/>
        //     <div>
        //       <label style={{marginTop:"1em"}}>Message:</label>
        //       <br/>
        //       <textarea name="message" rows="5"></textarea>
        //     </div>
        //     <div style={{marginTop: '.2rem',textAlign: 'center'}}>
        //         <button type="submit" style={{backgroundColor:"#289494", color:"white",cursor:'pointer'}} className="button special">Submit</button>
        //     </div>
        //   </form>
        // );
      }
    }
    
    export default ContactForm