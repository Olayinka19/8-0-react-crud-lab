import React from "react";
//import Error from "../common/Error";
// Helper functions
import { getAllShows , deleteShows } from "../../api/fetch";
import ShowListing from "./ShowListing";
import Show from "./Show";
import { Switch, Route , withRouter} from "react-router-dom";



class ShowsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      loadingError: false,
    };
  }
    handleDelete (e) {
          const id = e.target.value
          try {
            deleteShows(id) 
            .then(()=> {
              const index = this.state.shows.findIndex(show => show.id === id)
              const updatedShows = [...this.state.shows];
              updatedShows.splice(index, 1)
              this.setState({
                shows:updatedShows
              })
              this.props.history.push("/shows")
            })
          } catch (err) {
            console.log(err)
          }
        }
  componentDidMount() {
    getAllShows()
      .then((shows) => this.setState({ shows, loadingError: false }))
      .catch((error) => {
        console.error(error);
        this.setState({ loadingError: true });
      });
  }

  render() {
    return (
      <>
        <Switch>
          <Route path='/shows/:id'>
            <Show shows={this.state.shows} handleDelete={this.handleDelete} />
          </Route> 
          <section className='shows-index-wrapper'>
            <h2>All Shows</h2>
            <section className='shows-index'>
              {this.state.shows.map((show) => {
                return <ShowListing show={show} key={show.id} />;
              })}
            </section>
          </section>
        </Switch>
      </>
    );
  }
}

export default withRouter(ShowsIndex);
