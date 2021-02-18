
const cells = document.getElementsByClassName("cells")
const pieces = document.getElementsByClassName("piece")

var selectedPiece
var selectedCell
var destinationCell
var activeClassvar

var cells_array = []

// ==================== immediate =======================


for (let each of cells){
    cells_array.push(each)
}

// ==================== functions =======================


function AI_move(){
    let ai_piece = document.getElementsByClassName("comp")
    let vacants = document.getElementsByClassName("vacant")
    let index1 = Math.floor(Math.random()*3)

    activeClass = "comp"
    selectedPiece = ai_piece[index1]
    selectedCell = selectedPiece.parentElement
    disableAll()

    let index2 = Math.floor(Math.random()*3)
    destinationCell = vacants[index2].parentElement
    enable("you")
    
    if(moveIsValid()){
        move()
        return
    }
    AI_move()
}

function blink(){
    const win = document.getElementsByClassName(activeClass)
    for(let each of win){
        each.classList.add("win")
    }
}

function announceWinner(){
    
    let winner
    if (activeClass=="comp") winner = "AI -Wins"
    else winner = "You Win"
    document.getElementById("playerTurn").innerText = "Win"
    blink()
    setTimeout(e=>{
        document.getElementById("winner").innerText = winner
        document.getElementsByClassName("dimmer")[0].style.top = "0"
    },650)
}

function checkStraights(){
    let c = [] 
    for (let each of cells) c.push(each.firstElementChild.classList[1])

    // Horizontals
    if (c[0]!="vacant" && c[0]!="comp" && c[0]==c[1] && c[1]==c[2]) announceWinner()
    else if(c[3]!="vacant" && c[3]==c[4] && c[4]==c[5]) announceWinner()
    else if(c[6]!="vacant" && c[6]!="you" && c[6]==c[7] && c[7]==c[8]) announceWinner()
    // verticals
    else if(c[0]!="vacant" && c[0]==c[3] && c[3]==c[6]) announceWinner()
    else if(c[1]!="vacant" && c[1]==c[4] && c[4]==c[7]) announceWinner()
    else if(c[2]!="vacant" && c[2]==c[5] && c[5]==c[8]) announceWinner()
    // diagonalsannounceWinner()
    else if(c[0]!="vacant" && c[0]==c[4] && c[4]==c[8]) announceWinner()
    else if(c[2]!="vacant" && c[2]==c[4] && c[4]==c[6]) announceWinner()
    else {
        if (activeClass=="you") AI_move()
    }
}

function moveIsValid(){
    let valid = false
    const indexOfSelectedCell = cells_array.indexOf(selectedCell)
    const di = cells_array.indexOf(destinationCell)

    switch(indexOfSelectedCell){
        case 0:
            if (di==1 || di==3 || di==4) return true
            break
        case 2:
            if (di==1 || di==5 || di==4) return true
            break
        case 6:
            if (di==3 || di==7 || di==4) return true
            break
        case 8:
            if (di==7 || di==5 || di==4) return true
            break
        case 1:
            if (di==8 || di==7 || di==6) return false
            else return true
            break
        case 3:
            if (di==2 || di==5 || di==8) return false
            else return true
            break
        case 5:
            if (di==0 || di==3 || di==6) return false
            else return true
            break
        case 7:
            if (di==0 || di==1 || di==2) return false
            else return true
            break
        default:
            return true
    }
}

function move(){
    // console.log(selectedCell);
    // console.log(destinationCell);
    let starting_position = coordinatesOf(selectedPiece)
    let destination_position = coordinatesOf(destinationCell.firstElementChild)
    let x = 0
    let y = 1

    x = destination_position[x] - starting_position[x]
    y = destination_position[y] - starting_position[y]

    // selectedPiece.style.display = "none" // show mo to after mag translate

    const div = document.createElement("div")
    div.style.transition = ".2s ease-in-out"
    div.classList.add("piece",selectedPiece.classList[1])
    selectedCell.appendChild(div)
    div.style.position = "absolute"

    setTimeout(e=>{
        div.style.transform = "translate(" + x + "px," + y + "px)"

        selectedPiece.classList.remove(activeClass)
        selectedPiece.classList.add("vacant")

        destinationCell.firstElementChild.classList.remove("vacant")
        destinationCell.firstElementChild.classList.remove("comp")
        destinationCell.firstElementChild.classList.remove("you")
        destinationCell.firstElementChild.classList.add(activeClass)

        setTimeout(e=>{
            div.remove()
            updateTurn()
            checkStraights()
            selectedPiece.classList.remove("clicked")
            selectedCell.firstChild.classList.remove("clicked")
        },300)

    },100)
}

function updateTurn(){
    let turn
    if (activeClass=="comp") turn = "your turn"
    else turn = "Computer"
    document.getElementById("playerTurn").innerText = turn
}

function select(obj){
    if (obj.classList[1]!="vacant"){
        activeClass = obj.classList[1]
        selectedPiece = obj
        selectedCell = selectedPiece.parentElement
        selectedPiece.classList.add("clicked")
        disableAll()
        enable("vacant")
    }else{
        destinationCell = obj.parentElement
        selectedPiece.classList.remove("clicked")
        disableAll()
        if (activeClass=="comp") enable("you")
        else enable("comp")

        if(moveIsValid()){
            move()
        }
        else{
            alert("Move is inValid")
            selectedPiece.classList.remove("clicked")
            disableAll()
            enable(activeClass)
        }
    }
}

function coordinatesOf(obj){
    let left = Top = counter = 0
    if (obj.offsetParent){
        while(counter!=1){
            left += obj.offsetLeft
            Top += obj.offsetTop
            obj = obj.offsetParent
            counter++
        }
        return [left,Top]
    }
}

function disableAll(){
    disable("vacant")
    disable("comp")
    disable("you")
}

function disable(classname){
    const classs = document.getElementsByClassName(classname)
    for (const each of classs){
        each.style.pointerEvents = "none"
    }
}

function enable(classname){
    const classs = document.getElementsByClassName(classname)
    for (const each of classs){
        each.style.pointerEvents = "visible"
    }
}

// ==================== event Listeners =======================
for (let each of pieces){
    each.addEventListener('click',e=>{
        select(each)
    })
}

// ==================== calls =======================
disable("vacant")
const random = Math.floor(Math.random() * 2)

if(random%2 == 0){
    document.getElementById("playerTurn").innerText = "Computer"
    disableAll()
    enable("comp")
    setTimeout(e=>{
        AI_move()
    },2000)
}else{
    document.getElementById("playerTurn").innerText = "Your turn"
    disableAll()
    enable("you")
}