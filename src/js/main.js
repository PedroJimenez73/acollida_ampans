var pages = [
    {title: 'Et donem la benvinguda a', path: '01'},
    {title: 'Benvinguts a AMPANS', path: '02'},
    {title: 'Benvinguts a AMPANS', path: '03'},
    {title: 'Missió, visió i valors', path: '04'},
    {title: 'Què implica treballar a AMPANS?', path: '05'},
    {title: 'Compromís amb les persones i amb el territori', path: '06'},
    {title: 'Per què AMPANS?', path: '07'},
    {title: 'Per què AMPANS?', path: '12'},
    {title: 'Suport Social', path: '13'},
    {title: 'Qüestionari', path: '14'},
    {title: 'Resultats', path: '15'},
    {title: '', path: '16'},
];

progress.push({pass: true});
for (i=1; i < pages.length; i++) {
    progress.push({pass: false})
}
for (i=0; i < corrects.length; i++) {
    answers.push('')
}

progress = [
    {pass: true},
    {pass: true},
    {pass: true},
    {pass: true},
    {pass: true},
    {pass: true},
    {pass: false},
    {pass: false},
    {pass: false},
    {pass: false},
    {pass: false},
    {pass: false},
];


var nextBtn = document.getElementById('next-btn');
var prevBtn = document.getElementById('prev-btn');
var i1 = document.getElementById('i-1');
var i2 = document.getElementById('i-2');
var i3 = document.getElementById('i-3');
var i4 = document.getElementById('i-4');
var i5 = document.getElementById('i-5');
var i6 = document.getElementById('i-6');
var i7 = document.getElementById('i-7');
var progressBarEvolution = document.getElementById('progress-bar-evolution');
var progressBarEvolutionText = document.querySelector('#progress-bar-evolution span');
var eventsMsg = document.getElementById('eventos');

function navTo() {
    $("#content").empty();
    $("#content").load("content/" + pages[currentPage].path + "/index.html", function()	{
        $("#slide").fadeIn('slow');												  
    });
    setTimeout(() => {
        ScormProcessSetValue("cmi.core.lesson_location", currentPage);
    }, 500);
    setNavState();
    setMenuState();
    // setActiveMenuItem();
    $('html, body').animate({
        scrollTop: 0
    }, 400);
}

function prevPage() {
    currentPage--;
    navTo();
}

function nextPage() {
    currentPage++;
    navTo();
}

function navToPage(e) {
    if(progress[e - 1].pass) {
        currentPage = e - 1;
        toggleMenu()
        navTo();
    }
}

function setNavState() {
    document.getElementById('header-title').innerHTML = pages[currentPage].title;
    document.getElementById('pagination').innerHTML = currentPage + 1 + '/' + pages.length;
    if(currentPage === 0) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'inline';
        nextBtn.innerHTML = '<span>Iniciar</span><span>&gt;</span>';
    } else if (currentPage === pages.length - 1) {
        prevBtn.style.display = 'inline';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline';
        nextBtn.style.display = 'inline';
        nextBtn.innerHTML = '<span>Següent</span><span>&gt;</span>';
    }
    if(!progress[currentPage].pass) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

function setEnventsMsg(e, active) {
    if (e !== 0 && active) {
        eventsMsg.style.opacity = '1';
        if (e == 1) {
            eventsMsg.innerHTML = 'Necessita completar 1 acció per poder continuar';
        } else {
            eventsMsg.innerHTML = 'Necessita completar ' + e + ' accions per poder continuar';
        }
    } else if (e === 0 && active){
        eventsMsg.style.opacity = '1';
        eventsMsg.innerHTML = '<span style="color: #008489;">Ja pot continuar fent clic en següent</span>';
    } else if (e === 0 && !active){
        eventsMsg.style.opacity = '0';
    }

}

function passPage(e) {
    progress[e].pass = true;
    // if(!progress[currentPage].pass) {
    //     nextBtn.disabled = true;
    // } else {
        nextBtn.disabled = false;
    // }
    setState();
}

function setMenuState() {
    if (progress[2].pass) {
        i1.classList.remove('lock');
        progressBarEvolution.style.width = '20%';
        progressBarEvolutionText.innerHTML = '20%';
    }
    if (progress[3].pass) {
        i2.classList.remove('lock');
        progressBarEvolution.style.width = '30%';
        progressBarEvolutionText.innerHTML = '30%';
    } 
    if (progress[4].pass) {
        i3.classList.remove('lock');
        progressBarEvolution.style.width = '40%';
        progressBarEvolutionText.innerHTML = '40%';
    } 
    if (progress[5].pass) {
        i4.classList.remove('lock');
        progressBarEvolution.style.width = '50%';
        progressBarEvolutionText.innerHTML = '50%';
    } 
    if (progress[6].pass) {
        i5.classList.remove('lock');
        progressBarEvolution.style.width = '80%';
        progressBarEvolutionText.innerHTML = '80%';
    } 
    if (progress[8].pass) {
        i6.classList.remove('lock');
        progressBarEvolution.style.width = '90%';
        progressBarEvolutionText.innerHTML = '90%';
    } 
    if (progress[9].pass) {
        i7.classList.remove('lock');
    } 
    if (passFinalTest) {
        progressBarEvolution.style.width = '100%';
        progressBarEvolutionText.innerHTML = '100%';
    } 
}

function exit() {
    ScormProcessSetValue("cmi.core.exit", "suspend");
    doUnload(true);
    setTimeout(() => {
        top.window.close()
    }, 500);
}

