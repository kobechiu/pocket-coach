(function(){
"use strict";
/* ───── 肌群、器材 ───── */
const MUS={chest:'胸',back:'背',shoulders:'肩',biceps:'二頭',triceps:'三頭',core:'核心',quads:'大腿前側',posterior:'臀與腿後側',calves:'小腿'};
const MUS_ORDER=['chest','back','shoulders','biceps','triceps','core','quads','posterior','calves'];
const BIG=['chest','back','quads','posterior'];
const UPPER=['chest','back','shoulders','biceps','triceps'],LOWER=['quads','posterior','calves','core'];
const EQ={barbell:'槓鈴',rack:'深蹲架',bench:'臥推椅',db:'啞鈴',kb:'壺鈴',cable:'纜繩機',lat:'滑輪下拉機',row:'坐姿划船機',chestpress:'胸推機',pecdeck:'蝴蝶機',smith:'史密斯機',legpress:'腿推機',legext:'腿伸屈機',legcurl:'腿彎舉機',pullup:'引體向上架',dip:'雙槓'};
const MACHINE=['chestpress','pecdeck','lat','row','legpress','legext','legcurl'];

/* ───── 動作資料：id, 名稱, 英文, 主要肌群, 次要, 動作模式, 器材, 難度, 多關節, 加重單位, 單位, 中等程度起始重量(kg), 要點, 示意圖 ───── */
const EX=[];
function X(id,n,en,m,s,pat,eq,lv,comp,inc,unit,st,cue,img){EX.push({id,n,en,m,s,pat,eq,lv,comp:!!comp,inc,unit,st,cue,img:img||pat})}
X('bench','槓鈴臥推','barbell bench press','chest',['triceps','shoulders'],'hpress',['barbell','bench'],1,1,2.5,'kg',30,'肩胛後收下沉，槓下放到胸線，雙腳踩穩地面。');
X('dbbench','啞鈴臥推','dumbbell bench press','chest',['triceps','shoulders'],'hpress',['db','bench'],1,1,2,'each',10,'啞鈴下放到胸側，手肘約 45 度。');
X('incdb','上斜啞鈴臥推','incline dumbbell press','chest',['shoulders','triceps'],'ipress',['db','bench'],1,1,2,'each',8,'椅背調 30 度左右，推向眼睛上方。');
X('smithbench','史密斯臥推','smith machine bench press','chest',['triceps'],'hpress',['smith','bench'],1,1,2.5,'kg',20,'先調好安全擋，槓落點對準胸線。');
X('chestpress','坐姿胸推機','machine chest press','chest',['triceps'],'hpress',['chestpress'],1,1,2.5,'kg',25,'握把對準胸口高度，推出時肩膀不要聳起。','mpress');
X('pushup','伏地挺身','push up','chest',['triceps','core'],'hpress',[],1,1,0,'bw',0,'身體成一直線，胸口接近地面再推起。','pushup');
X('pecdeck','蝴蝶機夾胸','pec deck fly','chest',[],'fly',['pecdeck'],1,0,2.5,'kg',20,'手肘微彎固定，用胸口把手臂合起來。');
X('cablefly','纜繩夾胸','cable crossover','chest',['shoulders'],'fly',['cable'],1,0,2.5,'kg',7.5,'身體微前傾，雙手在胸前畫弧線合攏。');
X('dip','雙槓撐體','chest dip','chest',['triceps'],'hpress',['dip'],2,1,0,'bw',0,'身體微前傾，下到肩膀略低於手肘即可。','dip');
X('pullup','引體向上','pull up','back',['biceps'],'vpull',['pullup'],2,1,0,'bw',0,'先把肩胛往下拉，再把胸口帶向橫桿。','pullup');
X('latpd','滑輪下拉','lat pulldown','back',['biceps'],'vpull',['lat'],1,1,2.5,'kg',30,'拉到上胸，手肘往下往後，不要後仰太多。');
X('straightpd','直臂下壓','straight arm pulldown','back',[],'pullover',['cable'],1,0,2.5,'kg',15,'手臂伸直，用背闊肌把繩子壓到大腿前。');
X('mrow','坐姿划船機','seated row machine','back',['biceps'],'hrow',['row'],1,1,2.5,'kg',30,'胸口貼墊，拉到肚臍，最後擠一下肩胛。');
X('dbrow','單手啞鈴划船','one arm dumbbell row','back',['biceps'],'hrow',['db','bench'],1,1,2,'kg',12,'一手一膝撐椅，把啞鈴拉向髖部。','dbrow');
X('bbrow','槓鈴划船','barbell row','back',['biceps','posterior'],'hrow',['barbell'],2,1,2.5,'kg',30,'髖部後推、背打直，槓拉向下腹。','bbrow');
X('cablerow','纜繩坐姿划船','seated cable row','back',['biceps'],'hrow',['cable'],1,1,2.5,'kg',30,'坐直不晃，拉到肚臍時肩胛收緊。');
X('dbpress','啞鈴肩推','dumbbell shoulder press','shoulders',['triceps'],'vpress',['db','bench'],1,1,2,'each',8,'椅背調直，啞鈴從耳朵高度推到頭頂。');
X('ohp','槓鈴肩推','overhead press','shoulders',['triceps','core'],'vpress',['barbell','rack'],2,1,2.5,'kg',20,'臀腹收緊，槓沿臉前推過頭頂。','ohp');
X('smithpress','史密斯肩推','smith machine shoulder press','shoulders',['triceps'],'vpress',['smith','bench'],1,1,2.5,'kg',15,'槓落在下巴高度，不要撞到頭。');
X('lateral','啞鈴側平舉','dumbbell lateral raise','shoulders',[],'lateral',['db'],1,0,1,'each',4,'手肘微彎，舉到肩膀高度，慢慢放下。');
X('cablelat','纜繩側平舉','cable lateral raise','shoulders',[],'lateral',['cable'],1,0,1.25,'kg',2.5,'站在纜繩側邊，從身體對側拉起。');
X('facepull','臉拉','face pull','shoulders',['back'],'rear',['cable'],1,0,2.5,'kg',15,'繩子拉向眉心，手肘抬高。');
X('revfly','反向蝴蝶機','reverse pec deck','shoulders',['back'],'rear',['pecdeck'],1,0,2.5,'kg',15,'面向椅背，手臂往後打開，練後三角。','revfly');
X('dbcurl','啞鈴彎舉','dumbbell curl','biceps',[],'curl',['db'],1,0,1,'each',6,'上臂貼緊身體，不要用身體甩。');
X('bbcurl','槓鈴彎舉','barbell curl','biceps',[],'curl',['barbell'],1,0,2.5,'kg',15,'手肘固定在身側，控制下放速度。');
X('cablecurl','纜繩彎舉','cable curl','biceps',[],'curl',['cable'],1,0,2.5,'kg',15,'全程保持張力，頂點停一下。');
X('hammer','錘式彎舉','hammer curl','biceps',[],'curl',['db'],1,0,1,'each',6,'掌心相對，也會練到前臂。');
X('pushdown','纜繩下壓','triceps pushdown','triceps',[],'ext',['cable'],1,0,2.5,'kg',15,'上臂固定，只動前臂，壓到手臂伸直。');
X('ohext','啞鈴過頭伸展','overhead triceps extension','triceps',[],'ext',['db'],1,0,1,'kg',8,'手肘朝前，不要往外打開。','ohext');
X('cgbench','窄握臥推','close grip bench press','triceps',['chest'],'press',['barbell','bench'],2,1,2.5,'kg',25,'握距約與肩同寬，手肘貼近身體。','hpress');
X('benchdip','板凳撐體','bench dip','triceps',['chest'],'press',['bench'],1,1,0,'bw',0,'肩膀不適就停，下到手肘約 90 度。','benchdip');
X('plank','平板支撐','plank','core',[],'anti',[],1,0,0,'sec',0,'手肘在肩膀正下方，臀部不要塌。','plank');
X('deadbug','死蟲式','dead bug','core',[],'anti',[],1,0,0,'bw',0,'下背貼地，對側手腳慢慢伸出。','deadbug');
X('hlr','懸垂抬腿','hanging leg raise','core',[],'flex',['pullup'],2,0,0,'bw',0,'不要晃，用腹部把腿抬起。','hlr');
X('cablecrunch','纜繩捲腹','cable crunch','core',[],'flex',['cable'],1,0,2.5,'kg',20,'跪姿，用腹部把胸口捲向骨盆。','crunch');
X('squat','槓鈴深蹲','barbell back squat','quads',['posterior','core'],'squat',['barbell','rack'],2,1,5,'kg',30,'先調好安全槓，膝蓋跟腳尖同方向。');
X('smithsq','史密斯深蹲','smith machine squat','quads',['posterior'],'squat',['smith'],1,1,5,'kg',30,'腳站在槓的稍前方，蹲到大腿約水平。');
X('legpress','腿推機','leg press','quads',['posterior'],'squat',['legpress'],1,1,5,'kg',60,'下背貼緊椅背，膝蓋不要完全鎖死。','legpress');
X('goblet','高腳杯深蹲','goblet squat','quads',['posterior','core'],'squat',['db'],1,1,2,'kg',10,'啞鈴抱在胸前，挺胸往下蹲。','goblet');
X('bss','保加利亞分腿蹲','bulgarian split squat','quads',['posterior'],'lunge',['db','bench'],2,1,2,'each',6,'後腳放椅上，重心在前腳。');
X('legext','腿伸屈機','leg extension','quads',[],'kneeext',['legext'],1,0,2.5,'kg',25,'膝蓋對準機器轉軸，頂點停一下。');
X('rdl','羅馬尼亞硬舉','romanian deadlift','posterior',['back'],'hinge',['barbell'],2,1,5,'kg',30,'膝微彎、髖往後推，槓貼著腿下滑。');
X('dbrdl','啞鈴羅馬尼亞硬舉','dumbbell romanian deadlift','posterior',['back'],'hinge',['db'],1,1,2,'each',10,'背打直，大腿後側有拉長感就回來。');
X('hipthrust','槓鈴臀推','barbell hip thrust','posterior',['quads'],'thrust',['barbell','bench'],1,1,5,'kg',30,'上背靠椅，頂點夾臀，下巴微收。');
X('smiththrust','史密斯臀推','smith machine hip thrust','posterior',[],'thrust',['smith','bench'],1,1,5,'kg',30,'槓墊放在髖部，頂點停一秒。');
X('legcurl','腿彎舉機','leg curl','posterior',[],'kneeflex',['legcurl'],1,0,2.5,'kg',20,'髖部貼墊，慢慢放回去。');
X('kbswing','壺鈴擺盪','kettlebell swing','posterior',['core'],'hinge',['kb'],1,1,4,'kg',12,'用髖部發力，手臂只是掛著。','kbswing');
X('calfstand','站姿提踵','standing calf raise','calves',[],'calf',[],1,0,0,'bw',0,'站在階梯邊，腳跟放到最低再踮到最高。');
X('smithcalf','史密斯提踵','smith machine calf raise','calves',[],'calf',['smith'],1,0,5,'kg',30,'腳尖踩在槓片上，頂點停一下。');
X('lpcalf','腿推機提踵','leg press calf raise','calves',[],'calf',['legpress'],1,0,5,'kg',50,'只用腳尖推，膝蓋保持微彎。','lpcalf');
const BYID=Object.fromEntries(EX.map(e=>[e.id,e]));
const GOALS={muscle:'增肌',str:'力量',fat:'減脂',health:'健康'};
const COUNT={30:4,45:5,60:6,75:7};
const LV={low:'低',mid:'中',high:'高'},LVM={low:.6,mid:1,high:1.4};
const EXP={none:'完全沒練過',lt6:'不到半年',gt6:'半年以上'};
const FEEL={light:'太輕',ok:'剛好',heavy:'太重'},FEELD={light:1,ok:0,heavy:-1};

/* ───── 示意圖：每個動作模式畫「起始 → 結束」兩格線條圖（100×90 一格，地板 y=84） ─────
   l: 身體線段（折線座標）, h: 頭, p: 器材 ['r' 方塊]['l' 線]['c' 重量]['k' 纜繩] */
const STAND={h:[50,11],l:[[50,18,50,46],[50,46,51,65,50,84]]};
const POSE={
 hpress:[{h:[19,51],l:[[25,54,60,54],[60,54,70,61,73,84],[30,54,37,62,34,43]],p:[['r',14,57,64,4],['l',22,61,22,84],['l',72,61,72,84],['c',34,41,4.5]]},
         {h:[19,51],l:[[25,54,60,54],[60,54,70,61,73,84],[30,54,32,38,31,24]],p:[['r',14,57,64,4],['l',22,61,22,84],['l',72,61,72,84],['c',31,22,4.5]]}],
 mpress:[{h:[38,22],l:[[40,29,42,60],[42,60,60,60,62,84],[41,32,50,40,58,32]],p:[['l',34,26,36,64],['r',36,60,24,4],['l',64,22,64,44],['r',58,28,8,8]]},
         {h:[38,22],l:[[40,29,42,60],[42,60,60,60,62,84],[41,32,56,32,70,32]],p:[['l',34,26,36,64],['r',36,60,24,4],['l',76,22,76,44],['r',68,28,8,8]]}],
 ipress:[{h:[31,37],l:[[36,44,56,66],[56,66,68,68,70,84],[37,46,45,52,42,37]],p:[['l',28,42,52,70],['r',48,68,22,4],['c',42,35,4]]},
         {h:[31,37],l:[[36,44,56,66],[56,66,68,68,70,84],[37,46,37,30,34,15]],p:[['l',28,42,52,70],['r',48,68,22,4],['c',34,13,4]]}],
 pushup:[{h:[23,55],l:[[29,58,58,68,88,82],[31,59,32,71,32,84]],p:[]},
         {h:[23,73],l:[[29,76,58,79,88,82],[30,76,40,72,30,84]],p:[]}],
 fly:[{h:[50,11],l:[[50,18,50,46],[50,46,43,84],[50,46,57,84],[50,21,30,25,15,23],[50,21,70,25,85,23]],p:[['k',4,6,15,23],['k',96,6,85,23]]},
      {h:[50,11],l:[[50,18,50,46],[50,46,43,84],[50,46,57,84],[50,21,40,31,48,36],[50,21,60,31,52,36]],p:[['k',4,6,48,36],['k',96,6,52,36]]}],
 dip:[{h:[46,10],l:[[46,17,47,44],[47,44,53,58,45,68],[48,19,53,30,54,40]],p:[['l',30,40,62,40],['l',34,40,34,84],['l',58,40,58,84]]},
      {h:[49,26],l:[[47,33,47,60],[47,60,53,74,45,84],[46,34,36,30,45,40]],p:[['l',30,40,62,40],['l',34,40,34,84],['l',58,40,58,84]]}],
 benchdip:[{h:[40,14],l:[[40,21,42,48],[42,48,62,50,78,84],[40,24,34,36,28,46]],p:[['r',14,46,20,4],['l',18,50,18,84]]},
           {h:[42,28],l:[[42,35,44,62],[44,62,62,62,78,84],[42,38,30,40,28,46]],p:[['r',14,46,20,4],['l',18,50,18,84]]}],
 pullup:[{h:[55,16],l:[[50,22,50,50],[50,50,52,66,50,80],[50,22,50,13,50,4]],p:[['l',30,4,70,4]]},
         {h:[55,6],l:[[50,13,50,41],[50,41,52,57,50,71],[50,14,42,19,50,4]],p:[['l',30,4,70,4]]}],
 vpull:[{h:[50,22],l:[[50,29,50,60],[50,60,64,60,64,84],[50,31,52,17,52,5]],p:[['r',38,62,24,4],['l',38,4,66,4],['k',52,0,52,4],['r',58,52,10,4]]},
        {h:[50,22],l:[[50,29,50,60],[50,60,64,60,64,84],[50,31,43,41,52,30]],p:[['r',38,62,24,4],['l',40,30,64,30],['k',52,0,52,30],['r',58,52,10,4]]}],
 pullover:[{h:[42,15],l:[[45,22,50,48],[50,48,52,66,50,84],[45,24,56,14,66,5]],p:[['k',72,0,66,5]]},
           {h:[42,15],l:[[45,22,50,48],[50,48,52,66,50,84],[45,24,52,36,56,46]],p:[['k',72,0,56,46]]}],
 hrow:[{h:[40,23],l:[[40,30,40,60],[40,60,56,56,70,64],[40,32,54,38,68,40]],p:[['r',28,62,22,4],['l',74,52,74,70],['k',68,40,94,42]]},
       {h:[40,23],l:[[40,30,40,60],[40,60,56,56,70,64],[40,32,28,40,44,44]],p:[['r',28,62,22,4],['l',74,52,74,70],['k',44,44,94,42]]}],
 dbrow:[{h:[22,30],l:[[28,34,62,36],[62,36,64,60,66,84],[30,36,30,50,30,62],[40,35,40,46]],p:[['r',18,46,36,4],['l',22,50,22,84],['l',50,50,50,84],['r',24,62,12,5]]},
        {h:[22,30],l:[[28,34,62,36],[62,36,64,60,66,84],[30,36,40,26,36,42],[40,35,40,46]],p:[['r',18,46,36,4],['l',22,50,22,84],['l',50,50,50,84],['r',30,40,12,5]]}],
 bbrow:[{h:[70,32],l:[[64,34,40,46],[40,46,46,64,46,84],[62,36,62,50,62,60]],p:[['c',62,62,5]]},
        {h:[70,32],l:[[64,34,40,46],[40,46,46,64,46,84],[62,36,52,40,58,50]],p:[['c',58,52,5]]}],
 vpress:[{h:[46,19],l:[[46,26,46,58],[46,58,60,60,62,84],[48,28,58,35,57,22]],p:[['l',40,28,40,62],['r',36,58,24,4],['r',52,18,10,5]]},
         {h:[46,19],l:[[46,26,46,58],[46,58,60,60,62,84],[48,28,55,15,54,3]],p:[['l',40,28,40,62],['r',36,58,24,4],['r',49,-1,10,5]]}],
 ohp:[{h:STAND.h,l:[...STAND.l,[52,21,58,29,61,21]],p:[['c',62,20,4.5]]},
      {h:STAND.h,l:[...STAND.l,[50,20,52,8,51,-3]],p:[['c',52,-4,5]]}],
 lateral:[{h:[50,11],l:[[50,18,50,46],[50,46,43,84],[50,46,57,84],[50,21,41,33,39,45],[50,21,59,33,61,45]],p:[['r',35,45,8,4],['r',57,45,8,4]]},
          {h:[50,11],l:[[50,18,50,46],[50,46,43,84],[50,46,57,84],[50,21,32,22,18,22],[50,21,68,22,82,22]],p:[['r',14,20,8,4],['r',78,20,8,4]]}],
 rear:[{h:STAND.h,l:[...STAND.l,[50,21,62,22,74,20]],p:[['k',96,18,74,20]]},
       {h:STAND.h,l:[...STAND.l,[50,21,42,17,57,13]],p:[['k',96,18,57,13]]}],
 revfly:[{h:[50,11],l:[[50,18,50,46],[50,46,43,84],[50,46,57,84],[50,21,46,31,50,38],[50,21,54,31,50,38]],p:[]},
         {h:[50,11],l:[[50,18,50,46],[50,46,43,84],[50,46,57,84],[50,21,32,22,18,22],[50,21,68,22,82,22]],p:[]}],
 curl:[{h:STAND.h,l:[...STAND.l,[52,21,55,33,58,45]],p:[['r',54,45,9,4]]},
       {h:STAND.h,l:[...STAND.l,[52,21,55,33,64,23]],p:[['r',60,20,9,4]]}],
 ext:[{h:STAND.h,l:[...STAND.l,[52,21,56,33,65,26]],p:[['k',68,-6,65,26]]},
      {h:STAND.h,l:[...STAND.l,[52,21,56,33,59,45]],p:[['k',68,-6,59,45]]}],
 ohext:[{h:[47,11],l:[[50,18,50,46],[50,46,51,65,50,84],[53,20,58,3,49,-3]],p:[['r',44,-6,9,5]]},
        {h:[47,11],l:[[50,18,50,46],[50,46,51,65,50,84],[53,20,58,3,61,-6]],p:[['r',57,-8,9,4]]}],
 plank:[{h:[18,54],l:[[24,57,58,61,90,68],[25,58,25,70,36,70]],p:[['l',8,72,96,72]],nf:1},
        {h:[18,54],l:[[24,57,58,61,90,68],[25,58,25,70,36,70]],p:[['l',8,72,96,72]],nf:1}],
 deadbug:[{h:[14,70],l:[[20,74,54,74],[54,74,56,58,70,58],[24,74,24,60,24,46]],p:[['l',4,79,96,79]],nf:1},
          {h:[14,70],l:[[20,74,54,74],[54,74,72,72,90,72],[24,74,14,70,4,70]],p:[['l',4,79,96,79]],nf:1}],
 hlr:[{h:[55,16],l:[[50,22,50,50],[50,50,51,67,50,84],[50,22,50,13,50,4]],p:[['l',30,4,70,4]],nf:1},
      {h:[55,16],l:[[50,22,50,50],[50,50,67,46,85,44],[50,22,50,13,50,4]],p:[['l',30,4,70,4]],nf:1}],
 crunch:[{h:[50,30],l:[[50,37,50,62],[50,62,50,84,66,84],[50,38,56,34,54,30]],p:[['k',56,0,54,30]]},
         {h:[70,62],l:[[64,57,50,62],[50,62,50,84,66,84],[64,57,66,52,70,56]],p:[['k',56,0,70,56]]}],
 squat:[{h:[51,10],l:[[50,18,50,46],[50,46,53,65,50,84],[50,21,43,27,45,21]],p:[['c',45,21,4.5]]},
        {h:[51,29],l:[[46,36,36,60],[36,60,58,64,50,84],[45,38,37,44,40,39]],p:[['c',40,39,4.5]]}],
 goblet:[{h:[50,11],l:[[50,18,50,46],[50,46,53,65,50,84],[50,22,56,32,54,28]],p:[['r',53,26,7,9]]},
         {h:[49,29],l:[[46,36,36,60],[36,60,58,64,50,84],[46,40,52,50,52,46]],p:[['r',51,44,7,9]]}],
 legpress:[{h:[22,37],l:[[25,44,38,64],[38,64,44,44,56,50],[26,46,34,54,38,62]],p:[['l',18,42,34,68],['r',30,64,16,4],['l',53,40,59,60]]},
           {h:[22,37],l:[[25,44,38,64],[38,64,55,54,72,46],[26,46,34,54,38,62]],p:[['l',18,42,34,68],['r',30,64,16,4],['l',69,36,75,56]]}],
 lunge:[{h:[48,11],l:[[48,18,48,46],[48,46,60,64,62,84],[48,46,40,62,24,60],[48,21,46,32,46,42]],p:[['r',8,60,22,4],['l',12,64,12,84],['r',42,42,8,4]]},
        {h:[46,29],l:[[46,36,44,62],[44,62,64,66,62,84],[44,62,38,80,24,60],[46,38,44,48,44,58]],p:[['r',8,60,22,4],['l',12,64,12,84],['r',40,58,8,4]]}],
 kneeext:[{h:[40,23],l:[[40,30,40,56],[40,56,56,56,58,76],[40,32,46,44,48,56]],p:[['l',32,30,32,58],['r',30,58,30,5],['c',58,76,3.5]]},
          {h:[40,23],l:[[40,30,40,56],[40,56,56,56,74,50],[40,32,46,44,48,56]],p:[['l',32,30,32,58],['r',30,58,30,5],['c',74,50,3.5]]}],
 hinge:[{h:[50,11],l:[[50,18,50,46],[50,46,52,65,50,84],[50,21,50,33,50,44]],p:[['c',50,47,5]]},
        {h:[70,34],l:[[64,36,40,46],[40,46,44,65,46,84],[63,38,63,49,63,58]],p:[['c',63,61,5]]}],
 kbswing:[{h:[70,34],l:[[64,36,40,46],[40,46,46,65,46,84],[63,38,56,50,48,58]],p:[['c',47,62,5]]},
          {h:[50,11],l:[[50,18,50,46],[50,46,52,65,50,84],[50,21,62,26,74,24]],p:[['c',78,24,5]]}],
 thrust:[{h:[17,43],l:[[22,48,40,70],[40,70,56,60,60,84],[23,50,32,60,40,66]],p:[['r',4,47,18,4],['l',8,51,8,84],['c',40,66,5]]},
         {h:[17,43],l:[[22,48,42,52],[42,52,58,54,60,84],[23,50,33,52,42,48]],p:[['r',4,47,18,4],['l',8,51,8,84],['c',42,47,5]]}],
 kneeflex:[{h:[15,53],l:[[21,56,52,56],[52,56,70,56,86,56],[24,57,30,64,34,58]],p:[['r',10,60,72,4],['l',16,64,16,84],['l',76,64,76,84],['c',86,52,3.5]]},
           {h:[15,53],l:[[21,56,52,56],[52,56,70,56,76,40],[24,57,30,64,34,58]],p:[['r',10,60,72,4],['l',16,64,16,84],['l',76,64,76,84],['c',76,36,3.5]]}],
 calf:[{h:[50,11],l:[[50,18,50,46],[50,46,51,64,50,76],[50,76,58,78],[50,21,50,34,50,44]],p:[['r',46,78,18,6]]},
       {h:[50,5],l:[[50,12,50,40],[50,40,51,58,50,70],[50,70,58,78],[50,15,50,28,50,38]],p:[['r',46,78,18,6]]}],
 lpcalf:[{h:[22,37],l:[[25,44,38,64],[38,64,58,52,66,54],[26,46,34,54,38,62]],p:[['l',18,42,34,68],['r',30,64,16,4],['l',64,44,70,64]]},
         {h:[22,37],l:[[25,44,38,64],[38,64,58,52,68,48],[26,46,34,54,38,62]],p:[['l',18,42,34,68],['r',30,64,16,4],['l',66,38,72,58]]}],
};
POSE.press=POSE.hpress;
/* 繪製：把每段折線依位置判斷成軀幹／腿／手臂，畫成有厚度、有輪廓的人形；主要肌群用紅色標示 */
function chains(sp){const L=sp.l.map(a=>{const p=[];for(let i=0;i<a.length;i+=2)p.push([a[i],a[i+1]]);return p});
  const hip=L[0][1],out=[{pts:L[0],kind:'body'}],legEnds=[];
  for(const c of L.slice(1)){const near=(q,r)=>Math.hypot(q[0]-r[0],q[1]-r[1])<3.5;
    if(near(c[0],hip)){out.push({pts:c,kind:'leg'});legEnds.push(c[c.length-1])}
    else if(legEnds.some(q=>near(c[0],q)))out.push({pts:c,kind:'foot'});
    else out.push({pts:c,kind:'arm'})}
  return out}
function boneW(kind,i,n){if(kind==='body')return i===0?11:7.5;if(kind==='leg')return n===2?7:(i===0?8.2:6.4);if(kind==='arm')return n===2?4.8:(i===0?5.8:4.8);return 4.4}
const P2=p=>p[0].toFixed(1)+' '+p[1].toFixed(1);
function bonesSvg(chs,cls,dx,dy){let ol='',fi='';for(const c of chs){const n=c.pts.length;for(let i=0;i<n-1;i++){const a=[c.pts[i][0]+dx,c.pts[i][1]+dy],b=[c.pts[i+1][0]+dx,c.pts[i+1][1]+dy],w=boneW(c.kind,i,n),d=`M${P2(a)}L${P2(b)}`;ol+=`<path class="ol" d="${d}" stroke-width="${w+2.6}"/>`;fi+=`<path class="fi" d="${d}" stroke-width="${w}"/>`}}return`<g class="${cls}">${ol}${fi}</g>`}
function highlight(chs,m){let s='';const seg=(a,b,f0,f1,w)=>{const p=t=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];s+=`<path class="hl" d="M${P2(p(f0))}L${P2(p(f1))}" stroke-width="${w}"/>`};
  const body=chs[0],legs=chs.filter(c=>c.kind==='leg'),arms=chs.filter(c=>c.kind==='arm'&&c.pts.length===3);
  if(m==='chest'||m==='back')seg(body.pts[0],body.pts[1],.12,.55,8);
  if(m==='core')seg(body.pts[0],body.pts[1],.5,.92,8);
  if(m==='shoulders')for(const a of arms)s+=`<circle class="hlc" cx="${a.pts[0][0].toFixed(1)}" cy="${a.pts[0][1].toFixed(1)}" r="4.2"/>`;
  if(m==='biceps'||m==='triceps')for(const a of arms)seg(a.pts[0],a.pts[1],.15,.9,3.8);
  if(m==='quads'||m==='posterior'){if(legs.length)for(const l of legs)seg(l.pts[0],l.pts[1],.12,.88,l.pts.length===2?4.6:5.6);else if(body.pts.length>2)seg(body.pts[1],body.pts[2],.1,.55,5.2)}
  if(m==='calves'){if(legs.length)for(const l of legs){const n=l.pts.length;seg(l.pts[n-2],l.pts[n-1],n===2?.55:.12,.8,4.2)}else if(body.pts.length>2)seg(body.pts[1],body.pts[2],.6,.92,4.6)}
  return s}
function propsSvg(ps,front){let s='';for(const p of ps){
  if(p[0]==='r'&&!front)s+=`<rect class="pf" x="${p[1]}" y="${p[2]}" width="${p[3]}" height="${p[4]}" rx="1.8"/>`;
  else if(p[0]==='l'&&!front)s+=`<line class="pr" x1="${p[1]}" y1="${p[2]}" x2="${p[3]}" y2="${p[4]}"/>`;
  else if(p[0]==='k'&&!front)s+=`<line class="ca" x1="${p[1]}" y1="${p[2]}" x2="${p[3]}" y2="${p[4]}"/><circle class="pul" cx="${p[1]}" cy="${p[2]}" r="2.6"/>`;
  else if(p[0]==='c'&&front)s+=`<circle class="plate" cx="${p[1]}" cy="${p[2]}" r="${p[3]+.6}"/><circle class="hole" cx="${p[1]}" cy="${p[2]}" r="1.3"/>`}return s}
function drawPose(sp,m){const chs=chains(sp),side=!(chs.filter(c=>c.kind==='leg').length>1&&chs.filter(c=>c.kind==='arm').length>1);
  const legs=chs.filter(c=>c.kind==='leg'||c.kind==='foot'),arms=chs.filter(c=>c.kind==='arm');
  let s='';if(!sp.nf){const feet=legs.length?legs.map(c=>c.pts[c.pts.length-1]):[chs[0].pts[chs[0].pts.length-1]];const xs=feet.map(f=>f[0]);s+=`<line class="fl" x1="2" y1="84.5" x2="98" y2="84.5"/><ellipse class="sh" cx="${((Math.min(...xs)+Math.max(...xs))/2).toFixed(1)}" cy="85" rx="${(Math.max(...xs)-Math.min(...xs))/2+9}" ry="2"/>`}
  s+=propsSvg(sp.p,false);
  if(side){const farL=chs.filter(c=>c.kind==='leg').length===1?legs:[],farA=arms.length===1?arms:[];s+=bonesSvg([...farL,...farA],'far',2.6,-1.2)}
  s+=bonesSvg(chs.filter(c=>c.kind!=='arm'),'near',0,0)+bonesSvg(arms,'near',0,0)+highlight(chs,m);
  s+=`<circle class="hd" cx="${sp.h[0].toFixed(1)}" cy="${sp.h[1].toFixed(1)}" r="6.3"/>`+propsSvg(sp.p,true);return s}
function lerpPose(a,b,t){const same=a.l.length===b.l.length&&a.l.every((x,i)=>x.length===b.l[i].length);if(!same)return t<.5?a:b;
  const L=(x,y)=>x+(y-x)*t,pr=a.p.length===b.p.length&&a.p.every((q,i)=>q[0]===b.p[i][0])?a.p.map((q,i)=>q.map((v,j)=>j?L(v,b.p[i][j]):v)):(t<.5?a.p:b.p);
  return{h:[L(a.h[0],b.h[0]),L(a.h[1],b.h[1])],l:a.l.map((x,i)=>x.map((v,j)=>L(v,b.l[i][j]))),p:pr,nf:a.nf}}
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function figure(e){const ps=POSE[e.img]||POSE[e.pat];if(!ps)return'';const lab=`${esc(e.n)}動作示意，紅色是主要練到的${MUS[e.m]}`;
  if(RM)return`<div class="fig"><svg viewBox="-2 -12 214 108" role="img" aria-label="${lab}：起始與結束姿勢">${drawPose(ps[0],e.m)}<path class="ar" d="M101 38 l8 5 -8 5z"/><g transform="translate(110,0)">${drawPose(ps[1],e.m)}</g><text x="50" y="94" text-anchor="middle">起始</text><text x="160" y="94" text-anchor="middle">結束</text></svg><span class="fig-k"><i></i>${MUS[e.m]}</span></div>`;
  return`<div class="fig" data-fx="${e.id}"><svg viewBox="-4 -12 108 100" role="img" aria-label="${lab}，動畫示範起始到結束姿勢">${drawPose(ps[0],e.m)}</svg><span class="fig-k"><i></i>${MUS[e.m]}</span><span class="fig-l">起始</span></div>`}
/* 動畫：起始停一下 → 做到結束 → 停一下 → 回到起始，約 3 秒一輪 */
const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
function phase(c){return c<.14?0:c<.47?ease((c-.14)/.33):c<.62?1:c<.95?1-ease((c-.62)/.33):0}
(function loop(){if(!RM&&!document.hidden){const c=(performance.now()%3000)/3000,t=phase(c);
  for(const el of document.querySelectorAll('.fig[data-fx]')){const r=el.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)continue;const e=BYID[el.dataset.fx],ps=POSE[e.img]||POSE[e.pat];
    el.firstElementChild.innerHTML=drawPose(lerpPose(ps[0],ps[1],t),e.m);el.lastElementChild.textContent=t<.5?'起始':'結束'}}
  setTimeout(loop,40)})();

