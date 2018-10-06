import React, { Component } from 'react';
import '../scss/App.css';
import TodoList from './TodoList';
import Loading from './Loading';
import NotSupport from './NotSupport';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      support: false,
    }
  }
  componentDidMount() {
    if (typeof(Storage) !== 'undefined') {
      setTimeout(() => {
        this.setState({
          loaded: true,
          support: true
        })
      }, 3000)
    } else {
      setTimeout(() => {
        this.setState({
          loaded: true,
          support: false
        })
      }, 3000)
    }
  }
  render() {
    if(!this.state.loaded) {
      return <Loading />
    }
    else if(!this.state.support) {
      return <NotSupport />
    }
    return (
      <div className="container" style={{ marginTop: 15, marginBottom: 15 }}>
        <div className="row">
          <div className="col-xl-12 mb-3">
            <div className="card bg-primary text-white shadow">
              <div className="card-body">
                TODO Task
              </div>
            </div>
          </div>
        </div>
        <TodoList />
      </div>
    )
  }
}

export default App;
