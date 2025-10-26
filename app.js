/* Datos de actividades */
const activities = [
  { name: "Misión de trafico ilegal", days: [1,4,6], times: [{s:9,e:12},{s:17,e:20},{s:22,e:23}], points:2, color:'bg-gradient-to-r from-red-600 to-red-700', imageUrl:'https://i.imgur.com/5g17dYS.png' },
  { name: "Robo a negocio", days: [1,3,5,0], times: [{s:0,e:11},{s:12,e:23}], points:7, color:'bg-gradient-to-r from-amber-600 to-orange-600', imageUrl:'https://i.imgur.com/JUWFF2v.png' },
  { name: "Lancha encallada", days: [1,2,5,0], times: [{s:2,e:4},{s:16,e:18},{s:18,e:20},{s:20,e:22}], points:5, color:'bg-gradient-to-r from-sky-600 to-blue-700', imageUrl:'https://i.imgur.com/7yExPve.png' },
  { name: "Elaboración de meta (Día 1)", days: [1], times: [{s:7,e:23}], points:31, color:'bg-gradient-to-r from-violet-600 to-purple-700', imageUrl:'https://i.imgur.com/hQK0B9C.png' },
  { name: "Elaboración de meta (Día 2)", days: [3], times: [{s:7,e:23}], points:32, color:'bg-gradient-to-r from-violet-700 to-purple-800', imageUrl:'https://i.imgur.com/z9QYoBZ.png' },
  { name: "Elaboración de meta (Día 3)", days: [5], times: [{s:7,e:23}], points:31, color:'bg-gradient-to-r from-violet-800 to-purple-900', imageUrl:'https://i.imgur.com/qbbarlo.png' },
  { name: "Dia de recompensa (Meta)", days: [0], times: [{s:7,e:23}], points:100, color:'bg-gradient-to-r from-fuchsia-600 to-pink-700', imageUrl:'https://i.imgur.com/O3UmMpF.png' },
  { name: "Reparto de químicos", days: [1,4], times: [{s:14,e:20}], points:10, color:'bg-gradient-to-r from-emerald-600 to-green-700', imageUrl:'https://i.imgur.com/cz5l19l.png' },
  { name: "Reparto aéreo", days: [2,5], times: [{s:9,e:12},{s:17,e:20},{s:22,e:23}], points:7, color:'bg-gradient-to-r from-green-600 to-emerald-700', imageUrl:'https://i.imgur.com/vgF27D5.png' },
  { name: "Búsqueda de contenedores", days: [3,4,6,0], times: [{s:2,e:4},{s:18,e:20},{s:20,e:22},{s:22,e:23}], points:10, color:'bg-gradient-to-r from-sky-600 to-cyan-700', imageUrl:'https://i.imgur.com/G7DZcsj.png' },
  { name: "Misión de trafico ilegal (Avanzado)", days: [2,3,0], times: [{s:7,e:10},{s:14,e:20},{s:21,e:22}], points:1, color:'bg-gradient-to-r from-red-800 to-red-900', imageUrl:'https://i.imgur.com/kTvRh1q.png' },
  { name: "Arrasa con sus vehículos", days: [2,4,6,0], times: [{s:18,e:19},{s:21,e:22}], points:10, color:'bg-gradient-to-r from-orange-600 to-red-600', imageUrl:'https://i.imgur.com/ZEbgB1c.png' },
  { name: "Mantenimiento de maquinas de lavado", days: [5], times: [{s:19,e:20}], points:20, color:'bg-gradient-to-r from-teal-600 to-cyan-700', imageUrl:'https://i.imgur.com/FgZsNsf.png' },
  { name: "Trafico múltiple", days: [2,6], times: [{s:21,e:22}], points:5, color:'bg-gradient-to-r from-orange-600 to-amber-600', imageUrl:'https://i.imgur.com/njqjUaY.png' },
  { name: "Trafico de órganos", days: [2], times: [{s:19,e:21}], points:10, color:'bg-gradient-to-r from-red-700 to-rose-800', imageUrl:'https://i.imgur.com/yuSriKs.png' },
  { name: "Mantenimiento de secuestrado", days: [1], times: [{s:16,e:23}], points:10, color:'bg-gradient-to-r from-rose-700 to-pink-800', imageUrl:'https://i.imgur.com/YNEosvp.png' },
  { name: "Busqueda acuatica", days: [1,6,0], times: [{s:20,e:21}], points:5, color:'bg-gradient-to-r from-cyan-500 to-blue-600', imageUrl:'https://i.imgur.com/iXRUwQb.png' },
  { name: "Tráfico Aéreo", days: [5,0], times: [{s:1,e:3},{s:10,e:12},{s:14,e:20}], points:2, color:'bg-gradient-to-r from-indigo-500 to-blue-600', imageUrl:'https://placehold.co/600x400/4f46e5/ffffff?text=Tr%C3%A1fico+A%C3%A9reo' },
  { name: "Barriles a la Deriva", days: [3,6], times: [{s:9,e:12},{s:16,e:18}], points:2, color:'bg-gradient-to-r from-amber-600 to-yellow-600', imageUrl:'https://placehold.co/600x400/f59e0b/ffffff?text=Barriles+a+la+Deriva' }
];

