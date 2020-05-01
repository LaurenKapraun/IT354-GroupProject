console.log("File Incoming")

/*
 * Data we need
 * 
 * 
 * Properties in response Data
 * Image - thumb, photos[]
 * Business Name - name
 * Address - location[] // Will need to process through
 * Cuisine Category - cuisines
 * Phone - phone_numbers
 * Rating - user_rating[]-->aggregate_rating
 * Sevices offered (Change to Highlights) - highlights[]
 * Price Range - price_range , Currency Accepted - currency
 * Hours open each day - timings
 * Reviews - all_reviews
 *  */

var APIResponseData = [];

console.log(document.getElementById("results"))

// Onclick function
        function myFunction(filter) {
            if (filter == "location") {
                var searchText = document.getElementById("locationInput").value;
                getCity(searchText);
            } else if (filter == "name") {
                var searchText = document.getElementById("nameInput").value;
                
                var xhttp = new XMLHttpRequest();        
                xhttp.onload = function() {
                    if(this.status === 200) {
                        response("name", this.response)
                    }
                };
                xhttp.responseType = "json";
                xhttp.open("GET", "https://developers.zomato.com/api/v2.1/search?q=".concat(searchText));
                xhttp.setRequestHeader("user-key", "a6c14be291190dc6c39d25a2173bc983");
                xhttp.send();
				
            }
        }

        function getCity(searchText) {
            var xhttp = new XMLHttpRequest();        
            xhttp.onload = function() {
                if(this.status === 200) {
        			var data = this.response;
        			cityID = data.location_suggestions[0].id
                    searchCityQuery(cityID)
        		}
            };
            xhttp.responseType = "json";
            xhttp.open("GET", "https://developers.zomato.com/api/v2.1/cities?q=".concat(searchText));
            xhttp.setRequestHeader("user-key", "a6c14be291190dc6c39d25a2173bc983");
            xhttp.send();
        }

        function searchCityQuery(searchedCityID) {
            var xhttp = new XMLHttpRequest();        
            xhttp.onload = function() {
                if(this.status === 200) {
                    response("location", this.response)
        		}
            };
            xhttp.responseType = "json";
            xhttp.open("GET", "https://developers.zomato.com/api/v2.1/search?entity_type=city&entity_id=".concat(searchedCityID));
            xhttp.setRequestHeader("user-key", "a6c14be291190dc6c39d25a2173bc983");
            xhttp.send();
        }

        function response(criteria, data) {
			APIResponseData = [];
            data.restaurants.forEach(element => {
                var eachResponseData = {};

                // Scraping result data into our JSON Object
                eachResponseData["image"] = element.restaurant.thumb
                eachResponseData["businessName"] = element.restaurant.name
                eachResponseData["address"] = element.restaurant.location.address
                eachResponseData["cuisines"] = element.restaurant.cuisines
                eachResponseData["phone"] = element.restaurant.phone_numbers
                eachResponseData["rating"] = element.restaurant.user_rating.aggregate_rating
                eachResponseData["servicesOffered"] = element.restaurant.highlights
                eachResponseData["priceRange"] = element.restaurant.price_range
                eachResponseData["currency"] = element.restaurant.currency
                eachResponseData["reviews"] = element.restaurant.all_reviews
                eachResponseData["timings"] = element.restaurant.timings
				eachResponseData["link"] = element.restaurant.events_url
                APIResponseData.push(eachResponseData);
            });

            console.log(APIResponseData)
			displayResults();
			$(".flex-container").css('display', 'grid');
        }

        function displayResults() {
			console.log("Calling");
            var outerDiv = document.getElementById("search_results")
            var innerDiv = document.getElementById("innerSearchDiv")

            var i = 0;
            APIResponseData.forEach(element => {
                var d = document.createElement('div');
                d.className = "flex-container";
                d.innerHTML = innerDiv.innerHTML;

                outerDiv.appendChild(d);

                document.getElementsByClassName("imageDisplay")[i].src = element.image;
                document.getElementsByClassName("nameDisplay")[i].innerHTML = element.businessName ;
                document.getElementsByClassName("addressDisplay")[i].innerHTML = element.address ;
                document.getElementsByClassName("phoneDisplay")[i].innerHTML = element.phone ;
				document.getElementsByClassName("ratingDisplay")[i].innerHTML = element.rating ;
                document.getElementsByClassName("cuisinesDisplay")[i].innerHTML = element.cuisines ;
				document.getElementsByClassName("linkDisplay")[i].href = element.link ;

                i++;
				
            });
			
	    }