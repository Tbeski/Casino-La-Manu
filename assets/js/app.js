// Variables Globales
let cash = 200;
let bet = 0;
let lst_cards = ["As ♥", "Roi ♥", "Dame ♥", "Valet ♥", "2 ♥", "3 ♥", "4 ♥", "5 ♥", "6 ♥", "7 ♥", "8 ♥", "9 ♥", "10 ♥",
                "As ♦", "Roi ♦", "Dame ♦", "Valet ♦", "2 ♦", "3 ♦", "4 ♦", "5 ♦", "6 ♦", "7 ♦", "8 ♦", "9 ♦", "10 ♦",
                "As ♣", "Roi ♣", "Dame ♣", "Valet ♣", "2 ♣", "3 ♣", "4 ♣", "5 ♣", "6 ♣", "7 ♣", "8 ♣", "9 ♣", "10 ♣",
                "As ♠", "Roi ♠", "Dame ♠", "Valet ♠", "2 ♠", "3 ♠", "4 ♠", "5 ♠", "6 ♠", "7 ♠", "8 ♠", "9 ♠", "10 ♠"];

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
    let value = 0
    let ace = 0
    for (let card of cards) { //remplacé for (card in cards) par for (let card of cards)
        let v = card.split()[0] //remplacé cards.split par card.split
        if (!isNaN(parseInt(v))) { //isdigit c en python, remplacé par isNan
            value += parseInt(v) //parseInt au lieu de int
        }else if (["Valet", "Dame", "Roi"].includes(v)){ //tab.includes(valeur) en JS
            value += 10
        }else 
            ace += 1
    }

    value += ace * 11
    while(value > 21 && ace > 0){
        value -= 10
        ace -= 1
    }
    return value
}

function displayCards(name, cards, value){
    console.log(`${name} : ${cards.join(", ")} (${value})`);
    //TEMPORAIRE
}

function to_bet(cash){
    let bet = parseInt(prompt("Entrez la mise souhaitée (Cash $" + cash + ") :")) //remplacer prompt par input
    while(isNaN(bet) || bet > cash || bet <20){
        bet = prompt("Entrez une mise valide (cash $" + cash + ") :")//remplacer prompt par le bon input
    }
    return bet //cash est déjà géré à l'appel de la fonction
}


while (true){
    if(cash < 20){
        console.log("Vous n'avez plus assez de cash pour miser. Fin de la partie.")
        break
    }

    let deck = initCards()
    cash, bet = to_bet(cash)
    cash -= bet
    let playerCards = [] //comprendre erreur : les variables ne commencent pas par un chiffre
    let dealerCards = []
    let perdu = false

    card, deck = draw(deck)
    playerCards.append(card)
    card, deck = draw(deck)
    playerCards.append(card)

    card, deck = draw(deck)
    dealerCards.append(card)
    
    let valuePlayer = getValueCards(playerCards)
    let valueDealer = getValueCards(dealerCards)

    displayCads("Croupier " , dealerCards, valueDealer)
    displayCads("Joueur " , playerCards, valuePlayer)

    while (true){
        //continuer l.75
    }
}

//j ai pas compris les erreur ligne 65 66 mais je verais de corriger la prochaine fois