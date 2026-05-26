const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const API_KEY = "1AB1BD8225AC1187FFCC2622AE416CC0";

const STEAM_IDS = [

"76561199698724099",
"76561198151188240",
"76561199878751211",
"76561199241453975",
"76561199509060237",
"76561199580803726",
"76561199520140484",
"76561199135831116",
"76561199760327825",
"76561199680639310",
"76561199473890874",
"76561199854431445",
"76561199670596116",
"76561198698651895",
"76561199388714449",
"76561199197623141",
"76561199570334493"

];

app.get("/", (req,res)=>{

res.sendFile(
path.join(__dirname,"Site.html")
);

});

app.get("/members", async (req,res)=>{

try{

const response = await axios.get(

`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${API_KEY}&steamids=${STEAM_IDS.join(",")}`

);

const players =
response.data.response.players;

const formatted =
players.map(player => {

let rank = "🎮 MEMBER";

if(player.personaname.includes("EMPEROR")){
rank = "👑 OWNER";
}

if(player.personaname.includes("DEREK")){
rank = "☠ RAIDER";
}

if(player.personaname.includes("YUSUF")){
rank = "🎯 SNIPER";
}

if(player.personaname.includes("Bad-cop")){
rank = "💀 TF2 UNIT";
}

if(player.personaname.includes("sirius")){
rank = "👑 FOUNDER";
}

return {

steamid:player.steamid,
personaname:player.personaname,
avatarfull:player.avatarfull,
profileurl:player.profileurl,
personastate:player.personastate,
gameextrainfo:player.gameextrainfo || null,
rank:rank

};

});

res.json(formatted);

}catch(err){

res.json({
error:"Steam API error"
});

}

});

let chatMessages = [];

app.get("/chat",(req,res)=>{
res.json(chatMessages);
});

app.post("/chat",(req,res)=>{

const msg = {

user:req.body.user,
text:req.body.text,
time:Date.now()

};

chatMessages.push(msg);

chatMessages =
chatMessages.filter(
m => Date.now() - m.time < 2592000000
);

res.json({
success:true
});

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log(
"TC NIGHT LIVE API ONLINE"
);

});