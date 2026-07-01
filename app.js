// ============================================
//  选我吧 - App
// ============================================
const DEFAULT_FOODS = ['火锅','烧烤','日料','西餐','麻辣烫','螺蛳粉','炸鸡','沙拉','饺子','面条','寿司','韩餐','麻辣香锅','粥','披萨'];

// Food categories
const DEFAULT_CAT_ORDER = ['主食','饮品','甜点','水果','零食'];
const DEFAULT_FOOD_ITEMS = {
  '主食':['火锅','烧烤','日料','西餐','麻辣烫','螺蛳粉','炸鸡','饺子','面条','寿司','韩餐','麻辣香锅','粥','披萨','米线'],
  '饮品':['奶茶','咖啡','果汁','可乐','茶','牛奶','酸奶','冰沙'],
  '甜点':['蛋糕','冰淇淋','布丁','提拉米苏','马卡龙','泡芙','慕斯'],
  '水果':['西瓜','草莓','芒果','葡萄','苹果','香蕉','橙子','蓝莓'],
  '零食':['薯片','辣条','饼干','巧克力','坚果','果冻','海苔','肉干']
};
const CAT_EMOJI = {'主食':'🍜','饮品':'🥤','甜点':'🍰','水果':'🍉','零食':'🍿'};
const ALL_CATEGORIES = ['上衣','外套','防晒衣','裤子','短裤','半身裙','连衣裙','鞋子','帽子','眼镜','围巾','耳饰','项链','腰带','包包','手套','耳罩','袜子'];
const TEMP_RANGES = [
  {key:'freezing',label:'严寒(<5°C)',min:-10,max:4},{key:'cold',label:'寒冷(5-10°C)',min:5,max:10},
  {key:'cool',label:'较冷(10-15°C)',min:11,max:15},{key:'mild_cool',label:'偏凉(15-20°C)',min:16,max:20},
  {key:'mild',label:'舒适(20-25°C)',min:21,max:25},{key:'warm',label:'偏热(25-30°C)',min:26,max:30},
  {key:'hot',label:'炎热(>30°C)',min:31,max:45}
];
const RECOMMEND_RULES = {
  hot:{summary:'穿1件·轻薄透气',required:['上衣','短裤/短裙','鞋子'],optional:['帽子','眼镜'],rainy_add:['薄外套(防水)'],windy_add:[],sunny_add:['防晒衣','遮阳帽']},
  warm:{summary:'穿1-2件·清凉',required:['上衣','下装','鞋子'],optional:['薄外套','帽子','眼镜'],rainy_add:['薄外套(防水)'],windy_add:[],sunny_add:['防晒衣']},
  mild:{summary:'穿2件·适中',required:['上衣','外套','下装','鞋子'],optional:[],rainy_add:['防水外套(推荐)'],windy_add:['防风外套(推荐)'],sunny_add:[]},
  mild_cool:{summary:'穿2-3件·加件外套',required:['内搭/长袖','外套','下装','鞋子'],optional:['围巾'],rainy_add:['防水外套(推荐)'],windy_add:['防风外套(推荐)'],sunny_add:[]},
  cool:{summary:'穿3件·保暖',required:['内搭','毛衣','外套','下装','鞋子'],optional:['围巾','帽子'],rainy_add:['防水外套'],windy_add:['防风外套'],sunny_add:[]},
  cold:{summary:'穿3-4件·注意保暖',required:['保暖内搭','毛衣','羽绒服','厚下装','靴子'],optional:['围巾','帽子','手套'],rainy_add:[],windy_add:[],sunny_add:[]},
  freezing:{summary:'穿4件+·全副武装',required:['保暖内衣','毛衣','羽绒服','厚裤子','雪地靴'],optional:['围巾','帽子','手套','耳罩'],rainy_add:[],windy_add:[],sunny_add:[]}
};
const CAT_POSITIONS = {
  '帽子':{x:'28%',y:'0%',w:'44%',h:'16%',z:10},'耳饰':{x:'40%',y:'10%',w:'20%',h:'12%',z:10},
  '眼镜':{x:'28%',y:'12%',w:'44%',h:'12%',z:10},'围巾':{x:'25%',y:'18%',w:'50%',h:'14%',z:9},
  '项链':{x:'35%',y:'20%',w:'30%',h:'10%',z:9},'上衣':{x:'20%',y:'22%',w:'60%',h:'32%',z:5},
  '外套':{x:'16%',y:'20%',w:'68%',h:'38%',z:8},'防晒衣':{x:'16%',y:'20%',w:'68%',h:'36%',z:7},'连衣裙':{x:'18%',y:'22%',w:'64%',h:'52%',z:5},
  '腰带':{x:'25%',y:'52%',w:'50%',h:'6%',z:7},'裤子':{x:'20%',y:'50%',w:'60%',h:'36%',z:4},
  '短裤':{x:'20%',y:'50%',w:'60%',h:'22%',z:4},'半身裙':{x:'20%',y:'50%',w:'60%',h:'30%',z:4},
  '手套':{x:'2%',y:'50%',w:'18%',h:'18%',z:6},'耳罩':{x:'10%',y:'6%',w:'80%',h:'18%',z:10},
  '包包':{x:'-2%',y:'36%',w:'22%',h:'26%',z:6},'鞋子':{x:'20%',y:'82%',w:'60%',h:'18%',z:3},
  '袜子':{x:'24%',y:'76%',w:'52%',h:'12%',z:3}
};
const RULE_TO_CAT = {
  '上衣':['上衣'],'上衣(薄)':['上衣'],'短袖上衣':['上衣'],'长袖上衣':['上衣'],'内搭':['上衣'],
  '内搭/长袖':['上衣'],'保暖内搭':['上衣'],'保暖内衣':['上衣'],'毛衣':['上衣'],
  '外套':['外套'],'薄外套':['外套'],'外套/开衫':['外套'],'厚外套':['外套'],
  '羽绒服':['外套'],'羽绒服/厚大衣':['外套'],'薄外套(防水)':['外套'],'防水外套(推荐)':['外套'],
  '防水外套':['外套'],'防风外套(推荐)':['外套'],'防风外套':['外套'],
  '下装':['裤子','短裤','半身裙'],'下装(薄)':['短裤','半身裙','裤子'],'厚下装':['裤子'],
  '裤子':['裤子'],'长裤':['裤子'],'短裤':['短裤'],'短裙':['半身裙'],
  '短裤/短裙':['短裤','半身裙'],'厚裤子':['裤子'],
  '鞋子':['鞋子'],'鞋子(薄)':['鞋子'],'靴子':['鞋子'],'雪地靴':['鞋子'],'运动鞋':['鞋子'],
  '防晒衣':['防晒衣'],'帽子':['帽子'],'眼镜':['眼镜'],'围巾':['围巾'],'手套':['手套'],'耳罩':['耳罩'],
  '包包':['包包'],'遮阳帽':['帽子']
};
const PLACEHOLDER_COLORS = {
  '上衣':'#ffcdd2','外套':'#c5cae9','防晒衣':'#fff9c4','裤子':'#bbdefb','短裤':'#b3e5fc','半身裙':'#f8bbd0',
  '连衣裙':'#f48fb1','鞋子':'#cfd8dc','帽子':'#fff9c4','眼镜':'#b2dfdb','围巾':'#d1c4e9',
  '耳饰':'#fce4ec','项链':'#ffe0b2','腰带':'#795548','包包':'#bcaaa4','手套':'#ffccbc',
  '耳罩':'#b2ebf2','袜子':'#e0e0e0'
};