/* ───── 台大健身中心人數（收集程式 11/10–11/16 的實際資料） ───── */
const NTU={best:80,max:161,latest:{t:'11/16 15:59',c:93},pts:[['一',9.6,59],['一',10.4,46],['一',18.1,94],['二',1.7,0],['二',6.5,15],['二',10.2,47],['二',17.5,77],['三',7.5,20],['三',12.1,72],['三',20.6,36],['四',4.4,0],['四',9.3,126],['四',16,90],['四',23.9,3],['五',5.7,0],['五',9.8,47],['五',16.2,51],['五',23.1,3],['六',3.9,0],['六',7.5,0],['六',10.9,30],['六',18.1,18],['日',1,0],['日',9.3,40],['日',16,93]]};

/* ───── 狀態與儲存 ───── */
const KEY='zujian-proto-v2';
const DAY=864e5;
function sampleHistory(){const now=Date.now();const H=(d,ms,ents)=>({id:'s'+d,t:now-d*DAY-2*36e5,ms,goal:'muscle',sample:true,entries:ents.map(([id,w,rs,fs])=>({id,sets:rs.map((r,i)=>({w,r,f:fs[i]}))}))});
  return[H(2,['chest','shoulders','triceps'],[['chestpress',25,[12,12,11],['ok','ok','ok']],['lateral',4,[12,12,12],['ok','ok','ok']],['pushdown',15,[12,12,12],['light','light','ok']]]),
    H(4,['back','biceps'],[['latpd',30,[12,12,12],['light','light','light']],['mrow',30,[10,9,8],['heavy','heavy','heavy']],['dbcurl',6,[12,11,10],['ok','ok','heavy']]]),
    H(6,['quads','posterior','calves'],[['legpress',60,[12,12,12],['ok','ok','ok']],['legcurl',20,[12,11,10],['ok','ok','ok']],['calfstand',0,[15,15,15],['ok','ok','ok']]])]}
