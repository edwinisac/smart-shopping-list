let itemlist = null;
// global variable for add section
let itemname = "";
let categoryname = null;
let active = null;
let itemPrice = 0;
let uniqueId = 0;
let specificId = null;
// global variable declaration for update section
let updateActive = null;
let updatedCategoryName = null;
let currentUpdateId = null;
// global variable declaration for delete section
let currentDeleteId = null;
// ------------------------------------------------------------------
// all sections of webpage
let main = document.querySelector("#maincontainer");
let addModal = document.querySelector("#addmodal");
let close = document.querySelectorAll(".modal_close");
let updateModal = document.querySelector("#updatemodal");
let deleteModal = document.querySelector("#deletemodal");
// global selectors for main
let addbt = document.querySelector(".fa-add");
let displayList = document.querySelector(".list"); // ul section to display list items
// global selectors for add modal
let itemField = document.querySelector(".itemadd");
let addButton = document.querySelector("#addbt");
let categories = document.querySelectorAll(".addbuttons");
let priceField = document.querySelector(".priceadd");
let slideButtons = document.querySelectorAll(".slideButtonAdd");
// global selectors for update modal
let updateCategory = document.querySelectorAll(".updatebuttons");
let updateItemField = document.querySelector(".itemupdate");
let updatePriceField = document.querySelector(".priceupdate");
// global selector for total price
let totalPrice = document.querySelector(".total_price");

// ####################################################################################################################################
// loading data from local storage
let storedData = localStorage.getItem("shoppingList");
if (storedData !== null) {
  itemlist = JSON.parse(storedData);
  for (let i = 0; i < itemlist.length; i++) {
    let savedId = itemlist[i].id;
    let li = document.createElement("li");
    li.className = "item_list";
    li.id = `product-${savedId}`;
    li.innerHTML = `<input type="checkbox" class="checkbox" id="item-${savedId}" data-checkid="${savedId}" />
    <label for="item-${savedId}" class="custom_checkbox">
    <i class="fa-solid fa-check"></i>
    </label>
    <label for="item-${savedId}" class="item_name">${itemlist[i].name}</label>
    <label for="item-${savedId}" class="item_price"><span style="color: goldenrod;">₹</span> ${itemlist[i].price}</label>
    <button class="update" id="updateid-${savedId}" data-Id="${savedId}"><i class="fa-solid fa-pen"></i></button>
    <button class="delete" id="deleteid=${savedId}" data-Id="${savedId}"><i class="fa-solid fa-trash"></i></button> `;

    let checkbox = li.querySelector(".checkbox");
    let customCheckbox = li.querySelector(".custom_checkbox");
    let text = li.querySelector(".item_name");
    let updateModalOpen = li.querySelector(`.update`);
    let deleteModalOpen = li.querySelector(".delete");

    checkbox.addEventListener("change", (e) => {
      verifyCheck(checkbox, customCheckbox, e, text);
    });

    updateModalOpen.addEventListener("click", (e) => {
      openUpdate(e);
    });

    deleteModalOpen.addEventListener("click", (e) => {
      openDelete(e);
    });

    displayList.appendChild(li);
    if (itemlist[i].status === true) {
      customCheckbox.classList.add("check_toggle");
      text.classList.add("item_name_check");
    }
  }
  pricedisplay();
} else {
  itemlist = [];
}
// ########################################################---Main page-----#####################################################################

addbt.addEventListener("click", () => openmodal(main, addModal, "block"));

// close button for add
close[0].addEventListener("click", () => {
  reset();
});

// close button for update
close[1].addEventListener("click", () => {
  closemodal(updateModal);
});
// close button for delete
close[2].addEventListener("click", () => {
  closemodal(deleteModal);
});

// #################################################################################################################################################

// -------------------------------------------------------- ADD MODAL ------------------------------------------------------------------------------


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
slidebutton(slideButtons, priceField);
//when arrowdown pressed after reaching 0
downpress(priceField);
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
    specificId =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    itemlist.push(
      new itemCreate(itemname, categoryname, itemPrice, specificId)
    );
    // reset the fields only if all the details are submitted
    reset();
    localStorage.setItem("shoppingList", JSON.stringify(itemlist)); // updating  local storage

    // ----------------------------DISPLAYING ITEMS ON MAIN PAGE-------------------

    let li = document.createElement("li");
    li.className = "item_list";
    li.id = `product-${specificId}`;
    li.innerHTML = `<input type="checkbox" class="checkbox" id="item-${specificId}" data-checkid="${specificId}" />
                  <label for="item-${specificId}" class="custom_checkbox">
                  <i class="fa-solid fa-check"></i>
                  </label>
                  <label for="item-${specificId}" class="item_name">${
      itemlist.find((object) => object.id === specificId).name
    }</label>
                  <label for="item-${specificId}" class="item_price"><span style="color: goldenrod;">₹</span> ${
      itemlist.find((object) => object.id === specificId).price
    }</label>
                  <button class="update" id="updateid-${specificId}" data-Id="${specificId}"><i class="fa-solid fa-pen"></i></button>
                  <button class="delete" id="deleteid=${specificId}" data-Id="${specificId}"><i class="fa-solid fa-trash"></i></button> `;

    // data-Id = uniqueID - to keep track of the id of  buttons to know which one is pressed, can be accessed with dataset

    // selecting things inside the list
    let checkbox = li.querySelector(".checkbox");
    let customCheckbox = li.querySelector(".custom_checkbox");
    let text = li.querySelector(".item_name");
    let updateModalOpen = li.querySelector(`.update`);
    let deleteModalOpen = li.querySelector(".delete");

    checkbox.addEventListener("change", (e) => {
      verifyCheck(checkbox, customCheckbox, e, text);
    });

    // to open update modal
    updateModalOpen.addEventListener("click", (e) => {
      openUpdate(e);
    });

    // to open delete modal
    deleteModalOpen.addEventListener("click", (e) => {
      openDelete(e);
    });

    displayList.appendChild(li);
    pricedisplay();
  }
});
//###########################################################################---- ADD MODAL END ---###############################################################

