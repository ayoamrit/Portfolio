/***
 * Scroller Animation Function
 * -------------------------------------------------------------------
 */
function addAnimation(){
    const scrollers = document.querySelectorAll(".scroller");
    
    //Loop through each element with the class "scoller"
    scrollers.forEach((scroller) => {

        //Find the inner content of the scoller
        const scrollerInner = scroller.querySelector(".scroller_inner");
        //Get an array of children elements inside the scroller
        const scrollerContent = Array.from(scrollerInner.children);

        //Duplicate each child element and append it to the end
        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);

            //Append the duplicated item to the end of the scroller
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}
addAnimation();  // Function call => addAnimation()


/**
 * Project Category Buttons Function
 * ------------------------------------------------------------------- 
 */
const frontendButton = document.getElementById("frontend-btn");
const fullstackButton = document.getElementById("fullstack-btn");

function categoryChangeHandler(category){
    if(category === "frontend"){
        frontendButton.classList.add("active");
        fullstackButton.classList.remove("active");
    }
    else{
        fullstackButton.classList.add("active");
        frontendButton.classList.remove("active");
    }
}

frontendButton.addEventListener("click", () => categoryChangeHandler("frontend"));
frontendButton.dispatchEvent(new Event("click"));  // Initiate the "click" on the frontendButton to make it default choice
fullstackButton.addEventListener("click", () => categoryChangeHandler("fullstack"));