// ===== Store =====
var selectedCategory = '', eatDeleteMode = false, longPressTimer = null;
function loadStore(){
  try{var d=JSON.parse(localStorage.getItem('xuam8a'));if(d){
    if(d.foods&&!d.foodCats){d.foodCats=['主食'];d.foodItems={'主食':d.foods};delete d.foods;}
    if(!d.foodCats)d.foodCats=[...DEFAULT_CAT_ORDER];
    if(!d.foodItems)d.foodItems=JSON.parse(JSON.stringify(DEFAULT_FOOD_ITEMS));
    return d;
  }}catch(e){}
  return{foodCats:[...DEFAULT_CAT_ORDER],foodItems:JSON.parse(JSON.stringify(DEFAULT_FOOD_ITEMS)),clothes:[],outfits:[]};
}
function saveStore(){localStorage.setItem('xuam8a',JSON.stringify(store));}
let store=loadStore();

// ===== Page Nav =====
function goPage(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  var el=document.getElementById('page-'+page);
  if(el)el.classList.add('active');
  if(page==='eat')initEat();
  if(page==='weather'){initTempPickers();}
  if(page==='outfit')renderOutfit();
  if(page==='wardrobe')renderWardrobe();
}

// ============================================
//  吃什么
// ============================================
let wheelAngle=0,wheelSpinning=false;
const WHEEL_COLORS=['#FF6B6B','#FECB6E','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD','#98D8C8','#F7DC6F','#BB8FCE','#85C1E9','#F0B27A','#82E0AA','#F1948A','#85929E'];
function initEat(){
  selectedCategory='';
  var cv=document.getElementById('eatCategoryView');if(cv)cv.style.display='';
  var iv=document.getElementById('eatItemView');if(iv)iv.classList.add('hidden');
  document.getElementById('eatBackBtn').textContent='←';
  document.getElementById('eatPageTitle').textContent='今天吃什么';
  renderCategories();
}

function renderEatList(){
  var items = selectedCategory ? (store.foodItems[selectedCategory]||[]) : [];
  var c=document.getElementById('eatCount');if(c)c.textContent=items.length+'项';
  var el=document.getElementById('eatItems');if(!el)return;
  if(eatDeleteMode){
    el.innerHTML=items.map(function(f,i){return'<span class="eat-tag delete-mode">'+f+'<span class="eat-del-btn" onclick="deleteEatItem('+i+')">✕</span></span>';}).join('');
  } else {
    el.innerHTML=items.map(function(f,i){return'<span class="eat-tag">'+f+'</span>';}).join('');
  }
  var tl=document.getElementById('eatListTitle');
  if(tl)tl.textContent=selectedCategory ? (CAT_EMOJI[selectedCategory]||'')+' '+selectedCategory+' 列表' : '可选列表';
}

function deleteEatItem(idx) {
  if (!selectedCategory || !store.foodItems[selectedCategory]) return;
  store.foodItems[selectedCategory].splice(idx, 1);
  saveStore();
  renderEatList();
  drawWheel();
  renderCategories();
}

function exitDeleteMode() {
  eatDeleteMode = false;
  document.getElementById('deleteDoneBtn').classList.add('hidden');
  renderEatList();
}

function startEatLongPress(e) {
  if(eatDeleteMode || !selectedCategory) return;
  if(longPressTimer) clearTimeout(longPressTimer);
  longPressTimer = setTimeout(function() {
    eatDeleteMode = true;
    renderEatList();
    var btn = document.getElementById('deleteDoneBtn');
    if(btn) btn.classList.remove('hidden');
  }, 500);
}

function cancelEatLongPress() {
  if(longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
}

function drawWheel(){
  var canvas=document.getElementById('wheelCanvas');if(!canvas)return;
  var ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height,cx=w/2,cy=h/2,r=Math.min(w,h)/2-8;
  var items=selectedCategory?(store.foodItems[selectedCategory]||[]):store.foods||[];
  var n=items.length||1,seg=2*Math.PI/n;
  ctx.clearRect(0,0,w,h);
  for(var i=0;i<n;i++){
    var a=wheelAngle+i*seg;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,a,a+seg);ctx.closePath();
    ctx.fillStyle=WHEEL_COLORS[i%WHEEL_COLORS.length];ctx.fill();
    ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
    var la=a+seg/2;ctx.save();
    ctx.translate(cx+Math.cos(la)*(r*0.65),cy+Math.sin(la)*(r*0.65));
    ctx.rotate(la+Math.PI/2);ctx.fillStyle='#333';ctx.font='bold 13px sans-serif';
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(items[i]||'?',0,0);ctx.restore();
  }
  ctx.beginPath();ctx.arc(cx,cy,16,0,2*Math.PI);ctx.fillStyle='#fff';ctx.fill();
  ctx.strokeStyle='#ddd';ctx.lineWidth=2;ctx.stroke();
}

function spinWheel(){
  var wItems=selectedCategory?(store.foodItems[selectedCategory]||[]):store.foods||[];if(wheelSpinning||wItems.length===0)return;
  wheelSpinning=true;document.getElementById('spinBtn').disabled=true;
  document.getElementById('wheelResult').textContent='转啊转...';
  var vel=0.3+Math.random()*0.4,friction=0.985,minVel=0.001;
  function animate(){
    vel*=friction;wheelAngle+=vel;
    if(vel<minVel){
      wheelSpinning=false;document.getElementById('spinBtn').disabled=false;
      var n=store.foods.length,seg=2*Math.PI/n,pa=-Math.PI/2;
      var rel=pa-wheelAngle;rel=((rel%(2*Math.PI))+2*Math.PI)%(2*Math.PI);
      var idx=Math.floor(rel/seg)%n;var wItems=selectedCategory?(store.foodItems[selectedCategory]||[]):store.foods||[];
      showEatResult(items[idx]||'');
    }
    drawWheel();
    if(vel>=minVel)requestAnimationFrame(animate);
  }
  animate();
}

