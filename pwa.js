async function init() {
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);        

  const frame = document.getElementById('mainFrame');
  frame.setAttribute("src", urlParams.get('url'));
  frame.style.visibility = 'visible';
  
  const led_string = urlParams.get('led');
  if (led_string != null){
    LED_SEQUENCE = led_string.split('');
    console.log(LED_SEQUENCE);
  } else {
    console.log(LED_SEQUENCE);
  }
  
	
  try {
		xapi = await getXAPI();
    console.log('xapi object recevied');
	} catch (e) {
		console.log('Could not connect');
	}

}

window.onload = async function() {
	init();
};


const colors = ['Green', 'Yellow', 'Red', 'Off'];

const delay = 200; 

let LED_SEQUENCE = [0,1,3,2,3,2,1,0];

function setLedColor(color){

  if(color == 4){
    setLedMode('Auto');
    return;
  }
  
  xapi.Command.UserInterface.LedControl.Color.Set({ Color: colors[color] });

}

async function setLedMode(mode){

  xapi.Config.UserInterface.LedControl.Mode.set(mode);

}


async function sendMessage(){

  console.log('LED Test Pressed')

  LED_SEQUENCE.forEach((color, i) => {
    setTimeout(() => {
      setLedColor(color);
    }, i * delay);
  });
  
}

const exit = document.getElementById('exit');
exit.addEventListener('click', async function(e) {

  console.log('Attempting to exit');

  try{     
   sendMessage();
  } catch (e) {
   console.log('Error exiting');
  }
   
});