const dayNames = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
let currentView = 'hub'; // 'hub' o 'local'
const localOffsetHours = Math.round(new Date().getTimezoneOffset() / -60);
const lastTrackAssignment = {};

/* utilidades */
function two(n){ return String(n).padStart(2,'0'); }
function formatHHMMSSFromDate(d, useUTC=false){
  if(!d || !(d instanceof Date)) return '--:--:--';
  const H = useUTC ? d.getUTCHours() : d.getHours();
  const M = useUTC ? d.getUTCMinutes() : d.getMinutes();
  const S = useUTC ? d.getUTCSeconds() : d.getSeconds();
  return `${two(H)}:${two(M)}:${two(S)}`;
}
function getLocalTZLabel(){
  try { const tz = Intl.DateTimeFormat().resolvedOptions().timeZone; if(tz) return tz; } catch(e){}
  const offsetMin = -new Date().getTimezoneOffset();
  const sign = offsetMin >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMin);
  const hours = Math.floor(abs/60);
  const mins = abs%60;
  return `GMT${sign}${two(hours)}:${two(mins)}`;
}

/* Actualizar relojes visibles */
function updateClocks(){
  const now = new Date();
  const localEl = document.getElementById('local-time');
  const hubEl = document.getElementById('hub-time');
  const localTzEl = document.getElementById('local-tz');
  const indicator = document.getElementById('time-view-indicator');
  const tzToggleText = document.getElementById('tz-toggle-text');

  if(localEl) localEl.textContent = formatHHMMSSFromDate(now, false);
  if(hubEl) hubEl.textContent = formatHHMMSSFromDate(now, true); // HUB = UTC
  if(localTzEl) localTzEl.textContent = getLocalTZLabel();
  if (indicator) {
    const textEl = document.getElementById('time-view-text');
    if (textEl) {
        if (currentView === 'hub') {
        textEl.textContent = 'HORA HUB';
        indicator.classList.remove('local','unknown');
        indicator.classList.add('hub');
        } else {
        textEl.textContent = 'HORA LOCAL';
        indicator.classList.remove('hub','unknown');
        indicator.classList.add('local');
        }
    } else {
        // fallback: si el span no existe, escribir en el container
        indicator.textContent = currentView === 'hub' ? 'HORA HUB' : 'HORA LOCAL';
    }
  }
  if(tzToggleText) tzToggleText.textContent = currentView === 'hub' ? '🌍 Ver Hora Local' : '🏢 Ver Hora HUB';
}

