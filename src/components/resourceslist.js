import React, { Component } from 'react';
import axios from 'axios';

export default class ResourcesList extends Component { 
    constructor(props) {
        super(props);

        this.getResources = this.getResources.bind(this);

        this.state = {
            resources:[]
        }
    }

    componentDidMount() {
        axios.get('https://database-app-server.herokuapp.com/')
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

    render() {
        return (
            <ul>{this.getResources()}</ul>
        )
    }
}