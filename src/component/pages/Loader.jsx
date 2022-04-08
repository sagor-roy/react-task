import React, { Component } from 'react'

export default class Loader extends Component {
    render() {
        return (
            <div className="snipper">
                <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}