function defaults(){const gym={};for(const k in EQ)gym[k]=k!=='kb';return{tab:'today',profile:null,ob:{step:0,ans:{}},time:45,pick:false,sel:[],draft:null,active:null,summary:null,gym,history:sampleHistory()}}
let S;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){S=null}
if(!S||!S.gym||!Array.isArray(S.history))S=defaults();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const P=()=>S.profile||{exp:'none',freq:3,time:45,goal:'muscle',strength:'mid'};

/* ───── 計算 ───── */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmtW=w=>Number.isInteger(+w)?String(+w):String(+(+w).toFixed(2));
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const maxLv=()=>P().exp==='none'?1:2;
function lastTrained(){const t={};for(const h of S.history)for(const en of h.entries){const e=BYID[en.id];if(!e||!en.sets.length)continue;if(!t[e.m]||h.t>t[e.m])t[e.m]=h.t}return t}
function recovery(){const t=lastTrained(),now=Date.now(),out={};for(const m of MUS_ORDER){if(!t[m]){out[m]={st:'ready',h:Infinity,txt:'還沒有紀錄'};continue}const h=(now-t[m])/36e5;out[m]={st:h<48?'fresh':h<72?'mid':'ready',h,txt:h<24?Math.max(1,Math.round(h))+' 小時前練過':Math.floor(h/24)+' 天前練過'}}return out}
function lastSets(id){let best=null;for(const h of S.history){const en=h.entries.find(x=>x.id===id&&x.sets.length);if(en&&(!best||h.t>best.t))best={t:h.t,sets:en.sets}}return best}
function avail(e,occ){return e.eq.every(q=>S.gym[q]&&!(occ||[]).includes(q))}
function minW(e){return e.eq.includes('barbell')?20:(e.inc||2.5)}
function startW(e,lvl){const bw=+(P().bw||0),sc=bw?clamp(bw/65,.8,1.25):1,step=e.inc||2.5;let w=Math.round(e.st*LVM[lvl]*sc/step)*step;return +Math.max(minW(e),w).toFixed(2)}
function rx(e){const g=P().goal;
  if(e.unit==='sec')return{sets:3,lo:20,hi:40,rest:60};
  if(g==='str'){if(P().exp==='none')return e.comp?{sets:3,lo:6,hi:8,rest:120}:{sets:3,lo:8,hi:12,rest:75};return e.comp?{sets:4,lo:4,hi:6,rest:180}:{sets:3,lo:8,hi:12,rest:90}}
  if(g==='fat')return e.comp?{sets:3,lo:12,hi:15,rest:60}:{sets:3,lo:15,hi:20,rest:45};
  if(g==='health')return e.comp?{sets:3,lo:10,hi:12,rest:75}:{sets:2,lo:12,hi:15,rest:60};
  return e.comp?{sets:3,lo:8,hi:12,rest:90}:{sets:3,lo:10,hi:15,rest:60}}
