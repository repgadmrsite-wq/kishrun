/* assets/app.js — Heyoola Kiosk logic (vanilla JS) */

(function(){
  const BRAND = { name:"هیولا", tagline:"ساندویچ سرد", accent:"#6b8afd", primary:"#0ee3a8", glow:"#a78bfa", logo:"img/logo-sullivan.webp" };
  const DISCOUNT = { percent:0.10, startHour:18, endHour:20 };
  const ORDER_START = 500;
  const CHEESE_PRICE = 6000;
  const SAUCE_PRICE = 3000;

  const MENU = [
    // Specials
    { id:"shaun-lamb", name:"بره ناقلا", emoji:"🐑", img:"img/shaun-lamb-fillet.webp", description: "سینه/فیله بره – خاص", tags: ["💎 پرمیوم", "✨ خاص", "🧑‍🍳 امضای‌شِف"],
      sizes:[{id:"150",label:"۱۵۰ گرم",price:170000},{id:"250",label:"۲۵۰ گرم",price:260000},{id:"350",label:"۳۵۰ گرم",price:320000}],
      extra:{step:50, unitPrice:30000}, customizable:true, isSpecial: true,
      theme: {
        className: 'theme-naghola',
        soundId: 'naghola-sound',
        entrySoundId: 'naghola-welcome-sound',
        charImage: 'https://hayola.hornspeed.com/img/naghola.webp',
        entryEffect: 'golden-shower',
        bgGradient: 'radial-gradient(ellipse at 50% 0%, #2c3e50 0%, #0b1020 80%)',
        primaryTheme: '#FFD700',
        accentTheme: '#FFFFFF',
        glowTheme: '#FFD700',
        textColor: '#e2e8f0'
      }
    },
    { id:"hulk-dry", name:"هالک", emoji:"💪", img:"img/hulk-dry-sausage-600.webp", description: "حجیم", tags: ["💥 حجیم", "🥊 سنگین", "🍖 پروتئین‌بمب"],
      sizes:[{id:"600",label:"حجیم",price:195000}],
      extra:{step:0, unitPrice:0}, customizable:false, isSpecial: true,
      theme: {
        className: 'theme-hulk',
        soundId: 'hulk-sound',
        entrySoundId: 'hulk-smash-sound',
        entryEffect: 'hulk-smash',
        bgGradient: 'radial-gradient(circle at 50% 100%, rgba(80, 200, 120, 0.4) 0%, transparent 60%), #1a1a1a',
        primaryTheme: '#50C878',
        accentTheme: '#2E8B57',
        glowTheme: '#50C878',
        charImage: 'img/hulk.webp',
        textColor: '#e2e8f0'
      }
    },
    { id:"sullivan-mix", name:"سالیوان", emoji:"👹", img:"img/sully-mix-pepperoni.webp", description: "مرغ و گوشت ۹۰٪ + ۵۰ گرم پپرونی", tags: ["🧑‍🍳 امضای‌شِف", "✨ خاص", "💛 محبوب"],
      sizes:[{id:"250",label:"۲۵۰ گرم",price:180000},{id:"350",label:"۳۵۰ گرم",price:210000}],
      extra:{step:50, unitPrice:25000}, customizable:true, isSpecial: true,
      theme: {
        className: 'theme-monsters-inc',
        soundId: 'sal-sound',
        entrySoundId: 'sal-sound',
        charImage: 'https://hayola.hornspeed.com/img/sal.webp',
        entryEffect: 'door-entrance',
        bgGradient: 'radial-gradient(circle, #4a4a4a 0%, #2c2c2c 100%)', // Metal floor
        primaryTheme: '#6a1b9a', // Sullivan Purple
        accentTheme: '#fdd835', // Warning Yellow
        glowTheme: '#6a1b9a',
        textColor: '#e2e8f0'
      }
    },
    // Regular Menu
    { id:"bigfoot-beef", name:"بیگ فوت", emoji:"🦶", img:"img/bigfoot-beef90.webp", description: "گوشت ۹۰٪", tags: ["🍖 پروتئین‌بمب", "😋 سیرکن", "⭐️ پرفروش"],
      sizes:[{id:"150",label:"۱۵۰ گرم",price:105000},{id:"250",label:"۲۵۰ گرم",price:165000},{id:"350",label:"۳۵۰ گرم",price:195000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-bigfoot',
        soundId: 'big-sound',
        entrySoundId: 'big-sound',
        charImage: 'https://hayola.hornspeed.com/img/big.webp',
        entryEffect: 'bigfoot-sighting',
        bgGradient: 'linear-gradient(to top, #0f2027, #203a43, #2c5364)', // Dark misty forest
        primaryTheme: '#2c5364', // Forest Green/Blue
        accentTheme: '#5aff15', // Eerie Glowing Green
        glowTheme: '#5aff15',
        textColor: '#e2e8f0'
      }
    },
    { id:"ginger-chicken", name:"جینجر", emoji:"🐓", img:"img/ginger-chicken-ham.webp", description: "ژامبون مرغ", tags: ["🌱 سبک", "💸 به‌صرفه", "🏃 سریع‌خور"],
      sizes:[{id:"150",label:"۱۵۰ گرم",price:95000},{id:"250",label:"۲۵۰ گرم",price:145000},{id:"350",label:"۳۵۰ گرم",price:170000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-chicken-run',
        soundId: 'ginjer-welcome',
        entrySoundId: 'ginjer-welcome',
        charImage: 'https://hayola.hornspeed.com/img/ginjer.webp',
        entryEffect: 'catapult-launch',
        bgGradient: 'radial-gradient(ellipse at bottom, #3a2d27 0%, #1a1412 80%)', // Muddy ground
        primaryTheme: '#d9534f', // Danger Red
        accentTheme: '#f0ad4e', // Warning Yellow/Orange
        glowTheme: '#d9534f',
        textColor: '#e2e8f0'
      }
    },
    { id:"mario-mushroom", name:"ماریو", emoji:"🍄", img:"img/mario-chicken-mushroom.webp", description: "مرغ و قارچ", tags: ["🍄 قارچی", "💛 محبوب", "💦 آبدار / 🧈 کرمی"],
      sizes:[{id:"150",label:"۱۵۰ گرم",price:95000},{id:"250",label:"۲۵۰ گرم",price:140000},{id:"350",label:"۳۵۰ گرم",price:165000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-mario',
        soundId: 'mario-sound',
        entrySoundId: 'mario-jump-sound',
        entryEffect: 'mario-bg',
        bgGradient: 'radial-gradient(circle at 90% 10%, #FBD00040, transparent 50%), radial-gradient(circle at 10% 90%, #E5252150, transparent 50%), #00539C',
        primaryTheme: '#FBD000',
        accentTheme: '#E52521',
        glowTheme: '#FBD000',
        charImage: 'img/mario.webp',
        textColor: '#e2e8f0'
      }
    },
    { id:"dragon-pepperoni", name:"دراگون", emoji:"🐉", img:"img/dragon-pepperoni.webp", description: "پپرونی", tags: ["🔥 آتیشی", "🌶 تندخو", "⭐️ پرفروش"],
      sizes:[{id:"150",label:"۱۵۰ گرم",price:90000},{id:"250",label:"۲۵۰ گرم",price:135000},{id:"350",label:"۳۵۰ گرم",price:160000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-dragon',
        entryEffect: 'fire',
        soundId: 'dragon-sound',
        bgGradient: 'radial-gradient(circle at 80% 90%, #D6282899, transparent 70%), radial-gradient(circle at 20% 20%, #F77F0088, transparent 50%), #050101',
        primaryTheme: '#FCBF49',
        accentTheme: '#F77F00',
        glowTheme: '#D62828',
        charImage: 'img/dragon.webp',
        textColor: '#e2e8f0'
      }
    },
    { id:"oscar-mortadella", name:"اسکار", emoji:"🏆", img:"img/oscar-mortadella60.webp", description: "مارتادلا اقتصادی", tags: ["🧮 اقتصادی", "💸 به‌صرفه", "🌱 سبک"],
      sizes:[{id:"150",label:"۱۵۰ گرم",price:75000},{id:"250",label:"۲۵۰ گرم",price:110000},{id:"350",label:"۳۵۰ گرم",price:130000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-oscar',
        soundId: 'oscar-sound',
        entrySoundId: 'oscar-sound',
        charImage: 'https://hayola.hornspeed.com/img/Oscar.webp',
        entryEffect: 'oscar-peek',
        bgGradient: 'linear-gradient(to top, #f9d423 0%, #f4791f 100%)', // Sunset gradient
        primaryTheme: '#2193b0', // Oasis Blue
        accentTheme: '#6dd5ed', // Lighter Blue
        glowTheme: '#f9d423',   // Sand Gold
        textColor: '#2c3e50'
      }
    },
    { id:"panda-zhigo", name:"پاندا کونگ فو کار", emoji:"🐼", img:"img/panda-zhigu-beef90.webp", description: "گوشت مخصوص ۹۰٪", tags: ["✨ خاص", "⭐️ پرفروش", "🥊 سنگین"],
      sizes:[{id:"150",label:"۱۵۰ گرم",price:110000},{id:"250",label:"۲۵۰ گرم",price:170000},{id:"350",label:"۳۵۰ گرم",price:200000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-kungfu-panda',
        soundId: 'panda-sound',
        entrySoundId: 'panda-sound',
        charImage: 'https://hayola.hornspeed.com/img/panda.webp',
        entryEffect: 'dragon-scroll-reveal',
        bgGradient: 'radial-gradient(ellipse at 50% 50%, #fde68a 0%, #a16207 100%)',
        primaryTheme: '#b91c1c', // Red
        accentTheme: '#facc15', // Gold
        glowTheme: '#fde047',
        textColor: '#2c3e50'
      }
    },
    { id:"migmig-turkey", name:"میگ میگ", emoji:"💨", img:"https://hayola.hornspeed.com/img/mig-items.webp", description: "کالباس بوقلمون", tags: ["😋 خوشمزه"],
      sizes:[{id:"150",label:"۱۵۰ گرم",price:120000},{id:"250",label:"۲۵۰ گرم",price:200000},{id:"350",label:"۳۵۰ گرم",price:240000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-migmig',
        soundId: 'migmig-sound',
        entrySoundId: 'migmig-sound',
        charImage: 'https://hayola.hornspeed.com/img/mig-mig.webp',
        entryEffect: 'roadrunner-zip',
        bgGradient: 'linear-gradient(to top, #fca311, #e9c46a)',
        primaryTheme: '#00b4d8',
        accentTheme: '#f4a261',
        glowTheme: '#00b4d8',
        textColor: '#2c3e50'
      }
    },
    { id:"angry-birds-mix", name:"انگری بردز", emoji:"🐦", img:"img/angrybirds-mix.webp", description: "پپرونی، مارتا، قارچ و مرغ", tags: ["⭐️ پرفروش", "🍄 قارچی", "🌶 تندخو"],
      sizes:[{id:"300",label:"۳۰۰ گرم",price:165000},{id:"400",label:"۴۰۰ گرم",price:195000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-angry-birds',
        soundId: 'angry-launch-sound',
        entrySoundId: 'angry-welcome-sound',
        charImage: 'https://hayola.hornspeed.com/img/angry.webp',
        entryEffect: 'angry-birds-launch',
        bgGradient: 'linear-gradient(to bottom, #87CEEB 0%, #f0f8ff 100%)',
        primaryTheme: '#de3434', // Red Bird Red
        accentTheme: '#fbb424', // Yellow Bird Yellow
        glowTheme: '#de3434',
        textColor: '#2c3e50'
      }
    },
    { id:"patmat-mix", name:"پت و مت", emoji:"🧑‍🤝‍🧑", img:"img/patmat-chicken-beef90.webp", description: "مرغ و گوشت ۹۰٪", tags: ["✨ ترکیبی", "😋 سیرکن", "🍖 پروتئین‌بمب"],
      sizes:[{id:"250",label:"۲۵۰ گرم",price:165000},{id:"350",label:"۳۵۰ گرم",price:195000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-pat-mat',
        soundId: 'pat-mat-sound',
        entrySoundId: 'pat-mat-sound',
        charImage: 'https://hayola.hornspeed.com/img/pat-mat.webp',
        entryEffect: 'pat-mat-workshop',
        bgGradient: 'radial-gradient(circle at 10% 20%, rgba(239, 68, 68, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 90%, rgba(251, 191, 36, 0.2) 0%, transparent 50%), #3B82F6',
        primaryTheme: '#EF4444', // Red
        accentTheme: '#FBBF24', // Yellow
        glowTheme: '#3B82F6',      // Blue
        textColor: '#e2e8f0'
      }
    },
    { id:"tweety-smoked", name:"تویی تی", emoji:"🐤", img:"img/tweety-smoked-chicken.webp", description: "سینه مرغ چیکوتا اسموکی", tags: ["🥓 دودی", "✨ خاص", "💦 آبدار"],
      sizes:[{id:"250",label:"۲۵۰ گرم",price:220000},{id:"350",label:"۳۵۰ گرم",price:260000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-tweety',
        soundId: 'tweety-sound',
        entrySoundId: 'tweety-welcome-sound',
        charImage: 'https://hayola.hornspeed.com/img/tweety.webp',
        entryEffect: 'feather-shower',
        bgGradient: 'linear-gradient(to bottom, #87CEEB 0%, #f0f8ff 100%)',
        primaryTheme: '#FFD700',
        accentTheme: '#FFFFFF',
        glowTheme: '#FFD700',
        textColor: '#2c3e50'
      }
    },
    { id:"olivieh", name:"سالاد الویه", emoji:"🥗", img:"img/olivieh-sandwich.webp", description: "تازه و خوشمزه", tags: ["💸 به‌صرفه"],
      sizes:[{id:"mini",label:"مینی",price:30000},{id:"single",label:"یک‌نفره",price:60000}],
      extra:{step:50, unitPrice:0}, customizable:false,
      theme: {
        className: 'theme-olivieh',
        soundId: 'olvie-sound',
        entrySoundId: 'olvie-sound',
        charImage: 'https://hayola.hornspeed.com/img/olvie.webp',
        entryEffect: 'olivieh-ingredients',
        bgGradient: 'linear-gradient(to bottom, #fefae0, #e9edc9)',
        primaryTheme: '#588157',
        accentTheme: '#a3b18a',
        glowTheme: '#fefae0',
        textColor: '#2c3e50'
      }
    },
  ];

  const DRINKS = [
    { id:"water", name:"آب کوچک", price:9000, img:"img/drink-water-small.webp" },
    { id:"doogh", name:"دوغ تک نفره", price:26000, img:"img/drink-doogh-single.webp" },
    { id:"lemonade", name:"لیموناد شیشه", price:38000, img:"img/drink-lemonade-bottle.webp" },
    { id:"malt", name:"ماالشعیر", price:45000, img:"img/drink-malt-can.webp" },
    { id:"soda-pet", name:"نوشابه تک نفره", price:24000, img:"img/drink-soda-pet.webp" },
    { id:"soda-family", name:"نوشابه خانواده", price:57000, img:"img/drink-soda-family-1_5L.webp" },
  ];

  const FREE = [
    { id:"pickle", label:"خیارشور" },
    { id:"potato", label:"سیب‌زمینی" },
    { id:"greens", label:"کاهو و سبزی" },
    { id:"tomato", label:"گوجه" },
  ];
  const SAUCES = [
    { id:"mayo", label:"مایونز" },
    { id:"ketchup", label:"کچاپ" },
    { id:"mustard", label:"خردل" },
    { id:"special", label:"سس ویژه" },
  ];
  const LEVELS = [
    { id:-1, label:"نریزید" }, { id:0, label:"کم" }, { id:1, label:"عادی" }, { id:2, label:"زیاد" },
  ];

  const el = (sel, root=document)=> root.querySelector(sel);
  const els = (sel, root=document)=> Array.from(root.querySelectorAll(sel));
  const fmt = n => (n||0).toLocaleString("fa-IR") + " تومان";
  const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const vibrate = ms => { try{ navigator.vibrate && navigator.vibrate(ms||12); }catch(e){} };
  const play = id => { try{ const a = el('#'+id); if(a){ a.currentTime=0; a.play(); } }catch(e){} };

  let shootingStarInterval = null;
  function launchShootingStar() {
    const themeBgEffects = el("#theme-bg-effects");
    if (!themeBgEffects) return;

    const star = document.createElement('div');
    star.className = 'shooting-star';

    const startX = Math.random() * 100;
    const startY = Math.random() * 60;
    const length = 100 + Math.random() * 150;
    const angle = -15 + Math.random() * -45;

    star.style.top = startY + 'vh';
    star.style.left = startX + 'vw';
    star.style.width = length + 'px';
    star.style.transform = `translateX(0) rotate(${angle}deg)`;

    themeBgEffects.appendChild(star);

    setTimeout(() => {
      star.style.opacity = '1';
      star.style.transform = `translateX(30vw) rotate(${angle}deg)`;
    }, 100);

    setTimeout(() => {
      star.remove();
    }, 2000);
  }

  function manageShootingStars() {
    if (shootingStarInterval) clearTimeout(shootingStarInterval);

    const nextLaunch = () => {
      launchShootingStar();
      const delay = 3000 + Math.random() * 7000;
      shootingStarInterval = setTimeout(nextLaunch, delay);
    };
    shootingStarInterval = setTimeout(nextLaunch, 1000); // First one fires quickly
  }

  let featherInterval = null;
  function createFeather() {
    const themeFgEffects = el("#theme-fg-effects");
    if (!themeFgEffects) return;

    const feather = document.createElement('div');
    feather.className = 'feather-particle';

    const startX = Math.random() * 100;
    const duration = 4 + Math.random() * 4;
    const delay = Math.random() * 5;

    feather.style.left = startX + 'vw';
    feather.style.animationDuration = duration + 's';
    feather.style.animationDelay = delay + 's';

    themeFgEffects.appendChild(feather);

    setTimeout(() => {
      feather.remove();
    }, (duration + delay) * 1000);
  }

  function manageFeathers() {
    if (featherInterval) clearInterval(featherInterval);
    featherInterval = setInterval(createFeather, 800);
  }

  let oliviehInterval = null;
  function createOliviehParticle() {
    const themeBgEffects = el("#theme-bg-effects");
    if (!themeBgEffects) return;

    const particle = document.createElement('div');
    particle.className = 'olivieh-particle';

    const size = 8 + Math.random() * 8;
    const colors = ['#fca311', '#c2c5aa', '#e5e5e5', '#8fbc8f']; // potato, carrot, egg-white, pickle
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${5 + Math.random() * 5}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;

    themeBgEffects.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 10000);
  }

  function manageOliviehEffect() {
    if (oliviehInterval) clearInterval(oliviehInterval);
    oliviehInterval = setInterval(createOliviehParticle, 300);
  }

  function manageRoadRunnerEffect() {
    const themeBgEffects = el("#theme-bg-effects");
    const themeFgEffects = el("#theme-fg-effects");
    if (!themeBgEffects || !themeFgEffects) return;

    themeBgEffects.innerHTML += '<div class="desert-road"></div>';

    const dustCloud = document.createElement('div');
    dustCloud.className = 'dust-cloud';
    themeFgEffects.appendChild(dustCloud);

    dustCloud.addEventListener('animationend', () => {
      dustCloud.remove();
    }, { once: true });
  }

  // State
  const state = {
    step:0,
    isHappy:false, countdown:"", nextCountdown:"",
    selectedId: null,
    sizeId: null,
    freeLevels: Object.fromEntries(FREE.map(f=>[f.id,1])),
    sauceLevels: Object.fromEntries(SAUCES.map(s=>[s.id,1])),
    extraGrams: 0,
    cheeseSlices: 0,
    takeawaySauces: 0,
    drinks: Object.fromEntries(DRINKS.map(d=>[d.id,0])),
    cart: [],
    orderSeq: ORDER_START-1,
    submitted: false,
    checkoutItems: []
  };

  // Daily order reset
  function initOrderSeq(){
    try{
      const today = new Date().toISOString().slice(0,10);
      const day = localStorage.getItem('hy_day')||'';
      let seq = Number(localStorage.getItem('hy_seq')||String(ORDER_START-1))||0;
      if(day!==today){ seq = ORDER_START-1; localStorage.setItem('hy_day', today); }
      state.orderSeq = seq;
    }catch(e){}
  }
  initOrderSeq();

  function selectedItem(){ return MENU.find(m=>m.id===state.selectedId) || MENU[0]; }
  function selectedSize(){ const it = selectedItem(); return it.sizes.find(s=>s.id===state.sizeId) || it.sizes[0]; }

  const defaultTheme = {
    bgGradient: 'radial-gradient(1200px 700px at 80% -10%, #0b3b2c 0%, transparent 60%), radial-gradient(1000px 600px at -10% 0%, #0b2355 0%, transparent 60%), linear-gradient(180deg, #0b1020, #0b1324)',
    primaryTheme: '#0ee3a8',
    accentTheme: '#6b8afd',
    glowTheme: '#a78bfa',
    textColor: '#e2e8f0',
  };

  function stopAllThemeSounds() {
    const themeSoundIds = [
      'naghola-sound', 'naghola-welcome-sound',
      'hulk-sound', 'hulk-smash-sound',
      'mario-sound', 'mario-jump-sound',
      'dragon-sound',
      'tweety-sound', 'tweety-welcome-sound',
      'pat-mat-sound',
      'angry-welcome-sound', 'angry-launch-sound',
      'panda-sound',
      'oscar-sound',
      'olvie-sound',
      'migmig-sound',
      'ginjer-welcome',
      'big-sound',
      'sal-sound',
      'special-sound'
    ];
    themeSoundIds.forEach(id => {
      const audio = el('#' + id);
      if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }

  function applyTheme(item) {
    const themeCharImage = el("#theme-char-image");
    if (themeCharImage) {
        const allAnimationClasses = [
            'visible', 'mario-entry', 'hulk-entry', 'naghola-entry', 'tweety-entry',
            'tweety-swinging', 'pat-mat-entry', 'pat-mat-idle', 'panda-entry',
            'oscar-peek', 'catapult-launch', 'animation-done', 'bigfoot-sighting',
            'door-entrance'
        ];
        themeCharImage.classList.remove(...allAnimationClasses);
    }

    stopAllThemeSounds(); // Stop all sounds before applying a new theme

    const body = document.body;
    body.classList.add('theme-transition');

    if (shootingStarInterval) clearTimeout(shootingStarInterval);
    els('.shooting-star').forEach(s => s.remove());
    if (featherInterval) clearInterval(featherInterval);
    els('.feather-particle').forEach(f => f.remove());
    if (oliviehInterval) clearInterval(oliviehInterval);
    els('.olivieh-particle').forEach(p => p.remove());
    els('.desert-road, .dust-cloud').forEach(e => e.remove());

    setTimeout(() => {
      const theme = item && item.theme ? item.theme : defaultTheme;
      const themeCharImage = el("#theme-char-image");
      const themeBgEffects = el("#theme-bg-effects");
      const themeFgEffects = el("#theme-fg-effects");

      // Cleanup previous theme classes
      const themeClasses = (body.className.match(/theme-\S+/g) || []);
      themeClasses.forEach(cls => {
        if(cls !== 'theme-transition') body.classList.remove(cls)
      });

      // Apply new theme class if it exists
      if (theme.className) {
        body.classList.add(theme.className);
      }

      body.style.setProperty('--bg-theme', theme.bgGradient);
      body.style.setProperty('--primary-theme', theme.primaryTheme);
      body.style.setProperty('--accent-theme', theme.accentTheme);
      body.style.setProperty('--glow-theme', theme.glowTheme);
      body.style.setProperty('--text-theme-color', theme.textColor);

      // Handle character image
      let charHtml = '';
      if (theme.charImage) {
        // The Oscar peek animation requires a special container structure
        if (theme.entryEffect === 'oscar-peek') {
          charHtml = `<div class="oscar-character-container"><img src="${theme.charImage}" alt="Oscar"></div>`;
        } else {
          charHtml = `<img src="${theme.charImage}" alt="">`;
        }
      }
      themeCharImage.innerHTML = charHtml;

      // Handle background and foreground effects
      let bgHtml = '';
      let fgHtml = '';

      if (theme.className === 'theme-naghola') {
        fgHtml += '<div class="spotlight"></div>';
        bgHtml += '<div class="moon"></div>';
        bgHtml += '<div class="ground-hill back"></div><div class="ground-hill"></div>';
        bgHtml += '<div class="fence"></div>';
        // Generate starry night background (twinkling stars only)
        for (let i = 0; i < 100; i++) {
          const size = 1 + Math.random() * 2;
          const top = Math.random() * 60;
          const left = Math.random() * 100;
          const duration = 1 + Math.random() * 3;
          const delay = Math.random() * 5;
          const color = Math.random() > 0.3 ? 'white' : '#FFD700';
          bgHtml += `<div class="star" style="width: ${size}px; height: ${size}px; top: ${top}%; left: ${left}%; background: ${color}; animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>`;
        }
        // Start the shooting star controller
        manageShootingStars();
      }
      if (theme.entryEffect === 'fire') {
        bgHtml += `<div class="dragon-fire"></div>`;
        for (let i = 0; i < 3; i++) { bgHtml += `<div class="dragon-breath-effect" style="animation-delay: ${i * 1.5}s"></div>`; }
        for (let i = 0; i < 20; i++) {
          const duration = 5 + Math.random() * 8;
          const delay = Math.random() * 10;
          const left = Math.random() * 100;
          bgHtml += `<div class="ember" style="left: ${left}vw; animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>`;
        }
      }
      if (theme.entryEffect === 'mario-bg' || theme.className === 'theme-tweety') {
        // Re-use mario clouds for tweety, with styles in CSS to differentiate
        bgHtml += `
          <div class="mario-cloud" style="top: 10%; animation-duration: 45s;"></div>
          <div class="mario-cloud" style="top: 25%; left: 20vw; animation-duration: 30s; animation-delay: -5s; transform: scale(0.8);"></div>
          <div class="mario-cloud" style="top: 5%; left: 70vw; animation-duration: 40s; animation-delay: -2s; transform: scale(1.2);"></div>
        `;
        if (theme.entryEffect === 'mario-bg') {
          bgHtml += '<div class="mario-pipe"></div>';
        }
      }
      if (theme.entryEffect === 'hulk-smash') {
        bgHtml += '<div class="crack-overlay"></div>';
        const originX = 80; const originY = 60;
        for (let i = 0; i < 80; i++) {
          const duration = 8 + Math.random() * 4;
          const delay = Math.random() * 0.5;
          const angle = Math.random() * 2 * Math.PI;
          const distance = 50 + Math.random() * 50;
          const destX = distance * Math.cos(angle);
          const destY = distance * Math.sin(angle);
          const rotation = Math.random() * 360;
          const transformVar = `translate(${destX}vw, ${destY}vh) rotate(${rotation}deg)`;
          const startTop = originY + (Math.random() - 0.5) * 10;
          const startLeft = originX + (Math.random() - 0.5) * 10;
          const isPersistent = Math.random() < 0.15;
          const animationName = isPersistent ? 'gamma-persist' : 'gamma-burst';
          bgHtml += `<div class="gamma-particle" style="top: ${startTop}vh; left: ${startLeft}vw; --transform-to: ${transformVar}; animation-name: ${animationName}; animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>`;
        }
      }
      if (theme.entryEffect === 'pat-mat-workshop') {
        // --- Foreground effects ---
        // 1. The wall, constructed from multiple planks for the explosion effect
        let wallHtml = '<div class="pat-mat-wall-container">';
        for (let i = 0; i < 30; i++) { // Create 30 planks
          wallHtml += `<div class="wall-plank" style="--i: ${i};"></div>`;
        }
        wallHtml += '</div>';
        fgHtml += wallHtml;

        // 2. The dynamic elements, now in the foreground for visibility
        fgHtml += '<div class="blinking-light"></div>';
        fgHtml += '<div class="fluttering-blueprint" style="top: 10%; left: 5%; transform: rotate(-15deg);"></div>';
        fgHtml += '<div class="fluttering-blueprint" style="top: 50%; left: 85%; transform: rotate(20deg); animation-delay: -2s;"></div>';

        // --- Background effects ---
        // The blueprint grid remains in the background
        bgHtml += '<div class="blueprint-grid"></div>';
      }
      if (theme.entryEffect === 'angry-birds-launch') {
        // Background elements
        bgHtml += `
          <div class="mario-cloud" style="top: 10%; left: 10%; animation-duration: 50s;"></div>
          <div class="mario-cloud" style="top: 30%; left: 80%; animation-duration: 35s; transform: scale(1.2);"></div>
          <div class="mario-cloud" style="top: 20%; left: 40%; animation-duration: 40s; transform: scale(0.8);"></div>
          <div class="ab-hills ab-hill-1"></div>
          <div class="ab-hills ab-hill-2"></div>
          <div class="pig-structure">
            <div class="wood-block" style="top: 0; left: 10px; transform: rotate(90deg);"></div>
            <div class="wood-block" style="top: 0; left: 70px; transform: rotate(90deg);"></div>
            <div class="wood-block" style="top: 40px; left: 40px;"></div>
          </div>
          <div class="peeking-pig"></div>
        `;
        // Foreground elements for the animation
        fgHtml += `
          <div class="slingshot">
            <div class="slingshot-band"></div>
            <div class="launched-bird"></div>
          </div>
          <div class="foreground-grass"></div>
        `;
      }
      if (theme.entryEffect === 'dragon-scroll-reveal') {
        fgHtml += '<div class="dragon-scroll"></div>';
        // Add falling petals to the foreground
        for (let i = 0; i < 20; i++) {
          const delay = Math.random() * 5;
          const duration = 5 + Math.random() * 5;
          const left = Math.random() * 100;
          fgHtml += `<div class="petal" style="left: ${left}vw; animation-delay: ${delay}s; animation-duration: ${duration}s;"></div>`;
        }

        bgHtml += `
          <div class="kf-mountain kf-mountain-1"></div>
          <div class="kf-mountain kf-mountain-2"></div>
          <div class="kf-mountain kf-mountain-3"></div>
          <div class="bamboo-forest">
            <div class="bamboo-stalk" style="left: 10%; height: 60%;"><div class="bamboo-leaf" style="top: 20%;"></div><div class="bamboo-leaf" style="top: 40%;"></div></div>
            <div class="bamboo-stalk" style="left: 30%; height: 80%;"><div class="bamboo-leaf" style="top: 30%;"></div></div>
            <div class="bamboo-stalk" style="left: 70%; height: 70%;"><div class="bamboo-leaf" style="top: 25%;"></div><div class="bamboo-leaf" style="top: 50%;"></div></div>
            <div class="bamboo-stalk" style="left: 90%; height: 50%;"><div class="bamboo-leaf" style="top: 35%;"></div></div>
          </div>
          <div class="floating-lantern" style="top: 20%; left: 15%; animation-duration: 8s;"></div>
          <div class="floating-lantern" style="top: 40%; left: 80%; animation-duration: 6s;"></div>
        `;
      }
       if (theme.entryEffect === 'golden-shower') {
        for (let i = 0; i < 50; i++) {
          const duration = 2 + Math.random() * 3;
          const delay = Math.random() * 2;
          const left = Math.random() * 100;
          bgHtml += `<div class="golden-particle" style="left: ${left}vw; animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>`;
        }
      }
      if (theme.className === 'theme-oscar') {
        // Add CSS-based cactus to the foreground
        fgHtml += '<div class="cactus cactus-1"></div>';

        // Add twinkling stars to the background
        for (let i = 0; i < 100; i++) {
          const size = 1 + Math.random() * 2;
          const top = Math.random() * 50; // Only in the upper half (sky)
          const left = Math.random() * 100;
          const duration = 1.5 + Math.random() * 3;
          const delay = Math.random() * 5;
          bgHtml += `<div class="oscar-star" style="width: ${size}px; height: ${size}px; top: ${top}%; left: ${left}%; animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>`;
        }
        // Add heat haze effect
        bgHtml += '<div class="heat-haze-overlay"></div>';
      }
      if (theme.className === 'theme-chicken-run') {
        fgHtml += '<div class="wooden-fence"></div>';
        bgHtml += '<div class="searchlight"></div>';
        // Add some stealthy chickens in the background
        for (let i = 0; i < 3; i++) {
          const delay = Math.random() * 5;
          const left = 10 + Math.random() * 80;
          fgHtml += `<div class="stealthy-chicken" style="left: ${left}%; animation-delay: ${delay}s;"></div>`;
        }
      }
      if (theme.className === 'theme-bigfoot') {
        bgHtml += '<div class="forest-layer forest-layer-1"></div>';
        bgHtml += '<div class="forest-layer forest-layer-2"></div>';
        fgHtml += '<div class="mist-overlay"></div>';
        // Add some glowing eyes
        for (let i = 0; i < 5; i++) {
          const top = 30 + Math.random() * 40;
          const left = 10 + Math.random() * 80;
          const delay = Math.random() * 5;
          const duration = 3 + Math.random() * 4;
          fgHtml += `<div class="glowing-eyes" style="top: ${top}%; left: ${left}%; animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>`;
        }
      }
      if (theme.className === 'theme-monsters-inc') {
        bgHtml += '<div class="scare-floor"></div>';
        fgHtml += '<div class="floor-warning-stripes"></div>';
        // Add some scream canisters
        for (let i = 0; i < 4; i++) {
          const bottom = 5 + Math.random() * 10;
          const left = 5 + (i * 20) + Math.random() * 10;
          const delay = Math.random() * 4;
          bgHtml += `<div class="scream-canister" style="left: ${left}%; bottom: ${bottom}vh; --delay: ${delay}s;"></div>`;
        }
      }
      themeBgEffects.innerHTML = bgHtml;
      themeFgEffects.innerHTML = fgHtml;

      // Set visibility and trigger entry animations
      if (theme.charImage) {
        themeCharImage.classList.add('visible');
        play(theme.entrySoundId);

        const img = el('img', themeCharImage);
        if (theme.className === 'theme-mario') {
          themeCharImage.classList.add('mario-entry');
          img && img.addEventListener('animationend', () => themeCharImage.classList.remove('mario-entry'), { once: true });
        }
        if (theme.entryEffect === 'hulk-smash') {
          const appRoot = el('.app-root');
          appRoot.classList.add('screen-shaking');
          themeCharImage.classList.add('hulk-entry');
          img && img.addEventListener('animationend', () => themeCharImage.classList.remove('hulk-entry'), { once: true });
          appRoot.addEventListener('animationend', () => appRoot.classList.remove('screen-shaking'), { once: true });
        }
        if (theme.className === 'theme-naghola') {
          themeCharImage.classList.add('naghola-entry');
          img && img.addEventListener('animationend', () => {
            themeCharImage.classList.remove('naghola-entry');
            const spotlight = el('.spotlight', themeFgEffects);
            if (spotlight) {
              const rect = img.getBoundingClientRect();
              const x = rect.left + rect.width / 2;
              const y = rect.bottom - rect.height * 0.1; // Position under the feet
              spotlight.style.left = x + 'px';
              spotlight.style.top = y + 'px';
              spotlight.style.opacity = '1';
            }
          }, { once: true });
        }
        if (theme.className === 'theme-tweety') {
          manageFeathers();
          themeCharImage.classList.add('tweety-entry');
          img && img.addEventListener('animationend', () => {
            themeCharImage.classList.remove('tweety-entry');
            themeCharImage.classList.add('tweety-swinging');
          }, { once: true });
        }
        if (theme.className === 'theme-olivieh') {
          manageOliviehEffect();
        }
        if (theme.className === 'theme-migmig') {
          manageRoadRunnerEffect();
        }
        if (theme.className === 'theme-pat-mat') {
          themeCharImage.classList.add('pat-mat-entry');
          img && img.addEventListener('animationend', () => {
            themeCharImage.classList.remove('pat-mat-entry');
            themeCharImage.classList.add('pat-mat-idle');
          }, { once: true });
        }
        if (theme.className === 'theme-angry-birds') {
          // The actual character image is hidden, the animation is done by fg elements
          themeCharImage.style.opacity = 0;
          const launchedBird = el('.launched-bird');
          launchedBird && launchedBird.addEventListener('animationend', () => {
            // When the launch animation finishes, show the real image in its final spot
            themeCharImage.style.opacity = 0.8;
          }, { once: true });
        }
        if (theme.className === 'theme-kungfu-panda') {
          themeCharImage.classList.add('panda-entry');
          // The animation is now on the image. Once it ends, we remove the entry class.
          // The idle state is the default for a visible panda, defined in the new CSS.
          img && img.addEventListener('animationend', (e) => {
            // Check for the specific animation to avoid conflicts with other animations on the image
            if (e.animationName === 'panda-ink-reveal') {
              themeCharImage.classList.remove('panda-entry');
            }
          }, { once: true });
        }
        if (theme.entryEffect === 'oscar-peek') {
          themeCharImage.classList.add('oscar-peek');
          // The animation is on the img tag itself
          const animatedImg = el('img', themeCharImage);
          animatedImg && animatedImg.addEventListener('animationend', () => {
            themeCharImage.classList.remove('oscar-peek');
          }, { once: true });
        }
        if (theme.entryEffect === 'catapult-launch') {
          const projectile = document.createElement('div');
          projectile.className = 'catapult-projectile';
          themeFgEffects.appendChild(projectile);
          themeCharImage.classList.add('catapult-launch');
          projectile.addEventListener('animationend', () => {
            projectile.remove();
            themeCharImage.classList.add('animation-done');
          }, { once: true });
        }
        if (theme.entryEffect === 'bigfoot-sighting') {
          const shadow = document.createElement('div');
          shadow.className = 'bigfoot-shadow';
          themeFgEffects.appendChild(shadow);
          themeCharImage.classList.add('bigfoot-sighting'); // Hides the main image

          shadow.addEventListener('animationend', () => {
            shadow.remove();
            const footprint = document.createElement('div');
            footprint.className = 'footprint';
            themeFgEffects.appendChild(footprint);
            footprint.addEventListener('animationend', () => footprint.remove(), { once: true });

            setTimeout(() => {
                themeCharImage.classList.remove('bigfoot-sighting');
            }, 1500);
          }, { once: true });
        }
        if (theme.entryEffect === 'door-entrance') {
          const door = document.createElement('div');
          door.className = 'closet-door';
          themeFgEffects.appendChild(door);
          themeCharImage.classList.add('door-entrance');
          const appRoot = el('.app-root');

          door.addEventListener('animationend', () => {
            door.remove();
            themeCharImage.classList.remove('door-entrance');
          }, { once: true });

          setTimeout(() => {
            appRoot.classList.add('roar-shake');
            appRoot.addEventListener('animationend', () => {
              appRoot.classList.remove('roar-shake');
            }, { once: true });
          }, 1800);
        }
      } else {
        themeCharImage.classList.remove('visible');
      }

      body.classList.remove('theme-transition');
    }, 300);
  }

  function resetCustomizations(){
    state.extraGrams = 0;
    state.cheeseSlices = 0;
    state.takeawaySauces = 0;
    state.freeLevels = Object.fromEntries(FREE.map(f=>[f.id,1]));
    state.sauceLevels = Object.fromEntries(SAUCES.map(s=>[s.id,1]));
    state.drinks = Object.fromEntries(DRINKS.map(d=>[d.id,0]));
  }


  // Happy hour ticker
  function updateHappy(){
    const now = new Date();
    const s = new Date(); s.setHours(DISCOUNT.startHour,0,0,0);
    const e = new Date(); e.setHours(DISCOUNT.endHour,0,0,0);
    const active = now>=s && now<e;
    state.isHappy = active;
    const toHH = (ms)=>{ const h=Math.floor(ms/3600000), m=Math.floor((ms%3600000)/60000), sec=Math.floor((ms%60000)/1000); return h>0? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` : `${m}:${String(sec).padStart(2,'0')}`; };
    if(active){ state.countdown = toHH(e-now); state.nextCountdown=""; }
    else{
      let nx = s; if(now>=e){ nx = new Date(now); nx.setDate(now.getDate()+1); nx.setHours(DISCOUNT.startHour,0,0,0); }
      state.nextCountdown = toHH(nx-now); state.countdown="";
    }
    updateTimer();
  }
  setInterval(updateHappy, 1000);
  updateHappy();

  // Price calc
  function prices(){
    const it = selectedItem(), sz = selectedSize();
    const base = sz.price;
    const extraSteps = it.extra.unitPrice>0 ? Math.floor(state.extraGrams / it.extra.step) : 0;
    const extraPrice = extraSteps * it.extra.unitPrice;
    const cheesePrice = (state.cheeseSlices || 0) * CHEESE_PRICE;
    const saucePrice = (state.takeawaySauces || 0) * SAUCE_PRICE;
    const drinksPrice = Object.entries(state.drinks).reduce((s,[id,q])=>{
      const d = DRINKS.find(x=>x.id===id); return s + (d? d.price*q : 0);
    }, 0);
    const subtotal = base + extraPrice + cheesePrice + drinksPrice + saucePrice;
    const total = state.isHappy ? Math.round(subtotal * (1 - DISCOUNT.percent)) : subtotal;
    const cartTotal = state.cart.reduce((s,i)=>s+(i.total||0),0);
    return { base, extraSteps, extraPrice, cheesePrice, saucePrice, drinksPrice, subtotal, total, cartTotal };
  }

  function renderExtraViz(it) {
    if (!it || !it.extra || it.extra.unitPrice <= 0) return '';
    const count = Math.floor(state.extraGrams / it.extra.step);
    const imageUrl = 'https://hayola.hornspeed.com/img/extera-kalbas.webp';

    return `
      <div class="extra-viz-container">
        ${[...Array(count)].map(() =>
          `<img src="${imageUrl}" class="extra-item-img" alt="کالباس اضافه"/>`
        ).join('')}
      </div>
    `;
  }

  function generateSandwichSVG(item) {
    const colors = {
      bread: '#C68642', meat: '#E0B0B0', pickle: '#556B2F',
      potato: '#F0E68C', greens: '#4F7942', tomato: '#FF6347',
      mayo: '#FFFFF0', ketchup: '#BF1D1D', mustard: '#FFDB58', special: '#FF8C69',
      olivieh: '#F5F5DC'
    };
    let layers = [];
    let y = 10;

    const addLayer = (color, height, options = {}) => {
      const { isWavy = false, isBumpy = false, rx = 8, ry = 8 } = options;
      if(height <= 0) return;
      if (isBumpy) {
        layers.push(`<path d="M10,${y} C20,${y-5},40,${y-5},50,${y} S70,${y+5},90,${y} V${y+height} C80,${y+height+5},60,${y+height+5},50,${y+height} S30,${y+height-5},10,${y+height} Z" fill="${color}" />`);
      } else if (isWavy) {
        layers.push(`<path d="M 10 ${y+height/2} C 30 ${y}, 70 ${y+height}, 90 ${y+height/2}" stroke="${color}" fill="none" stroke-width="${height}" stroke-linecap="round" />`);
      } else {
        layers.push(`<rect x="10" y="${y}" width="80" height="${height}" fill="${color}" rx="${rx}" ry="${ry}" />`);
      }
      y += height + 2;
    };

    // Special case for Olivieh
    if (item.id === 'olivieh') {
      addLayer(colors.bread, 20, {rx: 10, ry: 10});
      addLayer(colors.olivieh, 35, {isBumpy: true});
      addLayer(colors.bread, 20, {rx: 10, ry: 10});
      return `<svg viewBox="0 0 100 ${y + 5}" width="100%" height="150">${layers.join('')}</svg>`;
    }

    // Default sandwich rendering
    addLayer(colors.bread, 20, {rx: 10, ry: 10});

    if (item.sauceLevels.special > 0) addLayer(colors.special, item.sauceLevels.special * 1.5, {isWavy: true});
    if (item.freeLevels.greens > 0) addLayer(colors.greens, item.freeLevels.greens * 2, {isWavy: true});
    if (item.freeLevels.pickle > 0) addLayer(colors.pickle, item.freeLevels.pickle * 2);
    addLayer(colors.meat, 15 + (item.extraGrams / 15), {ry: 3});
    if (item.freeLevels.tomato > 0) addLayer(colors.tomato, item.freeLevels.tomato * 3);
    if (item.freeLevels.potato > 0) addLayer(colors.potato, item.freeLevels.potato * 1.5);

    if (item.sauceLevels.ketchup > 0) addLayer(colors.ketchup, item.sauceLevels.ketchup * 1.5, {isWavy: true});
    if (item.sauceLevels.mayo > 0) addLayer(colors.mayo, item.sauceLevels.mayo * 1.5, {isWavy: true});
    if (item.sauceLevels.mustard > 0) addLayer(colors.mustard, item.sauceLevels.mustard * 1.5, {isWavy: true});

    addLayer(colors.bread, 20, {rx: 10, ry: 10});

    return `<svg viewBox="0 0 100 ${y + 5}" width="100%" height="150">${layers.join('')}</svg>`;
  }

  function snapshotCurrent(){
    const {base, extraPrice, drinksPrice, subtotal, total} = prices();
    return {
      id: Date.now()+Math.random(),
      name: selectedItem().name,
      sizeLabel: selectedSize().label,
      basePrice: base,
      extraGrams: state.extraGrams,
      extraPrice,
      cheeseSlices: state.cheeseSlices,
      takeawaySauces: state.takeawaySauces,
      drinks: {...state.drinks},
      drinksPrice,
      freeLevels:{...state.freeLevels},
      sauceLevels:{...state.sauceLevels},
      total
    };
  }

  function createCartItem(item) {
    if (!item) return null;
    const defaultSize = item.sizes[0];
    const basePrice = defaultSize.price;
    const total = state.isHappy ? Math.round(basePrice * (1 - DISCOUNT.percent)) : basePrice;

    return {
        id: Date.now() + Math.random(),
        name: item.name,
        sizeLabel: defaultSize.label,
        basePrice: basePrice,
        extraGrams: 0,
        extraPrice: 0,
        cheeseSlices: 0,
        takeawaySauces: 0,
        drinks: Object.fromEntries(DRINKS.map(d => [d.id, 0])),
        drinksPrice: 0,
        freeLevels: Object.fromEntries(FREE.map(f => [f.id, 1])), // Default levels
        sauceLevels: Object.fromEntries(SAUCES.map(s => [s.id, 1])), // Default levels
        total: total
    };
  }

  // Renderers
  const app = el("#app");
  app.innerHTML = [
    `<div id="header" class="no-print">
      <div class="sully-header">
        <img src="img/sp-sali.webp" alt="Happy Hour">
        <div class="timer-box"></div>
      </div>
     </div>`,
    '<div class="progress no-print"><div id="pbar" class="bar" style="width:0%"></div></div>',
    '<div id="content"></div>',
    '<div class="bottom no-print"><div id="bottom" class="inner"></div></div>',
    '<div id="modals"></div>'
  ].join("");

  function updateTimer() {
    const timerBox = el(".timer-box");
    const sullyHeader = el(".sully-header");
    if (!timerBox || !sullyHeader) return;

    timerBox.innerHTML = state.isHappy
      ? `<div class="line1">ساعت طلایی!</div><div class="timer">${state.countdown}</div><div class="line1">تا پایان تخفیف</div>`
      : `<div class="line1">شروع ساعت طلایی</div><div class="timer">${state.nextCountdown}</div><div class="line1">مانده تا تخفیف</div>`;

    if (state.isHappy) {
      sullyHeader.classList.add('sully-glowing');
    } else {
      sullyHeader.classList.remove('sully-glowing');
    }
  }

  function renderHeader() {
    const p = el("#pbar");
    if (p) {
      // The main flow has 6 steps (0 to 5). Step 6 is the final screen.
      const progress = state.step >= 5 ? 100 : ((state.step + 1) / 6) * 100;
      p.style.width = progress + "%";
    }
  }

  let isNavigating = false;

  function renderBottom() {
    const b = el("#bottom");
    if (state.step === 6) {
      b.innerHTML = ''; // Hide buttons on thank you screen
      return;
    }
    const { total, cartTotal } = prices();
    const drinksPrice = Object.entries(state.drinks).reduce((s, [id, q]) => { const d = DRINKS.find(x => x.id === id); return s + (d ? d.price * q : 0); }, 0);
    const orderTotal = cartTotal + total + drinksPrice;
    b.innerHTML = `
      <button class="btn" ${state.step === 0 ? 'disabled' : ''} id="prevBtn">قبلی</button>
      <button class="btn" id="cartBtn">سبد (${state.cart.length})</button>
      <div class="total-badge">${state.isHappy ? '<span class="muted">جمع سفارش (با تخفیف):</span>' : 'جمع سفارش:'} <b>${fmt(orderTotal)}</b></div>
      <button class="btn ${state.step >= 5 ? 'secondary' : 'primary'}" id="nextBtn">${state.step >= 5 ? 'پایان' : 'بعدی'}</button>
    `;
    el("#prevBtn") && el("#prevBtn").addEventListener("click", () => {
      if (isNavigating) return;
      let prev = state.step - 1;
      if (state.step === 4 && !selectedItem().customizable) prev = 1;
      state.step = Math.max(0, prev);
      render('backward');
    });
    el("#cartBtn").addEventListener("click", () => openCart());
    el("#nextBtn").addEventListener("click", () => {
      if (isNavigating) return;
      if (state.step === 0 && !state.selectedId) {
        alert('لطفا یک آیتم انتخاب کنید');
        return;
      }
      if (state.step === 1 && !state.sizeId) {
        alert('لطفا یک سایز انتخاب کنید');
        return;
      }
      let nxt = state.step + 1;
      if (nxt === 2 && !selectedItem().customizable) nxt = 4;
      state.step = Math.min(5, nxt);
      render('forward');
    });
  }

  function openCart() {
    const cartTotal = state.cart.reduce((sum, item) => sum + item.total, 0);
    const modalHTML = `
      <div class="modal" id="cartModal">
        <div class="card">
          <h2><span class="dot"></span> سبد خرید شما</h2>
          <div class="cart-items">
            ${state.cart.length === 0
              ? `<p>سبد خرید شما خالی است.</p>`
              : state.cart.map((item, index) => `
                <div class="cart-item">
                  <div class="item-info">
                    <b>${item.name}</b>
                    <small>${item.sizeLabel}</small>
                  </div>
                  <div class="item-price">${fmt(item.total)}</div>
                  <button class="btn-remove" data-remove-index="${index}">×</button>
                </div>
              `).join('')
            }
          </div>
          <div class="divider"></div>
          <div class="cart-total">
            <span>جمع کل سبد:</span>
            <b>${fmt(cartTotal)}</b>
          </div>
          <div class="cart-actions">
            <button class="btn" id="closeCartBtn">ادامه خرید</button>
            <button class="btn primary" id="checkoutBtn" ${state.cart.length === 0 ? 'disabled' : ''}>پرداخت نهایی</button>
          </div>
        </div>
      </div>
    `;

    el("#modals").innerHTML = modalHTML;

    // Event Listeners
    el("#closeCartBtn").addEventListener("click", () => {
      el("#modals").innerHTML = '';
    });

    el("#checkoutBtn").addEventListener("click", () => {
      el("#modals").innerHTML = '';
      state.step = 5;
      render('forward');
    });

    els(".btn-remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const indexToRemove = parseInt(e.currentTarget.getAttribute('data-remove-index'), 10);
        state.cart.splice(indexToRemove, 1);
        play('ding');
        openCart(); // Re-render the cart modal
        renderBottom(); // Update the cart count in the footer
      });
    });
  }

  function openReceipt() {
    const receiptHTML = `
      <div class="receipt">
        <div class="receipt-header">
          <h1 class="center big">${BRAND.name}</h1>
          <p class="center">${BRAND.tagline}</p>
          <div class="cut"></div>
          <p>شماره سفارش: ${state.orderSeq}</p>
          <p>تاریخ: ${new Date().toLocaleString('fa-IR')}</p>
          <div class="cut"></div>
        </div>
        <div class="receipt-items">
          ${state.checkoutItems.map(item => {
            // Paid extras
            let details = [
              item.extraGrams > 0 ? `${item.extraGrams} گرم اضافه` : null,
              item.cheeseSlices > 0 ? `${item.cheeseSlices} پنیر اضافه` : null,
              item.takeawaySauces > 0 ? `${item.takeawaySauces} سس بیرون‌بر` : null,
            ].filter(Boolean);

            // Free customizations that differ from default
            if (item.freeLevels) {
              Object.entries(item.freeLevels).forEach(([id, level]) => {
                if (level !== 1) { // 1 is 'normal'
                  const freebie = FREE.find(f => f.id === id);
                  const levelInfo = LEVELS.find(l => l.id === level);
                  if (freebie && levelInfo) {
                    details.push(`${freebie.label}: ${levelInfo.label}`);
                  }
                }
              });
            }

            // Sauce customizations that differ from default
            if (item.sauceLevels) {
              Object.entries(item.sauceLevels).forEach(([id, level]) => {
                if (level !== 1) {
                  const sauce = SAUCES.find(s => s.id === id);
                  const levelInfo = LEVELS.find(l => l.id === level);
                  if (sauce && levelInfo) {
                    details.push(`${sauce.label}: ${levelInfo.label}`);
                  }
                }
              });
            }

            const drinkDetails = Object.entries(item.drinks)
              .filter(([_, q]) => q > 0)
              .map(([id, q]) => {
                const drink = DRINKS.find(d => d.id === id);
                return `<div><span>${q} عدد ${drink.name}</span><span>${fmt(drink.price * q)}</span></div>`;
              }).join('');

            return `
              <div class="receipt-item">
                <div class="item-name">
                  <span><b>${item.name}</b> (${item.sizeLabel})</span>
                  <span>${fmt(item.basePrice)}</span>
                </div>
                ${details.length > 0 ? `<div class="item-details">${details.map(d => `<div>+ ${d}</div>`).join('')}</div>` : ''}
                ${drinkDetails ? `<div class="item-drinks">${drinkDetails}</div>` : ''}
              </div>
            `;
          }).join('<div class="item-divider"></div>')}
        </div>
        <div class="cut"></div>
        <div class="receipt-total">
          <div class="total-line">
            <span>جمع کل</span>
            <span>${fmt(state.checkoutItems.reduce((sum, item) => sum + item.total, 0))}</span>
          </div>
          ${state.isHappy ? `
            <div class="total-line happy">
              <span>تخفیف ساعت طلایی (${(DISCOUNT.percent * 100).toLocaleString('fa-IR')}٪)</span>
              <span>-${fmt(state.checkoutItems.reduce((sum, item) => sum + (item.total / (1-DISCOUNT.percent) * DISCOUNT.percent) , 0))}</span>
            </div>
            <div class="total-line grand-total">
              <span>مبلغ نهایی</span>
              <span>${fmt(state.checkoutItems.reduce((sum, item) => sum + item.total, 0))}</span>
            </div>
          ` : ''}
        </div>
        <div class="receipt-footer center">
          <p>از خرید شما متشکریم!</p>
        </div>
      </div>
    `;

    let printable = el('#printable-area');
    if (!printable) {
      printable = document.createElement('div');
      printable.id = 'printable-area';
      document.body.appendChild(printable);
    }
    printable.innerHTML = receiptHTML;
    el('#app').classList.add('no-print');
    printable.classList.add('print-only');
  }

  function bindStepEvents(contentElement) {
    const it = selectedItem();
    if (state.step === 0) {
      const handleThemeChange = debounce((card) => {
        state.selectedId = card.getAttribute("data-id");
        state.sizeId = null;
        if (card.classList.contains('quick-card')) {
          state.sizeId = selectedItem().sizes[0].id;
          resetCustomizations();
        }
        const item = selectedItem();
        applyTheme(item);
        const soundToPlay = card.classList.contains('quick-card') ? 'special-sound' : (item.theme?.soundId || "ding");
        play(soundToPlay);
        render('initial');
      }, 400);

      els(".quick-card, .menu-card", contentElement).forEach(card => {
        card.addEventListener("click", () => handleThemeChange(card));
      });

      els("button[data-quick-add]", contentElement).forEach(btn => {
        btn.addEventListener("click", e => {
          e.stopPropagation();
          const itemId = e.currentTarget.getAttribute("data-quick-add");
          const item = MENU.find(m => m.id === itemId);
          if (item) {
            const cartItem = createCartItem(item);
            if (cartItem) {
              state.cart.push(cartItem);
              play("success");
              renderBottom();
              e.currentTarget.innerHTML = '✓ اضافه شد';
              e.currentTarget.disabled = true;
              setTimeout(() => {
                e.currentTarget.innerHTML = 'افزودن سریع';
                e.currentTarget.disabled = false;
              }, 1500);
            }
          }
        });
      });
    } else if (state.step === 1) {
      els("button[data-size]", contentElement).forEach(b => b.addEventListener("click", () => {
        state.sizeId = b.getAttribute("data-size");
        play("ding");
        render('initial');
      }));
    } else if (state.step === 2 && it.customizable) {
      els("button[data-free]", contentElement).forEach(b => b.addEventListener("click", () => {
        const id = b.getAttribute("data-free");
        const v = Number(b.getAttribute("data-val"));
        state.freeLevels = { ...state.freeLevels, [id]: v };
        vibrate(12);
        play("ding");
        render('initial');
      }));
    } else if ((state.step === 3 && it.customizable) || (state.step === 2 && !it.customizable)) {
      els("button[data-sauce]", contentElement).forEach(b => b.addEventListener("click", () => {
        const id = b.getAttribute("data-sauce");
        const v = Number(b.getAttribute("data-val"));
        state.sauceLevels = { ...state.sauceLevels, [id]: v };
        vibrate(12);
        play("ding");
        render('initial');
      }));
    } else if (state.step === 4) {
      const extra = el("#extraRange", contentElement);
      extra && extra.addEventListener("input", e => {
        state.extraGrams = Number(extra.value);
        vibrate(10);
        renderBottom();
        const viz = el(".extra-viz-wrapper");
        if (viz) viz.innerHTML = renderExtraViz(selectedItem());
      });
      els("button[data-cheese]", contentElement).forEach(b => b.addEventListener("click", () => {
        const d = Number(b.getAttribute("data-cheese"));
        state.cheeseSlices = Math.max(0, (state.cheeseSlices || 0) + d);
        play("ding");
        render('initial');
      }));
      els("button[data-sauce-takeaway]", contentElement).forEach(b => b.addEventListener("click", () => {
        const d = Number(b.getAttribute("data-sauce-takeaway"));
        state.takeawaySauces = Math.max(0, (state.takeawaySauces || 0) + d);
        play("ding");
        render('initial');
      }));
      els("button[data-drink]", contentElement).forEach(b => b.addEventListener("click", () => {
        const id = b.getAttribute("data-drink");
        const d = Number(b.getAttribute("data-d"));
        const q = Math.max(0, (state.drinks[id] || 0) + d);
        state.drinks = { ...state.drinks, [id]: q };
        play("ding");
        render('initial');
      }));
    } else if (state.step === 5) {
      el("#payPrint", contentElement).addEventListener("click", () => {
        // Final checkout is based only on what's in the cart.
        if (state.cart.length === 0) {
          alert("سبد خرید شما خالی است!");
          state.step = 0;
          render('initial');
          return;
        }
        state.checkoutItems = [...state.cart];
        state.cart = []; // Clear the cart after confirming checkout
        try {
          const today = new Date().toISOString().slice(0, 10);
          const day = localStorage.getItem('hy_day') || '';
          let seq = Number(localStorage.getItem('hy_seq') || String(ORDER_START - 1)) || 0;
          if (day !== today) {
            localStorage.setItem('hy_day', today);
            seq = ORDER_START - 1;
          }
          seq += 1;
          localStorage.setItem('hy_seq', String(seq));
          state.orderSeq = seq;
        } catch (e) {}

        play("success");
        openReceipt(); // Prepare the receipt

        setTimeout(() => {
          window.print(); // Trigger printing

          // After printing, transition to the thank you screen
          state.submitted = true;
          state.step = 6;
          render('forward');
        }, 100);
      });
    } else if (state.step === 6) {
      el("#reprintBtn", contentElement).addEventListener("click", () => {
        play("ding");
        window.print();
      });

      el("#newOrderBtn", contentElement).addEventListener("click", () => {
        play("success");
        // Reset all state for a new order
        state.cart = [];
        state.checkoutItems = [];
        resetCustomizations();
        state.selectedId = null;
        state.sizeId = null;
        state.step = 0;
        state.submitted = false;

        // Clean up printable area
        const printable = el('#printable-area');
        if (printable) printable.remove();

        // Reset theme to default
        applyTheme(null);

        // Render the first step
        render('initial');
      });
    }
  }

  function render(direction = 'initial') {
    if (isNavigating && direction !== 'initial') return;

    renderHeader();
    const c = el("#content");
    const it = selectedItem();

    let newContentHTML = '';

    if(state.step===0){
      const TOP = MENU.filter(m => m.isSpecial).map(m => m.id);
      newContentHTML = `<section class="section"><h2><span class="dot"></span> انتخاب سرآشپز هیولا</h2><div class="quick-grid">${TOP.map(id=>{const t = MENU.find(m=>m.id===id);return `<div class="quick-card" data-id="${t.id}"><div class="card-image-wrapper"><img src="${t.img||''}" alt=""/></div><div><div class="quick-title">${t.emoji || ''} ${t.name}</div><div class="menu-description">${t.description || ''}</div><div class="tags-container">${(t.tags || []).map(tag => `<span class="tag-label">${tag}</span>`).join('')}</div><div class="quick-sub">${state.isHappy? `<span><del>${fmt(t.sizes[0].price)}</del> ${fmt(t.sizes[0].price * (1-DISCOUNT.percent))}</span>`: `<span>از ${fmt(t.sizes[0].price)}</span>`}</div><div class="card-actions"><button class="btn quick-add-btn" data-quick-add="${t.id}">افزودن سریع</button></div></div>${state.isHappy ? '<div class="happy-badge">۱۰٪ تخفیف</div>' : ''}</div>`;}).join("")}</div><div class="divider"></div><div class="menu-grid">${MENU.map(m=>`<div class="menu-card ${state.selectedId===m.id?'active':''} ${state.isHappy ? 'happy-hour-active' : ''}" data-id="${m.id}"><div class="card-image-wrapper"><img src="${m.img||''}" alt=""/></div><div><div class="menu-title">${m.emoji || ''} ${m.name}</div><div class="menu-description">${m.description || ''}</div><div class="tags-container">${(m.tags || []).map(tag => `<span class="tag-label">${tag}</span>`).join('')}</div><div class="menu-sub">${state.isHappy? `<span><del>${fmt(m.sizes[0].price)}</del> ${fmt(m.sizes[0].price * (1-DISCOUNT.percent))}</span>`: `<span>از ${fmt(m.sizes[0].price)}</span>`}</div><div class="card-actions"><button class="btn quick-add-btn" data-quick-add="${m.id}">افزودن سریع</button></div></div>${state.isHappy ? '<div class="happy-badge">۱۰٪</div>' : ''}</div>`).join("")}</div></section>`;
    } else if(state.step===1){
      const isPatMat = it.theme?.className === 'theme-pat-mat';
      newContentHTML = `<section class="section"><h2><span class="dot"></span> ${isPatMat ? '۲) انتخاب مقیاس پروژه' : '۲) انتخاب سایز / وزن'}</h2><div class="quick-grid" style="grid-template-columns:repeat(${it.sizes.length},minmax(0,1fr))">${it.sizes.map(s=>`<button class="btn ${state.sizeId===s.id?'primary':''}" data-size="${s.id}"><div style="font-weight:900">${s.label}</div><div style="font-size:12px;color:#cbd5e1">${fmt(s.price)}</div></button>`).join("")}</div></section>`;
    } else if(state.step===2 && it.customizable){
      const isPatMat = it.theme?.className === 'theme-pat-mat';
      newContentHTML = `<section class="section"><h2><span class="dot"></span> ${isPatMat ? '۳) مرحله آزمون و خطا' : '۳) مخلفات رایگان'}</h2><div class="level">${FREE.map(f=>`<div><div style="margin:6px 0;font-weight:700">${f.label}</div><div class="row">${LEVELS.map(l=>`<button class="btn" data-free="${f.id}" data-val="${l.id}" aria-pressed="${state.freeLevels[f.id]===l.id}">${l.label}</button>`).join("")}</div></div>`).join("")}</div></section>`;
    } else if((state.step===3 && it.customizable) || (state.step===2 && !it.customizable)){
      const isPatMat = it.theme?.className === 'theme-pat-mat';
      newContentHTML = `<section class="section"><h2><span class="dot"></span> ${isPatMat ? '۴) عملیات رنگ‌آمیزی' : '۴) سس‌ها'}</h2>${it.customizable? `<div class="level">${SAUCES.map(s=>`<div><div style="margin:6px 0;font-weight:700">${s.label}</div><div class="row">${LEVELS.map(l=>`<button class="btn" data-sauce="${s.id}" data-val="${l.id}" aria-pressed="${state.sauceLevels[s.id]===l.id}">${l.label}</button>`).join("")}</div></div>`).join("")}</div>` : `<div class="menu-sub">این آیتم قابل شخصی‌سازی نیست.</div>`}</section>`;
    } else if(state.step===4){
      const isPatMat = it.theme?.className === 'theme-pat-mat';
      const drinksPrice = Object.entries(state.drinks).reduce((s,[id,q])=>{ const d = DRINKS.find(x=>x.id===id); return s + (d? d.price*q : 0); }, 0);
      newContentHTML = `<section class="section"><h2><span class="dot"></span> ${isPatMat ? '۵) تهیه قطعات یدکی' : '۵) افزودنی‌ها'}</h2>${(it.customizable && it.extra.unitPrice>0)?`<div class="slider-wrap" style="margin-bottom: 20px;"><div style="font-weight:700;margin-bottom:6px">کالباس اضافه</div><input type="range" min="0" max="200" step="${it.extra.step}" value="${state.extraGrams}" id="extraRange"/><div class="range-meta"><span>افزایش: ${state.extraGrams} گرم</span><span>+${fmt((Math.floor(state.extraGrams/it.extra.step))*it.extra.unitPrice)}</span></div><div class="extra-viz-wrapper">${renderExtraViz(it)}</div></div>`:''}<div style="font-weight:700;margin-bottom:6px">افزودنی‌های پولی</div><div class="drinks"><div class="drink"><div style="display:flex;align-items:center;gap:10px"><img src="img/addon-gouda-slice.webp" alt="پنیر گودا"/><div><div class="name">پنیر گودا ورقه‌ای</div><div style="font-size:12px;color:#cbd5e1">${fmt(CHEESE_PRICE)} / ورق</div></div></div><div class="qty"><button data-cheese="-1">−</button><div class="n">${state.cheeseSlices||0}</div><button data-cheese="1">+</button></div></div><div class="drink"><div style="display:flex;align-items:center;gap:10px"><img src="https://hayola.hornspeed.com/img/addon-sauce.webp" alt="سس تک نفره"/><div><div class="name">سس تک نفره بیرون بر</div><div style="font-size:12px;color:#cbd5e1">${fmt(SAUCE_PRICE)} / عدد</div></div></div><div class="qty"><button data-sauce-takeaway="-1">−</button><div class="n">${state.takeawaySauces||0}</div><button data-sauce-takeaway="1">+</button></div></div><div class="divider" style="margin: 12px 0;"></div>${DRINKS.map(d=>`<div class="drink"><div style="display:flex;align-items:center;gap:10px"><img src="${d.img||''}" alt=""/><div><div class="name">${d.name}</div><div style="font-size:12px;color:#cbd5e1">${fmt(d.price)} / عدد</div></div></div><div class="qty"><button data-drink="${d.id}" data-d="-1">−</button><div class="n">${state.drinks[d.id]||0}</div><button data-drink="${d.id}" data-d="1">+</button></div></div>`).join("")}</div><div style="text-align:right;margin-top:8px;font-size:13px;color:#cbd5e1">هزینه نوشیدنی‌ها: <b>${fmt(drinksPrice)}</b></div></div></section>`;
    } else if(state.step===5){
      const isPatMat = it.theme?.className === 'theme-pat-mat';
      const cartTotal = state.cart.reduce((sum, item) => sum + item.total, 0);
      newContentHTML = `<section class="section"><h2><span class="dot"></span> ${isPatMat ? '۶) کنترل نهایی و تحویل' : '۶) مرور و ثبت'}</h2><div class="preview-wrap" style="overflow-x: auto; display: flex; gap: 10px; padding-bottom: 10px; border: 1px solid rgba(255,255,255,.1); border-radius: 12px; padding: 10px; background: rgba(0,0,0,.2); margin-bottom: 14px;">${state.cart.map(item => `<div class="preview-item" style="flex: 0 0 120px; text-align: center;"><div class="preview" style="height: 120px; background: rgba(255,255,255,.05); border-radius: 8px; padding: 5px;">${generateSandwichSVG(item)}</div><div style="font-size: 12px; font-weight: 700; margin-top: 8px; background: rgba(0,0,0,0.4); border-radius: 6px; padding: 2px 6px; color: white;">${item.name}</div></div>`).join('')}</div><div class="review-grid" style="display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr))"><div class="order-summary" style="display:flex; flex-direction:column; gap:8px;">${state.cart.map(item => {const customizations = [];if (item.freeLevels) { Object.entries(item.freeLevels).forEach(([id, level]) => { if (level !== 1) { const freebie = FREE.find(f => f.id === id); const levelInfo = LEVELS.find(l => l.id === level); if (freebie && levelInfo) customizations.push(`${freebie.label}: ${levelInfo.label}`); } }); }if (item.sauceLevels) { Object.entries(item.sauceLevels).forEach(([id, level]) => { if (level !== 1) { const sauce = SAUCES.find(s => s.id === id); const levelInfo = LEVELS.find(l => l.id === level); if (sauce && levelInfo) customizations.push(`${sauce.label}: ${levelInfo.label}`); } }); }if (item.extraGrams > 0) { customizations.push(`کالباس اضافه: ${item.extraGrams} گرم`); }if (item.cheeseSlices > 0) { customizations.push(`پنیر اضافه: ${item.cheeseSlices} ورق`); }return `<div class="summary-item" style="border: 1px solid rgba(255,255,255,.1); border-radius: 12px; padding: 8px;"><div style="font-weight: 800; font-size: 18px;">${item.name} <span style="font-size: 14px; color: var(--muted);">(${item.sizeLabel})</span></div>${customizations.length ? `<div style="font-size: 12px; color: var(--accent); padding-top: 4px;">${customizations.join(' • ')}</div>` : ''}</div>`;}).join('')}<div class="divider"></div><div style="display:flex;justify-content:space-between; font-size: 18px; font-weight: 900;"><div>جمع کل</div><div>${fmt(cartTotal)}</div></div></div><div class="no-print" style="display:grid;gap:8px;align-content:start"><button class="btn primary" id="payPrint">پرداخت و چاپ نهایی</button></div></div></section>`;
    } else if (state.step === 6) {
      newContentHTML = `
        <section class="section thank-you-screen">
            <h2>سفارش شما با موفقیت ثبت شد!</h2>
            <p style="margin: 10px 0 20px; font-size: 18px;">شماره سفارش شما: <b style="font-size: 24px; color: var(--primary-theme);">${state.orderSeq}</b></p>
            <div class="thank-you-actions">
                <button class="btn" id="reprintBtn">چاپ مجدد رسید</button>
                <button class="btn primary" id="newOrderBtn">شروع سفارش جدید</button>
            </div>
        </section>
      `;
    }

    // Simplified render logic
    isNavigating = true;
    const oldContent = el('.step-content', c);
    if (oldContent) {
      oldContent.remove(); // Remove old content immediately
    }

    const newContent = document.createElement('div');
    newContent.className = 'step-content';
    newContent.innerHTML = newContentHTML;

    // Set initial state for fade-in animation
    if (direction !== 'initial') {
      newContent.classList.add('fade-in');
    }

    c.appendChild(newContent);
    bindStepEvents(newContent);

    // Trigger the fade-in animation
    if (direction !== 'initial') {
      requestAnimationFrame(() => {
        newContent.classList.remove('fade-in');
      });
    }

    setTimeout(() => {
      isNavigating = false;
    }, 50); // Shorten the navigation lock

    renderBottom();
  }

  render();
})();
