const inputBox = document.querySelector(".inputField input");
const addbtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllbtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value ; //geeting user entered value
    if (userData.trim() !=0) {// if user values aren't only soaces
        addbtn.classList.add("active");// active are add button
    }
    else{
        addbtn.classList.remove("active"); //unactive the add button 
    }
}
showTask();//calling show task fn 

//if user click on the add btn
addbtn.onclick = ()=>{
    let userData = inputBox.value ; //geeting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storeage
    if (getLocalStorage == null){//if localstorageis null
        listArr = []; // creating blank array
    }
    else{
        listArr = JSON.parse(getLocalStorage);// transforming json string into  js object
    }
    listArr.push(userData); // pushing or ading user data 
    localStorage.setItem("New Todo" , JSON.stringify(listArr));// transforming js object into json string
    showTask();//calling show task fn 

}

// function to add task list inside ul
function showTask(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storeage
    if (getLocalStorage == null){//if localstorageis null
        listArr = []; // creating blank array
    }
    else{
        listArr = JSON.parse(getLocalStorage);// transforming json string into  js object
    }

    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;//passing the length value in pendingnumb

    if(listArr.length > 0){
        deleteAllbtn.classList.add("active");
    }
    else{
        deleteAllbtn.classList.remove("active");
    }

    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });

    todoList.innerHTML = newLiTag; // adding new li tag inside ul  tag
    inputBox.value = ""; // once task  added leave the i/p blank
}

// delete task
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular index
    
    
    // after removing li again update local storage
    localStorage.setItem("New Todo" , JSON.stringify(listArr));
    showTask();
}
// delete all task function
deleteAllbtn.onclick = ()=>{
    listArr = []; //empty array
     // after deleteing all task update local storage
     localStorage.setItem("New Todo" , JSON.stringify(listArr));
     showTask();
}