/* Generación del calendario */
function generateContent(){
  const container = document.getElementById('calendar-container');
  if(!container) return;
  updateAnalytics();

  const offset = currentView === 'local' ? localOffsetHours : 0;

  const dayBuckets = {};
  for(let d=0; d<7; d++) dayBuckets[d] = [];

  activities.forEach(act=>{
    (act.days||[]).forEach(origDay=>{
      (act.times||[]).forEach(t=>{
        if (typeof t.s !== 'number' || typeof t.e !== 'number') return;
        let s = t.s + offset;
        let e = t.e + offset;
        if (e <= s) e += 24;
        if (s < 0){ s += 24; e += 24; }
        dayBuckets[origDay].push({ activity: act, s: s, e: e, dur: e - s });
      });
    });
  });

  const dayOrder = [1,2,3,4,5,6,0];
  const htmlDays = [];

  dayOrder.forEach(dayHub => {
    const slots = (dayBuckets[dayHub] || []).slice();

    if (slots.length === 0){
      const nameIndex = dayHub === 0 ? 6 : dayHub - 1;
      const displayName = dayNames[nameIndex];
      htmlDays.push(`
        <div id="day-container-${dayHub}" class="timeline-container p-6 day-container transition-all duration-300">
          <div class="day-header -m-6 mb-6 p-6 rounded-t-2xl">
            <div class="flex justify-between items-center">
              <h3 class="font-black text-2xl text-white">${displayName}</h3>
              <div class="flex gap-4 text-sm">
                <div class="bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm"><span class="text-blue-200">0 actividades</span></div>
                <div class="bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm"><span class="text-yellow-200">0 pts</span></div>
              </div>
            </div>
          </div>
          <div class="overflow-x-auto custom-scrollbar">
            <div class="relative timeline-grid" style="height:60px; min-width:2400px;"></div>
            <div class="flex w-[2400px] border-t border-gray-600/50 mt-2 pt-2">
              ${Array.from({length:24},(_,h)=>`<div class="hour-label text-gray-400">${String(h).padStart(2,'0')}:00</div>`).join('')}
            </div>
          </div>
        </div>
      `);
      return;
    }

    const maxEnd = Math.max(...slots.map(s => s.e), 24);
    const hoursToShow = Math.ceil(maxEnd);
    const gridWidthPx = hoursToShow * 100;
    const tracks = assignTracksForDay(slots, dayHub);

    const tracksHTML = tracks.map(track => {
      const items = track.map(slot => {
        const leftPx = Math.round(slot.s * 100);
        const widthPx = Math.max(6, Math.round(slot.dur * 100));
        const pointsText = typeof slot.activity.points === 'number' ? `${slot.activity.points} pts` : '?';
        const overflowBadge = slot.e > 24 ? `<div class="absolute top-2 right-2 text-xs bg-black/40 px-2 py-0.5 rounded-full">fin: ${getDayNameAfterOffset(dayHub, Math.floor(slot.e/24))}</div>` : '';
        return `
          <div class="timeline-item group" style="left:${leftPx}px; width:${widthPx}px;" data-day="${dayHub}" data-render-start="${slot.s}" data-render-end="${slot.e}" data-activity="${encodeURIComponent(slot.activity.name)}">
            <div class="timeline-item-inner ${slot.activity.color} text-white relative">
              <div class="absolute inset-0 bg-black/20 rounded-xl"></div>
              ${overflowBadge}
              <div class="relative z-10 h-full flex flex-col justify-center items-center text-center p-2">
                <div class="font-bold text-xs leading-tight mb-1 line-clamp-2">${slot.activity.name}</div>
                <div class="text-xs opacity-90 font-semibold">${pointsText}</div>
              </div>
              <div class="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        `;
      }).join('');
      return `<div class="relative h-[60px]">${items}</div>`;
    }).join('');

    const hourLabelsHTML = Array.from({length: hoursToShow}, (_,i)=>{
      const hour = i % 24;
      const dayOffset = Math.floor(i / 24);
      const badge = dayOffset === 0 ? '' : `<span class="ml-2 text-xs text-gray-300">(${getDayNameAfterOffset(dayHub, dayOffset)})</span>`;
      return `<div class="hour-label text-gray-400">${String(hour).padStart(2,'0')}:00 ${badge}</div>`;
    }).join('');

    const nameIndex = dayHub === 0 ? 6 : dayHub - 1;
    const displayName = dayNames[nameIndex];
    const activityCount = slots.length;
    const totalPoints = slots.reduce((s,slot)=> s + (slot.activity.points||0), 0);

    htmlDays.push(`
      <div id="day-container-${dayHub}" class="timeline-container p-6 day-container transition-all duration-300">
        <div class="day-header -m-6 mb-6 p-6 rounded-t-2xl">
          <div class="flex justify-between items-center">
            <h3 class="font-black text-2xl text-white">${displayName}</h3>
            <div class="flex gap-4 text-sm">
              <div class="bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm"><span class="text-blue-200">${activityCount} actividades</span></div>
              <div class="bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm"><span class="text-yellow-200">${totalPoints} pts</span></div>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto custom-scrollbar">
          <div class="relative timeline-grid" style="height:${Math.max(tracks.length,1)*60}px; min-width:${gridWidthPx}px;">
            ${tracksHTML}
            <div class="day-transition-marker" style="left:${24*100}px;"></div>
            <div class="day-transition-badge" style="left:${24*100}px;">${getDayNameAfterOffset(dayHub,1)}</div>
          </div>

          <div class="flex" style="min-width:${gridWidthPx}px; border-top:1px solid rgba(148,163,184,.06); margin-top:8px; padding-top:6px;">
            ${hourLabelsHTML}
          </div>
        </div>
      </div>
    `);
  });

  container.innerHTML = htmlDays.join('');

  // enlazar clicks
  document.querySelectorAll('.timeline-item').forEach(it=>{
    it.addEventListener('click', ()=> {
      const name = decodeURIComponent(it.getAttribute('data-activity')||'');
      showActivityModal(name);
    });
  });

  injectNowLines();
  updateActiveStatus();
}