function suggest(e,r,lvl){const last=lastSets(e.id),u=e.unit==='sec'?'秒':'下',bw=e.unit==='bw'||e.unit==='sec';
  if(!last){if(bw)return{w:0,reps:r.lo,cls:'',first:true,txt:`第一次做：先做 ${r.lo} ${u}，動作穩定最重要。`};
    const w=startW(e,lvl);return{w,reps:r.lo,cls:'',first:true,txt:`第一次做：依「${LV[lvl]}」程度，建議從 ${fmtW(w)} kg 開始。每組做完告訴我們感覺，會自動調整。`}}
  const top=Math.max(...last.sets.map(s=>s.r)),w=Math.max(...last.sets.map(s=>s.w||0)),fs=last.sets.map(s=>s.f).filter(Boolean),
    light=fs.filter(f=>f==='light').length,heavy=fs.filter(f=>f==='heavy').length,allTop=last.sets.length>=2&&last.sets.every(s=>s.r>=r.hi);
  if(bw){if(heavy>fs.length/2)return{w:0,reps:Math.max(r.lo-2,3),cls:'down',txt:`上次覺得太吃力，這次先做 ${Math.max(r.lo-2,3)} ${u}。`};return{w:0,reps:Math.min(top+1,r.hi+5),cls:allTop||light?'up':'',txt:`上次最多 ${top} ${u}，這次試著多 1 ${u}。`}}
  if(fs.length&&heavy>fs.length/2){const nw=+Math.max(minW(e),w-e.inc).toFixed(2);return{w:nw,reps:r.lo,cls:'down',txt:`上次多數組覺得太重，這次降到 ${fmtW(nw)} kg，先把動作做穩。`}}
  if(allTop||(fs.length&&light>fs.length/2)){const nw=+(w+e.inc).toFixed(2);return{w:nw,reps:r.lo,cls:'up',txt:`上次${allTop?`每組都做到 ${r.hi} 下`:'多數組覺得太輕'}，加到 ${fmtW(nw)} kg。`}}
  return{w,reps:Math.min(r.hi,top),cls:'',txt:`維持 ${fmtW(w)} kg，每組試著比上次多做 1 下（上次最多 ${top} 下）。`}}
function mkEntry(e,lvl){lvl=lvl||P().strength||'mid';const r=rx(e),sg=suggest(e,r,lvl);return{id:e.id,rx:r,sg,lvl,sets:Array.from({length:r.sets},()=>({w:sg.w,r:sg.reps,done:false}))}}
function score(e,ctx){let s=0;if(ctx.first&&e.comp)s+=4;if(!ctx.first&&!e.comp)s+=1;if(!ctx.pats.has(e.pat))s+=2;if(lastSets(e.id))s+=1.5;if(P().exp==='none'&&e.eq.some(q=>MACHINE.includes(q)))s+=2.5;return s}
function makePlan(ms){
  const n=COUNT[S.time]||5,order=[...ms].sort((a,b)=>(BIG.includes(b)-BIG.includes(a))||MUS_ORDER.indexOf(a)-MUS_ORDER.indexOf(b));
  const alloc=Object.fromEntries(order.map(m=>[m,0]));let left=n;
  for(const m of order){if(left<=0)break;alloc[m]++;left--}
  let guard=0;while(left>0&&guard++<20){for(const m of order){if(left<=0)break;const cap=BIG.includes(m)?3:2;if(alloc[m]<cap&&(BIG.includes(m)||guard>1)){alloc[m]++;left--}}}
  const used=new Set(),items=[],short=[];
  for(const m of order){const pats=new Set();for(let k=0;k<alloc[m];k++){
    const c=EX.filter(e=>e.m===m&&!used.has(e.id)&&avail(e)&&e.lv<=maxLv());
    if(!c.length){short.push(MUS[m]);break}
    c.sort((a,b)=>score(b,{first:k===0,pats})-score(a,{first:k===0,pats}));const e=c[0];used.add(e.id);pats.add(e.pat);items.push(e)}}
  items.sort((a,b)=>(b.comp-a.comp)||((a.m==='core')-(b.m==='core'))||order.indexOf(a.m)-order.indexOf(b.m));
  return{items:items.map(e=>mkEntry(e)),short:[...new Set(short)]}}
