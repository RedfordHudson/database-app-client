import React, { Component } from 'react';
import axios from 'axios';

export default class ResourcesList extends Component { 
    constructor(props) {
        super(props);

        this.getNames = this.getNames.bind(this);
        this.getResources = this.getResources.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            URL:'https://database-app-server.herokuapp.com',
            resources:[],
            name: ''
        }
    }

    componentDidMount() {
        this.getNames();
    }

    getNames() {
        axios.get(this.state.URL+'/resources')
            .then(response => {
                this.setState({
                    resources:response.data.map(resource => resource.name)
                })
            }).catch((error) => {
                console.log(error);
            });
    }

    getResources() {
        return this.state.resources.map(resource => {
            return <li key={resource}>{resource}</li>
        })
    }

    changeUsername(e) {
        this.setState({
            name:e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const resource = {
            name: this.state.name
        }

        console.log(resource);

        axios.post(this.state.URL+'/resources/add',resource)
            .then(() => {
                this.getNames();
            })
    }

    render() {
        return (
            <div>
                <ul>{this.getResources()}</ul>
                <form onSubmit={this.onSubmit}>
                    <input type='text'
                        onChange={this.changeUsername} />
                    <input type='submit'/>
                </form>
            </div>
        )
    }
}