import React, { Component } from "react";

import "./About.css";

export default class About extends Component {
  render() {
    return (
      <div className="container main">
        <div className="card m_card">
          <h5>ABOUT</h5>
          <p>
            This app is designed to a brief assessment used in education and
            similar fields to measure growth in knowledge, abilities, and/or
            skills. The mission is to get users to study related textbooks in
            order to answer the questions provided. At the end of the
            assessments students will have devloped extensive knowledge in their
            respective fields.{" "}
          </p>

          <p>
            The target users are medical students. There are several benefits of
            this app, like Engaging audience, large number of participants,
            randomizing questions, gain insight in audience, no instructor
            needed.{" "}
          </p>
        </div>
      </div>
    );
  }
}
