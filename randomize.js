// assets/js/randomize.js
(function(window){
  function shuffle(array){
    const a = array.slice();
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function ensurePool(pool, required){
    const out = pool.slice();
    // If not enough distinct strings, add variants with a sig param
    while(out.length < required){
      const pick = pool[Math.floor(Math.random()*pool.length)];
      out.push(pick + (pick.includes('?') ? '&' : '?') + 'sig=' + Math.random().toString(36).slice(2,8));
    }
    return out;
  }

  function setHero(selector, pool){
    const el = document.querySelector(selector);
    if(!el || !pool || !pool.length) return;
    const pick = pool[Math.floor(Math.random()*pool.length)];
    el.style.backgroundImage = `url("${pick}")`;
  }

  function setCards(selector, pool){
    const imgs = Array.from(document.querySelectorAll(selector));
    if(!imgs.length || !pool || !pool.length) return;
    const pool2 = ensurePool(pool, imgs.length);
    const shuffled = shuffle(pool2).slice(0, imgs.length);
    imgs.forEach((img, idx) => {
      // if <img>, set src; if not (e.g., div.background), set background-image
      if(img.tagName.toLowerCase() === 'img'){
        img.src = shuffled[idx];
      } else {
        img.style.backgroundImage = `url("${shuffled[idx]}")`;
      }
    });
  }

  window.randomizeImages = function(opts){
    // opts: { heroSelector, heroPool, cardSelector, cardPool }
    if(!opts) return;
    setHero(opts.heroSelector || '#hero', opts.heroPool || []);
    setCards(opts.cardSelector || '.card-img', opts.cardPool || []);
  };
})(window);
