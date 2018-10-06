import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import Moment from 'react-moment';
import 'moment-timezone';
import Modal from 'react-bootstrap4-modal';

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible_view: false,
      modalVisible_add: false,
      modalVisible_edit: false,
      modalVisible_removes: false,
      //modalVisible_remove: false,
      modalVisible_mark: false,
      isSelectAll: false,
      todoData: [],
      todoCompleteData: [],
      tasks: [],
      form: {
        title: '',
        description: ''
      },
      view: {
        id: '',
        title: '',
        description: '',
        date: ''
      },
      edit: {
        id: '',
        title: '',
        description: '',
        date: ''
      },
      editForm: {
        title: '',
        description: ''
      },
      /*remove: {
        id: '',
        title: ''
      }*/
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeEdit = this.handleChangeEdit.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleView = this.handleView.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleRemoves = this.handleRemoves.bind(this)
    //this.handleRemove = this.handleRemove.bind(this)
    this.handleMark = this.handleMark.bind(this)
  }
  componentDidMount() {
    const todoStorage = localStorage.getItem('todo')
    const parsed = JSON.parse(todoStorage)
    const complete = localStorage.getItem('todo_complete')
    const parsedComplete = JSON.parse(complete)
    this.setState({
      todoData: Array.isArray(parsed) ? parsed : [],
      todoCompleteData: Array.isArray(parsedComplete) ? parsedComplete : []
    })
  }
  handleChange(e) {
    const state = this.state.form
    state[e.target.name] = e.target.value
    this.setState({
        form: state
    })
  }
  handleChangeEdit(e) {
    const state = this.state.editForm
    state[e.target.name] = e.target.value
    this.setState({
        editForm: state
    })
  }
  handleCheckbox(e) {
    const state = this.state.tasks
    let target = parseInt(e.currentTarget.id)
    let index = state.findIndex(data => data.id === target)
    if(index > -1) {
      state[index] = {
        id: target,
        isChecked: !state[index].isChecked
      }
      let indexIschecked = state.findIndex(data => data.isChecked === true)
      this.setState({
        tasks: state,
        isSelectAll: indexIschecked > -1 ? true : false
      })
    }
    else
    {
      state.push({
        id: target,
        isChecked: true
      })
      this.setState({
        tasks: state,
        isSelectAll: true
      })
    }
  }
  handleSelectAll() {
    if(!this.state.isSelectAll) {
      const todoStorage = localStorage.getItem('todo')
      const parsed = JSON.parse(todoStorage)
      const tasks = []
      if(Array.isArray(parsed)) {
        for(let i = 0; i < parsed.length; i++) {
          tasks.push({
            id: parsed[i].id,
            isChecked: true
          })
        }
        this.setState({
          isSelectAll: true,
          tasks: tasks
        })
      }
    }
    else {
      this.setState({
        isSelectAll: false,
        tasks: []
      })
    }
  }
  handleSubmit(e, formData, inputs) {
    e.preventDefault()
    const todoStorage = localStorage.getItem('todo')
    const parsed = JSON.parse(todoStorage)
    const idStorage = localStorage.getItem('id')
    const parsedId = parseInt(JSON.parse(idStorage))
    if(Array.isArray(parsed)) {
      let data = {
        id: parsedId + 1,
        title: formData.title,
        description: formData.description,
        date: new Date()
      }
      parsed.unshift(data)
      localStorage.setItem('todo', JSON.stringify(parsed))
      localStorage.setItem('id', data.id.toString())
      this.setState({
        todoData: parsed,
        modalVisible_add: false,
        form: {
          title: '',
          description: ''
        }
      })
    }
    else
    {
      let data = [{
        id: 1,
        title: formData.title,
        description: formData.description,
        date: new Date()
      }]
      localStorage.setItem('todo', JSON.stringify(data))
      localStorage.setItem('id', data[0].id.toString())
      this.setState({
        todoData: data,
        modalVisible_add: false,
        form: {
          title: '',
          description: ''
        }
      })
    }
    this.refs.form.resetValidationState(false)
  }
  handleView(e, form) {
    e.preventDefault()
    this.setState({
        view: form,
        modalVisible_view: true
    })
  }
  handleEdit(e, formData, inputs) {
    e.preventDefault()
    const todoStorage = localStorage.getItem('todo')
    const parsed = JSON.parse(todoStorage)
    if(Array.isArray(parsed)) {
      let target = this.state.edit.id
      let index = parsed.findIndex(data => data.id === target)
      if(index > -1) {
        parsed[index] = {
          id: this.state.edit.id,
          title: this.state.editForm.title,
          description: this.state.editForm.description,
          date: this.state.edit.date
        }
        localStorage.setItem('todo', JSON.stringify(parsed))
      }
      this.setState({
        modalVisible_edit: false,
        todoData: parsed
      })
    }
    else
    {
      this.setState({
        modalVisible_edit: false
      })
    }
    this.refs.formEdit.resetValidationState(false)
  }
  handleRemoves() {
    const todoStorage = localStorage.getItem('todo')
    const parsed = JSON.parse(todoStorage)
    if(Array.isArray(parsed)) {
      const tasks = this.state.tasks
      for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].isChecked) {
          let target = tasks[i].id
          let index = parsed.findIndex(data => data.id === target)
          if(index > -1) {
            parsed.splice(index, 1)
          }
        }
      }
      localStorage.setItem('todo', JSON.stringify(parsed))
      this.setState({
        modalVisible_removes: false,
        isSelectAll: false,
        todoData: parsed,
        tasks: []
      })
    }
  }
  /*handleRemove() {
    const todoStorage = localStorage.getItem('todo')
    const parsed = JSON.parse(todoStorage)
    if(Array.isArray(parsed)) {
      let target = this.state.remove.id
      let index = parsed.findIndex(data => data.id === target)
      if(index > -1) {
        parsed.splice(index, 1)
        localStorage.setItem('todo', JSON.stringify(parsed))
      }
      this.setState({
        modalVisible_remove: false,
        todoData: parsed
      }, () => {
        const tasks = this.state.tasks
        let todoTarget = target
        let todoIndex = tasks.findIndex(data => data.id === todoTarget)
        if(todoIndex > -1) {
          tasks.splice(todoIndex, 1)
          this.setState({ tasks: tasks })
        }
      })
    }
    else
    {
      this.setState({
        modalVisible_remove: false
      })
    }
  }*/
  handleMark() {
    const todoStorage = localStorage.getItem('todo')
    const parsed = JSON.parse(todoStorage)
    if(Array.isArray(parsed)) {
      const tasks = this.state.tasks
      const complete = localStorage.getItem('todo_complete')
      const parsedComplete = JSON.parse(complete)
      const newComplete = Array.isArray(parsedComplete) ? parsedComplete : []
      for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].isChecked) {
          let target = tasks[i].id
          let index = parsed.findIndex(data => data.id === target)
          if(index > -1) {
            newComplete.unshift(parsed[index])
            parsed.splice(index, 1)
          }
        }
      }
      localStorage.setItem('todo', JSON.stringify(parsed))
      localStorage.setItem('todo_complete', JSON.stringify(newComplete))
      this.setState({
        modalVisible_mark: false,
        isSelectAll: false,
        todoData: parsed,
        todoCompleteData: newComplete,
        tasks: []
      })
    }
  }
  render() {
    const RenderTodoCompleteList = (props) => {
      const item = props.data.map((data, i) => {
        return (
          <div className="todo-list pt-3" key={i}>
            <div className="todo-title pb-2 border-bottom border-gray">
              <div className="one-line text-secondary small">
                <strong className="one-line d-block text-dark">{data.title}</strong>
                {data.description}
              </div>
              <div className="ml-3 mr-1"><a href={'#' + data.id} className="small" onClick={(e) => this.handleView(e, data)}>View</a></div>
            </div>
          </div>
        )
      })
      return item
    }
    const RenderCheckbox = (props) => {
      const state = this.state.tasks
      const target = props.target
      let index = state.findIndex(data => data.id === target)
      if(index > -1) {
        if(state[index].isChecked) {
          return <FontAwesomeIcon icon={['fas', 'check-square']} size="lg" />
        } 
      }
      return <FontAwesomeIcon icon={['far', 'square']} size="lg" />
    }
    const RenderTodoList = (props) => {
      const item = props.data.map((data, i) => {
        return (
          <div className="todo-list pt-3" key={i}>
            <div className="todo-manage">
              <div className="todo-button ml-2 mr-3" style={{ marginTop: 1.25 }}>
                <label id={data.id} onClick={this.handleCheckbox}>
                  <RenderCheckbox target={data.id} />
                </label>
              </div>
              <div className="todo-button mr-3">
                <label
                  onClick={() => this.setState({
                    edit: data,
                    editForm: { title: data.title, description: data.description },
                    modalVisible_edit: true })
                  }
                >
                  <FontAwesomeIcon icon={['far', 'edit']} size="lg" />
                </label>
              </div>
              {/*<div className="todo-button mr-3">
                <label 
                  onClick={() => this.setState({
                    remove: { id: data.id, title: data.title },
                    modalVisible_remove: true })
                  }
                >
                  <FontAwesomeIcon icon={['far', 'trash-alt']} size="lg" />
                </label>
              </div>*/}
            </div>
            <div className="todo-title pb-2 border-bottom border-gray">
              <div className="one-line text-secondary small">
                <strong className="one-line d-block text-dark">{data.title}</strong>
                {data.description}
              </div>
              <div className="ml-3 mr-1"><a href={'#' + data.id} className="small" onClick={(e) => this.handleView(e, data)}>View</a></div>
            </div>
          </div>
        )
      })
      return item
    }
    const RenderTargetList = (props) => {
      const item = props.data.map((data, i) => {
        return (
          data.isChecked ? (
            <li key={i}>Task ID: #{data.id}</li>
          ) : (
            null
          )
        )
      })
      return <ul>{item}</ul>
    }
    return (
      <div className="row">
        <div className="col-xl-12 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <div className="pb-2 border-bottom border-gray">
                  Complete {this.state.todoCompleteData.length > 0 ? (
                    <span className="badge badge-primary">{this.state.todoCompleteData.length}</span>
                  ) : (
                    null
                  )}
              </div>
              <div style={{ maxHeight: 630, overflowY: 'auto' }}>
                  <RenderTodoCompleteList data={this.state.todoCompleteData} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <div className="card shadow">
            <div className="card-body">
              <div className="pb-2 border-bottom border-gray" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>Task list</div>
                <button tpye="button" className="btn btn-primary btn-sm" onClick={() => this.setState({ modalVisible_add: true })}>
                  <FontAwesomeIcon icon={['fas', 'plus-square']} size="lg" /> Add task
                </button>
              </div>
              {this.state.todoData.length > 0 ? (
                <div className="pt-3 pb-3 border-bottom border-gray" style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className={'todo-button mr-3 border border-dark rounded check-all' + (this.state.isSelectAll ? ' active' : '')} onClick={this.handleSelectAll}>
                      <label>
                        {this.state.isSelectAll ? (
                          <FontAwesomeIcon icon={['fas', 'check-square']} size="lg" />
                        ) : (
                          <FontAwesomeIcon icon={['far', 'square']} size="lg" />
                        )}
                      </label>
                    </div>
                    {this.state.isSelectAll ? (
                      <div style={{ display: 'flex' }}>
                        <div className="todo-button mr-3">
                          <label onClick={() => this.setState({ modalVisible_mark: true })}><FontAwesomeIcon icon={['fas', 'tag']} size="lg" /></label>
                        </div>
                        <div className="todo-button mr-3">
                          <label onClick={() => this.setState({ modalVisible_removes: true })}><FontAwesomeIcon icon={['fas', 'trash']} size="lg" /></label>
                        </div>
                      </div>
                    ) : (
                      null
                    )}
                  </div>
                </div>
              ) : (
                null
              )}
              <div style={{ maxHeight: 630, overflowY: 'auto' }}>
                  <RenderTodoList data={this.state.todoData} />
              </div>
            </div>
          </div>
          <Modal visible={this.state.modalVisible_add} onClickBackdrop={() => this.setState({ modalVisible_add: false })}>
            <div className="modal-header">
              <h5 className="modal-title">Add Task</h5>
            </div>
            <ValidationForm ref="form" onSubmit={this.handleSubmit}>
              <div className="modal-body">
                  <div className="form-group">
                    <label className="col-form-label">Title:</label>
                    <TextInput className="form-control" name="title"
                      value={this.state.form.title}
                      onChange={this.handleChange}
                      required
                      errorMessage="Please fill in Title."
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Description:</label>
                    <TextInput className="form-control" name="description"
                        value={this.state.form.description}
                        onChange={this.handleChange}
                        multiline
                        required
                        rows="5"
                        errorMessage="Please fill in Description."
                    />
                  </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => this.setState({ modalVisible_add: false })}>Close</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </ValidationForm>
          </Modal>
          <Modal visible={this.state.modalVisible_view} onClickBackdrop={() => this.setState({ modalVisible_view: false })}>
            <div className="modal-header">
              <h5 className="modal-title">{this.state.view.id ? '#' + this.state.view.id : 'None'}</h5>
            </div>
            <div className="modal-body">
              <div className="card">
                  <div className="card-header">
                      {this.state.view.title ? this.state.view.title : 'None'}
                  </div>
                  <div className="card-body">
                    <p>{this.state.view.description ? this.state.view.description : 'None'}</p>
                    <footer className="blockquote-footer">
                      {this.state.view.date ? <Moment format="LLLL">{this.state.view.date}</Moment> : 'None'}
                    </footer>
                  </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => this.setState({ modalVisible_view: false })}>Close</button>
            </div>
          </Modal>
          <Modal visible={this.state.modalVisible_edit} onClickBackdrop={() => this.setState({ modalVisible_edit: false })}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Task "{'#' + this.state.edit.id + ' ' + this.state.edit.title}"</h5>
            </div>
            <ValidationForm ref="formEdit" onSubmit={this.handleEdit}>
              <div className="modal-body">
                  <div className="form-group">
                    <label className="col-form-label">Title:</label>
                    <TextInput className="form-control" name="title"
                      value={this.state.editForm.title}
                      onChange={this.handleChangeEdit}
                      required
                      errorMessage="Please fill in Title."
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Description:</label>
                    <TextInput className="form-control" name="description"
                        value={this.state.editForm.description}
                        onChange={this.handleChangeEdit}
                        multiline
                        required
                        rows="5"
                        errorMessage="Please fill in Description."
                    />
                  </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => this.setState({ modalVisible_edit: false })}>Close</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </ValidationForm>
          </Modal>
          <Modal visible={this.state.modalVisible_removes} onClickBackdrop={() => this.setState({ modalVisible_removes: false })}>
            <div className="modal-header">
              <h5 className="modal-title">Remove Tasks</h5>
            </div>
            <div className="modal-body">
              <div className="card">
                  <div className="card-body">
                    <p>Do you want to remove this tasks?</p>
                    <RenderTargetList data={this.state.tasks} />
                  </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => this.setState({ modalVisible_removes: false })}>Close</button>
              <button type="button" className="btn btn-danger" onClick={this.handleRemoves}>Remove</button>
            </div>
          </Modal>
          {/*<Modal visible={this.state.modalVisible_remove} onClickBackdrop={() => this.setState({ modalVisible_remove: false })}>
            <div className="modal-header">
              <h5 className="modal-title">Remove Task</h5>
            </div>
            <div className="modal-body">
              <div className="card">
                  <div className="card-body">
                    <p>Do you want to remove this task?</p>
                    <p>"{'#' + this.state.remove.id + ' ' + this.state.remove.title}"</p>
                  </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => this.setState({ modalVisible_remove: false })}>Close</button>
              <button type="button" className="btn btn-danger" onClick={this.handleRemove}>Remove</button>
            </div>
          </Modal>*/}
          <Modal visible={this.state.modalVisible_mark} onClickBackdrop={() => this.setState({ modalVisible_mark: false })}>
            <div className="modal-header">
              <h5 className="modal-title">Check Mark Tasks</h5>
            </div>
            <div className="modal-body">
              <div className="card">
                  <div className="card-body">
                    <p>Do you want to update this task to complete?</p>
                    <RenderTargetList data={this.state.tasks} />
                  </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => this.setState({ modalVisible_mark: false })}>Close</button>
              <button type="button" className="btn btn-success" onClick={this.handleMark}>Save</button>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

export default TodoList;