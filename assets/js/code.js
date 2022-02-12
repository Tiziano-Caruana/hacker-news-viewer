//global variables declaration
loadedIDs = 0;
idArray = [];

axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')
    .then(function (response) {
        idArray = [...response.data];
        return idArray;
})//axios.get


function addNews(i){
    iter = i;
    for(N=0;iter>N;iter--){
        axios.get('https://hacker-news.firebaseio.com/v0/item/' + idArray[loadedIDs] + '.json')
            .then(function (response) {
                if(((response.data.title).includes("Ask HN"))||(response.data.url == undefined)){addNews(1)}else{ //"Ask HN" topics never return a link

                    //Outer div - for formatting purposes
                    outerDiv = document.createElement("div");
                    outerDiv.className = "col-md-6 col-lg-4 mb-4"

                    //Inner div - for styling purposes
                    innerDiv = document.createElement("div");
                    innerDiv.className = "card shadow-sm p-4 rounded bg-white border border-danger"

                    //title
                    title = document.createElement("h3");
                    title.className = "fs-2 py-2";
                    title.innerText = response.data.title;
                    innerDiv.appendChild(title);

                    //link
                    link = document.createElement("a");
                    link.href = response.data.url
                    link.target = "_blank";
                    link.className = "btn btn-danger py-2";
                    link.innerText = response.data.url;
                    innerDiv.appendChild(link);

                    //time (fetched in unix format, transformed to human-readable date)
                    time = document.createElement("p");
                    time.className = "text-muted pt-4";
                    const dateObject = new Date(response.data.time * 1000);
                    time.innerText = dateObject.toLocaleString()
                    innerDiv.appendChild(time);

                    //Append inner to outer and outer to document
                    outerDiv.appendChild(innerDiv);

                    page = document.getElementById("newsDiv");
                    page.appendChild(outerDiv);
                }//if
            })//then
            .catch(function (error) {
                console.log(error);
            });//catch/axios.get
        loadedIDs++;
    }//for
}//addNews