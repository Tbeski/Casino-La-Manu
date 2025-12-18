//VARIABLES GLOBALES
let deck = [];
let playerCards = [];
let dealerCards = [];
let valuePlayer = 0;
let valueDealer = 0;

let cash = 200;
let bet = 0;
let lst_cards = ["As coeur", "roi coeur", "dame coeur", "valet coeur", "2 coeur", "3 coeur", "4 coeur", "5 coeur", "6 coeur", "7 coeur", "8 coeur", "9 coeur", "10 coeur",
                "As carreau", "roi carreau", "dame carreau", "valet carreau", "2 carreau", "3 carreau", "4 carreau", "5 carreau", "6 carreau", "7 carreau", "8 carreau", "9 carreau", "10 carreau",
                "As trefle", "roi trefle", "dame trefle", "valet trefle", "2 trefle", "3 trefle", "4 trefle", "5 trefle", "6 trefle", "7 trefle", "8 trefle", "9 trefle", "10 trefle",
                "As pique", "roi pique", "dame pique", "valet pique", "2 pique", "3 pique", "4 pique", "5 pique", "6 pique", "7 pique", "8 pique", "9 pique", "10 pique"];

const soldeCourant = document.querySelectorAll(".soldeCourant");
const inputMise = document.querySelector(".mise input");
const btnMiser = document.querySelector(".miser");
const miseActuelle = document.querySelector(".mise_actuelle");
const btnPiocher = document.querySelector(".piocher");
const btnRester = document.querySelector(".rester")
const cartes = document.querySelectorAll(".carte")
const boutons = document.querySelector(".boutons")
const btnRejouer = document.querySelector(".rejouer")
const totalPlayer = document.querySelector(".player_game .totalcartes span");
const totalDealer = document.querySelector(".dealer_game .totalcartes span");


console.log(cartes);
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
        }else if (["valet", "dame", "roi"].includes(v)){ //tab.includes(valeur) en JS
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

function updateTotal(){
    totalDealer.textContent = valueDealer
    totalPlayer.textContent = valuePlayer
}

function endRound() {

    if (valueDealer > 21) {
        cash += bet * 2;
        alert("Le croupier bust ! Vous gagnez");
        miseActuelle.textContent = "0";
    }
    else if (valueDealer === valuePlayer) {
        cash += bet;
        alert("Égalité");
        miseActuelle.textContent = "0";
    }
    else {
        alert("Vous perdez");
       miseActuelle.textContent = "0";
    }

    for (let e of soldeCourant) {
        e.textContent = cash;
    }
    btnRejouer.disabled = false;
}

function dealerPlay() {

    if (valueDealer >= valuePlayer || valueDealer > 21) {
        endRound();
        return;
    }

    dealerCards.push(draw(deck));
    updateCards(
        "dealer",
        dealerCards[dealerCards.length - 1],
        dealerCards.length
    );

    valueDealer = getValueCards(dealerCards);
    updateTotal();

    setTimeout(dealerPlay, 800);
}

function resetRound() {
    deck = [];
    playerCards = [];
    dealerCards = [];
    valuePlayer = 0;
    valueDealer = 0;
    bet = 0;

    miseActuelle.textContent = "0";

    document.querySelectorAll("#cartes_joueurs img, #cartes_croupier img")
        .forEach(img => img.src = "assets/images/Cartes/Rectangle 20.svg");

    btnMiser.disabled = false;
    btnPiocher.disabled = true;
    btnRester.disabled = true;
    btnRejouer.disabled = true;

    inputMise.style.visibility = "visible";
    btnMiser.style.visibility = "visible";

    totalPlayer.textContent = "?";
    totalDealer.textContent = "0";

}


btnMiser.disabled = false;
btnPiocher.disabled = false;
btnRejouer.disabled = true;

soldeCourant.forEach(e => {
    e.textContent = cash;
});

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

    [inputMise, btnMiser].forEach(e => {
        e.style.visibility = "hidden"
    });
    btnRester.disabled = false;
    btnPiocher.disabled = false;
    bet = valeurMise;
    cash -= bet;
    soldeCourant.forEach(e => {
    e.textContent = cash;
    });
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
    totalPlayer.textContent = valuePlayer
    totalDealer.textContent = "?"
});

btnPiocher.addEventListener("click", function(){
    playerCards.push(draw(deck));
    updateCards("player", playerCards[playerCards.length-1], playerCards.length);
    valuePlayer = getValueCards(playerCards);
    totalPlayer.textContent = valuePlayer
    if(valuePlayer>21){
        btnPiocher.disabled = true;
        btnRester.disabled = true;
        updateCards("dealer", dealerCards[1], 2);
        updateTotal();
        endRound();
    }
});

btnRester.addEventListener("click", function () {
    btnPiocher.disabled = true;
    btnRester.disabled = true;
    updateCards("dealer", dealerCards[1],2)
    valueDealer = getValueCards(dealerCards)
    updateTotal();
    dealerPlay();
});

btnRejouer.addEventListener("click", function () {
    resetRound();
    totalDealer.textContent = "?"
    totalPlayer.textContent = "0"
});
