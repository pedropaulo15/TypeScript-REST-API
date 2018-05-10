// First try of fetch implementation

// function createLink(){
//     fetch("api/v1/links/", { method: "GET", body: JSON.stringify({}) }).then(response => {
//         response.json().then(json => {
//             console.log(json);
//         });
//     });
//     console.log("Hello from Client.ts");
// }

// Second try of fetch implementation
fetch(
    "/api/v1/links/",
    {
        headers: {
            "Content-type": "application/json",
            "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI1OTU3NDEwfQ.5dOLyXvARuXjoGCaX8Z5d_pi499LlkEhCe-n_5xg_Hc"
        },
        method: "POST",
        body: JSON.stringify({
            title: "Google",
            url: "www.google.com"
        })
    }
).then((response) => {
    console.log(response);
});