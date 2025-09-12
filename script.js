// buttons for modal opening
let addbt = document.querySelector(".fa-add");
// let updatebt = document.querySelectorAll(".update");
// let deletebt = document.querySelectorAll(".delete");

// all sections of webpage

let main = document.querySelector("#maincontainer");
let addModal = document.querySelector("#addmodal");
let close = document.querySelectorAll(".modal_close");
let updateModal = document.querySelector("#updatemodal");
let deleteModal = document.querySelector("#deletemodal");

// all items of add modal

let itemField = document.querySelector(".itemadd");
let addButton = document.querySelector("#addbt");
let categories = document.querySelectorAll(".addbuttons");

// all items of main page

let displayList = document.querySelector(".list");

// -----------------------------------------------

addbt.addEventListener("click", () => openmodal(main, addModal, "block"));

// close button for add
close[0].addEventListener("click", () => {
  reset();
  // closemodal(addModal)
});

// for (let i = 0; i < updatebt.length; i++) {
//   updatebt[i].addEventListener("click", () =>
//     openmodal(main, updateModal, "block")
//   );
//   // since number of delete buttons are same as edit
//   deletebt[i].addEventListener("click", () =>
//     openmodal(main, deleteModal, "flex")
//   );
// }
// close button for update
close[1].addEventListener("click", () => {
  closemodal(updateModal);
});
// close button for delete
close[2].addEventListener("click", () => {
  closemodal(deleteModal);
});

// #################################################################################################################################################
// global variable declaration for update section
let updateActive = null;
let updatedCategoryName = null;
let currentUpdateId = null;
// global selectors for update modal
let updateCategory = document.querySelectorAll(".updatebuttons");
let updateItemField = document.querySelector(".itemupdate");
let updatePriceField = document.querySelector(".priceupdate");
// global variable declaration for delete section
let currentDeleteId=null;

// -------------------------------------------------------- ADD MODAL ------------------------------------------------------------------------------

let itemname = "";
let categoryname = null;
let active = null;
let itemPrice = 0;
let itemlist = [];
let uniqueId = 0;

// to select categories
for (let i = 0; i < categories.length; i++) {
  categories[i].addEventListener("click", () => {
    if (active != null) {
      active.style.backgroundColor = "var(--background)";
    }
    active = categories[i];
    active.style.backgroundColor = "green";
    categoryname = active.value;
  });
}

// setting the sliding buttons
let priceField = document.querySelector(".priceadd");
let slideButtons = document.querySelectorAll(".slideButtonAdd");
slidebutton(slideButtons, priceField);

// for (let i = 0; i < slideButtons.length; i++) {
//   slideButtons[i].addEventListener("click", () => {
//     if (slideButtons[i].value === "up") {
//       let newNumber = priceField.value;
//       newNumber = Number(newNumber);
//       newNumber += 0.01;
//       priceField.value = Math.round(newNumber * 100) / 100;
//     } else {
//       let newNumber = priceField.value;
//       newNumber = Number(newNumber);
//       newNumber -= 0.01;
//       if (Number(priceField.value) <= 0) {
//         blinkAnimation(priceField, "blink");
//       } else {
//         priceField.value = Math.round(newNumber * 100) / 100;
//       }
//     }
//   });
// }

//when arrowdown pressed after reaching 0

downpress(priceField);

// priceField.addEventListener("keydown", (e) => {
//   if (priceField.value <= 0) {
//     if (e.key === "ArrowDown") {
//       blinkAnimation(priceField, "blink");
//     }
//   }
// });

// when add button clicked

