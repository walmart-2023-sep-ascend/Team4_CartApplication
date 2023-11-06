//components/SearchComponent.js
import React from 'react';
 
function SearchComponent({ searchCourse, courseSearchUserFunction }) {
    return (
        
        <header className="App-header">
            <div class="scroll-container">
            <h1> Walmart shopping cart</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search everything at Walmart online and in store"
                    value={searchCourse}
                    onChange={courseSearchUserFunction}
                />
            </div>
            </div>
        </header>
        
    );
}
 
export default SearchComponent;