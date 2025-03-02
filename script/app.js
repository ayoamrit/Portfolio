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
 */
const allButton = document.getElementById("all-btn");
const frontendButton = document.getElementById("frontend-btn");
const fullstackButton = document.getElementById("fullstack-btn");

async function fetchDataJson(category){
    try{
        const response = await fetch("./script/data.json");
        const data = await response.json();

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

async function insertData(category){
    const data = await fetchDataJson(category);

    const projectsList = document.querySelector(".projects-list");
    projectsList.innerHTML = "";
    data.forEach(project => {
        const projectContent = document.createElement("div");
        projectContent.className = "project-content"
        const projectImage = document.createElement("div");
        projectImage.className = "project-image";
        const projectDetails = document.createElement("div");
        projectDetails.className = "project-details";

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
    insertData(category);
}

allButton.addEventListener("click", () => categoryChangeHandler("all"));
allButton.dispatchEvent(new Event("click"));  // Initiate the "click" on the allButton to make it default choice
frontendButton.addEventListener("click", () => categoryChangeHandler("frontend"));
fullstackButton.addEventListener("click", () => categoryChangeHandler("fullstack"));