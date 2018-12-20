import React, { Component } from 'react'

class NotFound extends Component {
  render() {
    return (
      <div style={{ flex: 1, textAlign: 'center', height: "80vh" }}>
        <header style={{ height: "100%" }}>
          <h4>404 Route Not Found</h4>
        </header>
      </div>
    )
  }
}

export default NotFound