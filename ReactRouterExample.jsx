import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

const App = React.createClass({
    render() {

        return (
            <div>
                <Link to="users">Users</Link>
                {this.props.children}
            </div>
        )
    }
});

const About = React.createClass({
    render() {
        return (
            <div>
                About
            </div>
        )
    }
})
const NoMatch = React.createClass({
    render() {
        return (
            <div>

            </div>
        )
    }
})

const Users = React.createClass({
    render() {
        return (
            <div>
                <h1>Users</h1>
                <div className="master">
                    <ul>
                        <Link to={`/user/`}></Link>
                    </ul>
                </div>
                <div className="detail">
                    {this.props.children}
                </div>
            </div>
        )
    }
})

const User = React.createClass({
    componentDidMount() {
        this.setState({
            // route components are rendered with useful information, like URL params
            user: this.props.params.userId
        })
    },

    render() {
        return (
            <div>
                <h2>{this.state.user.name}</h2>
                {/* etc. */}
            </div>
        )
    }
})

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="about" component={About}/>
            <Route path="users" component={Users}>
                <Route path="/user/:userId" component={User}/>
            </Route>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
), document.getElementById('root'))