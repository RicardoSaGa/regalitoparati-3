// ===============================
// 🎵 ELEMENTOS BASE
// ===============================
const audio = document.getElementById('song');
const btn = document.getElementById('startBtn');
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let started = false;

// ===============================
// 💖 EVENTO PRINCIPAL
// ===============================
btn.addEventListener('click', async () => {
  if (started) return;
  started = true;

  btn.style.display = 'none';
  await audio.play();
  requestAnimationFrame(animateBackground);
  startHeart();
});

// ===============================
// 💕 FONDO CON CORAZONES
// ===============================
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

// ===============================
// ❤️ CORAZÓN CON TEXTO
// ===============================
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

  const lyrics = String.raw`You fill up my mind 24/7 I stay up all night, I can't even rest You seem to be fine the way that you smile It's giving me a heartache 'cause I should be the one protecting it (Yeah, you, you) All I need is you, you, you and I in a verse to tune the skies When it's dark, I'll push the sun to rise and pull the moon aside I'ma do it do or die, dip my pen in pain to paint you better days My heart was in a cage, you let it go astray, uh. Going back to U No one else but U No one else but. Going back to U All I want is U, I'm with U (Now I miss U). what should I do. My life, my love is U I'm still into U baby All I want is. Going back to. it's U, it ain't easy Baby I need U. U to stay with me, stay with me`;

  function fillHeart(pattern, text) {
    const chars = text.replace(/\s+/g, ' ').split('');
    let i = 0;
    return pattern.replace(/@/g, () => chars[i++ % chars.length]);
  }

  function typeHeart(fullText) {
    heartText.style.opacity = 1;
    heartText.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      heartText.textContent += fullText[i];
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 30); // velocidad por letra
  }

  // Espera 6 segundos antes de escribir
  setTimeout(() => {
    const formedHeart = fillHeart(heartPattern, lyrics);
    typeHeart(formedHeart);
  }, 6000);
}

// ===============================
// ✨ TEXTO COREANO SINCRONIZADO (VISIBLE Y ESCRITO LETRA POR LETRA)
// ===============================
const koreanContainer = document.getElementById('koreanContainer');

const koreanLines = [
  { time: 41,  text: "눈물은 내 기억을 겨눠", x: 10, y: 15 },
  { time: 45, text: "지나온 그 순간이 피어",   x: 70, y: 35 },
  { time: 48, text: "그때에서 지금 멈춰 있어", x: 7, y: 70 },
];

// Escribe carácter por carácter
function typeKoreanText(line) {
  const span = document.createElement('span');
  span.className = 'korean-text';
  span.style.left = line.x + 'vw';
  span.style.top = line.y + 'vh';
  koreanContainer.appendChild(span);

  let i = 0;
  const chars = [...line.text]; // divide caracteres coreanos correctamente

  const interval = setInterval(() => {
    span.textContent += chars[i];
    span.style.opacity = 1;
    i++;
    if (i >= chars.length) {
      clearInterval(interval);
      // luego de 3 s, desvanece suavemente
      setTimeout(() => {
        span.style.transition = 'opacity 2s ease';
        span.style.opacity = 0;
        setTimeout(() => span.remove(), 2000);
      }, 3000);
    }
  }, 180); // velocidad de escritura (ms por carácter)
}

// Detecta el tiempo exacto y dispara la escritura
audio.addEventListener('timeupdate', () => {
  const t = Math.floor(audio.currentTime);
  koreanLines.forEach(line => {
    if (!line.shown && t >= line.time) {
      line.shown = true;
      typeKoreanText(line);
    }
  });
});

// ✅ Fallback: por si el evento se retrasa, fuerza el inicio
btn.addEventListener('click', () => {
  setTimeout(() => {
    koreanLines.forEach(line => {
      if (line.time < 8 && !line.shown) {
        line.shown = true;
        typeKoreanText(line);
      }
    });
  }, 7000);
});