function showEatResult(item){
  document.getElementById('resultIcon').textContent='🍜';
  document.getElementById('resultTitle').textContent='决定了！';
  document.getElementById('resultItem').textContent=item;
  document.getElementById('resultModal').classList.add('active');
}

// ===== Eat Edit =====
function toggleEatEdit(){
  var m=document.getElementById('eatEditModal');m.classList.toggle('active');
  if(m.classList.contains('active'))renderEditList();
}
function closeEatEdit(){document.getElementById('eatEditModal').classList.remove('active');renderEatList();drawWheel();}
function renderEditList(){
  var el=document.getElementById('editItems');if(!el)return;
  el.innerHTML=store.foods.map(function(f,i){return'<div class="edit-item-row"><span class="item-drag">≡</span><span class="item-name">'+f+'</span><button class="item-del" onclick="removeFood('+i+')">✕</button></div>';}).join('');
}
function addFood(){
  var inp=document.getElementById('newFoodInput'),v=inp.value.trim();if(!v)return;
  store.foods.push(v);saveStore();inp.value='';renderEditList();renderEatList();drawWheel();
}
function removeFood(i){store.foods.splice(i,1);saveStore();renderEditList();renderEatList();drawWheel();}
function resetEatList(){store.foods=[...DEFAULT_FOODS];saveStore();renderEditList();renderEatList();drawWheel();}

function selectWeather(el){
  document.querySelectorAll('.weather-option').forEach(function(o){o.classList.remove('selected');});
  el.classList.add('selected');currentWeather=el.dataset.weather;updateWeatherPreview();
}
function getTempKey(t){for(var i=0;i<TEMP_RANGES.length;i++){var r=TEMP_RANGES[i];if(t>=r.min&&t<=r.max)return r.key;}return t>30?'hot':'freezing';}
function getWeatherEmoji(w){return{'sunny':'☀️','cloudy':'⛅','rainy':'🌧️','windy':'🌬️'}[w]||'☀️';}
function getWeatherText(w){return{'sunny':'晴','cloudy':'多云','rainy':'雨','windy':'大风'}[w]||'晴';}



function updateWeatherPreview(){
  var minVal=tempMinVal||currentTemp,maxVal=tempMaxVal||currentTemp;
  var key=currentTempKey||getTempKey(currentTemp),rule=RECOMMEND_RULES[key],emoji=getWeatherEmoji(currentWeather),wt=getWeatherText(currentWeather);
  var p1=document.getElementById('previewSummary'),p2=document.getElementById('previewDetail');if(!p1)return;
  p1.textContent=emoji+' '+minVal+'-'+maxVal+'°C '+wt+' · '+rule.summary;
  var all=rule.required.slice();
  if(currentWeather==='rainy'&&rule.rainy_add.length)rule.rainy_add.forEach(function(a){all.push(a);});
  if(currentWeather==='windy'&&rule.windy_add.length)rule.windy_add.forEach(function(a){all.push(a);});
  if(currentWeather==='sunny'&&rule.sunny_add&&rule.sunny_add.length)rule.sunny_add.forEach(function(a){all.push(a);});
  if(rule.optional.length)rule.optional.forEach(function(o){all.push('+'+o);});
  p2.textContent=all.join(' · ');
}

// ============================================
//  穿什么 - 搭配
// ============================================
let currentOutfit={categories:[],items:{},activeItem:null};

function startOutfit(){
  currentTemp = tempMinVal;
  currentTempKey=getTempKey(currentTemp);
  var key=currentTempKey,rule=RECOMMEND_RULES[key],cats=[],catMap={};
  rule.required.forEach(function(r){
    var mapped=RULE_TO_CAT[r];if(mapped)mapped.forEach(function(c){if(!catMap[c]){catMap[c]=true;cats.push({cat:c,required:true});}});
  });
  if(currentWeather==='rainy'){rule.rainy_add.forEach(function(r){var m=RULE_TO_CAT[r];if(m)m.forEach(function(c){if(!catMap[c]){catMap[c]=true;cats.push({cat:c,required:true});}});});}
  if(currentWeather==='windy'){rule.windy_add.forEach(function(r){var m=RULE_TO_CAT[r];if(m)m.forEach(function(c){if(!catMap[c]){catMap[c]=true;cats.push({cat:c,required:true});}});});}
  if(currentWeather==='sunny'&&rule.sunny_add&&rule.sunny_add.length){rule.sunny_add.forEach(function(r){var m=RULE_TO_CAT[r];if(m)m.forEach(function(c){if(!catMap[c]){catMap[c]=true;cats.push({cat:c,required:false});}});});}
  currentOutfit={categories:cats,items:{},activeItem:null};
  cats.forEach(function(c){currentOutfit.items[c.cat]=0;});
  goPage('outfit');
}

function renderOutfit(){
  var info=document.getElementById('outfitInfo');
  var emoji=getWeatherEmoji(currentWeather),wt=getWeatherText(currentWeather),key=getTempKey(currentTemp),rule=RECOMMEND_RULES[key];
  if(info)info.textContent=emoji+' '+currentTemp+'°C '+wt+' · '+rule.summary;
  renderModelItems();renderCategorySwiper();
}

function getClothesByCategory(cat){
  var zones=currentSpannedZones&&currentSpannedZones.length?currentSpannedZones:[currentTempKey||getTempKey(currentTemp)];
  return store.clothes.filter(function(c){
    if(c.category!==cat)return false;
    if(c.temps&&c.temps.length>0){
      for(var i=0;i<zones.length;i++){if(c.temps.indexOf(zones[i])>=0)return true;}
      return false;
    }
    return true;
  });
}
function getPlaceholder(cat){
  var c=PLACEHOLDER_COLORS[cat]||'#eee';
  return 'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="'+c+'" x="5" y="5" width="90" height="90" rx="8"/><text x="50" y="55" text-anchor="middle" fill="#999" font-size="12">'+cat+'</text></svg>');
}

