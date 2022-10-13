import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const List = props => {
  const {item, deleteList, active} = props
  console.log(item)
  const {id, website, username, password} = item
  const initial = username ? username[0].toUpperCase() : ''
  console.log(website)
  const deletes = () => {
    deleteList(id)
  }
  return (
    <li className="listed">
      <p className="word">{initial}</p>
      <div className="disc">
        <p>{website}</p>
        <p>{username}</p>
        {active ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            className="img5"
            alt="stars"
          />
        ) : (
          <p>{password}</p>
        )}
      </div>
      <button className="btn5" testid="delete" type="button" onClick={deletes}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="img5"
        />
      </button>
    </li>
  )
}

class App extends Component {
  state = {list: '', website: '', username: '', password: '', active: false}

  getBody = () => {
    const {list, active} = this.state
    return (
      <ul className="lists">
        {list.map(each => (
          <List
            item={each}
            key={each.id}
            deleteList={this.deleteList}
            active={active}
          />
        ))}
      </ul>
    )
  }

  deleteList = id => {
    const {list} = this.state
    const filter = list.filter(each => each.id !== id)
    this.setState({list: filter})
  }

  getclick = () => {
    const {active} = this.state
    this.setState(prevState => ({active: !prevState.active}))
  }

  getPic = () => {
    const {list} = this.state
    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          className="img2"
          alt="no passwords"
        />
        <p>No Passwords</p>
      </>
    )
  }

  getData = event => {
    event.preventDefault()
    const {list, website, username, password} = this.state
    console.log(website, username, password)
    const newList = {
      id: v4(),
      website,
      username,
      password,
    }
    console.log(newList.id)
    this.setState(prevState => ({
      list: [...prevState.list, newList],
      website: '',
      username: '',
      password: '',
    }))
  }

  web = event => {
    this.setState({website: event.target.value})
  }

  name = event => {
    this.setState({username: event.target.value})
  }

  pass = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {list, website, username, password, active} = this.state
    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="img1"
          alt="app logo"
        />
        <div className="cont1">
          <form onSubmit={this.getData} className="form">
            <h1 className="head">Add New Password</h1>
            <div className="cont3">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="img3"
                alt="website"
              />
              <hr className="hr" />
              <input
                type="text"
                placeholder="Enter Website"
                className="input1"
                onChange={this.web}
              />
            </div>
            <div className="cont3">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="img3"
                alt="username"
              />
              <hr className="hr" />
              <input
                className="input1"
                onChange={this.name}
                type="text"
                placeholder="Enter Username"
              />
            </div>
            <div className="cont3">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="img3"
                alt="password"
              />
              <hr className="hr" />
              <input
                onChange={this.pass}
                placeholder="Enter Password"
                className="input1"
                type="password"
              />
            </div>
            <button type="submit" className="btn1">
              Add
            </button>
          </form>
          <div className="form1">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="img2"
            />
          </div>
        </div>
        <div className="cont7">
          <div className="navbar">
            <div className="top">
              <h1 className="head">Your Passwords</h1>
              <p className="para2">{list.length}</p>
            </div>
            <div className="cont4">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="img4"
                alt="search"
              />
              <hr className="hr" />
              <input
                type="search"
                placeholder="Enter Password"
                className="input1"
              />
            </div>
          </div>
          <hr className="hr1" />
          <div className="lists1">
            <div className="check">
              <input type="checkbox" id="label1" onClick={this.getclick} />
              <label htmlFor="label">Show Passwords</label>
            </div>
            {list.length > 0 ? this.getBody() : this.getPic()}
          </div>
        </div>
      </div>
    )
  }
}

export default App
