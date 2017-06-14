  function onSuccess(data) {
    console.log(data);
  }

  function onError(error) {
    console.log(error);
  }

  function shareContent() {
    console.log("Inside share");
    var postVal1 = "Post Content";
    var payload = { "comment": postVal1,  "visibility": {"code": "anyone" }};
    IN.API.Raw("/people/~/shares?format=json")
      .method("POST")
      .body(JSON.stringify(payload))
      .result(onSuccess)
      .error(onError);
      
       IN.API.Raw("/companies/2414183/shares?format=json")
      .method("POST")
      .body(JSON.stringify(payload))
      .result(onSuccess)
      .error(onError);
      
  }