function renderModelItems(){
  var container=document.getElementById('modelItems');if(!container)return;
  container.innerHTML='';
  var cats=currentOutfit.categories.slice().sort(function(a,b){return(CAT_POSITIONS[a.cat]?.z||0)-(CAT_POSITIONS[b.cat]?.z||0);});
  cats.forEach(function(c){
    var pos=CAT_POSITIONS[c.cat];if(!pos)return;
    var idx=currentOutfit.items[c.cat]||0,items=getClothesByCategory(c.cat);
    var has=items.length>0,src=has?items[idx%items.length].image:getPlaceholder(c.cat);
    var label=has?(items[idx%items.length].name||c.cat):c.cat;
    var div=document.createElement('div');
    div.className='model-item'+(currentOutfit.activeItem===c.cat?' selected':'');
    div.style.cssText='left:'+pos.x+';top:'+pos.y+';width:'+pos.w+';height:'+pos.h+';z-index:'+pos.z;
    div.dataset.cat=c.cat;
    div.innerHTML='<img src="'+src+'" alt="'+label+'" draggable="false"><span class="item-label">'+label+'</span>';
    div.addEventListener('mousedown',function(e){startDrag(e,div,c.cat);});
    div.addEventListener('touchstart',function(e){startDragTouch(e,div,c.cat);},{passive:false});
    div.addEventListener('click',function(){selectModelItem(c.cat);});
    container.appendChild(div);
  });
}

let dragState=null;
function selectModelItem(cat){
  document.querySelectorAll('.model-item').forEach(function(el){el.classList.remove('selected');});
  var el=document.querySelector('.model-item[data-cat="'+cat+'"]');if(el)el.classList.add('selected');
  currentOutfit.activeItem=cat;
}

function startDrag(e,el,cat){
  e.preventDefault();
  var rect=el.parentElement.getBoundingClientRect();
  dragState={el:el,cat:cat,ox:e.clientX-el.offsetLeft,oy:e.clientY-el.offsetTop,parentRect:rect};
  selectModelItem(cat);
  document.addEventListener('mousemove',onDrag);document.addEventListener('mouseup',endDrag);
}

function startDragTouch(e,el,cat){
  if(e.touches.length===1){
    var t=e.touches[0],rect=el.parentElement.getBoundingClientRect();
    dragState={el:el,cat:cat,ox:t.clientX-el.offsetLeft,oy:t.clientY-el.offsetTop,parentRect:rect,isTouch:true};
    selectModelItem(cat);
    document.addEventListener('touchmove',onDragTouch,{passive:false});document.addEventListener('touchend',endDragTouch);
  }else if(e.touches.length===2){
    var t1=e.touches[0],t2=e.touches[1],dist=Math.hypot(t1.clientX-t2.clientX,t1.clientY-t2.clientY);
    dragState={el:el,cat:cat,pinchDist:dist,pinchScale:parseFloat(el.style.width)||60,isPinch:true};
    selectModelItem(cat);
    document.addEventListener('touchmove',onDragTouch,{passive:false});document.addEventListener('touchend',endDragTouch);
  }
}

function onDrag(e){
  if(!dragState)return;
  var parent=dragState.el.parentElement,prect=parent.getBoundingClientRect();
  var x=(e.clientX-prect.left)/prect.width*100,y=(e.clientY-prect.top)/prect.height*100;
  dragState.el.style.left=Math.max(0,Math.min(85,x-10))+'%';
  dragState.el.style.top=Math.max(0,Math.min(85,y-10))+'%';
}

function onDragTouch(e){
  e.preventDefault();if(!dragState)return;
  if(dragState.isPinch&&e.touches.length===2){
    var t1=e.touches[0],t2=e.touches[1],newDist=Math.hypot(t1.clientX-t2.clientX,t1.clientY-t2.clientY);
    var curW=parseFloat(dragState.el.style.width)||60,newW=Math.max(20,Math.min(100,curW*newDist/dragState.pinchDist));
    dragState.el.style.width=newW+'%';dragState.pinchDist=newDist;
  }else if(!dragState.isPinch&&e.touches.length===1){
    var t=e.touches[0],parent=dragState.el.parentElement,prect=parent.getBoundingClientRect();
    var x=(t.clientX-prect.left)/prect.width*100,y=(t.clientY-prect.top)/prect.height*100;
    dragState.el.style.left=Math.max(0,Math.min(85,x-10))+'%';
    dragState.el.style.top=Math.max(0,Math.min(85,y-10))+'%';
  }
}

function endDrag(){dragState=null;document.removeEventListener('mousemove',onDrag);document.removeEventListener('mouseup',endDrag);}
function endDragTouch(){dragState=null;document.removeEventListener('touchmove',onDragTouch);document.removeEventListener('touchend',endDragTouch);}

function renderCategorySwiper(){
  var swiper=document.getElementById('categorySwiper');if(!swiper)return;
  swiper.innerHTML='';
  currentOutfit.categories.forEach(function(c){
    var items=getClothesByCategory(c.cat),idx=currentOutfit.items[c.cat]||0;
    var row=document.createElement('div');row.className='category-row';
    var html='<div class="category-label">'+c.cat+'</div><div class="category-scroll" id="scroll-'+c.cat+'">';
    if(items.length>0){
      for(var i=0;i<items.length;i++){
        var act=i===idx?' active':'';
        html+='<div class="cat-item'+act+'" data-cat="'+c.cat+'" data-idx="'+i+'" onclick="selectCategoryItem(\''+c.cat+'\','+i+')"><img src="'+items[i].image+'" alt="'+(items[i].name||c.cat)+'"></div>';
      }
    }else{
      html+='<div class="cat-item active"><div class="cat-placeholder">'+getCatEmoji(c.cat)+'</div><div class="cat-name">暂无</div></div>';
    }
    html+='</div><button class="btn-icon" style="font-size:14px;flex-shrink:0" onclick="removeCategory(\''+c.cat+'\')">✕</button>';
    row.innerHTML=html;swiper.appendChild(row);
  });
}

function getCatEmoji(cat){var m={'上衣':'👕','外套':'🧥','防晒衣':'☂️','裤子':'👖','短裤':'🩳','半身裙':'👗','连衣裙':'👗','鞋子':'👟','帽子':'🧢','眼镜':'👓','围巾':'🧣','耳饰':'💍','项链':'📿','腰带':'🔗','包包':'👜','手套':'🧤','耳罩':'🎧','袜子':'🧦'};return m[cat]||'📦';}

