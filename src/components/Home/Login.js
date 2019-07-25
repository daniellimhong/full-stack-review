import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../redux/reducer"
import { connect } from 'react-redux'
import './Login.scss'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      typedUser: "",
      password: "",
      email: "",
      loading: false
    };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  login() {
      this.setState({
          loading: true
      })
    axios
      .post("/api/login", { email: this.state.email, password: this.state.password })
      .then(res => {
        this.props.setUser(res.data)
        this.setState({
            loading: false
        })
      });
  }
  register() {
    this.setState({
        loading: true
    })
    axios
      .post("/api/register", {
        username: this.state.email,
        password: this.state.password,
        email: this.state.email
      })
      .then(res => {
        this.props.setUser(res.data)
        this.setState({
            loading: true
        })
      });
  }

  universalChangeHandler(property, value) {
    //! Use arrow function to invoke so we dont have to bind on top
    this.setState({
      [property]: value
    });
  }

  render() {
    //   console.log(this.state.typedUser)
    //   console.log(this.state.password)
    //   console.log(this.state.email)
    const { typedUser, password, email, loading } = this.state;
    console.log('From Redux ==>', this.props.user)
    return (
      <div>{loading ? (
        <img src="https://media.tenor.com/images/e420aec0db9728d114abce63b882074f/tenor.gif" />
      ) : (<div className="login-container">
        <input
          name="typedUser"
          value={typedUser}
          onChange={event =>
            this.universalChangeHandler(event.target.name, event.target.value)
          }
          placeholder="Username"
        />
        <input
          name="password"
          value={password}
          type="password"
          onChange={event =>
            this.universalChangeHandler(event.target.name, event.target.value)
          }
          placeholder="Password"
        />
        <input
        
          name="email"
          value={email}
          onChange={event =>
            this.universalChangeHandler(event.target.name, event.target.value)
          }
          placeholder="Email"
        />
        <div>
          <button onClick={this.login}>Login</button>
          <button onClick={this.register}>Register</button>
        </div>
      </div>)}
     </div>
    );
  }
}

function mapReduxStateToProps(reduxState){
    return reduxState
}

const mapDispatchToProps = {
    setUser
}

const connectInvoked = connect(
    mapReduxStateToProps, 
    mapDispatchToProps
    );

export default connectInvoked(Login);
