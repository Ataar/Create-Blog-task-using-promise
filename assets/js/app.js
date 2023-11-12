
let blogUser = document.getElementById('blogUser');
let title = document.getElementById('title');
let content = document.getElementById('content');
let blogContainer = document.getElementById('blogContainer');

let blogArray=[
    {
        title:'Indian Foods',
        content:'Papdi chaat is one of the easy Indian food recipes. Just assemble fried crispy papdi, dahi, boiled chickpeas, and boiled potatoes, drizzle some tamarind chutney, coriander chutney,bhujia and sprinkle some roasted cumin powder and chaat masala on top of this papri chaat.'
    }
]

let onblog =(eve)=>{     // step 1:- submit event bind hua. it will create only object.  
    eve.preventDefault();

    
    let obj =
    {

        title:title.value,                 // step 2:- object se value get hui.
        content:content.value.trim()


    }
    // console.log(obj);
    createBlog(obj)
    .then((add)=>{
        // console.log(add)
        blogArray.push(add);
       return readBlock()
        // console.log(blogArray);
        
    })
    .then(res=>{
        console.log(res);
        templating(res)

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Hi, You Have Visited",
            timer:4000
          });
    })
    
    .catch(err=>{
        console.log(err)
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Please Wait While API Get Resolve",
            timer:4000
          });
    })

    

    .finally(()=>{
        blogUser.reset()
    })
}

function createBlog(blogObj){   // step 3:- this function call API call for storing object in DB.
// note:- blogObj parameter will help to create blog and form will give that specific object.

    let promise = new Promise((resolve,reject)=>{ // asuncronus behav hai isliye promise aur setTimeout use hua.
     setTimeout(() => {
        let err = Math.random() >=.5 ? false : true; // false if there is no error otherwise true.
        if(!err){ //if there is no error
            resolve(blogObj)
        }
        else{
            reject(`Enable To Get While Creating`)
        }
     }, 1000);
    })
    return promise
}
       
          function readBlock() // it is also call API call
          {
            let promise = new Promise((resolve,reject)=>{

                setTimeout(() => {
                    let err = Math.random() >=.5 ? false: true
                    if(!err)
                    {
                        resolve(blogArray)
                    }
                    else{
                        reject(`Something went wrong while sending data!!!`)
                    }
                },1500);
            })
            return promise
            
          }

          function templating(arr)
          {
              let result = ``;
              arr.forEach(blog => {
                result+=`
                
        <div class="card text-center mb-4">
       <div class="card-header text01 font-weight-bold">
        ${blog.title}
       </div>
       <div class="card-body text02">
        ${blog.content}
       </div>
        <div class="card-footer">
          <button class="btn btn-primary info">Edit</button>
          <button class="btn btn-danger">Delete</button>
        </div>
                
                
                `
              });
              blogContainer.innerHTML =result
          }

          


blogUser.addEventListener('submit',onblog)

// note:-
// 1)first of all we created a form(BlogForm) then a user filled its data just like he will fill title and content section.
// after that the submit button will be clicked. 

// 2) after submitting form one object will be created then callback function will give taht object
//      and using one function(createBlog) taht will call API call to store that object into DB or backend.

//3)now we have to get that data or object from DB means(readBlock) which also call API call.

//4)if the read block is success so send that data or object to Templating().


 