function selectCategoryItem(cat,idx){
  currentOutfit.items[cat]=idx;
  document.querySelectorAll('.cat-item[data-cat="'+cat+'"]').forEach(function(el){el.classList.remove('active');});
  document.querySelectorAll('.cat-item[data-cat="'+cat+'"][data-idx="'+idx+'"]').forEach(function(el){el.classList.add('active');});
  renderModelItems();
}

function removeCategory(cat){
  currentOutfit.categories=currentOutfit.categories.filter(function(c){return c.cat!==cat;});
  delete currentOutfit.items[cat];renderModelItems();renderCategorySwiper();
}

function addOptional(){
  var m=document.getElementById('addTypeModal'),grid=document.getElementById('typeGrid');if(!grid)return;
  var existing=currentOutfit.categories.map(function(c){return c.cat;});
  grid.innerHTML=ALL_CATEGORIES.map(function(cat){
    var d=existing.includes(cat);
    return '<div class="type-grid-item'+(d?' disabled':'')+'" onclick="'+(d?'':'addCategory(\''+cat+'\')')+'">'+getCatEmoji(cat)+'<br>'+cat+'</div>';
  }).join('');
  m.classList.add('active');
}
function closeAddType(){document.getElementById('addTypeModal').classList.remove('active');}
function addCategory(cat){
  currentOutfit.categories.push({cat:cat,required:false});
  if(!currentOutfit.items[cat])currentOutfit.items[cat]=0;
  closeAddType();renderModelItems();renderCategorySwiper();
}

function saveOutfit(){
  var outfit={date:new Date().toLocaleDateString('zh-CN'),temp:currentTemp,weather:currentWeather,
    categories:currentOutfit.categories.map(function(c){return{cat:c.cat,itemIdx:currentOutfit.items[c.cat]||0,required:c.required};})};
  store.outfits.push(outfit);saveStore();
  document.getElementById('resultIcon').textContent='💾';
  document.getElementById('resultTitle').textContent='搭配已保存';
  document.getElementById('resultItem').textContent=outfit.categories.length+'件搭配';
  document.getElementById('resultModal').classList.add('active');
}

// ============================================
//  衣橱
// ============================================
let wardrobeFilter='all',pendingImage=null,selectedTemps={};

function renderWardrobe(){renderWardrobeFilters();renderWardrobeGrid();renderTempTags();}

function renderWardrobeFilters(){
  var el=document.getElementById('wardrobeFilters');if(!el)return;
  el.innerHTML='<span class="filter-tag '+(wardrobeFilter==='all'?'active':'')+'" onclick="setWardrobeFilter(\'all\')">全部</span>'+
    ALL_CATEGORIES.map(function(c){return'<span class="filter-tag '+(wardrobeFilter===c?'active':'')+'" onclick="setWardrobeFilter(\''+c+'\')">'+c+'</span>';}).join('');
}

function setWardrobeFilter(cat){wardrobeFilter=cat;renderWardrobeFilters();renderWardrobeGrid();}

function renderWardrobeGrid(){
  var el=document.getElementById('wardrobeGrid');if(!el)return;
  var items=store.clothes;
  if(wardrobeFilter!=='all')items=items.filter(function(c){return c.category===wardrobeFilter;});
  if(items.length===0){el.innerHTML='<div class="wardrobe-empty">还没有衣物，点击右上角添加</div>';return;}
  el.innerHTML=items.map(function(item,i){
    if(wardrobeSelectMode){
      var sel=selectedWardrobeItems[i]?' selected':'';
      var chk=selectedWardrobeItems[i]?'checked':'';
      return'<div class="wardrobe-item select-mode'+sel+'" onclick="wardrobeItemClick('+i+')"><img src="'+item.image+'" alt="'+(item.name||item.category)+'"><div class="w-item-check '+chk+'">'+(chk?'✓':'')+'</div><div class="w-item-label">'+item.category+'</div></div>';
    } else {
      return'<div class="wardrobe-item" onclick="wardrobeItemClick('+i+')" oncontextmenu="event.preventDefault();startWardrobeSelect('+i+')"><img src="'+item.image+'" alt="'+(item.name||item.category)+'"><div class="w-item-label">'+item.category+'</div></div>';
    }
  }).join('');
}

function openAddClothes(){
  editingClothesIdx = -1; pendingImage = null;
  document.getElementById('uploadPreview').classList.add('hidden');
  document.getElementById('uploadPlaceholder').classList.remove('hidden');
  document.getElementById('fileInput').value='';document.getElementById('clothName').value='';
  document.getElementById('clothSubtype').value='';document.getElementById('clothCategory').value='上衣';
  selectedTemps={};
  renderTempTags();document.getElementById('addClothesModal').classList.add('active');
}

function handleFileSelect(e){
  var file=e.target.files[0];if(!file)return;
  var reader=new FileReader();
  reader.onload=function(ev){
    pendingImage=ev.target.result;
    var preview=document.getElementById('uploadPreview');preview.src=pendingImage;
    preview.classList.remove('hidden');document.getElementById('uploadPlaceholder').classList.add('hidden');
  };
  reader.readAsDataURL(file);
}

function renderTempTags(){
  var el=document.getElementById('tempTags');if(!el)return;
  el.innerHTML=TEMP_RANGES.map(function(r){
    return'<span class="temp-tag '+(selectedTemps[r.key]?'selected':'')+'" onclick="toggleTemp(\''+r.key+'\')">'+r.label+'</span>';
  }).join('');
}

function toggleTemp(key){selectedTemps[key]=!selectedTemps[key];renderTempTags();}

function saveClothes(){
  var cat=document.getElementById('clothCategory').value;
  var name=document.getElementById('clothName').value.trim()||cat;
  var subtype=document.getElementById('clothSubtype').value.trim();
  var temps=Object.keys(selectedTemps).filter(function(k){return selectedTemps[k];});
  if(editingClothesIdx>=0){
    var item=store.clothes[editingClothesIdx];
    if(!item)return;
    item.category=cat;item.name=name;item.subtype=subtype;item.temps=temps;
    if(pendingImage)item.image=pendingImage;
  }else{
    if(!pendingImage){alert('请先选择图片');return;}
    store.clothes.push({category:cat,name:name,subtype:subtype,temps:temps,image:pendingImage,createdAt:Date.now()});
  }
  saveStore();pendingImage=null;selectedTemps={};editingClothesIdx=-1;
  closeModal('addClothesModal');renderWardrobe();
}

function editClothes(i){
  var item=store.clothes[i];if(!item)return;
  if(confirm('删除 '+(item.name||item.category)+'？')){store.clothes.splice(i,1);saveStore();renderWardrobe();}
}

