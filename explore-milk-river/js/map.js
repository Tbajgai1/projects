
        function gotoLakeLouise() {
            //Map options
            var mapOptions = {
                center: new google.maps.LatLng(51.41775518775909, -116.21641630513496),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }; //end options

            //set map
            var map = new google.maps.Map(document.getElementById("map"), 
            mapOptions);

            //add content title
            document.querySelector(".title").innerHTML = "Experience the Beauty of <span class= \"text-warning h3\" >Lake Louise</span>";
            
            //add description
            document.querySelector(".description").innerHTML = "Nestled in the heart of Banff National Park, Lake Louise is a natural wonder that will take your breath away. This glacial lake is one of Canada's most iconic destinations, with its turquoise waters and majestic mountain backdrop. Visitors can stroll along the shoreline, rent a canoe and paddle out into the middle of the lake, or hike up to the Lake Agnes Tea House for stunning panoramic views. In the winter months, the lake freezes over, creating a spectacular natural ice skating rink that is a must-visit for any winter sports enthusiast.";

            //Draw polygon overlay
            var lakeLouise = [
                new google.maps.LatLng(51.4174576985765, -116.2232239227137),
                new google.maps.LatLng(51.417738959997074, -116.21720405362522),
                new google.maps.LatLng(51.416870712645746, -116.2153608363799),
                new google.maps.LatLng(51.416173657062764, -116.21541966246221),
                new google.maps.LatLng(51.41487734999595, -116.21730209709573) 
            ];

            polyLakeLouise = new google.maps.Polygon({
                paths: lakeLouise,
                strokeColor: "#ff0000",
                strokeWeight: 2,
                fillColor: "#009090",
                fillOpacity: 0.75
            });

            polyLakeLouise.setMap(map);


            // Restaurant marker for lake louise with personal icon
            var lakeLouiseRestaurant = new google.maps.Marker({
                position: new google.maps.LatLng(51.41711727203344, -116.21713724975312),
                map:map,
                title: "Restaurant near Banff",
                icon: "../img/restaurant.png",
                animation: google.maps.Animation.DROP

            });

            // Info window, add/remove info here
            var lakeLouiseInfo = new google.maps.InfoWindow({
                content: "<div style=\"text-align: center; overflow: hidden\"><h4 style=\"text-align:center\"> Restaurant Lake Louise </h4><p style=\"width: 30ch; text-align: left; margin: 10px auto\">This is the best place to eat when you are at Lake Louise </p><img src=\"img/restaurantLL.jpeg\" style=\"width: 200px\"></div>"
            });

            //Event listner//click function
            google.maps.event.addListener(lakeLouiseRestaurant, "mouseover", function() {
                 lakeLouiseInfo.open(map, lakeLouiseRestaurant);
            });

            //Load on open
            lakeLouiseInfo.open(map, lakeLouiseRestaurant);

        };



        ///MAP SYLVAN LAKE
        function gotoSylvanLake() {
            //Map options
            var mapOptions = {
                center: new google.maps.LatLng(52.33585766339908, -114.10219208830476),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.HYBRID,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
            };


            //set map
            var map = new google.maps.Map(document.getElementById("map"), 
            mapOptions);

            //add content title
            document.querySelector(".title").innerHTML = "Relax and Recharge at <span class= \"text-warning h3\" >Sylvan Lake</span>";
            
            //add content description
            document.querySelector(".description").innerHTML = "Located just a short drive from Red Deer, Sylvan Lake is a picturesque oasis that is the perfect destination for anyone looking to unwind and recharge. The lake is a popular destination for swimming, boating, and waterspouts with its crystal-clear waters and sandy beaches. Visitors can rent a paddleboat, kayak, or stand-up paddleboard, explore the lake's many bays and coves, or relax on the beach and soak up the sun.";

            // Draw circle overlay
            var myCircle = {
                strokeColor: "#ffe499",
                strokeWeight: 5,
                fillColor: "#b3cf99",
                fillOpacity: 0.55,
                map: map,
                center: new google.maps.LatLng(52.316096398017876, -114.09917151139514),
                radius: 1500
            };
            
            var cityCircle = new google.maps.Circle(myCircle);

             // create marker
             var bestSpot = new google.maps.Marker({
                position: new google.maps.LatLng(52.31114116487246, -114.09597888286126),
                map:map,
                title: "Restaurant near Banff",
                icon: "../img/beach.png",
                animation: google.maps.Animation.DROP

            });

            // Info window, add/remove info here
            var sylvanLake = new google.maps.InfoWindow({
                content: "<div style=\"text-align: center; overflow: hidden\"><h4 style=\"text-align:center\"> Best spot on the beach </h4><p style=\"width: 30ch; text-align: left; margin: 10px auto\">This is one of the best spot on the beach </p><img src=\"img/sylvan-beach.jpg\" style=\"width: 200px\"></div>"
            });

            //Event listner//click function
            google.maps.event.addListener(bestSpot, "click", function() {
                 sylvanLake.open(map, bestSpot);
            });


        };
