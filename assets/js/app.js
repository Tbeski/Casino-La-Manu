/*
|PARKING DES CURSEURS
|Tbesh :
________________
|Teddy :        \
________________|
*/

//VARIABLES GLOBALES
let deck = [];
let playerCards = [];
let dealerCards = [];
let valuePlayer = 0;
let valueDealer = 0;

let cash = 200;
let bet = 0;
let lst_cards = ["As coeur", "Roi coeur", "Dame coeur", "Valet coeur", "2 coeur", "3 coeur", "4 coeur", "5 coeur", "6 coeur", "7 coeur", "8 coeur", "9 coeur", "10 coeur",
                "As carreau", "Roi carreau", "Dame carreau", "Valet carreau", "2 carreau", "3 carreau", "4 carreau", "5 carreau", "6 carreau", "7 carreau", "8 carreau", "9 carreau", "10 carreau",
                "As trefle", "Roi trefle", "Dame trefle", "Valet trefle", "2 trefle", "3 trefle", "4 trefle", "5 trefle", "6 trefle", "7 trefle", "8 trefle", "9 trefle", "10 trefle",
                "As pique", "Roi pique", "Dame pique", "Valet pique", "2 pique", "3 pique", "4 pique", "5 pique", "6 pique", "7 pique", "8 pique", "9 pique", "10 pique"];

const soldeCourant = document.querySelectorAll(".soldeCourant");
const inputMise = document.querySelector(".mise input");
const btnMiser = document.querySelector(".miser");
const miseActuelle = document.querySelector(".mise_actuelle");
const btnpiocher = document.querySelector(".piocher");
const cartes = document.querySelectorAll(".carte")