function alts(e,occ,inPlan){
  return EX.filter(x=>x.id!==e.id&&x.m===e.m&&!inPlan.includes(x.id)&&avail(x,occ)&&x.lv<=maxLv())
    .map(x=>({x,s:(x.pat===e.pat?3:0)+(x.comp===e.comp?1:0)+x.s.filter(q=>e.s.includes(q)).length*.5+(lastSets(x.id)?.5:0)+(P().exp==='none'&&x.eq.some(q=>MACHINE.includes(q))?.8:0)}))
    .sort((a,b)=>b.s-a.s).slice(0,4).map(o=>o.x)}
function todayPlanMs(){const p=P(),rec=recovery(),n=COUNT[S.time]||5,last=[...S.history].sort((a,b)=>b.t-a.t)[0],lastMs=last?last.ms:[];
  const ok=list=>{const r=list.filter(m=>rec[m].st!=='fresh');return r.length?r:list};
  const skipNote=list=>{const sk=list.filter(m=>rec[m].st==='fresh');return sk.length?'已避開 48 小時內練過的'+sk.map(m=>MUS[m]).join('、')+'。':''};
  if(p.exp!=='none'&&p.freq>=4){const wasLower=lastMs.some(m=>['quads','posterior','calves'].includes(m)),pool=wasLower?UPPER:LOWER;
    return{ms:ok(pool).slice(0,Math.min(n,4)),why:`每週 4 次以上適合上下半身輪流；上次練${wasLower?'下':'上'}半身，今天練${wasLower?'上':'下'}半身。${skipNote(pool)}`}}
  if(p.exp!=='none'&&p.freq===3){const PPL=[['推','chest','shoulders','triceps'],['拉','back','biceps'],['腿','quads','posterior','calves']];
    const score=d=>d.slice(1).filter(m=>lastMs.includes(m)).length;const li=last?PPL.reduce((bi,d,i)=>score(d)>score(PPL[bi])?i:bi,0):2;const nx=PPL[(li+1)%3];
    return{ms:ok(nx.slice(1)),why:`每週 3 次適合推／拉／腿輪流；${last?`上次以「${PPL[li][0]}」為主，`:''}今天練「${nx[0]}」。`}}
  const base=['quads','chest','back','posterior','shoulders','core'];
  return{ms:ok(base).slice(0,n),why:`${p.exp==='none'?'剛開始練':'每週 1–2 次'}最適合全身訓練，每個大肌群各一個動作。${skipNote(base)}`}}

/* ───── 畫面 ───── */
const V=document.getElementById('view');
const OB=[
 {k:'exp',q:'你有重訓的經驗嗎？',opts:[['none','完全沒練過','第一次走進健身房'],['lt6','練過，但不到半年','知道一些動作，還不太會排課表'],['gt6','半年以上','想要更有系統地練']]},
 {k:'freq',q:'每週想練幾次？',sub:'剛開始練的話，一週 2–3 次就很足夠，恢復跟訓練一樣重要。',opts:[[2,'1–2 次'],[3,'3 次'],[4,'4 次以上']]},
 {k:'time',q:'每次大概有多少時間？',opts:[[30,'30 分鐘'],[45,'45 分鐘'],[60,'60 分鐘'],[75,'75 分鐘以上']]},
 {k:'goal',q:'主要目標是什麼？',opts:[['muscle','增肌','想變壯、線條更明顯'],['str','力量','想推得更重：重量大、次數少'],['fat','減脂','想變精實，搭配飲食效果最好'],['health','健康','維持體能、改善久坐姿勢']]},
 {k:'strength',q:'你覺得自己目前的力量？',sub:'用來估算第一次的起始重量，之後會依你每組的回饋調整。',opts:[['low','低','很少運動，提重物會吃力'],['mid','中','偶爾運動'],['high','高','常運動或常做體力活']]},
 {k:'body',q:'身高和體重（選填）',sub:'體重用來微調起始重量。資料只存在這支手機。',input:true}];
function renderOnboarding(){const o=S.ob,step=o.step;
  if(step<0){V.innerHTML=`<div class="ob hero-copy"><h1>進健身房，不用再想要練什麼</h1><ul><li>回答 6 個問題，約 1 分鐘</li><li>依你的經驗和時間排好今天的課表，每個動作都有示意圖</li><li>器材有人在用時一鍵換動作，練完自動建議下次重量</li></ul><button class="btn primary" type="button" data-act="ob-start">開始</button><button class="btn link" type="button" data-act="ob-skip">先用預設值逛逛</button></div>`;return}
  const q=OB[step],a=o.ans;
  let h=`<div class="ob"><div class="ob-prog" aria-label="第 ${step+1} 題，共 ${OB.length} 題">${OB.map((_,i)=>`<i class="${i<=step?'on':''}"></i>`).join('')}</div><h1>${q.q}</h1>${q.sub?`<p class="sub">${q.sub}</p>`:''}`;
  if(q.input)h+=`<div class="inputs"><label for="ob-h">身高（公分）<input id="ob-h" inputmode="numeric" type="number" min="100" max="230" value="${a.h||''}" placeholder="170"></label><label for="ob-w">體重（公斤）<input id="ob-w" inputmode="decimal" type="number" min="30" max="200" value="${a.bw||''}" placeholder="65"></label></div><button class="btn primary" type="button" data-act="ob-finish">完成</button><button class="btn link" type="button" data-act="ob-finish" data-skip="1">略過這題</button>`;
  else h+=`<div class="choice">${q.opts.map(([v,t,d])=>`<button type="button" data-act="ob-pick" data-v="${v}" aria-pressed="${String(a[q.k])===String(v)}"><b>${t}</b>${d?`<span>${d}</span>`:''}</button>`).join('')}</div>`;
  h+=`<div class="row">${step>0?`<button class="btn sm ghost" type="button" data-act="ob-back">← 上一題</button>`:''}</div></div>`;
  V.innerHTML=h}

function crowdCard(){const L=NTU.latest,ratio=L.c/NTU.best,lv=ratio<.5?['low','人少']:ratio<=1?['mid','適中']:['high','擁擠'];
  const X=h=>12+(h-6)/(23-6)*276,Y=c=>66-c/NTU.max*58;
  let pts=NTU.pts.filter(p=>p[1]>=6).map(p=>`<circle cx="${X(p[1]).toFixed(1)}" cy="${Y(p[2]).toFixed(1)}" r="3" fill="var(--rest)" opacity=".75"><title>週${p[0]} ${Math.floor(p[1])}點：${p[2]} 人</title></circle>`).join('');
  const ticks=[6,9,12,15,18,21].map(h=>`<text x="${X(h)}" y="80" text-anchor="middle">${h}</text>`).join('');
  return`<h2>台大健身中心</h2><div class="panel crowd"><div><span class="big">${L.c}</span> 人</div><div class="stack" style="gap:3px"><span><span class="lv ${lv[0]}">${lv[1]}</span></span><span class="small muted">最適 ${NTU.best} 人 · 上限 ${NTU.max} 人 · ${L.t} 的資料</span></div>
   <svg viewBox="0 0 300 84" role="img" aria-label="上週各時段觀察到的人數，共 ${NTU.pts.length} 筆"><line x1="12" x2="288" y1="${Y(NTU.best)}" y2="${Y(NTU.best)}" stroke="var(--warn)" stroke-dasharray="4 3" stroke-width="1.2"/><text x="288" y="${Y(NTU.best)-3}" text-anchor="end">最適 80</text><line x1="12" x2="288" y1="66" y2="66" stroke="var(--line)"/>${pts}${ticks}</svg>
   <p class="small muted" style="grid-column:1/-1">點是上週各時段實際收集到的人數（橫軸為幾點），目前只有 ${NTU.pts.length} 筆，資料累積後會改成「平常幾點人最少」。</p></div>`}
/* 肌肉圖：只畫左半邊，右半邊用鏡像（scale(-1,1)），座標以身體中線為 x=0 */
const BODY_L=`<path d="M0 44 L-10 44 C-20 46 -29 50 -33 56 C-36 62 -32 70 -30 78 L-28 100 C-27 114 -25 124 -26 134 C-27 142 -28 148 -27 156 L0 162 Z"/>
<path d="M-35 57 C-44 59 -48 70 -47 82 L-48 104 C-49 111 -46 115 -42 115 C-38 115 -36 110 -36 104 L-33 82 C-33 72 -33 63 -35 57 Z"/>
<path d="M-47 117 C-51 129 -52 143 -52 155 C-52 161 -47 161 -46 155 L-40 129 C-39 123 -41 117 -47 117 Z"/><ellipse cx="-49" cy="166" rx="4.5" ry="7"/>
<path d="M-27 156 C-31 172 -30 192 -24 211 L-8 211 C-6 193 -4 176 -2 161 Z"/>
<path d="M-23 215 C-26 229 -24 245 -19 255 L-10 255 C-8 243 -8 229 -9 215 Z"/><path d="M-19 255 L-21 263 L-6 263 L-10 255 Z"/>`;
const MAP_F={shoulders:`<path d="M-34 56 C-43 57 -48 67 -47 81 C-43 75 -37 69 -31 67 C-30 62 -31 58 -34 56 Z"/>`,
 chest:`<path d="M-3 58 L-28 60 C-32 66 -31 75 -26 82 C-18 87 -8 87 -3 83 Z"/>`,
 biceps:`<path d="M-45 85 C-47 93 -47 103 -44 110 C-40 109 -37 101 -36 91 C-37 87 -40 85 -45 85 Z"/>`,
 core:`<rect x="-12" y="89" width="9" height="12" rx="3"/><rect x="-12" y="103" width="9" height="12" rx="3"/><rect x="-12" y="117" width="9" height="13" rx="3"/><path d="M-25 92 C-27 104 -26 118 -23 131 L-15 133 L-15 92 Z"/>`,
 quads:`<path d="M-25 162 C-28 176 -27 193 -21 208 C-17 210 -13 209 -11 205 C-9 191 -10 175 -12 163 Z"/>`,
 calves:`<path d="M-22 219 C-24 229 -23 239 -19 247 L-15 247 C-14 237 -15 227 -16 219 Z"/>`};
