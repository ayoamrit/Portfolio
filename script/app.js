/***
 * Scroller Animation Function
 * --------------------------------------------------------------------------------------------------------
 */
function addAnimation(){
    const scrollers = document.querySelectorAll(".scroller");
    
    //Loop through each element with the class "scoller"
    scrollers.forEach((scroller) => {
        const scrollerInner = scroller.querySelector(".scroller_inner");
        const scrollerContent = Array.from(scrollerInner.children);

        //Duplicate each child element and append it to the end
        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);

            scrollerInner.appendChild(duplicatedItem);
        });
    });
}
addAnimation();  // Function call => addAnimation()


/**
 * Project Category Buttons Function
 * --------------------------------------------------------------------------------------------------------
 * This script handles fetching data from a JSON file and dynamically updating the UI based on the 
 * selected project category (All, Frontend, Fullstack). 
 * It also manages button active states. 
 */

//Get reference to the category button
const allButton = document.getElementById("all-btn");
const frontendButton = document.getElementById("frontend-btn");
const fullstackButton = document.getElementById("fullstack-btn");

/**
 * Fetches project data from the JSON file and filters it based on the selected category
 * @param {string} category - The selected project category ("all", "frontend", or "fullstack") 
 * @returns {Promise<Array>} - Returns a filtered array of projects.
 */
async function fetchDataJson(category){
    try{

        //Fetch data from the JSON file
        const response = await fetch("./script/data.json");
        const data = await response.json();

        //Return all data if "all" category is selected, otherwise filter by category
        if(category === "all") {
            return data;
        }
        else{
            return data.filter(project => project.category === category);
        }
    }
    catch {
        console.log("Error Fetching Data: ", error);
        return [];  // Return empty array in case of an error
    }
}

/**
 * Dynamically inserts filtered project data into the UI.
 * @param {string} category - The selected project category. 
 */
async function insertData(category){
    const data = await fetchDataJson(category);

    const projectsList = document.querySelector(".projects-list");
    projectsList.innerHTML = "";  //Clear existing projects before inserting new ones

    //Loop through each project and create its corresponding UI elements
    data.forEach(project => {

        //Main project content container
        const projectContent = document.createElement("div");
        projectContent.className = "project-content"

        //Project image container
        const projectImage = document.createElement("div");
        projectImage.className = "project-image";

        //Project details container
        const projectDetails = document.createElement("div");
        projectDetails.className = "project-details";

        //Create and append project image
        const imageElement = document.createElement("img");
        imageElement.src = `${project.image}`;
        imageElement.alt = `${project.title} image`;
        projectImage.appendChild(imageElement);

        const titleElement = document.createElement("h2");
        titleElement.textContent = `${project.title}`;
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = `${project.description}`;

        const ulElement = document.createElement("ul");
        ulElement.className = "tech-stack";
        project.techStack.forEach(item => {
            const liElement = document.createElement("li");
            liElement.textContent = `${item}`;
            ulElement.appendChild(liElement);
        })

        const buttonElement = document.createElement("button");
        buttonElement.textContent = "GitHub";
        buttonElement.setAttribute("data-link", project.link);

        buttonElement.addEventListener("click", function() {
            window.open(buttonElement.getAttribute("data-link"), "_blank");
        });
        projectDetails.appendChild(titleElement);
        projectDetails.appendChild(descriptionElement);
        projectDetails.appendChild(ulElement);
        projectDetails.appendChild(buttonElement);

        projectContent.appendChild(projectImage);
        projectContent.appendChild(projectDetails);
        projectsList.appendChild(projectContent);
    })    
}

/**
 * Handles category selection and updates the active button state
 * @param {string} category - The selected category
 */
function categoryChangeHandler(category){
    if(category === "frontend"){
        frontendButton.classList.add("active");
        fullstackButton.classList.remove("active");
        allButton.classList.remove("active");
    }
    else if(category === "all"){
        allButton.classList.add("active");
        frontendButton.classList.remove("active");
        fullstackButton.classList.remove("active");
    }
    else{
        fullstackButton.classList.add("active");
        frontendButton.classList.remove("active");
        allButton.classList.remove("active");
    }

    //Insert data based on the selected category
    insertData(category);
}

//Attach event listeners to buttons
allButton.addEventListener("click", () => categoryChangeHandler("all"));
allButton.dispatchEvent(new Event("click"));  // Initiate the "click" on the allButton to make it default choice
frontendButton.addEventListener("click", () => categoryChangeHandler("frontend"));
fullstackButton.addEventListener("click", () => categoryChangeHandler("fullstack"));


/**
 * Links Button Function
 * -------------------------------------------------------------------------------------------------------- 
 */
document.getElementById("github-button").addEventListener("click", function(event) {

    //Prevent any default behaviour
    event.preventDefault();
    window.open("https://github.com/ayoamrit", "_blank");
});

document.getElementById("linkedin-button").addEventListener("click", function(event) {
    event.preventDefault();
    window.open("https://www.linkedin.com/in/amrit-dhaliwal-333700320/", "_blank");
});

document.getElementById("get-in-touch-button").addEventListener("click", function(event) {
    event.preventDefault();
    
    //Define the email recipient, subject, and body
    const email = "Amrit.09@icloud.com";
    const subject = encodeURIComponent("Get in Touch - Amrit Dhaliwal");
    const body = encodeURIComponent("Hello, \n\n I would like to get in touch regarding...");
    
    //Construct the mailto link
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
})
