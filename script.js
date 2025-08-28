// buttons for modal opening
let addbt = document.querySelector(".fa-add");
let updatebt = document.querySelectorAll(".update");
let deletebt = document.querySelectorAll(".delete");

// all sections of webpage

let main = document.querySelector("#maincontainer");
let addModal = document.querySelector("#addmodal");
let close = document.querySelectorAll(".modal_close");
let updateModal = document.querySelector("#updatemodal");
let deleteModal = document.querySelector("#deletemodal");

// ___________________

// -----------------------------------------------

addbt.addEventListener("click", () => openmodal(main, addModal, "block"));

// close button for add
close[0].addEventListener("click", () =>{
  reset();
  // closemodal(addModal)
  });


for (let i = 0; i < updatebt.length; i++) {
  updatebt[i].addEventListener("click", () =>
    openmodal(main, updateModal, "block")
  );
  // since number of delete buttons are same as edit
  deletebt[i].addEventListener("click", () =>
    openmodal(main, deleteModal, "flex")
  );
}
// close button for update
close[1].addEventListener("click", () => {closemodal(updateModal)});
// close button for delete
close[2].addEventListener("click", () => {closemodal(deleteModal)});



// #################################################################################################################################################

// -------------------------------------------------------- ADD MODAL ------------------------------------------------------------------------------
let itemField = document.querySelector(".itemadd");
let addButton = document.querySelector("#addbt");
let categories = document.querySelectorAll(".addbuttons");
let priceField = document.querySelector(".priceadd");
let slideButtons = document.querySelectorAll(".slideButtonAdd");

let itemname = "";
let categoryname = null;
let active = null;
let itemPrice = 0;
let itemlist = [];

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
for (let i = 0; i < slideButtons.length; i++) {
  slideButtons[i].addEventListener("click", () => {
    if (slideButtons[i].value === "up") {
      let newNumber = priceField.value;
      newNumber = Number(newNumber);
      newNumber += 0.01;
      priceField.value = Math.round(newNumber * 100) / 100;
    } else {
      let newNumber = priceField.value;
      newNumber = Number(newNumber);
      newNumber -= 0.01;
      if (Number(priceField.value) <= 0) {
        blinkAnimation(priceField, "blink");
      } else {
        priceField.value = Math.round(newNumber * 100) / 100;
      }
    }
  });
}

//when arrowdown pressed after reaching 0

priceField.addEventListener("keydown", (e) => {
  if (priceField.value <= 0) {
    if (e.key === "ArrowDown") {
      blinkAnimation(priceField, "blink");
    }
  }
});

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
  }

  // resetting all values to default

 


  console.log(itemlist);
});

//###########################################################################---- MODAL ADD END ---###############################################################

// ---------------------------------------------------------------------DISPLAYING ITEMS ON MAIN PAGE-------------------------------------------------------












//###########################################################################----DISPLAYING ITEMS ON MAIN PAGE END ---###############################################################




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
  }
}

// function for resetting the add modal

function reset(){
  itemname="";
  categoryname=null;
  itemPrice=0;

  itemField.value="";
  priceField.value="";
  if(active!=null){
    active.style.backgroundColor="var(--background)";
  }
  active=null;
  closemodal(addModal);

}