function closeModal(id){document.getElementById(id).classList.remove('active');}

// ===== Init =====

// ============================================
//  PK 对决模式（守擂）
// ============================================
var pkState = null, currentEatMode = 'wheel';

function setEatMode(mode) {
  currentEatMode = mode;
  document.getElementById('modeTabWheel').classList.toggle('active', mode === 'wheel');
  document.getElementById('modeTabPK').classList.toggle('active', mode === 'pk');
  document.getElementById('eatWheelMode').classList.toggle('hidden', mode !== 'wheel');
  document.getElementById('eatPKMode').classList.toggle('hidden', mode !== 'pk');
  if (mode === 'pk') startPK();
}

function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

function startPK() {
  var items = selectedCategory ? (store.foodItems[selectedCategory]||[]).slice() : store.foods.slice();
  if (items.length < 2) {
    document.getElementById('pkRoundInfo').textContent = '至少需要2个选项！';
    return;
  }
  items = shuffleArray(items);
  pkState = { items: items, champion: items[0], challengerIdx: 1, round: 1, total: items.length - 1, history: [] };
  document.getElementById('pkResetBtn').style.display = 'none';
  renderPK();
}


function renderPK() {
  if (!pkState) return;
  if (pkState.round > pkState.total) {
    document.getElementById('pkResetBtn').style.display = 'block';
    showEatResult(pkState.champion);
    pkState = null;
    return;
  }
  var challenger = pkState.items[pkState.challengerIdx];
  document.getElementById('pkRoundInfo').textContent = '第 ' + pkState.round + '/' + pkState.total + ' 轮';
  document.getElementById('pkCardA').textContent = pkState.champion;
  document.getElementById('pkCardA').className = 'pk-card';
  document.getElementById('pkCardB').textContent = challenger;
  document.getElementById('pkCardB').className = 'pk-card';
  pkState.currentChallenger = challenger;
  renderPKProgress();
}

function renderPKProgress() {
  var el = document.getElementById('pkProgress');
  if (!el || !pkState) return;
  var html = '';
  for (var i = 0; i < pkState.total; i++) {
    if (i < pkState.round - 1) html += '<span class="pk-dot win"></span>';
    else if (i === pkState.round - 1) html += '<span class="pk-dot active"></span>';
    else html += '<span class="pk-dot"></span>';
  }
  el.innerHTML = html + ' <span style="font-size:11px;color:#999;margin-left:4px">' + (pkState.total - pkState.round + 1) + '次剩余</span>';
}


function pkSelect(idx) {
  if (!pkState) return;
  if (idx === 0) {
    // Champion wins - stays, challenger is eliminated
    pkState.history.push({ win: pkState.champion, lose: pkState.items[pkState.challengerIdx] });
    var cardA = document.getElementById('pkCardA');
    cardA.className = 'pk-card winner';
  } else {
    // Challenger wins - becomes new champion
    pkState.history.push({ win: pkState.items[pkState.challengerIdx], lose: pkState.champion });
    pkState.champion = pkState.items[pkState.challengerIdx];
    var cardB = document.getElementById('pkCardB');
    cardB.className = 'pk-card winner';
  }
  pkState.challengerIdx++;
  pkState.round++;
  setTimeout(function() { renderPK(); }, 350);
}

function resetPK() { pkState = null; startPK(); }



// ============================================
//  食物分类
// ============================================
function renderCategories() {
  var cats = store.foodCats || Object.keys(store.foodItems);
  var grid = document.getElementById('catGrid');
  if (!grid) return;
  if (cats.length === 0) {
    grid.innerHTML = '<div class="cat-empty">还没有分类，点击右上角添加</div>';
    return;
  }
  grid.innerHTML = cats.map(function(c){
    var items = store.foodItems[c] || [];
    var emoji = CAT_EMOJI[c] || '📦';
    return '<div class="cat-card" onclick="selectCategory(\'' + c + '\')"><div class="cat-emoji">' + emoji + '</div><div class="cat-name">' + c + '</div><div class="cat-count">' + items.length + '项</div></div>';
  }).join('');
  grid.innerHTML += '<div class="cat-card add-cat" onclick="toggleEatEdit()"><div class="cat-emoji">➕</div><div class="cat-name">管理分类</div></div>';
}

function selectCategory(cat) {
  selectedCategory = cat;
  var items = store.foodItems[cat] || [];
  var cv = document.getElementById('eatCategoryView');
  var iv = document.getElementById('eatItemView');
  if (cv) cv.style.display = 'none';
  if (iv) iv.classList.remove('hidden');
  document.getElementById('eatBackBtn').textContent = '←';
  document.getElementById('eatPageTitle').textContent = (CAT_EMOJI[cat]||'') + ' ' + cat;
  // Reset modes
  currentEatMode = 'wheel';
  pkState = null;
  var tw = document.getElementById('modeTabWheel');
  var tp = document.getElementById('modeTabPK');
  var wm = document.getElementById('eatWheelMode');
  var pm = document.getElementById('eatPKMode');
  if (tw && tp) { tw.classList.add('active'); tp.classList.remove('active'); }
  if (wm && pm) { wm.classList.remove('hidden'); pm.classList.add('hidden'); }
  // If empty, show message
  if (items.length < 2) {
    document.getElementById('wheelResult').textContent = '至少需要2个选项，去加点吧 ✏️';
  } else {
    document.getElementById('wheelResult').textContent = '转一下试试！';
  }
  renderEatList();
  drawWheel();
}

function eatGoBack() {
  var cv = document.getElementById('eatCategoryView');
  var iv = document.getElementById('eatItemView');
  if (cv && iv && iv.classList.contains('hidden')) {
    // In category view, go home
    goPage('home');
  } else {
    // In item view, go back to categories
    selectedCategory = '';
    if (cv) cv.style.display = '';
    if (iv) iv.classList.add('hidden');
    document.getElementById('eatBackBtn').textContent = '←';
    document.getElementById('eatPageTitle').textContent = '今天吃什么';
    renderCategories();
  }
}

// Override edit functions
var _origRenderEdit = renderEditList;
renderEditList = function() {
  var el = document.getElementById('editItems');
  if (!el) return;
  var cat = document.getElementById('editCatSelect');
  var curCat = cat ? cat.value : (store.foodCats[0] || '主食');
  var items = store.foodItems[curCat] || [];
  el.innerHTML = items.map(function(f,i){
    return '<div class="edit-item-row"><span class="item-name">' + f + '</span><button class="item-del" onclick="removeFood(\'' + curCat + '\',' + i + ')">✕</button></div>';
  }).join('');
};