const MAP_B={back:`<path d="M0 44 L-12 48 C-20 52 -28 55 -32 58 L-16 64 C-10 72 -4 84 0 96 Z"/><path d="M-28 66 C-31 80 -29 98 -24 118 C-16 121 -8 117 -2 109 L-4 98 C-12 86 -20 75 -28 66 Z"/>`,
 shoulders:MAP_F.shoulders,
 triceps:`<path d="M-46 83 C-48 93 -47 103 -44 111 C-41 111 -38 105 -37 97 C-37 89 -40 83 -46 83 Z"/>`,
 posterior:`<path d="M-2 135 C-12 131 -24 133 -27 143 C-29 153 -24 163 -14 165 C-8 165 -3 161 -2 155 Z"/><path d="M-25 167 C-27 181 -25 196 -20 209 L-12 209 C-10 195 -10 181 -11 167 Z"/>`,
 calves:`<path d="M-23 217 C-26 227 -24 241 -18 249 C-14 245 -12 237 -11 227 C-12 221 -15 217 -18 217 Z"/>`};
function bodyMap(rec,sel,recd){
  const both=p=>`${p}<g transform="scale(-1,1)">${p}</g>`;
  const g=(m,inner)=>`<g class="mz st-${rec[m].st}${sel.includes(m)?' sel':''}${(recd||[]).includes(m)&&!sel.includes(m)?' rec':''}" data-act="mus" data-m="${m}"><title>${MUS[m]}：${rec[m].txt}</title>${both(inner)}</g>`;
  const fig=(cx,map)=>`<g transform="translate(${cx},2)"><ellipse class="base" cx="0" cy="22" rx="12.5" ry="15.5"/><rect class="base" x="-6" y="35" width="12" height="11" rx="3"/><g class="base">${both(BODY_L)}</g>${Object.entries(map).map(([m,p])=>g(m,p)).join('')}</g>`;
  return`<svg viewBox="0 0 300 282" role="img" aria-label="身體部位與恢復狀態，點選肌群可選擇要練的部位">${fig(75,MAP_F)}${fig(225,MAP_B)}<text x="75" y="280" text-anchor="middle">正面</text><text x="225" y="280" text-anchor="middle">背面</text></svg>`}
function seg(name,opts,cur,label,mini){return`<div class="field">${label?`<span id="lab-${name}">${label}</span>`:''}<div class="seg${mini?' mini':''}" role="group" ${label?`aria-labelledby="lab-${name}"`:`aria-label="${name}"`}>${opts.map(([v,t])=>`<button type="button" data-act="set" data-k="${name}" data-v="${v}" aria-pressed="${String(cur)===String(v)}">${t}</button>`).join('')}</div></div>`}
function eqChips(e,occ){return e.eq.length?e.eq.map(q=>`<span class="eq${(occ||[]).includes(q)?' busy':''}">${EQ[q]}</span>`).join(''):'<span class="eq">徒手</span>'}
function rxText(e,r){const u=e.unit==='sec'?'秒':'下';return`<span class="num">${r.sets}</span> 組 × <span class="num">${r.lo}–${r.hi}</span> ${u} · 休息 <span class="num">${r.rest>=60?(r.rest/60)+'</span> 分':r.rest+'</span> 秒'}`}
function lvlPicker(en,i,where){const e=BYID[en.id];if(!en.sg.first||e.unit==='bw'||e.unit==='sec')return'';if(where==='active'&&en.sets.some(s=>s.done))return'';
  return`<div class="lvl"><span>這個動作的難度</span><div class="seg mini" role="group" aria-label="${esc(e.n)}的難度">${Object.entries(LV).map(([v,t])=>`<button type="button" data-act="lvl" data-i="${i}" data-where="${where}" data-v="${v}" aria-pressed="${en.lvl===v}">${t}</button>`).join('')}</div></div>`}
function sampleNote(){return S.history.some(h=>h.sample)?`<div class="notice"><span>目前顯示 3 筆範例紀錄，讓恢復狀態和重量建議有東西可看。</span><button class="btn sm" type="button" data-act="clear-sample">清除範例</button></div>`:''}

function renderToday(){
  if(S.summary)return renderSummary();
  if(S.active)return renderWorkout();
  const rec=recovery(),p=P(),plan=todayPlanMs();
  let h=sampleNote()+crowdCard();
  const same=plan.ms.length===S.sel.length&&plan.ms.every(m=>S.sel.includes(m));
  h+=`<h2>今天要練哪裡</h2><div class="panel stack">
   <div class="recbox"><p><b>建議：</b>${esc(plan.why)}</p><div class="row"><div class="tags">${plan.ms.map(m=>`<span>${MUS[m]}</span>`).join('')}</div>${same?'<span class="small muted">已套用</span>':'<button class="btn sm" type="button" data-act="apply-rec">套用建議</button>'}</div></div>
   <div class="map">${bodyMap(rec,S.sel,plan.ms)}<div class="legend"><span><i class="dot d-ready"></i>可以練</span><span><i class="dot d-mid"></i>差不多恢復</span><span><i class="dot d-fresh"></i>48 小時內練過</span><span>虛線框：建議</span></div></div>
   <div class="chips">${MUS_ORDER.map(m=>`<button type="button" class="chip" data-act="mus" data-m="${m}" aria-pressed="${S.sel.includes(m)}"><i class="dot d-${rec[m].st}"></i><span class="t"><b>${MUS[m]}</b><small>${rec[m].txt}</small></span>${plan.ms.includes(m)?'<span class="rtag">建議</span>':''}</button>`).join('')}</div>`;
  h+=seg('time',[[30,'30 分'],[45,'45 分'],[60,'60 分'],[75,'75 分']],S.time,'今天有多少時間')+
   `<button class="btn primary" type="button" data-act="gen" ${S.sel.length?'':'disabled'}>${S.sel.length?'產生課表：'+S.sel.map(m=>MUS[m]).join('、'):'點身體圖選部位，或套用建議'}</button>${S.sel.length?'<button class="btn link" type="button" data-act="clear-sel">清除選擇</button>':''}</div>`;
  if(S.draft){const d=S.draft;
    h+=`<h2 id="draftHead">課表預覽 · ${d.items.length} 個動作 · ${GOALS[p.goal]}</h2><div class="stack">`+(d.short.length?`<div class="notice">這間健身房的器材不夠排 ${d.short.join('、')} 的動作，可以到「我的」調整器材。</div>`:'')+
    d.items.map((en,i)=>{const e=BYID[en.id];return`<article class="ex">${figure(e)}<div class="ex-head"><div><h3>${esc(e.n)}</h3><div class="rx">練${MUS[e.m]} · ${rxText(e,en.rx)}</div></div><span class="badge">${e.eq.some(q=>MACHINE.includes(q))?'器械':e.eq.length?'自由重量':'徒手'}</span></div>
      ${lvlPicker(en,i,'draft')}<div class="sugg${en.sg.cls?' '+en.sg.cls:''}">${esc(en.sg.txt)}</div><div class="cue">${esc(e.cue)}</div><div class="eqs">${eqChips(e)}</div>
      <div class="ex-actions"><button class="btn sm" type="button" data-act="swap" data-i="${i}" data-where="draft">換一個</button><a class="btn sm" href="https://www.youtube.com/results?search_query=${encodeURIComponent(e.n+' '+e.en)}" target="_blank" rel="noopener">教學影片 ↗</a></div></article>`}).join('')+
    `<p class="small muted">示意圖是簡化的線條圖，只表示起始與結束姿勢，正式版可換成實拍照片。</p><button class="btn primary" type="button" data-act="start">開始訓練</button></div>`}
  V.innerHTML=h}

function renderWorkout(){
  const a=S.active,mins=Math.max(0,Math.round((Date.now()-a.start)/6e4)),doneSets=a.entries.reduce((n,en)=>n+en.sets.filter(s=>s.done).length,0),total=a.entries.reduce((n,en)=>n+en.sets.length,0);
  let h=`<div class="panel live"><div><div class="small muted">訓練中 · ${GOALS[a.goal]||''}</div><div><span class="big" id="mins">${mins}</span> 分鐘 · <span class="num" style="font-size:20px">${doneSets}/${total}</span> 組</div></div>
    ${a.occ.length?`<div class="small"><span class="muted">有人在用：</span><span class="occ" style="display:inline-flex">${a.occ.map(q=>`<button type="button" data-act="unocc" data-q="${q}" aria-pressed="true" aria-label="取消標記 ${EQ[q]}">${EQ[q]} ✕</button>`).join('')}</span></div>`:''}</div><div class="stack" style="margin-top:12px">`;
  h+=a.entries.map((en,i)=>{const e=BYID[en.id],allDone=en.sets.length&&en.sets.every(s=>s.done),busy=e.eq.some(q=>a.occ.includes(q));
    return`<article class="ex${allDone?' done':''}" id="ex-${i}"><div class="ex-head"><div><h3>${esc(e.n)}</h3><div class="rx">練${MUS[e.m]} · ${rxText(e,en.rx)}</div></div><span class="badge">${allDone?'完成':en.sets.filter(s=>s.done).length+'/'+en.sets.length}</span></div>
      ${allDone?'':figure(e)}${lvlPicker(en,i,'active')}<div class="sugg${en.sg.cls?' '+en.sg.cls:''}">${esc(en.sg.txt)}</div>
      ${busy&&!allDone?`<div class="notice">這個動作用的器材被標記為有人在用。</div>`:''}
      <div class="sets">${en.sets.map((s,j)=>setRow(e,en,i,j,s)).join('')}</div>
      <div class="cue">${esc(e.cue)}</div><div class="eqs">${eqChips(e,a.occ)}</div>
      <div class="ex-actions"><button class="btn sm" type="button" data-act="addset" data-i="${i}">＋ 加一組</button><button class="btn sm" type="button" data-act="swap" data-i="${i}" data-where="active">有人在用，換一個</button><a class="btn sm" href="https://www.youtube.com/results?search_query=${encodeURIComponent(e.n+' '+e.en)}" target="_blank" rel="noopener">教學影片 ↗</a></div></article>`}).join('');
  const left=total-doneSets;
  h+=`</div><div class="stack" style="margin-top:16px">${a.confirmEnd?`<div class="confirm"><span>還有 ${left} 組沒打勾，沒打勾的組不會存進紀錄。</span><button class="btn sm" type="button" data-act="finish" data-force="1">仍要結束</button><button class="btn sm ghost" type="button" data-act="cancel-end">繼續練</button></div>`:`<button class="btn primary" type="button" data-act="finish">結束訓練</button>`}
   ${a.confirmQuit?`<div class="confirm"><span>放棄這次訓練？已記錄的組數也會刪除。</span><button class="btn sm" type="button" data-act="quit" data-force="1">放棄</button><button class="btn sm ghost" type="button" data-act="cancel-quit">不要</button></div>`:`<button class="btn link" type="button" data-act="quit">放棄這次訓練</button>`}</div>`;
  V.innerHTML=h}
