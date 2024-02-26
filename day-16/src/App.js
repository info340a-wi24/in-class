import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Import your other components here
import Homepage from './Homepage';
import About from './About';
import Projects from './Projects';

const App = () => {
    return (<div>
                <Router>
                    <div className="container">
                    <Link to="/">Home</Link>
                        { ' - ' }
                        <Link to="/projects">Projects</Link>
                        { ' - ' }
                        <Link to="/about">About</Link>
                            <Route exact path="/" element={<Homepage />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/about" element={<About />} />
                    </div>
                </Router>
            </div>
        );
}

export default App;
