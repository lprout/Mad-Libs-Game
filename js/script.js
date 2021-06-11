const $inputField = document.querySelector("[name=word");
const $form = document.querySelector(".madlibs-form");
const $submitButton = document.querySelector(".submit-word");
const $clearButton = document.querySelector(".reset-game");
const $storyContainer = document.querySelector(".story-container");
var data = "";

const $nounContainers = [];
const $adjContainers = [];
$nounContainers[0] = document.querySelector(".noun-1");
$nounContainers[1] = document.querySelector(".noun-2");
$nounContainers[2] = document.querySelector(".noun-3");
$adjContainers[0] = document.querySelector(".adj-1");
$adjContainers[1] = document.querySelector(".adj-2");
const $advContainer = document.querySelector(".adv");

var story = "";
var nouns = [];
var adjs = [];
var adv = "";
var wordInput = null;
var partOfSpeech = null;
var definition = null;

var randNum;

function setRandNum() {
	randNum = Math.floor(Math.random() * 3) + 1 // used to randomly select a story
	console.log(randNum);
}

setRandNum();

function getInputFieldValue() {
	return $inputField.value.trim().replaceAll("<", "").replaceAll(">", "");
}

function displayStory() {

	if (randNum === 1) {
		story = `Jessie and her best friend Dave went to Disney World today!
		 They saw a <strong>${nouns[0]}</strong> in a show at the Magic Kingdom
		 and ate a <strong>${adjs[0]}</strong> feast for dinner. The next day I
		 ran <strong>${adv}</strong> to meet Mickey Mouse in his
		 <strong>${nouns[1]}</strong> and then that night I gazed at the 1000
		 <strong>${adjs[1]}</strong> fireworks shooting from the
		 <strong>${nouns[2]}</strong>.`;
	} else if (randNum === 2) {
		story = `One day I went to the park with my <strong>${nouns[0]}</strong>.
		 It was very a cold and <strong>${adjs[0]}</strong> day, but I wanted to
		 see the <strong>${nouns[1]}s</strong> crawling <strong>${adv}</strong>
		 across the grass. Suddenly, a group of <strong>${nouns[2]}s</strong>
		 jumped out of the trees and I ran back to my
		 <strong>${adjs[1]}</strong> home.`;
	} else if (randNum === 3) {
		story = `Yesterday Jamie and their friend Ann went to the zoo and saw the
		smallest <strong>${nouns[0]}</strong> they had ever seen! They ate a
		<strong>${adjs[0]}</strong> picnic before <strong>${adv}</strong> being
		interrupted by <strong>${adjs[1]} ${nouns[1]}s</strong> and
		<strong>${nouns[2]}s</strong>.`;
	}
	if (nouns.length === 3 && adjs.length === 2 && adv !== "") {
		$storyContainer.innerHTML += `<h3>Your random story: </h3> <p>${story}</p>`;
	}
}


//Function to determine user input word types & give feedback
function giveUserFeedback() {
	if (partOfSpeech === "noun"
	 || partOfSpeech === "adjective"
	 || partOfSpeech === "adverb") {
		if (partOfSpeech === "noun" && nouns.length < 3) {
		nouns.push(wordInput);
		$nounContainers[nouns.length-1].innerHTML += `${wordInput}, ${definition}`;
		} else if (partOfSpeech === "noun" && nouns.length === 3) {
		alert("You have already entered enough nouns!");
		} else if (partOfSpeech === "adjective" && adjs.length < 2) {
		adjs.push(wordInput);
		$adjContainers[adjs.length-1].innerHTML += `${wordInput}, ${definition}`
		} else if (partOfSpeech === "adjective" && adjs.length === 2) {
		alert("You already entered enough adjectives!");
		} else if (partOfSpeech === "adverb" && adv === "") {
		adv = wordInput;
		$advContainer.innerHTML += `${wordInput}, ${definition}`;
		} else if (partOfSpeech === "adverb" && adv != "") {
		alert("You already entered an adverb.")
		}
	}
}

// Function to validate user input
function validateInput() {
	if (wordInput !== undefined) {
		giveUserFeedback();
	} else {
		alert("Improper word type. try again!");
	}
}

// error handler function
function errorHandler(error) {
	console.log(`Invalid input type. ${error}`);
	alert("That's not a word!");}

// success handler function
function successHandler(data) {
	console.log("Success");
	wordInput = data[0].hwi.hw.trim().replaceAll("*","");
	partOfSpeech = data[0].fl;
	definition = data[0].shortdef[0];
	console.log(wordInput);
	validateInput();
	displayStory();
}

// dictionary query handler to fetch dictionary data from the
// Merriam-Webster Dictionary API
function dictionaryQueryHandler(event) {
	event.preventDefault();
	const
url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${getInputFieldValue()}?key=${key}`;
	fetch(url)
	.then((response) => response.json())
	.then(successHandler)
	.catch(errorHandler);
}

$form.addEventListener("submit", dictionaryQueryHandler);

function formSumbitted(event) {
	event.preventDefault();
	$inputField.value = "";
	$submitButton.setAttribute("disabled", null);
}

$form.addEventListener("submit", formSumbitted);

function resetGame(event) {
	event.preventDefault();
	$storyContainer.innerHTML = ""
	$nounContainers[1].innerHTML = "";
	$nounContainers[2].innerHTML = "";
	$nounContainers[3].innerHTML = "";
	$adjContainers[0].innerHTML = "";
	$adjContainers[1].innerHTML = "";
	setRandNum();
	var nouns = [];
	var adjs = [];
	var adv = "";
}

$clearButton.addEventListener("click", resetGame);

function inputValueChanged() {
	var value = getInputFieldValue();
	if (value.length > 0) {
		$submitButton.removeAttribute("disabled");
	} else {
		$submitButton.setAttribute("disabled", null);
	}
}

$inputField.addEventListener("keyup", inputValueChanged);