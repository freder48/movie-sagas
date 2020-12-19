import React, { Component } from 'react';
import './Edit.css';
class Edit extends Component {

goToDetails = (id) => {
    this.props.history.push(`/detail/:id`)
}

  render() {
    return (
      <div>
          <section>
              <button className="button"
              onClick={this.goToDetails}>Cancel</button>
          </section>

      </div>
    );
  }
}
export default Edit;