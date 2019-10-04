import React, { Component } from "react";
import { load } from "../services/post-api";

import { Link } from "react-router-dom";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };
  }

  loadPost() {
    load(this.props.match.params.id)
      .then(post => {
        this.setState({
          post
        });
      })
      .catch(error => {
        // console.log(error, error.message, error.status);
        // console.dir(error);
        this.props.history.push(
          `/error/${error.response ? error.response.status : "404"}`
        );
      });
  }

  componentDidMount() {
    this.loadPost();
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      !this.state.post ||
      previousProps.match.params.id !== this.props.match.params.id
    ) {
      this.loadPost();
    }
  }

  render() {
    const post = this.state.post;
    return (
      (post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <span>Written by {post.user.name}</span>
          <Link to={`/post/${this.props.match.params.id}/edit`}>Edit Post</Link>
        </div>
      )) || <div></div>
    );
  }
}
