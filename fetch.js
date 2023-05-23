 const postsList = document.querySelector('.posts-list');
 const addPostForm = document.querySelector('.add-post');
 const titleValue = document.getElementById('title-value');
 const bodyValue = document.getElementById('body-value');
 const btnSubmit = document.querySelector('.btn');
 let output = '';

 
const renderPosts = (posts) => {  
posts.slice(0,6).forEach(post => {
    output += `
    <div class="card col-md-6 bg-light mt-3" >
    <div class="card-body" data-id=${post.id}>
      <h6 class="card-subtitle mb-2 text-muted">${post.title}</h6>
      <p class="card-text">${post.body}</p>
      <button class="card-link" id="edit-post">EDIT</button>
      <button href="#" class="card-link" id="delete-post">DELETE</button>
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
.then((res) => res.json())
.then(data => renderPosts(data))

let postToEditId;
postsList.addEventListener('click', (e) =>{
    e.preventDefault();
    let delBtnPressed = e.target.id === 'delete-post';
    let editBtnPressed = e.target.id === 'edit-post';

    let id = e.target.parentElement.dataset.id;
    
    //Delete - Remove the existing post
    //Method: DELETE
    if(delBtnPressed) {
        console.log(id);
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
        postToEditId = id;
        

        titleValue.value = titleContent;
        bodyValue.value = bodyContent;
        btnSubmit.textContent = 'Edit Post';
    }
});
//Update - update the existing post
//Method: PATCH

addPostForm.addEventListener('click', (e) => {
    e.preventDefault();
    if (btnSubmit.textContent === 'Edit Post'){
        console.log(postToEditId, 3);
    fetch(`${url}/${postToEditId}`, {
        method: 'PUT',      
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        body: JSON.stringify({
          title: titleValue.value,
          body: bodyValue.value,
        })
    }) 
        .then(res => res.json())
        .then((data) => console.log(data));
        setTimeout(() => {
            btnSubmit.textContent = 'Add Post';
        }, 2000);
    } else if (btnSubmit.textContent === 'Add Post') {
//create - insert new post
//Method: POST
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

//reset input field
titleValue.value = '';
bodyValue.value = '';
    }
});
