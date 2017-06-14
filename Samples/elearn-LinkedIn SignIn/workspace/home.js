// JavaScript File        <script type="text/javascript">
          function logout() {
          IN.Event.onOnce(IN, 'systemReady', function() {
          try {
            IN.User.logout();
            } catch (err) {
            console.log(err);
            }
            setTimeout("goToHome()", 10000);
            });
          }

        function goToHome() {
          
            console.log("You have successfully logged Out");
            localStorage.setItem("userid","");
            localStorage.setItem("selVal","");
            location.href="/login.html";
        }
        
        
        window.onload = function () {
        //Get people
        $.ajax({
         url: "https://jeez07z.cloudant.com/elearn1/_all_docs",
         type: "GET",
         xhrFields: {
              "withCredentials": "true"
           },
         dataType: "json",
         contentType: "application/json"
            })
         .done(function (data) {
         console.log("Response " + data.total_rows);
         for (i=0;i<data.total_rows;i++)
         {
            console.log(localStorage.getItem("userid"));
            if(localStorage.getItem("userid") != data.rows[i].id)
            {
            getDetails(data.rows[i].id);
            getBooks();
            getVideos();
            }
         }
         //document.getElementById('name').value = data.firstName+" "+data.lastName;
         });
            
        
        function getDetails(uid) {
         $.ajax({
         url: "https://jeez07z.cloudant.com/elearn1/"+uid,
         type: "GET",
         xhrFields: {
              "withCredentials": "true"
           },
         dataType: "json",
         contentType: "application/json"
            })
         .done(function (data) {
         var id1 = data._id;
         var jsonresp = JSON.stringify(data);
         console.log("Response " + jsonresp);
         $("#members").append("</br><table><tr><td>"+data.firstName+" "+data.lastName+"</td></tr><tr><td>"+data.headline+"</td></tr><tr><td><IMG src='"+data.pictureUrl+"'/></td></tr><tr><td></br><a href='https://www.linkedin.com'><b>Connect</b></a></td></tr></table></br>________________________________</br>");
         });
        }
        
        function getBooks() {
        var selvalue = localStorage.getItem("selVal");
        //get Books
         $.ajax({
         url: "https://jeez07z.cloudant.com/books/"+selvalue,
         type: "GET",
         xhrFields: {
              "withCredentials": "true"
           },
         dataType: "json",
         contentType: "application/json"
            })
         .done(function (data) {
         var jsonresp = JSON.stringify(data);
         console.log("Response " + jsonresp);
         console.log(data.books);
         var postVal = data.books.title+"   "+data.books.uri;
         localStorage.setItem("linkVal", postVal);
         console.log(localStorage.getItem("linkVal"));
         $("#books").append("</br><table><tr><td><b>"+data.books.title+"</b></td></tr><tr><td><a href='"+data.books.uri+"'>Buy/Read</a> &nbsp; &nbsp; ZAR"+data.books.Price+"</br></br></td></tr><tr><td><IMG src='"+data.books.imguri+"'/></td></tr><tr><td></br></td></tr></table>");
         });
        }
        
        function getVideos() {
        var selvalue = localStorage.getItem("selVal");
        //get Books
         $.ajax({
         url: "https://jeez07z.cloudant.com/videos/"+selvalue,
         type: "GET",
         xhrFields: {
              "withCredentials": "true"
           },
         dataType: "json",
         contentType: "application/json"
            })
         .done(function (data) {
         var jsonresp = JSON.stringify(data);
         console.log("Response " + jsonresp);
         console.log(data.videos);
         var postVal = data.videos.title+"   "+data.videos.uri;
         localStorage.setItem("videoVal", postVal);
         console.log(localStorage.getItem("linkVal"));
         $("#videos").append("</br><table><tr><td><b>"+data.videos.title+": &nbsp; <a href='"+data.videos.uri+"'>View</a></b></td></tr></table></br>");
         });
        }
        

        };


