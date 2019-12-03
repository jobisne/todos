import React, { Component } from 'react'
// import Nav from '../layout/Nav';

export class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const login = {
      email: this.state.email,
      password: this.state.password
    }
    const yes = this.props.loginUser(login);
    if(yes) {
      this.props.history.push(`/myapp`);
    } else {
      this.props.history.push(`/`);
    }
    
    this.setState({ email: ''});
    this.setState({ password: ''});
  }
  

  render() {
    return (
      <div>
       

        <form onSubmit={this.onSubmit}>
          <input 
            style={inputStyle}
            type="text"
            name="email"
            onChange={this.onChange}
            value={this.state.email}
            placeholder="Email"
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            onChange={this.onChange}
            value={this.state.password}
            placeholder="Password"
          />
          <input
          style={inputButton}
            type="submit"
            value="Submit"
            placeholder="Name"
          />
        </form>
      </div>
    )
  }
}

const inputStyle = {
  width: '100%',
  padding: '12px 20px',
  margin: '8px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
  borderRadius: '4px'
 
}
const inputButton = {
  width: '100%',
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '14px 20px',
  margin: '8px 0',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
}

export default Login;
