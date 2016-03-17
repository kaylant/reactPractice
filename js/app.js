// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

import DOM from 'react-dom'
import React, {Component} from 'react'

function app() {
   // {/* start app */}

   // { example data to pass in to our app }
   var ironData = {
	meta: {
		resultsCount: 100,
		perPage: 3
	},
	results: [
	{
		title: "hot john",
		seller: "slickbag",
		price: "25 cents",
		descr: "this john is really hot and friendly.",
		imageUrl: "http://robohash.org/john"
	},
	{
		title: "hot pockets",
		seller: "lean cuisine",
		price: "30lbs of silver",
		descr: "these pockets are really hot",
		imgUrl: "http://robohash.org/pockets"
	},
	{
		title: "fingerless gloves",
		seller: "blind children",
		price: "$10",
		descr: "evil",
		imageUrl: "http://robohash.org/blindness"
	}
	]
   }

	{/* AppView component */}  
    var AppView = React.createClass({
	    render: function(){
	 //    {/* console log this to see data */} 
		// { will return a Constructor with "shopData" (a.k.a. the data passed in from above) as an Object on its props}
	   	console.log("=====this=====")
		console.log(this)
		    return (
			    <div className="pageContainer">
				    <h1 className="headline">Iron Etsy</h1>
					{/* AppView has AboutResults component and ListingGrid component as its children */}
					{/* Storing metadata on AboutResults component. It will appear in the AboutResults component's .props property, under the name aboutData */}
				    <AboutResults aboutData={this.props.shopData.meta}/>
					{/* Storing results data on ListingGrid component */}
				    <ListingGrid listings={this.props.shopData.results}/>
			   	</div>
	   			)
	    }
    })

   // 	{/* AboutResults component */}
  	// { Writing results from shopData.meta to the AboutResults component on the page }
   	var AboutResults = React.createClass({
	   	render: function() {
		   	return (
			   	<div className="about">    
				   	{/* to access the object passed down from AppView, we must go to this.props.aboutData, \
				   	since aboutData is the attribute name used above. */}
				   	<p className="nResults">Results: {this.props.aboutData.resultsCount}</p>
				   	<p className="nShowling">Showing: {this.props.aboutData.perPage}</p>
			   	</div>
			   	)
	   	}	

   	})


    // { ListingGrid component }
    var ListingGrid = React.createClass({
 		// { Function invoked in our render function below 
 		// { Takes in shopData.results (parameter name "listingArray") which is an array containing the 3 listing Objects, passed down by \
 	// the AppView component under the property name listings}
   		_getListingsJSX: function(listingArray) {
	        console.log("=====get listingArray JSX function=====")
	        console.log(listingArray)
	        var newArray = []
	        {/* Extracts each object from listing data (which is our results array of data) and passes data down a different data object to each Listing component */}
	        for (var i = 0; i < listingArray.length; i++){
	            var listingObj = listingArray[i]
	        	{/* Storing single listing data object on the Listing compoenent */}
	            var component = <Listing listingData={listingObj}/>
	            newArray.push(component)          
        	}
        return newArray
   		},

   		// { Rendering grid view and invokes the _getListingsJSX function. _getListingsJSX yields an array of listing components which become children of the div.listingContainer }
   		render: function(){
	        console.log("here comes listingGrid...")
	        var itemListings = this.props.listings
	        console.log(itemListings)
   			return (
   				<div className="listingContainer">
   					{this._getListingsJSX(itemListings)} 
   				</div>
   				)
   		}
   	})

   	// {/* Listing component */}
   	// { Writing listing information to the page }
   	var Listing = React.createClass({
   		render: function(){
        console.log("====listing function====")
        console.log(this)
    	// { Created this variable to shorthand writing HTML below. Since the listingObj was assigned into the listingData attribute of the Listing component, we will access that object via this.props.listingData. }
        var grabber = this.props.listingData
   			return (
   				<div className="listing">
   					<img src={grabber.imageUrl}/>
   					<p className="price">HOW MUCH?? {grabber.price}</p>
            		<p className="descr">Seller: {grabber.seller}</p>
            		<p className="descr">why {grabber.descr}</p>
   				</div>
   				)
   		}
   	})

   	{/* passing our example data from above (ironData) into our AppView. we are calling the data "shopData", but it can be assigned under any name */}
    DOM.render(<AppView id="topView" shopData={ironData} />,document.querySelector('.container'))
}

app()