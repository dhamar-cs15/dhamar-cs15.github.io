const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
    ["I'm studying ", {text: "Computer Science", class: "highlight-blue"}, " and ", {text: "Government", class: "highlight-pink"}, " @ Harvard"],
    [{text: "UI/UX Designer,", class: "highlight-blue"}, " Software Developer, ", {text: "Artist", class: "highlight-pink"}],
    ["I absolutely ", {text: "LOVE", class: "highlight-pink"}, " stories and reading"],
    ["A retired ", {text: "astronomy", class: "highlight-blue"}, " nerd ✨"],
    ["Up at 3am learning to ", {text: "animate", class: "highlight-pink"}],
    [{text: "Hola,", class: "highlight-pink"}, " Bonjour, 你好, Hei, Ciao! Also learning ", {text: "languages", class: "highlight-blue"}, " at 3am"]
];

const typingDelay = 30;
const erasingDelay = 35;
const newTextDelay = 1500; 
let textIndex = 0;
let charIndex = 0;
let partIndex = 0;

// type out new phrase; once new text delay is over, erase
function type() {
    const line = textArray[textIndex];
    const part = line[partIndex];

    const isStyled = typeof part === "object";
    const currentText = isStyled ? part.text : part;
    const targetElt = isStyled ? ensureSpan(part.class) : typedTextSpan;

    if (charIndex < currentText.length) {
        targetElt.innerHTML += currentText.charAt(charIndex);
        // typedTextSpan.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        partIndex++;
        charIndex = 0;
        if (partIndex < line.length) {
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }
}

// fully erase current line, move onto typing the next
// function erase() {
//     if (charIndex > 0) {
//         typedTextSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
//         charIndex--;
//         setTimeout(erase, erasingDelay);
//     } else {
//         textIndex++;
//         if (textIndex >= textArray.length) textIndex = 0;
//         setTimeout(type, typingDelay);
//     }
// }

function erase() {
    if (typedTextSpan.lastChild) {
        const last = typedTextSpan.lastChild;
        if (last.textContent.length > 0) {
            last.textContent = last.textContent.slice(0, -1);
            setTimeout(erase, erasingDelay);
        } else {
            typedTextSpan.removeChild(last);
            setTimeout(erase, erasingDelay)
        }
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        partIndex = 0;
        charIndex = 0;
        setTimeout(type, typingDelay);
    }
}

function ensureSpan(className) {
    const existing = typedTextSpan.querySelector(`.${className}:not(.done)`);
    if (existing) return existing;

    const span = document.createElement("span");
    span.className = className;
    typedTextSpan.appendChild(span);
    return span;
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
});

// About Me Tablinks
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
}



