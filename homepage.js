const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
    ["I'm studying ", {text: "Computer Science", class: "highlight-blue"}, " and ", {text: "Government", class: "highlight-pink"}, " @ Harvard"],
    [{text: "UI/UX Designer,", class: "highlight-blue"}, " Software Developer, ", {text: "Artist", class: "highlight-pink"}],
    ["I absolutely ", {text: "LOVE", class: "highlight-pink"}, " stories and reading. Current read: ", {text: "White Sand", class: "highlight-blue"}],
    ["A retired ", {text: "astronomy", class: "highlight-blue"}, " nerd ✨"],
    ["Up at 3am learning to ", {text: "animate", class: "highlight-pink"}],
    [{text: "Hola,", class: "highlight-pink"}, " Bonjour, 你好, Hei, こんにちは! Also learning ", {text: "languages", class: "highlight-blue"}, " at 3am"]
];

// read history: Mistborn: Secret History

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

const btn = document.getElementById('toggleBtn');
const wrapper = document.getElementById('imageWrapper');

if (btn && wrapper) {
  btn.addEventListener('click', () => {
    wrapper.classList.toggle('expanded');
    btn.textContent = wrapper.classList.contains('expanded')
      ? 'Show less'
      : 'Show more';
  });
}

const projectGrid = document.querySelector('.project-grid');

if (projectGrid) {
    const projectCards = Array.from(projectGrid.querySelectorAll('.project-card'));
    const filterButtons = Array.from(document.querySelectorAll('.project-filters button'));
    const defaultSpans = projectCards.map(card => card.dataset.span);
    let activeFilter = 'all';

    function updateProjectSpans() {
        const cardsPerRow = window.innerWidth > 1100 ? 3 : window.innerWidth > 600 ? 2 : 1;
        projectGrid.classList.toggle('project-grid--all', activeFilter === 'all');

        if (activeFilter === 'all' && cardsPerRow === 3) {
            projectCards.forEach((card, index) => {
                card.dataset.span = defaultSpans[index];
            });
            return;
        }

        const visibleCards = projectCards.filter(card => !card.hidden);
        for (let index = 0; index < visibleCards.length;) {
            const rowSize = Math.min(cardsPerRow, visibleCards.length - index);
            const span = String(12 / rowSize);

            visibleCards.slice(index, index + rowSize).forEach(card => {
                card.dataset.span = span;
            });

            index += rowSize;
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            activeFilter = button.dataset.filter;

            filterButtons.forEach(filterButton => {
                filterButton.setAttribute('aria-pressed', String(filterButton === button));
            });

            projectCards.forEach(card => {
                card.hidden = activeFilter !== 'all' && !card.dataset.category.split(' ').includes(activeFilter);
            });

            updateProjectSpans();
        });
    });

    window.addEventListener('resize', updateProjectSpans, { passive: true });
    updateProjectSpans();
}
