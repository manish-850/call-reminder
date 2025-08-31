let add = document.querySelector("#main #buttons .ri-add-line");
let close = document.querySelector("#close");
let formCon = document.querySelector("#form");
let cardCon = document.querySelector("#cards")
let form = document.querySelector("#form form");
let url = document.querySelector("#form form #url");
let uname = document.querySelector("#form form #uname");
let home = document.querySelector("#form form #home");
let Purpose = document.querySelector("#form form #Purpose");
let inputs = document.querySelectorAll('form input[type="text"]');
let upBtn = document.querySelector(".ri-arrow-up-line");
let downBtn = document.querySelector(".ri-arrow-down-line");

function showForm() {
    add.addEventListener("click", function () {
        form.style.scale = 1;
        formCon.style.scale = 1;
    });

    close.addEventListener("click", function (event) {
        event.preventDefault();
        form.style.scale = 0;
        formCon.style.scale = 0;
        form.reset();
    });
};
showForm();

function showCard() {
    cardCon.innerHTML = "";
    // let allTask = JSON.parse(localStorage.getItem("tasks"));
    let allTask = JSON.parse(localStorage.getItem("tasks")) || [];

    allTask.forEach(function (task) {
        console.log(task.categoryVal)
        // Main card container
        let card = document.createElement("div");
        card.classList.add("card");
        card.style.backgroundColor = `var(--${task.categoryVal})`;


        // Image container
        let imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");

        let img = document.createElement("img");
        img.src = `${task.UrlVal}`;
        img.alt = "";
        imgContainer.appendChild(img);

        // Name heading
        let nameHeading = document.createElement("h1");
        nameHeading.textContent = `${task.NameVal}`;

        // Info1
        let info1 = document.createElement("div");
        info1.classList.add("info1");

        let info1p1 = document.createElement("p");
        info1p1.textContent = "HomeTown";

        let info1p2 = document.createElement("p");
        info1p2.textContent = `${task.HomeVal}`;

        info1.appendChild(info1p1);
        info1.appendChild(info1p2);

        // Info2
        let info2 = document.createElement("div");
        info2.classList.add("info2");

        let info2p1 = document.createElement("p");
        info2p1.textContent = "Purpose";

        let info2p2 = document.createElement("p");
        info2p2.textContent = `${task.PurVal}`;

        info2.appendChild(info2p1);
        info2.appendChild(info2p2);

        // Button container
        let btnContainer = document.createElement("div");
        btnContainer.classList.add("btn");

        // Button 1
        let btn1 = document.createElement("div");
        btn1.classList.add("btn1");

        let icon1 = document.createElement("i");
        icon1.classList.add("ri-phone-line");

        let btn1Text = document.createElement("p");
        btn1Text.textContent = "Call";

        btn1.appendChild(icon1);
        btn1.appendChild(btn1Text);

        // Button 2
        let btn2 = document.createElement("div");
        btn2.classList.add("btn2");

        let icon2 = document.createElement("i");
        icon2.classList.add("ri-chat-1-fill");

        let btn2Text = document.createElement("p");
        btn2Text.textContent = "Message";

        btn2.appendChild(icon2);
        btn2.appendChild(btn2Text);

        // Append buttons to btnContainer
        btnContainer.appendChild(btn1);
        btnContainer.appendChild(btn2);

        // Append all to main card
        card.appendChild(imgContainer);
        card.appendChild(nameHeading);
        card.appendChild(info1);
        card.appendChild(info2);
        card.appendChild(btnContainer);

        // Finally append card to body (or any container)
        cardCon.appendChild(card);

    });
};
showCard();

function formVald() {
    let isValid = true;
    // Sab text inputs check karna
    inputs.forEach(function (input) {
        if (input.value.trim() === "") {
            alert("Please fill out all text fields.");
            isValid = false;
        }
    });

    // URL validation
    var urlInput = inputs[0].value.trim();
    var urlPattern = /^(https?:\/\/[^\s]+)$/;
    if (!urlPattern.test(urlInput)) {
        alert("Please enter a valid Image URL starting with http or https.");
        isValid = false;
    }

    // Radio button validation
    var categorySelected = document.querySelector('input[name="ctg"]:checked');
    if (!categorySelected) {
        alert("Please select a category.");
        isValid = false;
    }
    return isValid;
};
function LocallysaveReminder(obj) {
    if (localStorage.getItem("tasks") === null) {
        let oldTasks = [];
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
    else {
        let oldTasks = localStorage.getItem("tasks");
        oldTasks = JSON.parse(oldTasks);
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
}
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let UrlVal = url.value.trim();
    let NameVal = uname.value.trim();
    let HomeVal = home.value.trim();
    let PurVal = Purpose.value.trim();
    let categoryVal = document.querySelector('input[name="ctg"]:checked').value;
    if (formVald()) {
        let newReminder = { UrlVal, NameVal, HomeVal, PurVal, categoryVal };
        LocallysaveReminder(newReminder);
        console.log(newReminder)
        form.reset();
        form.style.scale = 0;
        formCon.style.scale = 0;
        showCard();
    }
    else {
        form.reset();
    }
});

function updateCard() {
    upBtn.addEventListener("click", function () {
        let lastChild = cardCon.lastElementChild;
        let firstChild = cardCon.firstElementChild;
        if (lastChild) {
            cardCon.insertBefore(lastChild, firstChild);
        }
    });
    
    downBtn.addEventListener("click", function () {
        let lastChild = cardCon.lastElementChild;
        let firstChild = cardCon.firstElementChild;
        if (firstChild) {
            cardCon.appendChild(firstChild, lastChild);
        }
    });
};
updateCard();
