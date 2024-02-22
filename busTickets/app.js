const right = document.querySelector('.right'); 
const left = document.querySelector('.left'); 

// ASCII code for 'A' and 'J'
const charA = 'A'.charCodeAt(0);
const charJ = 'E'.charCodeAt(0);
// Print Left Seats
for (let i = charA; i <= charJ; i++) {
    const letter1 = String.fromCharCode(i);
    left.innerHTML += `<div><span>${letter1}1</span><span>${letter1}2</span></div>`;
}
// Print Right Seats
for (let i = charA; i <= charJ; i++) {
    const letter1 = String.fromCharCode(i);
    right.innerHTML += `<div><span>${letter1}3</span><span>${letter1}4</span></div>`;
}
const sets = document.querySelectorAll('.seats span');



// Functionality --------------
let count = 0;
let discount;
let discountArray = [];


function totalPrice(x){
    document.getElementById("totalPrice").innerHTML = x;
}
function setCount(x){
    document.getElementById("setCount").innerHTML = x;
}
function seatLeft(x){
    document.getElementById("seatLeft").innerHTML =40-x;
}
function seatList(x, val){
    let ele = document.getElementById("seatList");
    if(x==1) ele.innerHTML =`<div><span>`+ val +`</span><span>V.I.P</span><span>500</span></div>`;
    else ele.innerHTML +=`<div><span>`+ val +`</span><span>V.I.P</span><span>500</span></div>`;
}
// Grand total -------
function grandTotal(discountArray, x=0){
    if(x==1){
         document.getElementById("grandTotal").innerHTML= count*500;
         return 1;
    }

    let sum =0;
    for(let i=0;i<discountArray.length;i++){
        if(discountArray[i]=='A') sum += 500*0.99;
        else if(discountArray[i]=='B') sum += 500*0.98;
        else if(discountArray[i]=='C') sum += 500*0.97;
        else if(discountArray[i]=='D') sum += 500*0.96;
        else if(discountArray[i]=='E') sum += 500*0.95;
    }

    // document.getElementById("grandTotal").innerHTML= total*x;
    document.getElementById("grandTotal").innerHTML= sum;
}



sets.forEach(function (ele){
    ele.addEventListener('click',function(){

        if(this.style.backgroundColor != "rgb(255, 165, 0)" && count<4){
            count++;

            this.style.backgroundColor = "rgb(255, 165, 0)";
            this.style.color = "white";
            
            setCount(count);
            let total = count*500;
            totalPrice(total);
            seatLeft(count);
            seatList(count, this.innerText);

            // Collect The site name char
            discountArray.push(this.innerText[0]);

            // Call discount button
            let myBtn = document.getElementById("btn");
            // Discount Button ----------
            if(myBtn.classList.contains("poor")){
                grandTotal(discountArray);
            }else{
                grandTotal(discountArray, 1);
            }
            myBtn.disabled = false;
            myBtn.style.cursor = "pointer";

        }else if(this.style.backgroundColor == "rgb(255, 165, 0)" && count<5){
            this.style.backgroundColor = "#F7F8F8";
            this.style.color = "black";

            count--;
             
            setCount(count);
            let total = count*500;
            totalPrice(total);
            seatLeft(count);

            let ele = document.getElementById("seatList");
            let elements = ele.getElementsByTagName("div");
            let myBtn = document.getElementById("btn");

            // Find which seat was click and removed the seat name list
            for(let i=0;i<elements.length;i++){
                let span = elements[i].getElementsByTagName("span")[0].innerText;
                if(span===this.innerText){
                    ele.removeChild(elements[i]);
                    discountArray.splice(i,1);
                    grandTotal(discountArray);
                    if(elements.length==0){
                        ele.innerHTML = `<div>Please Select a Seat</div>`;
                        myBtn.disabled = true;
                        myBtn.style.cursor = "not-allowed";
                    }
                }
            }

            if(myBtn.classList.contains("poor")){
                grandTotal(discountArray);
            }else{
                grandTotal(discountArray, 1);
            }
        }else{
            alert("Sorry Brother You Can't Select more than 4.")
        }
    })
});



// Poor / Rich button triger --------------
document.getElementById("btn").addEventListener('click',function(){
    this.classList.toggle('poor');

    if(this.classList.contains('poor')){
        this.innerText = "Sorry I am Rich Kid ;)";
        grandTotal(discountArray);
    }else{
        this.innerText = "Please Give Discueent, I am Poor Kid :(";
        grandTotal(discountArray, 1);
    }
})