function setRow(e,en,i,j,s){const isBw=e.unit==='bw'||e.unit==='sec',ru=e.unit==='sec'?'秒':'下',wu=e.unit==='each'?'kg／每手':'kg';
  const w=isBw?`<div class="step bw">自身體重</div>`:`<div class="step"><button type="button" data-act="bump" data-i="${i}" data-j="${j}" data-f="w" data-d="-1" aria-label="減重量">−</button><label><input id="w-${i}-${j}" inputmode="decimal" type="number" step="0.5" min="0" data-i="${i}" data-j="${j}" data-f="w" value="${s.w==null?'':fmtW(s.w)}" placeholder="?" aria-label="第 ${j+1} 組重量"><small>${wu}</small></label><button type="button" data-act="bump" data-i="${i}" data-j="${j}" data-f="w" data-d="1" aria-label="加重量">＋</button></div>`;
  let row=`<div class="set${s.done?' isdone':''}"><span class="idx">${j+1}</span>${w}<div class="step"><button type="button" data-act="bump" data-i="${i}" data-j="${j}" data-f="r" data-d="-1" aria-label="減次數">−</button><label><input id="r-${i}-${j}" inputmode="numeric" type="number" min="0" data-i="${i}" data-j="${j}" data-f="r" value="${s.r==null?'':s.r}" aria-label="第 ${j+1} 組次數"><small>${ru}</small></label><button type="button" data-act="bump" data-i="${i}" data-j="${j}" data-f="r" data-d="1" aria-label="加次數">＋</button></div><button type="button" class="tick" data-act="tick" data-i="${i}" data-j="${j}" aria-pressed="${s.done}" aria-label="第 ${j+1} 組完成">✓</button></div>`;
  if(s.done)row+=`<div class="feel" role="group" aria-label="第 ${j+1} 組的感覺"><span>這組感覺</span>${Object.entries(FEEL).map(([k,t])=>`<button type="button" data-act="feel" data-i="${i}" data-j="${j}" data-v="${k}" aria-pressed="${s.f===k}">${t}</button>`).join('')}</div>`;
  return row}

function renderSummary(){const h=S.history.find(x=>x.id===S.summary);if(!h){S.summary=null;return renderToday()}
  let vol=0,sets=0;for(const en of h.entries)for(const s of en.sets){sets++;vol+=(s.w||0)*s.r}
  const dur=Math.max(1,Math.round((h.end-h.t)/6e4));
  V.innerHTML=`<h2>訓練完成</h2><div class="panel stack"><div class="stats"><div class="stat"><div class="big">${dur}</div><span>分鐘</span></div><div class="stat"><div class="big">${sets}</div><span>組</span></div><div class="stat"><div class="big">${Math.round(vol).toLocaleString()}</div><span>總量 kg</span></div></div>
  <p class="small muted" style="margin:0">總量＝重量 × 次數的加總，啞鈴以單手重量計，徒手動作不計。</p></div>
  <h2>下次怎麼練</h2><div class="stack">${h.entries.map(en=>{const e=BYID[en.id],r=rx(e),sg=suggest(e,r,P().strength),best=en.sets.reduce((b,s)=>(s.w||0)*s.r>(b.w||0)*b.r?s:b,en.sets[0]);
    return`<article class="ex"><div class="ex-head"><div><h3>${esc(e.n)}</h3><div class="rx">最佳一組 <span class="num">${e.unit==='bw'||e.unit==='sec'?best.r+(e.unit==='sec'?' 秒':' 下'):fmtW(best.w)+' kg × '+best.r}</span></div></div></div><div class="sugg${sg.cls?' '+sg.cls:''}">${esc(sg.txt)}</div></article>`}).join('')||'<p class="muted">這次沒有打勾的組。</p>'}
  <button class="btn primary" type="button" data-act="done-summary">回到今天</button></div>`}

function renderLog(){const list=[...S.history].sort((a,b)=>b.t-a.t);const wd='日一二三四五六',fm={light:'輕',heavy:'重'};
  let h=sampleNote()+`<h2>訓練紀錄 · ${list.length} 次</h2>`;
  if(!list.length)h+=`<div class="panel"><p>還沒有紀錄。到「今天」產生課表，練完按「結束訓練」就會存在這裡。</p></div>`;
  h+=`<div class="stack">`+list.map(x=>{const d=new Date(x.t);return`<article class="panel log-item"><div class="ex-head"><div><h3>${d.getMonth()+1}/${d.getDate()}（${wd[d.getDay()]}）</h3><div class="rx">${x.ms.map(m=>MUS[m]).join('、')} · ${GOALS[x.goal]||''}</div></div>${x.sample?'<span class="badge">範例</span>':''}</div>
    ${x.entries.map(en=>{const e=BYID[en.id];if(!e)return'';return`<div class="log-ex"><span>${esc(e.n)}</span><span>${en.sets.map(s=>(e.unit==='bw'||e.unit==='sec'?s.r+(e.unit==='sec'?'s':''):fmtW(s.w)+'×'+s.r)+(fm[s.f]?'<small>·'+fm[s.f]+'</small>':'')).join('　')}</span></div>`}).join('')}</article>`}).join('')+`</div>`;
  if(list.length)h+=`<p class="small muted" style="margin-top:8px">「·輕」「·重」是你當組回報的感覺，會影響下次的重量建議。</p>`;
  V.innerHTML=h}

function renderMe(){const p=P(),on=Object.keys(EQ).filter(k=>S.gym[k]).length;
  const goalT=GOALS[p.goal],freqT=p.freq>=4?'4 次以上':p.freq===3?'3 次':'1–2 次';
  let h=`<h2>我的設定</h2><div class="panel stack"><dl class="kvs" style="margin:0"><div><dt>重訓經驗</dt><dd>${EXP[p.exp]}</dd></div><div><dt>每週</dt><dd>${freqT}</dd></div><div><dt>每次</dt><dd>${p.time} 分鐘</dd></div><div><dt>目標</dt><dd>${goalT}</dd></div><div><dt>力量自評</dt><dd>${LV[p.strength]}</dd></div><div><dt>身高／體重</dt><dd>${p.h?p.h+' 公分':'—'}／${p.bw?p.bw+' 公斤':'—'}</dd></div></dl>
   ${S.profile?'':'<p class="small muted">目前使用預設值。</p>'}<button class="btn" type="button" data-act="ob-redo">重新回答問卷</button></div>
  <h2>健身房器材 · 可用 ${on}／${Object.keys(EQ).length} 項</h2><div class="notice">台大健身中心的器材清單還沒實地調查，目前是範例。關掉的器材不會出現在課表和換動作裡。</div>
  <div class="panel" style="margin-top:10px">${Object.entries(EQ).map(([k,n])=>`<div class="toggle"><span>${n} <span class="small muted">· ${EX.filter(e=>e.eq.includes(k)).length} 個動作</span></span><button type="button" class="sw" data-act="eq" data-q="${k}" aria-pressed="${!!S.gym[k]}" aria-label="${n}"></button></div>`).join('')}</div>
  <h2>資料</h2><div class="panel stack">${S.confirmClear?`<div class="confirm"><span>刪除這台裝置上的所有紀錄和設定？無法復原。</span><button class="btn sm" type="button" data-act="reset" data-force="1">全部刪除</button><button class="btn sm ghost" type="button" data-act="cancel-clear">取消</button></div>`:`<button class="btn" type="button" data-act="reset">刪除全部紀錄並重新開始</button>`}</div>`;
  V.innerHTML=h}

function render(){const ob=!S.profile&&!S.obSkipped;document.getElementById('tabs').hidden=ob;
  if(ob){renderOnboarding();return}
  for(const t of['today','log','me']){const b=document.getElementById('tab-'+t);if(S.tab===t)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');b.innerHTML={today:'今天',log:'紀錄',me:'我的'}[t]+(t==='today'&&S.active&&S.tab!=='today'?'<i class="pip" aria-label="訓練中"></i>':'')}
  if(S.tab==='log')renderLog();else if(S.tab==='me')renderMe();else renderToday()}

/* ───── 換動作面板 ───── */
let sheetCtx=null;
function openSwap(where,i){const list=where==='draft'?S.draft.items:S.active.entries,en=list[i],e=BYID[en.id];
  const occ=where==='active'?[...S.active.occ]:[];
  if(where==='active'&&e.eq.length&&!e.eq.some(q=>occ.includes(q)))occ.push(e.eq.find(q=>q!=='bench'&&q!=='barbell')||e.eq[0]);
  sheetCtx={where,i,occ};drawSheet();document.getElementById('sheet').hidden=false;setTimeout(()=>{const f=document.querySelector('#sheetIn .alt');f&&f.focus()},30)}
function drawSheet(){const {where,i,occ}=sheetCtx,list=where==='draft'?S.draft.items:S.active.entries,e=BYID[list[i].id];
  const cand=alts(e,occ,list.map(x=>x.id));
  document.getElementById('sheetIn').innerHTML=`<div class="ex-head"><div><div class="small muted">${where==='active'?'有人在用，換一個':'換一個動作'}</div><h3>${esc(e.n)} → 同樣練${MUS[e.m]}</h3></div><button class="btn sm ghost" type="button" data-act="close-sheet">關閉</button></div>
   ${where==='active'&&e.eq.length?`<div class="stack" style="gap:6px"><span class="small muted">哪個器材有人在用？點一下切換</span><div class="occ">${e.eq.map(q=>`<button type="button" data-act="occ" data-q="${q}" aria-pressed="${occ.includes(q)}">${EQ[q]}</button>`).join('')}</div></div>`:''}
   <div class="stack">${cand.length?cand.map(x=>`<button type="button" class="alt" data-act="pick" data-id="${x.id}">${figure(x)}<b>${esc(x.n)}</b><span class="why">${x.pat===e.pat?'相同動作模式':'換個角度練'} · ${x.eq.length?'用'+x.eq.map(q=>EQ[q]).join('＋'):'徒手'}${lastSets(x.id)?' · 你做過':''}</span><span class="eqs">${eqChips(x)}</span></button>`).join(''):`<div class="notice">沒有其他可用的${MUS[e.m]}動作了。可以等一下，或到「我的」確認器材清單。</div>`}</div>`}
function closeSheet(){document.getElementById('sheet').hidden=true;sheetCtx=null}

/* ───── 組間計時 ───── */
let rest=null,restTimer=null,actx=null;
function beep(){try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const t=actx.currentTime;for(const [d,f] of [[0,880],[.22,880],[.44,1320]]){const o=actx.createOscillator(),g=actx.createGain();o.frequency.value=f;g.gain.setValueAtTime(.0001,t+d);g.gain.exponentialRampToValueAtTime(.25,t+d+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d+.18);o.connect(g).connect(actx.destination);o.start(t+d);o.stop(t+d+.2)}}catch(e){}try{navigator.vibrate&&navigator.vibrate([180,80,180])}catch(e){}}
function startRest(sec){rest={end:Date.now()+sec*1000,total:sec};try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();actx.resume&&actx.resume()}catch(e){}document.getElementById('restbar').hidden=false;tickRest();clearInterval(restTimer);restTimer=setInterval(tickRest,250)}
function tickRest(){if(!rest)return;const left=Math.max(0,rest.end-Date.now()),s=Math.ceil(left/1000);document.getElementById('restTime').textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');document.getElementById('restBar').style.width=(left/(rest.total*1000)*100)+'%';if(left<=0){stopRest();beep();toast('休息結束，開始下一組')}}
function stopRest(){rest=null;clearInterval(restTimer);document.getElementById('restbar').hidden=true}
let toastT=null;function toast(t){const el=document.getElementById('toast');el.textContent=t;el.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>el.hidden=true,2600)}
let wake=null;async function keepAwake(){try{wake=await navigator.wakeLock.request('screen')}catch(e){}}

