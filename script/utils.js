//Scroller Animation
//--------------------------------------------
const scrollerAnimation = () => {
    const scrollerContent = ["HTML", "CSS", "JavaScript", "TypeScript", "Python", "Java", "C#", "SQL", "React","GitHub", "Git", "Firebase", "MongoDB", "Docker", "Vercel"];
    const scroller = document.querySelector(".scroller");

    for(let x = 0; x < 2; x++){
        const ulElement = document.createElement("ul");
        ulElement.classList.add("inner-scroller");

        scrollerContent.forEach(item => {
            const liElement = document.createElement("li");
            liElement.innerHTML = `${item}&nbsp;`;
            ulElement.appendChild(liElement);
        })

        scroller.appendChild(ulElement);
    }
};
scrollerAnimation();