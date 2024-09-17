import { Component } from "react";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "INPROGRESS",
  failure: "FAILURE",
};

class Home extends Component {
  state = {
    list: [],
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getBooksData();
  }

  getBooksData = async () => {
    try {
      this.setState({ apiStatus: apiStatusConstants.inProgress });
      const url = "https://openlibrary.org/search.json?q=<your-query>";
      const response = await fetch(url);
      console.log(response);
      const data = response.json();
      const updatedData = data.docs;
      const listData = updatedData.map((each) => {
        authorKey: each.author_key;
        authorName: each.author_name;
        title: each.title;
      });
      this.setState({ list: listData, apiStatus: apiStatusConstants.success });
    } catch (e) {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderOnLoading = () => (
    <img
      src="https://media.giphy.com/media/X6hiFJjvTDAAw/giphy.gif"
      alt="world"
    />
  );

  renderOnFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  );

  onRetry = () => {
    this.getBooksData();
  };

  render() {
    const { list } = this.state;
    return (
      <ul>
        {list.map((each) => {
          <li key={each.authorKey}>
            <h1>{each.title}</h1>
            <h3>{each.authorName}</h3>
          </li>;
        })}
      </ul>
    );
  }
}

export default Home;