addButton.addEventListener("click", () => {
  // name of the item verification
  if (itemField.value.trim() === "") {
    blinkAnimation(itemField, "blink");
  }

  // price of the item verification
  if (priceField.value === "0" || priceField.value.trim() === "") {
    blinkAnimation(priceField, "blink");
  }

  // for categoryname verification
  if (categoryname === null) {
    alert("Please select any category");
  }

  // push to array if all three verifications pass
  // only store the value if all the three fields are filled
  if (
    itemField.value.trim() != "" &&
    categoryname != null &&
    priceField.value != "0" &&
    priceField.value.trim() != ""
  ) {
    itemname = itemField.value;
    itemPrice = priceField.value;
    itemlist.push(new itemCreate(itemname, categoryname, itemPrice));
    // reset the fields only if all the details are submitted
    reset();

    // ----------------------------DISPLAYING ITEMS ON MAIN PAGE-------------------

    // track of array length for unique ids
    uniqueId = itemlist.length - 1;

    let li = document.createElement("li");
    li.id = `product-${uniqueId}`;
    li.innerHTML = `<input type="checkbox" class="checkbox" id="item-${uniqueId}" data-checkid="${uniqueId}" />
                  <label for="item-${uniqueId}" class="custom_checkbox">
                  <i class="fa-solid fa-check"></i>
                  </label>
                  <label for="item-${uniqueId}" class="item_name">${itemlist[uniqueId].name}</label>
                  <label for="item-${uniqueId}" class="item_price"><span style="color: goldenrod;">₹</span> ${itemlist[uniqueId].price}</label>
                  <button class="update" id="updateid-${uniqueId}" data-Id="${uniqueId}"><i class="fa-solid fa-pen"></i></button>
                  <button class="delete" id="deleteid=${uniqueId}" data-Id="${uniqueId}"><i class="fa-solid fa-trash"></i></button> `;

    // data-Id = uniqueID - to keep track of the id of the buttons to know which one is presses, can be accessed with dataset

    // selecting things inside the list
    let checkbox = li.querySelector(".checkbox");
    let customCheckbox = li.querySelector(".custom_checkbox");
    let text = li.querySelector(".item_name");
    let updateModalOpen = li.querySelector(`.update`);
    let deleteModalOpen=li.querySelector(".delete");

    checkbox.addEventListener("change", (e) => {
      let checkId = e.currentTarget.dataset.checkid;
      if (checkbox.checked) {
        customCheckbox.classList.add("check_toggle");
        // also pass a flag or status and modify the object
        itemlist[checkId].status = true; //checked
        text.classList.add("item_name_check");
      } else {
        customCheckbox.classList.remove("check_toggle");
        itemlist[checkId].status = false; //not checked
        text.classList.remove("item_name_check");
      }
    });
    // to open update modal
    updateModalOpen.addEventListener("click", (e) => {
      openmodal(main, updateModal, "block");

      // ############################-----update modal when pen icon clicked------------##############################

      let id = e.currentTarget.dataset.id;
      // using dataset to confirm which update button is pressed will give the id saved to the current target button

      // let updateItemField = document.querySelector(".itemupdate");
      // let updateCategory = document.querySelectorAll(".updatebuttons");      --declared globally
      // let updatePriceField = document.querySelector(".priceupdate");

      // displaying product name
      updateItemField.value = itemlist[id].name;

      // for displaying the selected category
      for (let i = 0; i < updateCategory.length; i++) {
        if (updateCategory[i].value === itemlist[id].category) {
          updateCategory[i].style.backgroundColor = "green";
          updateActive = updateCategory[i];
          updatedCategoryName = updateCategory[i].value;
        } else {
          updateCategory[i].style.backgroundColor = "var(--background)";
        }
      }
      // displaying product price
      updatePriceField.value = itemlist[id].price;
      currentUpdateId = Number(id);
    });



    // to open delete modal
    deleteModalOpen.addEventListener("click",(e)=>{
      deleteid=e.currentTarget.dataset.id;
      openmodal(main,deleteModal,"flex");
      currentDeleteId=Number(deleteid);
    })

    displayList.appendChild(li);
  }

  // console.log(itemlist);
});

//###########################################################################---- ADD MODAL END ---###############################################################

// #################################------------update Modal-----------#########################

// setting the slide buttons
let slideButtonUpdate = document.querySelectorAll(".slideButtonUpdate");
// let priceFieldUpdate = document.querySelector(".priceupdate");
let updateButton = document.querySelector("#updatebt");
slidebutton(slideButtonUpdate, updatePriceField);

