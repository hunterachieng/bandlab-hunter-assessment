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
            const post = document.getElementById("post");
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
           document.getElementById("posts-id").appendChild(li);
          
        }
       
    })
})
.catch( error =>{
    console.log(error)
})
})

//playing audio
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
// get the audio element
const audioElement = document.querySelector('audio');
// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);


// select our play button
const audioButton = document.querySelector('.audio-button');

audioButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
          

    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

}, false);

audioElement.addEventListener('ended', () => {
    audioButton.dataset.playing = 'false';
}, false);

const volumeNode = audioContext.createGain();

track.connect(volumeNode).connect(audioContext.destination);

const volumeController = document.querySelector('[data-action = "volume"]');

volumeController.addEventListener('input', function() {
    volumeNode.gain.value = this.value;
}, false);