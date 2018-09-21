import React, { Component } from 'react';
import { Alert, Button, FormGroup, Label, Input } from 'reactstrap';

class PageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: props.page || {}
        }

        this.handleSave = this.handleSave.bind(this)
    }

    handleInput(key, e) {
        var page = Object.assign({}, this.state.page)
        page[key] = e.target.value
        this.setState({ page })
    }

    handleSave(e) {
        this.props.onSave(this.state.page);
    }

    render() {
        return(
            <div>
                <h2>{ this.state.page.id ? 'Edit' : 'Add new' } page</h2>
                {!!this.props.error ? <Alert color="danger">
                    {this.props.error.message}
                    {Object.keys(this.props.error.errors).map(key => this.props.error.errors[key].map(m => <li>{m}</li>))
                    }
                </Alert> : null}
                <FormGroup>
                    <Label for="pageName">Page name</Label>
                    <Input placeholder="Page name" id="pageName"
                        onChange={(e)=>this.handleInput('name', e)} defaultValue={this.state.page.name} />
                </FormGroup>
                <FormGroup>
                    <Label for="pageContent">Page content</Label>
                    <Input type="textarea" placeholder="Page content" id="pageContent"
                        onChange={(e)=>this.handleInput('content', e)} defaultValue={this.state.page.content} />
                </FormGroup>
                <Button onClick={this.handleSave}>Save</Button>
            </div>
        )
    }
}

export default PageForm;
