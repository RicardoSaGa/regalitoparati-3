const audio = document.getElementById('song');
const btn = document.getElementById('startBtn');
const text = document.getElementById('lyricsText');
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let currentLine = 0;
let started = false;

// 🎧 Evento al presionar el botón
btn.addEventListener('click', async () => {
  if (!started) {
    started = true;
    btn.style.display = 'none';
    await audio.play();
    requestAnimationFrame(animateBackground);
    startHeart(); // ❤️ inicia el proceso del corazón después
  }
});

// 🫀 Animación del texto sincronizado
audio.addEventListener('timeupdate', () => {
  const t = audio.currentTime;
  if (currentLine < lines.length && t >= lines[currentLine].time) {
    showLine(lines[currentLine].text);
    currentLine++;
  }
});

function showLine(textContent) {
  text.innerText = textContent;
  anime({
    targets: '#lyricsText',
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 800,
    easing: 'easeOutExpo'
  });
  anime({
    targets: '#heartContainer',
    scale: [1, 1.05],
    duration: 500,
    direction: 'alternate',
    easing: 'easeInOutSine'
  });
}

// 💕 Animación de fondo con corazones
let hearts = [];
for (let i = 0; i < 30; i++) {
  hearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 10 + Math.random() * 10,
    speed: 0.5 + Math.random() * 1.5
  });
}

function drawHeart(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  ctx.closePath();
  ctx.fillStyle = `rgba(255, 182, 193, ${Math.random() * 0.6 + 0.4})`;
  ctx.fill();
}

function animateBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let h of hearts) {
    drawHeart(h.x, h.y, h.r);
    h.y -= h.speed;
    if (h.y + h.r < 0) {
      h.y = canvas.height + h.r;
      h.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(animateBackground);
}

// ❤️ CORAZÓN CON TEXTO
function startHeart() {
  const heartText = document.getElementById('heartText');

  const heartPattern = String.raw`
                 @@@@@@@@@@@@               @@@@@@@@@@@@                 
             @@@@@@@@@@@@@@@@@@@         @@@@@@@@@@@@@@@@@@@             
          @@@@@@@@@@@@@@@@@@@@@@@@@     @@@@@@@@@@@@@@@@@@@@@@@@@        
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@      
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     
     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@        
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@          
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@            
              @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@              
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                
                  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                  
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                    
                      @@@@@@@@@@@@@@@@@@@@@@@@@@@@                      
                        @@@@@@@@@@@@@@@@@@@@@@@@                        
                          @@@@@@@@@@@@@@@@@@@@                          
                            @@@@@@@@@@@@@@@@                            
                              @@@@@@@@@@@@                              
                                @@@@@@@@                                
                                  @@@@                                  
                                   @@                                   
`;

  const lyrics = String.raw`You fill up my mind 24/7 I stay up all night, I can't even rest You seem to be fine the way that you smile It's giving me a heartache 'cause I should be the one protecting it (Yeah, you, you) All I need is you, you, you and I in a verse to tune the skies When it's dark, I'll push the sun to rise and pull the moon aside I'ma do it do or die, dip my pen in pain to paint you better days My heart was in a cage, you let it go astray, uh. Going back to U No one else but U No one else but. Going back to U All I want is U, I'm with U (Now I miss U). what should I do. My life, my love is U I′m still into U baby All I want is. Going back to. it's U, it ain′t easy Baby I need U. U to stay with me, stay with me`;

  function fillHeart(pattern, text) {
    const chars = text.replace(/\s+/g, ' ').split('');
    let i = 0;
    const filled = pattern.replace(/@/g, () => {
      const ch = chars[i % chars.length];
      i++;
      return ch;
    });
    return filled;
  }

  function typeHeart(fullText) {
    heartText.style.opacity = 1;
    heartText.textContent = '';
    let i = 0;

    const interval = setInterval(() => {
      heartText.textContent += fullText[i];
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, 30); // velocidad (ms por letra)
  }

  // Espera 6 segundos antes de empezar a escribir
  setTimeout(() => {
    const formedHeart = fillHeart(heartPattern, lyrics);
    typeHeart(formedHeart);
  }, 6000);
}