/* Mantener actividad en la misma pista si es posible */
function assignTracksForDay(slots, dayHub){
  if(!lastTrackAssignment[dayHub]) lastTrackAssignment[dayHub] = {};
  const tracks = [];
  slots.sort((a,b)=> {
    if (a.s !== b.s) return a.s - b.s;
    return (b.dur - a.dur);
  });
  function overlaps(aS,aE,bS,bE){ return aS < bE && bS < aE; }
  slots.forEach(slot=>{
    const key = slot.activity.name;
    const preferred = lastTrackAssignment[dayHub][key];
    let placed = false;
    if (typeof preferred === 'number' && preferred < tracks.length){
      const conflict = tracks[preferred].some(ex => overlaps(slot.s, slot.e, ex.s, ex.e));
      if (!conflict) { tracks[preferred].push(slot); placed = true; }
    }
    if (!placed){
      for (let i=0;i<tracks.length;i++){
        const conflict = tracks[i].some(ex => overlaps(slot.s, slot.e, ex.s, ex.e));
        if (!conflict){ tracks[i].push(slot); lastTrackAssignment[dayHub][key] = i; placed = true; break; }
      }
    }
    if (!placed){
      lastTrackAssignment[dayHub][key] = tracks.length;
      tracks.push([slot]);
    }
  });
  return tracks;
}

/* Dibuja la línea "ahora" y soporta horas extendidas */
function injectNowLines(){
  document.querySelectorAll('.now-line').forEach(n=>n.remove());
  const now = new Date();
  const isHub = currentView === 'hub';
  const nowHour = isHub ? now.getUTCHours() + now.getUTCMinutes()/60 + now.getUTCSeconds()/3600 : now.getHours() + now.getMinutes()/60 + now.getSeconds()/3600;
  const nowDay = isHub ? now.getUTCDay() : now.getDay();

  document.querySelectorAll('[id^="day-container-"]').forEach(container=>{
    const dayHub = Number(container.id.split('-').pop());
    const grid = container.querySelector('.timeline-grid');
    if(!grid) return;

    const minWidthStr = grid.style.minWidth || `${grid.getBoundingClientRect().width}px`;
    const hoursShown = Math.max(1, Math.round((parseFloat(minWidthStr) || grid.clientWidth || 2400) / 100));

    let draw = false;
    let x = 0;

    if (dayHub === nowDay){
      draw = true;
      x = nowHour * 100;
    } else {
      const prevDay = (nowDay + 6) % 7;
      if (dayHub === prevDay) {
        if ((24 + nowHour) < hoursShown) {
          draw = true;
          x = (24 + nowHour) * 100;
        }
      }
    }

    if (!draw) return;
    if (x < -200 || x > (hoursShown * 100 + 200)) return;

    const nowLine = document.createElement('div');
    nowLine.className = 'now-line';
    nowLine.style.left = `${x}px`;
    const gridRect = grid.getBoundingClientRect();
    const gridHeight = Math.max(30, gridRect.height || parseFloat(grid.style.height) || 60);
    nowLine.style.top = `0px`;
    nowLine.style.height = `${gridHeight+15}px`;
    nowLine.style.position = 'absolute';
    grid.appendChild(nowLine);
  });
}

/* Resalta la actividad en curso (considera horas extendidas) */
function updateActiveStatus(){
  const now = new Date();
  const isHub = currentView === 'hub';
  const curDay = isHub ? now.getUTCDay() : now.getDay();
  const curHour = isHub ? now.getUTCHours() + now.getUTCMinutes()/60 + now.getUTCSeconds()/3600 : now.getHours() + now.getMinutes()/60 + now.getSeconds()/3600;

  document.querySelectorAll('.timeline-item').forEach(item=>{
    const parentDay = Number(item.getAttribute('data-day'));
    const rs = parseFloat(item.getAttribute('data-render-start'));
    const re = parseFloat(item.getAttribute('data-render-end'));
    const inner = item.querySelector('.timeline-item-inner');
    if (!inner || isNaN(rs) || isNaN(re)) return;

    if (parentDay === curDay && curHour >= rs && curHour < re){
      inner.classList.add('active-activity'); item.style.zIndex = '60';
    } else {
      const prev = (curDay + 6) % 7;
      if (parentDay === prev && (curHour + 24) >= rs && (curHour + 24) < re){
        inner.classList.add('active-activity'); item.style.zIndex = '60';
      } else {
        inner.classList.remove('active-activity'); item.style.zIndex = '1';
      }
    }
  });
}

