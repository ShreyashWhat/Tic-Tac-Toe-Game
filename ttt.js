let boxes = document.querySelectorAll(".box")
let reset = document.querySelector("#reset-btn")
let res = document.querySelector(".result")
let turnO = true 
let c = 0
const spotlight = document.querySelector('.spotlight');

document.addEventListener('mousemove', (e) => {
    const { clientX: mouseX, clientY: mouseY } = e;

    spotlight.style.left = `${mouseX}px`;
    spotlight.style.top = `${mouseY}px`;
});

window.addEventListener("load", () => {
    // Keep the loader visible for at least 2 seconds, adjust the time as needed
    setTimeout(() => {
        document.querySelector(".loader").classList.add("loader--hidden");
    }, 2000); // 2000ms = 2 seconds
});


console.log(boxes)
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        c += 1
        if (turnO){
            box.innerText = "O"
            turnO = false
        } else {
            box.innerText = "X"
            turnO = true
        }
        box.disabled = true 
        checkWinner()
        if (c == 9 && res.innerText == ""){
            res.innerText = "Well well well, the match has been drawn."
        }
    }) 
})

const checkWinner = () => {
    for (let i in winPattern) {
        let pos1val = boxes[winPattern[i][0]].innerText;
        let pos2val = boxes[winPattern[i][1]].innerText;
        let pos3val = boxes[winPattern[i][2]].innerText;
        
        if (pos1val !== "" && 
            pos1val === pos2val && 
            pos2val === pos3val
        ) {
            res.innerText = (`Congratulations ${pos1val}! You are the winner!`);
            disableAll()
        }
    }
};

const disableAll = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}

const enableAll = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
        res.innerText = ""
    }
}

reset.addEventListener("click", () => {
    enableAll()
    c=0
})