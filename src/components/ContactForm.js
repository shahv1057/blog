import React from 'react'

class ContactForm extends React.Component {

    render() {
        const formStyle = {
          textAlign: 'center',
          margin: "2rem",
        }
        const buttonsStyle = {
          marginTop: '3rem',
          textAlign: 'center',
        }
        return (
          <form style={formStyle} className="form" action={this.props.action} method="post" width ="600px">
            <div>
              <label>Name:</label>
              <br/>
              <input type="text" name="fullname" width="600px"/>
            </div>
            <br/>
            <div>
              <label style={{marginTop:"1em"}}>Email:</label>
              <br/>
              <input type="email" name="email"/>
            </div>
            <br/>
            <div>
              <label style={{marginTop:"1em"}}>Message:</label>
              <br/>
              <textarea name="message" rows="5"></textarea>
            </div>
            <ul className="actions" style={buttonsStyle}>
                <li>
                  <button type="submit"  className="button special">Send</button>
                </li>
            </ul>
          </form>
        );
      }
    }
    
    export default ContactForm