/* Analytics (resumen simple) */
function updateAnalytics(){
  const dailyActivityCount = new Array(7).fill(0);
  const dailyPoints = new Array(7).fill(0);
  activities.forEach(act=>{
    (act.days||[]).forEach(d=>{
      const idx = d === 0 ? 6 : d - 1;
      dailyActivityCount[idx] += (act.times||[]).length;
      if (typeof act.points === 'number') dailyPoints[idx] += act.points * (act.times||[]).length;
    });
  });
  const maxPoints = Math.max(...dailyPoints);
  const bestDays = dayNames.filter((_,i)=> dailyPoints[i]===maxPoints);
  const minActivities = Math.min(...dailyActivityCount);
  const calmestDays = dayNames.filter((_,i)=> dailyActivityCount[i]===minActivities);
  const bd = document.getElementById('best-days');
  const cd = document.getElementById('calmest-days');
  if (bd) bd.innerHTML = `<div class="relative z-10"><h3 class="font-bold text-sm mb-3 text-emerald-300 flex items-center gap-2"><span class="w-2 h-2 bg-emerald-400 rounded-full pulse-dot"></span>MÁXIMOS PUNTOS</h3><p class="text-2xl font-black text-white mb-1">${bestDays.join(', ')}</p><p class="text-sm text-emerald-300"><span class="font-bold text-lg text-emerald-200">${maxPoints}</span> puntos totales</p></div>`;
  if (cd) cd.innerHTML = `<div class="relative z-10"><h3 class="font-bold text-sm mb-3 text-blue-300 flex items-center gap-2"><span class="w-2 h-2 bg-blue-400 rounded-full pulse-dot"></span>MÁS TRANQUILO</h3><p class="text-2xl font-black text-white mb-1">${calmestDays.join(', ')}</p><p class="text-sm text-blue-300"><span class="font-bold text-lg text-blue-200">${minActivities}</span> actividades</p></div>`;
}

/* Contadores para los dos items principales */
function updateCountdowns(){
  const now = new Date();
  const nowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));
  function findNext(name){
    const act = activities.find(a=>a.name===name);
    if (!act) return null;
    let next = null;
    for (let i=0;i<14;i++){
      const check = new Date(nowUTC); check.setUTCDate(nowUTC.getUTCDate()+i);
      if (!act.days.includes(check.getUTCDay())) continue;
      for (const t of act.times){
        const cand = new Date(Date.UTC(check.getUTCFullYear(), check.getUTCMonth(), check.getUTCDate(), t.s,0,0,0));
        if (cand > nowUTC && (!next || cand < next)) next = cand;
      }
      if (next) break;
    }
    return next;
  }
  function fmt(d){
    if (!d) return 'No programado';
    const diff = d - new Date();
    if (diff <= 0) return 'En curso';
    const days = Math.floor(diff/86400000);
    const hrs = Math.floor((diff%86400000)/3600000);
    const mins = Math.floor((diff%3600000)/60000);
    const secs = Math.floor((diff%60000)/1000);
    if (days>0) return `${days}d ${String(hrs).padStart(2,'0')}h ${String(mins).padStart(2,'0')}m`;
    return `${String(hrs).padStart(2,'0')}h ${String(mins).padStart(2,'0')}m ${String(secs).padStart(2,'0')}s`;
  }
  const advEl = document.getElementById('adv-count');
  const mulEl = document.getElementById('mul-count');
  if (advEl) advEl.textContent = fmt(findNext("Misión de trafico ilegal (Avanzado)"));
  if (mulEl) mulEl.textContent = fmt(findNext("Trafico múltiple"));
}