// for reselecting categories
for (let i = 0; i < updateCategory.length; i++) {
  updateCategory[i].addEventListener("click", () => {
    if (updateActive !== null) {
      updateActive.style.backgroundColor = "var(--background)";
    }
    updateCategory[i].style.backgroundColor = "green";
    updateActive = updateCategory[i];
    updatedCategoryName = updateCategory[i].value;
  });
}

// when arrow down pressed after reaching 0
downpress(updatePriceField);



// setting up the update button functionality
updateButton.addEventListener("click", () => {
  if (currentUpdateId !== null) {
    // updating product name
    if(updateItemField.value!==itemlist[currentUpdateId].name){
      itemlist[currentUpdateId].name=updateItemField.value;
      document.querySelector(`#product-${currentUpdateId} .item_name`).textContent=itemlist[currentUpdateId].name;
    }
    // updating product category
    if(updatedCategoryName!==itemlist[currentUpdateId].category){
      itemlist[currentUpdateId].category=updatedCategoryName;
    }
    // updating product price
    if(updatePriceField.value!==itemlist[currentUpdateId].price){
      itemlist[currentUpdateId].price=updatePriceField.value;
      document.querySelector(`#product-${currentUpdateId} .item_price`).innerHTML=`<span style="color: goldenrod;">₹</span> ${itemlist[currentUpdateId].price}`
    }
    closemodal(updateModal);

  }
});

// #################################------------update Modal end-----------#########################



// #################################----------Delete Modal start---------------################################################
let confirmBt=document.querySelector(".proceed");
let cancelBt=document.querySelector(".cancel");
// when confirm clicked
confirmBt.addEventListener("click",()=>{
  document.getElementById(`product-${currentDeleteId}`).remove();
  itemlist.splice(currentDeleteId,1);
  closemodal(deleteModal);
  console.log(itemlist);
  // some issues here
})
// when delete clicked
cancelBt.addEventListener("click",()=>{
  closemodal(deleteModal);
})










// #################################----------Delete Modal end---------------################################################


// ----------------------------------------------------------------------------- FUNCTIONS-------------------------------------------------------------------

// function for showing a modal
function openmodal(hidemodal, showmodal, type) {
  hidemodal.style.display = "none";
  showmodal.style.display = type;
}

// function for hiding a modal
function closemodal(hidemodal) {
  main.style.display = "block";
  hidemodal.style.display = "none";
}

// error animation - can be used for any errors with blinking borders

function blinkAnimation(target, animation) {
  target.classList.add(animation);
  let timeoutId = setTimeout(() => {
    target.classList.remove(animation);
  }, 1000);
}

// object creation

class itemCreate {
  constructor(name, category, price) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.status = false;
  }
}

// function for resetting the add modal

function reset() {
  itemname = "";
  categoryname = null;
  itemPrice = 0;

  itemField.value = "";
  priceField.value = "";
  if (active != null) {
    active.style.backgroundColor = "var(--background)";
  }
  active = null;
  closemodal(addModal);
}

function slidebutton(slide, actionArea) {
  for (let i = 0; i < slide.length; i++) {
    slide[i].addEventListener("click", () => {
      if (slide[i].value === "up") {
        let newNumber = actionArea.value;
        newNumber = Number(newNumber);
        newNumber += 0.01;
        actionArea.value = Math.round(newNumber * 100) / 100;
      } else if (slide[i].value === "down") {
        let newNumber = actionArea.value;
        newNumber = Number(newNumber);
        newNumber -= 0.01;
        if (Number(actionArea.value) <= 0) {
          blinkAnimation(actionArea, "blink");
        } else {
          actionArea.value = Math.round(newNumber * 100) / 100;
        }
      }
    });
  }
}

function downpress(target) {
  target.addEventListener("keydown", (e) => {
    if (target.value <= 0) {
      if (e.key === "ArrowDown") {
        blinkAnimation(target, "blink");
      }
    }
  });
}
