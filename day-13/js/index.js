// Main.js file
'use strict';

// Data: a group of people
const PEOPLELIST = [
    { name: "Jacob", interest: "Board Games" },
    { name: "Vishank", interest: "Music" }
];

// Functional component for an individual person
function Person(props) {
    return (
        <div class="person">
            <p>Hello, my name is {props.name} and I am interested in {props.interest}.</p>
        </div>
    );
} 

// Functional component to represent a group of people
function People(props) {
    return (props.group.map((d) => {
        return <Person key={d.name} name={d.name} interest={d.interest} />
    }))
}

// Render your component in the `main` section
let myPeople = <People group={PEOPLELIST} />;

// Use ReactDOM.render directly
ReactDOM.render(myPeople, document.querySelector('main'));