function initCards(){
    let deck = [...lst_cards];
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random()* (i+1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function draw(deck){
    return deck.shift();
}

function getValueCards(cards){
    let value = 0;
    let ace = 0;
    for (let card of cards) { //remplacé for (card in cards) par for (let card of cards)
        let v = card.split(" ")[0].trim(); //remplacé cards.split par card.split
        if (!isNaN(parseInt(v))) { //isdigit c en python, remplacé par isNan
            value += parseInt(v); //parseInt au lieu de int
        }else if (["Valet", "Dame", "Roi"].includes(v)){ //tab.includes(valeur) en JS
            value += 10;
        }else 
            ace += 1;
    }

    value += ace * 11;
    while(value > 21 && ace > 0){
        value -= 10;
        ace -= 1;
    }
    return value
}

function displayCards(name, cards, value){
    console.log(`${name} : ${cards.join(", ")} (${value})`);
    //TEMPORAIRE
}

// function to_bet(cash){
//     // let bet = parseInt(prompt("Entrez la mise souhaitée (Cash $" + cash + ") :")) //remplacer prompt par input
//     while(isNaN(bet) || bet > cash || bet <20){
//         // bet = prompt("Entrez une mise valide (cash $" + cash + ") :")//remplacer prompt par le bon input
//     }
//     return bet; //cash est déjà géré à l'appel de la fonction
// }

function cardToImage(card){
    let [value, symbol] = card.split(" ");

    if (card == "dos") return `assets/images/Cartes/Dos de la carte.svg`;
    return `assets/images/Cartes/${value} ${symbol}.svg`
}       

function updateCards(joueur, carte, position){
    let containerId = joueur == "player"?"#cartes_joueurs":"#cartes_croupier";
    let container = document.querySelector(containerId);

    let img = container.querySelector(`img[data-carte="${position}"]`);
    if (!img) return;

    img.src = cardToImage(carte);
}
for (e of soldeCourant){
    e.textContent = cash;
}

btnMiser.addEventListener("click", function(){
    let valeurMise = parseInt(inputMise.value);
    if(isNaN(valeurMise)){
        alert("Entrez une mise valide")
        return;
    }
    if (valeurMise < 20){
        alert("Mise minimale : 20")
        return;
    }
    if (valeurMise > cash){
        alert("Solde insuffisant")
        return;
    }
    bet = valeurMise;
    cash -= bet;
    for (e of soldeCourant){
    e.textContent = cash;
    }
    miseActuelle.textContent = valeurMise;
    inputMise.value = "";
    deck = initCards()
    playerCards = [];
    dealerCards = [];
    playerCards.push(draw(deck));
    updateCards("player", playerCards[0], 1);
    dealerCards.push(draw(deck));
    updateCards("dealer", dealerCards[0], 1);
    playerCards.push(draw(deck));
    updateCards("player", playerCards[1], 2);
    dealerCards.push(draw(deck));
    updateCards("dealer", "dos", 2);
    valuePlayer = getValueCards(playerCards);
    valueDealer = getValueCards(dealerCards);
    displayCards("Joueur", playerCards, valuePlayer);
    displayCards("Croupier", dealerCards, valueDealer);
});

btnpiocher.addEventListener("click", function(){
    playerCards.push(draw(deck));
    updateCards("player", playerCards[playerCards.length-1], playerCards.length);
    valuePlayer = getValueCards(playerCards);
    displayCards("Joueur", playerCards, valuePlayer);
});

// while (true){
//     if(cash < 20){
//         console.log("Vous n'avez plus assez de cash pour miser. Fin de la partie.")
//         break
//     }

//     let deck = initCards()
//     let bet = to_bet(cash)
//     cash -= bet
//     let playerCards = [] //comprendre erreur
//     let dealerCards = []
//     let perdu = false

//     playerCards.push(draw(deck))
//     dealerCards.push(draw(deck))
//     playerCards.push(draw(deck))

//     let card = draw(deck)
//     dealerCards.push(card)
    
//     let valuePlayer = getValueCards(playerCards)
//     let valueDealer = getValueCards(dealerCards)

//     displayCards("Croupier " , dealerCards, valueDealer)
//     displayCards("Joueur " , playerCards, valuePlayer)

//     while (true){
//         let pioche = prompt("Voulez-vous piocher ? (o/n)") //remplacer prompt par input
//         while (!(["o", "oui", "n", "non"].includes(pioche.toLowerCase()))){
//             pioche = prompt("voulez vous piocher ? (o/n)")
//         }if (pioche.toLowerCase() == "n"){
//             break;
//         }
//         let card = draw(deck)
//         playerCards.push(card)
//         valuePlayer = getValueCards(playerCards)
//         console.log()//print
//         displayCards("Croupier " , dealerCards, valueDealer)
//         displayCards("Joueur " , playerCards, valuePlayer)
//         console.log()
//         if (valuePlayer > 21){
//             perdu = true
//             break
//         }
//     }

//     if (!perdu){
//         while (valueDealer <= valuePlayer && valueDealer < 21){
//             let card = draw(deck)
//             dealerCards.push(card)
//             valueDealer = getValueCards(dealerCards)
//         }
//         console.log()
//         displayCards("Croupier" , dealerCards, valueDealer)
//         displayCards("Joueur" , playerCards, valuePlayer)
//         console.log()
//     }
//     if (valuePlayer > 21){
//         console.log("Vous avez perdu !")
//     }else if (valueDealer > 21){
//         console.log("Vous avez gagné $" + bet * 2 + "!")
//         cash += bet * 2
//     }else if (valueDealer == valuePlayer){
//         console.log("Egalité !")
//         cash += bet
//     }else if (valueDealer > valuePlayer){
//         console.log("Vous avez perdu !")
//     }else{
//         console.log("Vous avez gagné" + bet*2 +" !")
//         cash += bet * 2
//     }

//     // let quitGame = prompt("Voulez vous continuer la partie ? (o/n)")
//     while (!(["o", "n", "oui", "non"].includes(quitGame.toLowerCase()))){
//         // quitGame = prompt("Voulez vous continuer la partie ? (o/n)")
//     }
//     if (quitGame.toLowerCase() == "n"){
//         break
//     }
// }


