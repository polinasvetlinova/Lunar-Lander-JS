var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;
var deposito=true;
var  finish=false;
var startgame=false;
var instrucciones=false;
var about=false;
//al cargar por completo la página...
window.onload = function(){
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}

	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	//Empezar a mover nave
	document.getElementById("start_game").onclick=function(){
		startgame=true;
		start();
	}
	document.getElementById("instruction").onclick=function(){
		if(instrucciones==false){
			document.getElementById("inst").style.display="block";
			instrucciones=true;
		}else{
			document.getElementById("inst").style.display="none";
			instrucciones=false;
		}
	}
	document.getElementById("about").onclick=function(){
		if(about==false){
			document.getElementById("abt").style.display="block";
			about=true;
		}else{
			document.getElementById("abt").style.display="none";
			about=false;
		}
	}

}
//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	if(startgame){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v.toFixed(1);
	y +=v*dt;
	document.getElementById("altura").innerHTML=y.toFixed(1);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<78){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		finish=true;
		chk_win();	
		stop();
	}
	}
}
function motorOn(){
	if(deposito&&!finish&&startgame){
	a=-g;
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
	document.getElementById("cohete").src="img/nave_fuego.png";	
	}
}
function motorOff(){
	a=g;
	if(!finish){
	clearInterval(timerFuel);
	timerFuel=null;
	document.getElementById("cohete").src="img/nave.png";
	}
}
function actualizarFuel(){
	//Aquí hay que cambiar el valor del marcador de Fuel...
	if(deposito&&!finish&&startgame){
	fuel-=0.1;  
	if (fuel <= 0) {
		deposito=false;
		fuel = 0;
			motorOff();
		}
	}
	document.getElementById("fuel").innerHTML=fuel.toFixed(1);

}
function chk_win() {
		document.getElementById("altura").innerHTML = 0.00.toFixed(2);	
			if (v > 10) {
			document.getElementById("cohete").src = "img/exp_ho.png";
			document.getElementById("nave").style.top="72%";
		} else {
			document.getElementById("cohete").src="img/ast_ho.png"
			document.getElementById("nave").style.top="70%";
			document.getElementById("mensaje").style.display="block";
		}
		stop();

}