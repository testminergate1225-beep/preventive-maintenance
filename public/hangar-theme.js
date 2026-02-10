/* ============================================================
   HANGAR THEME — Interactive JavaScript Module
   Adds: parallax background, scanning beam, intro animation,
         input focus panel glow, button ripple effects,
         ambient floating dots.
   Does NOT alter any existing functionality.
   ============================================================ */
(function(){
  'use strict';

  /* ── 1  PARALLAX BACKGROUND ──────────────────────────────── */
  function createBackground(){
    const bg = document.createElement('div');
    bg.id = 'hangar-bg';
    bg.setAttribute('aria-hidden','true');
    document.body.prepend(bg);
    return bg;
  }

  function initParallax(bg){
    let ticking = false;
    document.addEventListener('mousemove', function(e){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        const x = (e.clientX / window.innerWidth  - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        bg.style.transform = 'translate('+x+'px,'+y+'px)';
        ticking = false;
      });
    });
  }

  /*Disabled for now - may re-enable later*/
  /* ── 2  SCANNING BEAM ────────────────────────────────────── */
 /* function createScanBeam(){
    const beam = document.createElement('div');
    beam.id = 'hangar-scan';
    beam.setAttribute('aria-hidden','true');
    document.body.appendChild(beam);
  }
*/
  /* ── 3  INTRO OVERLAY ────────────────────────────────────── */
  function createIntro(){
    const overlay = document.createElement('div');
    overlay.id = 'hangar-intro';
    overlay.setAttribute('aria-hidden','true');
    document.body.appendChild(overlay);
    // Remove from DOM after animations finish
    setTimeout(function(){ if(overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 2200);
  }

  /* ── 4  AMBIENT FLOATING DOTS ────────────────────────────── */
  function createDots(count){
    for(var i=0;i<count;i++){
      var dot = document.createElement('div');
      dot.className = 'hg-dot';
      dot.setAttribute('aria-hidden','true');
      dot.style.left  = Math.random()*100 + '%';
      dot.style.top   = Math.random()*100 + '%';
      dot.style.animationDelay    = (Math.random()*6).toFixed(1) + 's';
      dot.style.animationDuration = (4+Math.random()*5).toFixed(1) + 's';
      dot.style.opacity = (0.15 + Math.random()*0.25).toFixed(2);
      document.body.appendChild(dot);
    }
  }

  /* ── 5  CARD LIGHT STRIPS ────────────────────────────────── */
  function addLightStrips(){
    var cards = document.querySelectorAll('.card, .login-card');
    for(var i=0;i<cards.length;i++){
      if(cards[i].querySelector('.hangar-strip')) continue;
      var strip = document.createElement('div');
      strip.className = 'hangar-strip';
      strip.setAttribute('aria-hidden','true');
      cards[i].appendChild(strip);
    }
  }

  /* ── 6  INPUT FOCUS → PANEL GLOW ─────────────────────────── */
  function initInputEffects(){
    var inputs = document.querySelectorAll('input, select, textarea');
    for(var i=0;i<inputs.length;i++){
      inputs[i].addEventListener('focus', handleFocus);
      inputs[i].addEventListener('blur',  handleBlur);
    }
  }
  function findPanel(el){
    var node = el;
    while(node && node !== document.body){
      if(node.classList &&
        (node.classList.contains('card') ||
         node.classList.contains('login-card') ||
         node.classList.contains('page') ||
         node.classList.contains('meta'))){
        return node;
      }
      node = node.parentElement;
    }
    return null;
  }
  function handleFocus(e){ var p = findPanel(e.target); if(p) p.classList.add('panel-active'); }
  function handleBlur(e) { var p = findPanel(e.target); if(p) p.classList.remove('panel-active'); }

  /* ── 7  BUTTON RIPPLE ────────────────────────────────────── */
  function initButtonEffects(){
    document.addEventListener('click', function(e){
      var btn = e.target.closest('button');
      if(!btn) return;
      var ripple = document.createElement('span');
      ripple.className = 'hg-ripple';
      var rect = btn.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top  = (e.clientY - rect.top)  + 'px';
      btn.appendChild(ripple);
      setTimeout(function(){ if(ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 650);
    });
  }

  /* ── 8  RE-APPLY EFFECTS ON DOM CHANGES ──────────────────── */
  function observeDOM(){
    if(typeof MutationObserver === 'undefined') return;
    var observer = new MutationObserver(function(){
      addLightStrips();
      // Re-bind new inputs if any
      var inputs = document.querySelectorAll('input:not([data-hg]), select:not([data-hg]), textarea:not([data-hg])');
      for(var i=0;i<inputs.length;i++){
        inputs[i].setAttribute('data-hg','1');
        inputs[i].addEventListener('focus', handleFocus);
        inputs[i].addEventListener('blur',  handleBlur);
      }
    });
    observer.observe(document.body, {childList:true, subtree:true});
  }

  /* ── INIT ────────────────────────────────────────────────── */
  function init(){
    var bg = createBackground();
    /*createScanBeam(); */
    createIntro();
    createDots(8);
    addLightStrips();
    initParallax(bg);
    initInputEffects();
    initButtonEffects();
    observeDOM();
    // Mark all existing inputs
    var inputs = document.querySelectorAll('input, select, textarea');
    for(var i=0;i<inputs.length;i++) inputs[i].setAttribute('data-hg','1');
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
