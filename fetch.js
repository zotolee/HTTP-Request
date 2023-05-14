/* customFetch("https://jsonplaceholder.typicode.com/posts", "GET");
customFetch("https://jsonplaceholder.typicode.com/posts", "POST", {name: "POST data"});
customFetch("https://jsonplaceholder.typicode.com/posts/1", "PUSH", {name: "PUSH data"});
customFetch("https://jsonplaceholder.typicode.com/posts/1", "DELETE");
 
function customFetch(url, type, data) {

    if (type === "GET") {
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => {
            if (res.ok) {
                console.log("HTTP request successful");
            } else {
                console.log("HTTP request unsuccessful");
            }
            return res;
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
        
    }

    if (type === "POST" || type == "PUT") {
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ data }),
        })
        .then((res) => {
            if (res.ok) {
                console.log("HTTP request successful");
            } else {
                console.log("HTTP request unsuccessful");
            }
            return res;
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
        
    }

    if (type === "DELETE") {
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => {
            if (res.ok) {
                console.log("HTTP request successful");
            } else {
                console.log("HTTP request unsuccessful");
            }
        })
        .catch((error) => console.log(error));
    }
}



const form = document.querySelector('#feedback-form');
const feedbackMessage = document.querySelector('#feedback-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: formData.get('name'),
      email: formData.get('email'),
      body: formData.get('feedback')
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  .then(response => response.json())
  .then(data => {
    feedbackMessage.textContent = 'Thanks for your feedback!';
    form.reset();
  })
  .catch(error => {
    feedbackMessage.textContent = 'There was an error submitting your feedback.';
    console.error(error);
  });
});  */



 // Fetch restaurant data
 
/* fetch('https://example-data.draftbit.com/restaurants')
 .then(response => response.json())
 .then(restaurantsData => {
   // Display restaurants
   const restaurantList = document.querySelector('#restaurant-list');

   restaurantsData.forEach(restaurant => {
     const restaurantDiv = document.createElement('div');
     restaurantDiv.classList.add('restaurant');

     const nameHeading = document.createElement('h2');
     nameHeading.textContent = restaurant.name;

     const cuisineParagraph = document.createElement('p');
     cuisineParagraph.textContent = `Cuisine: ${restaurant.image}`;

     restaurantDiv.appendChild(nameHeading);
     restaurantDiv.appendChild(cuisineParagraph);

     restaurantList.appendChild(restaurantDiv);
   });
 })
 .catch(error => {
   console.error('Error:', error);
 });  */


 const postsList = document.querySelector('.posts-list');
 const addPostForm = document.querySelector('.add-post');
 const titleValue = document.getElementById('title-value');
 const bodyValue = document.getElementById('body-value');
 const btnSubmit = document.querySelector('.btn');
 let output = '';

const renderPosts = (posts) => {  
posts.forEach(post => {
    output += `
    <div class="card col-md-6 bg-light mt-3" >
    <div class="card-body" data-id=${post.id}>
      <h6 class="card-subtitle mb-2 text-muted">${post.title}</h6>
      <p class="card-text">${post.body}</p>
      <a href="#" class="card-link" id="edit-post">EDIT</a>
      <a href="#" class="card-link" id="delete-post">DELETE</a>
    </div>
  </div>
    `;
});
    postsList.innerHTML = output;
}
 const url = 'https://jsonplaceholder.typicode.com/posts';

//Get - Read the posts
// Method: GET
fetch(url)
.then(res => res.json())
.then(data => renderPosts(data))

postsList.addEventListener('click', (e) =>{
    e.preventDefault();
    let delBtnPressed = e.target.id == 'delete-post';
    let editBtnPressed = e.target.id == 'edit-post';

    let id = e.target.parentElement.dataset.id;
    
    //Delete - Remove the existing post
    //Method: DELETE
    if(delBtnPressed) {
        console.log('remove post')
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(() => location.reload())
    }

    if(editBtnPressed) {
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.card-subtitle').textContent;
        let bodyContent = parent.querySelector('.card-text').textContent;

        titleValue.value = titleContent;
        bodyValue.value = bodyContent;
    }
});
//Update - update the existing post
//Method: PATCH
btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        body: JSON.stringify({
          title: titleValue.value,
          body: bodyValue.value,
        })
    }) 
        .then(res => res.json())
        .then(() => location.reload())
    })

//create - insert new post
//Method: POST
addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        body: JSON.stringify({
          title: titleValue.value,
          body: bodyValue.value,
        }),
        
    })
    .then((res) => res.json())
    .then((data) => {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr);
    });
}) 