function switchEditCategory(cat) {
  renderEditList();
}

function removeFood(cat, i) {
  if (store.foodItems[cat]) {
    store.foodItems[cat].splice(i, 1);
    saveStore();
    renderEditList();
    renderEatList();
    drawWheel();
  }
}

function addFood() {
  var inp = document.getElementById('newFoodInput');
  var v = inp.value.trim();
  if (!v) return;
  var cat = document.getElementById('editCatSelect').value;
  if (!store.foodItems[cat]) store.foodItems[cat] = [];
  store.foodItems[cat].push(v);
  saveStore();
  inp.value = '';
  renderEditList();
  renderEatList();
  drawWheel();
  renderCategories();
}

function addCategory() {
  var inp = document.getElementById('newCatInput');
  var v = inp.value.trim();
  if (!v) return;
  if (!store.foodItems) store.foodItems = {};
  if (!store.foodCats) store.foodCats = [];
  if (store.foodItems[v]) { alert('分类已存在'); return; }
  store.foodItems[v] = [];
  store.foodCats.push(v);
  saveStore();
  inp.value = '';
  renderEditCategoryList();
  renderCategories();
}

function renderEditCategoryList() {
  var el = document.getElementById('editCatList');
  if (!el) return;
  var cats = store.foodCats || [];
  el.innerHTML = cats.map(function(c){
    var emoji = CAT_EMOJI[c] || '📦';
    return '<span class="edit-cat-tag">' + emoji + ' ' + c + ' <span class="cat-del" onclick="deleteCategory(\'' + c + '\')">✕</span></span>';
  }).join('');
  // Populate dropdown
  var sel = document.getElementById('editCatSelect');
  if (sel) {
    var curVal = sel.value;
    sel.innerHTML = cats.map(function(c){return '<option value="\'' + c + '\""' + (c===curVal?' selected':'') + '>' + c + '</option>';}).join('');
  }
}

function deleteCategory(cat) {
  if (store.foodCats.length <= 1) { alert('至少保留一个分类'); return; }
  if (!confirm('删除 "' + cat + '" 及其所有菜品？')) return;
  store.foodCats = store.foodCats.filter(function(c){return c!==cat;});
  delete store.foodItems[cat];
  saveStore();
  renderEditCategoryList();
  renderCategories();
}

function resetEatList() {
  if (!confirm('恢复默认分类和菜品？自定义内容将丢失。')) return;
  store.foodCats = [...DEFAULT_CAT_ORDER];
  store.foodItems = JSON.parse(JSON.stringify(DEFAULT_FOOD_ITEMS));
  saveStore();
  renderEditCategoryList();
  renderEditList();
  renderEatList();
  drawWheel();
  renderCategories();
}

// Override toggleEatEdit
var _origToggleEdit = toggleEatEdit;
toggleEatEdit = function() {
  var m = document.getElementById('eatEditModal');
  m.classList.toggle('active');
  if (m.classList.contains('active')) {
    // Populate category dropdown
    var sel = document.getElementById('editCatSelect');
    if (sel) {
      sel.innerHTML = store.foodCats.map(function(c){return '<option value="\'' + c + '\'">' + c + '</option>';}).join('');
    }
    renderEditList();
    renderEditCategoryList();
  }
};

function closeEatEdit() {
  document.getElementById('eatEditModal').classList.remove('active');
  renderEatList();
  if (selectedCategory) drawWheel();
  renderCategories();
}

// Update spinWheel to use category items
var _origSpinWheel = spinWheel;
spinWheel = function() {
  var wItems = selectedCategory ? (store.foodItems[selectedCategory]||[]) : (store.foods||[]);
  if(wheelSpinning||wItems.length===0)return;
  wheelSpinning=true;document.getElementById('spinBtn').disabled=true;
  document.getElementById('wheelResult').textContent='转啊转...';
  var vel=0.3+Math.random()*0.4,friction=0.985,minVel=0.001;
  function animate(){
    vel*=friction;wheelAngle+=vel;
    if(vel<minVel){
      wheelSpinning=false;document.getElementById('spinBtn').disabled=false;
      var n=wItems.length,seg=2*Math.PI/n,pa=-Math.PI/2;
      var rel=pa-wheelAngle;rel=((rel%(2*Math.PI))+2*Math.PI)%(2*Math.PI);
      var idx=Math.floor(rel/seg)%n;
      if(wItems[idx])showEatResult(wItems[idx]);
    }
    drawWheel();
    if(vel>=minVel)requestAnimationFrame(animate);
  }
  animate();
};


// ============================================
//  数据导出/导入
// ============================================
function exportData() {
  var data = JSON.stringify({
    foodCats: store.foodCats,
    foodItems: store.foodItems,
    clothes: store.clothes,
    outfits: store.outfits,
    exportedAt: new Date().toISOString()
  }, null, 2);
  var blob = new Blob([data], {type: 'application/json'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  var d = new Date();
  var dateStr = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
  a.download = '选我吧_数据备份_' + dateStr + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
}

function importData(event) {
  var file = event.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      if (!data.foodCats || !data.foodItems || !data.clothes || !data.outfits) {
        alert('数据格式不正确，请确认是选我吧导出的 JSON 文件');
        return;
      }
      store = {
        foodCats: data.foodCats,
        foodItems: data.foodItems,
        clothes: data.clothes,
        outfits: data.outfits
      };
      saveStore();
      alert('✅ 导入成功！共 ' + data.foodCats.length + ' 个分类、' + data.clothes.length + ' 件衣物、' + data.outfits.length + ' 条搭配记录');
      // Refresh current page
      var cur = document.querySelector('.page.active');
      if (cur) {
        var id = cur.id.replace('page-', '');
        goPage(id);
      }
    } catch(err) {
      alert('导入失败：' + err.message);
    }
  };
  reader.readAsText(file);
  // Reset input so same file can be imported again
  event.target.value = '';
}


// ============================================
//  衣橱 - 图片查看 + 多选删除
// ============================================
var viewerItems = [], viewerIndex = 0, viewerTouchX = 0, viewerOriginalIndex = 0;
var wardrobeSelectMode = false, selectedWardrobeItems = {}, editingClothesIdx = -1, currentSpannedZones = [];

