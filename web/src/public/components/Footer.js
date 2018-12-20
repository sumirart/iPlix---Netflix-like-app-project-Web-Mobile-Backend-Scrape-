import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer>
        <hr style={{ margin: 0 }}/>
        <div className="container" style={{ marginTop: 10, marginBottom: 10 }}>
          <p className="text-muted text-center">Copyright © Elang 4 2018. All rights reserved.</p>
        </div>
      </footer>
    )
  }
}

export default Footer