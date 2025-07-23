
let mealname = document.getElementById("meal-name");
let mealdescription = document.getElementById("meal-description");
let mealcategory = document.getElementById("meal-category");
let mealprice = document.getElementById("meal-price");
let mealpicture = document.getElementById("meal-pic");
let addbtn = document.getElementById("addbtn");
let resetbtn = document.getElementById("resetbtn");
let actions = document.getElementById("actions");
let deletebtn = document.getElementById("deletebutton");
let empty_product = document.getElementById("empty_product");
let count = document.getElementById("count");
let tbody = document.getElementById("tbody");
let all_inputs = document.querySelectorAll(".all_inputs input");
let errormessage = document.getElementById("error-message");
let readicon = document.querySelectorAll(".read");
let updateicon = document.querySelectorAll(".update");


// let menu_array;

let menu_array = localStorage.getItem("local_all_menu")
    ? JSON.parse(localStorage.getItem("local_all_menu"))
    : [];
// Create a menu object
let creat_new_menu = () => {
    let menu = {
        name: mealname.value,
        description: mealdescription.value,
        category: mealcategory.value,
        price: mealprice.value,
        image: mealpicture.value,
    };
    menu_array.push(menu);
    localStorage.setItem("local_all_menu", JSON.stringify(menu_array));
    showdata();
    deleteiconfunctio();
    editiconfunctio();
    reset_inputs();
    checkempty();
    updateCount();
};
// reset inputs
let reset_inputs = () => {
    for (i = 0; i < all_inputs.length; i++) {
        all_inputs[i].value = null;
    }
};
resetbtn.addEventListener("click", reset_inputs)
// check empty
let checkempty = () => {
    if (tbody.parentElementCount == null && localStorage.getItem("local_all_menu") == null) {
        empty_product.classList.remove("none");
        count.classList.add("none");
        deletebtn.classList.add("none");
        tbody.classList.add("none");
        actions.classList.add("none");

    } else {
        count.classList.remove("none");
        deletebtn.classList.remove("none");
        empty_product.classList.add("none");
        tbody.classList.remove("none");
        actions.classList.remove("none");
    }


}


checkempty();

// show data
let showdata = () => {
    let tablerow = "";
    for (i = 0; i < menu_array.length; i++) {
        tablerow += `
    <tr>
    <td>${i + 1}</td>
    <td>${menu_array[i].name}</td>
    <td>${menu_array[i].description}</td>
    <td>${menu_array[i].category}</td>
    <td>${menu_array[i].price}</td>
     <td><img src="${menu_array[i].image}" class="menu-img"></td>
        <td> <i class="fa-solid fa-pen text-warning update" data_index="${i}"></i></td>
        <td> <i class="fa-solid fa-trash-can text-danger delete" data_index="${i}"></td>

    </tr>`}
    tbody.innerHTML = tablerow

}


// count
let updateCount = () => {
    count.textContent = menu_array.length;
};

// validation message

let enter_all_inputs = () => {
    let isvaild = true
    for (i = 0; i < all_inputs.length; i++) {
        if (all_inputs[i].value.trim() === "") {

            isvaild = false;
            break;
        }
    }
    if (!isvaild) {
        errormessage.classList.remove('none')
    } else {
        errormessage.classList.add('none')

    }
    return isvaild;
}

// addbtn.addEventListener("click", () => {
//     if (enter_all_inputs()) {
//         creat_new_menu();
//     }

// })


addbtn.addEventListener("click", () => {
    if (!enter_all_inputs()) return;

    let menu = {
        name: mealname.value,
        description: mealdescription.value,
        category: mealcategory.value,
        price: mealprice.value,
        image: mealpicture.value,
    };

    if (editIndex !== null) {
        // تعديل عنصر موجود
        menu_array[editIndex] = menu;
        editIndex = null;
        addbtn.textContent = "Add Dish";
    } else {
        // إضافة جديدة
        menu_array.push(menu);
    }

    localStorage.setItem("local_all_menu", JSON.stringify(menu_array));
    showdata();
    deleteiconfunctio();
    editiconfunctio();
    reset_inputs();
    checkempty();
    updateCount();
});



deletebtn.addEventListener("click", () => {
    Swal.fire({
        title: "Are you sure?",
        text: "This will delete all items.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete all",
        cancelButtonText: "Cancel"

    }).then((result) => {
        if (result.isConfirmed) {
            menu_array = [];
            localStorage.removeItem("local_all_menu");
            showdata();
            deleteiconfunctio();
            checkempty();
            reset_inputs();
            updateCount();
            Swal.fire({
                title: "Done!",
                text: "All items were deleted successfully.",
                icon: "success",
                confirmButtonText: "OK"

            });
        } else {
            Swal.fire({
                title: "Cancelled",
                text: "No items were deleted.",
                icon: "info",
                confirmButtonText: "OK"
            });
        }
    });
});


let deleteiconfunctio = () => {
    let deleteicon = document.querySelectorAll(".delete");
    deleteicon.forEach((icon) => {
        icon.addEventListener("click", (e) => {
            let index = e.target.getAttribute("data_index");

            Swal.fire({
                title: "Are you sure?",
                text: "This item will be deleted.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    menu_array.splice(index, 1);
                    localStorage.setItem("local_all_menu", JSON.stringify(menu_array));
                    showdata();
                    deleteiconfunctio();
                    editiconfunctio();
                    updateCount();
                    checkempty();

                    Swal.fire("Deleted!", "The item has been deleted.", "success");
                }
            });
        });
    });
};

let editIndex = null;

function editiconfunctio() {
    let updateIcons= document.querySelectorAll(".update");

    updateIcons.forEach((icon, index) => {
        icon.addEventListener("click", () => {
            let menu = menu_array[index];
            mealname.value = menu.name;
            mealdescription.value = menu.description;
            mealcategory.value = menu.category;
            mealprice.value = menu.price;
            mealpicture.value = menu.image;

            editIndex = index;
            addbtn.textContent = "Update";
            window.scrollTo({top:0 ,behavoir:"smooth"});
        });
    });
}



checkempty();
updateCount();
showdata();
deleteiconfunctio();
editiconfunctio();