/* Modal */
function showActivityModal(name){
  const act = activities.find(a=>a.name===name);
  if(!act) return;
  document.getElementById('modal-title').textContent = act.name;
  document.getElementById('modal-points').textContent = `${act.points} pts`;
  document.getElementById('modal-image').src = act.imageUrl || '';
  document.getElementById('modal-time-mode').textContent = `Mostrando horas en: ${currentView === 'hub' ? 'HUB (UTC)' : 'LOCAL'}`;
  const scheduleList = document.getElementById('modal-schedule');
  scheduleList.innerHTML = '';
  const offset = currentView === 'local' ? localOffsetHours : 0;
  const ordered = (act.days || []).map(d=> d===0?6:d-1).sort((a,b)=>a-b);
  ordered.forEach(di=>{
    const dayJsIndex = di===6?0:di+1;
    const li = document.createElement('li');
    li.className = 'bg-gray-800/50 p-3 rounded-xl border border-gray-700/50';
    let inner = `<div class="font-bold text-white mb-2 flex items-center gap-2"><span class="w-3 h-3 ${act.color} rounded-full"></span>${dayNames[di]}</div><div class="flex flex-wrap gap-2">`;
    (act.times||[]).forEach(t=>{
      let s = t.s + offset;
      let e = t.e + offset;
      if (e <= s) e += 24;
      const sDisp = ((Math.floor(s))%24+24)%24;
      const eDisp = ((Math.floor(e))%24+24)%24;
      inner += `<button onclick="scrollToDay(${dayJsIndex})" class="flex-1 min-w-0 p-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-medium">${String(sDisp).padStart(2,'0')}:00 - ${String(eDisp).padStart(2,'0')}:00</button>`;
    });
    inner += `</div>`;
    li.innerHTML = inner;
    scheduleList.appendChild(li);
  });
  const modal = document.getElementById('activity-modal');
  modal.classList.remove('hidden'); requestAnimationFrame(()=>{ modal.classList.remove('opacity-0'); modal.querySelector('.modal-content').classList.remove('scale-95'); });
}
function hideActivityModal(){ const modal = document.getElementById('activity-modal'); if(!modal) return; modal.classList.add('opacity-0'); const content = modal.querySelector('.modal-content'); if(content) content.classList.add('scale-95'); setTimeout(()=> modal.classList.add('hidden'),250); }
function scrollToDay(dayJsIndex){ hideActivityModal(); setTimeout(()=>{ const el = document.getElementById(`day-container-${dayJsIndex}`); if(!el) return; el.scrollIntoView({behavior:'smooth', block:'center'}); el.style.transform='scale(1.02)'; el.style.boxShadow='0 0 40px rgba(102,126,234,.6)'; setTimeout(()=>{ el.style.transform=''; el.style.boxShadow=''; },1500); },250); }

function getDayNameAfterOffset(dayHub, offsetDays){
  const originalIndex = dayHub === 0 ? 6 : dayHub - 1;
  const newIndex = (originalIndex + offsetDays) % 7;
  return dayNames[(newIndex + 7) % 7];
}

/* Inicialización */
document.addEventListener('DOMContentLoaded', ()=>{
  const tzBtn = document.getElementById('timezone-toggle');
  if (tzBtn) {
    tzBtn.addEventListener('click', (e)=>{
      currentView = currentView === 'hub' ? 'local' : 'hub';
      updateClocks();
      generateContent();
      updateActiveStatus();
    });
  }
  const mobileBtn = document.getElementById('mobile-timezone-toggle');
  if (mobileBtn) mobileBtn.addEventListener('click', ()=>{
    currentView = currentView === 'hub' ? 'local' : 'hub';
    updateClocks();
    generateContent();
    updateActiveStatus();
  });

  const modal = document.getElementById('activity-modal');
  if (modal) modal.addEventListener('click', e => { if (e.target === e.currentTarget) hideActivityModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hideActivityModal(); });

  generateContent();
  updateClocks();
  updateCountdowns();
  updateActiveStatus();

  setInterval(()=>{ updateClocks(); updateCountdowns(); updateActiveStatus(); injectNowLines(); }, 1000);
  setInterval(()=>{ generateContent(); }, 5*60*1000);

  window.addEventListener('resize', debounce(()=> generateContent(), 250));

  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .25s ease';
  setTimeout(()=> document.body.style.opacity = '1', 80);
});

// Exponer handlers usados por atributos inline
// Esto es necesario porque app.js se carga como module y sus funciones no van a window por defecto.
window.showActivityModal = showActivityModal;
window.hideActivityModal = hideActivityModal;
window.scrollToDay = scrollToDay;


function debounce(fn, wait){ let t; return (...a)=>{ clearTimeout(t); t = setTimeout(()=> fn(...a), wait); }; }