/* ───── 事件 ───── */
function finishWorkout(){const a=S.active,entries=a.entries.map(en=>({id:en.id,sets:en.sets.filter(s=>s.done&&s.r>0).map(s=>({w:+s.w||0,r:+s.r,f:s.f||null}))})).filter(en=>en.sets.length);
  const rec={id:'w'+a.start,t:a.start,end:Date.now(),ms:a.ms,goal:a.goal,entries};
  if(entries.length){S.history.push(rec);S.summary=rec.id}else toast('沒有打勾的組，這次不存紀錄');
  S.active=null;S.draft=null;stopRest();try{wake&&wake.release()}catch(e){}save();render();scrollTo(0,0)}
function applyLvl(en,v){const e=BYID[en.id];en.lvl=v;en.sg=suggest(e,en.rx,v);for(const s of en.sets)if(!s.done)s.w=en.sg.w}
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-act]');if(!b)return;const d=b.dataset,act=d.act;
  if(act==='ob-start'){S.ob={step:0,ans:{...(S.profile||{})}}}
  else if(act==='ob-skip'){S.obSkipped=true;S.time=45}
  else if(act==='ob-pick'){const q=OB[S.ob.step];S.ob.ans[q.k]=isNaN(+d.v)?d.v:+d.v;S.ob.step++}
  else if(act==='ob-back'){S.ob.step=Math.max(-1,S.ob.step-1)}
  else if(act==='ob-finish'){const a=S.ob.ans;if(!d.skip){const hv=+document.getElementById('ob-h').value,wv=+document.getElementById('ob-w').value;a.h=hv>=100&&hv<=230?hv:null;a.bw=wv>=30&&wv<=200?wv:null}
    S.profile={exp:a.exp||'none',freq:a.freq||3,time:a.time||45,goal:a.goal||'muscle',strength:a.strength||'mid',h:a.h||null,bw:a.bw||null};S.time=S.profile.time;S.ob={step:0,ans:{}};S.tab='today';S.draft=null;S.sel=[];toast('設定完成，可以產生今天的課表了');save();render();scrollTo(0,0);return}
  else if(act==='ob-redo'){S.ob={step:0,ans:{...P()}};S.profile=null;S.obSkipped=false;save();render();scrollTo(0,0);return}
  else if(act==='tab'){S.tab=d.tab;save();render();scrollTo(0,0);return}
  else if(act==='apply-rec'){S.sel=[...todayPlanMs().ms];S.draft=null}
  else if(act==='clear-sel'){S.sel=[];S.draft=null}
  else if(act==='mus'){if(S.active||S.summary)return;const i=S.sel.indexOf(d.m);if(i>=0)S.sel.splice(i,1);else S.sel.push(d.m);S.draft=null}
  else if(act==='set'){S[d.k]=+d.v;if(S.draft)S.draft=makePlan(S.draftMs||[])}
  else if(act==='gen'){const ms=S.sel;if(!ms.length)return;S.draftMs=ms;S.draft=makePlan(ms);save();render();const el=document.getElementById('draftHead');el&&el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});return}
  else if(act==='lvl'){const list=d.where==='draft'?S.draft.items:S.active.entries;applyLvl(list[+d.i],d.v)}
  else if(act==='start'){S.active={start:Date.now(),goal:P().goal,ms:[...S.draftMs],entries:S.draft.items,occ:[]};S.draft=null;keepAwake();save();render();scrollTo(0,0);return}
  else if(act==='swap'){openSwap(d.where,+d.i);return}
  else if(act==='occ'){const o=sheetCtx.occ,k=o.indexOf(d.q);if(k>=0)o.splice(k,1);else o.push(d.q);drawSheet();return}
  else if(act==='close-sheet'){closeSheet();return}
  else if(act==='pick'){const {where,i,occ}=sheetCtx,e=BYID[d.id];
    if(where==='draft'){S.draft.items[i]=mkEntry(e)}
    else{const a=S.active,old=a.entries[i];a.occ=[...new Set(occ)];const ne=mkEntry(e);if(old.sets.some(s=>s.done)){old.sets=old.sets.filter(s=>s.done);a.entries.splice(i+1,0,ne)}else a.entries[i]=ne}
    closeSheet();toast('換成 '+e.n);save();render();return}
  else if(act==='unocc'){S.active.occ=S.active.occ.filter(q=>q!==d.q)}
  else if(act==='bump'){const s=S.active.entries[+d.i].sets[+d.j],e=BYID[S.active.entries[+d.i].id];
    if(d.f==='w'){const stp=e.unit==='each'?1:(e.inc>=5?5:2.5);s.w=Math.max(0,+((s.w||0)+stp*(+d.d)).toFixed(2))}else s.r=Math.max(0,(+s.r||0)+(+d.d)*(e.unit==='sec'?5:1))}
  else if(act==='tick'){const en=S.active.entries[+d.i],s=en.sets[+d.j],e=BYID[en.id];
    if(!s.done&&e.unit!=='bw'&&e.unit!=='sec'&&(s.w==null||s.w==='')){toast('先填這組的重量');const inp=document.getElementById(`w-${d.i}-${d.j}`);inp&&inp.focus();return}
    s.done=!s.done;if(s.done){const next=en.sets[+d.j+1];if(next&&!next.done&&(next.w==null||next.w===''))next.w=s.w;const allDone=S.active.entries.every(x=>x.sets.every(q=>q.done));if(!allDone)startRest(en.rx.rest);else{stopRest();toast('全部完成，可以結束訓練了')}}}
  else if(act==='feel'){const en=S.active.entries[+d.i],s=en.sets[+d.j],e=BYID[en.id],delta=FEELD[d.v]-(FEELD[s.f]||0);s.f=d.v;
    const rest2=en.sets.slice(+d.j+1).filter(q=>!q.done);
    if(delta&&rest2.length){if(e.unit==='bw'||e.unit==='sec'){for(const q of rest2)q.r=Math.max(1,(+q.r||0)+delta*(e.unit==='sec'?5:2));toast(`下一組改成 ${rest2[0].r} ${e.unit==='sec'?'秒':'下'}`)}
      else{for(const q of rest2)q.w=+Math.max(minW(e),(+q.w||+s.w||0)+delta*e.inc).toFixed(2);toast(`下一組調整為 ${fmtW(rest2[0].w)} kg`)}}
    else if(!rest2.length)toast('已記下，下次會依這個感覺調整重量')}
  else if(act==='addset'){const en=S.active.entries[+d.i],l=en.sets[en.sets.length-1]||{w:null,r:en.rx.lo};en.sets.push({w:l.w,r:l.r,done:false})}
  else if(act==='finish'){const a=S.active,left=a.entries.some(en=>en.sets.some(s=>!s.done));if(left&&!d.force){a.confirmEnd=true;render();return}finishWorkout();return}
  else if(act==='cancel-end'){S.active.confirmEnd=false}
  else if(act==='quit'){if(!d.force){S.active.confirmQuit=true;render();return}S.active=null;stopRest();toast('已放棄這次訓練')}
  else if(act==='cancel-quit'){S.active.confirmQuit=false}
  else if(act==='done-summary'){S.summary=null;S.sel=[]}
  else if(act==='rest-add'){if(rest){rest.end+=30000;rest.total+=30;tickRest()}return}
  else if(act==='rest-skip'){stopRest();return}
  else if(act==='clear-sample'){S.history=S.history.filter(h=>!h.sample);S.draft=null;toast('已清除範例紀錄')}
  else if(act==='reset'){if(!d.force){S.confirmClear=true;render();return}stopRest();S=defaults();S.history=[];save();toast('已全部刪除');render();scrollTo(0,0);return}
  else if(act==='cancel-clear'){S.confirmClear=false}
  else if(act==='eq'){S.gym[d.q]=!S.gym[d.q];S.draft=null}
  save();render()});
document.addEventListener('change',ev=>{const t=ev.target;if(!t.dataset||!t.dataset.f||!S.active)return;const s=S.active.entries[+t.dataset.i].sets[+t.dataset.j];const v=t.value===''?null:+t.value;if(t.dataset.f==='w')s.w=v;else s.r=v==null?0:Math.round(v);save()});
document.getElementById('sheet').addEventListener('click',ev=>{if(ev.target.id==='sheet')closeSheet()});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&sheetCtx)closeSheet()});
setInterval(()=>{const m=document.getElementById('mins');if(m&&S.active)m.textContent=Math.max(0,Math.round((Date.now()-S.active.start)/6e4))},20000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&S.active&&!wake)keepAwake()});
if(!S.profile&&!S.obSkipped&&S.ob.step===0&&!S.ob.ans.exp)S.ob.step=-1;
render();
window.__zj={get S(){return S},EX,POSE,makePlan,todayPlanMs,suggest,startW,figure,drawPose,lerpPose};
})();