function openImageViewer(idx) {
  var items = store.clothes;
  if (wardrobeFilter !== 'all') items = items.filter(function(c){ return c.category === wardrobeFilter; });
  viewerItems = items; viewerIndex = idx;
  viewerOriginalIndex = idx < items.length ? store.clothes.indexOf(items[idx]) : -1;
  renderViewer();
  document.getElementById('imageViewer').classList.add('active');
}

function renderViewer() {
  if (!viewerItems.length) return;
  var item = viewerItems[viewerIndex];
  document.getElementById('viewerImage').src = item.image;
  document.getElementById('viewerIndex').textContent = (viewerIndex + 1) + '/' + viewerItems.length;
  document.getElementById('viewerName').textContent = item.name || item.category;
}

function viewerPrev() { if (viewerIndex > 0) { viewerIndex--; renderViewer(); } }
function viewerNext() { if (viewerIndex < viewerItems.length - 1) { viewerIndex++; renderViewer(); } }
function closeImageViewer() { document.getElementById('imageViewer').classList.remove('active'); }
function viewerTouchStart(e) { viewerTouchX = e.touches[0].clientX; }
function viewerTouchEnd(e) {
  var dx = e.changedTouches[0].clientX - viewerTouchX;
  if (Math.abs(dx) > 50) { if (dx > 0) viewerPrev(); else viewerNext(); }
}

function wardrobeItemClick(idx) {
  if (wardrobeSelectMode) { toggleWardrobeSelect(idx); }
  else { openImageViewer(idx); }
}

function startWardrobeSelect(idx) {
  wardrobeSelectMode = true; selectedWardrobeItems = {};
  var bar = document.getElementById('wardrobeActionBar');
  if (bar) { bar.classList.remove('hidden'); bar.style.display = 'flex'; }
  toggleWardrobeSelect(idx);
  renderWardrobeGrid();
  renderWardrobeFilters();
}

function toggleWardrobeSelect(idx) {
  if (selectedWardrobeItems[idx]) { delete selectedWardrobeItems[idx]; }
  else { selectedWardrobeItems[idx] = true; }
  renderWardrobeGrid();
  var count = Object.keys(selectedWardrobeItems).length;
  var btn = document.getElementById('deleteSelectedBtn');
  if (btn) btn.textContent = '删除选中 (' + count + ')';
}


function editCurrentViewerItem() {
  if (viewerOriginalIndex >= 0 && viewerOriginalIndex < store.clothes.length) {
    closeImageViewer();
    editClothesItem(viewerOriginalIndex);
  }
}

function editClothesItem(idx) {
  var item = store.clothes[idx];
  if (!item) return;
  editingClothesIdx = idx;
  document.getElementById('clothCategory').value = item.category;
  document.getElementById('clothName').value = item.name || '';
  document.getElementById('clothSubtype').value = item.subtype || '';
  var preview = document.getElementById('uploadPreview');
  preview.src = item.image; preview.classList.remove('hidden');
  document.getElementById('uploadPlaceholder').classList.add('hidden');
  pendingImage = null;
  selectedTemps = {};
  if (item.temps) item.temps.forEach(function(t){ selectedTemps[t]=true; });
  renderTempTags();
  document.getElementById('addClothesModal').classList.add('active');
}

function exitWardrobeSelect() {
  wardrobeSelectMode = false; selectedWardrobeItems = {};
  var bar = document.getElementById('wardrobeActionBar');
  if (bar) { bar.classList.add('hidden'); bar.style.display = 'none'; }
  renderWardrobeGrid();
  renderWardrobeFilters();
}

function deleteSelectedItems() {
  var indices = Object.keys(selectedWardrobeItems).map(Number).sort(function(a,b){return b-a;});
  if (indices.length === 0) return;
  if (!confirm('确定删除选中的 ' + indices.length + ' 件衣物？')) return;
  for (var i = 0; i < indices.length; i++) store.clothes.splice(indices[i], 1);
  saveStore();
  exitWardrobeSelect();
  renderWardrobe();
}



// ===== Temperature Scroll Picker =====
var tempMinVal = 18, tempMaxVal = 28;

function initTempPickers() {
  for (var pid = 0; pid < 2; pid++) {
    var trackId = pid === 0 ? 'tempMinTrack' : 'tempMaxTrack';
    var defVal = pid === 0 ? 18 : 28;
    var track = document.getElementById(trackId);
    if (!track) continue;
    var h = '';
    for (var t = -10; t <= 45; t++) {
      h += '<div class="picker-item" data-val="' + t + '">' + t + '°</div>';
    }
    track.innerHTML = h;
    setTimeout(function(tid, dv) {
      return function() {
        var items = document.getElementById(tid).querySelectorAll('.picker-item');
        var idx = dv + 10;
        if (idx >= 0 && idx < items.length) {
          items[idx].scrollIntoView({block:'center',behavior:'auto'});
          items[idx].classList.add('sel');
        }
      };
    }(trackId, defVal), 80);
    var picker = track.parentElement;
    (function(pid2, pickerEl) {
      pickerEl.addEventListener('scroll', function() {
        var items = this.querySelectorAll('.picker-item');
        var center = this.scrollTop + this.clientHeight / 2;
        var closest = null, cDist = Infinity;
        items.forEach(function(it) {
          var ic = it.offsetTop + it.offsetHeight / 2;
          var d = Math.abs(ic - center);
          if (d < cDist) { cDist = d; closest = it; }
        });
        if (closest) {
          items.forEach(function(it){ it.classList.toggle('sel', it === closest); });
          var val = parseInt(closest.dataset.val);
          if (pid2 === 0) { tempMinVal = val; var d = document.getElementById('tempMinDisplay'); if(d) d.textContent = val + '°'; }
          else { tempMaxVal = val; var d = document.getElementById('tempMaxDisplay'); if(d) d.textContent = val + '°'; }
          currentTemp = pid2 === 0 ? val : tempMinVal;
          currentTempKey = getTempKey(currentTemp);
          calcSpannedZones();
          updateWeatherPreview();
        }
      });
    })(pid, picker);
  }
  updateWeatherPreview();
}

function calcSpannedZones() {
  currentSpannedZones = [];
  for (var i = 0; i < TEMP_RANGES.length; i++) {
    var r = TEMP_RANGES[i];
    if (r.min <= tempMaxVal && r.max >= tempMinVal) currentSpannedZones.push(r.key);
  }
}

document.addEventListener('DOMContentLoaded',function(){goPage('home');});
// ===== Global closing modal on backdrop click =====
document.querySelectorAll('.modal-overlay').forEach(function(el){
  el.addEventListener('click',function(){this.classList.remove('active');});
});
