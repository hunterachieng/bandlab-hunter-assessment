const posts = document.getElementById("posts");
posts.addEventListener("click", 
function (){
let url = "https://jsonplaceholder.typicode.com/posts";
fetch(url)
.then(res => res.json())
.then(result=>{
   
    return result.map(data=>{
        console.log(data.userId)
        let li = document.createElement("li");
        li.innerHTML = data.body;
      document.getElementById("all-posts").appendChild(li);
    })
})
.catch( error =>{
    console.log(error)
})
})

//sorting posts based on title
const titles = document.getElementById("sort-post-title")
let titleUrl = "https://jsonplaceholder.typicode.com/posts"
fetch(titleUrl)
.then(res=>res.json())
.then(results =>{
   
    results.map(data=>{
        
       Object.keys(data).sort((a,b) => (a.title > b.title) ? 1: (b.title > a.title ) ? -1 : 0)
       
         titles.innerHTML += `<option class="post-title" value="${data.body}">${data.title}</option>`   
 
         titles.addEventListener("change", function(event){
            const post = document.getElementById("post-sort");
            post.innerHTML= `${event.target.value}`
        
        })
    })              
   
   
})
.catch( error =>{
    console.log(error)
})

//grouping posts by id


const postById = document.getElementById("posts-by-id");
const post = document.getElementById("post");
            
postById.addEventListener("click", 
function (){
let url = "https://jsonplaceholder.typicode.com/posts";
fetch(url)
.then(res => res.json())
.then(result=>{
   
     result.map(data=>{
        const idValue = document.querySelector("#post-id").value
        if(data.userId == idValue){
            console.log(data)
           let li = document.createElement("li");
           li.innerHTML = `${data.body}`;
           document.getElementById("all-posts").appendChild(li);
          
        }
       
    })
})
.catch( error =>{
    console.log(error)
})
})

