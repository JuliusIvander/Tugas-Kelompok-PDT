export default function payLoadGetter() {
  var user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    var userString = JSON.stringify(user);
    var base64Url = userString.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } else {
    return "";
  }
}
