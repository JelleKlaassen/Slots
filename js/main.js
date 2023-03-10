const options = {
        sounds: {
          reelsBegin: './sounds/reelsStart.mp3',
          reelsEnd: './sounds/reelsEnd.mp3',
        },
        animSpeed: 1350,
        rngFunc: function() {
                return Math.random()
            }
      	};
      	let cheatMode = false;
      	let reels;
    if (cheatMode == true) {
    	reels = [
  			{
    		imageSrc: './img/reel1.png',
    		symbols: [
    		  { title: 'apple',position: 100,weight: 0 },{ title: 'bar',position: 300,weight: 0 },{ title: 'cherry',position: 500,weight: 0 },
    		  { title: 'lemon',position: 700,weight: 0 },{ title: 'melon',position: 900,weight: 0 },{ title: 'seven',position: 1100,weight: 100 }]},
    		{
    		imageSrc: './img/reel2.png',
    		symbols: [
    		  { title: 'seven',position: 100,weight: 100 },{ title: 'melon',position: 300,weight: 0 },{ title: 'lemon',position: 500,weight: 0 },
    		  { title: 'cherry',position: 700,weight: 0 },{ title: 'bar',position: 900,weight: 0 },{ title: 'apple',position: 1100,weight: 0 }]},
    		{
    		imageSrc: './img/reel3.png',
    		symbols: [
    		  { title: 'cherry',position: 100,weight: 0 },{ title: 'lemon',position: 300,weight: 0 },{ title: 'melon',position: 500,weight: 0 },
    		  { title: 'seven',position: 700,weight: 100 },{ title: 'apple',position: 900,weight: 0 },{ title: 'bar',position: 1100,weight: 0 }]},
    		{
    		imageSrc: './img/reel4.png',
    		symbols: [
    		  { title: 'cherry',position: 100,weight: 0 },{ title: 'bar',position: 300,weight: 0 },{ title: 'apple',position: 500,weight: 0 },
    		  { title: 'seven',position: 700,weight: 100 },{ title: 'melon',position: 900,weight: 0 },{ title: 'lemon',position: 1100,weight: 0 }]},
    		{
    		imageSrc: './img/reel5.png',
    		symbols: [
    		  { title: 'lemon',position: 100,weight: 0 },{ title: 'cherry',position: 300,weight: 0 },{ title: 'melon',position: 500,weight: 0 },
    		  { title: 'apple',position: 700,weight: 0 },{ title: 'bar',position: 900,weight: 0 },{ title: 'seven',position: 1100,weight: 100 }]}
    		];
    } else {
    	reels = [
  			{
    		imageSrc: './img/reel1.png',
    		symbols: [
    		  { title: 'apple',position: 100,weight: 1 },{ title: 'bar',position: 300,weight: 1 },{ title: 'cherry',position: 500,weight: 1 },
    		  { title: 'lemon',position: 700,weight: 1 },{ title: 'melon',position: 900,weight: 1 },{ title: 'seven',position: 1100,weight: 1 }]},
    		{
    		imageSrc: './img/reel2.png',
    		symbols: [
    		  { title: 'seven',position: 100,weight: 1 },{ title: 'melon',position: 300,weight: 1 },{ title: 'lemon',position: 500,weight: 1 },
    		  { title: 'cherry',position: 700,weight: 1 },{ title: 'bar',position: 900,weight: 1 },{ title: 'apple',position: 1100,weight: 1 }]},
    		{
    		imageSrc: './img/reel3.png',
    		symbols: [
    		  { title: 'cherry',position: 100,weight: 1 },{ title: 'lemon',position: 300,weight: 1 },{ title: 'melon',position: 500,weight: 1 },
    		  { title: 'seven',position: 700,weight: 1 },{ title: 'apple',position: 900,weight: 1 },{ title: 'bar',position: 1100,weight: 1 }]},
    		{
    		imageSrc: './img/reel4.png',
    		symbols: [
    		  { title: 'cherry',position: 100,weight: 1 },{ title: 'bar',position: 300,weight: 1 },{ title: 'apple',position: 500,weight: 1 },
    		  { title: 'seven',position: 700,weight: 1 },{ title: 'melon',position: 900,weight: 1 },{ title: 'lemon',position: 1100,weight: 1 }]},
    		{
    		imageSrc: './img/reel5.png',
    		symbols: [
    		  { title: 'lemon',position: 100,weight: 1 },{ title: 'cherry',position: 300,weight: 1 },{ title: 'melon',position: 500,weight: 1 },
    		  { title: 'apple',position: 700,weight: 1 },{ title: 'bar',position: 900,weight: 1 },{ title: 'seven',position: 1100,weight: 1 }]}
    		];
    }

		window.onload = function() {
			let coins,jackpot,bet,coinDiv,betDiv,jackpotDiv,betAmount,winTitle,totalWon,display1,display2,display3,display4,display5,display6,display7,display8,display9,display10,display11,display12,display13,display14,display15;
			coinDiv = document.getElementById('coins');
			betDiv = document.getElementById('bet');
			jackpotDiv = document.getElementById('jackpot');
			betAmount = document.getElementById('betAmount');
			winTitle = document.getElementById('winTitle');

			if (getCookie("coins") != "" && getCookie("coins") != 0) {
				coins = getCookie("coins");
				totalWon = getCookie("totalWon");
			} else {
				coins = 10;
				totalWon = 0;
			}
			jackpot = 2500;
			bet = 1;

			function getCookie(cname) {
  			let name = cname + "=";
  			let decodedCookie = decodeURIComponent(document.cookie);
  			let ca = decodedCookie.split(';');
  			for(let i = 0; i <ca.length; i++) {
  			  let c = ca[i];
  			  while (c.charAt(0) == ' ') {
  			    c = c.substring(1);
  			  }
  			  if (c.indexOf(name) == 0) {
  			    return c.substring(name.length, c.length);
  			  }
  			}
  			return "";
			}

			display1 = document.getElementById('display-1');
			display2 = document.getElementById('display-2');
			display3 = document.getElementById('display-3');
			display4 = document.getElementById('display-4');
			display5 = document.getElementById('display-5');
			display6 = document.getElementById('display-6');
			display7 = document.getElementById('display-7');
			display8 = document.getElementById('display-8');
			display9 = document.getElementById('display-9');
			display10 = document.getElementById('display-10');
			display11 = document.getElementById('display-11');
			display12 = document.getElementById('display-12');
			display13 = document.getElementById('display-13');
			display14 = document.getElementById('display-14');
			display15 = document.getElementById('display-15');

			setVals();
        const callback = function(payLine) {

        	payLine = tempArray;
        	console.log(payLine);
        	if (payLine[0].title === payLine[1].title && payLine[0].title === payLine[2].title && payLine[0].title === payLine[3].title && payLine[0].title === payLine[4].title) {
        			winTitle.classList.remove('winTitle');
        			winTitle.classList.add('rainbow-text');
        			winTitle.innerHTML = "JACKPOT!!!";
          		setTimeout(wipeTitle,5000);
          		coins += jackpot;
          		(new Audio('sounds/jackpot.mp3')).play();
          		setVals();
        	} else if (payLine[0].title === payLine[1].title && payLine[2].title === payLine[3].title || payLine[1].title === payLine[2].title && payLine[3].title === payLine[4].title || payLine[0].title === payLine[1].title && payLine[3].title === payLine[4].title) {
        				winTitle.classList.remove('winTitle');
        				winTitle.classList.add('rainbow-text');
        				winTitle.innerHTML = "TWO PAIRS!";
          			setTimeout(wipeTitle,3000);
          			coins += bet*4;
          			(new Audio('sounds/coins.mp3')).play();
          			setVals();
        	} else if (payLine[0].title === payLine[1].title && payLine[0].title === payLine[2].title || payLine[1].title === payLine[2].title && payLine[1].title === payLine[3].title || payLine[2].title === payLine[3].title && payLine[2].title === payLine[4].title) {
        		if (payLine[0].title == "seven" && payLine[1].title == "seven" && payLine[2].title == "seven" || payLine[1].title == "seven" && payLine[2].title == "seven" && payLine[3].title == "seven" || payLine[2].title == "seven" && payLine[3].title == "seven" && payLine[4].title == "seven") {
        				winTitle.classList.remove('winTitle');
        				winTitle.classList.add('rainbow-text');
          			winTitle.innerHTML = "LUCKY SEVEN!";
          			setTimeout(wipeTitle,3000);
          			coins += bet*7;
          			(new Audio('sounds/coins.mp3')).play();
          			setVals();
          		} else {
          			winTitle.classList.remove('winTitle');
          			winTitle.classList.add('rainbow-text');
          			winTitle.innerHTML = "3-IN-A-ROW!";
          			setTimeout(wipeTitle,3000);
          			coins += bet*3;
          			(new Audio('sounds/coins.mp3')).play();
          			setVals();
          		}
        	} else if (payLine[0].title === payLine[1].title || payLine[1].title === payLine[2].title || payLine[2].title === payLine[3].title || payLine[3].title === payLine[4].title) {
        			winTitle.classList.remove('winTitle');
        			winTitle.classList.add('rainbow-text');
        			winTitle.innerHTML = "2-OF-A-KIND!";
          		setTimeout(wipeTitle,3000);
          		coins += bet*2;
          		(new Audio('sounds/coins.mp3')).play();
          		setVals();
        	} else { (new Audio('sounds/lost.mp3')).play(); }
        	if (winTitle.classList.contains('rainbow-text')) {
        		(function () {
  						var angle = 0;
  						var p = document.querySelector('.rainbow-text');
  						var text = p.textContent.split('');
  						var len = text.length;
  						var phaseJump = 360 / len;
  						var spans;

		  						p.innerHTML = text.map(function (char) {
		    						return '<span>' + char + '</span>';
		  						}).join('');

		  						spans = p.children;

		  						(function wheee () {
		    						for (var i = 0; i < len; i++) {
		    							if (spans[i] != undefined) {
		      							spans[i].style.color = 'hsl(' + (angle + Math.floor(i * phaseJump)) + ', 55%, 70%)';
		      						}
		    						}
		    						angle++;
		    						requestAnimationFrame(wheee);
  						}());
						}());
        	}
        	for (var i = 0; i < betButtons.length; i++) {
        		betButtons[i].disabled = false;
        	};
          button.disabled = false;

        };

        var machine = document.getElementById('slot-machine');
        var button = document.getElementById('play-button');
        var betButtons = document.querySelectorAll('.bet-button');

        const slot = slotMachine(machine, reels, callback, options);

        button.addEventListener('click', playGame);
        function playGame() {
        	if (coins >= bet) {
        		button.disabled = true;
        		for (var i = 0; i < betButtons.length; i++) {
        			betButtons[i].disabled = true;
        		};
        		slot.play();
        		coins -= bet;
        	} else if (coins <= 0) {
        		document.cookie = "coins=" + 0 + ";path=/";
						document.cookie = "totalWon=" + 0 + ";path=/";
        		winTitle.innerHTML = "You Lose!";
        		setTimeout(resetGame,3000);
        	};
        	setVals();
      	}
      	function setVals() {

					setdisplays('coin',coins);
					setdisplays('jackpot',jackpot);
					setdisplays('bet',bet);
					totalWon = coins - 10;
					document.cookie = "coins=" + coins + ";path=/";
					document.cookie = "totalWon=" + totalWon + ";path=/";

      	};

      betButtons[0].addEventListener('click',function(){ setBet(1) });
      betButtons[1].addEventListener('click',function(){ setBet(5) });
      betButtons[2].addEventListener('click',function(){ setBet(10) });
      betButtons[3].addEventListener('click',function(){ setBet(50) });
      betButtons[4].addEventListener('click',function(){ setBet(100) });

			function setBet(number) {
				if (number <= coins) {
					switch(number) {
						case 1:
							bet = 1;
						break;
						case 5:
							bet = 5;
						break;
						case 10:
							bet = 10;
						break;
						case 50:
							bet = 50;
						break;
						case 100:
							bet = 100;
						break;
					};
					setVals();
					(new Audio('sounds/setBet.mp3')).play();
			}};
      	function wipeTitle(){
      		winTitle.classList.add('winTitle');
      		winTitle.classList.remove('rainbow-text');
      		winTitle.innerHTML = "Spin To Win!";
      	}

      	function resetGame() {
      		location.reload();
      	}

				function setdisplays(disp, number) {
					var baseClass = 'display-container display-size-12 display-no-';
					var editedNumber = ' ';
					if (number < 10) { editedNumber = "0000"+number }
					else if (number >= 10 && number < 100) { editedNumber = "000"+number }
					else if (number >= 100 && number < 1000) { editedNumber = "00"+number }
					else if (number >= 1000 && number < 10000) { editedNumber = "0"+number }
					else { editedNumber = number.toString()};

					switch(disp) {
						case 'coin':
							display1.className = baseClass + editedNumber[0];
							display2.className = baseClass + editedNumber[1];
							display3.className = baseClass + editedNumber[2];
							display4.className = baseClass + editedNumber[3];
							display5.className = baseClass + editedNumber[4];
						break;
						case 'jackpot':
							display6.className = baseClass + editedNumber[0];
							display7.className = baseClass + editedNumber[1];
							display8.className = baseClass + editedNumber[2];
							display9.className = baseClass + editedNumber[3];
							display10.className = baseClass + editedNumber[4];
						break;
						case 'bet':
							display11.className = baseClass + editedNumber[0];
							display12.className = baseClass + editedNumber[1];
							display13.className = baseClass + editedNumber[2];
							display14.className = baseClass + editedNumber[3];
							display15.className = baseClass + editedNumber[4];
						break;
					}
				}

      };