// #################################------------update Modal-----------#########################

// setting the slide buttons
let slideButtonUpdate = document.querySelectorAll(".slideButtonUpdate");
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
    let short = itemlist.find((obj) => obj.id === currentUpdateId); //selecting the corresponding object
    if (updateItemField.value !== short.name) {
      short.name = updateItemField.value;
      document.querySelector(
        `#product-${currentUpdateId} .item_name`
      ).textContent = short.name;
    }
    // updating product category
    if (updatedCategoryName !== short.category) {
      short.category = updatedCategoryName;
    }
    // updating product price
    if (updatePriceField.value !== short.price) {
      short.price = updatePriceField.value;
      document.querySelector(
        `#product-${currentUpdateId} .item_price`
      ).innerHTML = `<span style="color: goldenrod;">₹</span> ${short.price}`;
    }
    currentUpdateId = null;
    pricedisplay();
    localStorage.setItem("shoppingList", JSON.stringify(itemlist)); // updating  local storage
    closemodal(updateModal);
  }
});
// #################################------------update Modal end-----------#########################

// #################################----------Delete Modal start---------------################################################
let confirmBt = document.querySelector(".proceed");
let cancelBt = document.querySelector(".cancel");
// when confirm clicked
confirmBt.addEventListener("click", () => {
  document.getElementById(`product-${currentDeleteId}`).remove();
  let index = itemlist.findIndex((obj) => obj.id === currentDeleteId);
  if (index !== -1) {
    itemlist.splice(index, 1);
    currentDeleteId = null;
    pricedisplay();
    localStorage.setItem("shoppingList", JSON.stringify(itemlist));
    closemodal(deleteModal);
  }
});
// when cancel clicked
cancelBt.addEventListener("click", () => {
  currentDeleteId = null;
  closemodal(deleteModal);
});
// #################################----------Delete Modal end---------------################################################


// #########################----------other features--------------###########################################################################################
let groups = document.querySelectorAll(".clicked");
let track = null;
let selected = null;
groups.forEach((set) => {
  set.addEventListener("click", () => {
    let allItems = document.querySelectorAll(".item_list");
    if (track === set) {
      //when clicked item is the same
      track.classList.remove("clicked-active");
      track = null;
      selected = null;
      allItems.forEach((item) => {
        item.style.display = "flex";
      });
    } else {
      if (track !== null) {
        //when clicked another item- switch
        track.classList.remove("clicked-active");
        track = null;
        selected = null;
      }
      track = set;
      selected = set.dataset.value;
      track.classList.add("clicked-active");
      allItems.forEach((item) => {
        item.style.display = "none";
        let current = item.id;
        let currentSelected = itemlist.find(
          (obj) => obj.id === current.split("-")[1]
        );
        if (currentSelected.category === selected) {
          item.style.display = "flex";
        }
      });
    }

  });
});
// #########################----------other features end --------------#######################################################################################

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
  constructor(name, category, price, specificId) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.id = specificId;
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
// for slide button functionality
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

// to display total price

function pricedisplay() {
  let totalLength = itemlist.length;
  let total = 0;
  if (totalLength !== 0) {
    for (let i = 0; i < totalLength; i++) {
      let currentPrice = Number(itemlist[i].price);
      total += currentPrice;
    }
    totalPrice.textContent = total;
  } else {
    totalPrice.textContent = 0;
  }
}

// to change the checked or not checked state

function verifyCheck(checkbox, customCheckbox, e, text) {
  let checkId = e.currentTarget.dataset.checkid;
  if (checkbox.checked) {
    customCheckbox.classList.add("check_toggle");
    // also pass a flag or status and modify the object
    itemlist.find((obj) => obj.id === checkId).status = true; //checked
    text.classList.add("item_name_check");
  } else {
    customCheckbox.classList.remove("check_toggle");
    itemlist.find((obj) => obj.id === checkId).status = false; //not checked
    text.classList.remove("item_name_check");
  }
  localStorage.setItem("shoppingList", JSON.stringify(itemlist));
}

// to open update modal

function openUpdate(e) {
  openmodal(main, updateModal, "block");

  // ############################-----update modal when pen icon clicked------------##############################

  let id = e.currentTarget.dataset.id;
  // using dataset to confirm which update button is pressed will give the id saved to the current target button

  // displaying product name
  let item = itemlist.find((obj) => obj.id === id);
  updateItemField.value = item.name;

  // for displaying the selected category
  for (let i = 0; i < updateCategory.length; i++) {
    if (updateCategory[i].value === item.category) {
      updateCategory[i].style.backgroundColor = "green";
      updateActive = updateCategory[i];
      updatedCategoryName = updateCategory[i].value;
    } else {
      updateCategory[i].style.backgroundColor = "var(--background)";
    }
  }
  // displaying product price
  updatePriceField.value = item.price;
  currentUpdateId = id;
}
// to open delete modal
function openDelete(e) {
  deleteid = e.currentTarget.dataset.id;
  openmodal(main, deleteModal, "flex");
  currentDeleteId = deleteid;
}
