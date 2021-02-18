
const cells = document.getElementsByClassName("cells")
const pieces = document.getElementsByClassName("piece")

var selectedPiece
var selectedCell
var destinationCell
var activeClassvar

var cells_array = []
let initialMove_piece
let firstMove = true

var num_of_turn = 0

// ==================== immediate =======================


for (let each of cells){
    cells_array.push(each)
}


class Pattern{
    constructor(_pattern,_selected_Index,_destination_index){
        this.pattern = _pattern
        this.selected_index = _selected_Index
        this.destination_index = _destination_index
    }
}

function draw(){

}

// ==================== functions =======================
function findPattern(){
    str = check_eachCell()
    draw_patterns = [
        'vcvcycyvy',
        'vcvcycyyv',
        'vcvcycvyy',
    ]
    patterns = [
        // this is the patterns for Ai if first move
        new Pattern('cccvvvyyy',0,3),
        new Pattern('cccvvyyyv',2,4),
        new Pattern('cccyvvvyy',0,4),
        new Pattern('cccvyvyvy',0,3),
        new Pattern('vcccyvyvy',2,5),
        new Pattern('vcvcycyvy',1,0),
        new Pattern('cvvcycyvy',0,1),
        new Pattern('ycvcvcyvy',1,4),
        new Pattern('vcycvcyvy',1,4),
        new Pattern('vcvcycyyv',1,0),
        new Pattern('cvvcycyyv',0,1),
        new Pattern('vcvcycvyy',1,2),
        new Pattern('vvccycvyy',2,1),
        new Pattern('vvccycyvy',2,1),
        new Pattern('vcccvyyyv',1,4),
        new Pattern('vvcccyyvy',3,7),
        new Pattern('vycvcvycy',2,5),
        new Pattern('vyvyccvcy',7,6),
        new Pattern('vvyycccvy',5,1),
        new Pattern('vcyycvcyv',1,5),
        new Pattern('vcyvcvcyy',1,5),
        new Pattern('vvyycccvy',5,1),
        new Pattern('vcccvyyvy',1,4),
        new Pattern('vvcccyyyv',2,1),
        new Pattern('vcvccyyyv',1,2),
        new Pattern('vycvcvycy',7,3),
        new Pattern('vcccyvyyv',2,5),
        new Pattern('vcccyvvyy',2,5),
        new Pattern('cvvcycvyy',0,1),

        // this is the patterns for Ai if not first move
        new Pattern('yccvcvvyy',1,3),
        new Pattern('vccycvyvy',2,5),
        new Pattern('vcvyccvyy',1,0),
        new Pattern('vcvyccyyv',5,8),
        new Pattern('cvvyccyvy',5,7),
        new Pattern('cyvvcvycy',7,5),
        new Pattern('cyvyccvvy',5,7),
        new Pattern('cyvvcvycy',7,5),

        new Pattern('vcvyccyyv',5,8),
        new Pattern('ycvvcvyyc',1,3),
        new Pattern('yvvccyyvc',3,1),
        new Pattern('ycvvcyvyc',1,3),

        new Pattern('vccycyvvy',1,0),
        new Pattern('cvcycyvyv',2,1),
        new Pattern('ccvycyvyv',1,2),
        new Pattern('ccvycyvvy',1,2),
        new Pattern('ccvycyyvv',1,2),

        new Pattern('cycycvvvy',2,5),
        new Pattern('cycvcyvvy',0,3),
        new Pattern('cycycvyvv',2,5),
        new Pattern('cycvcyyvv',0,3),
        new Pattern('yvcccyyvv',3,7),
        new Pattern('yycvcvycv',7,3),
        new Pattern('vycvcyycv',7,3),
    ]

    for(const each of patterns){
        if (each.pattern == str){
            selectedCell = cells[each.selected_index]
            selectedPiece = selectedCell.firstChild
            destinationCell = cells[each.destination_index]
            return
        }
    }
}

function check_eachCell(){ // -> string
    // cmobination string
    // 1 = computer
    // 0 = vacant
    // 2 = you/user
    combination_string = ''
    for(const each of cells){
        toAdd = 'y'
        if(each.firstChild.classList[1]=="comp"){
            toAdd = 'c'
        }else if(each.firstChild.classList[1]=="vacant"){
            toAdd = 'v'
        }
        combination_string += toAdd
    }
    return combination_string
}


function scan(indeces_array){
    for(let x of indeces_array){
        if(cells[x].firstElementChild.classList[1]=="comp"){
            selectedCell = cells[x]
            selectedPiece = selectedCell.firstElementChild
            return true
        }
    }return false
}


function there_is_aPair(a,b,c) { //returns boolean
    let cl = [];
    let find_a;
    let find_b;
    let find_c;
 
    for (let each of cells){
        cl.push(each.firstChild.classList[1])
    }

    if(a==3){
        find_a = [0,1,7,6]
        find_b = [0,1,2,6,7,8]
        find_c = [1,2,7,8]
    }else if(a==6&&c==2){
        find_a = [3,7]
        find_b = [3,0,1,5,8,7]
        find_c = [1,5]
    }else if(a==0&&c==8){
        find_a = [1,3]
        find_b = [1,2,5,3,6,7]
        find_c = [5,7]
    }else if(a==0&&c==6){
        find_a = [1,4]
        find_b = [1,4,7]
        find_c = [4,7]
    }else if(a==1){
        find_a = [0,3,2,5]
        find_b = [0,3,6,2,5,8]
        find_c = [3,5,6,8]
    }else if(a==2){
        find_a = [1,4]
        find_b = [1,4,7]
        find_c = [4,7]
    }else if(a==6&&c==8){
        find_a = [3,4]
        find_b = [3,4,5]
        find_c = [4,5]
    }

    if(cl[a]=="vacant" && cl[b]=="comp" && cl[c]=="comp"){
        if(scan(find_a)){
            destinationCell = cells[a]
            return true
        }
    }else if(cl[a]=="comp" && cl[b]=="vacant" && cl[c]=="comp"){
        if(scan(find_b)){
            destinationCell = cells[b]
            return true
        }
    }else if(cl[a]=="comp" && cl[b]=="comp" && cl[c]=="vacant"){
        if(scan(find_c)){
            destinationCell = cells[c]
            return true
        }
    }
    return false
}

function AI_move(){

    activeClass = "comp"
    disableAll()

    enable("you")

    findPattern()

    if(there_is_aPair(3,4,5)){}
    else if (there_is_aPair(0,4,8)){}
    else if (there_is_aPair(6,4,2)){}
    else if (there_is_aPair(0,3,6)){}
    else if (there_is_aPair(1,4,7)){}
    else if (there_is_aPair(2,5,8)){}
    else if (there_is_aPair(6,7,8)){}

    move()
    num_of_turn++
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

if(1 == 1){
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