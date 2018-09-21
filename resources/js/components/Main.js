import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, FormGroup, Input } from 'reactstrap';
import Page from './Page';
import PageForm from './PageForm';

/* Main Component */
class Main extends Component {

    constructor() {
        super();
        this.state = {
            user: null,
            pages: [],
            currentPage: null,
            editMode: false,
            editError: null,
            showModal: false,
            email: '',
            password: '',
            loginError: null
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.handleFieldValueUpdate = this.handleFieldValueUpdate.bind(this)
        this.handleLogin= this.handleLogin.bind(this)
        this.handleLogout= this.handleLogout.bind(this)
    }

    componentDidMount() {
        fetch('/api/pages', {credentials: 'include'})
            .then(r => r.json())
            .then(pages => this.setState({ pages }))
        fetch('/api/status', {credentials: 'include'})
            .then(r => r.json())
            .then(user => this.setState({ user: 'undefined' !== typeof(user.id) ? user : null }))
    }

    handleMenuClick(page) {
        this.setState({ currentPage: page, editMode: false })
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    handleLogin() {
        fetch('api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.email, password: this.state.password })
        })
            .then(r => r.json())
            .then(user => {
                if (user !== false) {
                    this.setState({ user, showModal: false, loginError: null, email: '', password: '' })
                } else {
                    this.setState({ loginError: 'You could not successfully sign in.' })
                }
            })
    }

    handleLogout() {
        fetch('api/logout').then(user => this.setState({ user: null }))
    }

    handleAddButtonClick() {
        this.setState({ currentPage: null, editMode: true })
    }

    handleEditButtonClick() {
        this.setState({ editMode: true })
    }

    handleFieldValueUpdate(e) {
        const state = {}
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    handleItemSaved(page) {
        fetch('api/pages/' + (page.id || ''), {
            method: page.id ? 'put' : 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(page)
        })
            .then(response => {
                response.json().then(data => {
                    if (response.ok) {
                        const pages = this.state.pages
                        const index = pages.findIndex((p) => p.id == data.id)
                        if (index > -1) {
                            pages.splice(index, 1, data)
                        } else {
                            pages.push(data)
                        }

                        this.setState({ pages, currentPage: data, editMode: false, editError: null })
                    } else {
                        this.setState({ editError: { message: 'Unknown error', errors: [], ...data }})
                    }
                })
            })
    }

    renderPages() {
        return this.state.pages.map(page => {
            return (
                <ListGroupItem onClick={() => this.handleMenuClick(page)} key={page.id} >
                    { page.name }
                </ListGroupItem>
            )
        })
    }

    renderUser() {
        if (this.state.user != null) {
            return (<div>
                <span>Logged in as <strong>{this.state.user.name}</strong></span>{' '}
                <Button onClick={this.handleLogout}>Logout</Button>{' '}
            </div>)
        }

        return (<Button onClick={this.toggleModal}>Sign in</Button>)
    }

    renderLoginModal() {
        return (
            <div>
                <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Sign in</ModalHeader>
                    <ModalBody>
                        <Alert color="danger" isOpen={!!this.state.loginError}>{this.state.loginError}</Alert>
                            Please enter your credentials to sign in.
                        <FormGroup>
                            <Input placeholder="Your email" name="email" onChange={this.handleFieldValueUpdate} value={this.state.email} />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Password" name="password" onChange={this.handleFieldValueUpdate} value={this.state.password} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleLogin}>Sign in</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-auto">
                        <ListGroup>
                            { this.renderPages() }
                        </ListGroup>

                        { this.renderUser() }
                        { this.state.user ? <Button onClick={() => this.handleAddButtonClick()}>Add new</Button> : null }
                    </div>
                    <div className="col">
                        {this.state.editMode ? (
                            <PageForm page={this.state.currentPage}
                                onSave={(page) => this.handleItemSaved(page)}
                                error={this.state.editError} />
                        ) : (
                            <Page page={this.state.currentPage} showEdit={!!this.state.user}
                                onEdit={() => this.handleEditButtonClick()} />
                        )}
                    </div>
                </div>

                { this.renderLoginModal() }
            </div>
        )
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
